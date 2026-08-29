// ---------------------------------------------------------------------------
// THE TRUST LAYER — consent as live state, chain of custody, governance
// ledger, audit trail.
//
// EMR Proposal §8: "Consent and critical events are verifiable and
// tamper-evident, so Atunse Health can establish what happened, when, and
// under whose authority, with confidence."
//
// Figure 6 of the proposal is a six-column record:
//     WHO → DID WHAT → WHEN → AUTHORITY → TO WHAT → WHAT NEXT
// Every custody entry below carries exactly those six columns, plus the hash
// chain that makes the sequence tamper-evident. Each entry's `prev` is the
// hash of the entry before it, so an altered or removed row breaks the chain
// and is detectable without trusting the database.
// ---------------------------------------------------------------------------

export const custodyLedger = [
  {
    seq: 1042,
    who: 'T. Ilesanmi',
    whoRole: 'Product Custodian',
    did: 'Released product to session',
    when: '26 Aug 2026 · 09:12:04 WAT',
    authority: 'Protocol §5.2 A — Gate A closure',
    toWhat: 'Lot RJV-70B-2608C (1 vial) + lot EXP-140B-2608B (1 vial) → ATN-0004 Session 4',
    next: 'Gate B check-in',
    hash: '0x7f31a9c4e2b8',
    prev: '0x1c48d0fa6e73',
    verified: true,
  },
  {
    seq: 1043,
    who: 'N. Bello',
    whoRole: 'Clinic Nurse',
    did: 'Recorded pre-dose observations',
    when: '26 Aug 2026 · 09:24:51 WAT',
    authority: 'Protocol §5.2 B · Appendix C',
    toWhat: 'ATN-0004 Session 4 — BP 138/84, HR 76, RR 16, SpO₂ 97 %, 36.6 °C',
    next: 'Physician safety review',
    hash: '0x1c48d0fa6e73',
    prev: '0x9b02e7143dd1',
    verified: true,
  },
  {
    seq: 1044,
    who: 'Dr. F. Sola',
    whoRole: 'Principal Investigator',
    did: 'Completed pre-session safety review — no stopping criterion present',
    when: '26 Aug 2026 · 09:29:18 WAT',
    authority: 'Protocol §5.2 · §6.3 — PI stopping authority',
    toWhat: 'ATN-0004 Session 4 — Gate B closed',
    next: 'Pre-dose timeout (two-person)',
    hash: '0x9b02e7143dd1',
    prev: '0x4a7c1e93b0f5',
    verified: true,
  },
  {
    seq: 1045,
    who: 'N. Bello',
    whoRole: 'Clinic Nurse',
    did: 'Signed timeout as verifier — awaiting independent witness',
    when: '26 Aug 2026 · 09:34:07 WAT',
    authority: 'Protocol §5.2 C — two-person verification',
    toWhat: 'ATN-0004 Session 4 — Gate C, 7 of 7 items verified, 1 of 2 signatures',
    next: 'Second signature required from a different user',
    hash: '0x4a7c1e93b0f5',
    prev: '0xe018b4d27a6c',
    verified: true,
  },
  {
    seq: 1041,
    who: 'T. Ilesanmi',
    whoRole: 'Product Custodian',
    did: 'Quarantined lot after cold-chain excursion',
    when: '24 Aug 2026 · 05:34:12 WAT',
    authority: 'GDP cold chain · Protocol §6.2 · Appendix E',
    toWhat: 'Lot EXP-140B-2608A — 9 vials moved to quarantine store',
    next: 'Sponsor product-quality review (PQC-0001)',
    hash: '0xe018b4d27a6c',
    prev: '0x33f9ac0158be',
    verified: true,
  },
  {
    seq: 1040,
    who: 'System',
    whoRole: 'Platform (temperature rule)',
    did: 'Raised cold-chain excursion and blocked lot release',
    when: '24 Aug 2026 · 05:30:00 WAT',
    authority: 'Configured storage rule ≤ −20 °C',
    toWhat: 'Freezer 2 — lot EXP-140B-2608A, −11.4 °C for 3 h 20 min',
    next: 'Custodian action + sponsor notification',
    hash: '0x33f9ac0158be',
    prev: '0x8d2b76e4c019',
    verified: true,
  },
  {
    seq: 1039,
    who: 'System',
    whoRole: 'Platform (capacity rule)',
    did: 'Suspended consent following capacity re-assessment',
    when: '24 Aug 2026 · 16:02:44 WAT',
    authority: 'Consent & capacity standard · Protocol §5.1',
    toWhat: 'ATN-0005 consent v2.0 — status In force → Suspended',
    next: 'LAR consent v2.1 issued for signature',
    hash: '0x8d2b76e4c019',
    prev: '0x5e91c3a70f28',
    verified: true,
  },
  {
    seq: 1038,
    who: 'Dr. F. Sola',
    whoRole: 'Principal Investigator',
    did: 'Recorded stopping decision and study hold',
    when: '12 Aug 2026 · 12:04:31 WAT',
    authority: 'Protocol §6.3 — neurologic worsening',
    toWhat: 'ATN-0002 — course halted, Sessions 3–6 suspended',
    next: 'SAE-0002 report to ethics and sponsor',
    hash: '0x5e91c3a70f28',
    prev: '0xa47f02be931d',
    verified: true,
  },
  {
    seq: 1037,
    who: 'N. Aluko',
    whoRole: 'Study Coordinator',
    did: 'Transmitted coded research export to sponsor',
    when: '10 Aug 2026 · 18:00:00 WAT',
    authority: 'Data Processing Agreement — KweHealth, LLC',
    toWhat: 'Coded dataset, 8 subjects, no direct identifiers, weekly cadence',
    next: 'Sponsor acknowledgement receipt filed',
    hash: '0xa47f02be931d',
    prev: '0x62d8e1470ca9',
    verified: true,
  },
  {
    seq: 1036,
    who: 'C. Nwosu',
    whoRole: 'Device Operator',
    did: 'Logged device performance check and cleaning',
    when: '19 Aug 2026 · 09:05:22 WAT',
    authority: 'Appendix F · ViaNase™ IFU rev. 4.2',
    toWhat: 'Device VN-CPD-004417 — output check pass, adapter discarded',
    next: 'Available for Session use',
    hash: '0x62d8e1470ca9',
    prev: '0x0fb35c8a2e47',
    verified: true,
  },
];

export const ledgerIntegrity = {
  entries: 1045,
  verifiedTo: 1045,
  lastVerification: '26 Aug 2026 · 06:00 WAT',
  method: 'Hash-chained append-only ledger with independent anchor',
  anchor: 'Governance-event digests anchored to a permissioned chain. Patient records themselves remain in the secure in-region data layer and are never written to a public chain (EMR Proposal §8).',
  breaks: 0,
  status: 'Intact',
};

// --- Consent register (live state, not filed documents) ---------------------
export const consentRegister = [
  { patient: 'ATN-0001', name: 'Chief Adebayo Ogunlesi', version: 'v2.0', status: 'In force', signedBy: 'Patient', signed: '03 Jun 2026', expires: '03 Jun 2027', lar: null, purposes: 3, lastVerified: '15 Jul 2026 · Gate B' },
  { patient: 'ATN-0002', name: 'Mrs. Grace Nwachukwu', version: 'v2.0', status: 'In force', signedBy: 'Patient', signed: '15 Jul 2026', expires: '15 Jul 2027', lar: null, purposes: 3, lastVerified: '12 Aug 2026 · Gate B' },
  { patient: 'ATN-0003', name: 'Alhaji Musa Danjuma', version: 'v2.0', status: 'In force (LAR)', signedBy: 'Mr. Sadiq Danjuma (son, LAR)', signed: '22 Jul 2026', expires: '22 Jul 2027', lar: 'Mr. Sadiq Danjuma', purposes: 3, lastVerified: '19 Aug 2026 · Gate B' },
  { patient: 'ATN-0004', name: 'Mrs. Folake Adewale', version: 'v2.0', status: 'In force', signedBy: 'Patient', signed: '29 Jul 2026', expires: '29 Jul 2027', lar: null, purposes: 3, lastVerified: '26 Aug 2026 · 09:26 · Gate B' },
  { patient: 'ATN-0005', name: 'Dr. Emeka Obi', version: 'v2.0 → v2.1', status: 'Suspended', signedBy: 'Patient (capacity then retained)', signed: '19 Aug 2026', expires: '19 Aug 2027', lar: 'Mrs. Chioma Obi — pending signature', purposes: 2, lastVerified: '26 Aug 2026 · 13:58 · BLOCKED at Gate B' },
  { patient: 'ATN-0006', name: 'Mrs. Yetunde Balogun', version: '—', status: 'Not yet sought', signedBy: '—', signed: '—', expires: '—', lar: null, purposes: 0, lastVerified: 'Eligibility on hold' },
  { patient: 'ATN-0007', name: 'Mr. Ibrahim Sanni', version: '—', status: 'Not applicable', signedBy: '—', signed: '—', expires: '—', lar: null, purposes: 0, lastVerified: 'Screened out' },
  { patient: 'ATN-0008', name: 'Mrs. Comfort Eze', version: 'v2.0', status: 'In force', signedBy: 'Patient', signed: '15 Jul 2026', expires: '15 Jul 2027', lar: null, purposes: 3, lastVerified: '19 Aug 2026 · Gate B' },
];

export const consentPurposes = [
  { key: 'treatment', label: 'Treatment under ATN-DEM-ADDSB-2026-001', required: true, note: 'Withdrawal stops treatment. Records already created are retained under the research file.' },
  { key: 'research', label: 'Coded research data export to sponsor (KweHealth) under DPA', required: false, note: 'Separately withdrawable. Withdrawal stops future exports; already-exported coded data is governed by the DPA.' },
  { key: 'diary', label: 'Caregiver diary participation', required: false, note: 'Separately withdrawable without affecting treatment.' },
  { key: 'contact', label: 'Reminder and follow-up communication (SMS / WhatsApp / voice)', required: false, note: 'Channel-level preferences held by the patient, editable in the portal.' },
  { key: 'imaging', label: 'Retention of imaging and biomarker specimens beyond the study', required: false, note: 'Not sought in the current version. Would require a new consent version, not an amendment to a signed one.' },
];

// --- Audit trail (ALCOA+) ---------------------------------------------------
export const auditTrail = [
  { when: '26 Aug · 09:34:07', actor: 'N. Bello', action: 'SIGN', object: 'ATN-0004 · Session 4 · Gate C verifier signature', outcome: 'Recorded', ip: '10.20.4.18', device: 'Clinic tablet 03' },
  { when: '26 Aug · 09:29:18', actor: 'Dr. F. Sola', action: 'CLOSE_GATE', object: 'ATN-0004 · Session 4 · Gate B', outcome: 'Closed', ip: '10.20.4.02', device: 'Consult desktop' },
  { when: '26 Aug · 09:26:40', actor: 'System', action: 'VERIFY_CONSENT', object: 'ATN-0004 · consent v2.0', outcome: 'In force — gate check satisfied', ip: '—', device: 'Platform' },
  { when: '26 Aug · 09:12:04', actor: 'T. Ilesanmi', action: 'RELEASE_PRODUCT', object: 'RJV-70B-2608C, EXP-140B-2608B → ATN-0004 S4', outcome: 'Released', ip: '10.20.4.31', device: 'Pharmacy terminal' },
  { when: '26 Aug · 08:40:11', actor: 'T. Ilesanmi', action: 'THAW_START', object: 'Lot EXP-140B-2608B · 1 vial', outcome: 'Window opened — 12 h room temperature', ip: '10.20.4.31', device: 'Pharmacy terminal' },
  { when: '26 Aug · 08:02:55', actor: 'Dr. F. Sola', action: 'AMEND', object: 'ATN-0004 · Session 3 note', outcome: 'Correction recorded as a NEW versioned entry; original retained and visible', ip: '10.20.4.02', device: 'Consult desktop' },
  { when: '25 Aug · 17:44:02', actor: 'N. Aluko', action: 'ISSUE_CONSENT', object: 'ATN-0005 · LAR consent v2.1', outcome: 'Issued for signature', ip: '10.20.4.09', device: 'Coordinator desktop' },
  { when: '24 Aug · 16:02:44', actor: 'System', action: 'SUSPEND_CONSENT', object: 'ATN-0005 · consent v2.0', outcome: 'Suspended by capacity rule', ip: '—', device: 'Platform' },
  { when: '24 Aug · 05:34:12', actor: 'T. Ilesanmi', action: 'QUARANTINE', object: 'Lot EXP-140B-2608A · 9 vials', outcome: 'Quarantined', ip: '10.20.4.31', device: 'Pharmacy terminal' },
  { when: '24 Aug · 05:30:00', actor: 'System', action: 'RAISE_EXCURSION', object: 'Freezer 2 · −11.4 °C for 3 h 20 min', outcome: 'Excursion raised; lot release blocked', ip: '—', device: 'Platform' },
  { when: '22 Aug · 11:18:37', actor: 'Dr. F. Sola', action: 'BREAK_GLASS', object: 'ATN-0007 · full record (out-of-scope access)', outcome: 'Granted — reason recorded, 4 h expiry, coordinator notified, entry flagged for review', ip: '10.20.4.02', device: 'Consult desktop' },
  { when: '12 Aug · 12:04:31', actor: 'Dr. F. Sola', action: 'STOP_COURSE', object: 'ATN-0002 · Sessions 3–6', outcome: 'Suspended under §6.3', ip: '10.20.4.02', device: 'Consult desktop' },
];

export const auditPrinciples = [
  { letter: 'A', name: 'Attributable', how: 'Every entry carries the authenticated actor, their role at the time, device and network origin. System-asserted entries are attributed to the rule that fired, named.' },
  { letter: 'L', name: 'Legible', how: 'Entries are structured records rendered from the same vocabulary the protocol uses, not free text an auditor has to interpret.' },
  { letter: 'C', name: 'Contemporaneous', how: 'Server-side timestamps at the moment of the act. Late entry is permitted but is recorded as late, with the gap visible — that is how DEV-0012 was detected.' },
  { letter: 'O', name: 'Original', how: 'The first capture is retained permanently. Corrections append a new version referencing the original; the original is never overwritten or deleted.' },
  { letter: 'A', name: 'Accurate', how: 'System-asserted checks (consent state, cold chain, thaw window, lot identity) are read from the source of record rather than re-keyed by an operator.' },
  { letter: '+', name: 'Complete, consistent, enduring, available', how: 'Append-only storage, hash-chained sequence, in-region residency under NDPA 2023, and export in a standard interchange format on demand.' },
];

export const breakGlass = {
  policy: 'Break-glass grants a permitted role time-boxed access outside their normal scope for an emergency. It is never silent.',
  requires: ['Stated reason, selected from a controlled list plus free text', 'Automatic 4-hour expiry', 'Immediate notification to the Study Coordinator and PI', 'Entry flagged for mandatory post-hoc review'],
  holders: ['Principal Investigator'],
  lastUse: { when: '22 Aug 2026 · 11:18', who: 'Dr. F. Sola', what: 'ATN-0007 full record during out-of-hours hypertensive assessment', reason: 'Emergency clinical assessment — patient not on the accessing clinician’s active list', review: 'Reviewed and accepted 23 Aug by N. Aluko' },
};

export const dataGovernance = {
  residency: 'All personal and clinical data held in-region (Nigeria) under Atunse Health control.',
  lawfulBasis: 'Nigeria Data Protection Act 2023 — consent for treatment and, separately, for research export.',
  sponsorExport: {
    what: 'Coded research dataset — study identifiers only, no name, no contact detail, no national identifier, dates shifted to study day.',
    cadence: 'Weekly, Mondays 18:00 WAT',
    to: 'KweHealth, LLC',
    basis: 'Data Processing Agreement — a point the Background Brief flags as still to be agreed in the joint working session',
    lastRun: '10 Aug 2026 · 18:00 · 8 subjects · acknowledged',
    status: 'DPA parameters pending confirmation',
  },
  separation:
    'A strict internal boundary keeps private-care records and coded research data apart. The research view cannot resolve a coded subject back to a named patient; only the clinical view, under clinical role permissions, can.',
  retention: 'Clinical records retained per Nigerian health-records requirements; research records per the ethics approval; both under legal hold while the study is open.',
};
