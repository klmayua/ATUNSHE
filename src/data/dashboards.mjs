// Rich, role-specific dashboard content for each persona.
// Built from scratch (not Stitch iframes). Depth: KPIs with trend deltas,
// mini bar/line charts (CSS-rendered), status lists, and actionable items.
// Canonical data: Dr Adesenya (Clinician), Dr Sola (Attending), Adaora (Admin),
// Juliet Okafor (Patient, ATN-000201), Mobile Reviewer.

// small helper data for sparkline-style bars
const bars = (vals) => vals.map((v) => Math.round(v)).join(',');

export const DASHBOARDS = {
  clinician: {
    greeting: 'Good morning, Dr. Adesenya',
    sub: 'Cardiology · Lagos General Hospital · Wed 26 Aug',
    kpis: [
      { n: '8', l: "Today's appointments", delta: '+2 vs Tue', dir: 'up' },
      { n: '3', l: 'Pending reviews', delta: '1 urgent', dir: 'flat' },
      { n: '1', l: 'Overdue protocol step', delta: 'Amina Okafor', dir: 'down' },
      { n: '42', l: 'Patients in care', delta: '+3 this week', dir: 'up' },
    ],
    sections: [
      {
        title: "Today's schedule",
        chart: { type: 'bars', labels: ['09', '10', '11', '12', '13', '14', '15'], vals: bars([1, 1, 2, 0, 1, 0, 1]) },
        items: [
          { t: 'Ojo, P.', s: 'Lab Review · BP recheck', time: '10:30', tag: 'Lab' },
          { t: 'Okafor, Amina', s: 'Cardiology F/U · Hypertension', time: '11:00', tag: 'F/U' },
          { t: 'Adeniyi, Prof', s: 'New Patient Consult · Atrial Fib', time: '13:15', tag: 'New' },
          { t: 'Edet, Dr Peter', s: 'Routine Review · Lipids', time: '15:40', tag: 'F/U' },
        ],
      },
      {
        title: 'My alerts',
        alert: true,
        items: [
          { t: 'Overdue — Dementia ADDSB', s: 'Amina Okafor · Annual Cognitive Assessment (MMSE) due', time: 'Today', tag: 'Urgent' },
          { t: 'Pending consent', s: 'Ojo, P. · Pre-Visit Questionnaire not returned', time: '2d', tag: 'Follow-up' },
          { t: 'Vitals gap', s: 'Edet, Dr Peter · last captured 5d ago', time: '5d', tag: 'Watch' },
        ],
      },
      {
        title: 'Care quality',
        chart: { type: 'line', labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4'], vals: bars([88, 90, 92, 94]) },
        items: [
          { t: 'Protocol adherence', s: '94% across 3 active protocols (↑ from 88%)', time: '30d' },
          { t: 'Documentation timeliness', s: '96% notes signed < 24h', time: '30d' },
          { t: 'Patient satisfaction', s: '4.6 / 5.0 this quarter', time: 'QTD' },
        ],
      },
    ],
    protocols: [
      { name: 'Dementia ADDSB Dual-Route', step: 'Annual Cognitive Assessment', patient: 'Okafor, Amina', status: 'Overdue' },
      { name: 'General Clinical Assessment', step: 'Risk Stratification', patient: 'Adeniyi, Prof', status: 'On track' },
      { name: 'Follow-up / Review', step: 'Medication Reconciliation', patient: 'Edet, Dr Peter', status: 'On track' },
    ],
    actions: ['Start Encounter', 'Book Appointment', 'Review protocols'],
  },

  patient: {
    greeting: 'Good morning, Juliet',
    sub: 'Patient ID ATN-000201 · Lagos General Hospital',
    kpis: [
      { n: '1', l: 'Upcoming appointment', delta: 'Lab Review', dir: 'flat' },
      { n: '2', l: 'Care team members', delta: 'Dr Adesenya', dir: 'flat' },
      { n: '1', l: 'Open protocol', delta: 'General Clinical', dir: 'flat' },
      { n: '₦12,500', l: 'Account balance', delta: 'due on next visit', dir: 'down' },
    ],
    sections: [
      {
        title: 'Next appointment',
        items: [
          { t: 'Lab Review', s: 'with Dr. Adesenya · Cardiology', time: 'Tue 25 · 10:30' },
          { t: 'Pre-visit questionnaire', s: 'Please complete before arrival', time: 'Required', tag: 'Action' },
        ],
      },
      {
        title: 'My care team',
        items: [
          { t: 'Dr. Adesenya', s: 'Cardiology · Primary physician', time: '' },
          { t: 'Atunse Care Coordinator', s: 'Scheduling & results', time: '' },
        ],
      },
      {
        title: 'Recent results',
        chart: { type: 'line', labels: ['Apr', 'May', 'Jun', 'Jul', 'Aug'], vals: bars([6.8, 6.9, 7.0, 7.1, 7.2]) },
        items: [
          { t: 'Blood Glucose (fasting)', s: '7.2 mmol/L · slightly high · trend ↑', time: 'Oct 18' },
          { t: 'HbA1c', s: '7.1% · monitoring · target < 7.0%', time: 'Oct 18' },
          { t: 'Blood Pressure', s: '128/82 · well controlled', time: 'Sep 30' },
        ],
      },
      {
        title: 'My records & consent',
        items: [
          { t: 'Consent status', s: 'General consent signed · valid', time: 'Active', tag: 'OK' },
          { t: 'Data sharing', s: 'Lagos region storage · NDPR compliant', time: '' },
          { t: 'Download summary', s: 'PDF of last visit available', time: 'Ready' },
        ],
      },
    ],
    protocols: [
      { name: 'General Clinical Assessment', step: 'Routine bloods', patient: 'You', status: 'Pending — book with care team' },
    ],
    actions: ['Book Appointment', 'Message care team', 'View records'],
  },

  admin: {
    greeting: 'Good morning, Adaora',
    sub: 'Facility Administrator · Lagos General Hospital',
    kpis: [
      { n: '124', l: 'Active staff', delta: '+2 this month', dir: 'up' },
      { n: '3', l: 'Pending approvals', delta: '1 urgent', dir: 'flat' },
      { n: '₦4.2M', l: 'Month revenue', delta: '+8% vs last', dir: 'up' },
      { n: '98%', l: 'Consent compliance', delta: '+1% QoQ', dir: 'up' },
    ],
    sections: [
      {
        title: 'Pending approvals',
        items: [
          { t: 'New staff: Nurse C. Obi', s: 'Ward 3 · awaiting credential check', time: 'Today', tag: 'Urgent' },
          { t: 'Leave: Dr. Sola', s: '2 days · coverage assigned', time: '1d' },
          { t: 'Institution: Banner (Partner)', s: 'Onboarding documents', time: '3d' },
        ],
      },
      {
        title: 'Billing summary',
        chart: { type: 'bars', labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4'], vals: bars([0.9, 1.1, 0.8, 1.4]) },
        items: [
          { t: 'Outstanding', s: '₦312,500 across 18 accounts', time: '' },
          { t: 'Recent invoice', s: 'INV-2023-089 · ₦45,000 · paid', time: 'Oct 12' },
          { t: 'Collection rate', s: '96% this month', time: 'MTD' },
        ],
      },
      {
        title: 'Compliance & governance',
        items: [
          { t: 'Chain of Custody Ledger', s: 'Synced · 0 anomalies this week', time: 'Live', tag: 'OK' },
          { t: 'Consent audits', s: '98% complete this quarter', time: 'QTD' },
          { t: 'Access review', s: '12 privileged accounts re-certified', time: 'This week' },
        ],
      },
      {
        title: 'Facility operations',
        chart: { type: 'line', labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], vals: bars([70, 74, 78, 76, 80]) },
        items: [
          { t: 'Bed occupancy', s: '78% · within safe range', time: 'Live' },
          { t: 'Avg wait (Lab)', s: '22 min · target < 30', time: 'Today' },
          { t: 'Equipment uptime', s: '99.2% across modalities', time: '30d' },
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
      { n: '3', l: 'Active protocols', delta: '91–97% adherence', dir: 'up' },
      { n: '94%', l: 'Protocol adherence', delta: '+3% QoQ', dir: 'up' },
      { n: '124', l: 'Staff supervised', delta: '+2 this month', dir: 'up' },
      { n: '2', l: 'Quality flags', delta: '1 overdue', dir: 'flat' },
    ],
    sections: [
      {
        title: 'Protocol adherence',
        chart: { type: 'bars', labels: ['ADDSB', 'GCA', 'FUR'], vals: bars([91, 97, 96]) },
        items: [
          { t: 'Dementia ADDSB', s: 'Adherence 91% · 1 overdue step', time: '' },
          { t: 'General Clinical Assessment', s: 'Adherence 97%', time: '' },
          { t: 'Follow-up / Review', s: 'Adherence 96%', time: '' },
        ],
      },
      {
        title: 'Quality flags',
        alert: true,
        items: [
          { t: 'Overdue assessment', s: 'Amina Okafor · MMSE · assigned Dr. Adesenya', time: 'Today', tag: 'Urgent' },
          { t: 'Vitals gap', s: 'Edet, Dr Peter · last captured 5d ago', time: '5d', tag: 'Watch' },
        ],
      },
      {
        title: 'Staff performance',
        chart: { type: 'line', labels: ['Wk1', 'Wk2', 'Wk3', 'Wk4'], vals: bars([90, 92, 93, 96]) },
        items: [
          { t: 'Dr. Adesenya', s: 'Encounters 31 · on-time 96%', time: '30d' },
          { t: 'Nurse A. Bello', s: 'Vitals 48 · consents 12', time: '30d' },
          { t: 'Dr. Sola', s: 'Reviews 18 · oversight 100%', time: '30d' },
        ],
      },
    ],
    protocols: [
      { name: 'Dementia ADDSB Dual-Route', step: 'Across 3 patients', patient: '', status: '91% adherence' },
      { name: 'General Clinical Assessment', step: 'Across 11 patients', patient: '', status: '97% adherence' },
      { name: 'Follow-up / Review', step: 'Across 22 patients', patient: '', status: '96% adherence' },
    ],
    actions: ['Review protocols', 'Staff oversight', 'View reports'],
  },

  mobile: {
    greeting: 'Mobile · Today',
    sub: 'Field companion · Last synced 2 min ago',
    kpis: [
      { n: '3', l: 'My tasks', delta: '1 due now', dir: 'flat' },
      { n: 'Online', l: 'Sync status', delta: '2 patients cached', dir: 'up' },
      { n: '2', l: 'Patients cached', delta: 'offline ready', dir: 'flat' },
      { n: '0', l: 'Conflicts', delta: 'last sync clean', dir: 'up' },
    ],
    sections: [
      {
        title: 'My tasks',
        items: [
          { t: 'Capture vitals', s: 'Okafor, Amina · BP + HR', time: 'Now', tag: 'Now' },
          { t: 'Consent capture', s: 'Ojo, P. · pre-visit', time: '10:30' },
          { t: 'Review lab', s: 'Edet, Dr Peter · HbA1c', time: 'PM' },
        ],
      },
      {
        title: 'Sync & offline',
        chart: { type: 'bars', labels: ['08', '09', '10', '11', '12'], vals: bars([1, 0, 1, 1, 0]) },
        items: [
          { t: 'Last sync', s: '2 min ago · all records current', time: 'Live' },
          { t: 'Offline cache', s: 'Okafor, Amina · Ojo, P. ready', time: '' },
          { t: 'Pending upload', s: '0 records · queue clear', time: '' },
        ],
      },
    ],
    protocols: [],
    actions: ['Quick lookup', 'Sync now', 'Start capture'],
  },
};
