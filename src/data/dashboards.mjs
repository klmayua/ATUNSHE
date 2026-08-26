// Real, role-specific dashboard content for each persona.
// Built from scratch (not Stitch iframes) — this is the application, not a design guide.
// Canonical data: Dr. Adesenya (Clinician), Dr. Sola (Attending), Adaora (Admin),
// Amina Okafor (Patient, ATN-000184), Mobile Reviewer.

export const DASHBOARDS = {
  clinician: {
    greeting: 'Good morning, Dr. Adesenya',
    sub: 'Cardiology · Lagos General Hospital',
    kpis: [
      { n: '8', l: "Today's appointments" },
      { n: '3', l: 'Pending reviews' },
      { n: '1', l: 'Overdue protocol step' },
      { n: '42', l: 'Patients in care' },
    ],
    sections: [
      {
        title: "Today's schedule",
        items: [
          { t: 'Ojo, P.', s: 'Lab Review', time: '10:30', tag: 'Lab' },
          { t: 'Okafor, Amina', s: 'Cardiology F/U · Hypertension', time: '11:00', tag: 'F/U' },
          { t: 'Adeniyi, Prof', s: 'New Patient Consult', time: '13:15', tag: 'New' },
          { t: 'Edet, Dr Peter', s: 'Routine Review', time: '15:40', tag: 'F/U' },
        ],
      },
      {
        title: 'My alerts',
        alert: true,
        items: [
          { t: 'Overdue — Dementia ADDSB', s: 'Amina Okafor · Annual Cognitive Assessment (MMSE) due', time: 'Today' },
          { t: 'Pending consent', s: 'Ojo, P. · Pre-Visit Questionnaire not returned', time: '2d' },
        ],
      },
    ],
    protocols: [
      { name: 'Dementia ADDSB Dual-Route', patient: 'Okafor, Amina', step: 'Annual Cognitive Assessment', status: 'Overdue' },
    ],
    actions: ['Start Encounter', 'Book Appointment'],
  },

  patient: {
    greeting: 'Good morning, Amina',
    sub: 'Patient ID ATN-000184 · Lagos General Hospital',
    kpis: [
      { n: '1', l: 'Upcoming appointment' },
      { n: '2', l: 'Active-care team' },
      { n: '1', l: 'Open protocol' },
      { n: '0.00', l: 'Account balance (₦)' },
    ],
    sections: [
      {
        title: 'Next appointment',
        items: [
          { t: 'Dietary Consultation', s: 'with Dr. Sola · Nutritionist', time: 'Nov 15, 2023' },
        ],
      },
      {
        title: 'My care team',
        items: [
          { t: 'Dr. Adesenya', s: 'Cardiology · Primary' },
          { t: 'Dr. Sola', s: 'Attending Physician' },
        ],
      },
      {
        title: 'Recent results',
        items: [
          { t: 'Blood Pressure 130/85', s: 'Slightly elevated · Oct 12' },
          { t: 'HbA1c', s: 'Slightly elevated · dietary consult recommended' },
        ],
      },
    ],
    protocols: [
      { name: 'Dementia ADDSB Dual-Route', step: 'Annual Cognitive Assessment', status: 'Overdue — book with care team' },
    ],
    actions: ['Book Appointment', 'Message care team', 'View records'],
  },

  admin: {
    greeting: 'Good morning, Adaora',
    sub: 'Facility Administrator · Lagos General Hospital',
    kpis: [
      { n: '124', l: 'Active staff' },
      { n: '3', l: 'Pending approvals' },
      { n: '₦4.2M', l: 'Month revenue' },
      { n: '98%', l: 'Consent compliance' },
    ],
    sections: [
      {
        title: 'Pending approvals',
        items: [
          { t: 'New staff: Nurse C. Obi', s: 'Ward 3 · awaiting credential check', time: 'Today' },
          { t: 'Leave: Dr. Sola', s: '2 days · coverage assigned', time: '1d' },
          { t: 'Institution: Banner (Partner)', s: 'Onboarding documents', time: '3d' },
        ],
      },
      {
        title: 'Billing summary',
        items: [
          { t: 'Outstanding', s: '₦312,500 across 18 accounts', time: '' },
          { t: 'Recent invoice', s: 'INV-2023-089 · ₦45,000 · paid', time: 'Oct 12' },
        ],
      },
      {
        title: 'Compliance',
        items: [
          { t: 'Chain of Custody Ledger', s: 'Synced · 0 anomalies', time: '' },
          { t: 'Consent audits', s: '98% complete this quarter', time: '' },
        ],
      },
    ],
    protocols: [],
    actions: ['Add staff', 'Review approvals', 'Billing ops'],
  },

  attending: {
    greeting: 'Good morning, Dr. Sola',
    sub: 'Attending Physician · Medical Director',
    kpis: [
      { n: '3', l: 'Active protocols' },
      { n: '94%', l: 'Protocol adherence' },
      { n: '124', l: 'Staff supervised' },
      { n: '2', l: 'Quality flags' },
    ],
    sections: [
      {
        title: 'Protocol adherence',
        items: [
          { t: 'Dementia ADDSB', s: 'Adherence 91% · 1 overdue step', time: '' },
          { t: 'General Clinical Assessment', s: 'Adherence 97%', time: '' },
          { t: 'Follow-up / Review', s: 'Adherence 96%', time: '' },
        ],
      },
      {
        title: 'Quality flags',
        items: [
          { t: 'Overdue assessment', s: 'Amina Okafor · MMSE · assigned Dr. Adesenya', time: 'Today' },
          { t: 'Vitals gap', s: 'Edet, Dr Peter · last captured 5d ago', time: '5d' },
        ],
      },
      {
        title: 'Staff performance',
        items: [
          { t: 'Dr. Adesenya', s: 'Encounters 31 · on-time 96%', time: '' },
          { t: 'Nurse A. Bello', s: 'Vitals 48 · consents 12', time: '' },
        ],
      },
    ],
    protocols: [
      { name: 'Dementia ADDSB Dual-Route', step: 'Across 3 patients', status: '91% adherence' },
      { name: 'General Clinical Assessment', step: 'Across 11 patients', status: '97% adherence' },
      { name: 'Follow-up / Review', step: 'Across 22 patients', status: '96% adherence' },
    ],
    actions: ['Review protocols', 'Staff oversight'],
  },

  mobile: {
    greeting: 'Mobile · Today',
    sub: 'Field companion · Last synced 2 min ago',
    kpis: [
      { n: '3', l: 'My tasks' },
      { n: 'Online', l: 'Sync status' },
      { n: '2', l: 'Patients cached' },
    ],
    sections: [
      {
        title: 'My tasks',
        items: [
          { t: 'Capture vitals', s: 'Okafor, Amina · BP + HR', time: 'Now' },
          { t: 'Consent capture', s: 'Ojo, P. · pre-visit', time: '10:30' },
          { t: 'Review lab', s: 'Edet, Dr Peter · HbA1c', time: 'PM' },
        ],
      },
    ],
    protocols: [],
    actions: ['Quick lookup', 'Sync now'],
  },
};
