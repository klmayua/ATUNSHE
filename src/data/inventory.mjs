// ---------------------------------------------------------------------------
// PRODUCT ACCOUNTABILITY, COLD CHAIN & DEVICE (Appendices E and F)
//
// Good Distribution Practice for a −20 °C biologic is not a log to fill in
// after the fact: it is a release control. A lot whose temperature history
// breaches the storage requirement cannot be released to a session, and the
// gate that needs it will not close. That is exactly what has happened to
// ATN-0003 today.
// ---------------------------------------------------------------------------

export const lots = [
  {
    lot: 'EXP-140B-2608B',
    product: 'ExoPure™ 140B',
    route: 'Intranasal',
    presentation: '3 mL vial',
    received: '18 Aug 2026',
    expiry: '2027-02-28',
    qtyReceived: 12,
    administered: 3,
    wasted: 0,
    quarantined: 0,
    balance: 9,
    coa: 'CoA-KWE-EXP-2608B · reviewed 18 Aug by T. Ilesanmi',
    coaStatus: 'Verified',
    storage: 'Freezer 1',
    tempStatus: 'In range',
    released: true,
    note: 'Current released intranasal lot. In use for ATN-0004 Session 4 today.',
  },
  {
    lot: 'EXP-140B-2608A',
    product: 'ExoPure™ 140B',
    route: 'Intranasal',
    presentation: '3 mL vial',
    received: '04 Aug 2026',
    expiry: '2027-02-14',
    qtyReceived: 12,
    administered: 3,
    wasted: 0,
    quarantined: 9,
    balance: 0,
    coa: 'CoA-KWE-EXP-2608A · reviewed 04 Aug by T. Ilesanmi',
    coaStatus: 'Verified',
    storage: 'Quarantine store',
    tempStatus: 'EXCURSION',
    released: false,
    excursion: {
      when: '24 Aug 2026 · 02:10 – 05:30',
      duration: '3 h 20 min',
      low: '−11.4 °C',
      requirement: '≤ −20 °C',
      cause: 'Freezer 2 door seal failure',
      raisedBy: 'Platform temperature rule',
      pqc: 'PQC-0001',
      disposition: 'Quarantined pending sponsor determination',
    },
    note: 'Blocks Gate A for ATN-0003 Session 3. No patient was exposed to the affected vials — the excursion was raised before the morning release run.',
  },
  {
    lot: 'RJV-70B-2608C',
    product: 'Rejuvenate Serum™',
    route: 'Intravenous',
    presentation: '1 mL vial',
    received: '04 Aug 2026',
    expiry: '2027-01-30',
    qtyReceived: 24,
    administered: 9,
    wasted: 1,
    quarantined: 0,
    balance: 14,
    coa: 'CoA-KWE-RJV-2608C · reviewed 04 Aug by T. Ilesanmi',
    coaStatus: 'Verified',
    storage: 'Freezer 1',
    tempStatus: 'In range',
    released: true,
    note: '1 vial wasted 12 Aug — ATN-0002 Session 2 stopped after IV completed; intranasal vial not opened, IV vial spent.',
  },
  {
    lot: 'EXP-140B-2607A',
    product: 'ExoPure™ 140B',
    route: 'Intranasal',
    presentation: '3 mL vial',
    received: '08 Jul 2026',
    expiry: '2027-01-12',
    qtyReceived: 12,
    administered: 6,
    wasted: 0,
    quarantined: 0,
    balance: 6,
    coa: 'CoA-KWE-EXP-2607A · reviewed 08 Jul by T. Ilesanmi',
    coaStatus: 'Verified',
    storage: 'Freezer 1',
    tempStatus: 'In range',
    released: true,
    note: 'Earlier lot, still in date and released.',
  },
];

// 14 days of the morning/evening temperature check (Appendix E)
export const tempLog = [
  { date: '26 Aug', time: '07:00', freezer: 'Freezer 1', temp: -21.4, inRange: true, by: 'T. Ilesanmi' },
  { date: '26 Aug', time: '07:00', freezer: 'Freezer 2', temp: -20.9, inRange: true, by: 'T. Ilesanmi', note: 'Seal replaced 24 Aug; back in service, lot still quarantined pending sponsor.' },
  { date: '25 Aug', time: '19:00', freezer: 'Freezer 1', temp: -21.1, inRange: true, by: 'T. Ilesanmi' },
  { date: '25 Aug', time: '07:00', freezer: 'Freezer 2', temp: -20.6, inRange: true, by: 'T. Ilesanmi' },
  { date: '24 Aug', time: '05:30', freezer: 'Freezer 2', temp: -11.4, inRange: false, by: 'System (continuous probe)', note: 'EXCURSION — 3 h 20 min above requirement. Lot EXP-140B-2608A quarantined. PQC-0001 raised.' },
  { date: '24 Aug', time: '02:10', freezer: 'Freezer 2', temp: -17.8, inRange: false, by: 'System (continuous probe)', note: 'First reading out of range — door seal failure.' },
  { date: '23 Aug', time: '19:00', freezer: 'Freezer 2', temp: -21.0, inRange: true, by: 'T. Ilesanmi' },
  { date: '23 Aug', time: '07:00', freezer: 'Freezer 1', temp: -21.3, inRange: true, by: 'T. Ilesanmi' },
  { date: '22 Aug', time: '19:00', freezer: 'Freezer 1', temp: -21.5, inRange: true, by: 'T. Ilesanmi' },
  { date: '22 Aug', time: '07:00', freezer: 'Freezer 2', temp: -20.8, inRange: true, by: 'T. Ilesanmi' },
];

export const thawLog = [
  { product: 'ExoPure™ 140B', lot: 'EXP-140B-2608B', thawed: '26 Aug · 08:40', method: 'Room temperature', window: '12 h', usedBy: 'In use — ATN-0004 S4', operator: 'T. Ilesanmi', status: 'open' },
  { product: 'Rejuvenate Serum™', lot: 'RJV-70B-2608C', thawed: '26 Aug · 08:40', method: 'Room temperature', window: '12 h', usedBy: 'In use — ATN-0004 S4', operator: 'T. Ilesanmi', status: 'open' },
  { product: 'ExoPure™ 140B', lot: 'EXP-140B-2608B', thawed: '19 Aug · 08:35', method: 'Room temperature', window: '12 h', usedBy: '19 Aug · 10:02 — ATN-0004 S3', operator: 'T. Ilesanmi', status: 'used' },
  { product: 'Rejuvenate Serum™', lot: 'RJV-70B-2608C', thawed: '19 Aug · 08:35', method: 'Room temperature', window: '12 h', usedBy: '19 Aug · 09:48 — ATN-0004 S3', operator: 'T. Ilesanmi', status: 'used' },
  { product: 'ExoPure™ 140B', lot: 'EXP-140B-2608B', thawed: '19 Aug · 09:10', method: '4 °C', window: '48 h', usedBy: '19 Aug · 11:20 — ATN-0008 S4', operator: 'T. Ilesanmi', status: 'used' },
];

export const reconciliation = {
  perPatientCourse: '6 vials Rejuvenate Serum™ (1 mL) + 6 vials ExoPure™ 140B (3 mL)',
  rows: [
    { product: 'ExoPure™ 140B', received: 48, administered: 12, wasted: 0, quarantined: 9, returned: 0, balance: 27, reconciled: true },
    { product: 'Rejuvenate Serum™', received: 48, administered: 13, wasted: 1, quarantined: 0, returned: 0, balance: 34, reconciled: true },
  ],
  lastReconciled: '25 Aug 2026 · T. Ilesanmi, verified by N. Aluko',
  discrepancies: 0,
};

// --- Device (Appendix F) ----------------------------------------------------
export const devices = [
  {
    serial: 'VN-CPD-004417',
    model: 'ViaNase™ Controlled Particle Dispersion®',
    manufacturer: 'Kurve Therapeutics',
    ifu: 'IFU rev. 4.2 (2026-01)',
    status: 'In service',
    lastCheck: '26 Aug 2026 · 08:55 — pass',
    lastCheckBy: 'C. Nwosu',
    lastClean: '25 Aug 2026 · IFU §7 wipe-down, adapter and cartridge discarded',
    uses: 27,
    malfunctions: 0,
    components: 'Single-use nasal adapter + reservoir cartridge, discarded after every use',
  },
  {
    serial: 'VN-CPD-004418',
    model: 'ViaNase™ Controlled Particle Dispersion®',
    manufacturer: 'Kurve Therapeutics',
    ifu: 'IFU rev. 4.2 (2026-01)',
    status: 'Reserve — in service',
    lastCheck: '24 Aug 2026 · 08:10 — pass',
    lastCheckBy: 'C. Nwosu',
    lastClean: '24 Aug 2026 · IFU §7 wipe-down',
    uses: 4,
    malfunctions: 0,
    components: 'Single-use nasal adapter + reservoir cartridge, discarded after every use',
  },
];

export const deviceUseLog = [
  { date: '26 Aug', patient: 'ATN-0004', session: 4, lot: 'EXP-140B-2608B', delivered: 'Pending — Gate E not reached', operator: 'C. Nwosu', device: 'VN-CPD-004417' },
  { date: '19 Aug', patient: 'ATN-0008', session: 4, lot: 'EXP-140B-2608B', delivered: '3 mL, both nostrils, per IFU', operator: 'C. Nwosu', device: 'VN-CPD-004417' },
  { date: '19 Aug', patient: 'ATN-0004', session: 3, lot: 'EXP-140B-2608B', delivered: '3 mL, both nostrils, per IFU', operator: 'C. Nwosu', device: 'VN-CPD-004417' },
  { date: '19 Aug', patient: 'ATN-0003', session: 2, lot: 'EXP-140B-2608A', delivered: '3 mL, both nostrils, per IFU', operator: 'C. Nwosu', device: 'VN-CPD-004418' },
  { date: '12 Aug', patient: 'ATN-0004', session: 2, lot: 'EXP-140B-2608A', delivered: '3 mL, both nostrils, per IFU', operator: 'C. Nwosu', device: 'VN-CPD-004417' },
  { date: '12 Aug', patient: 'ATN-0002', session: 2, lot: '—', delivered: 'NOT ADMINISTERED — session stopped after IV (SAE-0002)', operator: 'C. Nwosu', device: 'VN-CPD-004417' },
];
