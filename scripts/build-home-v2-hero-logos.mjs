/**
 * Builds white-on-transparent PNGs for the home-v2 hero marquee.
 * SVGs stay in public/france (inverted in CSS). KRC Genk uses the color crest asset.
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const outDir = "public/images/home/logos/hero-marquee";

const RASTER_SOURCES = [
  { id: "cambio", src: "public/images/france/logos/cambio.png" },
  { id: "just-russel", src: "public/images/home/logos/clients/just-russel.png" },
  { id: "xerius", src: "public/images/france/logos/xerius.png" },
  { id: "tupperware", src: "public/images/home/logos/clients/tupperware.png" },
  { id: "haelvoet", src: "public/images/workspace/logos/haelvoet.png" },
  { id: "respace", src: "public/images/workspace/logos/respace.png" },
  { id: "ingenium-group", src: "public/images/workspace/logos/ingenium-group.png" },
  { id: "senitas", src: "public/images/workspace/logos/senitas.png" },
];

function isAlphaMaskPixel(r, g, b) {
  return r < 12 && g < 12 && b < 12;
}

/** Colored / dark marks on white: knock out white, emit white with derived alpha. */
function fromRgbPixel(r, g, b, a) {
  if (a < 8) return [0, 0, 0, 0];
  const dist = Math.hypot(255 - r, 255 - g, 255 - b);
  if (dist < 18) return [0, 0, 0, 0];
  const alphaOut = Math.min(255, Math.round((dist / 441) * 512));
  if (alphaOut < 12) return [0, 0, 0, 0];
  return [255, 255, 255, alphaOut];
}

function alphaBounds(data, width, height) {
  let x0 = width;
  let y0 = height;
  let x1 = -1;
  let y1 = -1;
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const a = data[(y * width + x) * 4 + 3];
      if (a > 12) {
        x0 = Math.min(x0, x);
        x1 = Math.max(x1, x);
        y0 = Math.min(y0, y);
        y1 = Math.max(y1, y);
      }
    }
  }
  if (x1 < 0) return null;
  const padX = Math.max(2, Math.round((x1 - x0 + 1) * 0.04));
  const padY = Math.max(2, Math.round((y1 - y0 + 1) * 0.06));
  return {
    left: Math.max(0, x0 - padX),
    top: Math.max(0, y0 - padY),
    width: Math.min(width - Math.max(0, x0 - padX), x1 - x0 + 1 + 2 * padX),
    height: Math.min(height - Math.max(0, y0 - padY), y1 - y0 + 1 + 2 * padY),
  };
}

async function cropToAlphaBounds(pngBuf) {
  const { data, info } = await sharp(pngBuf)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const box = alphaBounds(data, info.width, info.height);
  if (!box || box.width < 8 || box.height < 8) return pngBuf;
  return sharp(pngBuf).extract(box).png().toBuffer();
}

async function loadTrimmedBuffer(src) {
  try {
    return await sharp(src)
      .ensureAlpha()
      .trim({ background: { r: 255, g: 255, b: 255 }, threshold: 28 })
      .toBuffer();
  } catch {
    return sharp(src).ensureAlpha().toBuffer();
  }
}

async function buildWhiteLogo(id, src) {
  const trimmed = await loadTrimmedBuffer(src);
  const { data, info } = await sharp(trimmed)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  let alphaMaskCount = 0;
  let rgbCount = 0;
  let opaqueAlphaMin = 255;
  let opaqueAlphaMax = 0;
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (a < 8) continue;
    opaqueAlphaMin = Math.min(opaqueAlphaMin, a);
    opaqueAlphaMax = Math.max(opaqueAlphaMax, a);
    if (isAlphaMaskPixel(r, g, b)) alphaMaskCount++;
    else rgbCount++;
  }
  const alphaSpread = opaqueAlphaMax - opaqueAlphaMin;
  const useAlphaMask =
    alphaMaskCount > rgbCount && alphaSpread > 48 && rgbCount < alphaMaskCount * 0.35;

  const out = Buffer.alloc(data.length);
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const a = data[i + 3];
    if (useAlphaMask) {
      if (a < 8) out[i + 3] = 0;
      else {
        out[i] = 255;
        out[i + 1] = 255;
        out[i + 2] = 255;
        out[i + 3] = a;
      }
    } else {
      const [or, og, ob, oa] = fromRgbPixel(r, g, b, a);
      out[i] = or;
      out[i + 1] = og;
      out[i + 2] = ob;
      out[i + 3] = oa;
    }
  }

  const dest = path.join(outDir, `${id}.png`);
  let pngBuf = await sharp(out, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .png()
    .toBuffer();

  try {
    pngBuf = await sharp(pngBuf).trim({ threshold: 1 }).png().toBuffer();
  } catch {
    /* keep untrimmed */
  }

  pngBuf = await cropToAlphaBounds(pngBuf);

  await sharp(pngBuf).toFile(dest);
  const meta = await sharp(dest).metadata();
  console.log("wrote", dest, `${meta.width}x${meta.height}`, useAlphaMask ? "alpha-mask" : "rgb");
}

fs.mkdirSync(outDir, { recursive: true });

for (const { id, src } of RASTER_SOURCES) {
  if (!fs.existsSync(src)) {
    console.error("missing", src);
    process.exitCode = 1;
    continue;
  }
  await buildWhiteLogo(id, src);
}

console.log("done");
