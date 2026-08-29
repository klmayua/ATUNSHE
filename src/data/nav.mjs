// ---------------------------------------------------------------------------
// NAVIGATION — role-filtered, server-rendered.
//
// Routes are /{roleId}/{section}. Because every page is generated per role,
// access control is resolved at build time rather than hidden client-side:
// a section a role may not see is not rendered, not linked, and has no page.
// ---------------------------------------------------------------------------

export const SECTIONS = [
  { key: 'command', label: 'Command centre', group: 'Today', blurb: 'What is running, what is held, what needs a decision' },
  { key: 'schedule', label: 'Chairs & schedule', group: 'Today', blurb: 'Today’s sessions and the week ahead' },

  { key: 'cohort', label: 'Cohort', group: 'Clinical', blurb: 'All eight patients and where each sits in the protocol' },
  { key: 'session', label: 'Treatment day', group: 'Clinical', blurb: 'The live protocol runner' },
  { key: 'safety', label: 'Safety & events', group: 'Clinical', blurb: 'AE/SAE register with reporting clocks, deviations, stopping rules' },

  { key: 'protocols', label: 'Protocol registry', group: 'Protocol', blurb: 'Versions, approval state, executable definition' },
  { key: 'forms', label: 'Working forms', group: 'Protocol', blurb: 'Appendices A–I bound to gates' },
  { key: 'learning', label: 'Learning loop', group: 'Protocol', blurb: 'Protocol → execution → data → AI → human review → improvement' },
  { key: 'analytics', label: 'Protocol analytics', group: 'Protocol', blurb: 'Adherence by gate, drift, deviation reason codes' },

  { key: 'product', label: 'Product & cold chain', group: 'Custody', blurb: 'Lots, CoA, temperature, thaw windows, reconciliation' },
  { key: 'device', label: 'ViaNase™ device', group: 'Custody', blurb: 'Performance checks, use record, cleaning, malfunction' },

  { key: 'consent', label: 'Consent register', group: 'Trust', blurb: 'Consent as live state, versions, LAR, withdrawal' },
  { key: 'custody', label: 'Governance ledger', group: 'Trust', blurb: 'Hash-chained chain of custody' },
  { key: 'audit', label: 'Audit & data governance', group: 'Trust', blurb: 'ALCOA+ trail, break-glass, residency, sponsor export' },

  { key: 'crm', label: 'Enquiries & Ogami', group: 'Operations', blurb: 'Funnel, conversations, engagement' },
  { key: 'billing', label: 'Billing & revenue', group: 'Operations', blurb: 'Charge capture bound to delivered care' },
  { key: 'people', label: 'People & institutions', group: 'Operations', blurb: 'Credentials, training, partners' },
  { key: 'mobile', label: 'Mobile & offline', group: 'Operations', blurb: 'What may go offline, and what may not' },

  { key: 'architecture', label: 'Platform architecture', group: 'Programme', blurb: 'Layers, domains, lifecycle, tenancy' },
  { key: 'delivery', label: 'Delivery plan', group: 'Programme', blurb: '6-week build, 6-week bedding-down, open decisions' },

  { key: 'portal', label: 'My care', group: 'My care', blurb: 'Where I am in the course and what happens next' },
  { key: 'myvisits', label: 'My visits', group: 'My care', blurb: 'Past and upcoming visits, reminders, instructions' },
  { key: 'myrecord', label: 'My record', group: 'My care', blurb: 'Results, medicines and my whole history' },
  { key: 'mysymptoms', label: 'How I am feeling', group: 'My care', blurb: 'Before each visit, in my own words' },
  { key: 'myconsent', label: 'My consent & choices', group: 'My care', blurb: 'What I agreed to, and changing my mind' },
  { key: 'diary', label: 'Daily diary', group: 'My care', blurb: 'Record how the day went' },
  { key: 'ogami', label: 'Ask Ogami', group: 'My care', blurb: 'Questions, appointments, guidance' },
];

export const SECTION_BY_KEY = Object.fromEntries(SECTIONS.map((s) => [s.key, s]));

const GROUP_ORDER = ['Today', 'Clinical', 'Protocol', 'Custody', 'Trust', 'Operations', 'Programme', 'My care'];

/** Sections this role may reach, grouped for the sidebar. */
export function navFor(role) {
  if (!role) return [];
  const allowed = SECTIONS.filter((s) => role.allow.includes(s.key));
  return GROUP_ORDER.map((g) => ({
    group: g,
    items: allowed.filter((s) => s.group === g).map((s) => ({ ...s, href: `/${role.id}/${s.key}/` })),
  })).filter((g) => g.items.length);
}

/** Flat list of buildable {role, section} pairs for getStaticPaths. */
export function rolePages(roles) {
  const out = [];
  for (const r of roles) {
    for (const s of SECTIONS) {
      if (r.allow.includes(s.key)) out.push({ role: r, section: s });
    }
  }
  return out;
}

export function sectionTitle(key) {
  return SECTION_BY_KEY[key] ? SECTION_BY_KEY[key].label : key;
}

// ---------------------------------------------------------------------------
// MOBILE — bottom navigation.
//
// A phone gets five slots, not twenty-two. Four destinations chosen per role
// (the ones that role actually opens during a shift) plus "More", which lifts
// the full role-filtered nav in a sheet. The four are deliberately different
// per role for the same reason the dashboards are.
// ---------------------------------------------------------------------------

export const MOBILE_PRIMARY = {
  pi:            ['command', 'session', 'cohort', 'safety'],
  attending:     ['command', 'session', 'cohort', 'safety'],
  nurse:         ['command', 'session', 'cohort', 'safety'],
  pharmacist:    ['product', 'session', 'device', 'command'],
  operator:      ['device', 'session', 'cohort', 'command'],
  coordinator:   ['command', 'consent', 'forms', 'cohort'],
  administrator: ['command', 'people', 'billing', 'schedule'],
  patient:       ['portal', 'myvisits', 'mysymptoms', 'myrecord'],
  caregiver:     ['diary', 'portal', 'ogami'],
};

// Compact labels — a bottom-nav label has about ten characters before it wraps.
export const MOBILE_LABEL = {
  command: 'Today',
  session: 'Treatment',
  cohort: 'Patients',
  safety: 'Safety',
  product: 'Product',
  device: 'Device',
  consent: 'Consent',
  forms: 'Forms',
  people: 'People',
  billing: 'Billing',
  schedule: 'Schedule',
  portal: 'My care',
  myvisits: 'Visits',
  mysymptoms: 'How I am',
  myrecord: 'Record',
  myconsent: 'Consent',
  diary: 'Diary',
  ogami: 'Ogami',
  protocols: 'Protocol',
  custody: 'Ledger',
  audit: 'Audit',
  crm: 'Enquiries',
  learning: 'Learning',
  analytics: 'Analytics',
  mobile: 'Offline',
  architecture: 'Platform',
  delivery: 'Delivery',
};

// 24×24 stroke icons, drawn inline so the bar costs no extra request.
export const ICONS = {
  command: 'M3 12h4l3-8 4 16 3-8h4',
  session: 'M12 3v18M5 8h14M7 13h10M9 18h6',
  cohort: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 20a6 6 0 0 1 12 0M17 11a3 3 0 1 0 0-6M16 20a6 6 0 0 1 6-6',
  safety: 'M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6l-8-3ZM12 8v5M12 16h.01',
  product: 'M4 7 12 3l8 4v10l-8 4-8-4V7ZM4 7l8 4 8-4M12 11v10',
  device: 'M12 3c-3 0-5 2-5 5v4l-2 4h14l-2-4V8c0-3-2-5-5-5ZM9 20h6',
  consent: 'M6 3h9l4 4v14H6V3ZM14 3v5h5M9 14l2 2 4-4',
  forms: 'M6 3h12v18H6V3ZM9 8h6M9 12h6M9 16h3',
  people: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3 20a6 6 0 0 1 12 0M17 6h4M19 4v4M15 20a6 6 0 0 1 3-5',
  billing: 'M3 6h18v12H3V6ZM3 10h18M7 15h3',
  schedule: 'M4 5h16v16H4V5ZM4 9h16M9 3v4M15 3v4M8 13h3M8 17h3',
  portal: 'M4 11 12 4l8 7v9H4v-9ZM10 20v-6h4v6',
  myvisits: 'M4 5h16v16H4V5ZM4 9h16M9 3v4M15 3v4M12 13v4M10 15h4',
  mysymptoms: 'M12 20s-7-4.5-7-9.5A4 4 0 0 1 12 7a4 4 0 0 1 7 3.5C19 15.5 12 20 12 20Z',
  myrecord: 'M6 3h9l4 4v14H6V3ZM14 3v5h5M9 13h6M9 17h4',
  diary: 'M5 4h13a1 1 0 0 1 1 1v15H6a1 1 0 0 1-1-1V4ZM5 16h14M9 8h6',
  ogami: 'M4 5h16v11H9l-5 4V5ZM9 10h.01M12 10h.01M15 10h.01',
  more: 'M4 7h16M4 12h16M4 17h16',
};

/** The five bottom-nav entries for a role: four primary, then More. */
export function mobileNavFor(role) {
  if (!role) return [];
  const keys = (MOBILE_PRIMARY[role.id] || []).filter((k) => role.allow.includes(k));
  return keys.map((k) => ({
    key: k,
    label: MOBILE_LABEL[k] || SECTION_BY_KEY[k]?.label || k,
    href: `/${role.id}/${k}/`,
    icon: ICONS[k] || ICONS.more,
  }));
}
