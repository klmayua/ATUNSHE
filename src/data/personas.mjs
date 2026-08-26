// Demo persona logins + ROLE-BASED ACCESS.
// Each persona may only see screens whose `group` is in `allow`. Deep links to other
// groups are blocked and redirected to the persona's landing screen.
// Mock only — a clickable demo gate backed by localStorage.

export const PERSONAS = [
  {
    id: 'clinician',
    name: 'Dr. Adesenya',
    role: 'Clinician',
    username: 'adesenya',
    password: 'demo-clinician',
    landing: '731b116d87c94962b03f9ac76114b23e', // Clinical Encounter
    accent: '#002F5F',
    blurb: 'Rounds, encounters, vitals, protocols & the patient timeline.',
    initials: 'AD',
    allow: ['Auth', 'Dashboards', 'Patient', 'Clinical', 'Protocols', 'Scheduling', 'Compliance & Ledgers', 'Mobile', 'AI Assistant', 'Operations & Intelligence', 'Assets & Docs'],
    deny: [],
  },
  {
    id: 'attending',
    name: 'Dr. Sola',
    role: 'Attending Physician',
    username: 'sola',
    password: 'demo-attending',
    landing: 'e27a35c8c93843c78db8dfb77ef61791', // Staff Profile - Dr. Sola
    accent: '#002F5F',
    blurb: 'Staff profile, protocols, performance, oversight & intelligence.',
    initials: 'SO',
    allow: ['Auth', 'Dashboards', 'Patient', 'Clinical', 'Protocols', 'Scheduling', 'Compliance & Ledgers', 'Mobile', 'AI Assistant', 'Operations & Intelligence', 'Administration', 'Assets & Docs'],
    deny: ['Billing & Finance'],
  },
  {
    id: 'admin',
    name: 'Adaora',
    role: 'Facility Administrator / HR',
    username: 'adaora',
    password: 'demo-admin',
    landing: 'd8a6623a842a496bbf16bf99600850a8', // Administration & Configuration
    accent: '#735c00',
    blurb: 'People, institutions, billing, configuration & governance.',
    initials: 'AD',
    allow: ['Auth', 'Dashboards', 'Patient', 'Scheduling', 'Administration', 'Billing & Finance', 'Compliance & Ledgers', 'Operations & Intelligence', 'Assets & Docs', 'AI Assistant'],
    deny: ['Clinical', 'Protocols', 'Mobile'],
  },
  {
    id: 'patient',
    name: 'Mrs Juliet Okafor',
    role: 'Patient',
    username: 'juliet.okafor',
    password: 'demo-patient',
    landing: '4a98aee24a83424db3010d3076a5a42c', // Patient Portal - Home
    accent: '#003f7d',
    blurb: 'Your portal: appointments, records, results & consent.',
    initials: 'JO',
    allow: ['Auth', 'Patient', 'Mobile', 'AI Assistant', 'Assets & Docs'],
    deny: ['Dashboards', 'Clinical', 'Protocols', 'Scheduling', 'Administration', 'Billing & Finance', 'Compliance & Ledgers', 'Operations & Intelligence'],
  },
  {
    id: 'mobile',
    name: 'Mobile Reviewer',
    role: 'Field / Mobile',
    username: 'mobile.reviewer',
    password: 'demo-mobile',
    landing: '484bcbff1a75426cb9f6c1ee990f2e06', // Mobile Home Dashboard
    accent: '#735c00',
    blurb: 'The mobile companion: home, tasks, vitals & offline sync.',
    initials: 'MR',
    allow: ['Auth', 'Dashboards', 'Patient', 'Clinical', 'Scheduling', 'Mobile', 'AI Assistant', 'Assets & Docs'],
    deny: ['Protocols', 'Administration', 'Billing & Finance', 'Compliance & Ledgers', 'Operations & Intelligence'],
  },
];

export function findPersona(query) {
  if (!query) return null;
  const q = String(query).toLowerCase();
  return PERSONAS.find((p) => p.id === q || p.username === q) || null;
}

// Can this persona view a screen in `group`?
export function canView(persona, group) {
  if (!persona) return false;
  if (persona.deny && persona.deny.includes(group)) return false;
  return persona.allow.includes(group);
}
