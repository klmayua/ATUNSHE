// Owner edit: strip the Stitch-internal left SideNavBar from every screen so each
// screen shows a single (top-bar) nav. We are the owners now — verbatim fidelity
// is no longer the goal; a clean single-nav demo is.
// Removes the block starting at the <!-- SideNavBar --> comment through its closing </nav>.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'C:/Users/hp/Desktop/KLM2026/ATUNSHE';
const DIR = join(ROOT, 'public/stitch-screens');

let changed = 0, skipped = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith('.html')) continue;
  const path = join(DIR, f);
  let html = readFileSync(path, 'utf8');
  const start = html.indexOf('<!-- SideNavBar -->');
  if (start === -1) { skipped++; continue; }
  const end = html.indexOf('</nav>', start);
  if (end === -1) { skipped++; continue; }
  html = html.slice(0, start) + html.slice(end + '</nav>'.length);
  writeFileSync(path, html);
  changed++;
}
console.log('Stripped SideNavBar from', changed, 'screens; skipped', skipped, '(no SideNavBar).');
