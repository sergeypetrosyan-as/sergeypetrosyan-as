// Contact sheet of dumped frames for review: node src/sheet.mjs <pattern> <out.png> [cols] [scale]
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { loadImage, createCanvas } from '@napi-rs/canvas';
import { writeFileSync } from 'node:fs';
const [pat, out, cols = 5, scale = 0.5] = process.argv.slice(2);
const dir = join(process.cwd(), '.frames');
const files = readdirSync(dir).filter((f) => f.includes(pat)).sort();
const imgs = await Promise.all(files.map((f) => loadImage(join(dir, f))));
const w = imgs[0].width * scale, h = imgs[0].height * scale;
const rows = Math.ceil(imgs.length / cols);
const c = createCanvas(w * cols, h * rows), g = c.getContext('2d');
g.fillStyle = '#808080'; g.fillRect(0, 0, c.width, c.height);
imgs.forEach((im, i) => g.drawImage(im, (i % cols) * w, ((i / cols) | 0) * h, w, h));
writeFileSync(out, c.toBuffer('image/png'));
console.log(files.length, 'frames ->', out);
