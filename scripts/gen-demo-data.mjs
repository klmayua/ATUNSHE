// Generate public/demo-data.js — a plain static JS file consumed by the app shell.
// Kept OUT of Astro's bundler (in /public) so there is zero esbuild/import risk and
// the bootstrap can never hang on a missing module.
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { screens } from '../src/data/screens.mjs';
import { PERSONAS } from '../src/data/personas.mjs';

const ROOT = 'C:/Users/hp/Desktop/KLM2026/ATUNSHE';
const DATA = {
  screens: screens
    .filter((s) => s.html && !s.asset)
    .map((s) => ({ id: s.id, title: s.title, group: s.group, deviceType: s.deviceType, html: s.html })),
  personas: PERSONAS.map((p) => ({
    id: p.id, name: p.name, role: p.role, landing: p.landing, initials: p.initials,
    allow: p.allow, deny: p.deny || [],
  })),
};
mkdirSync(join(ROOT, 'public'), { recursive: true });
writeFileSync(join(ROOT, 'public/demo-data.js'), 'window.__ATUNSE__ = ' + JSON.stringify(DATA) + ';\n');
console.log('Wrote public/demo-data.js — screens:', DATA.screens.length, 'personas:', DATA.personas.length);
