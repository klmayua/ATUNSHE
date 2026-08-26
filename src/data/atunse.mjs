// Canonical Atunse Health seed data. This is the single source of truth for the
// rebuilt application — no Stitch content is served. Names per spec/owner decision:
//   Dr. Adesenya (Clinician, Cardiology), Dr. Sola (Attending/Medical Director),
//   Adaora (Facility Administrator/HR), Amina Okafor (ATN-000184, flagship patient),
//   plus seeded patients Juliet Okafor, Prof Adeniyi, Dr Peter Edet, and nurses
//   Bello / Obi / Eze / Okoro. All amounts in Naira (₦).

export const facility = {
  name: 'Atunse Health',
  site: 'Lagos General Hospital',
  region: 'Lagos Island, Nigeria',
};

export const staff = {
  clinician: { id: 'adesenya', name: 'Dr. Adesenya', role: 'Clinician', specialty: 'Cardiology', initials: 'AD' },
  attending: { id: 'sola', name: 'Dr. Sola', role: 'Attending Physician', specialty: 'Internal Medicine', initials: 'SO' },
  admin: { id: 'adaora', name: 'Adaora', role: 'Facility Administrator / HR', initials: 'AD' },
  nurses: [
    { name: 'Nurse A. Bello', initials: 'AB', ward: 'Ward 3' },
    { name: 'Nurse C. Obi', initials: 'CO', ward: 'Ward 2' },
    { name: 'Nurse F. Eze', initials: 'FE', ward: 'Ward 1' },
    { name: 'Nurse D. Okoro', initials: 'DO', ward: 'ICU' },
  ],
  frontDesk: { name: 'Front Desk', initials: 'FD' },
  finance: { name: 'Finance Officer', initials: 'FO' },
};

export const patients = [
  {
    id: 'ATN-000184',
    name: 'Amina Okafor',
    age: 34,
    sex: 'Female',
    dob: '12 Oct 1989',
    blood: 'O+',
    phone: '+234 803 000 0184',
    conditions: [
      { name: 'Hypertension, Essential', detail: 'Diagnosed Oct 2021 · Dr. Adesenya', status: 'Active' },
      { name: 'Pre-Diabetes', detail: 'Diagnosed Jan 2023 · Monitoring', status: 'Active' },
    ],
    allergies: [
      { name: 'Penicillin', severity: 'Severe' },
      { name: 'Latex', severity: 'Mild' },
    ],
    risk: [{ name: 'Moderate Fall Risk', detail: 'Assessed 10/24' }],
    vitals: { bp: '130/85', bpNote: 'Slightly Elevated', hr: '72 bpm', hrNote: 'Normal', temp: '36.8°C', spo2: '98%' },
    consent: 'Active',
    protocol: 'Dementia ADDSB',
    balance: '₦0.00',
    nhis: 'Active (HMO: Reliance)',
    upcoming: { title: 'Dietary Consultation', when: 'Nov 15, 2023', with: 'Dr. Sola, Nutritionist' },
    careTeam: [
      { name: 'Dr. Adesenya', role: 'Cardiology · Primary' },
      { name: 'Dr. Sola', role: 'Attending Physician' },
    ],
    timeline: [
      { date: 'Today · 09:30', type: 'Outpatient Follow-up', text: 'Routine check-up for hypertension management. BP 130/85. Verified by Dr. Adesenya.' },
      { date: 'Oct 12, 2023', type: 'Lab Results', text: 'Complete Blood Count. HbA1c slightly elevated. Recommending dietary consultation. Verified by System Auto-Sync.' },
      { date: 'Sep 05, 2023', type: 'Prescription Refill', text: 'Lisinopril 10mg authorized for 3 months.' },
      { date: 'Oct 2021', type: 'Diagnosis', text: 'Essential Hypertension established. Care plan initiated by Dr. Adesenya.' },
    ],
  },
  { id: 'ATN-000201', name: 'Juliet Okafor', age: 42, sex: 'Male', dob: '14 Mar 1983', blood: 'A+', conditions: [{ name: 'Type 2 Diabetes', detail: 'Diagnosed 2019', status: 'Active' }], allergies: [{ name: 'None recorded', severity: '—' }], risk: [], vitals: { bp: '128/82', bpNote: 'Normal', hr: '76 bpm', hrNote: 'Normal' }, consent: 'Active', protocol: '—', balance: '₦12,500', nhis: 'Active (HMO: Reliance)', upcoming: { title: 'Lab Review', when: 'Tue 25 · 10:30', with: 'Dr. Adesenya' }, careTeam: [{ name: 'Dr. Adesenya', role: 'Primary' }], timeline: [{ date: 'Tue 25 · 10:30', type: 'Lab Review', text: 'Scheduled lab review with Dr. Adesenya.' }] },
  { id: 'ATN-000315', name: 'Prof Adeniyi', age: 67, sex: 'Male', dob: '02 Sep 1958', blood: 'B+', conditions: [{ name: 'Atrial Fibrillation', detail: 'Diagnosed 2020', status: 'Active' }], allergies: [{ name: 'Sulphur', severity: 'Moderate' }], risk: [{ name: 'High Fall Risk', detail: 'Assessed 08/24' }], vitals: { bp: '138/88', bpNote: 'Elevated', hr: '88 bpm', hrNote: 'Normal' }, consent: 'Active', protocol: 'General Clinical Assessment', balance: '₦0.00', nhis: 'Active (HMO: Reliance)', upcoming: { title: 'New Patient Consult', when: 'Today · 13:15', with: 'Dr. Adesenya' }, careTeam: [{ name: 'Dr. Adesenya', role: 'Primary' }], timeline: [{ date: 'Today · 13:15', type: 'New Patient Consult', text: 'Initial consult for cardiology review.' }] },
  { id: 'ATN-000342', name: 'Dr Peter Edet', age: 51, sex: 'Male', dob: '19 Jun 1974', blood: 'O-', conditions: [{ name: 'Hyperlipidaemia', detail: 'Diagnosed 2022', status: 'Active' }], allergies: [{ name: 'None recorded', severity: '—' }], risk: [], vitals: { bp: '124/79', bpNote: 'Normal', hr: '70 bpm', hrNote: 'Normal' }, consent: 'Active', protocol: 'Follow-up / Review', balance: '₦3,200', nhis: 'Active (HMO: Reliance)', upcoming: { title: 'Routine Review', when: 'Today · 15:40', with: 'Dr. Adesenya' }, careTeam: [{ name: 'Dr. Adesenya', role: 'Primary' }], timeline: [{ date: 'Today · 15:40', type: 'Routine Review', text: 'Scheduled review of lipid panel.' }] },
];

export const appointments = [
  { day: 'TUE 25', dow: 'Tue', date: '25', time: '10:30', patient: 'Ojo, P.', reason: 'Lab Review', provider: 'Dr. Adesenya', type: 'Lab', status: 'Arrived' },
  { day: 'WED 26', dow: 'Wed', date: '26', time: '—', patient: '—', reason: 'Admin Block', provider: '—', type: 'Admin', status: 'Block' },
  { day: 'THU 27', dow: 'Thu', date: '27', time: '', patient: '', reason: '', provider: '', type: '', status: '' },
  { day: 'FRI 28', dow: 'Fri', date: '28', time: '', patient: '', reason: '', provider: '', type: '', status: '' },
  { day: 'MON 24', dow: 'Mon', date: '24', time: '09:00', patient: 'Edet, Dr Peter', reason: 'Lipid Review', provider: 'Dr. Adesenya', type: 'F/U', status: 'Done' },
];

export const protocols = [
  {
    name: 'Dementia ADDSB Dual-Route',
    code: 'ATN-DEM-ADDSB-2026-001',
    version: 'v2.3',
    status: 'Active',
    owner: 'Dr. Sola',
    description: 'Dual-route cognitive assessment and monitoring protocol for at-risk patients.',
    steps: [
      { n: 1, name: 'MMSE Screening', cadence: 'Annual', status: 'Overdue', patient: 'Okafor, Amina' },
      { n: 2, name: 'Caregiver Interview', cadence: 'Annual', status: 'Complete', patient: 'Okafor, Amina' },
      { n: 3, name: 'MoCA Re-assessment', cadence: '6-month', status: 'Pending', patient: 'Okafor, Amina' },
    ],
    history: [
      { v: 'v2.3', date: '2026-01-12', by: 'Dr. Sola', note: 'Added dual-route MMSE + MoCA.' },
      { v: 'v2.1', date: '2025-08-03', by: 'Dr. Sola', note: 'Cadence aligned to annual.' },
      { v: 'v1.0', date: '2025-02-20', by: 'Dr. Adesenya', note: 'Initial publication.' },
    ],
  },
  {
    name: 'General Clinical Assessment',
    code: 'ATN-GCA-2026-002',
    version: 'v1.4',
    status: 'Active',
    owner: 'Dr. Adesenya',
    description: 'Standard baseline assessment for new and returning patients.',
    steps: [
      { n: 1, name: 'Vitals Capture', cadence: 'Per visit', status: 'Complete', patient: 'Adeniyi, Prof' },
      { n: 2, name: 'History Review', cadence: 'Per visit', status: 'Complete', patient: 'Adeniyi, Prof' },
      { n: 3, name: 'Risk Stratification', cadence: 'Annual', status: 'Complete', patient: 'Adeniyi, Prof' },
    ],
    history: [
      { v: 'v1.4', date: '2026-02-01', by: 'Dr. Adesenya', note: 'Added risk stratification step.' },
      { v: 'v1.0', date: '2025-05-10', by: 'Dr. Adesenya', note: 'Initial publication.' },
    ],
  },
  {
    name: 'Follow-up / Review',
    code: 'ATN-FUR-2026-003',
    version: 'v1.1',
    status: 'Active',
    owner: 'Dr. Sola',
    description: 'Structured follow-up and review workflow for chronic care.',
    steps: [
      { n: 1, name: 'Outcome Check', cadence: 'Per review', status: 'Complete', patient: 'Edet, Dr Peter' },
      { n: 2, name: 'Medication Reconciliation', cadence: 'Per review', status: 'Complete', patient: 'Edet, Dr Peter' },
    ],
    history: [
      { v: 'v1.1', date: '2026-03-15', by: 'Dr. Sola', note: 'Added medication reconciliation.' },
      { v: 'v1.0', date: '2025-09-01', by: 'Dr. Sola', note: 'Initial publication.' },
    ],
  },
];

export const invoices = [
  { no: 'INV-2023-089', patient: 'Okafor, Amina', date: 'Oct 12, 2023', items: 'Consultation · Lab', amount: '₦45,000', status: 'Paid' },
  { no: 'INV-2023-091', patient: 'Ojo, P.', date: 'Oct 18, 2023', items: 'Lab Review', amount: '₦12,500', status: 'Outstanding' },
  { no: 'INV-2023-094', patient: 'Edet, Dr Peter', date: 'Oct 22, 2023', items: 'Review', amount: '₦3,200', status: 'Outstanding' },
  { no: 'INV-2023-080', patient: 'Adeniyi, Prof', date: 'Sep 30, 2023', items: 'Cardiology Consult', amount: '₦78,000', status: 'Paid' },
];

export const billingSummary = { revenue: '₦4.2M', outstanding: '₦312,500', accounts: 18, collected: '96%' };

export const institutions = [
  { name: 'Reliance HMO', type: 'Insurer', status: 'Active' },
  { name: 'Banner (Partner)', type: 'Partner Institution', status: 'Onboarding' },
  { name: 'Lagos General Hospital', type: 'Parent Facility', status: 'Active' },
];

export const ledgers = {
  chainOfCustody: [
    { ref: 'COC-2231', item: 'MMSE Form · Okafor, Amina', custodian: 'Nurse A. Bello', action: 'Captured', when: 'Oct 12, 09:10', hash: '0x9f2a…c41' },
    { ref: 'COC-2232', item: 'Consent PDF · Ojo, P.', custodian: 'Front Desk', action: 'Signed', when: 'Oct 18, 11:02', hash: '0x71be…a09' },
  ],
  consent: [
    { ref: 'CNS-551', patient: 'Okafor, Amina', type: 'General Consent', status: 'Signed Oct 12', by: 'Dr. Adesenya' },
    { ref: 'CNS-552', patient: 'Ojo, P.', type: 'Pre-Visit Questionnaire', status: 'Reminder sent', by: 'System' },
  ],
  trust: [
    { ref: 'TRU-009', area: 'Data Residency', status: 'Compliant', note: 'Lagos region storage verified.' },
    { ref: 'TRU-010', area: 'Access Audit', status: 'Compliant', note: '98% complete this quarter.' },
  ],
};

export const reports = {
  performance: [
    { metric: 'Encounters (Dr. Adesenya)', value: '31', note: 'On-time 96%' },
    { metric: 'Avg encounter duration', value: '18 min', note: 'Target < 25' },
    { metric: 'Protocol adherence', value: '94%', note: 'Across 3 protocols' },
  ],
  operational: [
    { metric: 'Bed occupancy', value: '78%', note: 'Lagos General' },
    { metric: 'Avg wait (Lab)', value: '22 min', note: 'Target < 30' },
    { metric: 'Consent compliance', value: '98%', note: 'This quarter' },
  ],
  intelligence: [
    { finding: 'HbA1c trend rising', cohort: 'Pre-Diabetes (n=12)', action: 'Dietary consult recommended' },
    { finding: 'BP control improving', cohort: 'Hypertension (n=34)', action: 'Continue current regimen' },
  ],
  migration: [
    { ref: 'LEG-01', source: 'Legacy EMR', records: '1,204', status: 'Reviewed', note: '0 conflicts' },
    { ref: 'LEG-02', source: 'Partner Export', records: '318', status: 'In review', note: '12 pending mapping' },
  ],
};

export const ogami = [
  { from: 'user', text: 'Summarise Amina Okafor’s open items.' },
  { from: 'ogami', text: 'Amina Okafor (ATN-000184): overdue Dementia ADDSB MMSE screening; Pre-Visit Questionnaire outstanding; BP 130/85 slightly elevated. Recommend scheduling cognitive assessment.' },
  { from: 'user', text: 'Draft the assessment task.' },
  { from: 'ogami', text: 'Created task “Annual Cognitive Assessment (MMSE)” assigned to Dr. Adesenya, due today.' },
];

export function patientById(id) {
  return patients.find((p) => p.id === id) || patients[0];
}
