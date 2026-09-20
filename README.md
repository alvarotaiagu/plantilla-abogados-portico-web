# Valladares Mendoza Abogados — plantilla «Pórtico»

> **Sitio de demostración.** Valladares Mendoza Abogados es un negocio
> ficticio, creado como plantilla de muestra para la biblioteca de plantillas
> de WEBS NEGOCIOS. Los datos, el equipo y las opiniones son de muestra: no
> corresponden a ningún despacho real de Vigo ni de ningún otro lugar. Meta
> `robots: noindex, nofollow` en todas las páginas.

Despacho de abogados mercantilistas en Vigo: derecho mercantil y societario,
fusiones y adquisiciones, contratación y *compliance*, arbitraje y litigación
mercantil. Cuarta plantilla ficticia del sector abogacía, autorizada por
excepción en `SECTORES.md` (2026-09-20) por el mismo motivo que ya se abrió
para asesoría fiscal: es un nicho que ya ha dado varios clientes reales
(Blanco Regueiro, Castro Pombo, MJ Ramos Castro) y conviene tener un
escaparate de muestra propio, con un registro visual completamente distinto
al de esos tres despachos.

## El concepto: «Pórtico»

Vigo es la plaza de negocio más grande de Galicia; un despacho mercantilista
de gran empresa se presenta como un edificio institucional: columnas, mármol,
bronce, la luz de una fachada de juzgado. Un **pórtico** es la columnata de
entrada de ese tipo de edificio —juzgados, capitolios, bancos—: la fachada
que hay que atravesar antes de llegar al asunto. Ese recorrido, de fuera
hacia dentro, es el hilo que ordena toda la web:

1. Se atraviesa el **portón** de bronce (cortina de entrada).
2. Se ve la **fachada**: la columnata da paralaje con el scroll, como si se
   avanzara hacia ella, y el nombre del despacho aparece tallado en el
   arquitrabe.
3. Se sube la **escalinata**: el método de trabajo, en cuatro tramos.
4. Se cruza el **friso**: una cinta de máximas jurídicas latinas clásicas.
5. Se entra al **vestíbulo**: el directorio de bronce con el equipo.
6. Se recorren las **alas** del edificio: las áreas de práctica, como salas
   distintas.
7. Se leen las **cifras grabadas en piedra**: la trayectoria del despacho.
8. Se llega al **contacto**: la puerta de salida, con la ficha y el mapa.

Las tres plantillas de abogado que ya existen en la biblioteca (Blanco
Regueiro, Castro Pombo, MJ Ramos Castro) usan metáfora de **papel y
documento**: una web que se subraya, una maqueta de prensa en blanco y negro,
un pergamino notarial con un rotulador que se traza. «Pórtico» se aleja del
todo de esa familia a propósito: nada de folios, nada de trazo de rotulador,
nada de maquetación de prensa. El motivo estructural es **arquitectónico**,
no de papel ni orgánico: el hero es una fachada SVG con paralaje de scroll,
no un canvas de partículas ni un shader.

## Paleta

Piedra/hueso + bronce/latón oscuro, con un acento de pátina de bronce
(verdín) contenido, que nunca compite con el bronce principal. Calculada con
`node scripts/contraste.js` antes de cerrar el CSS (WCAG, luminancia
relativa) — ver la salida completa en el historial del repo.

| Token | Valor | Uso |
|---|---|---|
| `--piedra` | `#EDE7D8` | Fondo base |
| `--panel` | `#E3DBC6` | Paneles claros |
| `--hueso` | `#F6F2E6` | Tarjetas |
| `--tinta` | `#241F18` | Texto principal, fondo de secciones oscuras |
| `--fachada` | `#171310` | Fondo de vestíbulo/contacto/pie (fachada nocturna) |
| `--muted` | `#5B5346` | Texto secundario sobre piedra/hueso — 6,1–6,8:1 |
| `--muted-oscuro` | `#C9BFA9` | Texto secundario sobre tinta/fachada — 9–10:1 |
| `--bronce` | `#8C6A34` | Marca, grandes superficies (no como texto pequeño) |
| `--bronce-texto` | `#6B4E22` | Bronce como texto/botón — 6,2–6,9:1 |
| `--bronce-claro` | `#C79A52` | Bronce sobre fondo oscuro — 6,4–7,2:1 |
| `--verdin` | `#4C7267` | Pátina, acento secundario, superficies |
| `--verdin-texto` | `#3C5B52` | Verdín como texto — 6,1–6,7:1 |
| `--verdin-claro` | `#8FBBAC` | Verdín sobre fondo oscuro — 7,7–8,7:1 |

Ningún texto se apaga con `opacity`: `--muted`, `--muted-oscuro`,
`--bronce-texto` y `--verdin-texto` son colores propios y auditables. El
único par que no llega a 4,5:1 es el bronce *decorativo* (`--bronce`, no
`--bronce-texto`) usado como fondo de superficies grandes, nunca como fondo
de un botón con texto encima.

## Tipografía (Google Fonts)

- **Cinzel** — titulares, inscripción del arquitrabe, marca. Es la única
  fuente de inscripción monumental romana de la lista; encaja con el
  concepto de forma literal.
- **Piazzolla** — cuerpo de texto, serif ancha y legible.
- **JetBrains Mono** — cifras, etiquetas, datos de contacto y del
  directorio. Se evitó IBM Plex Mono (muy repetida en la biblioteca) y
  Space Mono (ya usada en `plantilla-asesoria-sello-web`).

Comprobado antes de cerrar la tipografía que las tres renderizan `€`, `ñ`,
tildes y comillas latinas «» correctamente (ninguna tiene el problema de
glifos faltantes de la cursiva de Fraunces). Ninguna de las tres se repite
en `REGISTRO.md` ni en `registro/*.md`.

## El negocio ficticio

- **Nombre**: Valladares Mendoza Abogados. Comprobado por búsqueda web antes
  de fijarlo: no hay ningún despacho real con ese nombre en España/Galicia.
- **Ciudad**: Vigo (Pontevedra) — plaza de negocio más grande de Galicia,
  no repetida en ninguna otra plantilla de abogacía o asesoría de la
  biblioteca (esas están en Carballo y Betanzos).
- **Dirección**: Avenida da Concordia, 18, 4º · 36203 Vigo — calle genérica
  inventada, no la dirección de ningún despacho real.
- **Teléfono**: 986 00 00 00 (despacho) · 600 00 00 00 (móvil/WhatsApp).
- **Email**: `contacto@valladaresmendoza.example` — dominio `.example`,
  reservado por IANA para uso ficticio.
- **CIF**: B36000000, de muestra.
- **Áreas de práctica** (4, con texto completo): derecho mercantil y
  societario, fusiones y adquisiciones (M&A), contratación mercantil y
  *compliance*, arbitraje y litigación mercantil.
- **Equipo**: 6 personas con nombre, cargo y área, sin fotografía —
  panel de bronce del vestíbulo, no retratos inventados de gente que no
  existe (norma del PLIEGO para negocios ficticios que necesitan mostrar
  personas).
- **Testimonios**: 3, con nombre de pila y marcados como «testimonio de
  muestra», nunca atribuidos a Google/Trustpilot ni con estrellas. Sin
  `aggregateRating` ni `review` en el `schema.org` (`LegalService` sin
  valoraciones).
- **Cifras**: 32 años de trayectoria (desde 1994), 480 operaciones
  mercantiles cerradas, 14 sectores de actividad asesorados, 120 empresas en
  cartera activa — todo inventado y coherente, nunca un ranking o premio
  real.

Sin ningún `[PENDIENTE]`: todos los datos están completos, de muestra.

## Mapa de secciones (distinto en orden, número y forma de las plantillas anteriores)

1. **Cortina** — portón de bronce de dos hojas que se abre (gesto propio,
   no reutilizado de otra plantilla).
2. **`#inicio`** — hero/pórtico: fachada SVG con seis columnas, frontón y
   arquitrabe; paralaje de scroll; nombre tallado con char-reveal.
3. **`#metodo`** — escalinata: cuatro peldaños («Diagnóstico», «Estrategia»,
   «Ejecución», «Seguimiento»).
4. **Friso** — cinta de máximas jurídicas latinas, velocidad ligada al scroll.
5. **`#directorio`** — panel de bronce del vestíbulo: 6 placas con nombre,
   cargo y área, sin fotos.
6. **`#alas`** — galería anclada con scroll horizontal: 4 áreas de práctica
   como alas del edificio.
7. **`#cifras`** — cifras grabadas en piedra, contador al entrar en pantalla.
8. **`#testimonios`** — 3 testimonios de empresas clientes ficticias.
9. **`#contacto`** — ficha del despacho, mapa solo bajo clic, formulario de
   contacto por email/teléfono/WhatsApp.
10. **Pie** — navegación, legal, sello de demo.

## Movimiento (PLIEGO §2 — mínimo 5, aquí hay 8)

1. **Lenis** como único motor de scroll suave (`lerp` subido a 0,18 por el
   scrub horizontal de «Alas», ver trampa del PLIEGO sobre el retardo de
   Lenis en scrub perpendicular).
2. **Char-reveal** palabra a palabra — inscripción del arquitrabe y todos
   los `h2.titular-reveal`, con `IntersectionObserver` (nunca
   `ScrollTrigger({once:true})`, que no dispara si el elemento ya está en
   pantalla al crearse).
3. **Marquee** infinito del friso, con la velocidad ligada al scroll
   (impulso adicional proporcional al `deltaY` de la rueda). No depende de
   GSAP: sigue funcionando aunque el CDN falle.
4. **Galería anclada (pin) con scroll horizontal scrubbeado** — «Alas»
   (áreas de práctica). Sin GSAP, se degrada a un carrusel horizontal manual
   con `scroll-snap`, focusable por teclado solo cuando de verdad desborda.
5. **Botones/enlaces magnéticos** — CTA del hero y todos los datos de
   contacto (teléfono, WhatsApp, email).
6. **Cursor personalizado** contextual — solo con `pointer: fine`, se agranda
   sobre enlaces y el botón del mapa.
7. **Contadores** — las cuatro cifras grabadas en piedra, con
   `IntersectionObserver` y `requestAnimationFrame` (no depende de GSAP).
8. **Máscara que se abre con el scroll** — las placas del directorio de
   bronce se «graban» con un `clip-path` que se abre de izquierda a
   derecha, vía transición CSS + `IntersectionObserver` (nunca dos tweens de
   GSAP sobre el mismo `clip-path`).

Además, el propio hero tiene un noveno recurso no listado en el PLIEGO como
obligatorio: el **paralaje de la columnata** (seis columnas que se separan y
escalan con `scrollTrigger scrub` mientras la sección queda anclada con
`position: sticky`), que es el gesto central del concepto.

## Accesibilidad

- Contraste AA calculado con script (ver paleta arriba), nunca a ojo.
- Foco visible (`:focus-visible`), landmarks (`header`, `main`, `footer`,
  `nav` con `aria-label`), `alt`/`aria-label` con sentido en todo lo
  decorativo (`aria-hidden="true"` en los SVG puramente ornamentales).
- Menú móvil con `aria-expanded` y `aria-hidden` sincronizados.
- La galería horizontal de «Alas» solo lleva `tabindex="0"` cuando de verdad
  desborda el contenedor (se recalcula en `resize`), evitando una parada de
  tabulación inútil en escritorio.
- `prefers-reduced-motion: reduce` apaga el movimiento, no el contenido: la
  cortina desaparece al instante (no se llega a animar), la columnata del
  hero no se pin-ea ni escala, pero las cifras siguen contando (con salto
  directo al valor final) y todos los textos se ven completos desde el
  primer fotograma.

## Rendimiento

- Sin canvas ni WebGL: el hero es SVG + CSS + `scrollTrigger scrub`, así que
  no aplica el riesgo de `ctx.filter`/`shadowBlur` por fotograma del PLIEGO.
- El marquee del friso y los contadores están escritos en JS puro
  (`requestAnimationFrame` + `IntersectionObserver`), sin depender de GSAP:
  siguen funcionando si el CDN de GSAP cae.
- Doble bandera de robustez: `html.js-motion` (la pone un script mínimo y
  bloqueante en el `<head>`, según `prefers-reduced-motion`, sin depender de
  que cargue ningún CDN) y `html.gsap-listo` (la pone `main.js` solo si
  `window.gsap` y `window.ScrollTrigger` existen de verdad). Los estados
  «vacíos» de peldaños y placas del directorio solo existen bajo las dos
  banderas a la vez; el char-reveal no depende de CSS en absoluto — el
  propio GSAP pone y quita el estado oculto (`gsap.set`/`gsap.to`), así que
  si el CDN falla, el texto sale visible directamente, sin ningún parche de
  CSS que lo esconda.
- La cortina tiene una red de seguridad `setTimeout` de 4,2 s que la retira
  pase lo que pase, además de la vía normal (fin del timeline de GSAP) y la
  vía sin GSAP (se oculta de inmediato).

## Línea roja del sector (PLIEGO §1)

- Nombre comprobado por búsqueda web antes de fijarlo.
- Dirección y teléfonos de muestra, nunca los de un despacho real.
- Dominio `.example` (reservado por IANA para uso ficticio).
- Testimonios con nombre de pila, marcados «testimonio de muestra», sin
  atribuir a ninguna plataforma real.
- `schema.org` de tipo `LegalService` **sin** `aggregateRating` ni `review`.
- Sello de demostración en el footer, en este README y en un comentario
  HTML al principio de `index.html`.
- `<meta name="robots" content="noindex, nofollow">` en `index.html`,
  `404.html` y `legal.html`.

## Qué tocar para reskinear esta plantilla a un cliente real

1. **Datos del despacho**: nombre, dirección, teléfonos, email y CIF están
   en `index.html` (sección `#contacto`, bloque `.ficha`), en el `<head>`
   (`<meta description>`, `og:*`, JSON-LD `LegalService`), en `legal.html`
   y en `manifest.json`.
2. **Áreas de práctica**: los 4 `<article class="ala">` dentro de
   `#alas-pista` en `index.html` — título, icono (`<use href="#icono-...">`)
   y texto.
3. **Equipo**: las 6 `<li class="placa">` de `#directorio` — nombre, cargo y
   área. Si el despacho real quiere fotos, sustituir `.placa-superficie` por
   una tarjeta con imagen y quitar la nota de «sin retratos».
4. **Cifras**: los 4 `data-cuenta` de `#cifras` en `index.html` (el número
   visible en el HTML debe coincidir con `data-cuenta`, es el valor final
   que se ve sin JS).
5. **Friso**: la lista de máximas latinas en las dos `.friso-grupo` de
   `index.html` — se puede cambiar por citas o valores del despacho real.
6. **Testimonios**: los 3 `<blockquote class="testimonio">` de
   `#testimonios` — mantener la etiqueta «testimonio de muestra» solo si
   siguen siendo ficticios; si son reseñas reales, decidir si se añade
   `aggregateRating`/`review` al `schema.org` (aquí deliberadamente no
   los lleva).
7. **Mapa**: cambiar la cadena de búsqueda en `js/main.js`, función
   `initMapa()`, variable `query`.
8. **Quitar el aviso de demo**: el comentario HTML de `index.html`, el
   bloque `.pie-demo` del footer (en las tres páginas) y la primera línea
   de este README.
9. **Quitar `noindex, nofollow`** del `<meta name="robots">` en las tres
   páginas.
10. **Logo**: `assets/img/logo/icon.svg` y `favicon.svg` son un emblema de
    frontón/columnas genérico — sustituir por el logo real del despacho y
    regenerar los PNG y `og.png` con `node scripts/generate_icons.js`
    (necesita un servidor local sirviendo el repo).

## Verificación (PLIEGO §7)

Ejecutada con Playwright (Chromium), primero contra un servidor local y
después repetida entera contra el sitio ya publicado en GitHub Pages
(`VM_URL=https://alvarotaiagu.github.io/plantilla-abogados-portico-web/
node scripts/verify.js`), porque algunas trampas del pliego (`mask-image`,
rutas relativas) no se manifiestan bajo `file://` ni con un servidor local
ingenuo. Mismo resultado limpio en ambos pases:

- **1440×900 y 390×844**, con `isMobile`/`hasTouch` reales en la pasada
  móvil. 28 capturas en `screenshots/` (portada, cada sección, cookies, menú
  móvil, mapa cargado, 404, legal, pasada sin GSAP y pasada con movimiento
  reducido), recorridas con `mouse.wheel` (nunca `window.scrollTo`, que no
  dispara los `ScrollTrigger`/`IntersectionObserver` con Lenis de por medio).
- **Fotogramas intermedios de la cortina** (`escritorio/movil-00-cortina-
  media.png`), no solo el estado final, para comprobar que de verdad se
  levanta.
- **Consola limpia**: 0 errores y 0 peticiones fallidas fuera de la pasada
  que bloquea a propósito el CDN de GSAP/Lenis.
- **GSAP y Lenis bloqueados** (`route.abort()` sobre jsDelivr): `gsap-listo`
  nunca se activa, la cortina se retira igualmente (por la rama sin GSAP) y
  la página se lee entera, incluida la inscripción del arquitrabe.
- **`prefers-reduced-motion: reduce`**: `js-motion` no se activa, la cortina
  desaparece al instante y las cuatro cifras siguen llegando a su valor
  final (32/480/14/120+), comprobado leyendo el texto, no solo a ojo.
- **Cookies**: banner visible en la primera visita, «De acuerdo» lo cierra y
  guarda `vm-cookies` en `localStorage`.
- **Menú móvil**: `aria-expanded` alterna `true`/`false` y el panel se abre y
  se cierra.
- **Mapa**: 0 `iframe` antes de pulsar «Mostrar mapa», 1 después, apuntando a
  la dirección ficticia, sin API key.
- **Sin marcadores pendientes**: se buscó `[PENDIENTE]`, `TODO` y `Lorem
  ipsum` en el texto renderizado — ninguno presente.
- Un bug real cazado y corregido antes de publicar: el `<svg
  class="defs-compartidas">` de símbolos reutilizables se renderizaba con su
  tamaño por defecto (300×150) dos veces en el flujo del documento,
  empujando `<main>` ~157px hacia abajo — invisible en escritorio, pero en
  390px de ancho eso bastaba para sacar la columnata entera del hero fuera
  del viewport inicial. Corregido con el patrón estándar de sprite SVG
  oculto (`position:absolute; width:0; height:0`).

**Pendiente de esta plantilla** (igual que el resto de la biblioteca, ver
`REGISTRO.md`): sin medir `longtask` con `PerformanceObserver` (no lleva
canvas ni WebGL, el riesgo es bajo, pero no está medido); sin auditoría
automática de contraste (axe/Lighthouse) — se calculó a mano con
`scripts/contraste.js`; solo probado en Chromium, sin lector de pantalla
real.

El script vive en `scripts/verify.js` y escribe también
`scripts/verify-report.json` con el detalle de cada comprobación.

## Estructura del repo

```
index.html        404.html        legal.html
css/style.css      js/main.js
assets/img/logo/   (icon.svg, favicon.svg, icon-*.png, og.png)
scripts/contraste.js   scripts/generate_icons.js   scripts/verify.js
screenshots/        manifest.json   .nojekyll
```

Sin build, sin npm, sin framework: se abre `index.html` con doble clic o se
sirve la carpeta con cualquier servidor estático. GSAP, ScrollTrigger y
Lenis llegan por CDN (jsDelivr, no cdnjs: cdnjs ya no sirve Lenis —
404 silencioso, trampa ya cazada en otra plantilla de la biblioteca).
