/* Rasteriza icon.svg a los PNG de PWA y compone og.png sobre la fachada.
   node scripts/generate_icons.js   (con un servidor local sirviendo el repo) */
const { chromium } = require('playwright');
const path = require('path');
const BASE = process.env.VM_URL || 'http://127.0.0.1:8973/';
const OUT = path.join(__dirname, '..', 'assets', 'img', 'logo');

(async () => {
  const b = await chromium.launch();

  for (const size of [96, 180, 192, 512]) {
    const p = await b.newPage({ viewport: { width: size, height: size } });
    await p.setContent(`<body style="margin:0;background:#171310"><img src="${BASE}assets/img/logo/icon.svg" width="${size}" height="${size}"></body>`);
    await p.waitForTimeout(200);
    await p.screenshot({ path: path.join(OUT, `icon-${size}.png`) });
    await p.close();
  }

  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await p.setContent(`<!DOCTYPE html><html><head><meta charset="utf-8">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600&family=JetBrains+Mono:wght@500&display=swap">
    </head>
    <body style="margin:0;height:630px;background:#171310;display:grid;place-items:center">
    <div style="display:flex;flex-direction:column;align-items:center;gap:26px">
      <svg width="110" height="110" viewBox="0 0 64 64">
        <g fill="#C79A52">
          <path d="M32 9 L53 24 L11 24 Z"/>
          <rect x="15" y="26" width="6.5" height="27"/>
          <rect x="28.75" y="26" width="6.5" height="27"/>
          <rect x="42.5" y="26" width="6.5" height="27"/>
          <rect x="11" y="53" width="42" height="5.5"/>
        </g>
      </svg>
      <p style="margin:0;font-family:'Cinzel',serif;font-weight:600;font-size:50px;color:#F6F2E6;letter-spacing:.03em;text-align:center">Valladares Mendoza</p>
      <p style="margin:0;font-family:'JetBrains Mono',monospace;font-size:18px;letter-spacing:.28em;color:#C79A52;text-transform:uppercase">Abogados · Vigo</p>
    </div></body></html>`);
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  await p.screenshot({ path: path.join(OUT, 'og.png') });
  await b.close();
  console.log('iconos y og.png listos en', OUT);
})();
