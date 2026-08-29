// ---------------------------------------------------------------------------
// APPENDICES A–I — the clinic working forms, as structured form definitions.
//
// In the paper protocol these are nine Word documents. Here each one is a
// typed form bound to a protocol gate, an owning role, and a set of fields
// whose values come from — or are written back into — session state.
//
// The `boundTo` field is the point: a form is not a PDF stored next to the
// record, it is the capture surface for a specific gate. Closing gate C
// writes Appendix B; recording an observation writes Appendix C; a fired
// stopping rule opens Appendix D with its clock already running.
// ---------------------------------------------------------------------------

const HEADER = [
  { label: 'Site', value: 'Atunse Healthcare Ltd.' },
  { label: 'Sponsor', value: 'KweHealth, LLC' },
  { label: 'Protocol ID', value: 'ATN-DEM-ADDSB-2026-001' },
];

export const appendices = [
  {
    id: 'A',
    title: 'Eligibility & Consent Checklist',
    ref: '§5.1',
    owner: 'pi',
    boundTo: 'Enrolment — before any session may be scheduled',
    purpose: 'Inclusion and exclusion determination with sign-off; consent and LAR confirmation.',
    header: HEADER,
    sections: [
      { kind: 'criteria', title: 'Inclusion criteria — all must be “Yes”', polarity: 'yes', source: 'inclusion' },
      { kind: 'criteria', title: 'Exclusion criteria — all must be “No”', polarity: 'no', source: 'exclusion' },
      {
        kind: 'checklist',
        title: 'Consent',
        items: [
          'Consent discussion completed with patient',
          'LAR consent obtained (if patient capacity impaired)',
          'Patient assent sought to extent possible',
          'Signed consent form filed',
          'Copy provided to patient / caregiver',
        ],
      },
      { kind: 'decision', title: 'Eligibility determination', options: ['Eligible', 'Not eligible', 'Hold pending'] },
    ],
    signatures: ['Supervising Physician / PI', 'Study Coordinator'],
  },
  {
    id: 'B',
    title: 'Treatment-Day Timeout & Administration Record',
    ref: '§5.2',
    owner: 'nurse',
    boundTo: 'Gates A, C, D, E',
    purpose: 'Pre-treatment readiness, two-person timeout, and the IV and intranasal administration records.',
    header: HEADER,
    sections: [
      {
        kind: 'fields',
        title: 'Treatment session',
        rows: [
          { label: 'Treatment session', value: 'Session __ of 6 (Wk1 · Wk2 · Wk3 · Wk4 · Wk5 · Wk6)' },
          { label: 'Prior session tolerated?', value: 'Yes / No / N/A (Session 1)' },
          { label: 'Fixed dose (no escalation)', value: 'IV: 1 mL Rejuvenate Serum™ (70B EV) · IN: one 3 mL ExoPure™ 140B (140B EV)' },
        ],
      },
      { kind: 'gate', title: 'Pre-treatment readiness', gate: 'A' },
      { kind: 'gate', title: 'Two-person pre-dose timeout', gate: 'C' },
      {
        kind: 'table',
        title: 'Intravenous administration — Rejuvenate Serum™',
        columns: ['Field', 'Entry', 'Field / Entry'],
        rows: [
          ['Lot #', '—', 'Vials used: 1 × 1 mL'],
          ['Diluent', '0.9 % saline (product formulation)', 'Dose: 1 mL (70B EV)'],
          ['Method', 'Slow IV push, 0.5 mL increments', '—'],
          ['Start time', '—', 'Stop time: —'],
          ['Pauses 30–60 s between increments', 'Yes', 'Not given as bolus: Confirmed'],
          ['Visual inspection (clarity, no aggregation)', 'Pass', 'Operator initials: —'],
        ],
      },
      {
        kind: 'table',
        title: 'Intranasal administration — ExoPure™ 140B via ViaNase™',
        columns: ['Field', 'Entry', 'Field / Entry'],
        rows: [
          ['Lot #', '—', 'Vial volume: 3 mL'],
          ['Nasal assessment (no epistaxis / obstruction)', 'Pass', 'Device perf. check: Pass'],
          ['Dose', '1.4 × 10¹¹ EV / session', 'Volume delivered: —'],
          ['Start time', '—', 'Stop time: —'],
          ['Tolerated without event', 'Yes / No (AE form)', 'Operator initials: —'],
        ],
      },
      { kind: 'freetext', title: 'Deviations' },
    ],
    signatures: ['Administering Nurse', 'Supervising Physician / PI'],
  },
  {
    id: 'C',
    title: 'Vital-Signs / Monitoring Sheet',
    ref: '§5.3',
    owner: 'nurse',
    boundTo: 'Gates B, D, E, F',
    purpose: 'Observations at every protocol timepoint, reaction watch, and discharge.',
    header: HEADER,
    sections: [
      { kind: 'monitoring', title: 'Observations — escalate per §6.3 for any concerning change' },
      { kind: 'watch', title: 'Reaction watch (tick if observed; complete AE form)' },
      {
        kind: 'checklist',
        title: 'Discharge',
        items: ['Discharge criteria met', 'Caregiver instructions & emergency contact given', 'Follow-up scheduled'],
      },
    ],
    signatures: ['Monitoring Nurse', 'Supervising Physician / PI'],
  },
  {
    id: 'D',
    title: 'Adverse Event / Serious Adverse Event Form',
    ref: '§6.3',
    owner: 'pi',
    boundTo: 'Raised from any gate; opens the reporting clock',
    purpose: 'One form per event. Serious events require immediate physician notification and reporting to the ethics committee and regulatory authority within the required timelines.',
    header: HEADER,
    sections: [
      {
        kind: 'fields',
        title: 'Event',
        rows: [
          { label: 'Event #', value: '—' },
          { label: 'Event description', value: '—' },
          { label: 'Onset date / time', value: '—' },
          { label: 'Resolution date / time', value: '—' },
        ],
      },
      {
        kind: 'table',
        title: 'Grading',
        columns: ['Field', 'Selection'],
        rows: [
          ['Serious?', 'No (AE) · Yes (SAE)'],
          ['SAE criterion (if applicable)', 'Death · Life-threatening · Hospitalization · Disability · Other important'],
          ['Severity', 'Mild · Moderate · Severe'],
          ['Relatedness to product / device', 'Unrelated · Unlikely · Possible · Probable · Definite'],
          ['Expectedness', 'Expected · Unexpected'],
          ['Attributed to', 'IV product · Intranasal product · Device · Hormone therapy · Other'],
        ],
      },
      {
        kind: 'checklist',
        title: 'Action taken',
        items: [
          'Treatment paused',
          'Treatment stopped',
          'Supportive care given',
          'Emergency referral',
          'Stopping rule triggered (§6.3)',
          'Reported to physician',
          'Reported to ethics / regulatory',
        ],
      },
      { kind: 'freetext', title: 'Outcome & narrative' },
    ],
    signatures: ['Reported by', 'Supervising Physician / PI'],
  },
  {
    id: 'E',
    title: 'Product Accountability & Cold-Chain Log',
    ref: '§4 · §6.2',
    owner: 'pharmacist',
    boundTo: 'Gate A — release of product to a session',
    purpose: 'Receipt, storage, temperature checks, thaw and use, and end-of-course reconciliation. Course total: 6 vials of each product per patient.',
    header: HEADER,
    sections: [
      {
        kind: 'table',
        title: 'Receipt & storage',
        columns: ['Field', 'ExoPure™ 140B', 'Rejuvenate Serum™'],
        rows: [
          ['Lot #', 'EXP-140B-2608A', 'RJV-70B-2608C'],
          ['Quantity received', '24 vials', '24 vials'],
          ['Expiry date', '2027-02-14', '2027-01-30'],
          ['Condition on receipt', 'OK', 'OK'],
          ['Storage (≤ −20 °C)', 'Confirmed', 'Confirmed'],
        ],
      },
      { kind: 'coldchain', title: 'Temperature / cold-chain checks' },
      { kind: 'thaw', title: 'Thaw & use' },
      { kind: 'reconciliation', title: 'Reconciliation' },
    ],
    signatures: ['Product Custodian / Pharmacist', 'Verified by'],
  },
  {
    id: 'F',
    title: 'ViaNase™ Device Log',
    ref: '§5.2 E',
    owner: 'operator',
    boundTo: 'Gates A and E',
    purpose: 'Device identification, pre-use performance check, use record, cleaning, and malfunction reporting.',
    header: HEADER,
    sections: [
      {
        kind: 'fields',
        title: 'Device identification',
        rows: [
          { label: 'Device model', value: 'ViaNase™ Controlled Particle Dispersion®' },
          { label: 'Serial number', value: 'VN-CPD-004417' },
          { label: 'Manufacturer instructions version', value: 'IFU rev. 4.2 (2026-01)' },
          { label: 'Single-use components used', value: 'Nasal adapter + reservoir cartridge' },
        ],
      },
      {
        kind: 'checklist',
        title: 'Pre-use performance check',
        items: [
          'Device charged / powered',
          'Visual inspection of device and components',
          'Performance / output check per IFU',
          'Correct cartridge / reservoir loaded',
          'No prior malfunction outstanding',
        ],
      },
      { kind: 'devicelog', title: 'Use record' },
      {
        kind: 'table',
        title: 'Cleaning / disinfection',
        columns: ['Date', 'Method per IFU', 'Components disposed', 'Initials'],
        rows: [
          ['2026-08-25', 'IFU §7 wipe-down + adapter discard', 'Adapter, cartridge', 'CN'],
          ['2026-08-18', 'IFU §7 wipe-down + adapter discard', 'Adapter, cartridge', 'CN'],
        ],
      },
      { kind: 'freetext', title: 'Malfunction report (if any)' },
    ],
    signatures: ['Device Operator', 'Supervising Physician / PI'],
  },
  {
    id: 'G',
    title: 'Hormone Optimization Decision Worksheet',
    ref: '§6',
    owner: 'pi',
    optional: true,
    boundTo: 'Optional — enrolment and follow-up where optimisation is considered',
    purpose: 'Individualised evaluation matrix, contraindication screen and monitoring plan. Therapy is individualised to labs, symptoms and risk; contraindication screening completes before initiation.',
    header: HEADER,
    sections: [
      {
        kind: 'table',
        title: 'Relevant findings & panel',
        columns: ['Marker', 'Result', 'Reference / flag'],
        rows: [
          ['TSH / free T4', '6.8 mIU/L / 11.2 pmol/L', 'TSH high — flagged'],
          ['Testosterone (total / free)', '—', '—'],
          ['Estradiol', '—', '—'],
          ['Progesterone', '—', '—'],
          ['SHBG', '—', '—'],
          ['DHEA-S', '—', '—'],
          ['LH / FSH', '—', '—'],
          ['Prolactin', '—', '—'],
          ['Cortisol (morning)', '—', '—'],
          ['IGF-1 / Vitamin D', '— / 41 nmol/L', 'Vit D low'],
        ],
      },
      {
        kind: 'table',
        title: 'Decision matrix',
        columns: ['Finding', 'Possible relevance', 'Strategy considered', 'Required safety checks'],
        rows: [
          ['Hypothyroidism', 'Reversible cognitive contributor', 'Thyroid replacement', 'Cardiac status'],
          ['Male hypogonadism', 'Energy, mood, cognition', 'Testosterone optimisation', 'Hct, PSA, thrombotic / prostate Hx'],
          ['Female deficiency / menopausal', 'Sleep, mood, cognition', 'Per current guidance', 'Breast / endometrial Hx, VTE risk, bleeding'],
          ['Low DHEA-S', 'Adjunct (uncertain)', 'Only with clear deficiency', 'Hormone-sensitive malignancy'],
          ['Adrenal abnormality', 'Energy, stress response', 'Endocrinology referral', 'Specialist review'],
        ],
      },
      {
        kind: 'criteria',
        title: 'Contraindication screen — must all be “No” to proceed',
        polarity: 'no',
        items: [
          'Hormone-sensitive malignancy',
          'Active thromboembolic disease',
          'Uncontrolled erythrocytosis',
          'Unexplained vaginal bleeding',
          'Severe untreated sleep apnea',
          'Other sex-specific contraindication',
        ],
      },
      {
        kind: 'fields',
        title: 'Plan, monitoring & stopping',
        rows: [
          { label: 'Agent / dose (if any)', value: 'Levothyroxine 25 µg OD — proposed, pending cardiac status' },
          { label: 'Baseline labs confirmed', value: 'Yes' },
          { label: 'Monitoring labs & interval', value: 'TSH / free T4 at 6 weeks' },
          { label: 'Stopping criteria noted', value: 'Thrombotic event, erythrocytosis, bleeding, malignancy concern, CV event' },
        ],
      },
    ],
    signatures: ['Supervising Physician / PI', 'Endocrinology (if consulted)'],
  },
  {
    id: 'H',
    title: 'Follow-Up Visit Form',
    ref: '§5.3',
    owner: 'coordinator',
    boundTo: 'Gate B and every post-course follow-up visit',
    purpose: 'Interval review, assessments due at this visit, and the documented repeat-treatment decision.',
    header: HEADER,
    sections: [
      {
        kind: 'fields',
        title: 'Visit',
        rows: [
          { label: 'Visit type', value: 'Weekly session (Wk 1–6) · End of course (Wk 6) · 4 wk · 8 wk · 12 wk · 6 mo · 12 mo' },
          { label: 'Session # (if weekly)', value: '__ of 6' },
          { label: 'Date', value: '—' },
        ],
      },
      {
        kind: 'checklist',
        title: 'Interval review',
        items: [
          'Interval symptoms reviewed',
          'Adverse events captured (AE form if any)',
          'Medication changes reviewed',
          'Vital signs recorded',
          'Caregiver report reviewed',
        ],
      },
      {
        kind: 'table',
        title: 'Assessments due this visit',
        columns: ['Assessment', 'Result / score', 'N/A this visit'],
        rows: [
          ['Safety labs', '—', ''],
          ['Inflammatory markers (hs-CRP / ESR)', '—', ''],
          ['MMSE / MoCA', '—', ''],
          ['CDR-SB', '—', ''],
          ['ADCS-ADL', '—', ''],
          ['NPI-Q', '—', ''],
          ['Biomarker panel', '—', ''],
          ['Hormone panel (if therapy)', '—', ''],
          ['Physician global impression', '—', ''],
          ['Caregiver global impression', '—', ''],
        ],
      },
      {
        kind: 'fields',
        title: 'Repeat-treatment decision',
        rows: [
          { label: 'Safety review completed; no stopping criterion met', value: 'Yes / No' },
          { label: 'Proceed to repeat treatment?', value: 'Yes / No / Defer' },
        ],
      },
    ],
    signatures: ['Assessing Clinician', 'Supervising Physician / PI'],
  },
  {
    id: 'I',
    title: 'Caregiver Daily Observation Diary',
    ref: 'Appendix I',
    owner: 'caregiver',
    boundTo: 'Continuous — feeds the pre-session interval review at Gate B',
    purpose: 'Daily symptoms, behaviour, sleep, function and concerns, recorded by the caregiver between visits.',
    header: HEADER,
    sections: [
      { kind: 'diary', title: 'Daily record' },
      {
        kind: 'note',
        title: 'Scale guide (optional)',
        body: 'For Sleep / Appetite / Mood / Alertness you may use: + better than usual; = same; − worse than usual.',
      },
      {
        kind: 'urgent',
        title: 'Call the clinic right away if you notice',
        items: [
          'Trouble breathing, swelling of face/lips, widespread rash',
          'Fainting, chest pain, severe dizziness',
          'Sudden confusion, weakness, trouble speaking, seizure',
          'Persistent nosebleed',
          'Fever or signs of infection',
          'Any symptom that worries you',
        ],
      },
    ],
    signatures: [],
  },
];

export const appendixById = Object.fromEntries(appendices.map((a) => [a.id, a]));
