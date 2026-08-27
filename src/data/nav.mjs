// Shared, RBAC-aware navigation model used by BOTH the dashboard ([persona].astro)
// and the screen shell ([screen].astro) so the left panel never diverges.
// Each nav entry is a real, reachable screen (not just the first of a group).

import { screens } from './screens.mjs';

// Group label -> group id (matches personas.mjs allow/deny groups)
export const GROUP_LABELS = [
  ['Overview', 'Dashboards'],
  ['Patients', 'Patient'],
  ['Appointments', 'Scheduling'],
  ['Clinical', 'Clinical'],
  ['Protocols', 'Protocols'],
  ['Trust & Governance', 'Compliance & Ledgers'],
  ['Billing', 'Billing & Finance'],
  ['Ogami', 'AI Assistant'],
  ['Reports', 'Operations & Intelligence'],
  ['Administration', 'Administration'],
  ['Mobile', 'Mobile'],
];

// Screens we surface in the left panel per group. A clinician's "Patients" view
// should show the clinical record (Directory/Profile/Timeline), NOT the patient
// portal — so we pick the right screens per (group, persona) here.
const PATIENT_CLINICAL = ['fe22f6b0e70e44e69c62b4c69019163d', 'e1c47f5b53fb4efeb13cd44e5e82cbfa', 'eaeb377d6e70427195a93f5f7fae47f5'];

export function screensForGroup(group) {
  // Non-asset screens in this group, stable order from screens.mjs
  return screens.filter((s) => !s.asset && s.group === group);
}

export function canView(persona, group) {
  if (!persona) return false;
  if (persona.deny && persona.deny.includes(group)) return false;
  return persona.allow.includes(group);
}

// Build the full nav tree for a persona.
// Returns: [{ label, group, items: [{ title, href, id }] }]
export function navFor(persona) {
  if (!persona) return [];
  const tree = [];
  for (const [label, group] of GROUP_LABELS) {
    if (!canView(persona, group)) continue;
    let items;
    if (group === 'Dashboards') {
      items = [{ title: 'My dashboard', href: `/app/dashboard/${persona.id}/`, id: '__dash' }];
    } else if (group === 'Patient' && persona.id !== 'patient') {
      // Clinician/attending/mobile see the clinical record views, not the portal home
      items = screens
        .filter((s) => !s.asset && s.group === 'Patient' && PATIENT_CLINICAL.includes(s.id))
        .map((s) => ({ title: s.title, href: `/app/${s.id}/`, id: s.id }));
    } else {
      items = screensForGroup(group).map((s) => ({ title: s.title, href: `/app/${s.id}/`, id: s.id }));
    }
    if (items.length) tree.push({ label, group, items });
  }
  return tree;
}

// Flat list of {title, href, id} for a persona (used by client search / deep-link guard).
export function navLinks(persona) {
  return navFor(persona).flatMap((g) => g.items);
}

// Resolve a "semantic" action to a concrete href for this persona.
// e.g. startEncounter -> first Clinical screen; openRecord(ATN-xxx) -> that patient's profile.
export function hrefForGroup(persona, group) {
  const g = navFor(persona).find((n) => n.group === group);
  return g && g.items[0] ? g.items[0].href : `/app/dashboard/${persona.id}/`;
}
