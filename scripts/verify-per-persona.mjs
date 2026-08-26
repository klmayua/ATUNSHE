// Per-persona verification harness.
// For each persona: load every accessible screen's built HTML in jsdom with that
// persona's session, run the inline (is:inline) script, and assert the resulting
// DOM is correct: not bounced, nav only shows allowed groups, real content present,
// and patient screens show the right record.
import { JSDOM, VirtualConsole } from 'jsdom';
import { readFileSync } from 'fs';
import { PERSONAS } from '../src/data/personas.mjs';
import { screens } from '../src/data/screens.mjs';

const BASE = 'dist/app';
const ORDER_LABELS = ['Overview','Patients','Appointments','Clinical','Protocols','Trust & Governance','Billing','Ogami','Reports','Administration','Mobile'];

function canView(p, g) {
  if (!p) return false;
  if (p.deny && p.deny.includes(g)) return false;
  return p.allow.includes(g);
}

// Which groups does a persona's nav expose?
function expectedNavGroups(p) {
  return ORDER_LABELS.map((label, i) => ({ label, group: ORDER_GROUPS[i] }))
    .filter((x) => canView(p, x.group))
    .map((x) => x.label);
}
const ORDER_GROUPS = ['Dashboards','Patient','Scheduling','Clinical','Protocols','Compliance & Ledgers','Billing & Finance','AI Assistant','Operations & Intelligence','Administration','Mobile'];

let totalPass = 0, totalFail = 0;
const fails = [];

for (const persona of PERSONAS) {
  const session = JSON.stringify({ id: persona.id, name: persona.name, role: persona.role, username: persona.username, initials: persona.initials });
  const accessible = screens.filter((s) => !s.asset && canView(persona, s.group));
  const expectedGroups = expectedNavGroups(persona);

  console.log('\n========================================');
  console.log(`PERSONA: ${persona.name} (${persona.role})  id=${persona.id}`);
  console.log(`  Accessible screens: ${accessible.length}`);
  console.log(`  Expected nav groups: ${expectedGroups.join(', ')}`);
  console.log('----------------------------------------');

  for (const s of accessible) {
    const file = `${BASE}/${s.id}/index.html`;
    let html;
    try { html = readFileSync(file, 'utf8'); } catch (e) { fails.push(`${persona.id}/${s.id}: MISSING built file`); totalFail++; console.log(`  FAIL ${s.title}: built file missing`); continue; }

    const vc = new VirtualConsole();
    let bounceDetected = false;
    let dom;
    try {
      dom = new JSDOM(html, {
        runScripts: 'dangerously',
        virtualConsole: vc,
        url: 'http://localhost/app/' + s.id + '/',
        beforeParse(window) {
          try { window.localStorage.setItem('atunse_demo_session', session); } catch (e) {}
          try {
            window.location.replace = (url) => { bounceDetected = url; };
            window.location.assign = (url) => { bounceDetected = url; };
          } catch (e) {}
        },
      });
    } catch (e) { fails.push(`${persona.id}/${s.id} (${s.title}): jsdom parse error ${e.message}`); totalFail++; console.log(`  FAIL ${s.title}: parse error`); continue; }
    // give scripts a tick
    await new Promise((r) => setTimeout(r, 50));

    const doc = dom.window.document;
    const root = doc.getElementById('root');

    // 1) bounced?
    if (bounceDetected && bounceDetected.indexOf('/app/dashboard/') !== -1) {
      fails.push(`${persona.id}/${s.id} (${s.title}): bounced unexpectedly to ${bounceDetected}`);
      totalFail++; console.log(`  FAIL ${s.title}: bounced to ${bounceDetected}`); continue;
    }

    // 2) real content present?
    const hasShell = root && root.className === 'app-shell';
    const navLinks = [...doc.querySelectorAll('.nav-link')].map((a) => a.textContent.trim());
    const bodyText = (root ? root.textContent : '').replace(/\s+/g, ' ');

    if (!hasShell) { fails.push(`${persona.id}/${s.id} (${s.title}): no app-shell rendered`); totalFail++; console.log(`  FAIL ${s.title}: no app-shell`); continue; }

    // 3) nav only allowed groups
    const forbidden = navLinks.filter((l) => !expectedGroups.includes(l));
    if (forbidden.length) { fails.push(`${persona.id}/${s.id} (${s.title}): nav shows forbidden groups [${forbidden.join(', ')}]`); totalFail++; console.log(`  FAIL ${s.title}: forbidden nav ${forbidden.join(',')}`); continue; }

    // 4) content sanity: each screen should have its title somewhere + a card or chat
    const hasTitle = bodyText.indexOf(s.title) !== -1;
    const hasCardOrChat = doc.querySelector('.card, .chat, .cal') !== null;
    if (!hasTitle || !hasCardOrChat) {
      fails.push(`${persona.id}/${s.id} (${s.title}): content sanity failed (title=${hasTitle}, block=${hasCardOrChat})`);
      totalFail++; console.log(`  FAIL ${s.title}: content sanity (title=${hasTitle}, block=${hasCardOrChat})`); continue;
    }

    // 5) patient record correctness
    let recordNote = '';
    if (s.group === 'Patient') {
      const julietVisible = doc.querySelector('[data-patient="juliet"]') && !doc.querySelector('[data-patient="juliet"]').hidden;
      const aminaVisible = doc.querySelector('[data-patient="amina"]') && !doc.querySelector('[data-patient="amina"]').hidden;
      if (persona.id === 'patient') {
        if (!julietVisible || aminaVisible) { fails.push(`${persona.id}/${s.id}: patient should see Juliet, not Amina`); totalFail++; console.log(`  FAIL ${s.title}: wrong patient record`); continue; }
        recordNote = ' [shows Juliet ATN-000201]';
      } else {
        if (!aminaVisible || julietVisible) { fails.push(`${persona.id}/${s.id}: clinician should see Amina, not Juliet`); totalFail++; console.log(`  FAIL ${s.title}: wrong patient record`); continue; }
        recordNote = ' [shows Amina ATN-000184]';
      }
    }

    totalPass++;
    console.log(`  PASS ${s.title}  (nav: ${navLinks.join('/')})${recordNote}`);
  }

  // Also verify each DENIED group's first screen is NOT rendered as app-shell (RBAC enforcement).
  // jsdom swallows location.replace, so we detect denial by the absence of an app-shell render.
  const denied = screens.filter((s) => !s.asset && !canView(persona, s.group));
  let deniedOk = 0, deniedFail = 0;
  for (const s of denied) {
    const file = `${BASE}/${s.id}/index.html`;
    let html; try { html = readFileSync(file, 'utf8'); } catch { continue; }
    const vc = new VirtualConsole();
    let rendered = false;
    try {
      const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole: vc, url: 'http://localhost/app/' + s.id + '/', beforeParse(window){ try{window.localStorage.setItem('atunse_demo_session', session);}catch(e){} } });
      await new Promise((r) => setTimeout(r, 40));
      const root = dom.window.document.getElementById('root');
      rendered = root && root.className === 'app-shell';
    } catch (e) {}
    if (!rendered) deniedOk++; else { deniedFail++; fails.push(`${persona.id}/${s.id}: DENIED screen WAS rendered (RBAC not enforced)`); }
  }
  console.log(`  RBAC deny check: ${deniedOk} denied screens correctly bounced, ${deniedFail} failed`);
  totalPass += deniedOk; totalFail += deniedFail;
}

console.log('\n========================================');
console.log(`SUMMARY: ${totalPass} passed, ${totalFail} failed`);
if (fails.length) { console.log('\nFAILURES:'); fails.forEach((f) => console.log('  - ' + f)); }
process.exit(fails.length ? 1 : 0);
