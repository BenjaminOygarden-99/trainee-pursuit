// Felles hjelpefunksjoner for storskjerm, kontrollpanel og mobil.
import { QRCode, Level } from '/vendor/qr.js';

export async function api(path, { method = 'GET', body, pin } = {}) {
  const headers = { 'content-type': 'application/json' };
  if (pin) headers['x-admin-pin'] = pin;
  const res = await fetch(`/api/${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw Object.assign(new Error(data.error || `Feil ${res.status}`), { status: res.status });
  return data;
}

// Serverklokke: alle nedtellinger regnes mot serverens tid, ikke telefonens.
let offset = 0;
export const syncClock = (serverNow) => { if (serverNow) offset = serverNow - Date.now(); };
export const now = () => Date.now() + offset;
export const secondsLeft = (deadline) => Math.max(0, Math.ceil((deadline - now()) / 1000));

// Liten elementbygger. Tekst settes alltid som tekst, aldri som HTML (kallenavn fra publikum).
export function h(tag, attrs = {}, ...children) {
  const el = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k === 'class') el.className = v;
    else if (k === 'style' && typeof v === 'object') {
      for (const [p, val] of Object.entries(v)) p.startsWith('--') ? el.style.setProperty(p, val) : (el.style[p] = val);
    }
    else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
    else el.setAttribute(k, v === true ? '' : v);
  }
  for (const c of children.flat()) if (c != null && c !== false) el.append(c instanceof Node ? c : String(c));
  return el;
}

const SVG = 'http://www.w3.org/2000/svg';
const s = (tag, attrs) => {
  const el = document.createElementNS(SVG, tag);
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v);
  return el;
};

// Kake med seks stykker. earned = liste med kategori-id-er laget har vunnet.
export function cakeSVG(categories, earned = [], label = '') {
  const svg = s('svg', { viewBox: '-4 -4 108 108', class: 'cake', role: 'img', 'aria-label': label });
  svg.append(s('circle', { cx: 50, cy: 50, r: 50, class: 'rim', 'stroke-width': 4 }));
  const n = categories.length;
  categories.forEach((c, i) => {
    const a0 = ((i / n) * 360 - 90) * (Math.PI / 180);
    const a1 = (((i + 1) / n) * 360 - 90) * (Math.PI / 180);
    const r = 44;
    const d = `M50 50 L${50 + r * Math.cos(a0)} ${50 + r * Math.sin(a0)} A${r} ${r} 0 0 1 ${50 + r * Math.cos(a1)} ${50 + r * Math.sin(a1)} Z`;
    const has = earned.includes(c.id);
    const p = s('path', { d, class: has ? 'wedge' : 'slot', fill: has ? c.color : '', stroke: 'var(--stage-deep)', 'stroke-width': 3, 'stroke-linejoin': 'round' });
    if (has) p.setAttribute('data-cat', c.id);
    svg.append(p);
  });
  svg.append(s('circle', { cx: 50, cy: 50, r: 7, fill: 'var(--stage-deep)', stroke: 'var(--cream)', 'stroke-width': 2 }));
  return svg;
}

// QR-kode tegnet lokalt (ingen CDN), slik at den virker selv om eksterne tjenester svikter.
export function qrSVG(text) {
  try {
    const qr = new QRCode(-1, Level.M);
    qr.addData(text);
    qr.make();
    const n = qr.getModuleCount();
    let d = '';
    for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c} ${r}h1v1h-1z`;
    const svg = s('svg', { viewBox: `-2 -2 ${n + 4} ${n + 4}`, 'shape-rendering': 'crispEdges', role: 'img', 'aria-label': `QR-kode til ${text}` });
    svg.append(s('rect', { x: -2, y: -2, width: n + 4, height: n + 4, fill: '#fff6e3' }), s('path', { d, fill: '#141339' }));
    const wrap = h('div', { class: 'qr' });
    wrap.append(svg);
    return wrap;
  } catch {
    return h('div', { class: 'qr-fallback' }, text);
  }
}

export const catOf = (game, id) => game.categories.find((c) => c.id === id);
export const groupName = (game, id) => game.groups.find((g) => g.id === id)?.name ?? id;
export const teamName = (game, id) => game.teams.find((t) => t.id === id)?.name ?? id;
// Tall med komma og tusenskille, men ikke for årstall og små tall (1905, ikke 1 905).
export const fmt = (n) => (Math.abs(n) >= 10000 ? n.toLocaleString('nb-NO') : String(n).replace('.', ','));
export const LETTERS = ['A', 'B', 'C', 'D'];

export function store(kind) {
  const st = kind === 'session' ? 'sessionStorage' : 'localStorage';
  return {
    get(k) { try { return JSON.parse(window[st].getItem(k)); } catch { return null; } },
    set(k, v) { try { window[st].setItem(k, JSON.stringify(v)); } catch { /* privat modus */ } },
    del(k) { try { window[st].removeItem(k); } catch { /* ignorer */ } },
  };
}

// Enkel polling som pauser når fanen er skjult.
export function poll(fn, ms) {
  let timer;
  const tick = async () => {
    clearTimeout(timer);
    if (!document.hidden) { try { await fn(); } catch (e) { console.warn(e); } }
    timer = setTimeout(tick, ms);
  };
  document.addEventListener('visibilitychange', () => { if (!document.hidden) tick(); });
  tick();
  return () => clearTimeout(timer);
}
