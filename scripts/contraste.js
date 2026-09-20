/* Calcula el contraste WCAG (razón de luminancia relativa) de la paleta antes
   de cerrar el CSS. node scripts/contraste.js */

function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16));
}

function relLum([r, g, b]) {
  const [rs, gs, bs] = [r, g, b].map((c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function ratio(hex1, hex2) {
  const l1 = relLum(hexToRgb(hex1));
  const l2 = relLum(hexToRgb(hex2));
  const [a, b] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (a + 0.05) / (b + 0.05);
}

const paleta = {
  piedra: '#EDE7D8',       // fondo base
  panel: '#E3DBC6',        // paneles / directorio bronce
  hueso: '#F6F2E6',        // tarjetas claras
  tinta: '#241F18',        // texto principal, estructura oscura
  fachada: '#171310',      // fondo de fachada nocturna (secciones oscuras)
  muted: '#5B5346',        // texto secundario sobre piedra/hueso
  mutedOscuro: '#C9BFA9',  // texto secundario sobre fachada/tinta
  bronce: '#8C6A34',       // marca / acentos grandes (no necesariamente texto)
  bronceTexto: '#6B4E22',  // variante de texto sobre piedra/hueso
  bronceClaro: '#C79A52',  // bronce sobre fondo oscuro (texto/iconos)
  verdin: '#4C7267',       // pátina, acento secundario contenido
  verdinTexto: '#3C5B52',  // variante de texto sobre piedra/hueso
  verdinClaro: '#8FBBAC',  // pátina sobre fondo oscuro
};

const pares = [
  ['tinta', 'piedra', 'texto principal sobre piedra'],
  ['tinta', 'hueso', 'texto principal sobre hueso'],
  ['tinta', 'panel', 'texto principal sobre panel bronce'],
  ['muted', 'piedra', 'texto secundario sobre piedra'],
  ['muted', 'hueso', 'texto secundario sobre hueso'],
  ['muted', 'panel', 'texto secundario sobre panel'],
  ['bronceTexto', 'piedra', 'bronce-texto sobre piedra'],
  ['bronceTexto', 'hueso', 'bronce-texto sobre hueso'],
  ['verdinTexto', 'piedra', 'verdín-texto sobre piedra'],
  ['verdinTexto', 'hueso', 'verdín-texto sobre hueso'],
  ['hueso', 'fachada', 'hueso sobre fachada oscura'],
  ['hueso', 'tinta', 'hueso sobre tinta'],
  ['mutedOscuro', 'fachada', 'texto secundario sobre fachada'],
  ['mutedOscuro', 'tinta', 'texto secundario sobre tinta'],
  ['bronceClaro', 'fachada', 'bronce-claro sobre fachada'],
  ['bronceClaro', 'tinta', 'bronce-claro sobre tinta'],
  ['verdinClaro', 'fachada', 'verdín-claro sobre fachada'],
  ['verdinClaro', 'tinta', 'verdín-claro sobre tinta'],
  ['piedra', 'bronce', 'piedra sobre bronce (botón grande)'],
  ['hueso', 'bronce', 'hueso sobre bronce (botón grande)'],
  ['piedra', 'bronceTexto', 'piedra sobre bronce-texto (botón CTA)'],
  ['hueso', 'bronceTexto', 'hueso sobre bronce-texto (botón CTA)'],
  ['fachada', 'bronceClaro', 'fachada sobre bronce-claro (chip)'],
];

console.log('Par'.padEnd(38), 'Ratio', 'AA texto normal (4.5)', 'AA texto grande (3.0)');
let fallos = 0;
for (const [a, b, label] of pares) {
  const r = ratio(paleta[a], paleta[b]);
  const okNormal = r >= 4.5;
  const okGrande = r >= 3.0;
  if (!okNormal) fallos++;
  console.log(
    label.padEnd(38),
    r.toFixed(2).padEnd(6),
    (okNormal ? 'OK' : 'FALLA').padEnd(22),
    okGrande ? 'OK' : 'FALLA'
  );
}
console.log('\n' + (fallos ? `${fallos} pares no llegan a 4.5:1 (revisar si se usan como texto normal)` : 'Todos los pares de texto normal llegan a AA (4.5:1).'));
console.log('\nHex final:');
for (const [k, v] of Object.entries(paleta)) console.log(' ', k.padEnd(14), v);
