# Construction Lifecycle — Developer's Guide

**Purpose:** Help the development team understand how a building actually gets built in Bangladesh — what happens manually today, what AbcERP automates, and why the client will care.

**Audience:** Engineers, designers, and QA who need domain context for building and demoing AbcERP.

**Prerequisite:** Read `01-land-evaluation-explained.md` first — land is approved, project is about to start.

---

## Phase 0: Project Setup (Before Any Brick Is Laid)

### What happens in real life today:

The land deal is done. Now the boss calls the PM and says "start the Gulshan project." The PM opens a fresh Excel file, types the project name, and starts a new folder on his laptop. The feasibility study that was done 3 months ago? It's in someone else's laptop — a Word document. The pre-development expenses (BDT 8.4M spent on soil testing, legal fees, survey costs)? Nobody knows the exact total. It's scattered across 15 vouchers in the accounts department.

The PM starts from scratch. He calls the architect for the building design, guesses at budget based on "last project," and starts hiring contractors through his phone contacts.

### What AbcERP does instead:

When the land evaluation is approved and acquisition is complete, the system offers **[Create Project]**. One click:

- Project auto-inherits: land info, approved feasibility (locked V3), all 37 documents, risk register, JV terms, 2 open conditions from the CEO's conditional approval
- Pre-dev costs: system shows exact total (BDT 8.4M) pulled from posted GL entries. PM chooses: transfer to project WIP or keep as corporate expense
- Project code auto-generated per numbering rules (e.g., GR-2026-01)
- Cost Center and Profit Center created or linked
- PM doesn't re-enter a single thing that was already captured during land evaluation

### Who benefits and why they'll care:

| Person | Pain Today | After AbcERP |
|---|---|---|
| PM | "I don't know what was agreed during the land evaluation" | All feasibility data, conditions, and documents carry forward automatically |
| CFO | "How much did we spend before this project even existed?" | Pre-dev costs tracked to the taka, with GL trail |
| CEO | "Are we honoring the conditions I set during approval?" | Open conditions visible in project workspace, tracked to closure |

---

### What happens next: Planning

The PM, Project Director, and QS sit together (usually in a meeting room with printouts of the architectural drawing) and define three things.

### 1. Building Structure

Today: The PM draws this on paper or keeps it in his head. There's no digital record of "Tower A has 14 floors, 52 units, 40 parking spaces."

After AbcERP: Defined once in the system. Every unit gets a record. Sales team can immediately see inventory. Finance knows how many units to track revenue against.

```
Gulshan Residence
├── Tower A (14 floors)
│   ├── Ground Floor: Commercial (4 shops)
│   ├── Floor 1-10: Residential (4 flats/floor = 40 flats)
│   └── Floor 11-14: Penthouse (2 units/floor = 8 units)
└── Common Areas
    ├── Basement Parking (40 spaces)
    ├── Lift Lobby
    └── External Works
```

### 2. WBS — Work Breakdown Structure

Today: Nobody has a WBS. They think in "phases" — "first we do foundation, then structure, then finishing." But they don't break it down further. So when someone asks "how much did we spend on plumbing in Tower A?", nobody can answer.

After AbcERP: The PM builds a WBS tree. Every cost, every material, every contractor bill hangs on a WBS node. This is what makes cost tracking possible.

```
Gulshan Residence
├── Tower A
│   ├── Foundation
│   │   ├── Earthwork
│   │   ├── Piling
│   │   └── RCC Foundation
│   ├── Structure
│   │   ├── Columns, Beams, Slabs, Stairs
│   ├── MEP
│   │   ├── Electrical, Plumbing, Fire, HVAC
│   ├── Finishing
│   │   ├── Plastering, Tiling, Painting, Doors & Windows
│   └── External
│       ├── Boundary Wall, Roads, Landscaping
```

**Who benefits:**

| Person | Pain Today | After AbcERP |
|---|---|---|
| PM | "I know total project cost but not cost per activity" | WBS lets you track cost at any level — by tower, by floor, by trade |
| Director | "Why did Foundation cost more than estimated?" | Drill from Project → Foundation → Piling → specific BOQ items |
| CFO | "I can't split costs between JV landowner's share and ours" | WBS + dimensions enable any cost slice |

---

### 3. BOQ — Bill of Quantities

This is the **most important process you're automating.** Today it's the biggest Excel file in the company.

#### What the QS does today:

The Quantity Surveyor (QS) — the most important person in cost control — opens Excel. He goes line by line through the architectural and structural drawings. For each item (columns, beams, tiles, paint), he:

1. Calculates quantity from drawings (manually, on paper, with a calculator)
2. Looks up rate from memory, or calls a supplier, or uses "last project's rate"
3. Enters into Excel

This takes **2-4 weeks** for a new project. The Excel file ends up being 500-2,000 rows. There's no version control. Three copies float around. Someone edits Row 347 and doesn't tell anyone. The QS's "master file" is on his personal laptop.

When the BOQ is "approved" (boss looks at the total number and says OK), there's no formal lock. People keep editing it throughout the project. At project end, nobody knows what the original estimate was.

#### What AbcERP does:

| Step | Today (Manual) | AbcERP (System) |
|---|---|---|
| Calculate quantities | Paper + calculator | Measurement sheets with formulas (Nos x L x W x H) |
| Look up rates | Memory / phone call / old Excel | Rate Analysis engine: Material + Labour + Equipment + Overhead. Rates pulled from latest PO, company average, historical |
| Enter BOQ | Excel rows | Structured entry: WBS + Cost Code + Item + Qty + Rate. Each line maps to a GL account |
| Version control | None. People edit freely | Baseline locked at approval (V1). ALL changes via Variation Orders |
| Budget | Separate Excel | Auto-generated from approved BOQ. One-click. |
| Variance tracking | Manual comparison months later | Real-time: BOQ Amount vs Actual Amount. Alerts at >10% |

#### Example — how a BOQ line works end-to-end:

```
BOQ Line: RCC Column M25
WBS: Tower A > Structure > Columns
Cost Code: STR-RCC → maps to GL Account 5020-01

Measurement Sheet:
  Floor 1-10: 12 columns x 0.45m x 0.45m x 3.0m = 7.29 cum/floor x 10 = 72.9 cum
  Floor 11-14: 12 columns x 0.50m x 0.50m x 3.5m = 10.5 cum/floor x 4 = 42.0 cum
  Total: 114.9 cum

Rate Analysis:
  Materials (cement + sand + stone)  = ৳8,190
  Labour (mason + helper + bender)   = ৳1,800
  Equipment (mixer + vibrator)       = ৳220
  Overhead (5%)                      = ৳511
  Total Rate                         = ৳10,721 per cum

BOQ Amount: 114.9 cum x ৳10,721 = ৳12,318,729

Later during construction:
  Actual: 118.2 cum x ৳11,400 = ৳13,474,800
  Variance: +9.4% ← System shows AMBER warning (approaching 10% threshold)
```

#### Who benefits and the conversation to have:

| Person | What to Say During Demo |
|---|---|
| QS | "Your BOQ Excel — how many versions are floating around? Which one is the master? With this, there's ONE version, and once approved, nobody can change it without a Variation Order." |
| PM | "How do you know if you're over budget right now — today? Not next month when accounts compiles a report. Right now. This screen shows it." |
| Boss | "At project end, you compare feasibility vs actual. But by then it's too late. This tracks variance in real-time — you find out about overruns when they're ৳5 lakh, not when they're ৳5 crore." |

---

## Phase 1: Tendering & Contracts (Hiring Contractors)

### What happens today:

The PM calls 3-4 contractors he knows personally. They come to site, look at the drawings, and quote verbally or on a one-page letter. The PM negotiates over chai. The "contract" is a 2-page letter with rates, signed by both parties. There's no retention clause, no advance recovery schedule, no TDS tracking. When a dispute arises, there's nothing written down.

The PM picks the contractor based on **relationship and gut feeling**, not a systematic evaluation.

### What AbcERP does:

```
Today's Process:              AbcERP Process:

Phone 3-4 contractors    →    Create Tender from BOQ work package
                               (scope pre-filled from BOQ items)

Verbal/letter quotes     →    Contractors submit bids with
                               line-level rates

PM decides over chai     →    Comparative Statement:
                               side-by-side price comparison
                               + quality score + past history
                               + rate vs BOQ estimate vs market

Handshake agreement      →    Formal Contract with terms:
                               Item Rate / Lump Sum
                               Retention %, Advance %, TDS %
                               Payment terms, scope, timeline

No record of rates       →    Rate Intelligence:
                               "This contractor's rate for
                               RCC work is ৳8,200/cum.
                               Company average is ৳8,500.
                               Last project was ৳7,800.
                               Market is trending up 3%."
```

### Who benefits:

| Person | Pain Today | After AbcERP | What to Say |
|---|---|---|---|
| PM | "I don't remember what we paid for plumbing on the last project" | Rate Intelligence shows historical rates, trends, and contractor comparison | "This rate column — see? Last 3 projects, Alam charged ৳7,800, ৳8,200, ৳8,500. He's going up. Karim has been stable at ৳7,600." |
| CFO | "I find out about contract commitments months after they're signed" | Commitment registered at contract signing — shows as "committed" in budget | "Right now, your budget shows Spent + Available. But what about contracts already signed but not yet billed? That's missing. This adds 'Committed' — so you see the real picture." |
| Boss | "We always use the same 3 contractors, never compare properly" | Comparative Statement forces structured evaluation | "When 4 contractors bid, who's cheapest? Who's most reliable? This screen puts them side by side. No more decisions based on who played golf with whom." |

---

## Phase 2: Daily Site Operations & DSR

### What happens today:

The site engineer manages a construction site with 80-100 workers, 5-6 contractors, heavy equipment, and dangerous conditions — **with a paper notebook and WhatsApp.**

His "daily report" is either:
- A notebook entry that nobody reads
- A WhatsApp message to the PM: "work going on, 22 masons came, mixer is broken"
- Nothing at all (most common)

The PM calls the site at 5pm: "How did today go?" The engineer says "Fine, sir." The PM has no visibility into what's actually happening unless he visits the site.

At month-end, when the accountant asks "how many workers were on site this month?", nobody knows. When the PM asks "how much cement did we use?", the store keeper checks his register (if he kept one).

### What AbcERP does:

The DSR (Daily Site Report) is a **5-tab structured form** that captures everything in 15-20 minutes:

| Tab | What They Record | What the System Does With It | Who Was Doing This Before |
|---|---|---|---|
| **1. Manpower** | 22 masons, 35 helpers, 8 bar benders — by trade and contractor | Labour cost allocation, productivity analysis, overtime tracking | Nobody. Or a rough estimate at month-end |
| **2. Equipment** | Crane: 8 hrs running. Mixer: idle (breakdown). Generator: 6 hrs | Equipment utilization %, idle time cost, maintenance alerts | Nobody. Equipment costs are invisible |
| **3. Work Done** | "Column casting Floor 5 — 4 columns completed (progress: 40% → 48%)" | Progress tracking against WBS, earned value for SPI/CPI | PM's gut feeling |
| **4. Issues** | "Rebar spacing incorrect in Col C4" (CRITICAL) | Issue tracker, assigned to contractor, aging tracked | WhatsApp message that gets buried |
| **5. Photos** | 4 site photos with captions | Visual progress evidence, dispute resolution | Phone gallery, never organized |

### What changes for each person:

| Person | Today | After AbcERP | Demo Moment |
|---|---|---|---|
| Site Engineer | Writes in notebook or sends WhatsApp | 15-min structured form, auto-notifies PM + Director | "Show them the 5 tabs. Ask: 'If your engineer doesn't come to work tomorrow, can the replacement know what happened yesterday?'" |
| PM | Calls site daily, gets vague updates | Real-time dashboard: manpower, equipment, work fronts, issues | "You're on the Director Dashboard. It's 4pm. You can see: 77 workers on site, crane running 8 hours, 2 critical issues. Without calling anyone." |
| Director | Learns about problems days or weeks late | Exception-based alerts: critical issues, missed milestones, stock alerts | "This issue — 'Rebar spacing incorrect' — was logged at 2pm. You saw it at 2:01pm. In the old system, when would you find out?" |
| Boss | "Is the site running?" — no quantitative answer | SPI/CPI on CEO dashboard. SPI < 1 = behind schedule. | "SPI is 0.87. That means for every 10 days planned, only 8.7 days of work was actually done. You're 13% behind schedule." |

---

## Phase 3: Material Management

### What happens today:

The store keeper sits in a tin shed at the site entrance with a thick register. When cement arrives, he writes: "200 bags cement received." When the mason needs cement, the store keeper gives it. Maybe he writes it down, maybe not.

Nobody tracks:
- How much material was planned (BOQ says we need 3,200 bags total)
- How much has been purchased (2,800 bags via POs)
- How much is in stock right now (195 bags)
- How fast we're using it (80 bags/day)
- **When we'll run out** (2.4 days — CRITICAL)

The site runs out of cement on a Tuesday. 77 workers sit idle. The contractor charges ৳500/day per idle worker = ৳38,500 for one day of site shutdown. This happens **2-3 times per project**.

### What AbcERP does:

```
BOQ Planned:     3,200 bags     ← What we estimated
Purchased:       2,800 bags     ← What we've ordered
Received:        2,795 bags     ← What arrived (5 damaged)
Issued:          2,600 bags     ← What left the store
Consumed (DSR):  2,450 bags     ← What was actually used
In Store:        195 bags       ← Physical stock
WASTAGE:         150 bags       ← Issued but not consumed = LOST
                 (৳78,000)       ← That's real money
```

| Alert | Today | After AbcERP |
|---|---|---|
| Stock running low | Discovered when it's already zero | CRITICAL alert at < 3 days supply. LOW at < 7 days |
| Material wastage | Nobody tracks it | System computes: Issued - Consumed = Wastage. Expensed to P&L (not hidden in building cost) |
| Over-purchasing | QS realizes at year-end | MR auto-checks against BOQ remaining quantity: "BOQ allows 400 more bags. This MR for 200 is within budget." |
| No budget | Found when finance reconciles | MR auto-checks budget: "Budget for this cost code has ৳2.3M available. This MR for ৳1.1M is within budget. APPROVED." |

### The demo moment:

> "How many times has your site shut down because you ran out of cement? Each shutdown costs you ৳30-50,000 in idle labour. This screen shows you'll run out in 2.4 days. The engineer sees this alert today, raises an MR today, and the cement arrives before you run out. That ৳30,000 you save — multiply by 2-3 shutdowns per project."

---

## Phase 4: Running Bills (Paying Contractors)

### What happens today:

The contractor comes at month-end and says: "I did ৳12 lakh work this month." The QS argues: "No, I measured only ৳9.5 lakh." They negotiate. Eventually, the QS prepares a bill in Excel.

Then the QS manually calculates deductions:
- Retention: ৳9.5L x 5% = ৳47,500 (calculated by hand, sometimes wrong)
- Advance recovery: let me check how much advance is remaining... (calls accounts)
- TDS: ৳9.5L x 7.5% = ৳71,250 (sometimes forgotten, NBR catches it during audit)

The net payable goes to finance as a handwritten note. Finance posts the journal entry separately — sometimes a week later, sometimes wrong.

### What AbcERP does:

| Step | Today | AbcERP | Time Saved |
|---|---|---|---|
| Joint measurement | Paper + calculator | Digital measurement linked to BOQ items | Same time, but recorded permanently |
| Gross amount | Manual calculation | Auto: measured qty x contract rate | Instant |
| Retention deduction | Manual (errors common) | Auto: gross x retention % from contract | Instant, error-free |
| Advance recovery | Call accounts to check remaining balance | Auto: tracks remaining advance, deducts proportionally | No phone call needed |
| TDS | Sometimes forgotten | Auto: gross x TDS rate | Never missed |
| GL posting | Separate process, days later | GL preview on screen, posted at approval | Same-day posting |
| Net payable | Manual Excel to handwritten note to accounts | System shows exact amount, auto-posts | No manual handoff |

### The GL entry (what the accountant sees):

```
Running Bill #3 — Alam Construction — October 2026

Gross amount:                         ৳965,400
  Less: Retention (5%)               -৳48,270   ← Held as security
  Less: Advance Recovery (10%)       -৳96,540   ← Recovering mobilization advance
  Less: TDS (7.5%)                   -৳72,405   ← Tax withheld per law
                                     ---------
NET PAYABLE:                          ৳748,185

GL Journal (auto-posted):
  DR  Construction WIP    ৳965,400   ← Full cost goes to the building
    CR  AP - Alam         ৳748,185   ← What contractor gets
    CR  Retention Payable ৳48,270    ← Balance sheet liability
    CR  Advance Recovery  ৳96,540    ← Reduces advance outstanding
    CR  TDS Payable       ৳72,405    ← Owed to NBR
```

### Demo moment:

> "This running bill — deductions calculated in how long? Instantly. Your QS spends 30-45 minutes per bill on deduction calculations. You have 5 contractors, 12 months. That's 60 running bills x 30 minutes = 30 hours per year just on deduction calculation. And sometimes he gets the retention wrong and the contractor complains. This never gets it wrong."

---

## Phase 5: Variation Orders (When Plans Change)

### What happens today:

The client says "add waterproofing in the basement." The PM tells the contractor verbally. The work gets done. Three months later, the contractor includes it in his bill. The QS says "this wasn't in the BOQ." The contractor says "but PM told me to do it." Fight ensues.

Or worse: the PM approves the extra work, but never tells the boss. At project end, the budget is overrun by ৳5 Crore. Boss asks: "Where did the money go?" Nobody can explain — because 40 small changes happened over 2 years, each seemed small, but nobody tracked the total.

### What AbcERP does:

| Today | AbcERP |
|---|---|
| Verbal instruction, no record | Formal Change Request with source and reason |
| No cost assessment before doing the work | QS evaluates cost and schedule impact BEFORE approval |
| PM approves everything regardless of size | Threshold-based routing: PM <৳5L, Director <৳25L, CFO <৳1Cr, Board >৳1Cr |
| No link to budget | VO creates BOQ version delta. Budget waterfall: Baseline + VOs = Current |
| Contingency tracking? What contingency? | System shows: Original contingency ৳12M, Used ৳6M, Remaining ৳6M. If burn rate is too fast, red alert |
| Boss finds out at project end | CEO Dashboard: Profit Erosion Waterfall shows margin impact of each VO |

### Demo moment:

> "You have ৳12 Crore contingency. It's Month 8 of a 36-month project and you've already used ৳7 Crore. At this rate, you'll burn through the entire contingency by Month 14 — with 22 months still left. Do you know this today? No? This screen tells you."

---

## Phase 6: Handover & Revenue Recognition

### What happens today:

The flat is ready. The buyer comes. Someone gives him the keys. Maybe there's a paper checklist. The buyer complains about 5 things (dripping tap, scratched door, paint patch). The developer promises to fix them. Nobody tracks whether they were actually fixed.

The accountant records "revenue" whenever the boss tells him to — sometimes at booking, sometimes at handover, sometimes when he feels like it. This is an accounting violation but nobody cares until the auditor visits.

### What AbcERP does:

```
BEFORE HANDOVER (What most developers do wrong):

  Buyer pays ৳15,200,000 in installments over 30 months
  
  WRONG (what your client probably does):
    DR Cash       ৳15,200,000
    CR Revenue    ৳15,200,000   ← WRONG! This is not revenue yet!
  
  RIGHT (what AbcERP does):
    DR Cash                        ৳15,200,000
    CR Booking Advance (Liability) ৳15,200,000   ← It's a PROMISE, not revenue

AT HANDOVER (The moment revenue is actually earned):

    DR Accounts Receivable     ৳17,400,000   ← Total apartment value
    CR Revenue                 ৳17,400,000   ← NOW it's revenue
    
    DR Cost of Sales           ৳13,130,000   ← This unit's share of cost
    CR Construction WIP        ৳13,130,000   ← Remove from balance sheet
    
    DR Booking Advance         ৳15,200,000   ← Clear the liability
    CR Accounts Receivable     ৳15,200,000   ← Offset what buyer already paid
```

| Today | AbcERP | Why It Matters |
|---|---|---|
| Snag list on paper | Digital snag list with photos, assigned to contractor, tracked to closure | Buyer doesn't call 15 times asking "did you fix the tap?" — they check the portal |
| Clearance is informal | 5-checkpoint clearance: Financial, Technical, Legal, Utility, Municipal. ALL must pass | No keys given until all dues paid and all paperwork done |
| Revenue recognized randomly | Revenue at handover only (Completed Contract method, IFRS compliant) | Auditor-proof. Bank lenders trust your financials |
| Defects after handover ignored | DLP: 12-24 months. Defects tracked, contractor obligation enforced | Retention held as leverage. Released only after DLP expiry |
| Project never formally closed | Automated closure checks: WIP=0, AR=0, no open POs, all retentions released, feasibility vs actual reviewed | "Can costs still be posted to the Gulshan project?" — after closure, NO. It's sealed. |

### Demo moment:

> "When your auditor asks 'show me how you recognized revenue,' what do you show them? A voucher entry? AbcERP shows: handover date, clearance checklist, snag resolution, GL entry with timestamp. Every taka accounted for."

---

## The Automation Summary

| Activity | Today (Manual) | After AbcERP | Impact |
|---|---|---|---|
| Project setup | Fresh start, no carry-forward | One-click from land, all data inherited | Saves 2-3 days, zero re-entry |
| BOQ creation | 2-4 weeks in Excel, no version control | Measurement sheets + rate analysis + lock | Eliminates "which version?" problem forever |
| BOQ to Budget | Separate Excel, manual | Auto-generated, one click | 1-2 days to instant |
| Tender evaluation | Phone calls, gut feel | Comparative Statement, rate intelligence | Saves ৳5-15L per project from better pricing |
| Daily reporting | Paper/WhatsApp/nothing | 5-tab DSR, 15 minutes | Director knows site status without calling |
| Material tracking | Register book, no alerts | Real-time stock, days-left, BOQ consumption | Prevents 2-3 site shutdowns/project (৳60-150K saved) |
| Running bill deductions | Calculator, 30-45 min, errors | Auto-calculated, error-free | 30+ hours/year saved, zero calculation errors |
| Variation tracking | Verbal, no record | Formal VO with threshold approval + budget impact | CEO sees margin impact immediately, not at project end |
| Handover | Informal, paper checklist | Digital snag list, clearance gates, revenue recognition | IFRS-compliant, auditor-proof |
| Project closure | Never happens formally | Automated checks, project sealed permanently | No more costs posted to finished projects |

---

## Key Construction Terms

| Term | Meaning |
|---|---|
| **cum** | Cubic meter — for concrete, earthwork, sand |
| **sqft / sqm** | Square feet / meters — for finishing work |
| **RCC** | Reinforced Cement Concrete — concrete with steel inside |
| **TMT / Rebar** | Steel bars inside concrete for strength |
| **M25 / M30** | Concrete grade (strength class) |
| **Formwork** | Temporary molds for wet concrete |
| **Curing** | Keeping concrete wet 7-28 days for strength |
| **Pile** | Deep foundation when soil is weak |
| **WBS** | Work Breakdown Structure — project work hierarchy |
| **BOQ** | Bill of Quantities — item-level cost plan |
| **VO** | Variation Order — formal scope/cost change |
| **RA Bill** | Running Account Bill — contractor's monthly claim |
| **Retention** | 5-10% held as security until defect period ends |
| **TDS** | Tax Deducted at Source — 7.5% withheld for NBR |
| **DLP** | Defect Liability Period — 12-24 months warranty |
| **SPI** | Schedule Performance Index. Below 1 = behind schedule |
| **CPI** | Cost Performance Index. Below 1 = over budget |
| **QS** | Quantity Surveyor — the cost control person |
| **Joint Measurement** | Both sides measure work together to prevent disputes |
| **Mobilization Advance** | 10% upfront to contractor for setup |
| **WIP** | Work in Progress — costs on balance sheet during construction |

---

## What's Next in This Series

- `03-sales-and-collections-explained.md` — How apartments are sold, payment plans, and revenue recognition
- `04-financial-flows-explained.md` — How every operation creates GL entries (the money spine)
- `05-demo-playbook.md` — Person-by-person demo scripts with pain-moment hooks
