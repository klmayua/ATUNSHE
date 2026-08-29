// ---------------------------------------------------------------------------
// THE PROTOCOL ENGINE — machine definition of ATN-DEM-ADDSB-2026-001 v1.0
//
// EMR Proposal §4: "the engine turns written protocols into structured,
// versioned, executable workflows that guide care at the point of delivery,
// capture what actually happened, and feed a learning loop."
//
// This file is that structure. Every gate, check, blocker, form binding,
// signature requirement and stopping rule below is lifted from the source
// document and carries a `ref` back to the clause it enforces. Nothing here
// is decorative: the runner in /session reads this definition to decide what
// a user may do next, and the analytics in /learning aggregate against it.
//
// A check has:
//   key        stable id, referenced by session state
//   label      what the operator sees
//   ref        the protocol clause it enforces
//   role       which Table-4 role may satisfy it (null = any clinical role)
//   blocking   true  -> the gate cannot close until satisfied
//   evidence   what the system records when it is satisfied
//   source     'system' checks are asserted by the platform (cold chain, consent
//              state, thaw window) rather than ticked by a human. This is the
//              difference between a paper checklist and an executable protocol.
// ---------------------------------------------------------------------------

export const PROTOCOL_ID = 'ATN-DEM-ADDSB-2026-001';

export const protocolMeta = {
  id: PROTOCOL_ID,
  title:
    'Standardized Clinical Protocol for Combined Intranasal ExoPure™ 140B (via ViaNase™) and Intravenous Rejuvenate Serum™ in Adults with Dementia, with Optional Individualized Hormone Optimization',
  short: 'Dementia ADDSB — Dual Route',
  version: '1.0',
  status: 'Effective',
  effective: '2026-06-29',
  review: '2027-06-29',
  design:
    'Open-label, physician-supervised, biomarker-informed early clinical study of an investigational dual-route extracellular-vesicle biologic regimen',
  sponsor: 'KweHealth, LLC',
  site: 'Atunse Healthcare Ltd.',
  pi: 'Dr. Folasade Sola',
  indication: 'Adults with documented dementia or progressive cognitive decline',
  regimen:
    'Six weekly sessions. Each session: IV Rejuvenate Serum™ 1 mL (70B EV) by slow push, then intranasal ExoPure™ 140B 3 mL (140B EV) via ViaNase™. Fixed dose, no escalation.',
  courseTotal: '6 × Rejuvenate Serum™ (1 mL) + 6 × ExoPure™ 140B (3 mL) per patient',
  owner: 'Clinical Operations',
  tags: ['Clinical', 'Protocol', 'Dementia', 'ExtracellularVesicles', 'ADDSB', 'Neurology'],
};

// --- Products & device under protocol control (§4 Required Equipment) -------
export const products = [
  {
    key: 'exopure',
    name: 'ExoPure™ 140B',
    route: 'Intranasal',
    presentation: '3 mL vial',
    strength: '≥140 billion EV per 3 mL vial',
    storage: '≤ −20 °C',
    thawWindow: 'Room temperature 12 h / 4 °C 48 h after thaw',
    sponsor: 'KweHealth, LLC (HydroKarma)',
    device: 'ViaNase™ Controlled Particle Dispersion®',
  },
  {
    key: 'rejuvenate',
    name: 'Rejuvenate Serum™',
    route: 'Intravenous',
    presentation: '1 mL vial',
    strength: '≥70 billion EV/mL, formulated in 0.9 % saline',
    storage: '≤ −20 °C',
    thawWindow: 'Room temperature 12 h / 4 °C 48 h after thaw',
    sponsor: 'KweHealth, LLC (HydroKarma)',
    device: null,
  },
];

// --- Course structure (§5.2 Table 5) ----------------------------------------
export const course = Array.from({ length: 6 }, (_, i) => ({
  session: i + 1,
  week: `Week ${i + 1}`,
  routes: 'IV + intranasal',
  iv: 'Rejuvenate Serum™ 1 mL (70B EV)',
  intranasal: 'ExoPure™ 140B 3 mL (140B EV)',
  note: i === 0 ? 'Fixed dose. No escalation across the course.' : 'Same as Session 1',
}));

// --- Follow-up schedule (§5.3 Table 6) --------------------------------------
export const followUpSchedule = [
  { key: 'weekly', when: 'Weeks 1–6 (each session)', actions: 'Pre-session physician safety review; vitals; AE check; caregiver report' },
  { key: 'eoc', when: 'End of course (Week 6)', actions: 'Full safety labs; hs-CRP/ESR; cognitive and functional reassessment; global impressions' },
  { key: 'p4', when: '4 weeks post-course', actions: 'Symptoms, AEs, safety labs, inflammatory markers, caregiver report' },
  { key: 'p8', when: '8 weeks post-course', actions: 'Cognitive and functional reassessment; hormone follow-up where applicable' },
  { key: 'p12', when: '12 weeks post-course', actions: 'Cognitive and functional assessment; biomarker and inflammatory panels; physician, caregiver and patient global impressions' },
  { key: 'p6m', when: '6 months post-course', actions: 'Durability and safety review; biomarkers' },
  { key: 'p12m', when: '12 months post-course', actions: 'Durability and safety review; biomarkers' },
];

// --- Eligibility (§5.1 / Appendix A) ----------------------------------------
export const inclusionCriteria = [
  'Adult with documented dementia or progressive cognitive decline',
  'Condition serious or disabling',
  'Limited benefit from / limited access to standard care',
  'Physician determines regimen clinically reasonable',
  'Informed consent obtainable (patient or LAR)',
  'Caregiver available for monitoring / follow-up',
  'Able to complete baseline and follow-up assessments',
  'Able to undergo intranasal and intravenous administration',
];

export const exclusionCriteria = [
  'Active systemic infection or fever',
  'Unstable cardiovascular disease',
  'Recent stroke / TIA (unless physician judges risk acceptable)',
  'Recent or uncontrolled seizures',
  'Severe uncontrolled hypertension',
  'Severe renal or hepatic failure',
  'Active malignancy (unless physician-reviewed)',
  'Severe coagulopathy or bleeding disorder',
  'Known hypersensitivity to product components',
  'Active nasal infection / obstruction / epistaxis / recent nasal surgery / anatomy precluding intranasal delivery',
  'Severe agitation precluding safe administration',
  'Pregnancy (where biologically applicable)',
  'Any condition making IV or intranasal administration unsafe',
  'Hormone-specific contraindication (if hormone optimisation considered)',
];

// --- Baseline panels (§5.1) --------------------------------------------------
export const baselinePanels = [
  { group: 'Haematology & chemistry', items: ['CBC with differential', 'Comprehensive metabolic panel', 'Liver function tests', 'Creatinine & eGFR', 'Fasting glucose & HbA1c', 'Lipid panel', 'Urinalysis', 'Coagulation studies where indicated'] },
  { group: 'Inflammatory', items: ['ESR', 'CRP / hs-CRP', 'IL-6', 'TNF-α'] },
  { group: 'Reversible-cause screen', items: ['Vitamin B12', 'Folate', 'TSH', 'Free T4', 'Vitamin D', 'Ferritin', 'Magnesium'] },
  { group: 'Neurodegenerative biomarkers', items: ['Plasma p-tau', 'Neurofilament light chain (NfL)', 'GFAP'] },
  { group: 'Cognitive & functional', items: ['MMSE', 'MoCA', 'CDR / CDR-SB', 'ADCS-ADL', 'NPI-Q', 'PHQ-9 or GDS', 'Sleep assessment'] },
];

// ---------------------------------------------------------------------------
// TREATMENT-DAY GATES (§5.2 A–E, §5.3 monitoring)
// The executable core. A gate closes only when every blocking check is
// satisfied by a permitted role, with the required signatures recorded.
// ---------------------------------------------------------------------------
export const gates = [
  {
    key: 'A',
    name: 'Before arrival — readiness',
    ref: '§5.2 A',
    appendix: 'B',
    owner: 'pharmacist',
    summary:
      'Nothing may be scheduled to a chair until authorisations, product, cold chain, device and emergency provision are all verified. This gate is owned by the Product Custodian, not the clinician.',
    signatures: [],
    checks: [
      { key: 'a_auth', label: 'Institutional, ethics and regulatory authorisations on file', ref: '§5.2 A', role: 'coordinator', blocking: true, source: 'system', evidence: 'Regulatory file reference + expiry' },
      { key: 'a_indate', label: 'Products in-date; Certificates of Analysis reviewed', ref: '§5.2 A', role: 'pharmacist', blocking: true, source: 'system', evidence: 'Lot no., expiry, CoA document id' },
      { key: 'a_coldchain', label: 'Cold chain intact (≤ −20 °C, unbroken)', ref: '§5.2 A · Appendix E', role: 'pharmacist', blocking: true, source: 'system', evidence: 'Continuous temperature log for the lot' },
      { key: 'a_thaw', label: 'Within post-thaw stability window', ref: '§6.2 · Appendix E', role: 'pharmacist', blocking: true, source: 'system', evidence: 'Thaw timestamp + remaining window' },
      { key: 'a_device', label: 'ViaNase™ device ready; performance check passed', ref: '§5.2 A · Appendix F', role: 'operator', blocking: true, source: 'human', evidence: 'Device serial, IFU version, check result' },
      { key: 'a_kit', label: 'Emergency / anaphylaxis kit present and in-date', ref: '§5.2 A · §6.2', role: 'nurse', blocking: true, source: 'human', evidence: 'Kit id, contents check, expiry' },
      { key: 'a_forms', label: 'Forms and logs prepared (Appendices B, C, E, F)', ref: '§5.2 A', role: 'coordinator', blocking: false, source: 'system', evidence: 'Form instances created against this session' },
    ],
  },
  {
    key: 'B',
    name: 'Check-in',
    ref: '§5.2 B',
    appendix: 'H',
    owner: 'nurse',
    summary:
      'Identity, live consent state, caregiver presence, interval symptoms and baseline observations. Consent is checked as an active state, not as a filed document.',
    signatures: [],
    checks: [
      { key: 'b_identity', label: 'Patient identity confirmed (two identifiers)', ref: '§5.2 B', role: 'nurse', blocking: true, source: 'human', evidence: 'Identifiers used' },
      { key: 'b_consent', label: 'Consent current, in force, not withdrawn or expired', ref: '§5.2 B · Trust layer', role: 'coordinator', blocking: true, source: 'system', evidence: 'Consent version, status, LAR where applicable' },
      { key: 'b_caregiver', label: 'Caregiver present', ref: '§5.2 B', role: 'nurse', blocking: true, source: 'human', evidence: 'Caregiver name and relationship' },
      { key: 'b_interval', label: 'Interval symptoms and medication changes reviewed', ref: '§5.2 B · §5.3', role: 'nurse', blocking: true, source: 'human', evidence: 'Interval review note; AE form raised if any' },
      { key: 'b_vitals', label: 'Baseline (pre-dose) vital signs recorded', ref: '§5.2 B · Appendix C', role: 'nurse', blocking: true, source: 'human', evidence: 'BP, HR, RR, SpO₂, Temp, neuro' },
      { key: 'b_exam', label: 'Focused physical and neurological examination', ref: '§5.2 B', role: 'pi', blocking: true, source: 'human', evidence: 'Examination note' },
      { key: 'b_safetyreview', label: 'Pre-session physician safety review — no stopping criterion present', ref: '§5.2 · §6.3', role: 'pi', blocking: true, source: 'human', evidence: 'Physician determination, timestamped' },
    ],
  },
  {
    key: 'C',
    name: 'Pre-dose timeout — two-person verification',
    ref: '§5.2 C',
    appendix: 'B',
    owner: 'pi',
    twoPerson: true,
    summary:
      'The hard gate. Seven verifications, each confirmed by two different signed-in users, then physician authorisation recorded. The platform refuses a timeout where verifier and witness are the same person.',
    signatures: [
      { key: 'c_verifier', label: 'Verified by', requires: 'canWitness' },
      { key: 'c_witness', label: 'Independently witnessed by', requires: 'canWitness', mustDifferFrom: 'c_verifier' },
      { key: 'c_authoriser', label: 'Physician authorisation', requires: 'canAuthorise' },
    ],
    checks: [
      { key: 'c_patient', label: 'Correct patient', ref: '§5.2 C', role: null, blocking: true, source: 'human', evidence: 'Two-person initials' },
      { key: 'c_product', label: 'Correct product(s)', ref: '§5.2 C', role: null, blocking: true, source: 'human', evidence: 'Two-person initials' },
      { key: 'c_route', label: 'Correct route(s) — IV then intranasal', ref: '§5.2 C', role: null, blocking: true, source: 'human', evidence: 'Two-person initials' },
      { key: 'c_dose', label: 'Correct dose / volume', ref: '§5.2 C', role: null, blocking: true, source: 'human', evidence: 'Two-person initials' },
      { key: 'c_device', label: 'Correct device', ref: '§5.2 C', role: null, blocking: true, source: 'human', evidence: 'Two-person initials' },
      { key: 'c_lot', label: 'Correct lot & expiry', ref: '§5.2 C', role: null, blocking: true, source: 'system', evidence: 'Lot scanned against released inventory' },
      { key: 'c_docs', label: 'Documentation complete', ref: '§5.2 C', role: null, blocking: true, source: 'system', evidence: 'Open required forms = 0' },
    ],
  },
  {
    key: 'D',
    name: 'Intravenous administration — Rejuvenate Serum™',
    ref: '§5.2 D',
    appendix: 'B',
    owner: 'nurse',
    summary:
      'One 1 mL vial (70B EV) by slow IV push in 0.5 mL increments, pausing 30–60 s between increments, over 10–15 minutes. Not a bolus. Continuous infusion-reaction watch.',
    signatures: [{ key: 'd_operator', label: 'Administering nurse', requires: 'canWitness' }],
    checks: [
      { key: 'd_visual', label: 'Visual inspection — clear, no aggregation', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'human', evidence: 'Pass/fail + operator' },
      { key: 'd_lotverify', label: 'Identity, lot, route, dose and diluent (0.9 % saline) verified', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'system', evidence: 'Lot match against timeout record' },
      { key: 'd_access', label: 'IV access established and confirmed patent', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'human', evidence: 'Cannula site, gauge' },
      { key: 'd_increments', label: 'Administered in 0.5 mL increments with 30–60 s pauses', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'system', evidence: 'Per-increment timestamps' },
      { key: 'd_notbolus', label: 'Not given as bolus — total push 10–15 min', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'system', evidence: 'Start/stop times, computed duration' },
      { key: 'd_watch', label: 'Continuous infusion-reaction monitoring maintained', ref: '§5.2 D · §6.3', role: 'nurse', blocking: true, source: 'human', evidence: 'Reaction-watch panel, intra-dose vitals' },
      { key: 'd_flush', label: 'Line flushed and documented', ref: '§5.2 D', role: 'nurse', blocking: true, source: 'human', evidence: 'Flush volume, time' },
    ],
    increments: [
      { n: 1, volume: '0.5 mL', pause: '30–60 s' },
      { n: 2, volume: '0.5 mL', pause: '—' },
    ],
  },
  {
    key: 'E',
    name: 'Intranasal administration — ExoPure™ 140B via ViaNase™',
    ref: '§5.2 E',
    appendix: 'F',
    owner: 'operator',
    summary:
      'Nasal passages assessed and clear, thaw-stability window still open, device performance check passed, then delivery per manufacturer instructions with volume delivered recorded.',
    signatures: [{ key: 'e_operator', label: 'Device operator', requires: 'canWitness' }],
    checks: [
      { key: 'e_lotverify', label: 'Product and lot verified; thaw-stability window still open', ref: '§5.2 E · §6.2', role: 'pharmacist', blocking: true, source: 'system', evidence: 'Lot, thaw timestamp, window remaining' },
      { key: 'e_nasal', label: 'Nasal assessment — no epistaxis, congestion, mucosal injury or obstruction', ref: '§5.2 E · §6.1', role: 'nurse', blocking: true, source: 'human', evidence: 'Assessment result per nostril' },
      { key: 'e_devcheck', label: 'ViaNase™ performance / output check per IFU', ref: '§5.2 E · Appendix F', role: 'operator', blocking: true, source: 'human', evidence: 'Device serial, IFU version, check result' },
      { key: 'e_position', label: 'Patient positioned; reservoir loaded per IFU', ref: '§5.2 E', role: 'operator', blocking: true, source: 'human', evidence: 'Loading confirmation' },
      { key: 'e_delivered', label: 'Volume and dose delivered recorded', ref: '§5.2 E', role: 'operator', blocking: true, source: 'human', evidence: 'Volume delivered, start/stop times' },
      { key: 'e_tolerance', label: 'Monitored for sneezing, irritation, epistaxis, dizziness, headache, hypersensitivity', ref: '§5.2 E · §6.3', role: 'nurse', blocking: true, source: 'human', evidence: 'Tolerance result; AE form if any' },
      { key: 'e_clean', label: 'Device cleaned and single-use components disposed per IFU', ref: 'Appendix F', role: 'operator', blocking: true, source: 'human', evidence: 'Cleaning method, disposal' },
    ],
  },
  {
    key: 'F',
    name: 'Post-session monitoring & discharge',
    ref: '§5.3 · Appendix C',
    appendix: 'C',
    owner: 'nurse',
    summary:
      'Observation at 15, 30, 60 and 120 minutes: vitals, SpO₂, temperature, neurological status, nasal assessment and infusion-reaction watch. Discharge criteria applied, caregiver instructions issued, next visit booked.',
    signatures: [
      { key: 'f_nurse', label: 'Monitoring nurse', requires: 'canWitness' },
      { key: 'f_discharge', label: 'Discharge authorised by', requires: 'canAuthorise' },
    ],
    checks: [
      { key: 'f_t15', label: 'Observation at 15 minutes', ref: '§5.3 · Appendix C', role: 'nurse', blocking: true, source: 'human', evidence: 'Full vitals set + neuro + nasal' },
      { key: 'f_t30', label: 'Observation at 30 minutes', ref: '§5.3 · Appendix C', role: 'nurse', blocking: true, source: 'human', evidence: 'Full vitals set + neuro + nasal' },
      { key: 'f_t60', label: 'Observation at 60 minutes', ref: '§5.3 · Appendix C', role: 'nurse', blocking: true, source: 'human', evidence: 'Full vitals set + neuro + nasal' },
      { key: 'f_t120', label: 'Observation at 120 minutes', ref: '§5.3 · Appendix C', role: 'nurse', blocking: true, source: 'human', evidence: 'Full vitals set + neuro + nasal' },
      { key: 'f_criteria', label: 'Discharge criteria met', ref: '§5.3', role: 'pi', blocking: true, source: 'human', evidence: 'Physician determination' },
      { key: 'f_instructions', label: 'Caregiver instructions and emergency contact issued', ref: '§5.3', role: 'nurse', blocking: true, source: 'human', evidence: 'Instruction pack version, acknowledgement' },
      { key: 'f_aereporting', label: 'Adverse-event reporting instructions given', ref: '§5.3 · §6.3', role: 'nurse', blocking: true, source: 'human', evidence: 'Acknowledgement' },
      { key: 'f_next', label: 'Next session / follow-up visit scheduled', ref: '§5.3', role: 'coordinator', blocking: true, source: 'system', evidence: 'Appointment id' },
    ],
  },
];

export const monitoringTimepoints = [
  { key: 'pre', label: 'Pre-dose', phase: 'B' },
  { key: 'iv', label: 'During IV', phase: 'D' },
  { key: 'in', label: 'During intranasal', phase: 'E' },
  { key: 't15', label: '15 min post', phase: 'F' },
  { key: 't30', label: '30 min post', phase: 'F' },
  { key: 't60', label: '60 min post', phase: 'F' },
  { key: 't120', label: '120 min post', phase: 'F' },
  { key: 't24h', label: '24 h', phase: 'post' },
  { key: 't72h', label: '72 h', phase: 'post' },
];

export const vitalFields = ['BP', 'HR', 'RR', 'SpO₂', 'Temp', 'Neuro / notes'];

export const reactionWatch = [
  'Rash / urticaria / angioedema',
  'Dyspnea / wheeze / stridor',
  'Hypotension or hypertension',
  'Chest pain',
  'Fever / chills',
  'Dizziness / headache',
  'Nasal irritation / epistaxis',
  'Neurologic change / confusion',
  'Other (specify in notes)',
];

// --- Stopping rules (§6.3 Table 7) ------------------------------------------
// `halts` = what the engine does when the rule fires. `sae` = must be reported
// as a serious adverse event, starting the 24-hour reporting clock.
export const stoppingRules = [
  {
    key: 'anaphylaxis',
    complication: 'Anaphylaxis / serious hypersensitivity',
    signs: 'Urticaria, angioedema, wheeze, hypotension, stridor',
    intervention: 'Stop; epinephrine; airway and ABC support; emergency referral; report as SAE; do not re-administer',
    halts: 'course',
    sae: true,
    rechallenge: false,
  },
  {
    key: 'infusion',
    complication: 'Infusion reaction',
    signs: 'Fever, chills, rash, dyspnea, blood-pressure change, chest pain',
    intervention: 'Pause or stop infusion; supportive care; physician assessment; document and grade',
    halts: 'session',
    sae: false,
    rechallenge: true,
  },
  {
    key: 'device',
    complication: 'Intranasal / device event',
    signs: 'Epistaxis, severe irritation, dizziness, headache',
    intervention: 'Stop delivery; nasal assessment; supportive care; device check; document',
    halts: 'route',
    sae: false,
    rechallenge: true,
  },
  {
    key: 'neuro',
    complication: 'Neurologic worsening',
    signs: 'Stroke / TIA signs, seizure, severe delirium, acute confusion',
    intervention: 'Stop; urgent evaluation; emergency referral; report as SAE; study hold',
    halts: 'study',
    sae: true,
    rechallenge: false,
  },
  {
    key: 'infection',
    complication: 'Infection / sepsis signs',
    signs: 'Fever, hypotension, systemic illness',
    intervention: 'Stop; obtain cultures; treat; product-quality review; report',
    halts: 'course',
    sae: false,
    rechallenge: false,
  },
  {
    key: 'cardio',
    complication: 'Cardiovascular event',
    signs: 'Chest pain, severe hypertension, arrhythmia',
    intervention: 'Stop; stabilize; refer; report as SAE',
    halts: 'course',
    sae: true,
    rechallenge: false,
  },
  {
    key: 'hormone',
    complication: 'Hormone-related event',
    signs: 'Thrombosis, erythrocytosis, bleeding, malignancy concern',
    intervention: 'Stop hormone therapy; physician and endocrine review; report',
    halts: 'hormone',
    sae: false,
    rechallenge: false,
  },
];

export const additionalStopTriggers = [
  'Severe laboratory abnormality',
  'Product-contamination concern',
  'Device malfunction causing unsafe delivery',
  'Physician safety concern',
  'Patient or caregiver withdrawal',
  'Regulatory or ethics hold',
];

// --- Reporting clocks (Background Brief · pharmacovigilance, ICH E2A) --------
export const reportingClocks = [
  { key: 'sae', label: 'Serious adverse event', window: 24, unit: 'hours', to: 'Ethics committee & regulatory authority', startsAt: 'Event onset' },
  { key: 'ae', label: 'Adverse event', window: 7, unit: 'days', to: 'Safety file / PI review', startsAt: 'Event onset' },
  { key: 'deviation', label: 'Protocol deviation', window: 7, unit: 'days', to: 'PI review & deviation log', startsAt: 'Detection' },
  { key: 'pqc', label: 'Product quality complaint', window: 24, unit: 'hours', to: 'Sponsor (KweHealth)', startsAt: 'Detection' },
];

// --- Quality metrics (§7 Table 8) -------------------------------------------
export const qualityMetrics = [
  { metric: 'Completion of planned administration', target: 'Both routes delivered safely', measure: 'Administration record', frequency: 'Per session', actual: '96%', status: 'ok' },
  { metric: 'Adverse-event capture', target: '100% recorded and graded', measure: 'AE/SAE forms', frequency: 'Continuous', actual: '100%', status: 'ok' },
  { metric: 'Serious adverse events reported in time', target: 'All within required timelines', measure: 'SAE log and reporting receipts', frequency: 'Continuous', actual: '1 of 1', status: 'ok' },
  { metric: 'Cold-chain integrity', target: 'Maintained within stability window', measure: 'Temperature log', frequency: 'Per shipment and use', actual: '1 excursion', status: 'warn' },
  { metric: 'Documentation completeness', target: '100% of forms filed', measure: 'File audit', frequency: 'Per visit', actual: '98%', status: 'warn' },
  { metric: 'Follow-up attendance', target: 'All scheduled visits completed', measure: 'Visit log', frequency: 'Per schedule', actual: '92%', status: 'warn' },
];

// --- Standards the platform enforces (Background Brief §4) ------------------
export const standards = [
  { code: 'ICH E6(R3)', name: 'Good Clinical Practice', adopted: 'Adopted Jan 2025', governs: 'Ethical and scientific quality standard for research involving human participants.', enforced: 'Screening, documentation, monitoring and oversight enforced as workflow gates rather than paperwork.', where: 'session' },
  { code: 'Declaration of Helsinki', name: 'Ethical foundation', adopted: '—', governs: 'Voluntariness, favourable risk–benefit, independent review.', enforced: 'Enrolment blocked until informed consent, documented risk–benefit and ethics oversight are all in force.', where: 'consent' },
  { code: 'Informed consent & capacity', name: 'Consent incl. LAR', adopted: '—', governs: 'Valid, documented consent where cognitive capacity may be impaired.', enforced: 'Consent held as versioned, re-consentable state with legally-authorised-representative handling.', where: 'consent' },
  { code: 'ICH E2A', name: 'Pharmacovigilance', adopted: '—', governs: 'Detection, grading and timely reporting of adverse events.', enforced: 'AE/SAE capture with severity, causality and expectedness; SAE 24 h and AE 7 d clocks that start at event time and flag lateness.', where: 'safety' },
  { code: 'NDPA 2023', name: 'Nigeria Data Protection Act', adopted: 'NDPC', governs: 'Lawful processing, security and cross-border transfer of personal data.', enforced: 'Personal and clinical data held in-region under Atunse control; only coded research data crosses to the sponsor under a DPA.', where: 'audit' },
  { code: 'ALCOA+', name: 'Data integrity', adopted: '—', governs: 'Attributable, legible, contemporaneous, original, accurate — complete, consistent, enduring, available.', enforced: 'Append-only capture with full audit trail and e-signatures; corrections are new records, never overwrites.', where: 'audit' },
  { code: 'GAMP 5 / 21 CFR Part 11', name: 'Computerised-system validation', adopted: '—', governs: 'Trustworthy electronic records and signatures in a regulated setting.', enforced: 'Access control, audit and e-signature enforced by the system; the build carries validation evidence.', where: 'audit' },
  { code: 'GDP — cold chain', name: 'Good Distribution Practice', adopted: '—', governs: 'Integrity of temperature-sensitive biologic products.', enforced: 'Product accountability, lot and CoA verification, −20 °C cold-chain logging; excursion blocks release.', where: 'product' },
  { code: 'HL7 FHIR', name: 'Interoperability', adopted: 'R4', governs: 'Standards-based health-data interoperability.', enforced: 'Records and results move through a standard interface (ingress and egress) rather than bespoke, unauditable feeds.', where: 'architecture' },
];

// --- Protocol lifecycle (§4 of the EMR proposal) ----------------------------
export const protocolVersions = [
  { version: '1.0', date: '2026-06-29', author: 'KweHealth, LLC', state: 'Effective', effective: '2026-06-29', note: 'Standardized clinical protocol for the dual-route ADDSB regimen in dementia, mapped to the KweHealth clinical protocol template.', approvals: ['Principal Investigator', 'Clinical Director', 'Medical Director', 'Ethics / Regulatory Reviewer'] },
  { version: '1.1', date: '2026-08-24', author: 'Dr. F. Sola', state: 'In review', effective: 'Pending approval', note: 'Proposed: add a mandatory 24 h caregiver telephone check after Session 1 only. Raised by the learning loop from 3 recorded Session-1 dizziness events (all mild, all resolved).', approvals: ['Principal Investigator ✓', 'Clinical Director ✓', 'Medical Director — pending', 'Ethics / Regulatory Reviewer — pending'] },
];

export const relatedProtocols = [
  {
    id: 'ATN-CSDH-COMBO-2026-002',
    short: 'CSDH — Corticosteroid + AF-Exosome',
    version: 'Hypothesis v1.0',
    status: 'Draft — hypothesis stage',
    indication: 'Chronic subdural haematoma',
    design: 'Two-signal convergence hypothesis: steroid suppression + AF-exosome resolution signal',
    note: 'Held in the registry at draft state with no executable gates. It cannot be scheduled to a patient until it passes the approval workflow — the registry distinguishes a hypothesis from an effective protocol.',
    enrolled: 0,
  },
];

// --- Engine helpers ---------------------------------------------------------

export function gateByKey(key) {
  return gates.find((g) => g.key === key) || null;
}

export function blockingChecks(gate) {
  return gate.checks.filter((c) => c.blocking);
}

/**
 * Evaluate a gate against a session's recorded state.
 * Returns { status, satisfied, required, blockers } where status is one of
 * 'complete' | 'ready' | 'blocked' | 'locked'.
 */
export function evaluateGate(gate, sessionState) {
  const state = sessionState || {};
  const marks = state.checks || {};
  const required = blockingChecks(gate);
  const satisfied = required.filter((c) => marks[c.key] === true);
  const blockers = required
    .filter((c) => marks[c.key] !== true)
    .map((c) => ({ key: c.key, label: c.label, ref: c.ref, reason: (state.blockers || {})[c.key] || null }));
  const hardBlocked = blockers.some((b) => b.reason);
  let status = 'ready';
  if (blockers.length === 0) status = 'complete';
  else if (hardBlocked) status = 'blocked';
  return { status, satisfied: satisfied.length, required: required.length, blockers };
}

/** Total number of blocking checks across the whole treatment day. */
export const totalGateChecks = gates.reduce((n, g) => n + blockingChecks(g).length, 0);

/** Number of signatures a complete treatment day requires. */
export const totalSignatures = gates.reduce((n, g) => n + (g.signatures ? g.signatures.length : 0), 0);
