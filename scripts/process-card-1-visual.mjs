import fs from "fs";
import path from "path";
import sharp from "sharp";

const src = "public/images/solution/card-1/card-1-visual-source.png";
const out = "public/images/solution/card-1/card-1-visual.png";

const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const outBuf = Buffer.alloc(data.length);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);
  // Remove near-black background; keep glow and UI elements
  const isBackground = max < 28;
  outBuf[i] = r;
  outBuf[i + 1] = g;
  outBuf[i + 2] = b;
  outBuf[i + 3] = isBackground ? 0 : data[i + 3];
}

await sharp(outBuf, { raw: { width: info.width, height: info.height, channels: 4 } })
  .png()
  .toFile(out);

console.log("wrote", out, `${info.width}x${info.height}`);
