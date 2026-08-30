// Build verifier: crawls dist/, checks every internal link resolves to a built
// page, and asserts the RBAC boundary — that no role's pages link into or
// mention a section that role is denied.
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { ROLES } from '../src/data/roles.mjs';

const DIST = new URL('../dist/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1');

function walkCss(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walkCss(p, out);
    else if (e.endsWith('.css')) out.push(p);
  }
  return out;
}

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e.endsWith('.html')) out.push(p);
  }
  return out;
}

const files = walk(DIST);
const pages = new Set(
  files.map((f) => '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, ''))
);

let errors = 0;
let checked = 0;
const roleById = Object.fromEntries(ROLES.map((r) => [r.id, r]));

for (const f of files) {
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  const html = readFileSync(f, 'utf8');
  const owner = rel.split('/')[1];
  const role = roleById[owner];

  const hrefs = [...html.matchAll(/href="(\/[^"#]*)"/g)].map((m) => m[1]);
  for (const h of hrefs) {
    if (h.startsWith('/assets/') || h.startsWith('/_astro/')) continue;
    checked++;
    const norm = h.endsWith('/') ? h : h + '/';
    if (!pages.has(norm) && !pages.has(h) && h !== '/') {
      console.log(`DEAD LINK  ${rel}  ->  ${h}`);
      errors++;
    }
    // RBAC: a link out of a role's page must stay inside that role (or go home).
    if (role && h.startsWith('/') && h !== '/') {
      const target = h.split('/').filter(Boolean);
      if (target[0] !== owner && roleById[target[0]]) {
        console.log(`CROSS-ROLE ${rel}  ->  ${h}`);
        errors++;
      }
      if (target[0] === owner && target[1] && !role.allow.includes(target[1])) {
        console.log(`RBAC LEAK  ${rel}  ->  ${h} (role "${owner}" denied "${target[1]}")`);
        errors++;
      }
    }
  }
}

// Prose must not contradict the engine. Any hardcoded count of gates, blocking
// checks or signatures has to match what protocol.mjs actually computes.
const P = await import('../src/data/protocol.mjs');
// Only whole-protocol assertions are checked here; the per-gate counts shown on
// the registry page are legitimately different numbers.
const allHtml = files.map((f) => readFileSync(f, 'utf8')).join('\n');
const totalAssertions = [
  [/gates? and (\d+) blocking checks/g, P.totalGateChecks, 'blocking checks'],
  [/with (\d+) required signatures/g, P.totalSignatures, 'required signatures'],
  [/(\d+) gates,\s*(?:\d+) blocking/g, P.gates.length, 'gates'],
];
for (const [re, expected, what] of totalAssertions) {
  for (const m of allHtml.matchAll(re)) {
    if (Number(m[1]) !== expected) {
      console.log(`STALE COUNT  "${m[0].trim()}" — engine computes ${expected} ${what}`);
      errors++;
    }
  }
}

// ── Mobile guarantees ──────────────────────────────────────────────────────
// These were claimed once and not checked. Now they are checked: a page that
// loses its bottom navigation, its centred logo bar or its viewport metadata
// fails the build rather than shipping a phone with no way to navigate.
const cssFiles = walkCss(DIST);
const allCss = cssFiles.map((f) => readFileSync(f, 'utf8')).join('\n');

const cssRequired = [
  ['.bnav-item', 'bottom-nav item styles'],
  ['.mbar-logo', 'centred mobile logo bar'],
  ['safe-area-inset-bottom', 'iOS safe-area inset'],
  ['prefers-reduced-motion', 'reduced-motion handling'],
  ['overflow-x:hidden', 'horizontal-overflow guard'],
  ['.tbl:not([data-matrix])thead', 'table card-mode (header hidden on mobile)'],
  ['content:attr(data-label)', 'table card-mode field labels'],
];
for (const [needle, what] of cssRequired) {
  if (!allCss.replace(/\s+/g, '').includes(needle.replace(/\s+/g, ''))) {
    console.log(`MOBILE CSS MISSING  ${what} (${needle})`);
    errors++;
  }
}

for (const f of files) {
  const rel = '/' + relative(DIST, f).replace(/\\/g, '/').replace(/index\.html$/, '');
  if (rel === '/') continue; // the sign-in page has no app chrome by design
  const html = readFileSync(f, 'utf8');
  const need = [
    ['class="bnav"', 'bottom navigation'],
    ['class="mbar"', 'mobile top bar'],
    ['id="m-sheet"', 'More sheet'],
    ['viewport-fit=cover', 'viewport-fit=cover'],
  ];
  for (const [needle, what] of need) {
    if (!html.includes(needle)) {
      console.log(`MOBILE MISSING  ${rel} has no ${what}`);
      errors++;
    }
  }
  // A bottom bar with nothing in it is worse than none at all.
  const items = (html.match(/class="bnav-item/g) || []).length;
  if (items < 3) {
    console.log(`MOBILE THIN  ${rel} bottom nav has only ${items} item(s)`);
    errors++;
  }

  // Table contract. On a phone a record table becomes a stack of cards whose
  // field labels are read from its own <th>. A table with no header row would
  // stack into unlabelled values — worse than the scroller it replaced. And a
  // matrix table must be marked on BOTH the wrapper (scroll affordance) and
  // the table (opt out of card mode), or the two disagree.
  for (const m of html.matchAll(/<table class="tbl"( data-matrix)?>([\s\S]*?)<\/table>/g)) {
    const isMatrix = !!m[1];
    if (!isMatrix && !/<thead[\s\S]*?<th/.test(m[2])) {
      console.log(`TABLE UNLABELLED  ${rel} has a card-mode table with no header row`);
      errors++;
    }
  }
  const matrixTables = (html.match(/<table class="tbl" data-matrix>/g) || []).length;
  const matrixWraps = (html.match(/<div class="tbl-wrap" data-matrix>/g) || []).length;
  if (matrixTables !== matrixWraps) {
    console.log(`TABLE MATRIX MISMATCH  ${rel} ${matrixTables} matrix table(s) but ${matrixWraps} marked wrapper(s)`);
    errors++;
  }
}

// Every role must reach its declared home.
for (const r of ROLES) {
  const home = `/${r.id}/${r.home}/`;
  if (!pages.has(home)) {
    console.log(`MISSING HOME  ${r.id} -> ${home}`);
    errors++;
  }
}

console.log(`\n${files.length} pages · ${checked} internal links checked · ${errors} problem(s)`);
process.exit(errors ? 1 : 0);
