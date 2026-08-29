// ---------------------------------------------------------------------------
// WHAT THE PLATFORM PREVENTED
//
// A dashboard that only shows activity tells a decision maker the software
// runs. This is the panel that tells them what it is worth: the specific
// events that did NOT happen this month because a gate would not close, each
// one traceable to the clause that stopped it and the record that proves it.
//
// Every figure here is derived from the demo cohort — these are not marketing
// numbers, they are the consequences of the four blocks currently in the data.
// ---------------------------------------------------------------------------

export const prevented = [
  {
    value: '1',
    tone: 'ok',
    label: 'Patient exposure to out-of-specification product',
    detail:
      'Lot EXP-140B-2608A breached −20 °C for 3 h 20 min on 24 Aug. Gate A read the lot state and refused release, so ATN-0003 was never dosed from it. On paper this depends on someone remembering the excursion three days later.',
    ref: '§5.2 A · Appendix E',
    where: 'product',
  },
  {
    value: '1',
    tone: 'ok',
    label: 'Treatment without valid consent',
    detail:
      'ATN-0005 lost consent capacity on 24 Aug. The consent state changed automatically and Gate B would not close. The session was held before it started, rather than discovered afterwards in a file review.',
    ref: '§5.2 B · consent & capacity',
    where: 'consent',
  },
  {
    value: '0',
    tone: 'ok',
    label: 'Late regulatory reports',
    detail:
      'One SAE, four AEs and one product-quality complaint. Median onset-to-record 13 minutes; SAE transmitted and acknowledged in 2 h 33 min against a 24 h window. The clock runs from onset, so lateness cannot be hidden by a late entry.',
    ref: 'ICH E2A',
    where: 'safety',
  },
  {
    value: '₦1.45M',
    tone: 'ok',
    label: 'Revenue mis-billing avoided this month',
    detail:
      'ATN-0003’s held session raised no charge because charge capture is bound to gate closure, and ATN-0002’s halted course holds a ₦5.8M credit rather than an invoice. Unbilled delivered activity is separately zero.',
    ref: 'EMR Proposal §6',
    where: 'billing',
  },
  {
    value: '3',
    tone: 'warn',
    label: 'Deviations caught, coded and corrected',
    detail:
      'All three were minor and all three were found by the system, not by an audit. One produced a permanent roster change that has held nineteen on-time observations since.',
    ref: '§4 exception capture',
    where: 'safety',
  },
  {
    value: '100%',
    tone: 'ok',
    label: 'Two-person timeouts genuinely two-person',
    detail:
      'Across 20 timeouts, none was closed by a single identity. The platform compares authenticated users, so the control cannot be satisfied by one person holding two pens.',
    ref: '§5.2 C',
    where: 'session',
  },
];

export const preventedNote =
  'Each of these is a specific event in the record with a timestamp and a ledger entry, not an estimate. The question a paper process cannot answer is the one underneath them: how would you know?';

// --- Cold-chain trace: 14 readings, the excursion visible ---------------------
// [label, °C]. Requirement is ≤ −20 °C.
export const tempTrace = {
  requirement: -20,
  unit: '°C',
  points: [
    { t: '19 Aug', v: -21.2 }, { t: '20 Aug', v: -21.4 }, { t: '21 Aug', v: -20.9 },
    { t: '22 Aug', v: -20.8 }, { t: '23 Aug', v: -21.0 }, { t: '24 Aug 02:10', v: -17.8 },
    { t: '24 Aug 05:30', v: -11.4 }, { t: '24 Aug 09:00', v: -19.6 }, { t: '24 Aug 18:00', v: -20.7 },
    { t: '25 Aug', v: -20.6 }, { t: '26 Aug', v: -20.9 },
  ],
};

// --- Sessions delivered per week across the programme ------------------------
export const sessionsPerWeek = [
  { w: 'Jun 1', n: 1 }, { w: 'Jun 2', n: 1 }, { w: 'Jun 3', n: 1 }, { w: 'Jun 4', n: 1 },
  { w: 'Jul 1', n: 2 }, { w: 'Jul 2', n: 3 }, { w: 'Jul 3', n: 2 }, { w: 'Jul 4', n: 2 },
  { w: 'Aug 1', n: 4 }, { w: 'Aug 2', n: 3, stopped: 1 }, { w: 'Aug 3', n: 4 }, { w: 'Aug 4', n: 2, held: 2 },
];

// --- Onset-to-record interval for every safety event (minutes) ---------------
export const reportingSpeed = [
  { id: 'AE-0018', min: 16, window: 10080 },
  { id: 'AE-0031', min: 13, window: 10080 },
  { id: 'AE-0033', min: 17, window: 10080 },
  { id: 'AE-0035', min: 7, window: 10080 },
  { id: 'SAE-0002', min: 153, window: 1440 },
  { id: 'PQC-0001', min: 165, window: 1440 },
];

// --- Per-role framing of the same day ----------------------------------------
export const roleFocus = {
  pi: {
    kicker: 'Clinical authority',
    headline: 'Three decisions carry your signature today',
    line: 'One session is waiting on your authorisation, one course is halted pending your determination, and a protocol amendment raised by the learning loop is waiting on two more approvals.',
  },
  nurse: {
    kicker: 'Your clinic',
    headline: 'Chair 2 is running; Chair 1 will not open',
    line: 'You are recorded as the verifier on the ATN-0004 timeout and cannot also witness it. The 11:00 session is held on product, so there is nothing to prepare.',
  },
  pharmacist: {
    kicker: 'Custody & release',
    headline: 'One lot quarantined, two thaw windows open',
    line: 'The excursion you raised on 24 August is what is holding the 11:00 session. A released substitute lot with six vials in date is available; the release decision is yours.',
  },
  operator: {
    kicker: 'Device readiness',
    headline: 'One delivery today, not two',
    line: 'VN-CPD-004417 passed its check at 08:55 and is waiting on Gate E for ATN-0004. The 11:00 intranasal delivery is cancelled upstream — no preparation required.',
  },
  coordinator: {
    kicker: 'Study file',
    headline: 'One signature is blocking a treatment',
    line: 'The LAR consent you issued on 25 August is unsigned, and today’s 14:00 session is held at Gate B until it is executed. Three forms are outstanding and the sponsor export runs Monday.',
  },
  administrator: {
    kicker: 'Facility operations',
    headline: 'Revenue is clean; two credentials are not',
    line: 'Nothing has aged past current and unbilled delivered activity is zero. Two registrations expire inside 96 days, and expiry removes those people from roster eligibility.',
  },
};
