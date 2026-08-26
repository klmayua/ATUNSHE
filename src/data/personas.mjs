// Demo persona logins. Mock only — anyone viewing the live demo clicks a persona,
// the username/password are auto-filled, then they sign in and can click around.
// Passwords are intentionally trivial demo strings.
export const PERSONAS = [
  {
    id: 'clinician',
    name: 'Dr. Amina Okafor',
    role: 'Clinician',
    username: 'amina.okafor',
    password: 'demo-clinician',
    landing: '731b116d87c94962b03f9ac76114b23e', // Clinical Encounter - Amina Okafor
    accent: '#002F5F',
    blurb: 'Rounds, encounters, vitals & the patient timeline for Amina Okafor.',
    initials: 'AO',
  },
  {
    id: 'attending',
    name: 'Dr. Samuel Ojo',
    role: 'Attending Physician',
    username: 'samuel.ojo',
    password: 'demo-attending',
    landing: 'e27a35c8c93843c78db8dfb77ef61791', // Staff Profile - Dr. Samuel Ojo
    accent: '#002F5F',
    blurb: 'Staff profile, protocols, performance & oversight dashboards.',
    initials: 'SO',
  },
  {
    id: 'admin',
    name: 'Facility Administrator',
    role: 'Administrator',
    username: 'admin.atunse',
    password: 'demo-admin',
    landing: 'd8a6623a842a496bbf16bf99600850a8', // Administration & Configuration
    accent: '#735c00',
    blurb: 'People, institutions, billing, configuration & governance.',
    initials: 'FA',
  },
  {
    id: 'patient',
    name: 'Patient (Portal)',
    role: 'Patient',
    username: 'patient.portal',
    password: 'demo-patient',
    landing: '4a98aee24a83424db3010d3076a5a42c', // Patient Portal - Home
    accent: '#003f7d',
    blurb: 'The patient-facing portal: appointments, records & consent.',
    initials: 'PP',
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
  },
];

export function findPersona(query) {
  if (!query) return null;
  const q = query.toLowerCase();
  return PERSONAS.find(p => p.id === q || p.username === q) || null;
}
