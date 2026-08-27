# Sales & Collections — Developer's Guide

**Purpose:** Help the development team understand how apartments are sold in Bangladesh — the full journey from buyer inquiry to revenue recognition, what's manual today, what AbcERP automates, and why the client will care.

**Audience:** Engineers, designers, and QA who need domain context for building and demoing AbcERP.

**Prerequisite:** Read `01-land-evaluation-explained.md` and `02-construction-lifecycle-explained.md` first.

---

## The Cast of Characters

| Person | Role | What They Care About |
|---|---|---|
| **Sales Executive** | The ground soldier. Shows flats, follows up, closes deals | "How many bookings did I make this month?" |
| **Sales Head** | Manages the team, tracks velocity, sets pricing | "Are we selling fast enough to fund construction?" |
| **Broker** | External agent who brings buyers for commission (typically ৳50K-2L per booking) | "When do I get my commission?" |
| **Buyer** | The person buying the apartment | "When will my flat be ready? How much do I still owe?" |
| **Collections Officer** | Chases overdue payments | "Who hasn't paid this month's installment?" |
| **Finance** | Posts GL entries, tracks AR, recognizes revenue | "Is this revenue or liability?" |

---

## Part 1: Before the Booking (The Pipeline Nobody Tracks)

### What happens today:

The sales office sits inside or near the project site. A small showroom with a model layout, some brochures, and 2-3 sales executives.

Leads come from:
- **Walk-ins** — someone sees the signboard and walks in
- **Brokers** — property brokers bring interested buyers for commission
- **Digital ads** — Facebook/YouTube ads generate phone calls
- **Referrals** — existing buyers tell their friends
- **Events** — property expos, newspaper ads

The sales executive talks to the person, shows them the floor plan, maybe drives them to the site. If the person is interested, the executive writes their name and phone number in a **register book** or saves it in their personal phone contacts.

**What goes wrong:**
- Nobody tracks how many inquiries came in this month
- If the sales executive quits, all their leads go with them (stored in their phone)
- The boss can't answer: "We spent ৳5 lakh on Facebook ads — how many bookings did it generate?"
- Broker commissions are tracked in the broker's head, not the system
- Leads fall through the cracks — someone expressed interest 3 weeks ago, nobody followed up

### What AbcERP will do (R8 — Sales CRM, coming next):

```
Today:                               AbcERP:

Name in register book          →     Digital lead: source, interest,
                                      budget, assigned executive

"I'll call him tomorrow"       →     Follow-up task with due date,
                                      reminder, escalation if missed

"Broker brought 5 people"      →     Broker profile: leads brought,
                                      converted, commission owed,
                                      payout status

"Are ads working?"             →     Lead Source ROI:
                                      Facebook: 45 leads, 3 bookings (6.7%)
                                      Broker: 30 leads, 8 bookings (26.7%)
                                      Walk-in: 25 leads, 4 bookings (16%)
                                      → Brokers convert 4x better than ads

"How's the pipeline?"          →     Sales Funnel:
                                      Inquiry: 45
                                      Follow-up: 32
                                      Site Visit: 18
                                      Quotation: 12
                                      Negotiation: 5
                                      Booking: 3
```

### Demo moment:

> "Last quarter, you spent how much on marketing? ৳8 lakh? OK — how many bookings did that ৳8 lakh generate? You don't know? With this, you know. And you might discover that your brokers, who cost you ৳50K per booking, actually convert 4 times better than your ৳8 lakh Facebook campaign."

---

## Part 2: Unit Inventory (What's Available to Sell?)

### What happens today:

The sales executive has a printed floor plan on the wall. Sold units are crossed out with a red marker. Reserved units have a sticky note with the buyer's name. Available units are unmarked.

Problems:
- Two executives sometimes sell the same unit to different buyers (yes, this happens)
- Nobody updates the chart in real time
- The boss calls and asks "how many units are left?" — the executive counts marks on the wall
- Landowner units (allocated to JV partner) are mixed with sellable units

### What AbcERP does:

A color-coded inventory grid — every unit, every status, at a glance:

```
TOWER A — FLOOR PLAN VIEW

Floor 14: [PH-1 SOLD] [PH-2 AVAILABLE]
Floor 13: [PH-3 AVAILABLE] [PH-4 RESERVED]
Floor 12: [PH-5 LANDOWNER] [PH-6 BOOKED]
...
Floor 5:  [A SOLD] [B BOOKED] [C AVAILABLE] [D UNDER PAYMENT]
Floor 4:  [A SOLD] [B SOLD]   [C BOOKED]    [D AVAILABLE]
Floor 3:  [A SOLD] [B SOLD]   [C SOLD]      [D BOOKED]
Floor 2:  [A SOLD] [B SOLD]   [C SOLD]      [D SOLD]
Floor 1:  [A SOLD] [B SOLD]   [C SOLD]      [D SOLD]
GF:       [S1 LANDOWNER] [S2 SOLD] [S3 AVAILABLE] [S4 AVAILABLE]
```

| Status | Color | Meaning |
|---|---|---|
| AVAILABLE | Green | Can be sold |
| RESERVED | Yellow | Temporarily held (expires in 48 hours if not booked) |
| BOOKED | Blue | Buyer committed, paying installments |
| UNDER PAYMENT | Orange | Some installments overdue |
| SOLD | Gray | Fully paid |
| LANDOWNER | Purple | Allocated to JV landowner — not for sale |

**Summary strip at top:** Available: 18 | Reserved: 2 | Booked: 14 | Sold: 12 | Landowner: 6 | Total: 52

### Who benefits:

| Person | Pain Today | After AbcERP |
|---|---|---|
| Sales Executive | "Let me check the chart... I think Unit 5C is available" | Instant grid view, real-time status, no double-selling |
| Sales Head | "How many units left to sell?" (calls office, waits) | Summary strip shows it in 1 second |
| Boss | "We launched 6 months ago. What's our sold percentage?" | 12 sold + 14 booked = 26/52 = 50% sold. No calculation needed |
| Finance | "Which units are landowner allocation?" | Purple = Landowner. No confusion. No accidental sale of JV partner's units |

---

## Part 3: The Booking Wizard (The Big Moment)

### What happens today:

The buyer decides to book. The sales executive pulls out a booking form — a printed A4 sheet. Fills it by hand:
- Buyer name, father's name, NID number, phone, address
- Unit number, size, price
- Payment plan (handwritten)
- Buyer signs

The executive hands this to the office. The office girl types it into Excel. The accountant makes a voucher entry for the booking amount. This takes 1-3 days.

There's no payment schedule. The executive tells the buyer verbally: "Pay ৳2 lakh every month." If the buyer asks "how much total do I need to pay and when?", the executive does mental math.

### What AbcERP does — 5-step wizard:

**Step 1: Select Unit**
```
Project: Gulshan Residence
Tower: Tower A
→ Shows available units with specs

Selected: Unit A-502
  Type: 3-Bed
  Floor: 5th
  Facing: South
  Area: 1,450 sqft
  Base Price: ৳14,500/sqft
```

**Step 2: Customer Details**
```
Name: Hasanul Islam
NID: 1990XXXXXXXX
Phone: 01711-XXXXXX
Email: hasanul@email.com
Address: House 45, Road 12, Dhanmondi, Dhaka

Nominee: Fatema Islam (Wife)
Nominee NID: 1992XXXXXXXX
```

**Step 3: Price Calculation**
```
Base Price (1,450 sqft x ৳14,500)     = ৳21,025,000
Floor Premium (5th floor x 1%)         = +৳210,250
South Facing Premium (2%)              = +৳420,500
                                        -----------
Gross Price                             = ৳21,655,750
Discount (5% — approved by Sales Head) = -৳1,082,788
                                        -----------
FINAL PRICE                             = ৳20,572,963
```

If discount > 5%, system routes to Sales Head for approval. If > 10%, goes to Director.

**Step 4: Payment Plan**
```
Plan: 20/80 Milestone-Based

Installment  Type              Due Date      Amount         %
-------------------------------------------------------------
1            Booking           Today         ৳4,114,593    20%
2            On Foundation     Jan 2027      ৳2,057,296    10%
3            On 3rd Slab       Apr 2027      ৳2,057,296    10%
4            On 6th Slab       Jul 2027      ৳2,057,296    10%
5            On 10th Slab      Nov 2027      ৳2,057,296    10%
6            On Brick Work     Mar 2028      ৳2,057,296    10%
7            On Finishing      Jul 2028      ৳2,057,296    10%
8            On Handover       Dec 2028      ৳4,114,593    20%
-------------------------------------------------------------
TOTAL                                        ৳20,572,963   100%
```

This is auto-generated from the payment plan template. The sales executive doesn't calculate anything.

**Step 5: Review + GL Preview**
```
Summary:
  Unit: A-502 (1,450 sqft, 5th Floor, South)
  Buyer: Hasanul Islam (NID: 1990XXXXXXXX)
  Price: ৳20,572,963 (after 5% discount)
  Plan: 20/80 Milestone, 8 installments
  Booking Amount: ৳4,114,593

GL Journal Preview:
  DR  Cash / Bank                    ৳4,114,593
  CR  Booking Advance — Hasanul      ৳4,114,593  ← LIABILITY, not revenue

  [ Confirm Booking ]
```

### The most important accounting concept:

**The money the buyer pays is NOT your revenue.** It's a LIABILITY. You owe the buyer an apartment. Until you hand over the apartment, you haven't earned the money.

This is where 90% of Bangladeshi developers get their accounting wrong. They record buyer payments as revenue immediately. Their P&L looks inflated. When the auditor comes, or when they apply for a bank loan and the bank does due diligence, it falls apart.

```
WRONG (what most developers do):
  Buyer pays ৳4 lakh → DR Cash / CR Revenue
  Result: P&L shows ৳4L revenue. But you haven't delivered anything!

RIGHT (what AbcERP does):
  Buyer pays ৳4 lakh → DR Cash / CR Booking Advance (LIABILITY)
  Result: Balance sheet shows ৳4L liability. 
  Revenue = ৳0 until handover.
```

### Demo moment:

> "When a buyer pays you ৳4 lakh, is that your revenue? No — you owe them a flat. If they cancel tomorrow, you have to give (most of) it back. That ৳4 lakh is a liability. This system gets it right from day one. Your auditor will love you."

---

## Part 4: Collections (The Monthly Chase)

### What happens today:

After booking, the buyer is supposed to pay installments — either monthly or milestone-based. Here's what actually happens:

- Month 1-3: Buyer pays on time (they just booked, they're excited)
- Month 4-6: Some buyers start delaying. "I'll pay next week."
- Month 7-12: 30-40% of buyers are behind by 1-2 installments
- Month 12+: Some buyers are 3-6 months behind. The developer is funding construction from their own pocket instead of buyer collections

The collections "process" today:
1. Someone in the office has an Excel with payment dates
2. End of month, they print a list of "who hasn't paid"
3. Sales executive calls the buyer: "Sir, your payment is due"
4. Buyer says "next week" — executive moves on
5. Nobody sends a formal demand letter
6. Nobody charges penalty interest (even though the agreement allows it)
7. Six months later, the CFO asks: "Why is our collection only 60%?"

### What AbcERP does:

**Automated demand + escalation:**

```
DAY 0:    Installment due
          System raises SalesInvoice → AR entry created
          Status: DUE

DAY 1:    Payment not received
          Auto-SMS/Email: "Dear Mr. Islam, your installment of ৳2,057,296 
          for Unit A-502 was due on 01-Nov-2027."
          
DAY 7:    Still unpaid
          Status: OVERDUE
          Auto-reminder (stronger tone):
          "This is a reminder that your payment is now 7 days overdue..."

DAY 15:   Still unpaid
          Formal Demand Letter generated (1 click):
          "As per clause 7.3 of your booking agreement, payment was due on
          01-Nov-2027. Please arrange payment within 7 days to avoid penalty."
          
DAY 30:   Penalty interest kicks in
          Auto-computed: ৳2,057,296 x 18% p.a. x 30/365 = ৳30,370
          Added to outstanding balance
          
DAY 60:   Escalation to Sales Head
          Buyer flagged as HIGH RISK
          
DAY 90:   Cancellation warning
          "Your booking may be cancelled per clause 12.1..."
```

**AR Aging Dashboard (What the CFO sees):**

```
AR AGING — ALL PROJECTS

                  Current    30 Days    60 Days    90 Days    >90 Days    Total
Gulshan Res.      ৳18.2M    ৳6.4M     ৳2.1M     ৳0.8M     ৳0.3M      ৳27.8M
Nasirabad Hts.    ৳14.6M    ৳4.2M     ৳1.8M     ৳0         ৳0         ৳20.6M
Uttara Greens     ৳22.4M    ৳8.1M     ৳3.6M     ৳2.2M     ৳1.4M      ৳37.7M
---------------------------------------------------------------------------
TOTAL             ৳55.2M    ৳18.7M    ৳7.5M     ৳3.0M     ৳1.7M      ৳86.1M

Collection Efficiency: 78% (target: 85%)
```

| Today | AbcERP | Impact |
|---|---|---|
| Excel list, printed monthly | Real-time AR aging by project, by buyer, by age bucket | CFO sees health instantly |
| Sales exec calls informally | Automated SMS + Email + Formal demand letter | Professional, consistent, documented |
| No penalty interest charged | Auto-computed per agreement rate | Buyers pay faster when penalty applies |
| Partial payments unallocated | FIFO allocation: oldest outstanding first | No ambiguity about what's been paid |
| Monthly demand letters: 4-6 hours | One click generates all pending demands | 95% time reduction |
| "Who's overdue?" — unknown until checked | Dashboard shows count and amount instantly | Proactive collection, not reactive |

### Demo moment:

> "How many buyers are more than 60 days overdue right now? You don't know? With this, the number is on your screen right now — along with the exact amount. And if you want to send demand letters to all of them, it's one button. Not 4 hours of typing."

---

## Part 5: Cancellation & Transfer (When Things Go Wrong)

### Cancellation

Buyers cancel for many reasons: financial difficulty, found a better deal, personal issues, or simply changed their mind. The question is: **how much do they get back?**

```
CANCELLATION SCENARIO:

Buyer: Hasanul Islam, Unit A-502
Total Paid: ৳8,229,185 (booking + 2 installments)
Forfeiture: 10% of amount paid = ৳822,919
Refund: ৳8,229,185 - ৳822,919 = ৳7,406,267

GL Journal:
  DR  Booking Advance — Hasanul   ৳8,229,185   ← Clear the liability
    CR  Cash / Bank (Refund)       ৳7,406,267   ← Money back to buyer
    CR  Forfeiture Income          ৳822,919     ← Developer keeps this (P&L)

Unit A-502: BOOKED → AVAILABLE (ready to sell again)
```

**What happens today:** The buyer asks for cancellation. There's a fight about how much to refund. The boss decides on the spot — sometimes generously, sometimes not. The accountant makes a voucher entry, maybe with the wrong amounts. The unit goes back on sale but nobody updates the Excel/chart for a week.

**What AbcERP does:** Forfeiture % is configured in settings (default 10%). System auto-calculates. GL preview shows exact journal entry. Unit is released back to AVAILABLE instantly. No ambiguity, no negotiation needed (unless boss overrides).

### Transfer

Sometimes a buyer wants to transfer their booking to someone else (common in BD — buyers sometimes book as investment, then sell their booking at a premium).

```
TRANSFER SCENARIO:

Original Buyer: Hasanul Islam, Unit A-502
New Buyer: Karim Ahmed
Transfer Fee: ৳100,000 (configurable)
Already Paid by Hasanul: ৳8,229,185

Process:
1. Hasanul pays transfer fee ৳100,000
2. Hasanul's booking is closed (not cancelled — no forfeiture)
3. New booking created for Karim with Unit A-502
4. ৳8,229,185 in booking advance transfers: Hasanul → Karim's account
5. Remaining installments assigned to Karim
6. Settlement: Hasanul gets his money from Karim directly (outside system)
```

---

## Part 6: Revenue Recognition (When Money Becomes Revenue)

This is the concept that confuses everyone — including most accountants at Bangladeshi developers.

### The Timeline of Money:

```
Month 0:    Buyer books Unit A-502. Pays ৳4.1M
            → Cash in bank: YES
            → Revenue: NO (it's a liability)

Month 1-30: Buyer pays installments. Total paid: ৳16.5M
            → Cash in bank: YES (৳16.5M collected)
            → Revenue: STILL NO (all sitting as liability on BS)

Month 31:   Building complete. Unit handed over. Keys given.
            → NOW it's revenue: ৳20.6M (full apartment value)
            → Cost of Sales recognized: ৳13.1M (unit's share of construction cost)
            → Profit on this unit: ৳7.5M (36.4% margin)
```

### Two Methods:

| Method | When Revenue Is Recognized | Used When |
|---|---|---|
| **Completed Contract (CC)** | At handover only | Default for BD developers. Simpler. Conservative. |
| **Percentage of Completion (POC)** | Proportional to construction progress | Used by some larger developers. More complex. |

**Example with POC:**
```
Construction is 40% complete.
Unit A-502 total revenue: ৳20.6M
Revenue recognized so far: 40% x ৳20.6M = ৳8.2M
Revenue deferred: 60% x ৳20.6M = ৳12.4M (still liability)
```

**Why this matters to the boss:**

With CC method: The P&L shows ৳0 revenue for 30 months, then suddenly ৳20.6M in month 31. The company looks unprofitable for 2.5 years, then suddenly very profitable. Banks don't like this roller coaster.

With POC method: Revenue flows in gradually as construction progresses. The P&L looks smoother. But it's riskier — what if you recognized 40% revenue but the buyer cancels?

AbcERP supports both. It's a configuration choice per organization.

---

## Part 7: Construction Loans (How the Building Gets Funded)

### What happens in real life:

The developer doesn't build from their own pocket. They typically:
1. Use buyer booking money (20-30% of total cost)
2. Take a construction loan from bank (50-60% of total cost)
3. Use own equity (10-20% of total cost)

### How the loan works:

```
SANCTIONED: ৳500M from ABC Bank
DRAW-DOWN: Milestone-based

  Foundation complete → Bank releases ৳100M (20%)
  Structure complete  → Bank releases ৳250M (50%)
  MEP complete        → Bank releases ৳100M (20%)
  Finishing complete   → Bank releases ৳50M  (10%)

INTEREST: 12% per annum on drawn amount
  Month 1-6: ৳100M x 12%/12 = ৳1M/month
  Month 7-18: ৳350M x 12%/12 = ৳3.5M/month
  (Interest is CAPITALIZED — added to building cost, not expensed)

REPAYMENT: From sales collections
  Rule: 70% of every buyer payment goes to bank
  Buyer pays ৳21M → ৳14.7M goes to bank → loan balance reduces
```

### The critical accounting rule (IAS 23):

During construction, interest is NOT an expense. It's added to the cost of the building (WIP). Why? Because the building isn't earning revenue yet — so the interest is part of the cost of creating the asset.

```
DURING CONSTRUCTION:
  DR  Construction WIP — Finance Cost    ৳3.5M
  CR  Interest Payable                   ৳3.5M
  → Interest goes to Balance Sheet (increases building cost)

AFTER PRACTICAL COMPLETION:
  DR  Finance Cost (P&L Expense)         ৳3.5M
  CR  Interest Payable                   ৳3.5M
  → Interest goes to P&L (reduces profit)
```

**What happens today:** Most developers don't track this properly. Bank interest is treated as a general company expense, not allocated to the project. So project cost looks lower than reality, and project profitability is overstated.

**What AbcERP will do (R9 — coming next):**

| Today | AbcERP |
|---|---|
| Loan tracked in bank statement only | Loan register in system: bank, rate, tenure, balance, draw-downs |
| Interest computed by bank, developer just pays | System computes monthly interest, auto-capitalizes to WIP |
| Repayment ad-hoc | Rule-based: 70% of each collection auto-allocated to loan repayment |
| No project-level interest tracking | Total capitalized interest visible in project cost breakdown |

---

## The Complete Money Flow

Here's the full picture — every taka, from buyer's pocket to developer's bank account to contractor's pocket:

```
BUYER PAYS INSTALLMENT (৳2M)
    |
    +-- 70% → BANK LOAN REPAYMENT (৳1.4M)
    |         DR Construction Loan / CR Cash
    |
    +-- 30% → DEVELOPER'S ACCOUNT (৳0.6M)
              Stays as cash for operations

    The ৳2M itself:
    DR Cash ৳2M / CR Booking Advance ৳2M (LIABILITY — not revenue)


DEVELOPER PAYS CONTRACTOR (Running Bill ৳9.65L)
    |
    DR Construction WIP    ৳9.65L  ← Building cost goes up
      CR AP - Contractor   ৳7.48L  ← Net payment
      CR Retention         ৳0.48L  ← Held back
      CR TDS               ৳0.72L  ← Tax withheld


AT HANDOVER (Revenue Recognition)
    |
    DR AR              ৳20.6M  ← Developer earned this
    CR Revenue         ৳20.6M  ← P&L top line
    
    DR COGS            ৳13.1M  ← What it cost to build this unit
    CR WIP             ৳13.1M  ← Remove cost from balance sheet
    
    DR Booking Advance ৳16.5M  ← Clear all the liability
    CR AR              ৳16.5M  ← Offset against what buyer owes
    
    Remaining AR: ৳20.6M - ৳16.5M = ৳4.1M (buyer still owes this)
```

---

## The Automation Summary

| Activity | Today (Manual) | After AbcERP | Impact |
|---|---|---|---|
| Lead tracking | Register book / phone contacts | Digital CRM with source and funnel tracking | Know which marketing works. Stop wasting money on bad channels |
| Unit inventory | Chart on wall with markers | Real-time color-coded grid, no double-selling | Zero disputes, instant availability check |
| Booking | Paper form, typed into Excel, 1-3 days | 5-step wizard, 10 minutes, GL posted same day | 90% faster, zero data re-entry |
| Payment schedule | Verbal or handwritten | Auto-generated from plan template, buyer gets copy | Clear expectations from day one |
| Collections follow-up | Phone calls when someone remembers | Automated SMS/email/demand letter on schedule | Consistent, professional, no missed follow-ups |
| Demand letters | 4-6 hours manually typing | One click for all pending demands | 95% time reduction |
| Penalty interest | Never charged (too much hassle to calculate) | Auto-computed per agreement terms | Buyers pay faster. Developer recovers cost of delay |
| AR tracking | Month-end Excel compilation | Real-time AR aging by project, buyer, age bucket | CFO knows collection health every day |
| Cancellation | Negotiated amounts, sometimes unfair | Formula-based forfeiture, auto GL, unit released instantly | Fair, consistent, auditable |
| Revenue recognition | Wrong (recognized at cash receipt, not handover) | IFRS-compliant (CC or POC method, configurable) | Auditor-proof. Bank trusts your financials |
| Loan interest tracking | Treated as general expense | Capitalized to WIP during construction (IAS 23) | True project cost visible. Profitability not overstated |

---

## Key Sales Terms

| Term | Meaning |
|---|---|
| **Booking Advance** | Money paid by buyer at booking. It's a LIABILITY on the balance sheet, not revenue |
| **Installment** | Periodic payment per the payment schedule (monthly or milestone-based) |
| **Demand Letter** | Formal letter demanding overdue payment, per agreement clause |
| **Forfeiture** | Amount kept by developer when buyer cancels (typically 10% of paid amount) |
| **AR (Accounts Receivable)** | Money owed by buyers. Shows as asset on balance sheet |
| **AR Aging** | Breakdown of AR by how old the debt is: Current, 30d, 60d, 90d, >90d |
| **Collection Efficiency** | Collected / Demanded x 100%. Target: 85%+ |
| **POC** | Percentage of Completion — revenue recognized proportional to construction progress |
| **CC** | Completed Contract — revenue recognized only at unit handover |
| **FIFO** | First In First Out — partial payments allocated to oldest outstanding installment |
| **DLP** | Defect Liability Period — 12-24 months warranty after handover |
| **IAS 23** | Accounting standard requiring interest capitalization during construction |
| **JV Unit** | Units allocated to landowner as their share in a Joint Venture deal |
| **Reservation** | Temporary hold on a unit (24-72 hours) before formal booking |
| **Transfer** | Changing the buyer on a booking (old buyer to new buyer, with transfer fee) |
| **Sales Velocity** | Units sold per month — key health metric |
| **Pre-sales** | Units sold before construction starts — critical for cash flow and bank loan |
| **NRB** | Non-Resident Bangladeshi — diaspora buyers, often pay in foreign currency |
| **Broker Commission** | Fee paid to external property agent per booking (typically ৳50K-2L) |

---

## What's Next in This Series

- `04-financial-flows-explained.md` — How every operation creates GL entries (the money spine)
- `05-demo-playbook.md` — Person-by-person demo scripts with pain-moment hooks
