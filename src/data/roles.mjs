// ---------------------------------------------------------------------------
// ROLES — taken directly from the clinical protocol's responsibilities table
// (ATN-DEM-ADDSB-2026-001 §3, Table 4) plus the two non-clinical roles the
// EMR proposal requires (Administration §7, Patient/caregiver access §3).
//
// These are NOT invented demo personas. Each role's `duties` string is the
// protocol's own wording, and its permissions follow from those duties:
// separation of duties is a protocol requirement, not a UI convenience.
//
//   §5.2(C) "Pre-dose timeout (two-person verification)" is the reason
//   `canAuthorise` and `canWitness` are separate flags — the same signed-in
//   user can never satisfy both halves of a timeout.
// ---------------------------------------------------------------------------

export const ROLES = [
  {
    id: 'pi',
    name: 'Dr. Sola',
    short: 'Dr. Sola',
    initials: 'SO',
    role: 'Principal Investigator',
    roleFull: 'Principal Investigator / Supervising Physician',
    username: 'sola',
    password: 'demo',
    duties:
      'Final eligibility determination; confirms the treatment regimen; authorises each administration; risk–benefit assessment; AE/SAE management and reporting; stopping decisions.',
    protocolRef: '§3 Table 4',
    home: 'command',
    accent: '#002F5F',
    canAuthorise: true,
    canWitness: true,
    canSignOff: true,
    breakGlass: true,
    allow: [
      'command', 'cohort', 'patient', 'session', 'protocols', 'protocol', 'forms', 'form',
      'safety', 'consent', 'custody', 'audit', 'product', 'device', 'schedule',
      'analytics', 'learning', 'people', 'architecture', 'delivery', 'ogami', 'mobile',
    ],
  },
  {
    // Sub-Investigator. §3 Table 4 reserves final eligibility, administration
    // authorisation and stopping decisions to the Principal Investigator, so
    // this role can examine, review and WITNESS a timeout — but cannot sign
    // the authorisation line. That distinction is the point of having both.
    id: 'attending',
    name: 'Dr. Adesanya',
    short: 'Dr. Adesanya',
    initials: 'TA',
    role: 'Sub-Investigator',
    roleFull: 'Sub-Investigator / Attending Physician',
    username: 'adesanya',
    password: 'demo',
    duties:
      'Clinical examination and pre-session safety review under the Principal Investigator; independent witness at the pre-dose timeout; adverse-event recognition, grading and escalation. Final eligibility, administration authorisation and stopping decisions remain with the PI.',
    protocolRef: '§3 Table 4 — delegated',
    home: 'command',
    accent: '#1b5e63',
    canAuthorise: false,
    canWitness: true,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'cohort', 'patient', 'session', 'protocols', 'protocol', 'forms', 'form',
      'safety', 'consent', 'schedule', 'analytics', 'learning', 'product', 'device',
      'mobile', 'ogami',
    ],
  },
  {
    id: 'nurse',
    name: 'Nurse Amaka Bello',
    short: 'N. Bello',
    initials: 'AB',
    role: 'Clinic Nurse',
    roleFull: 'Clinic Nurse — administration & monitoring',
    username: 'a.bello',
    password: 'demo',
    duties:
      'Vital signs and monitoring; IV access and administration; assists intranasal delivery; documentation; AE recognition and escalation.',
    protocolRef: '§3 Table 4',
    home: 'command',
    accent: '#00695f',
    canAuthorise: false,
    canWitness: true,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'cohort', 'patient', 'session', 'protocols', 'protocol', 'forms', 'form',
      'safety', 'consent', 'device', 'schedule', 'mobile', 'ogami',
    ],
  },
  {
    id: 'pharmacist',
    name: 'Tunde Ilesanmi',
    short: 'T. Ilesanmi',
    initials: 'TI',
    role: 'Product Custodian',
    roleFull: 'Pharmacist / Product Custodian',
    username: 't.ilesanmi',
    password: 'demo',
    duties:
      'Cold-chain control and product accountability; lot and Certificate-of-Analysis verification; thawing and handling; reconciliation.',
    protocolRef: '§3 Table 4',
    home: 'product',
    accent: '#0d4f8b',
    canAuthorise: false,
    canWitness: true,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'product', 'device', 'cohort', 'patient', 'session', 'custody',
      'protocols', 'protocol', 'forms', 'form', 'safety', 'schedule', 'mobile',
    ],
  },
  {
    id: 'operator',
    name: 'Chidi Nwosu',
    short: 'C. Nwosu',
    initials: 'CN',
    role: 'Device Operator',
    roleFull: 'ViaNase™ Device Operator',
    username: 'c.nwosu',
    password: 'demo',
    duties:
      'ViaNase™ performance check, loading, delivery, and cleaning per manufacturer instructions; device log.',
    protocolRef: '§3 Table 4',
    home: 'device',
    accent: '#6a4b9c',
    canAuthorise: false,
    canWitness: true,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'device', 'session', 'cohort', 'patient', 'product', 'protocols',
      'protocol', 'forms', 'form', 'safety', 'schedule', 'mobile',
    ],
  },
  {
    id: 'coordinator',
    name: 'Ngozi Aluko',
    short: 'N. Aluko',
    initials: 'NA',
    role: 'Study Coordinator',
    roleFull: 'Study Coordinator — CRF, consent file & regulatory',
    username: 'n.aluko',
    password: 'demo',
    duties:
      'Case report form completion; consent file; follow-up scheduling; regulatory and ethics file maintenance.',
    protocolRef: '§3 Table 4',
    home: 'consent',
    accent: '#8a5a00',
    canAuthorise: false,
    canWitness: true,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'cohort', 'patient', 'session', 'consent', 'custody', 'audit', 'forms',
      'form', 'protocols', 'protocol', 'safety', 'schedule', 'crm', 'analytics',
      'learning', 'product', 'device', 'ogami', 'mobile', 'architecture', 'delivery',
    ],
  },
  {
    id: 'administrator',
    name: 'Adaora Eze',
    short: 'A. Eze',
    initials: 'AE',
    role: 'Facility Administrator',
    roleFull: 'Facility Administrator — people, institutions & revenue',
    username: 'a.eze',
    password: 'demo',
    duties:
      'People and institutions, facilities and configuration, billing and revenue, user management and administrative audit. No clinical record access.',
    protocolRef: 'EMR Proposal §7',
    home: 'command',
    accent: '#8a3a3a',
    canAuthorise: false,
    canWitness: false,
    canSignOff: false,
    breakGlass: false,
    allow: [
      'command', 'people', 'billing', 'crm', 'schedule', 'audit', 'custody', 'analytics',
      'architecture', 'delivery', 'ogami',
    ],
  },
  {
    id: 'patient',
    name: 'Mrs. Comfort Eze',
    short: 'Mrs. Eze',
    initials: 'CE',
    role: 'Patient',
    roleFull: 'Patient — ATN-0008, Session 5 of 6',
    username: 'c.eze',
    password: 'demo',
    duties:
      'Access to her own record, results and care plan; patient-entered history and pre-visit questionnaires; patient-reported symptoms and outcomes; patient-held consent and communication preferences.',
    protocolRef: 'EMR Proposal §3 — patient-driven',
    home: 'portal',
    accent: '#1d5b7a',
    canAuthorise: false,
    canWitness: false,
    canSignOff: false,
    breakGlass: false,
    allow: ['portal', 'myrecord', 'myvisits', 'mysymptoms', 'myconsent', 'ogami'],
    scopedTo: 'ATN-0008',
    isPatient: true,
  },
  {
    id: 'caregiver',
    name: 'Mrs. Bisi Adewale',
    short: 'B. Adewale',
    initials: 'BA',
    role: 'Caregiver',
    roleFull: 'Caregiver — for Mrs. Folake Adewale (ATN-0004)',
    username: 'b.adewale',
    password: 'demo',
    duties:
      'Daily observation diary; reporting of interval symptoms and adverse events; support for follow-up attendance.',
    protocolRef: '§3 Table 4',
    home: 'diary',
    accent: '#2d6a4f',
    canAuthorise: false,
    canWitness: false,
    canSignOff: false,
    breakGlass: false,
    allow: ['diary', 'portal', 'ogami'],
    scopedTo: 'ATN-0004',
    isCaregiver: true,
  },
];

export const ROLE_BY_ID = Object.fromEntries(ROLES.map((r) => [r.id, r]));

export function canView(role, section) {
  if (!role) return false;
  return role.allow.includes(section);
}

export function findRole(q) {
  if (!q) return null;
  const s = String(q).toLowerCase();
  return ROLES.find((r) => r.id === s || r.username === s) || null;
}
