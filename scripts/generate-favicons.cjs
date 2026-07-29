const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const projectRoot = path.resolve(__dirname, "..");
const source = path.join(projectRoot, "favicon-circle.png");

async function generate() {
  const png32 = await sharp(source)
    .resize(32, 32, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const png48 = await sharp(source)
    .resize(48, 48, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  const png180 = await sharp(source)
    .resize(180, 180, { fit: "contain" })
    .png({ compressionLevel: 9 })
    .toBuffer();

  fs.writeFileSync(path.join(projectRoot, "favicon-32.png"), png32);
  fs.writeFileSync(path.join(projectRoot, "favicon-48.png"), png48);
  fs.writeFileSync(path.join(projectRoot, "apple-touch-icon.png"), png180);

  const icoHeader = Buffer.alloc(22);
  icoHeader.writeUInt16LE(0, 0);
  icoHeader.writeUInt16LE(1, 2);
  icoHeader.writeUInt16LE(1, 4);
  icoHeader.writeUInt8(48, 6);
  icoHeader.writeUInt8(48, 7);
  icoHeader.writeUInt8(0, 8);
  icoHeader.writeUInt8(0, 9);
  icoHeader.writeUInt16LE(1, 10);
  icoHeader.writeUInt16LE(32, 12);
  icoHeader.writeUInt32LE(png48.length, 14);
  icoHeader.writeUInt32LE(22, 18);

  fs.writeFileSync(path.join(projectRoot, "favicon.ico"), Buffer.concat([icoHeader, png48]));
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
