// Renders poster.html (1024x1024) to entry.png with headless Chromium.
// Run from the entry directory: node render.mjs
import { chromium } from '/opt/muse/assets/spaces/ts-runtime/dist/node_modules/playwright/index.mjs';
import { homedir } from 'node:os';
import { join } from 'node:path';

const browser = await chromium.launch({
  executablePath: join(homedir(), '.cache/ms-playwright/chromium_headless_shell-1193/chrome-linux/headless_shell'),
  args: ['--no-sandbox', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const page = await browser.newPage({ viewport: { width: 1024, height: 1024 }, deviceScaleFactor: 1 });
await page.goto('file://' + process.cwd() + '/poster.html');
await page.screenshot({ path: 'entry.png' });
await browser.close();
console.log('rendered entry.png');
