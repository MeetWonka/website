import fs from "fs";
import sharp from "sharp";

const brand = "public/images/brand";

async function processIcon(inputName, maskName, transparentName) {
  const input = `${brand}/${inputName}`;
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const mask = Buffer.alloc(data.length);
  const rgba = Buffer.alloc(data.length);

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const alpha = max < 25 ? 0 : 255;
    mask[i] = 0;
    mask[i + 1] = 0;
    mask[i + 2] = 0;
    mask[i + 3] = alpha;
    rgba[i] = r;
    rgba[i + 1] = g;
    rgba[i + 2] = b;
    rgba[i + 3] = alpha;
  }

  const raw = { width: info.width, height: info.height, channels: 4 };
  await sharp(mask, { raw }).png().toFile(`${brand}/${maskName}`);
  await sharp(rgba, { raw }).png().toFile(`${brand}/${transparentName}`);
  console.log("processed", inputName, `${info.width}x${info.height}`);
  return info;
}

const meta = await processIcon(
  "wonka-logo-mark.png",
  "wonka-logo-mark-mask.png",
  "wonka-logo-mark-transparent.png",
);
await processIcon(
  "wonka-logo-mark-white.png",
  "wonka-logo-mark-white-mask.png",
  "wonka-logo-mark-white-transparent.png",
);

const mark = fs.readFileSync(`${brand}/wonka-logo-mark-transparent.png`);
const b64 = mark.toString("base64");
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}" fill="none">
  <image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${b64}"/>
</svg>`;
fs.writeFileSync(`${brand}/wonka-logo-mark.svg`, svg);
console.log("done");
