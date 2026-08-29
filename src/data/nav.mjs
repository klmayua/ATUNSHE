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
