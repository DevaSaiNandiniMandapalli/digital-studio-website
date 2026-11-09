import { chromium } from 'playwright-core';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const projects = [
  ['kasoori', 'https://kasoori-website-demo.vercel.app/'],
  ['kapoors-cafe', 'https://kapoors-cafe-website.vercel.app/'],
  ['siraj-juice', 'https://sirajs-international-juice-center-c.vercel.app/'],
  ['tarigonda-farm', 'https://tarigonda-natukollu-farm.vercel.app/'],
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

const out = path.resolve('public/projects');
await mkdir(out, { recursive: true });

const browser = await chromium.launch({
  executablePath: '/usr/bin/chromium',
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

for (const [slug, url] of projects) {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(2500);
    await page.evaluate(() => {
      document.querySelectorAll('*').forEach((el) => {
        const s = getComputedStyle(el);
        if (s.animationDuration && parseFloat(s.animationDuration) > 0) {
          el.style.animationPlayState = 'paused';
        }
      });
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(600);
    await page.screenshot({
      path: path.join(out, `${slug}.jpg`),
      type: 'jpeg',
      quality: 84,
      animations: 'disabled',
    });
    console.log('ok', slug);
  } catch (e) {
    console.error('FAIL', slug, e.message);
  } finally {
    await page.close();
  }
}

await browser.close();
