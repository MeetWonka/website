import fs from "fs";
import path from "path";
import sharp from "sharp";

const brand = "public/images/brand";
const publicDir = "public";

async function toSvg(outName, pngName) {
  const pngPath = path.join(brand, pngName);
  const png = fs.readFileSync(pngPath);
  const b64 = png.toString("base64");
  const meta = await sharp(png).metadata();
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${meta.width}" height="${meta.height}" viewBox="0 0 ${meta.width} ${meta.height}" fill="none">
  <image width="${meta.width}" height="${meta.height}" href="data:image/png;base64,${b64}"/>
</svg>`;
  fs.writeFileSync(path.join(brand, outName), svg);
  console.log("wrote", outName, `${meta.width}x${meta.height}`);
  return meta;
}

const blackMeta = await toSvg("wonka-logo-black.svg", "wonka-logo-black.png");
await toSvg("wonka-logo-white.svg", "wonka-logo-white.png");

const { data, info } = await sharp(path.join(brand, "wonka-logo-black.png"))
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const out = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  out[i] = 0;
  out[i + 1] = 0;
  out[i + 2] = 0;
  out[i + 3] = data[i + 3];
}

await sharp(out, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(path.join(brand, "wonka-logo-mask.png"));

fs.copyFileSync(path.join(brand, "wonka-logo-black.svg"), path.join(publicDir, "wonka-logo.svg"));
console.log("done");
