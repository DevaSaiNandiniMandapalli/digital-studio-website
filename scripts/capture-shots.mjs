import { mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';

const projects = [
  ['kasoori', 'https://kasoori-website-demo.vercel.app/'],
  ['kapoors-cafe', 'https://kapoors-cafe-website.vercel.app/'],
  ['sirajs-juice', 'https://sirajs-international-juice-center-c.vercel.app/'],
  ['juice-bay', 'https://juice-bay.vercel.app/'],
  ['joyess-lifestyle', 'https://joyess-lifestyle-concept.vercel.app/'],
  ['special-9', 'https://special-9-restaurant-concept.vercel.app/'],
  ['fluids-store', 'https://fluids-store-demo-ebdd.vercel.app/'],
  ['grand-4-seasons', 'https://grand-4-seasons.vercel.app/'],
  ['chutneys', 'https://chutneys-hyderabad-concept.vercel.app/'],
  ['balaji-juice', 'https://balaji-abhishek-juice-centre.vercel.app/'],
  ['tara-kitchen', 'https://tara-south-indian-kitchen.vercel.app/'],
  ['deccan-waffle', 'https://deccan-waffle-house.vercel.app/'],
];

const outDir = new URL('../public/shots/', import.meta.url);
await mkdir(outDir, { recursive: true });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

for (const [slug, url] of projects) {
  const dest = new URL(`${slug}.jpg`, outDir);
  if (existsSync(dest)) {
    console.log('skip', slug);
    continue;
  }
  let ok = false;
  for (let attempt = 1; attempt <= 4 && !ok; attempt++) {
    try {
      const src = `https://image.thum.io/get/width/1200/crop/820/wait/2/noanimate/${url}`;
      const res = await fetch(src, { signal: AbortSignal.timeout(60000) });
      if (!res.ok) throw new Error(`status ${res.status}`);
      const buf = Buffer.from(await res.arrayBuffer());
      if (buf.length < 12000) throw new Error(`too small ${buf.length}`);
      await writeFile(dest, buf);
      console.log('saved', slug, buf.length);
      ok = true;
    } catch (err) {
      console.warn('retry', slug, attempt, err.message);
      await sleep(1500 * attempt);
    }
  }
  if (!ok) console.error('FAILED', slug);
  await sleep(500);
}

console.log('done');
