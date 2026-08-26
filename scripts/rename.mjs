// Apply requested name changes across verbatim Stitch screen HTML.
// Global (every file):  Dr. Amina Okafor -> Dr. Adesenya ; Dr. Samuel Ojo -> Dr. Sola ; Facility Administrator -> Adaora
// Patient-facing screens only: fix the clinician-avatar mislabeled as a patient and surface the real roster
//   (Professor Adeniyi, Mrs Juliet Okafor, Dr Peter Edet).
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'C:/Users/hp/Desktop/KLM2026/ATUNSHE';
const DIR = join(ROOT, 'public/stitch-screens');

const globalRules = [
  ['Dr. Amina Okafor', 'Dr. Adesenya'],
  ['Amina Okafor', 'Adesenya'],
  ['Dr. Samuel Ojo', 'Dr. Sola'],
  ['Samuel Ojo', 'Sola'],
  ['Oluwaseun Ojo', 'Sola'],
  ['Facility Administrator', 'Adaora'],
];

let changed = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith('.html')) continue;
  const path = join(DIR, f);
  let html = readFileSync(path, 'utf8');
  const before = html;

  for (const [from, to] of globalRules) html = html.split(from).join(to);

  // Patient-facing screens: the directory/profile/portal/timeline mocked a clinician as the patient.
  if (/fe22f6b0|e1c47f5b|4a98aee|eaeb377d/.test(f)) {
    // Replace the mislabeled clinician avatar alt (now "Dr. Adesenya") used inside patient lists.
    html = html.split('alt="Dr. Adesenya"').join('alt="Mrs Juliet Okafor"');
    html = html.split('A professional headshot of Dr. Adesenya').join('A professional headshot of Mrs Juliet Okafor');
    // Landing patient name on portal/profile/timeline -> the patient persona (Juliet Okafor).
    html = html.split('>Adesenya<').join('>Juliet Okafor<');
  }

  if (html !== before) { writeFileSync(path, html); changed++; }
}
console.log('Renamed in', changed, 'HTML files.');
