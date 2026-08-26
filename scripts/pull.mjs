// Pull all Atunse Health Stitch screens verbatim into public/stitch-screens.
// Uses API-key auth against the Stitch MCP endpoint. HTML + screenshot downloaded via signed URLs.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = 'C:/Users/hp/Desktop/KLM2026/ATUNSHE';
const KEY = process.env.STITCH_KEY;
const PROJECT = '7855123187181213813';
const HOST = 'https://stitch.googleapis.com/mcp';
const OUT = join(ROOT, 'public', 'stitch-screens');
const ASSET = join(ROOT, 'public', 'assets');
mkdirSync(OUT, { recursive: true });
mkdirSync(ASSET, { recursive: true });

if (!KEY) { console.error('STITCH_KEY missing'); process.exit(1); }

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function mcp(name, args, tries = 4) {
  let last;
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(HOST, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json, text/event-stream', 'X-Goog-Api-Key': KEY },
        body: JSON.stringify({ method: 'tools/call', jsonrpc: '2.0', params: { name, arguments: args }, id: 1 }),
      });
      if (!res.ok) throw new Error(`mcp ${name} ${res.status}`);
      const text = await res.text();
      const j = JSON.parse(text);
      return JSON.parse(j.result.content[0].text);
    } catch (e) { last = e; await sleep(700 * (i + 1)); }
  }
  throw last;
}

async function dl(url, dest, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      const r = await fetch(url);
      if (!r.ok) throw new Error('dl ' + r.status);
      const buf = Buffer.from(await r.arrayBuffer());
      writeFileSync(dest, buf);
      return buf.length;
    } catch (e) {
      if (i === tries - 1) throw e;
      await sleep(500);
    }
  }
}

function categorize(title) {
  const t = (title || '').toLowerCase();
  if (t.endsWith('.png') || t.endsWith('.md')) return 'Assets & Docs';
  if (t.includes('login')) return 'Auth';
  if (t.includes('ogami')) return 'AI Assistant';
  if (t.includes('mobile')) return 'Mobile';
  if (t.includes('protocol')) return 'Protocols';
  if (t.includes('consent') || t.includes('chain of custody') || t.includes('trust & governance')) return 'Compliance & Ledgers';
  if (t.includes('billing') || t.includes('invoice') || t.includes('financial') || t.includes('revenue')) return 'Billing & Finance';
  if (t.includes('appointment') || t.includes('schedule') || t.includes('calendar') || t.includes('tasks')) return 'Scheduling';
  if (t.includes('administration') || t.includes('people') || t.includes('personnel') || t.includes('staff') || t.includes('institutions') || t.includes('configuration')) return 'Administration';
  if (t.includes('report') || t.includes('analytics') || t.includes('performance') || t.includes('migration') || t.includes('legacy') || t.includes('intelligence')) return 'Operations & Intelligence';
  if (t.includes('patient') || t.includes('directory') || t.includes('portal')) return 'Patient';
  if (t.includes('dashboard') || t.includes('home')) return 'Dashboards';
  return 'Screens';
}

async function pool(items, size, fn) {
  let i = 0; const results = [];
  const workers = Array.from({ length: size }, async () => {
    while (i < items.length) {
      const idx = i++;
      try { results[idx] = await fn(items[idx], idx); }
      catch (e) { results[idx] = { error: String(e) }; console.error('  !', items[idx].title, e.message); }
    }
  });
  await Promise.all(workers);
  return results;
}

const list = JSON.parse(readFileSync(join(ROOT, 'screens_list.json'), 'utf8'));
const inner = JSON.parse(list.result.content[0].text);
const screens = inner.screens || inner.screenInstances || [];
console.log(`Pulling ${screens.length} screens...`);

const manifest = [];
await pool(screens, 3, async (s) => {
  const name = s.name || s.id;
  const sid = name.split('/screens/')[1];
  const rec = { id: sid, title: s.title || '(untitled)', group: categorize(s.title), deviceType: s.deviceType || (s.title || '').includes('Mobile') ? 'MOBILE' : 'DESKTOP' };
  const data = await mcp('get_screen', { name });
  await sleep(120);
  // HTML
  if (data.htmlCode && data.htmlCode.downloadUrl) {
    const dest = join(OUT, `${sid}.html`);
    const n = await dl(data.htmlCode.downloadUrl, dest);
    rec.html = `/stitch-screens/${sid}.html`;
    rec.htmlBytes = n;
  }
  // Screenshot
  if (data.screenshot && data.screenshot.downloadUrl) {
    const dest = join(OUT, `${sid}.png`);
    try { const n = await dl(data.screenshot.downloadUrl, dest); rec.thumb = `/stitch-screens/${sid}.png`; rec.thumbBytes = n; }
    catch { /* optional */ }
  }
  rec.width = data.width; rec.height = data.height;
  console.log(`  ok ${sid} [${(rec.group)}] ${(rec.htmlBytes||0)}B html`);
  manifest.push(rec);
});

manifest.sort((a, b) => a.group.localeCompare(b.group) || a.title.localeCompare(b.title));
writeFileSync(join(ROOT, 'src', 'data', 'screens.mjs'),
  '// AUTO-GENERATED by scripts/pull.mjs — verbatim Atunse Health Stitch screens\n' +
  'export const screens = ' + JSON.stringify(manifest, null, 2) + ';\n');
console.log(`\nDONE. ${manifest.length} screens -> ${OUT}`);
console.log('Wrote src/data/screens.mjs');
