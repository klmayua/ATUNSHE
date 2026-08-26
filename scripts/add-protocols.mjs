// Spec §5: protocols must include at minimum
//   - Dementia ADDSB Dual-Route (already present, v1.0/1.1/1.2)
//   - General Clinical Assessment
//   - Follow-up / Review
// Inject the two missing protocols as version cards into the Protocol Version
// History screen, using the screen's own card markup so it reads as native.
import { readFileSync, writeFileSync } from 'node:fs';

const ID = '493e368b0526442999f0551c1668b307'; // Protocol Version History
const PATH = `C:/Users/hp/Desktop/KLM2026/ATUNSHE/public/stitch-screens/${ID}.html`;
let h = readFileSync(PATH, 'utf8');

// idempotency guard
if (h.includes('General Clinical Assessment</h3>')) {
  console.log('Protocols already injected.');
  process.exit(0);
}

// Card template: a full-width (xl:col-span-2) active protocol card.
const card = (title, desc) => `
<!-- Injected protocol: ${title} -->
<div class="xl:col-span-2 bg-white rounded border-l-[3px] border-l-status-success border border-border-subtle flex flex-col relative overflow-hidden">
<div class="p-5 border-b border-border-subtle flex justify-between items-start bg-surface-bright">
<div>
<div class="flex items-center gap-3 mb-2">
<h3 class="font-section-title text-section-title text-primary">${title}</h3>
<span class="bg-status-success/10 text-status-success px-2 py-0.5 rounded font-micro-label text-micro-label flex items-center gap-1 border border-status-success/20">
<span class="material-symbols-outlined text-[12px]">check_circle</span> ACTIVE
</span>
</div>
<p class="font-body-default text-body-default text-text-secondary max-w-2xl">${desc}</p>
</div>
</div>
<div class="p-4 flex-1 space-y-3">
<div class="flex justify-between items-center">
<span class="font-micro-label text-micro-label text-text-secondary uppercase">Active Period</span>
<span class="font-body-default text-body-default text-text-secondary">Mar '24 - Present</span>
</div>
</div>
<div class="p-3 border-t border-border-subtle flex gap-2">
<button class="flex-1 bg-transparent border border-border-subtle text-text-secondary font-body-medium text-body-medium py-1.5 rounded hover:bg-surface-variant transition-colors text-center flex justify-center items-center gap-1">
<span class="material-symbols-outlined text-[16px]">visibility</span> View Read-Only
</button>
</div>
</div>
`;

const inject = card(
  'General Clinical Assessment',
  'Standardised first-contact clinical assessment: presenting complaint, vitals, history, risk screening and triage disposition. Baseline for every new encounter.'
) + card(
  'Follow-up / Review',
  'Post-encounter review and continuity-of-care workflow: outcome confirmation, medication adherence, scheduled re-assessment and escalation flags.'
);

// Insert right before "Recent Protocol Activity".
const anchor = '<!-- Quick Timeline / Audit Section -->';
const idx = h.indexOf(anchor);
if (idx === -1) { console.error('Anchor not found'); process.exit(1); }
h = h.slice(0, idx) + inject + '\n' + h.slice(idx);

writeFileSync(PATH, h);
console.log('Injected General Clinical Assessment + Follow-up/Review into Protocol Version History.');
