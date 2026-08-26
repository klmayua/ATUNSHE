// Owner canonicalisation: the Stitch export leaked random filler names
// (Adesany, Adebayo, S. Patel, E.L. Lin, Adeyemi, Eze, Okoye...). The spec
// (Atunse_Health_Prototype_Screen_Design_Specification) fixes the flagship
// patient as Amina Okafor (ATN-000184) and the staff as consistent clinical
// roles. Replace all random names with the canonical seeded set.
import { readFileSync, writeFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = 'C:/Users/hp/Desktop/KLM2026/ATUNSHE';
const DIR = join(ROOT, 'public/stitch-screens');

// Random filler -> canonical. Order matters: most-specific first.
const MAP = [
  // clinicians (random) -> canonical physicians
  ['Dr. O. Eze', 'Dr. Sola'],
  ['Dr. Chinedu Eze', 'Dr. Sola'],
  ['Dr. H. Soludo', 'Dr. Sola'],
  ['Dr. S. Okoro', 'Dr. Sola'],
  ['Dr. E. Lin', 'Dr. Sola'],
  ['Dr. S. Adebayo', 'Dr. Adesenya'],
  ['Dr. Emmanuel Okoye', 'Dr. Adesenya'],
  ['Dr. Sarah Smith', 'Dr. Adesenya'],
  ['Dr. S. Patel', 'Dr. Adesenya'],
  ['Dr. S. Adeyemi', 'Dr. Adesenya'],
  ['Dr. K. Nnamdi', 'Dr. Adesenya'],
  ['Dr. Emeka Chukwu', 'Dr. Adesenya'],
  ['Dr. A. Okafor', 'Dr. Adesenya'],
  ['Dr. E. Okafor', 'Dr. Adesenya'],
  ['Dr. S. Okafor', 'Dr. Sola'],
  // nurses (random) -> canonical nurse pool
  ['Nurse M. Adebayo', 'Nurse A. Bello'],
  ['Nurse T. Adeleke', 'Nurse C. Obi'],
  ['Nurse K. Abioye', 'Nurse F. Eze'],
  ['Nurse B. Johnson', 'Nurse D. Okoro'],
  ['Nurse K. Ojo', 'Nurse A. Bello'],
  // last-name+different-first filler patients/staff -> canonical seeded set
  ['Adebayo, Michael', 'Okafor, Juliet'],
  ['Michael Adebayo', 'Juliet Okafor'],
  ['Adebayo, M.', 'Okafor, J.'],
  ['Adebayo, Samuel', 'Okafor, Amina'],
  ['Adebayo, O. (ID: 84920)', 'Okafor, A. (ID: 84920)'],
  ['Oluwaseun, Adebayo', 'Okafor, Amina'],
  ['Oluwaseun, Adebayo M.', 'Okafor, Amina M.'],
  ['Good morning, Dr. Adebayo', 'Good morning, Dr. Adesenya'],
  ['Good morning, Mr. Adebayo.', 'Good morning, Mr. Okafor.'],
  ['Dr. Adebayo', 'Dr. Adesenya'],
  ['Adeyemi, Olumide', 'Okafor, Amina'],
  ['Adeyemi, Samuel (MRN: 882', 'Okafor, Amina (MRN: 882'],
  ['Adeyemi, Samuel', 'Okafor, Amina'],
  ['Aisha Adeyemi', 'Amina Okafor'],
  ['Samuel Adeyemi', 'Amina Okafor'],
  ['Ibrahim, Nnamdi', 'Okafor, Amina'],
  // final sweep for residual Adebayo / Oluwaseun forms
  ['Adebayo Oluwaseun', 'Amina Okafor'],
  ['Adebayo, Oluwaseu', 'Okafor, Amina'],
  ['Oluwaseun Davies', 'Amina Okafor'],
  ['Dr.\u00a0Adebayo', 'Dr. Adesenya'],
  ['Dr. Adebayo', 'Dr. Adesenya'],
];

let changed = 0;
for (const f of readdirSync(DIR)) {
  if (!f.endsWith('.html')) continue;
  const path = join(DIR, f);
  let html = readFileSync(path, 'utf8');
  const before = html;

  // Restore the flagship patient name on the Patient Profile / Timeline screens.
  if (/e1c47f5b53fb4efeb13cd44e5e82cbfa|eaeb377d6e70427195a93f5f7fae47f5/.test(f)) {
    html = html.split('Juliet Okafor').join('Amina Okafor');
  }

  for (const [from, to] of MAP) html = html.split(from).join(to);

  if (html !== before) { writeFileSync(path, html); changed++; }
}
console.log('Canonicalised names in', changed, 'screens.');
