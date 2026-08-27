# Financial Flows — Developer's Guide

**Purpose:** Help the development team understand how every operation in the ERP creates GL entries — the "money spine" that connects land evaluation, construction, sales, and project closure into one coherent financial story.

**Audience:** Engineers, designers, and QA who need to understand why every screen that involves money must produce a journal entry.

**Prerequisite:** Read guides 01-03 first. This document connects them all financially.

> **This is the most important guide.** The other three describe what people do. This one describes the financial shadow that every action casts. If you understand this flow, you understand the entire ERP.

---

## Why This Matters (Even If You're Not an Accountant)

Every screen you build that involves money — booking a unit, paying a contractor, issuing cement from the store — must produce a **GL (General Ledger) journal entry**. If it doesn't, the accountant can't close the books, the CFO can't produce a P&L, and the auditor flags it.

Think of it this way: **operations are what people do. Finance is the shadow that every operation casts.** Our job is to make sure every shadow is captured automatically — so nobody has to manually re-enter anything into the accounting system.

```
OPERATION                          →    GL JOURNAL ENTRY
─────────────────────────────────────────────────────────
BD guy evaluates land              →    Pre-dev expense posted (P&L)
Developer buys land                →    Land asset on Balance Sheet
QS creates BOQ                     →    Nothing (plan, not cash)
PM signs contractor                →    Commitment registered (off-BS)
Contractor does work               →    WIP increases (BS)
Store issues cement                →    WIP increases, Inventory decreases
Buyer books flat                   →    Liability increases (BS) — NOT revenue
Buyer pays installment             →    Cash in, AR reduced
Building handed over               →    Revenue recognized, WIP → COGS
Retention released                 →    Liability decreases, Cash out
Project closed                     →    Everything must equal zero
```

---

## The One Rule That Governs Everything: Double-Entry

Every GL entry has two sides that must balance: **Debit (DR) = Credit (CR)**. Always.

For a developer who's never done accounting, here's the cheat sheet:

| To Increase... | You... | Example |
|---|---|---|
| An Asset (cash, land, WIP, AR) | DEBIT it | DR Cash — money came in |
| An Expense (cost, salary, rent) | DEBIT it | DR Construction WIP — cost incurred |
| A Liability (AP, loan, booking advance) | CREDIT it | CR Booking Advance — owe buyer a flat |
| Revenue (sales income) | CREDIT it | CR Revenue — earned by delivering flat |
| Equity (owner's investment) | CREDIT it | CR Owner Equity — owner put money in |

And the reverse to decrease. That's it. Every GL entry in AbcERP follows this.

---

## The Seven Dimensions (Why Every Entry Needs Context)

A GL entry alone says "৳50 lakh was spent." But that's useless. We need to know:

| Dimension | Question | Example |
|---|---|---|
| **Project** | What are we spending for? | Gulshan Residence |
| **WBS** | What work is being done? | Tower A > Structure > Columns |
| **Cost Code** | What type of cost? | STR-REBAR (Structural Steel) |
| **GL Account** | What accounting class? | 5020-02 Construction Materials (derived from cost code) |
| **Responsibility Center** | Who is responsible? | Engineering Department |
| **Cost Center** | Where is cost controlled? | Gulshan Construction |
| **Profit Center** | Where is profit measured? | Gulshan Residence |

Without these 7 dimensions, you can't answer:
- "How much did we spend on rebar in Tower A?" (need Project + WBS + Cost Code)
- "Is Gulshan profitable?" (need Profit Center)
- "Which department is overspending?" (need Responsibility Center)
- "Did structural work go over budget?" (need Cost Code category)

**The posting gate blocks entries without required dimensions.** This is not a soft validation — it's a hard stop. If the engineer raises an MR without a WBS node, the system rejects it.

**What happens today:** The accountant writes a voucher: "Paid ৳50L for steel." No project tag. No WBS. No cost code. At year-end, nobody can tell which project consumed how much steel.

**What AbcERP does:** Every transaction carries 7 dimensions. The GL posting gate rejects entries missing required dimensions. Which dimensions are required per transaction type is configured in Settings > Dimension Rules — not hardcoded.

---

## The Complete Financial Journey (Every GL Entry in Order)

### Stage 1: Pre-Development (Before the Project Exists)

Money is being spent but no project exists yet. Cost is tagged to the land record.

```
EVENT: Soil testing fee ৳350,000

  DR  Pre-Development Expense (P&L)    ৳350,000
  CR  Cash / Bank                       ৳350,000
  
  Cost Object: Land LL-2026-001 (Gulshan plot)
  
  → This is a P&L expense today
  → If project is created later, optionally transferred to WIP
```

Events at this stage: soil test, legal opinion, survey fee, RAJUK plan checking fee, site photography, travel for site visits.

**What happens today:** These expenses are scattered across 15 vouchers. Nobody totals them. At project start, the PM doesn't know how much was already spent.

**What AbcERP does:** Every pre-dev expense is tagged to the land record. Total visible in Land Workspace > Financials tab. At project conversion, the system asks: "Transfer ৳8.4M pre-dev costs to project WIP?"

---

### Stage 2: Land Acquisition

```
EVENT: Land purchased for ৳450M (cash purchase)

  DR  Land Asset                    ৳450,000,000
  CR  Cash / Bank                    ৳450,000,000

EVENT: Stamp duty (3% of land value)

  DR  Land Asset (capitalized)      ৳13,500,000
  CR  Cash / Bank                    ৳13,500,000
  
  → Stamp duty is part of land cost, not a separate expense

EVENT: Registration fee

  DR  Land Asset (capitalized)      ৳2,000,000
  CR  Cash / Bank                    ৳2,000,000

TOTAL LAND COST ON BALANCE SHEET: ৳465,500,000
```

For JV (Joint Venture) — landowner gives land, developer builds:

```
  DR  Land — JV Contribution        ৳450,000,000
  CR  Landowner Equity               ৳450,000,000
  
  → Developer doesn't pay cash. Records land and corresponding equity.
  → Landowner's share settled via allocated units, not cash.
```

---

### Stage 3: Project Setup (No Financial Events)

Defining phases, WBS, unit inventory, BOQ — this is all planning. **No GL entries.** Money starts flowing only when you start buying materials and paying contractors.

The one exception: when BOQ is approved and locked, it auto-generates **BudgetLine** entries. These are not GL entries — they're budget records used for variance tracking.

---

### Stage 4: Construction Costs (The WIP Build-Up)

This is where 60-70% of all GL entries happen. Every cost goes to **Construction WIP** (Work In Progress) on the Balance Sheet — not to P&L. Why? Because the building is being created. It's an asset under construction, not an expense.

**Material Purchase:**
```
PO placed for 500 tons TMT steel at ৳82,000/ton

Step 1: Goods received at site store
  DR  Site Inventory (Asset)        ৳41,000,000
  CR  Accounts Payable — Supplier    ৳41,000,000

Step 2: Material issued to construction from store
  DR  Construction WIP               ৳8,200,000  (100 tons issued)
  CR  Site Inventory                  ৳8,200,000
  
  Dimensions: Project=Gulshan, WBS=Tower A>Structure, 
              CostCode=STR-REBAR, CC=Gulshan Construction

Step 3: Supplier paid
  DR  Accounts Payable              ৳41,000,000
  CR  Cash / Bank                    ৳41,000,000
```

**Contractor Running Bill:**
```
Running Bill #3 — Alam Construction
Gross: ৳965,400

  DR  Construction WIP              ৳965,400   ← Full cost
    CR  AP — Alam Construction       ৳748,185   ← Net payable
    CR  Retention Payable            ৳48,270    ← Held as security
    CR  Advance Recovery             ৳96,540    ← Recovering mobilization
    CR  TDS Payable                  ৳72,405    ← Tax withheld

  Dimensions: Project=Gulshan, WBS=Tower A>Structure>Column, 
              CostCode=STR-RCC, CC=Gulshan Construction
```

**Material Wastage:**
```
150 bags cement wasted (damaged/lost/spilled)

  DR  Wastage Expense (P&L)         ৳78,000    ← Goes to P&L, not WIP
  CR  Site Inventory                  ৳78,000
  
  → Wastage is NEVER capitalized (ADR-010)
  → It's a loss, not part of building cost
```

**Construction Loan Interest (IAS 23):**
```
DURING CONSTRUCTION:
  DR  Construction WIP — Finance Cost  ৳3,500,000
  CR  Interest Payable                  ৳3,500,000
  → Interest is part of building cost

AFTER PRACTICAL COMPLETION:
  DR  Finance Cost (P&L Expense)       ৳3,500,000
  CR  Interest Payable                  ৳3,500,000
  → Interest is now a period expense
```

**Overhead Allocation (Monthly):**
```
Head office rent ৳800,000 allocated to 3 projects by sellable area:

  DR  WIP-Overhead — Gulshan (42.3%)   ৳338,400
  DR  WIP-Overhead — Uttara (33.5%)    ৳268,000
  DR  WIP-Overhead — Banani (24.2%)    ৳193,600
  CR  Head Office Rent (Corporate)      ৳800,000
  
  → Real GL entries, not just reports
  → Each project carries its fair share of corporate cost
```

---

### Stage 5: Sales & Collections (The Revenue Side)

**Unit Booking:**
```
Buyer pays ৳4,114,593 booking amount

  DR  Cash / Bank                          ৳4,114,593
  CR  Booking Advance — Hasanul (LIABILITY) ৳4,114,593
  
  → NOT revenue. Buyer has paid, but developer hasn't delivered.
  → This sits on the Balance Sheet as a current liability.
```

**Installment Collection:**
```
Buyer pays 3rd installment ৳2,057,296

  DR  Cash / Bank                      ৳2,057,296
  CR  Accounts Receivable — Hasanul     ৳2,057,296
  
  → AR reduced. Still not revenue.
```

**Revenue Recognition at Handover (Completed Contract):**
```
Unit A-502 handed over to Hasanul Islam

  Entry 1: Recognize revenue
    DR  Accounts Receivable — Hasanul  ৳20,572,963   ← Full apartment value
    CR  Revenue — Unit Sales            ৳20,572,963   ← NOW it's revenue

  Entry 2: Transfer cost from WIP to COGS
    DR  Cost of Sales                   ৳13,130,000   ← This unit's share
    CR  Construction WIP                ৳13,130,000   ← Remove from BS

  Entry 3: Clear the booking advance liability
    DR  Booking Advance — Hasanul      ৳16,458,370   ← All amounts paid
    CR  Accounts Receivable — Hasanul  ৳16,458,370   ← Offset against AR

  Remaining AR: ৳20,572,963 - ৳16,458,370 = ৳4,114,593 (buyer still owes)
```

**Cancellation:**
```
Buyer cancels. Total paid: ৳8,229,185. Forfeiture: 10%.

  DR  Booking Advance — Hasanul       ৳8,229,185   ← Clear liability
  CR  Cash / Bank (Refund)             ৳7,406,267   ← Return to buyer
  CR  Forfeiture Income (P&L)          ৳822,919     ← Developer keeps
```

---

### Stage 6: Wind-Down (Handover to Closure)

**Retention Release:**
```
Practical completion — release 50% of retention to Alam Construction

  DR  Retention Payable               ৳241,350
  CR  Cash / Bank                      ৳241,350

DLP expires (12 months later) — release remaining 50%

  DR  Retention Payable               ৳241,350
  CR  Cash / Bank                      ৳241,350

After both releases: Retention Payable balance = ৳0
```

**Project Closure — The Final Equation:**

```
At closure, these MUST all be zero:

  Construction WIP balance    = ৳0  (all transferred to COGS)
  Accounts Receivable balance = ৳0  (all collected)
  Retention Payable balance   = ৳0  (all released)
  Open POs / Work Orders      = 0   (all closed)

If any is non-zero, the system blocks closure.
```

---

## The Six Reconciliation Gates

These are automated checks that must pass before period close or project close:

| Gate | Formula | What It Catches |
|---|---|---|
| **WIP** | Opening + Additions - Transfers = Closing | Missing cost entries, double postings |
| **AR** | Opening + Demands - Collections - Write-offs = Closing | Missing collections, unrecorded demands |
| **AP** | Opening + Invoices - Payments = Closing | Unpaid bills, missing invoices |
| **Budget** | Actual + Committed <= Budget + Variations | Overspending beyond approved budget |
| **Revenue (POC)** | Revenue = Expected Revenue x Completion % | Over/under recognition |
| **Unit Status** | Available + Reserved + Booked + Sold + Handed Over + Landowner = Total | Missing or double-counted units |

**What happens today:** The accountant spends 3-5 days at month-end manually checking these. Or doesn't check at all, and errors accumulate for months.

**What AbcERP does:** These gates run automatically. If WIP doesn't reconcile, the system flags exactly which entries are causing the mismatch.

---

## Unit Cost Allocation (How to Know Profit Per Apartment)

The boss always asks: "Are we making money on the penthouse? Or is the 2-bed subsidizing it?"

To answer this, you need to split total project cost across individual units:

```
Total Project Cost:    ৳1,371M
Total Sellable Area:   151,400 sqft
Cost per SFT:          ৳9,057

Unit A-502 (1,450 sqft):
  Allocated Cost: 1,450 x ৳9,057 = ৳13,132,650
  Sale Price:     ৳20,572,963
  Profit:         ৳7,440,313
  Margin:         36.2%

Unit PH-1 (2,800 sqft penthouse):
  Allocated Cost: 2,800 x ৳9,057 = ৳25,359,600
  Sale Price:     ৳42,000,000
  Profit:         ৳16,640,400
  Margin:         39.6%

→ Penthouses are MORE profitable per unit. 
  The boss now knows premium pricing is justified.
```

**This is reporting only — no GL entries.** Costs stay at project level in the ledger. Unit allocation is a management analysis layer.

---

## Profit Erosion Waterfall (Where Did the Margin Go?)

This is the CEO's most important report. At land evaluation, the feasibility said 28% margin. At project closure, actual is 22%. Where did 6% disappear?

```
PROFIT EROSION WATERFALL — Gulshan Residence

Feasibility Margin                           28.0%
────────────────────────────────────────────────────
Material cost overrun (steel +12%)           -2.1%
Foundation change (piling instead of raft)   -1.4%
Timeline delay (6 months → extra interest)   -0.8%
Extra discounts (avg 4.2% vs planned 2%)     -0.9%
Regulatory delays (RAJUK, utility)           -0.5%
Under-allocation of overhead                 -0.3%
────────────────────────────────────────────────────
Actual Margin                                22.0%
```

**What happens today:** Nobody does this analysis. The boss knows feasibility said 28% and final was 22%, but he doesn't know why. So the same mistakes repeat on the next project.

**What AbcERP does:** Every cost variance, every VO, every discount, every delay is tracked with amounts. The waterfall auto-assembles from the data.

### Demo moment:

> "You finished Gulshan. Feasibility said 28% margin. You got 22%. Where did 6% go? You don't know? This waterfall shows you: steel went up 12%, piling cost ৳4.2 Crore more than strip foundation, and your sales team gave 4.2% discount instead of the 2% you approved. Now you know — and next project, you budget for piling and cap discounts at 3%."

---

## The Automation Summary

| Financial Process | Today (Manual) | After AbcERP | Who Benefits |
|---|---|---|---|
| Pre-dev cost tracking | Scattered vouchers, no total | Tagged to land, total visible, transferable to project | PM, CFO |
| Land cost recording | Single voucher, stamp duty separate | Land asset with all capitalized costs | Finance |
| BOQ to budget | Separate Excel files | Auto-generated from approved BOQ | QS, PM |
| Material cost posting | Accountant enters from delivery challan, days later | Auto-posted at material issue with 7 dimensions | Accountant (saves hours) |
| Running bill GL | Accountant calculates deductions and posts manually | Auto-computed deductions, GL preview, posted at approval | QS, Accountant |
| Booking GL | Accountant posts revenue (WRONG) or nothing | Liability posted at booking (CORRECT, IFRS) | CFO, Auditor |
| Revenue recognition | Random timing, no method | Configurable (POC or CC), posted at correct trigger | CFO, Auditor, Bank |
| Interest capitalization | General expense (wrong per IAS 23) | Capitalized to WIP during construction, expensed after | CFO, Auditor |
| Overhead allocation | Not done, or year-end adjustment | Monthly allocation with real GL entries | CFO |
| Period close reconciliation | 3-5 days manual checking | 6 automated gates, system flags mismatches | Accountant |
| Unit profitability | Not calculated | Cost allocated by area, margin per unit visible | Boss, Sales Head |
| Profit erosion analysis | Never done | Auto-assembled waterfall from variance data | CEO |
| Feasibility vs actual | Never compared | Line-by-line at closure — organizational learning | CEO, CFO |

---

## Key Financial Terms

| Term | Meaning |
|---|---|
| **GL (General Ledger)** | The master record of all financial transactions. Everything flows here |
| **Journal Entry** | A single accounting record: debits = credits. Every operation creates one |
| **DR (Debit)** | Left side of journal. Increases assets and expenses |
| **CR (Credit)** | Right side of journal. Increases liabilities, revenue, equity |
| **WIP (Work in Progress)** | Construction costs sitting on the Balance Sheet as an asset being built |
| **COGS (Cost of Goods Sold)** | When WIP is transferred to P&L at unit handover/sale |
| **AR (Accounts Receivable)** | Money owed to the developer by buyers |
| **AP (Accounts Payable)** | Money owed by the developer to contractors/suppliers |
| **BS (Balance Sheet)** | Snapshot of assets, liabilities, equity at a point in time |
| **P&L (Profit & Loss)** | Revenue minus expenses over a period |
| **Dimension** | A tag on every GL entry — Project, WBS, Cost Code, RC, CC, PC, GL Account |
| **Posting Gate** | System block that rejects GL entries with missing dimensions |
| **Reconciliation Gate** | Automated check that balances must add up before period close |
| **IAS 23** | Accounting standard: capitalize interest during construction, expense after |
| **ADR-007** | Architecture Decision: booking advances are liabilities, not revenue |
| **ADR-009** | Architecture Decision: retention is a BS liability, not a discount |
| **ADR-010** | Architecture Decision: wastage is expensed, never capitalized |
| **POC** | Percentage of Completion — revenue method |
| **CC** | Completed Contract — revenue method |
| **Capitalized** | Added to an asset's cost on BS (vs. expensed to P&L immediately) |
| **Overhead Allocation** | Distributing corporate costs to projects using a driver (area, cost ratio) |
| **Commitment** | Signed contract value not yet billed — tracked off-balance-sheet |

---

## What's Next in This Series

- `05-demo-playbook.md` — Person-by-person demo scripts with pain-moment hooks
