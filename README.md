# Atunse Health — Protocol Platform (demonstration)

A working demonstration of the Atunse Health EMR, built around **one real protocol**:
`ATN-DEM-ADDSB-2026-001` — the standardised dual-route ADDSB regimen in dementia, v1.0,
effective 29 June 2026 — with its nine working forms, seven stopping rules and four
reporting clocks executing as the system itself.

Prepared for Atunse Health leadership against the *High-Level Technical Proposal* and the
*Background Brief*. All patient data is fabricated.

---

## The premise

The proposal's central claim (§4) is that clinical protocols *"stop being documents and
institutional memory, and become active, executable components of daily care that do not
leave when staff do."*

This demo makes that claim inspectable. The protocol is not a page you can read — it is the
machine the clinic runs on. Today, three of the cohort are stopped by it:

| Patient | What the engine is doing | Clause enforced |
|---|---|---|
| **ATN-0004** | Session 4 running, paused at the two-person timeout with one of two signatures | §5.2 C |
| **ATN-0003** | Session 3 held at Gate A — intranasal lot quarantined after a cold-chain excursion | §5.2 A · Appendix E |
| **ATN-0005** | Session 1 held at Gate B — consent suspended by a capacity re-assessment | §5.2 B · consent & capacity |
| **ATN-0002** | Course halted since 12 Aug — a stopping rule fired and an SAE clock ran | §6.3 |

None of these was a person noticing something. Each is a gate that would not close.

## What the engine holds

Derived at build time from `src/data/protocol.mjs`, and asserted by the verifier so the
prose can never drift from it:

- **6 gates** (§5.2 A–E, §5.3) — each owned by a named role from the protocol's own
  responsibilities table
- **42 blocking checks**, each carrying the clause it enforces and whether it is
  *system-asserted* (consent state, cold chain, thaw window, lot identity) or *operator-judged*
- **7 required signatures** per treatment day, including a two-person timeout the platform
  will not let one person satisfy
- **7 stopping rules** (§6.3 Table 7) with their halt scope and SAE consequence
- **4 reporting clocks** that start at recorded event onset, not at form-open
- **Appendices A–I** bound to the gates that produce them

## Roles

Eight roles — six from protocol §3 Table 4, plus administration and the two patient-side
roles the proposal's §3 requires. Not invented personas: each role's permissions follow from
the duties the protocol assigns it, because separation of duties is a clinical requirement
before it is an interface choice.

| Role | Sign in as | Lands on |
|---|---|---|
| Principal Investigator — Dr. Folasade Sola | `f.sola` | Command centre |
| Clinic Nurse — Amaka Bello | `a.bello` | Command centre |
| Pharmacist / Product Custodian — Tunde Ilesanmi | `t.ilesanmi` | Product & cold chain |
| ViaNase™ Device Operator — Chidi Nwosu | `c.nwosu` | Device log |
| Study Coordinator — Ngozi Aluko | `n.aluko` | Consent register |
| Facility Administrator — Adaora Eze | `a.eze` | Command centre |
| **Patient — Mrs. Comfort Eze (ATN-0008)** | `c.eze` | My care |
| Caregiver — Mrs. Bisi Adewale | `b.adewale` | Daily diary |

Password for all: `demo`. Or just click a role on the landing page.

### The patient side

§3 of the proposal says the record is *patient-driven* — "the patient participates in their
own record rather than being a passive subject of it." The patient portal therefore does five
things rather than describing them: she reads her own record and released results, sees and
prepares for her visits, **reports her own symptoms and outcomes into the clinical record**
(they are read at Gate B before the physician decides it is safe to treat), and holds and
changes her own consent purpose by purpose. Plain language throughout, and the one thing that
went wrong in her course is shown to her, not hidden.

**Access control is resolved at build time.** Every page is generated per role, so a section a
role may not see is not rendered, not linked, and *has no route*. The Facility Administrator
has no clinical record pages at all — not a hidden menu, no page. `npm run verify` asserts this.

## Four things worth clicking

1. **`/nurse/session/`** → Gate C → *Sign as N. Bello*. The platform refuses: Nurse Bello is
   already the verifier, and §5.2 C requires an independent second person. It compares
   authenticated identities, not initials on paper.
2. **`/pharmacist/product/`** — the cold-chain excursion that is holding a session, and the
   quarantined lot that cannot be released.
3. **`/pi/learning/`** — four insights from execution data. One was **rejected** by clinical
   review and kept with its reasoning; one became protocol v1.1, which is in the approval
   workflow and is *not running*.
4. **`/patient/myconsent/`** then **`/patient/ogami/`** — the patient turning research sharing
   off without touching her treatment, and the assistant declining to tell her whether her
   MMSE score means the treatment is working.

Every command centre closes with a band headed **"What the platform prevented this month"** —
the exposures, the invalid treatment, the late report and the mis-billing that did not happen,
each traceable to the gate that stopped it.

## Mapping to the proposal

`/{role}/architecture/` renders the proposal's own structure — the §1 lifecycle, §2 five
layers, §3–§8 six domains, §10 tenancy path and §11 operating cycle — with every element
linking into the working capability in this build. `/{role}/delivery/` carries the §13
timeline and the five decisions the Background Brief says are Atunse's to make, each shown
with the assumption the demo runs on so the mechanism is visible.

## Build & verify

```bash
npm install
npm run dev        # http://localhost:4321
npm run check      # build + verify
```

`npm run verify` crawls the built output and asserts:

- every internal link resolves to a page that exists
- no page links across a role boundary
- no page links to a section its own role is denied
- every role reaches its declared landing page
- no prose claim about gate, check or signature counts contradicts the engine

Current: **176 pages · 3,336 internal links · 0 problems.**

## Layout

```
src/data/protocol.mjs      the executable protocol — gates, checks, stopping rules, clocks
src/data/appendices.mjs    Appendices A–I as structured, gate-bound form definitions
src/data/cohort.mjs        8 patients, each at a different point in the protocol
src/data/roles.mjs         the 8 roles + RBAC, from protocol §3 Table 4
src/data/trust.mjs         consent state, hash-chained custody ledger, ALCOA+ audit
src/data/inventory.mjs     lots, cold chain, thaw windows, device log
src/data/safety.mjs        AE/SAE register with clocks, deviations with reason codes
src/data/ops.mjs           CRM/Ogami, billing, people, analytics, learning loop, offline scope
src/data/platform.mjs      the proposal's architecture, made navigable
src/data/value.mjs         what the platform prevented, and the dashboard trend series
src/data/nav.mjs           role-filtered navigation
src/components/Spark.astro  inline SVG trend chart with threshold rule
src/components/sections/   one component per capability area
src/pages/[role]/          per-role static generation (this is the access control)
scripts/verify.mjs         build verifier
docs_full/                 extracted source documents this build was written from
```

## Deploy

Static Astro. Vercel auto-detects it; `npm run build` emits `dist/`.

---

Technology. Products. Systems. Built for Continuity. · Confidential
