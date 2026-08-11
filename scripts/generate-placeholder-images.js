const fs = require('fs');
const zlib = require('zlib');

function crc32(buf) {
  const table = crc32.table || (crc32.table = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let c = n;
      for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
      t[n] = c >>> 0;
    }
    return t;
  })());
  let crc = -1;
  for (const b of buf) crc = (crc >>> 8) ^ table[(crc ^ b) & 0xff];
  return (crc ^ -1) >>> 0;
}

function pngChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const chunk = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(chunk), 0);
  return Buffer.concat([len, chunk, crc]);
}

function createPng(width, height, pixelFn) {
  const signature = Buffer.from([137,80,78,71,13,10,26,10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const rows = [];
  for (let y = 0; y < height; y++) {
    const row = Buffer.alloc(1 + width * 4);
    row[0] = 0;
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFn(x, y, width, height);
      const i = 1 + x * 4;
      row[i] = r;
      row[i + 1] = g;
      row[i + 2] = b;
      row[i + 3] = a;
    }
    rows.push(row);
  }

  const idat = Buffer.concat(rows);
  const compressed = zlib.deflateSync(idat);
  return Buffer.concat([
    signature,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', compressed),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

function circle(x, y, cx, cy, r) {
  return (x - cx) ** 2 + (y - cy) ** 2 <= r ** 2;
}

const worldMap = createPng(1200, 720, (x, y) => {
  const bg = [242, 245, 248, 255];
  const dot = [30, 60, 110, 255];
  const isLand = [
    circle(x, y, 220, 200, 110),
    circle(x, y, 260, 250, 140),
    circle(x, y, 380, 280, 180),
    circle(x, y, 560, 200, 130),
    circle(x, y, 680, 220, 150),
    circle(x, y, 820, 240, 110),
    circle(x, y, 980, 280, 120),
  ].some(Boolean);
  return isLand ? dot : bg;
});

const aircraft = createPng(72, 72, (x, y, w, h) => {
  const off = 0;
  const color = [15, 23, 42, 255];
  const cx = w / 2;
  const cy = h / 2;
  if (y > cy - 5 && y < cy + 5 && x > cx - 18 && x < cx + 18) return color;
  if (circle(x, y, cx - 12, cy, 20) && x < cx + 4) return color;
  if (circle(x, y, cx + 10, cy - 8, 12) && x > cx) return color;
  if (circle(x, y, cx + 10, cy + 8, 12) && x > cx) return color;
  if (circle(x, y, cx, cy - 18, 4) && x > cx - 2 && x < cx + 6) return color;
  return [255, 255, 255, 0];
});

fs.writeFileSync('public/images/world-map.png', worldMap);
fs.writeFileSync('public/images/aircraft.png', aircraft);
console.log('Generated public/images/world-map.png and public/images/aircraft.png');
