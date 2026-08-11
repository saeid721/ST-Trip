const fs = require('fs');
const path = require('path');
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
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
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

const GRID_COLS = 130;
const GRID_ROWS = 70;

function inEllipse(nx, ny, cx, cy, rx, ry) {
  const dx = (nx - cx) / rx;
  const dy = (ny - cy) / ry;
  return dx * dx + dy * dy <= 1;
}

function isLand(nx, ny) {
  // Hudson Bay cutout
  if (inEllipse(nx, ny, 0.24, 0.22, 0.045, 0.045)) return false;
  // Mediterranean Sea cutout
  if (inEllipse(nx, ny, 0.54, 0.35, 0.04, 0.02)) return false;
  // Black Sea cutout
  if (inEllipse(nx, ny, 0.60, 0.31, 0.02, 0.015)) return false;
  // Red Sea cutout
  if (nx > 0.60 && nx < 0.63 && ny > 0.38 && ny < 0.46 && (nx - 0.60) * 2 - (ny - 0.38) < 0.05) return false;

  // North America
  if (inEllipse(nx, ny, 0.17, 0.22, 0.09, 0.09)) return true; // Alaska / Northern Canada
  if (inEllipse(nx, ny, 0.21, 0.36, 0.09, 0.08)) return true; // USA
  if (inEllipse(nx, ny, 0.23, 0.46, 0.04, 0.05)) return true; // Mexico
  if (inEllipse(nx, ny, 0.26, 0.42, 0.015, 0.03)) return true; // Florida
  if (inEllipse(nx, ny, 0.26, 0.50, 0.02, 0.025)) return true; // Central America

  // Greenland
  if (inEllipse(nx, ny, 0.39, 0.14, 0.045, 0.075)) return true;

  // South America
  if (inEllipse(nx, ny, 0.33, 0.60, 0.07, 0.09)) return true; // North SA
  if (inEllipse(nx, ny, 0.32, 0.74, 0.04, 0.10)) return true; // South SA

  // Europe
  if (inEllipse(nx, ny, 0.52, 0.27, 0.07, 0.07)) return true; // Central/West Europe
  if (inEllipse(nx, ny, 0.53, 0.16, 0.03, 0.065)) return true; // Scandinavia
  if (inEllipse(nx, ny, 0.46, 0.24, 0.015, 0.025)) return true; // UK/Ireland
  if (inEllipse(nx, ny, 0.48, 0.33, 0.025, 0.025)) return true; // Iberia (Spain)

  // Africa
  if (inEllipse(nx, ny, 0.53, 0.45, 0.09, 0.07)) return true; // North Africa
  if (inEllipse(nx, ny, 0.57, 0.62, 0.055, 0.12)) return true; // Sub-Saharan Africa
  if (inEllipse(nx, ny, 0.64, 0.50, 0.025, 0.025)) return true; // Horn of Africa
  if (inEllipse(nx, ny, 0.63, 0.68, 0.012, 0.04)) return true; // Madagascar

  // Middle East
  if (inEllipse(nx, ny, 0.64, 0.41, 0.045, 0.05)) return true;

  // Asia
  if (inEllipse(nx, ny, 0.75, 0.20, 0.18, 0.09)) return true; // Siberia / Russia
  if (inEllipse(nx, ny, 0.78, 0.36, 0.09, 0.07)) return true; // East Asia / China
  if (inEllipse(nx, ny, 0.71, 0.48, 0.04, 0.06)) return true; // India
  if (inEllipse(nx, ny, 0.81, 0.54, 0.035, 0.045)) return true; // SE Asia
  if (inEllipse(nx, ny, 0.88, 0.30, 0.012, 0.04)) return true; // Japan
  if (inEllipse(nx, ny, 0.84, 0.60, 0.05, 0.025)) return true; // Indonesia

  // Australia & Oceania
  if (inEllipse(nx, ny, 0.85, 0.75, 0.07, 0.065)) return true; // Australia
  if (inEllipse(nx, ny, 0.94, 0.82, 0.015, 0.04)) return true; // New Zealand
  if (inEllipse(nx, ny, 0.88, 0.65, 0.03, 0.015)) return true; // Papua New Guinea

  return false;
}

function generateWorldMapSVG() {
  const width = 1200;
  const height = 650;
  const dotRadius = 3.0;
  const cellWidth = width / GRID_COLS;
  const cellHeight = height / GRID_ROWS;

  let dotsSvg = '';
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const nx = (c + 0.5) / GRID_COLS;
      const ny = (r + 0.5) / GRID_ROWS;

      if (isLand(nx, ny)) {
        const cx = (c + 0.5) * cellWidth;
        const cy = (r + 0.5) * cellHeight;
        dotsSvg += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${dotRadius}" fill="#94a3b8" opacity="0.65" />\n`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <rect width="100%" height="100%" fill="transparent" />
  ${dotsSvg}
</svg>`;
}

function generateAircraftSVG() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <g fill="#0f172a">
    <path d="M 32 4 C 30 4 28.5 7 28.5 14 L 28.5 28 L 6 38 C 4.5 38.6 4 40.2 5 41.5 C 5.8 42.5 7.2 42.5 8.5 41.8 L 28.5 34 L 28.5 50 L 21 54.5 C 20 55.1 19.5 56.2 20 57.2 C 20.5 58 21.5 58.2 22.5 57.6 L 32 52.5 L 41.5 57.6 C 42.5 58.2 43.5 58 44 57.2 C 44.5 56.2 44 55.1 43 54.5 L 35.5 50 L 35.5 34 L 55.5 41.8 C 56.8 42.5 58.2 42.5 59 41.5 C 60 40.2 59.5 38.6 58 38 L 35.5 28 L 35.5 14 C 35.5 7 34 4 32 4 Z" />
  </g>
</svg>`;
}

function generateWorldMapPNG() {
  const width = 1200;
  const height = 650;
  const cellW = width / GRID_COLS;
  const cellH = height / GRID_ROWS;
  const radius = 3.0;

  const dots = [];
  for (let r = 0; r < GRID_ROWS; r++) {
    for (let c = 0; c < GRID_COLS; c++) {
      const nx = (c + 0.5) / GRID_COLS;
      const ny = (r + 0.5) / GRID_ROWS;
      if (isLand(nx, ny)) {
        dots.push([(c + 0.5) * cellW, (r + 0.5) * cellH]);
      }
    }
  }

  return createPng(width, height, (x, y) => {
    for (let i = 0; i < dots.length; i++) {
      const dx = x - dots[i][0];
      const dy = y - dots[i][1];
      const distSq = dx * dx + dy * dy;
      if (distSq <= radius * radius) {
        const dist = Math.sqrt(distSq);
        const alpha = Math.floor(255 * Math.max(0, 1 - (dist / radius) * 0.3));
        return [148, 163, 184, alpha];
      }
    }
    return [0, 0, 0, 0];
  });
}

function generateAircraftPNG() {
  const size = 64;
  const cx = size / 2;

  return createPng(size, size, (x, y) => {
    const dx = Math.abs(x - cx);
    // Fuselage
    if (dx <= 3.5 && y >= 6 && y <= 54) return [15, 23, 42, 255];
    // Nose
    if (y < 6 && (dx * dx + (y - 6) * (y - 6)) <= 3.5 * 3.5) return [15, 23, 42, 255];
    // Wings
    if (y >= 28 && y <= 42) {
      const wingW = 28 * (1 - (y - 28) / 14);
      if (dx <= wingW) return [15, 23, 42, 255];
    }
    // Tail
    if (y >= 48 && y <= 58) {
      const tailW = 12 * (1 - (y - 48) / 10);
      if (dx <= tailW) return [15, 23, 42, 255];
    }
    return [0, 0, 0, 0];
  });
}

const imagesDir = path.join(__dirname, '..', 'public', 'images');

fs.writeFileSync(path.join(imagesDir, 'world-map.svg'), generateWorldMapSVG());
fs.writeFileSync(path.join(imagesDir, 'aircraft.svg'), generateAircraftSVG());
fs.writeFileSync(path.join(imagesDir, 'world-map.png'), generateWorldMapPNG());
fs.writeFileSync(path.join(imagesDir, 'aircraft.png'), generateAircraftPNG());

console.log('Regenerated world-map.svg, aircraft.svg, world-map.png, aircraft.png!');
