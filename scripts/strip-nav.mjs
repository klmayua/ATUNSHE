// Owner edit: strip the Stitch-internal left SideNavBar from every screen so each
// screen shows a SINGLE nav (our app-shell left nav). Handles both <nav> and <aside>
// left rails (signature: "fixed left-0" and/or "w-[256px]" and/or id="mobile-sidebar").
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join('C:/Users/hp/Desktop/KLM2026/ATUNSHE', 'public/stitch-screens');

function stripRail(html) {
  // Locate the opening tag of a left rail: <nav ...> or <aside ...> carrying the rail signature.
  const tagRe = /<(nav|aside)([^>]*(?:fixed left-0|w-\[256px\]|id="mobile-sidebar")[^>]*)>/i;
  const m = tagRe.exec(html);
  if (!m) return html;
  const openTag = m[1].toLowerCase();
  const openIdx = m.index;
  // balance matching open/close tags
  let depth = 0, i = openIdx, end = -1, closeTag = '</' + openTag + '>';
  while (i < html.length) {
    if (html.startsWith('<' + openTag, i)) { depth++; i += openTag.length + 1; continue; }
    if (html.startsWith(closeTag, i)) { depth--; i += closeTag.length; if (depth === 0) { end = i; break; } continue; }
    i++;
  }
  if (end === -1) return html;
  let start = openIdx;
  const cm = html.lastIndexOf('<!--', openIdx);
  if (cm !== -1 && /SideNav|Side Navigation/i.test(html.slice(cm, openIdx))) start = cm;
  return html.slice(0, start) + html.slice(end);
}

let navStripped = 0, marginStripped = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith('.html')) continue;
  const path = join(DIR, f);
  let html = readFileSync(path, 'utf8');
  const before = html;
  let pass = html;
  for (let k = 0; k < 3; k++) {
    const n = stripRail(pass);
    if (n === pass) break;
    pass = n; navStripped++;
  }
  html = pass;
  if (html.includes('md:ml-[256px]')) { html = html.split('md:ml-[256px]').join(''); marginStripped++; }
  if (html !== before) writeFileSync(path, html);
}
console.log('Rail strips applied:', navStripped);
console.log('md:ml-[256px] margins removed:', marginStripped);
