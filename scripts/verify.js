/* Verificación del PLIEGO §7 para Valladares Mendoza Abogados («Pórtico»).
   node scripts/verify.js   (con VM_URL apuntando a un servidor o a Pages) */
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = process.env.VM_URL || 'http://127.0.0.1:8973/';
const OUT = path.join(__dirname, '..', 'screenshots');
fs.mkdirSync(OUT, { recursive: true });

const SECCIONES = ['#metodo', '.friso', '#directorio', '#alas', '#cifras', '#testimonios', '#contacto'];

async function scrollHasta(page, selector, paso) {
  paso = paso || 240;
  for (let i = 0; i < 150; i++) {
    const enVista = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top < window.innerHeight * 0.4 && r.bottom > 0;
    }, selector);
    if (enVista) break;
    await page.mouse.wheel(0, paso);
    await page.waitForTimeout(70);
  }
  await page.waitForTimeout(1400); // asentar Lenis + disparar IO/ScrollTrigger
}

function attachLoggers(page, bucket, etiqueta) {
  page.on('console', (msg) => { if (msg.type() === 'error') bucket.consoleErrors.push(`[${etiqueta}] ${msg.text()}`); });
  page.on('pageerror', (err) => bucket.consoleErrors.push(`[${etiqueta}] pageerror: ${err.message}`));
  page.on('requestfailed', (req) => {
    const f = req.failure();
    bucket.peticionesFallidas.push(`[${etiqueta}] ${req.url()} — ${f && f.errorText}`);
  });
  page.on('response', (res) => { if (res.status() >= 400) bucket.peticionesFallidas.push(`[${etiqueta}] ${res.status()} ${res.url()}`); });
}

(async () => {
  const browser = await chromium.launch();
  const informe = { consoleErrors: [], peticionesFallidas: [], notas: [], comprobaciones: {} };

  /* ---------------- 1-4. Pasada normal, escritorio y móvil ---------------- */
  const TAMANOS = [
    { name: 'escritorio', width: 1440, height: 900 },
    { name: 'movil', width: 390, height: 844 }
  ];
  for (const tam of TAMANOS) {
    const opciones = { viewport: { width: tam.width, height: tam.height } };
    if (tam.name === 'movil') { opciones.isMobile = true; opciones.hasTouch = true; }
    const ctx = await browser.newContext(opciones);
    const page = await ctx.newPage();
    attachLoggers(page, informe, `normal-${tam.name}`);

    await page.goto(BASE, { waitUntil: 'networkidle' });

    // Fotogramas intermedios de la cortina (PLIEGO §7.6bis)
    await page.waitForTimeout(500);
    await page.screenshot({ path: path.join(OUT, `${tam.name}-00-cortina-media.png`) });

    await page.waitForSelector('#cortina', { state: 'hidden', timeout: 9000 }).catch(() =>
      informe.notas.push(`La cortina no se retiró a tiempo en ${tam.name}`)
    );
    const cortinaDisplay = await page.evaluate(() => getComputedStyle(document.getElementById('cortina')).display);
    informe.comprobaciones[`cortina-display-${tam.name}`] = cortinaDisplay;

    await page.waitForTimeout(300);
    await page.screenshot({ path: path.join(OUT, `${tam.name}-01-portada.png`) });

    for (const sel of SECCIONES) {
      await scrollHasta(page, sel, tam.name === 'movil' ? 160 : 240);
      const archivo = sel.replace(/[#.]/g, '');
      await page.screenshot({ path: path.join(OUT, `${tam.name}-${archivo}.png`) });
    }

    const clases = await page.evaluate(() => ({
      jsMotion: document.documentElement.classList.contains('js-motion'),
      gsapListo: document.documentElement.classList.contains('gsap-listo')
    }));
    informe.comprobaciones[`clases-${tam.name}`] = clases;

    const cifras = await page.evaluate(() => Array.from(document.querySelectorAll('.cifra-num')).map((n) => n.textContent));
    informe.comprobaciones[`cifras-${tam.name}`] = cifras;

    if (tam.name === 'movil') {
      await page.click('#menu-boton');
      await page.waitForTimeout(500);
      const expandido = await page.getAttribute('#menu-boton', 'aria-expanded');
      const abierto = await page.evaluate(() => document.getElementById('menu-movil').classList.contains('abierto'));
      informe.comprobaciones['menu-movil-abre'] = { expandido, abierto };
      await page.screenshot({ path: path.join(OUT, `${tam.name}-02-menu-abierto.png`) });
      await page.click('#menu-boton');
      await page.waitForTimeout(500);
      const expandidoCierra = await page.getAttribute('#menu-boton', 'aria-expanded');
      informe.comprobaciones['menu-movil-cierra'] = expandidoCierra;
    }

    if (tam.name === 'escritorio') {
      await scrollHasta(page, '#contacto', 240);
      const iframesAntes = await page.evaluate(() => document.querySelectorAll('#mapa-caja iframe').length);
      await page.click('#mapa-boton');
      await page.waitForTimeout(700);
      const iframesDespues = await page.evaluate(() => document.querySelectorAll('#mapa-caja iframe').length);
      const srcMapa = await page.evaluate(() => {
        const ifr = document.querySelector('#mapa-caja iframe');
        return ifr ? ifr.src : null;
      });
      informe.comprobaciones['mapa-bajo-clic'] = { iframesAntes, iframesDespues, srcMapa };
      await page.screenshot({ path: path.join(OUT, `${tam.name}-mapa-cargado.png`) });

      // Alas: desborde/tabindex y progreso del pin
      const alasInfo = await page.evaluate(() => {
        const pin = document.getElementById('alas-pin');
        const pista = document.getElementById('alas-pista');
        return { pinActivo: pin.classList.contains('pin-activo'), tabindex: pista.getAttribute('tabindex') };
      });
      informe.comprobaciones['alas'] = alasInfo;
    }

    await ctx.close();
  }

  /* ---------------- Cookie banner (contexto limpio) ---------------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    attachLoggers(page, informe, 'cookies');
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1200);
    const visibleAntes = await page.isVisible('#cookie-banner');
    await page.screenshot({ path: path.join(OUT, 'escritorio-03-cookies-visible.png') });
    await page.click('#cookie-ok');
    await page.waitForTimeout(300);
    const hiddenDespues = await page.getAttribute('#cookie-banner', 'hidden');
    const guardado = await page.evaluate(() => { try { return localStorage.getItem('vm-cookies'); } catch (e) { return null; } });
    informe.comprobaciones['cookie-banner'] = { visibleAntes, hiddenDespues, guardado };
    await page.screenshot({ path: path.join(OUT, 'escritorio-04-cookies-cerrado.png') });
    await ctx.close();
  }

  /* ---------------- 5. GSAP/Lenis bloqueados (CDN abajo) ---------------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    attachLoggers(page, informe, 'sin-gsap');
    await page.route('**jsdelivr.net/npm/gsap**', (route) => route.abort());
    await page.route('**jsdelivr.net/npm/lenis**', (route) => route.abort());
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);
    const clasesSinGsap = await page.evaluate(() => ({
      jsMotion: document.documentElement.classList.contains('js-motion'),
      gsapListo: document.documentElement.classList.contains('gsap-listo'),
      cortinaDisplay: getComputedStyle(document.getElementById('cortina')).display
    }));
    informe.comprobaciones['sin-gsap'] = clasesSinGsap;
    await page.screenshot({ path: path.join(OUT, 'escritorio-05-sin-gsap-portada.png') });
    await page.mouse.wheel(0, 5000);
    await page.waitForTimeout(700);
    await page.screenshot({ path: path.join(OUT, 'escritorio-05-sin-gsap-scroll.png') });
    await ctx.close();
  }

  /* ---------------- 6. prefers-reduced-motion ---------------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    const page = await ctx.newPage();
    attachLoggers(page, informe, 'reduced-motion');
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);
    const clasesReducido = await page.evaluate(() => ({
      jsMotion: document.documentElement.classList.contains('js-motion'),
      cortinaDisplay: getComputedStyle(document.getElementById('cortina')).display
    }));
    informe.comprobaciones['reduced-motion'] = clasesReducido;
    await page.screenshot({ path: path.join(OUT, 'escritorio-06-reduced-motion-portada.png') });
    await page.mouse.wheel(0, 6000);
    await page.waitForTimeout(700);
    const cifras = await page.evaluate(() => Array.from(document.querySelectorAll('.cifra-num')).map((n) => n.textContent));
    informe.comprobaciones['reduced-motion-cifras'] = cifras;
    await page.screenshot({ path: path.join(OUT, 'escritorio-06-reduced-motion-cifras.png') });
    await ctx.close();
  }

  /* ---------------- 8. Sin marcadores pendientes ---------------- */
  {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const texto = await page.evaluate(() => document.body.innerText);
    const sospechosos = ['[PENDIENTE]', 'PENDIENTE', 'TODO', 'Lorem ipsum', 'lorem ipsum', 'NUMERO-PENDIENTE'];
    informe.comprobaciones['marcadores-pendientes'] = sospechosos.filter((s) => texto.includes(s));
    await ctx.close();
  }

  /* ---------------- 404.html y legal.html ---------------- */
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    attachLoggers(page, informe, 'paginas-extra');
    await page.goto(BASE + '404.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT, 'escritorio-404.png') });
    await page.goto(BASE + 'legal.html', { waitUntil: 'networkidle' });
    await page.screenshot({ path: path.join(OUT, 'escritorio-legal.png') });
    await ctx.close();
  }

  await browser.close();

  informe.resumen = { erroresConsola: informe.consoleErrors.length, peticionesFallidas: informe.peticionesFallidas.length };
  fs.writeFileSync(path.join(__dirname, 'verify-report.json'), JSON.stringify(informe, null, 2));
  console.log(JSON.stringify(informe, null, 2));
})();
