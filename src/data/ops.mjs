// ---------------------------------------------------------------------------
// OPERATIONS — the non-clinical capability domains from the EMR proposal:
// §5 CRM/booking/Ogami, §6 billing & revenue, §7 people & institutions,
// and the intelligence layer's protocol analytics and learning loop.
// ---------------------------------------------------------------------------

// --- §5 CRM, enquiry & engagement -------------------------------------------
export const enquiries = [
  { ref: 'ENQ-0142', when: '26 Aug · 08:12', channel: 'WhatsApp (Ogami)', name: 'Mrs. Adaeze Uche', about: 'Mother, 78, diagnosed 2024 — asking about the dementia programme', stage: 'Qualified', owner: 'N. Aluko', next: 'Screening call booked Thu 27 Aug 10:00' },
  { ref: 'ENQ-0141', when: '25 Aug · 16:40', channel: 'Web (Ogami)', name: 'Mr. Segun Okonkwo', about: 'Father, 81 — cost and eligibility questions', stage: 'Information sent', owner: 'Ogami → N. Aluko', next: 'Patient Information Sheet sent; follow-up 28 Aug' },
  { ref: 'ENQ-0140', when: '25 Aug · 11:03', channel: 'Referral', name: 'Dr. A. Bamgbose (neurologist)', about: 'Referring a patient with mixed dementia', stage: 'Screening opened', owner: 'N. Aluko', next: 'Baseline panel booked 29 Aug' },
  { ref: 'ENQ-0138', when: '22 Aug · 09:55', channel: 'Phone', name: 'Mrs. Halima Sanni', about: 'Husband — became ATN-0007', stage: 'Closed — not eligible', owner: 'N. Aluko', next: 'Referred to standard hypertension pathway; re-screen invitation issued' },
  { ref: 'ENQ-0136', when: '20 Aug · 14:21', channel: 'WhatsApp (Ogami)', name: 'Mr. Kunle Balogun', about: 'Mother — became ATN-0006', stage: 'Screening — on hold', owner: 'N. Aluko', next: 'ENT review 28 Aug' },
];

export const engagementStats = [
  { label: 'Enquiries this month', value: '34', sub: '19 web/WhatsApp via Ogami, 9 phone, 6 referral' },
  { label: 'Ogami handled without staff', value: '61%', sub: 'Information, eligibility questions, appointment detail' },
  { label: 'Enquiry → screening', value: '56%', sub: '19 of 34' },
  { label: 'Median first response', value: '4 min', sub: 'Was 3 h 20 min before Ogami' },
  { label: 'No-show rate', value: '4%', sub: '2 of 47 booked visits; both rebooked' },
  { label: 'Reminder delivery', value: '98%', sub: 'SMS + WhatsApp, consent-aware' },
];

// Superseded by the live OgaChat client (see src/data/ogami.mjs). Kept as the
// reference transcript the profile was written from.
const ogamiThreadReference = [
  { from: 'patient', name: 'Mrs. Adaeze Uche', text: 'Good morning. My mother is 78 and was diagnosed with dementia in 2024. Is she able to join the Atunse programme?' },
  { from: 'ogami', text: 'Good morning. Thank you for reaching out about your mother. The ADDSB programme is for adults with documented dementia or progressive cognitive decline, where a caregiver is available to support monitoring and follow-up, and where the supervising physician determines the regimen is clinically reasonable. Eligibility is decided by our physician after a screening assessment — I cannot decide it here, but I can book that assessment for you. Would you like me to?' },
  { from: 'patient', name: 'Mrs. Adaeze Uche', text: 'Yes please. What does the screening involve?' },
  { from: 'ogami', text: 'The screening visit covers a review of her diagnosis and medications, a physical and neurological examination, cognitive and functional assessments, a nasal examination (one of the two routes is intranasal), and baseline blood and biomarker tests. It takes about two hours. A caregiver should attend. I have held Thursday 27 August at 10:00 — shall I confirm it?' },
  { from: 'patient', name: 'Mrs. Adaeze Uche', text: 'Please confirm. And how much does the treatment cost?' },
  { from: 'ogami', text: 'I have confirmed Thursday 27 August at 10:00 and sent the details to this number. On cost: the full six-session course and its follow-up schedule is quoted at the screening visit once eligibility is established, because it depends on whether optional hormone optimisation is included. I am connecting you to Ngozi Aluko, our Study Coordinator, who can give you the current schedule of fees directly.' },
  { from: 'system', text: 'Escalated to N. Aluko (Study Coordinator) · ENQ-0142 created · Screening appointment ATN-APP-0231 booked · Patient Information Sheet queued for send' },
];

// Superseded by ogami.mjs, which mirrors the boundaries stored on the OGAMI
// client record rather than restating them locally.
const ogamiBoundariesReference = [
  'Answers programme, eligibility-criteria and logistics questions from the approved Patient Information Sheet and protocol §5.1 — never from open-web content.',
  'Books, reschedules and cancels against real availability, and writes the appointment into the same schedule staff use.',
  'Escalates to a named human for anything involving clinical judgement, eligibility determination, fees, or a distressed caller.',
  'Never states or implies efficacy. The regimen is investigational and the protocol says so; Ogami repeats that framing.',
  'Never records a clinical assessment, a consent, or an adverse event. It can tell a caller how to report one and raise the alert; the record is made by a clinician.',
  'Every conversation is written to the CRM against the patient or prospect, and is visible in the record.',
];

// --- §6 Billing & revenue ---------------------------------------------------
export const serviceCatalogue = [
  { code: 'ADDSB-SCR', name: 'Screening & baseline assessment', price: 285000, note: 'Examination, cognitive & functional battery, nasal assessment, baseline labs and biomarker panel' },
  { code: 'ADDSB-SESSION', name: 'Treatment session (dual route)', price: 1450000, note: 'Per session. Includes both products, device use, monitoring and discharge' },
  { code: 'ADDSB-COURSE', name: 'Six-session course', price: 8100000, note: 'Course rate — the six sessions with the post-course follow-up schedule included' },
  { code: 'ADDSB-FU', name: 'Post-course follow-up visit', price: 165000, note: '4, 8 and 12-week visits; 6 and 12-month reviews' },
  { code: 'ADDSB-HORM', name: 'Hormone optimisation workup', price: 240000, note: 'Optional. Panel, decision worksheet and monitoring interval' },
  { code: 'ADDSB-BIO', name: 'Biomarker panel (repeat)', price: 195000, note: 'p-tau, NfL, GFAP, inflammatory markers' },
];

export const invoices = [
  { no: 'ATN-INV-0231', patient: 'ATN-0004', name: 'Mrs. Folake Adewale', raisedFrom: 'Session 3 · 19 Aug', items: 'ADDSB-SESSION', amount: 1450000, paid: 1450000, status: 'Paid', method: 'Transfer', when: '20 Aug' },
  { no: 'ATN-INV-0238', patient: 'ATN-0004', name: 'Mrs. Folake Adewale', raisedFrom: 'Session 4 · 26 Aug', items: 'ADDSB-SESSION', amount: 1450000, paid: 0, status: 'Pending — charge raised on gate F closure', method: '—', when: '—' },
  { no: 'ATN-INV-0229', patient: 'ATN-0008', name: 'Mrs. Comfort Eze', raisedFrom: 'Course (6 sessions)', items: 'ADDSB-COURSE', amount: 8100000, paid: 5400000, status: 'Part-paid', method: 'Transfer ×3', when: 'Instalment 3 of 4 · next 01 Sep' },
  { no: 'ATN-INV-0212', patient: 'ATN-0001', name: 'Chief Adebayo Ogunlesi', raisedFrom: 'Course + hormone workup', items: 'ADDSB-COURSE, ADDSB-HORM', amount: 8340000, paid: 8340000, status: 'Paid', method: 'Transfer', when: '18 Jul' },
  { no: 'ATN-INV-0224', patient: 'ATN-0002', name: 'Mrs. Grace Nwachukwu', raisedFrom: 'Sessions 1–2 only', items: 'ADDSB-SESSION ×2', amount: 2900000, paid: 2900000, status: 'Paid — course credit pending', method: 'Transfer', when: '14 Aug', note: 'Course halted at Session 2 under §6.3. Unused course balance held as credit pending the PI and ethics determination; no charge raised for sessions not delivered.' },
  { no: 'ATN-INV-0236', patient: 'ATN-0003', name: 'Alhaji Musa Danjuma', raisedFrom: 'Session 3 · 26 Aug', items: 'ADDSB-SESSION', amount: 1450000, paid: 0, status: 'Not raised — session held', method: '—', when: '—', note: 'No charge is raised for a session that did not pass Gate A. Charge capture is bound to delivered clinical activity, so a held session cannot leak into revenue.' },
  { no: 'ATN-INV-0219', patient: 'ATN-0006', name: 'Mrs. Yetunde Balogun', raisedFrom: 'Screening · 22 Aug', items: 'ADDSB-SCR', amount: 285000, paid: 285000, status: 'Paid', method: 'Card', when: '22 Aug' },
  { no: 'ATN-INV-0217', patient: 'ATN-0007', name: 'Mr. Ibrahim Sanni', raisedFrom: 'Screening · 20 Aug', items: 'ADDSB-SCR', amount: 285000, paid: 285000, status: 'Paid', method: 'Cash', when: '20 Aug' },
];

export const revenue = {
  monthToDate: 12_920_000,
  collected: 18_660_000,
  outstanding: 2_700_000,
  creditHeld: 5_800_000,
  unbilledDelivered: 0,
  note: 'Unbilled delivered activity is zero because a charge is raised by the engine at gate closure, from the session that actually completed — not entered by hand afterwards.',
  ageing: [
    { bucket: 'Current', amount: 2_700_000 },
    { bucket: '30 days', amount: 0 },
    { bucket: '60 days', amount: 0 },
    { bucket: '90+ days', amount: 0 },
  ],
};

// --- §7 People & institutions -----------------------------------------------
export const personnel = [
  { name: 'Dr. Sola', role: 'Principal Investigator / Supervising Physician', dept: 'ADDSB Programme', reg: 'MDCN/R/48812', regExpiry: '2027-03-31', regStatus: 'Valid', gcp: 'ICH E6(R3) — 14 Feb 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 30 Jun 2026' },
  { name: 'Dr. Adesanya', role: 'Sub-Investigator / Attending Physician', dept: 'ADDSB Programme', reg: 'MDCN/R/51207', regExpiry: '2027-06-30', regStatus: 'Valid', gcp: 'ICH E6(R3) — 03 Mar 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 02 Jul 2026 · delegation log signed by PI' },
  { name: 'Nurse Amaka Bello', role: 'Clinic Nurse', dept: 'ADDSB Programme', reg: 'NMCN/RN/220441', regExpiry: '2026-11-30', regStatus: 'Expiring in 96 days', gcp: 'ICH E6(R3) — 20 Feb 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 02 Jul 2026' },
  { name: 'Tunde Ilesanmi', role: 'Pharmacist / Product Custodian', dept: 'Pharmacy', reg: 'PCN/PH/19023', regExpiry: '2027-01-31', regStatus: 'Valid', gcp: 'ICH E6(R3) — 14 Feb 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 30 Jun 2026 · GDP cold chain 12 Jul 2026' },
  { name: 'Chidi Nwosu', role: 'ViaNase™ Device Operator', dept: 'ADDSB Programme', reg: '—', regExpiry: '—', regStatus: 'N/A', gcp: 'ICH E6(R3) — 06 Mar 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 02 Jul 2026 · ViaNase IFU 4.2 certified 08 Jul 2026' },
  { name: 'Ngozi Aluko', role: 'Study Coordinator', dept: 'Clinical Operations', reg: '—', regExpiry: '—', regStatus: 'N/A', gcp: 'ICH E6(R3) — 14 Feb 2026', gcpStatus: 'Valid', protocolTrained: 'v1.0 · 30 Jun 2026' },
  { name: 'Adaora Eze', role: 'Facility Administrator', dept: 'Administration', reg: '—', regExpiry: '—', regStatus: 'N/A', gcp: 'Not required for role', gcpStatus: 'N/A', protocolTrained: 'Awareness only — no clinical record access' },
  { name: 'Dr. Ifeanyi Okeke', role: 'Consultant Neurologist (sessional)', dept: 'Referral network', reg: 'MDCN/R/39114', regExpiry: '2026-09-15', regStatus: 'Expiring in 20 days', gcp: 'ICH E6(R3) — 11 Jan 2025', gcpStatus: 'Renewal due', protocolTrained: 'v1.0 · 15 Jul 2026' },
];

export const institutions = [
  { name: 'KweHealth, LLC', type: 'Product sponsor', relationship: 'ExoPure™ 140B and Rejuvenate Serum™ supply; Certificates of Analysis; coded research data recipient', status: 'Active', agreement: 'Supply agreement executed. Data Processing Agreement — parameters pending confirmation.', flag: 'DPA pending' },
  { name: 'Kurve Therapeutics', type: 'Device manufacturer', relationship: 'ViaNase™ Controlled Particle Dispersion® devices, IFU and servicing', status: 'Active', agreement: 'IFU rev. 4.2 filed in the study master file', flag: null },
  { name: 'National Health Research Ethics Committee', type: 'Ethics oversight', relationship: 'Protocol approval, SAE reporting, amendment review', status: 'Active', agreement: 'NHREC/01/01/2026-ATN-04 · valid to 28 Jun 2027', flag: null },
  { name: 'Lagos State Reference Laboratory', type: 'Laboratory partner', relationship: 'Safety labs, inflammatory markers, biomarker panels', status: 'Active', agreement: 'Service agreement; results returned over HL7 FHIR', flag: null },
  { name: 'Reddington Hospital, Victoria Island', type: 'Emergency referral pathway', relationship: 'Defined emergency referral destination per §4 required resources', status: 'Active', agreement: 'Referral pathway agreed; used once (SAE-0002, 12 Aug)', flag: null },
  { name: 'Dr. A. Bamgbose Neurology', type: 'Referring practice', relationship: 'Patient referrals into screening', status: 'Active', agreement: 'Referral relationship — 4 referrals to date', flag: null },
];

// --- Intelligence layer: protocol analytics ---------------------------------
export const adherence = {
  overall: 96.4,
  byGate: [
    { gate: 'A', name: 'Readiness', executions: 22, onProtocol: 21, blocked: 1, rate: 95.5, note: '1 held — cold-chain excursion (correct behaviour, not a failure)' },
    { gate: 'B', name: 'Check-in', executions: 21, onProtocol: 20, blocked: 1, rate: 95.2, note: '1 held — consent suspended (correct behaviour)' },
    { gate: 'C', name: 'Two-person timeout', executions: 20, onProtocol: 20, blocked: 0, rate: 100, note: 'No timeout has ever been closed by a single user' },
    { gate: 'D', name: 'IV administration', executions: 20, onProtocol: 20, blocked: 0, rate: 100, note: 'All within the 10–15 min push window; no bolus recorded' },
    { gate: 'E', name: 'Intranasal', executions: 19, onProtocol: 19, blocked: 0, rate: 100, note: '1 not reached — session stopped at D (SAE-0002)' },
    { gate: 'F', name: 'Monitoring & discharge', executions: 20, onProtocol: 19, blocked: 0, rate: 95.0, note: '1 late timepoint — DEV-0011' },
  ],
  timepointPunctuality: [
    { tp: '15 min', onTime: 20, late: 0, medianDrift: '+1 min' },
    { tp: '30 min', onTime: 20, late: 0, medianDrift: '+2 min' },
    { tp: '60 min', onTime: 20, late: 0, medianDrift: '+2 min' },
    { tp: '120 min', onTime: 19, late: 1, medianDrift: '+4 min' },
  ],
  ivDuration: { target: '10–15 min', median: '13 min', min: '11 min', max: '15 min', outOfRange: 0 },
  documentation: { formsRequired: 132, formsFiled: 129, rate: 97.7, outstanding: ['ATN-0003 Appendix E for the held session', 'ATN-0005 Appendix H interval review', 'ATN-0002 Appendix D outcome narrative — awaiting PI review close-out'] },
};

export const cohortOutcomes = {
  note: 'Exploratory and descriptive only. This is an open-label early clinical study of an investigational regimen; the platform reports what was measured and never characterises it as evidence of efficacy.',
  n: 8,
  completedCourse: 1,
  onCourse: 3,
  screening: 1,
  halted: 1,
  excluded: 1,
  blocked: 1,
  measures: [
    { measure: 'MMSE', baselineMean: 19.4, latestMean: 20.3, n: 5, direction: 'up', caveat: 'n=5 with a paired follow-up value; no control group; open label.' },
    { measure: 'CDR-SB', baselineMean: 8.7, latestMean: 8.2, n: 5, direction: 'down', caveat: 'Lower is better. Within test–retest variability at this n.' },
    { measure: 'ADCS-ADL', baselineMean: 45.8, latestMean: 49.8, n: 5, direction: 'up', caveat: 'Caregiver-reported; unblinded.' },
    { measure: 'hs-CRP', baselineMean: 3.9, latestMean: 3.1, n: 6, direction: 'down', caveat: 'One patient (ATN-0002) had an intercurrent event; excluded from this mean.' },
    { measure: 'NfL', baselineMean: 40.5, latestMean: 39.3, n: 4, direction: 'flat', caveat: 'No meaningful change; reported for completeness.' },
  ],
};

// --- The continuous learning loop (EMR Proposal §4, Figure 3) ---------------
export const learningLoop = {
  stages: [
    { key: 'protocol', label: 'Protocol', detail: 'ATN-DEM-ADDSB-2026-001 v1.0, effective 29 Jun 2026, executable as 6 gates and 42 blocking checks.' },
    { key: 'execution', label: 'Execution', detail: '22 treatment days run against it. Every check, signature, timestamp and deviation captured at the point of care.' },
    { key: 'data', label: 'Data', detail: 'Structured — not free text. Gate closure times, timepoint drift, AE onset-to-record intervals, deviation reason codes.' },
    { key: 'ai', label: 'AI analysis', detail: 'Surfaces patterns and exceptions across executions. Proposes; never changes anything.' },
    { key: 'review', label: 'Human review', detail: 'PI and clinical governance consider the proposal. Clinical authority stays with Atunse Health.' },
    { key: 'improvement', label: 'Improvement', detail: 'An approved change becomes a new protocol version with effective dating and rollback — not an edit to the version already in use.' },
  ],
  insights: [
    {
      id: 'INS-004',
      raised: '21 Aug 2026',
      confidence: 'Moderate',
      finding: 'Three of the five recorded post-dose dizziness events occurred at the 30-minute timepoint of Session 1 specifically (ATN-0004 S1, ATN-0004 S3, ATN-0001 S1). All mild, all resolved without intervention by the 60-minute observation.',
      basis: '22 treatment days, 5 AEs of this type, clustered by session number and timepoint.',
      proposal: 'Add a mandatory 24-hour caregiver telephone check after Session 1 only, and add a standing-BP measurement to the 30-minute timepoint for Session 1.',
      status: 'Accepted → drafted as protocol v1.1',
      reviewer: 'Dr. Sola',
      reviewed: '24 Aug 2026',
      outcome: 'PI and Clinical Director approved. Medical Director and Ethics review pending. Not in force — v1.0 remains the effective version until v1.1 is approved and effective-dated.',
    },
    {
      id: 'INS-003',
      raised: '14 Aug 2026',
      confidence: 'High',
      finding: 'The single late 120-minute observation (DEV-0011) coincided with two chairs running concurrently with one monitoring nurse rostered. All 19 on-time observations occurred when chairs did not overlap.',
      basis: '20 completed monitoring gates, 1 deviation, roster data joined to session times.',
      proposal: 'Operational, not protocol: roster a second monitoring nurse whenever two chairs are scheduled to overlap.',
      status: 'Accepted → operational change, no protocol amendment',
      reviewer: 'Dr. Sola',
      reviewed: '15 Aug 2026',
      outcome: 'Implemented in the roster from 17 Aug. No recurrence since. Recorded as the corrective action on DEV-0011.',
    },
    {
      id: 'INS-002',
      raised: '06 Aug 2026',
      confidence: 'Low',
      finding: 'Median IV push duration trended toward the lower bound of the 10–15 minute window (11–12 min) for one operator relative to others (14–15 min).',
      basis: '20 IV administrations across 3 operators.',
      proposal: 'Consider narrowing the permitted push window.',
      status: 'Rejected by clinical review',
      reviewer: 'Dr. Sola',
      reviewed: '08 Aug 2026',
      outcome:
        'Rejected. All durations were inside the protocol window, no reactions correlated with the shorter durations, and n is far too small to justify narrowing a safety parameter. Recorded with the reasoning so the same signal is not re-raised — a rejected insight is part of the evidence trail, not a deleted one.',
    },
    {
      id: 'INS-001',
      raised: '29 Jul 2026',
      confidence: 'High',
      finding: 'Median time from AE onset to record was 13 minutes; from SAE onset to regulatory transmission, 2 h 33 min. Both well inside the required windows.',
      basis: '5 AEs, 1 SAE, 1 PQC.',
      proposal: 'No change. Report as a quality metric to the governance board.',
      status: 'Accepted → reporting only',
      reviewer: 'Dr. Sola',
      reviewed: '30 Jul 2026',
      outcome: 'Added to the standing quality-metric pack.',
    },
  ],
  guardrail:
    'AI surfaces patterns and exceptions; human clinical review authorises change. AI never overrides an authorised protocol, and cannot deploy, edit or effective-date a protocol version. Clinical authority remains with Atunse Health. (EMR Proposal §4, Figure 3.)',
};

// --- Mobile & offline (§9) --------------------------------------------------
export const offlineScope = {
  principle:
    'Offline is applied selectively, because not every clinical operation should permit unrestricted offline access. The rule the platform applies: capture may go offline; authority may not.',
  allowed: [
    { what: 'Vital-signs and observation capture (Appendix C)', why: 'Pure capture. Queued locally, encrypted, synchronised with server timestamps preserved and the offline interval visible.' },
    { what: 'Caregiver diary entries (Appendix I)', why: 'Written at home, often without connectivity. Nothing depends on real-time validation.' },
    { what: 'Reading an already-downloaded patient record for a scheduled patient', why: 'Read-only, scoped to today’s list, expires at end of shift.' },
    { what: 'Drafting an AE narrative (Appendix D)', why: 'Draft only. The clock starts at recorded onset time, not at sync, so going offline cannot hide lateness.' },
  ],
  refused: [
    { what: 'Closing the two-person timeout (Gate C)', why: 'Requires two distinct authenticated identities verified server-side. An offline device cannot prove the second person is who they claim to be.' },
    { what: 'Releasing product to a session (Gate A)', why: 'Depends on live cold-chain and quarantine state. A stale offline copy could release a lot quarantined minutes earlier — exactly the ATN-0003 case.' },
    { what: 'Physician authorisation and stopping decisions', why: 'Authority acts must be attributable and contemporaneous at the server. They are the acts an auditor scrutinises most.' },
    { what: 'Consent capture or withdrawal', why: 'Consent is a live state with legal effect. It is never resolved against a cached copy.' },
  ],
  syncStatus: { device: 'Clinic tablet 03', lastSync: '26 Aug · 09:36', queued: 0, conflicts: 0, cachedPatients: 5, cacheExpires: 'End of shift · 18:00' },
};

// --- Migration (§3 existing patient data integration) ------------------------
export const migration = {
  status: 'Scoped — awaiting the existing-data landscape review flagged in the Background Brief',
  sources: [
    { source: 'Paper case files — ADDSB programme', records: '8 patients · 22 treatment days', state: 'Mapped', note: 'Every field in Appendices A–I has a target in the structured model. This is the migration already proven by the demo cohort.' },
    { source: 'Existing clinic patient list (spreadsheet)', records: '≈ 1,400 demographic rows', state: 'Awaiting sample', note: 'Field mapping and data-quality rules to be agreed. Duplicate detection and safe merge run before load.' },
    { source: 'Legacy appointment book', records: 'Unknown', state: 'Awaiting description', note: 'The Background Brief lists this as a point to align on: “understand what patient and clinical records exist today, and in what form, so migration is scoped honestly rather than assumed.”' },
    { source: 'Laboratory results archive', records: 'Unknown', state: 'Awaiting description', note: 'Target is HL7 FHIR ingress rather than a one-off import, so the same interface serves the migration and the ongoing feed.' },
  ],
  rules: ['Agreed source formats and field mapping before any load', 'Data-quality rules applied and violations reported, not silently dropped', 'Duplicate detection with safe record merge', 'Validation and reconciliation before go-live', 'No patient starts again — historical records land in the longitudinal record'],
};
