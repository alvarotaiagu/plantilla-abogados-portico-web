/* Valladares Mendoza Abogados — plantilla «Pórtico». main.js
   Sin build, sin framework. GSAP/ScrollTrigger/Lenis llegan por CDN;
   si fallan, la página se ve entera igualmente (ver comentarios). */
(function () {
  'use strict';

  var motionOn = document.documentElement.classList.contains('js-motion');
  var gsapListo = !!(window.gsap && window.ScrollTrigger);
  if (gsapListo) {
    document.documentElement.classList.add('gsap-listo');
    gsap.registerPlugin(ScrollTrigger);
  }

  /* ---------------- Lenis (motor único de scroll suave) ---------------- */
  var lenis = null;
  if (motionOn && window.Lenis) {
    try {
      lenis = new window.Lenis({ duration: 1.15, lerp: 0.18, smoothWheel: true });
      if (gsapListo) {
        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(function (time) { lenis.raf(time * 1000); });
        gsap.ticker.lagSmoothing(0);
      } else {
        requestAnimationFrame(function raf(time) { lenis.raf(time); requestAnimationFrame(raf); });
      }
    } catch (e) { lenis = null; }
  }

  /* ---------------- Cortina de entrada (portón de bronce) ---------------- */
  (function initCortina() {
    var cortina = document.getElementById('cortina');
    if (!cortina) return;
    document.documentElement.classList.add('bloqueo-scroll');

    function marcarHeroListo() {
      var texto = document.querySelector('.hero-texto');
      var scrollCue = document.querySelector('.hero-scroll');
      if (texto) texto.classList.add('visible');
      if (scrollCue) scrollCue.classList.add('visible');
    }

    function ocultar() {
      cortina.classList.add('oculta');
      document.documentElement.classList.remove('bloqueo-scroll');
      marcarHeroListo();
    }

    // Red de seguridad: la cortina se retira pase lo que pase (PLIEGO §5/§7).
    var seguridad = setTimeout(ocultar, 4200);

    if (!gsapListo) { ocultar(); return; }

    var tl = gsap.timeline({
      defaults: { ease: 'expo.inOut' },
      onComplete: function () { clearTimeout(seguridad); ocultar(); }
    });
    tl.to('.cortina-inicial', { opacity: 1, y: 0, duration: .55, stagger: .12 }, .15)
      .to('.cortina-inicial', { opacity: 0, duration: .3 }, 1.05)
      .to('.cortina-izq', { xPercent: -100, duration: 1.05 }, 1.1)
      .to('.cortina-der', { xPercent: 100, duration: 1.05 }, 1.1);
  })();

  /* ---------------- Cursor personalizado (solo puntero fino) ---------------- */
  (function initCursor() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    var cursor = document.getElementById('cursor');
    if (!cursor) return;
    document.documentElement.classList.add('cursor-activo');
    var x = -100, y = -100, tx = -100, ty = -100;
    window.addEventListener('mousemove', function (e) { tx = e.clientX; ty = e.clientY; });
    function anima() {
      x += (tx - x) * 0.2; y += (ty - y) * 0.2;
      cursor.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0)';
      requestAnimationFrame(anima);
    }
    requestAnimationFrame(anima);
    document.querySelectorAll('[data-cursor="enlace"]').forEach(function (el) {
      el.addEventListener('mouseenter', function () { cursor.classList.add('cursor-enlace'); });
      el.addEventListener('mouseleave', function () { cursor.classList.remove('cursor-enlace'); });
    });
  })();

  /* ---------------- Botones magnéticos ---------------- */
  (function initMagneticos() {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.boton-magnetico').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width / 2;
        var relY = e.clientY - r.top - r.height / 2;
        btn.style.transform = 'translate(' + (relX * 0.26) + 'px,' + (relY * 0.34) + 'px)';
      });
      btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
    });
  })();

  /* ---------------- Menú móvil ---------------- */
  (function initMenu() {
    var boton = document.getElementById('menu-boton');
    var menu = document.getElementById('menu-movil');
    if (!boton || !menu) return;
    function alternar(abrir) {
      boton.setAttribute('aria-expanded', String(abrir));
      menu.classList.toggle('abierto', abrir);
      menu.setAttribute('aria-hidden', String(!abrir));
      document.documentElement.classList.toggle('bloqueo-scroll', abrir);
    }
    boton.addEventListener('click', function () {
      alternar(boton.getAttribute('aria-expanded') !== 'true');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { alternar(false); });
    });
  })();

  /* ---------------- Aviso de cookies ---------------- */
  (function initCookies() {
    var banner = document.getElementById('cookie-banner');
    var ok = document.getElementById('cookie-ok');
    if (!banner || !ok) return;
    var CLAVE = 'vm-cookies';
    try {
      if (!localStorage.getItem(CLAVE)) banner.hidden = false;
    } catch (e) { banner.hidden = false; }
    ok.addEventListener('click', function () {
      try { localStorage.setItem(CLAVE, '1'); } catch (e) {}
      banner.hidden = true;
    });
  })();

  /* ---------------- Mapa bajo clic, sin API key ---------------- */
  (function initMapa() {
    var boton = document.getElementById('mapa-boton');
    var caja = document.getElementById('mapa-caja');
    if (!boton || !caja) return;
    boton.addEventListener('click', function () {
      if (caja.querySelector('iframe')) return;
      var query = encodeURIComponent('Valladares Mendoza Abogados, Avenida da Concordia 18, Vigo');
      var iframe = document.createElement('iframe');
      iframe.src = 'https://www.google.com/maps?q=' + query + '&output=embed';
      iframe.loading = 'lazy';
      iframe.title = 'Mapa de ubicación de Valladares Mendoza Abogados';
      iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
      var nota = caja.querySelector('.mapa-nota');
      boton.remove();
      if (nota) nota.remove();
      caja.appendChild(iframe);
    });
  })();

  /* ---------------- Friso: marquee con velocidad ligada al scroll ---------------- */
  (function initFriso() {
    var pista = document.getElementById('friso-pista');
    if (!pista || !motionOn) return;
    var x = 0;
    var base = 0.5;
    var boost = 0;
    function frame() {
      x -= (base + boost);
      boost *= 0.92;
      var mitad = pista.scrollWidth / 2;
      if (mitad > 0 && Math.abs(x) >= mitad) x += mitad;
      pista.style.transform = 'translate3d(' + x + 'px,0,0)';
      requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
    window.addEventListener('wheel', function (e) {
      boost = Math.min(Math.abs(e.deltaY) * 0.035, 5);
    }, { passive: true });
  })();

  /* ---------------- Cifras grabadas en piedra: contadores ---------------- */
  (function initCifras() {
    var cifras = document.querySelectorAll('.cifra[data-cuenta]');
    if (!cifras.length) return;
    cifras.forEach(function (cifra) {
      var num = cifra.querySelector('[data-num]');
      if (!num) return;
      var meta = parseInt(cifra.getAttribute('data-cuenta'), 10);
      if (motionOn) num.textContent = '0';
      var animado = false;
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || animado) return;
          animado = true;
          io.unobserve(cifra);
          if (!motionOn) { num.textContent = String(meta); return; }
          var inicio = performance.now();
          var duracion = 1400;
          function paso(ahora) {
            var t = Math.min((ahora - inicio) / duracion, 1);
            var facilitado = 1 - Math.pow(1 - t, 3);
            num.textContent = String(Math.round(meta * facilitado));
            if (t < 1) requestAnimationFrame(paso); else num.textContent = String(meta);
          }
          requestAnimationFrame(paso);
        });
      }, { threshold: 0.5 });
      io.observe(cifra);
    });
  })();

  /* ---------------- Char-reveal de titulares (letra/palabra a palabra) ---------------- */
  function splitPalabras(el) {
    var texto = el.textContent.trim();
    el.textContent = '';
    var palabras = texto.split(/\s+/);
    palabras.forEach(function (palabra, i) {
      var wrap = document.createElement('span');
      wrap.className = 'palabra';
      var inner = document.createElement('span');
      inner.className = 'palabra-inner';
      inner.textContent = palabra;
      wrap.appendChild(inner);
      el.appendChild(wrap);
      if (i < palabras.length - 1) el.appendChild(document.createTextNode(' '));
    });
  }

  (function initTitulares() {
    var elementos = document.querySelectorAll('.titular-reveal');
    elementos.forEach(function (el) { splitPalabras(el); });
    if (!gsapListo) return; // sin GSAP: las palabras quedan visibles, sin animar

    elementos.forEach(function (el) {
      var inners = el.querySelectorAll('.palabra-inner');
      gsap.set(inners, { yPercent: 120 });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          gsap.to(entry.target.querySelectorAll('.palabra-inner'), {
            yPercent: 0, duration: .9, ease: 'expo.out', stagger: 0.045
          });
          io.unobserve(entry.target);
        });
      }, { threshold: 0.35 });
      io.observe(el);
    });
  })();

  /* ---------------- Escalinata: peldaños que aparecen + marcador que sube ----------------
     El marcador y el peldaño "activo" son CONTENIDO (el paso en el que estás
     ahora), no solo movimiento: se actualizan siempre, con o sin GSAP y con
     movimiento reducido (solo cambia si el desplazamiento es instantáneo o
     suavizado). Por eso esta función no está gateada por gsapListo entera,
     a diferencia del resto de reveals de esta sección. */
  (function initEscalinata() {
    var peldanos = document.querySelectorAll('.peldano');
    if (!peldanos.length) return;

    if (gsapListo) {
      var ioReveal = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            ioReveal.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      peldanos.forEach(function (p, i) {
        p.style.transitionDelay = (i * 70) + 'ms';
        ioReveal.observe(p);
      });
    }

    var escalones = document.querySelectorAll('.escalon');
    var marcador = document.getElementById('escalon-marcador');
    if (!escalones.length || !marcador) return;

    var posiciones = [];
    escalones.forEach(function (esc) {
      var rect = esc.querySelector('rect');
      if (!rect) return;
      posiciones.push({
        x: parseFloat(rect.getAttribute('x')) + parseFloat(rect.getAttribute('width')) / 2,
        y: parseFloat(rect.getAttribute('y')) - 13
      });
    });
    if (!posiciones.length) return;

    var activo = -1;
    function marcar(indice) {
      if (indice === activo || indice < 0) return;
      activo = indice;
      escalones.forEach(function (e, i) { e.classList.toggle('activo', i <= indice); });
      peldanos.forEach(function (p, i) { p.classList.toggle('activo', i === indice); });
      var pos = posiciones[Math.min(indice, posiciones.length - 1)];
      if (motionOn && gsapListo) {
        gsap.to(marcador, { attr: { cx: pos.x, cy: pos.y }, duration: .5, ease: 'power2.out' });
      } else {
        marcador.setAttribute('cx', pos.x);
        marcador.setAttribute('cy', pos.y);
      }
    }

    var ioPaso = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) marcar(Array.prototype.indexOf.call(peldanos, entry.target));
      });
    }, { threshold: 0.5, rootMargin: '-35% 0px -35% 0px' });
    peldanos.forEach(function (p) { ioPaso.observe(p); });
  })();

  /* ---------------- Testimonios: sello que se traza al entrar ---------------- */
  (function initSellos() {
    var testimonios = document.querySelectorAll('.testimonio');
    if (!testimonios.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    testimonios.forEach(function (t, i) {
      t.style.transitionDelay = ((i % 3) * 90) + 'ms';
      io.observe(t);
    });
  })();

  /* ---------------- Tarjetas con inclinación 3D siguiendo el puntero ---------------- */
  (function initTarjetas3d() {
    if (!motionOn || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('.tarjeta-3d').forEach(function (card) {
      card.addEventListener('mousemove', function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        card.style.transform = 'perspective(900px) rotateX(' + (py * -6).toFixed(2) + 'deg) rotateY(' + (px * 8).toFixed(2) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', function () { card.style.transform = ''; });
    });
  })();

  /* ---------------- Directorio: placas de bronce que se graban ---------------- */
  (function initPlacas() {
    if (!gsapListo) return;
    var placas = document.querySelectorAll('.placa');
    if (!placas.length) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    placas.forEach(function (p, i) {
      p.querySelector('.placa-superficie').style.transitionDelay = ((i % 3) * 100) + 'ms';
      io.observe(p);
    });
  })();

  /* ---------------- Hero: la columnata avanza y se separa con el scroll ---------------- */
  (function initHero() {
    if (!gsapListo) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    var columnas = gsap.utils.toArray('.columna-grupo');
    if (!columnas.length) return;
    var centro = (columnas.length - 1) / 2;
    columnas.forEach(function (col, i) {
      var dist = (i - centro) * -20;
      gsap.fromTo(col,
        { x: dist, scale: 0.93, transformOrigin: '50% 100%' },
        {
          x: 0, scale: 1, ease: 'none', immediateRender: false,
          scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 }
        }
      );
    });
    gsap.fromTo('.hero-patio',
      { y: 30 },
      { y: 0, ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom bottom', scrub: 0.6 } }
    );
  })();

  /* ---------------- Alas: galería anclada con scroll horizontal ---------------- */
  (function initAlas() {
    var pin = document.getElementById('alas-pin');
    var pista = document.getElementById('alas-pista');
    var barra = document.getElementById('alas-progreso-barra');
    if (!pin || !pista) return;

    function actualizarTabindex() {
      if (pin.classList.contains('pin-activo')) { pista.removeAttribute('tabindex'); return; }
      var desborda = pista.scrollWidth > pista.clientWidth + 4;
      if (desborda) pista.setAttribute('tabindex', '0'); else pista.removeAttribute('tabindex');
    }
    actualizarTabindex();
    window.addEventListener('resize', actualizarTabindex);

    // Sin GSAP, o con movimiento reducido: queda como carrusel horizontal
    // manual con scroll-snap, accesible por teclado y por gesto. El pin +
    // scrub es movimiento vestibular de verdad (toda la pantalla se ancla y
    // se desplaza con el scroll), así que se apaga con
    // prefers-reduced-motion igual que el paralaje del hero, no solo el
    // GSAP genérico de reveals.
    if (!gsapListo || !motionOn) return;

    pin.classList.add('pin-activo');
    actualizarTabindex();

    var alasEls = pista.querySelectorAll('.ala');

    function calcularDistancia() {
      var total = 0;
      alasEls.forEach(function (ala) { total += ala.getBoundingClientRect().width; });
      total += (alasEls.length - 1) * 22.4;
      return Math.max(total - pin.clientWidth, 0);
    }

    // Efecto de profundidad: el ala más cercana al centro del pin (la que
    // se está "recorriendo" en ese instante) queda a tamaño completo; las
    // que quedan atrás o por llegar se encogen y atenúan, como al cruzar el
    // umbral de una sala hacia la siguiente.
    function actualizarProfundidad() {
      var centro = pin.getBoundingClientRect().left + pin.clientWidth / 2;
      alasEls.forEach(function (ala) {
        var r = ala.getBoundingClientRect();
        var cx = r.left + r.width / 2;
        var t = Math.min(Math.abs(cx - centro) / (pin.clientWidth * 0.55), 1);
        ala.style.transform = 'scale(' + (1 - t * 0.12).toFixed(3) + ')';
        ala.style.opacity = (1 - t * 0.4).toFixed(3);
      });
    }

    var distancia = calcularDistancia();
    var cabeceraSitio = document.querySelector('.cabecera');
    // "top top" ancla el pin con la caja pegada a y=0, justo donde vive la
    // cabecera fija del sitio (position:fixed, z-index por encima): el
    // título de "alas" quedaba grabado ahí debajo, tapado y difuminado,
    // durante todo el scrub. Se ancla en su lugar a la altura de esa
    // cabecera para que el pin quede siempre por debajo de ella.
    ScrollTrigger.create({
      trigger: pin,
      start: 'top ' + (cabeceraSitio ? cabeceraSitio.offsetHeight : 64) + 'px',
      end: function () { return '+=' + (distancia + window.innerHeight * 0.6); },
      pin: true,
      scrub: 0.6,
      invalidateOnRefresh: true,
      onRefresh: function () { distancia = calcularDistancia(); actualizarProfundidad(); },
      onUpdate: function (self) {
        gsap.set(pista, { x: -distancia * self.progress });
        actualizarProfundidad();
        if (barra) barra.style.width = (self.progress * 100) + '%';
      }
    });
    actualizarProfundidad();
  })();

  /* ---------------- Refresco tras fuentes/imagenes ---------------- */
  if (gsapListo && document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      setTimeout(function () { ScrollTrigger.refresh(); }, 60);
    });
  }
})();
