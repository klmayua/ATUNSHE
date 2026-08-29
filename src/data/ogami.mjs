// ---------------------------------------------------------------------------
// OGAMI — the digital front office (EMR Proposal §5).
//
// Atunse Health is a provisioned OGAMI client:
//   slug        atunse-health
//   public key  pk_live_atunse-health          (identifier, not a secret —
//               it is designed to ride in a public <script data-key>)
//   tier        free · 100 conversations/month · light model
//
// The chat below posts to the live OgaChat endpoint with that key. OGAMI
// resolves the client server-side and answers from the business profile held
// against it — the same profile that drives their WhatsApp channel, so the
// web and WhatsApp front doors cannot drift apart.
//
// FALLBACK. If the endpoint is unreachable, rate-limited, or the engine is
// degraded, the widget answers from `fallback` below instead of dying. That
// is not decoration: OGAMI's own route comment says "the conversation must
// never break mid-demo", and a front office that goes blank in front of a
// board is worse than one that is honestly limited. The fallback answers are
// written from the SAME profile that is stored against the client record, so
// live and degraded modes say the same things.
// ---------------------------------------------------------------------------

export const ogamiConfig = {
  endpoint: 'https://ogamy.co/api/ogachat',
  publicKey: 'pk_live_atunse-health',
  slug: 'atunse-health',
  widget: 'https://ogamy.co/widget.js',
  tier: 'Free · 100 conversations/month',
  provisioned: '29 Aug 2026',
  state: 'unclaimed — transfers to Atunse on signature',
};

export const ogamiGreeting =
  'Good morning. I am Ogami, the Atunse Health front desk. I can explain the programme, tell you what happens at a visit, and book a screening assessment. Anything clinical I pass straight to the team.';

// The boundaries configured against the client record, restated for the UI so
// a decision maker can see what the assistant is not allowed to do.
export const ogamiBoundaries = [
  { can: true, text: 'Explains the programme, what happens at each visit, hours, location and the follow-up schedule — from the approved Patient Information Sheet, never from open-web content.' },
  { can: true, text: 'Books, moves and confirms a screening assessment against real availability, writing into the same schedule the clinic uses.' },
  { can: true, text: 'Hands off to a named human — the Study Coordinator — for fees, clinical judgement, or a distressed caller.' },
  { can: false, text: 'Never states or implies the treatment works. It is investigational, and if pressed the assistant says so plainly.' },
  { can: false, text: 'Never decides or predicts eligibility. That is the supervising physician’s determination after a screening assessment.' },
  { can: false, text: 'Never interprets a test result, a score or a symptom, and never discusses dose or medication changes.' },
  { can: false, text: 'Never records a symptom, a consent or an adverse event as a clinical entry. It can raise a flag; only a clinician makes the record.' },
];

// Keyword-routed fallback. Ordered — first match wins, `null` match is default.
export const fallback = [
  {
    match: /\b(work|works|working|cure|cured|effective|efficacy|help(s|ed)?|success|results?)\b/i,
    reply:
      'I have to be straight with you: this is an investigational programme. That means it has not been proven to work, and it is not a cure. It is delivered under a clinical protocol with close medical supervision, and the doctors monitor safety carefully — but I am not able to promise you any result, and I would not want to. The supervising physician will explain honestly what is and is not known before anyone decides anything.',
  },
  {
    match: /\b(eligib|qualify|qualifie|suitable|can (she|he|my|i) (join|enrol|enroll)|accepted)\b/i,
    reply:
      'The programme is for adults with a documented diagnosis of dementia or progressive cognitive decline, who have a caregiver able to support monitoring and follow-up, and who can attend the visits. There are also medical reasons someone may not be suitable.\n\nWhether a particular person is eligible is decided by the supervising physician after a screening assessment — I genuinely cannot decide that here, and I would rather not guess at it. What I can do is book the assessment. Would you like me to?',
  },
  {
    match: /\b(book|appointment|schedule|screening|assessment|slot|visit soon)\b/i,
    reply:
      'I can book a screening assessment. It takes about two hours and covers a review of the diagnosis and medicines, a physical and neurological examination, memory and daily-living assessments, a nasal examination, and baseline blood and biomarker tests. A caregiver or family member should come too.\n\nWe have Thursday at 10:00 or Friday at 14:00 this week. Which suits you better?',
  },
  {
    match: /\b(cost|price|fee|how much|charge|pay|payment|instal)\b/i,
    reply:
      'The screening assessment is charged separately, and the full six-session course is quoted at that visit once eligibility is established — it depends on whether the optional hormone workup is included. Instalment plans are available, and we take transfer, card and cash.\n\nI am not able to quote course prices here. Let me connect you to Ngozi Aluko, our Study Coordinator, who can give you the current schedule of fees directly.',
  },
  {
    match: /\b(session|treatment day|what happens|expect|procedure|how long|infusion|drip|nasal)\b/i,
    reply:
      'Check-in and observations take about 20 minutes. Then two members of staff independently run a safety check — one person cannot do it alone. Then the intravenous dose, given slowly over 10 to 15 minutes, followed by the intranasal dose.\n\nAfterwards you are monitored here for two hours, with checks at 15, 30, 60 and 120 minutes. Plan for about three hours in total, and please bring someone with you.',
  },
  {
    match: /\b(safe|safety|side.?effect|risk|adverse|reaction|danger)\b/i,
    reply:
      'Every side effect is recorded and reviewed by the physician, however small. The ones seen so far have been mild — dizziness, headache, some nasal irritation — and settled on their own.\n\nThere are also serious risks, and the doctor goes through those with you in detail during consent rather than in a chat window. If anything concerning happens during a session there are rules that stop the treatment immediately.',
  },
  {
    match: /\b(how many|six|sessions?|weeks?|course|follow.?up|after)\b/i,
    reply:
      'Six sessions, one a week for six weeks. After the course finishes there are follow-up visits at 4, 8 and 12 weeks, and again at 6 and 12 months. Those are booked automatically and we remind you before each one.',
  },
  {
    match: /\b(hours?|open|closed|when are you|location|where|address|find you)\b/i,
    reply:
      'We are in Lekki, Lagos — the Neurotherapeutics Suite. Open Monday to Saturday, 8am to 6pm. Treatment sessions run in the morning. Would you like directions sent to this number?',
  },
  {
    match: /\b(stop|withdraw|quit|change my mind|opt out|consent)\b/i,
    reply:
      'You can withdraw at any time, without giving a reason, and it will not affect the ordinary care you receive from us. Consent is checked at the start of every single visit — if it were ever not in force, the visit would stop before it began. You can also withdraw from just one part, such as the research data sharing, and continue treatment.',
  },
  {
    match: /\b(breath|swelling|rash|faint|chest pain|dizzy|confus|seizure|fit|bleed|nosebleed|fever|emergency|urgent)\b/i,
    reply:
      'Please call the clinic straight away on 0800 000 0000 — do not wait for me. If it is severe, use the emergency number 0800 000 0001 or go to the nearest emergency department.\n\nI am not able to assess symptoms, and I do not want to slow you down. I have flagged this conversation to the clinical team.',
    urgent: true,
  },
  {
    match: /\b(human|person|someone|speak to|talk to|coordinator|doctor|nurse)\b/i,
    reply:
      'Of course. I am passing you to Ngozi Aluko, our Study Coordinator. She will pick this up shortly — and everything you have told me here goes with you, so you will not have to repeat yourself.',
    handoff: true,
  },
  {
    match: null,
    reply:
      'Thank you. I can help with what the programme involves, what happens at a visit, our hours and location, and booking a screening assessment. For anything clinical — whether it is right for a particular person, results, or symptoms — I will pass you to the team rather than guess.\n\nWhat would be most useful?',
  },
];

export function fallbackReply(message) {
  const m = String(message || '');
  for (const f of fallback) {
    if (f.match === null) return f;
    if (f.match.test(m)) return f;
  }
  return fallback[fallback.length - 1];
}
