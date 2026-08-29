// ---------------------------------------------------------------------------
// PLATFORM ARCHITECTURE — the EMR proposal's own structure, made navigable.
//
// Sections 1, 2, 10, 11, 12 and 13 of the High-Level Technical Proposal
// describe the platform as layers, domains, a lifecycle and an operating
// cycle. Rather than restating them as prose in a slide, each element here
// carries `demo` — the route in this very application where that capability
// is actually running. A decision maker can click a layer and land in the
// working thing.
// ---------------------------------------------------------------------------

// §1 — the patient lifecycle
export const lifecycle = [
  { key: 'register', label: 'Register', detail: 'Patient identity, demographics, documents, duplicate detection, longitudinal record opened.', demo: 'cohort', evidence: '8 patients on one identity each, carrying across every visit and facility.' },
  { key: 'consent', label: 'Consent', detail: 'Granular, versioned, purpose-bound consent captured as a live state with LAR handling.', demo: 'consent', evidence: 'ATN-0005 shows consent suspended by a capacity rule and blocking treatment.' },
  { key: 'schedule', label: 'Schedule', detail: 'Enquiry to booking, provider/room/chair availability, reminders, recall.', demo: 'schedule', evidence: 'Today’s chair schedule, with two visits held by the engine rather than the diary.' },
  { key: 'care', label: 'Clinical care', detail: 'Care executed against the protocol, not alongside it.', demo: 'session', evidence: 'ATN-0004 Session 4, live, paused at the two-person timeout.' },
  { key: 'billing', label: 'Billing', detail: 'Charge raised from the care actually delivered, tracked to payment and reconciled.', demo: 'billing', evidence: 'ATN-0003’s held session raised no charge; ATN-0002’s halted course holds a credit.' },
  { key: 'followup', label: 'Follow-up', detail: 'Post-course schedule at 4, 8 and 12 weeks and 6 and 12 months, returning the patient to the cycle.', demo: 'cohort', evidence: 'ATN-0001, course complete, 12-week assessment due 3 Sep.' },
];

// §2 — capability layers
export const layers = [
  {
    n: 1,
    key: 'access',
    name: 'Access',
    items: ['Patient portal', 'Mobile PWA', 'Offline capability', 'Ogami digital front office', 'Role-based staff portals'],
    inDemo: 'Seven role-based portals, each with a genuinely different surface. The caregiver sees a diary and nothing else. Ogami handles enquiries and books into the real schedule.',
    demo: 'ogami',
  },
  {
    n: 2,
    key: 'application',
    name: 'Application',
    items: ['EMR & Clinical Care', 'Protocol Engine', 'CRM, Booking & Scheduling', 'Billing & Revenue', 'People & Institutions'],
    inDemo: 'The longitudinal record, the executable protocol, the chair schedule, charge capture bound to gate closure, and the credentialled staff register.',
    demo: 'protocols',
  },
  {
    n: 3,
    key: 'intelligence',
    name: 'Intelligence',
    items: ['AI continuous learning', 'Protocol analytics', 'Operational insight'],
    inDemo: 'Adherence by gate, timepoint drift, deviation reason codes, and four learning-loop insights — one of which was rejected by clinical review and retained with its reasoning.',
    demo: 'learning',
  },
  {
    n: 4,
    key: 'trust',
    name: 'Trust',
    items: ['Consent management', 'Chain of custody', 'Governance ledger', 'Audit'],
    inDemo: 'Consent as live state, a hash-chained custody ledger in the proposal’s own six columns, ALCOA+ audit with corrections as new records, and logged break-glass.',
    demo: 'custody',
  },
  {
    n: 5,
    key: 'foundation',
    name: 'Foundation',
    items: ['Multi-tenant architecture', 'Security', 'Infrastructure', 'Structured data layer'],
    inDemo: 'Single tenant atunse-lagos-01 with in-region residency, and a structured clinical data model — the protocol itself is data, which is why it can be versioned and analysed.',
    demo: 'architecture',
  },
];

// §3–§10 — the six capability domains
export const domains = [
  {
    key: 'emr',
    section: '§3',
    name: 'EMR & Clinical Care',
    outcome: 'Every patient has one authoritative, longitudinal record that they help build and can access, and that authorised staff can rely on wherever care is delivered.',
    capabilities: [
      'Single longitudinal record per patient; one identity across facilities and visits',
      'Patient-entered history, pre-visit questionnaires and reported outcomes flowing into the record',
      'Encounters, problem list, diagnoses coded to standard terminologies, allergies, medications',
      'Vitals, measurements and trends; laboratory, imaging, procedures',
      'Configurable clinical forms with free-text and structured capture',
      'Care plans and protocol-linked pathways; referrals, handovers, clinical tasks',
      'Role-based access with controlled break-glass; immutable time-stamped audit and record versioning',
      'Structured migration of agreed existing patient data',
    ],
    demo: 'cohort',
    demoLabel: 'Open a longitudinal record',
    shownBy: 'Every patient record carries the whole course: sessions, observations, labs, biomarkers, events, deviations, consent history and the caregiver diary in one timeline.',
  },
  {
    key: 'protocol',
    section: '§4',
    name: 'Protocol & Clinical Intelligence Engine',
    outcome: 'Atunse Health’s clinical protocols stop being documents and institutional memory, and become active, executable components of daily care that do not leave when staff do.',
    capabilities: [
      'Protocol and care-pathway builder with reusable components',
      'Clinical decision rules, order sets and protocol-linked forms',
      'Versioning with draft, review and approval workflow',
      'Controlled deployment, effective dating and rollback to a prior version',
      'Protocol-driven task lists, prompts and reminders at the point of care',
      'In-workflow alerts and structured exception capture',
      'Deviation recording with reason codes for later analysis',
      'Adherence and deviation dashboards by protocol, team and site',
    ],
    demo: 'protocols',
    demoLabel: 'Open the protocol registry',
    shownBy: 'ATN-DEM-ADDSB-2026-001 runs as 6 gates and 42 blocking checks with 7 required signatures. v1.1 sits in review, raised by the learning loop, not yet in force.',
    primary: true,
  },
  {
    key: 'crm',
    section: '§5',
    name: 'CRM, Booking, Scheduling & Engagement',
    outcome: 'No enquiry is lost, and no appointment goes untracked. Every patient is guided from first contact through booking, care and follow-up.',
    capabilities: [
      'Patient and prospect profiles with unified interaction history',
      'Multi-channel enquiry and lead capture with pipeline and relationship stage',
      'Segmentation, targeted communication and consent-aware messaging',
      'Patient self-booking and staff-side booking across providers, rooms and resources',
      'Service catalogue, waitlists, rescheduling, cancellations, no-show tracking',
      'Automated reminders by SMS, WhatsApp and email; follow-up and recall scheduling',
      'Ogami conversational assistant across web and WhatsApp with human escalation',
    ],
    demo: 'crm',
    demoLabel: 'Open the enquiry pipeline',
    shownBy: 'A screening funnel from 34 enquiries to 8 started courses, with the two that did not convert shown and their reasons recorded.',
  },
  {
    key: 'billing',
    section: '§6',
    name: 'Billing, Payments & Revenue',
    outcome: 'Every service rendered is captured, billed and reconciled, so revenue that currently leaks through untracked activity is closed off.',
    capabilities: [
      'Service catalogue with configurable pricing and tariffs',
      'Charge capture linked directly to clinical activity',
      'Invoicing, receipts and patient statements',
      'Payment recording across cash, card, transfer and gateway',
      'Part-payments, outstanding balances and ageing',
      'Refunds, adjustments and discounts with controls',
      'Corporate, payer and insurance billing; revenue reporting and reconciliation',
    ],
    demo: 'billing',
    demoLabel: 'Open revenue & charge capture',
    shownBy: 'Unbilled delivered activity is zero, because charges are raised by gate closure. A held session raises nothing; a halted course holds a credit.',
  },
  {
    key: 'people',
    section: '§7',
    name: 'People, Institutions & Administration',
    outcome: 'The people, facilities and partner institutions that deliver care are mapped around the patient and the clinical record, not held in separate lists.',
    capabilities: [
      'Staff profiles, professional roles, departments and responsibilities',
      'Assignments, availability and rostering',
      'Credentials and licences with expiry tracking and reminders',
      'Permissions and a full activity record',
      'Partner-institution and referring-organisation directory',
      'Facilities, locations, departments and units; forms builder and workflow configuration',
    ],
    demo: 'people',
    demoLabel: 'Open the staff & institution register',
    shownBy: 'Registration, GCP currency and protocol-version training tracked per person, with two credentials already flagged as expiring.',
  },
  {
    key: 'trust',
    section: '§8',
    name: 'Trust, Consent, Chain of Custody & Governance',
    outcome: 'Consent and critical events are verifiable and tamper-evident, so Atunse Health can establish what happened, when, and under whose authority, with confidence.',
    capabilities: [
      'Granular consent types bound to a specific purpose, with signature or witness',
      'Version, status, timestamp, giver and expiry; modification, withdrawal, verification and full history',
      'Consent held as an active digital state, not a static document',
      'Registry of assets, specimens, documents and critical records; custody transfer, receipt and handover',
      'Timestamped entries recording the actor and the authority; tamper-evident ledger with independent verification',
      'Critical-access logging, administrative signatures, encryption in transit and at rest, full audit',
    ],
    demo: 'custody',
    demoLabel: 'Open the governance ledger',
    shownBy: 'A hash-chained ledger in the proposal’s exact six columns, verified to entry 1045 with zero breaks, and a break-glass event that notified and flagged itself.',
    primary: true,
  },
];

// §9 — mobile and offline
export const mobileOffline = {
  section: '§9',
  outcome: 'The system is usable in real healthcare environments, on the devices staff and patients already have, and does not stop working when the network does.',
  delivery: 'Progressive Web Application — reachable on any supported phone, tablet or desktop without an app-store deployment.',
};

// §10 — multi-tenancy
export const tenancy = {
  section: '§10',
  outcome: 'Atunse Health can expand beyond the initial deployment without replacing the underlying technology.',
  path: ['Single facility', 'Departments', 'Multiple facilities', 'Partner network'],
  current: 'Single facility',
  currentTenant: 'atunse-lagos-01 — ADDSB Programme, Lekki',
  detail:
    'The programme runs today as one tenant. The same platform carries additional units, locations and partner organisations on shared infrastructure with isolated data — so a second site, or KweHealth as a partner tenant with its own boundary, is a configuration rather than a rebuild.',
  isolation: [
    'Data isolated per tenant; no cross-tenant query path exists in the data layer',
    'Roles, protocols and service catalogues configured per tenant',
    'Protocols publishable across tenants under the same version and approval control',
    'Tenant isolation verified as a distinct test in Phase II, weeks 10–11',
  ],
};

// §11 — the continuous operating cycle
export const operatingCycle = [
  'Patient', 'Registration & consent', 'Booking', 'EMR', 'Protocol',
  'Clinical execution', 'Billing', 'Follow-up', 'Governance & audit', 'Data',
  'AI & intelligence', 'Workflow improvement', 'Better care',
];

// §12 — responsibilities
export const responsibilities = {
  atunse: [
    'Clinical expertise, protocols and clinical governance',
    'Operational requirements and institutional knowledge',
    'Data required for migration',
    'UAT participation and clinical decision authority',
    'Strategic direction',
  ],
  farawa: [
    'Technology architecture and product engineering',
    'Platform development, deployment and infrastructure',
    'Security, AI enablement and migration implementation',
    'Technical support and platform maintenance',
    'Continuous product evolution',
  ],
};

// §13 — delivery timeline
export const phaseOne = [
  { week: '01', focus: 'Foundation & Architecture', deliverables: 'Production architecture, environments, database/data model, tenancy structure, authentication/RBAC, security baseline, CI/CD, core UX shell', gate: 'Architecture and environment approved' },
  { week: '02', focus: 'Patient Foundation', deliverables: 'Patient identity, registration, demographics, documents, duplicate detection, longitudinal record structure, consent foundation', gate: 'Patient record can be created and managed end-to-end' },
  { week: '03', focus: 'EMR & Clinical Care', deliverables: 'Encounters, notes, diagnoses, allergies, medications, vitals, investigations, attachments, clinical forms, audit trail', gate: 'Core clinical workflow operational' },
  { week: '04', focus: 'Protocol Engine', deliverables: 'Protocol structures, versioning, approval workflow, protocol-linked forms, tasks, prompts, deviations, exception capture', gate: 'First agreed Atunse protocol executable' },
  { week: '05', focus: 'CRM, Booking, Ogami, Billing & Administration', deliverables: 'CRM, enquiry capture, patient/prospect profiles, booking, scheduling, reminders, follow-up, Ogami integration, services/tariffs, charge capture, invoicing, receipts, payments, balances, reconciliation, staff, facilities, institutions, permissions', gate: 'Enquiry → booking → patient journey operational; care → charge → payment workflow operational' },
  { week: '06', focus: 'Trust, Data Migration, Mobile, Integration, UAT & Go-Live', deliverables: 'Consent, chain of custody, governance ledger, blockchain-backed verification, migration pipeline, PWA, offline workflows, synchronisation, full lifecycle integration, security testing, migration validation, UAT, defect resolution, training, production deployment', gate: 'Integrated system passes technical integration testing · Production Go-Live' },
];

export const phaseTwo = [
  { weeks: '07–08', title: 'Controlled Production', objective: 'Stabilise the live environment', items: ['Controlled production usage begins', 'Existing patient data monitored for integrity', 'Registration and patient identification monitored', 'Clinical workflows observed', 'Scheduling and CRM workflows monitored', 'Billing/revenue capture reconciled against actual activity', 'User support desk activated', 'Daily technical monitoring', 'Critical defects prioritised and resolved', 'Workflow friction documented'], gate: 'Core patient lifecycle operates reliably in production' },
  { weeks: '08–09', title: 'Workflow Validation', objective: 'Validate the system against real Atunse operations — from “does the software work?” to “does the organisation work better with it?”', items: ['Clinical workflow optimisation', 'Protocol execution review', 'Protocol deviation analysis', 'Booking/no-show analysis', 'CRM and Ogami enquiry conversion review', 'Billing leakage/reconciliation review', 'Consent and governance verification', 'Mobile/PWA performance testing', 'Offline workflow validation', 'Data quality review', 'Role and permission refinement'], gate: 'Major operational workflows validated and tuned' },
  { weeks: '09–10', title: 'Performance & Intelligence', objective: 'Move from functional system to operational intelligence', items: ['Protocol adherence reporting', 'Clinical/operational dashboards', 'Revenue and billing analytics', 'Patient journey analytics', 'Appointment and engagement analytics', 'Data-quality monitoring', 'AI insight generation', 'Exception identification', 'Management reporting', 'Security and audit review'], gate: 'Management can see what is happening across the operating environment and act on it' },
  { weeks: '10–11', title: 'Scale & Resilience Testing', objective: 'Test whether the platform is ready to become institutional infrastructure', items: ['Increased user-load testing', 'Multi-location readiness testing', 'Tenant isolation verification', 'Disaster recovery testing', 'Backup/restore validation', 'Security review', 'Audit-log verification', 'Chain-of-custody verification', 'Offline/online reconciliation testing', 'Migration/reconciliation procedures tested', 'Failure scenarios and recovery procedures'], gate: 'Platform demonstrates operational resilience beyond the initial facility' },
  { weeks: '11–12', title: 'Institutionalisation & Handover', objective: 'Convert the project into a managed operating platform', items: ['Final production audit', 'Outstanding defect closure', 'Final data reconciliation', 'SOP validation', 'Administrator training', 'Clinical super-user training', 'Technical documentation', 'Support escalation procedures', 'Monitoring and maintenance procedures', 'Product roadmap for next release', 'Final acceptance review'], gate: 'OPERATIONAL ACCEPTANCE — the system stops being a project being delivered and becomes Atunse Health’s operating infrastructure' },
];

export const nextSteps = [
  { n: '01', title: 'Agreement & NDA', detail: 'Execute the project agreement and NDA to formally establish the engagement, agreed scope, commercial terms, responsibilities and confidentiality obligations.' },
  { n: '02', title: 'Initial Payment', detail: 'Complete the agreed initial project payment to activate the implementation engagement and release the delivery programme.' },
  { n: '03', title: 'Discovery Completion', detail: 'Complete the ongoing discovery and product definition activities, translating the approved technical specification and existing product work into the detailed implementation backlog.' },
  { n: '04', title: 'Technical Implementation', detail: 'Commence the 6-week implementation programme covering engineering, integration, data migration, testing, deployment and production readiness.' },
  { n: '05', title: 'Production Go Live', detail: 'Deploy the agreed initial production environment at the conclusion of the 6-week implementation period, subject to the agreed acceptance and go-live criteria.' },
  { n: '06', title: 'Production Bedding Down', detail: 'Enter the 6-week production bedding-down and optimisation period, during which the platform is monitored, validated in live operations and progressively tuned against actual usage.' },
  { n: '07', title: 'Managed Operations', detail: 'Transition into the ongoing managed platform operating model following completion of the bedding-down period.' },
];

// Points the Background Brief says are Atunse's to decide, not ours to assume.
export const openDecisions = [
  { title: 'Ethics & governance oversight', ask: 'Confirm the ethics/IRB arrangement and who holds sign-off authority at each governance point.', assumedInDemo: 'NHREC/01/01/2026-ATN-04 with the PI holding stopping authority and a four-signature protocol approval board.', why: 'The approval workflow, the SAE recipient list and the break-glass notification chain are all configured from this answer.' },
  { title: 'Data sovereignty & sponsor data-sharing', ask: 'Agree the DPA parameters with KweHealth — what the coded research export contains, and on what cadence.', assumedInDemo: 'Weekly Monday export of a coded dataset with no direct identifiers and study-day-shifted dates.', why: 'It sets the internal boundary between private-care records and coded research data, and what the research view may resolve.' },
  { title: 'Existing-data landscape', ask: 'Understand what patient and clinical records exist today, and in what form, so migration is scoped honestly rather than assumed.', assumedInDemo: '≈1,400 demographic rows plus paper case files; appointment book and lab archive unknown.', why: 'Migration effort, and whether the lab feed is a one-off import or a standing FHIR interface, both depend on it.' },
  { title: 'Roles & access boundaries', ask: 'Confirm the personas and their access limits against how the clinic actually operates day to day.', assumedInDemo: 'The seven roles in this demo, taken from protocol §3 Table 4 plus administration and caregiver access.', why: 'If one person holds two of these roles in practice, the two-person timeout needs a different rule — and that is a clinical decision, not a technical one.' },
  { title: 'Sponsor product & device inputs', ask: 'Certificates of Analysis, product regulatory status and Kurve ViaNase device documentation as governed system inputs.', assumedInDemo: 'CoA per lot, verified by the custodian; IFU rev. 4.2 filed against the device.', why: 'The platform files and references these; it does not determine regulatory classification — that sits with the sponsor.' },
];
