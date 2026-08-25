# Construction Loans & Collections Management — Complete Specification

**Module:** Construction Loan Tracking, Interest Capitalization, Demand Letters, Payment Reminders, Penalty Interest, Partial Payment Allocation
**Gap Reference:** Doc 22, Gap Group E (G26-G31)
**Connects To:** Doc 14 (Sales/Collections), Doc 10 (GL Chain), Doc 17 (Profitability)
**Priority:** P0 — 95% of developers use bank financing. Collections is daily operations.

---

## 1. Overview & Core Principle

Two critical financial gaps in one spec:

**Part A — Construction Loan Management:** Most developers don't build from their own pocket. They take construction loans from banks, draw down as construction progresses, capitalize interest to WIP (required by IAS 23 / BAS 23), and repay from unit sales. Without tracking this in the ERP, project cost is understated (missing interest), cash flow is wrong, and bank reporting is manual.

**Part B — Collections Management:** After booking, the developer must systematically chase installment payments — demand letters, payment reminders, penalty interest computation, partial payment handling. This is the daily work of the collections team. Without it, cash flow bleeds.

> **Non-Negotiable Core Principle:**
> _Interest on construction loans must be capitalized to WIP during the construction period (IAS 23). It is a project cost, not a period expense. After construction completes (practical completion), interest reverts to period expense. The ERP must handle both phases automatically based on project stage. For collections: demand letters and penalty interest are not optional — they are the developer's primary cash flow defense mechanism._

---

## PART A: Construction Loan Management

### 2. What Actually Happens

```
PROJECT STARTS
    │
    ▼
Developer applies for construction loan
    Bank: ABC Bank Ltd.
    Sanctioned: ৳500M
    Interest: 12% p.a. (variable — linked to base rate)
    Tenure: 36 months
    Draw-down: milestone-based (Foundation 20%, Structure 50%, MEP 20%, Finishing 10%)
    Repayment: from unit sales proceeds (mandatory 70% of each collection goes to bank)
    Security: land + project receivables
    │
    ▼
FOUNDATION STAGE
    Draw-down #1: ৳100M (20% of ৳500M)
    GL: DR Cash/Bank ৳100M / CR Construction Loan (Liability) ৳100M
    │
    Interest Month 1: ৳100M × 12%/12 = ৳1.0M
    GL: DR Construction WIP — Finance Cost ৳1.0M / CR Interest Payable ৳1.0M
    (Capitalized — IAS 23 — because construction is in progress)
    │
    ▼
STRUCTURE STAGE
    Draw-down #2: ৳250M (50%)
    Running balance: ৳350M
    Interest Month 7: ৳350M × 12%/12 = ৳3.5M
    GL: DR Construction WIP — Finance Cost ৳3.5M / CR Interest Payable ৳3.5M
    │
    ▼
SALES COLLECTIONS START
    Unit sold: ৳21M collected
    Bank repayment: 70% × ৳21M = ৳14.7M → reduces loan balance
    GL: DR Construction Loan ৳14.7M / CR Cash ৳14.7M
    │
    ▼
PRACTICAL COMPLETION
    From this date: interest is NO LONGER capitalized to WIP
    Interest is now a PERIOD EXPENSE (P&L)
    GL: DR Finance Cost (P&L) ৳X / CR Interest Payable ৳X
    │
    ▼
FULL REPAYMENT
    All units sold, loan balance = 0
    Loan status: CLOSED
```

### 3. Entity Model

```
ConstructionLoan
  ├── loanCode (auto)
  ├── projectId → RealEstateProject
  ├── bankName, branchName
  ├── sanctionedAmount
  ├── interestRate, rateType (FIXED / VARIABLE)
  ├── baseRateReference (if variable: "BB + 3%")
  ├── tenureMonths
  ├── sanctionDate, expiryDate
  ├── securityDetails (text: "land mortgage + project receivables")
  ├── repaymentSource ("70% of unit sale collections")
  ├── status (SANCTIONED / ACTIVE / FULLY_DRAWN / REPAYING / CLOSED)
  │
  ├── LoanDrawDown (1:N)
  │     ├── drawDownDate, amount, milestone (Foundation/Structure/MEP/etc.)
  │     ├── runningBalance (computed: cumulative draws − cumulative repayments)
  │     └── journalEntryId → GL
  │
  ├── LoanInterest (1:N — monthly)
  │     ├── periodMonth, periodYear
  │     ├── openingBalance, interestRate, interestAmount
  │     ├── isCapitalized (boolean — true during construction, false after)
  │     ├── capitalizedToWIP (amount, if capitalized)
  │     ├── expensedToPL (amount, if not capitalized)
  │     └── journalEntryId → GL
  │
  ├── LoanRepayment (1:N)
  │     ├── repaymentDate, amount, source (UNIT_SALE / MANUAL / REFINANCE)
  │     ├── sourceBookingId (if from unit sale)
  │     ├── runningBalance
  │     └── journalEntryId → GL
  │
  └── LoanBankAccount (1:1)
        └── bankAccountId → Core > BankAccount
```

### 4. Data Source Trace

| Field | Source |
|---|---|
| Loan Code | Auto. Config: Settings > Numbering |
| Project | User selects. From: RealEstateProject[] |
| Bank | User input or Master: Core > Bank Master |
| Sanctioned Amount | User input (from bank sanction letter) |
| Interest Rate | User input. If variable: base rate from Config + spread |
| Draw-down milestones | From ProjectPhase[] — draw-down linked to construction phases |
| Interest calculation | Computed: opening balance × rate / 12 |
| Capitalization decision | System: if project.lifecycleStage < FINISHING → capitalize to WIP. If ≥ FINISHING → expense to P&L. Config: Settings > Finance > interestCapitalizationCutoffStage |
| Repayment from sales | Computed: collection amount × repaymentPercent. Source: ConstructionLoan.repaymentSource |
| Running balance | Computed: cumulative draws − cumulative repayments |

### 5. GL Entries

**Draw-down:**
```
DR  Cash / Bank (Project Account)              ৳ Draw Amount
  CR  Construction Loan — Bank (Liability)        ৳ Draw Amount

Dimensions: projectId
```

**Interest — During Construction (Capitalized — IAS 23):**
```
DR  Construction WIP — Finance Cost             ৳ Interest Amount
  CR  Interest Payable — Bank                     ৳ Interest Amount

Dimensions: projectId, costCenterId
GL Account (DR): Config > Finance > capitalizedInterestAccount (maps to WIP sub-account)
```

**Interest — After Practical Completion (Expensed):**
```
DR  Finance Cost (P&L)                          ৳ Interest Amount
  CR  Interest Payable — Bank                     ৳ Interest Amount

Dimensions: projectId
GL Account (DR): Config > Finance > interestExpenseAccount
```

**Repayment (from unit sales):**
```
DR  Construction Loan — Bank (Liability)        ৳ Repayment Amount
  CR  Cash / Bank (Project Account)               ৳ Repayment Amount

Dimensions: projectId
```

**Interest Payment (periodic — to bank):**
```
DR  Interest Payable — Bank                     ৳ Interest Due
  CR  Cash / Bank                                 ৳ Interest Due
```

### 6. Business Rules

- Draw-down cannot exceed sanctioned amount. System blocks if cumulative draws > sanctioned.
- Interest capitalization stops automatically when project stage reaches the configured cutoff (typically FINISHING or HANDOVER). Config: Settings > Finance > interestCapitalizationCutoffStage.
- If repaymentSource = "70% of collections," the system auto-computes repayment amount when a CustomerReceipt is posted for a unit in this project.
- Monthly interest computation runs as a scheduled job (or manual trigger by Finance). Creates LoanInterest record + GL entry.
- Multiple loans per project are supported (construction loan + mezzanine + working capital).
- Loan balance must reconcile with bank statement. Part of period-close reconciliation (ADR-011).

---

## PART B: Collections Management

### 7. What the Collections Team Actually Does

```
1ST OF EVERY MONTH:
    System generates "Demands Due This Month" report
    → 45 installments due across 3 projects
    → Total demanded: ৳12.8M

5TH OF MONTH (Grace period ends):
    System auto-generates DEMAND LETTERS for unpaid installments
    → PDF letter with: customer name, unit, installment #, amount, due date
    → Sent via: email (auto) + printed (manual) + SMS (optional)
    → Letter template: configurable per org

15TH OF MONTH (Follow-up):
    System generates REMINDER LETTERS for still-unpaid
    → Escalated tone: "This is your second notice..."
    → Collections exec calls each customer

30TH OF MONTH:
    System computes PENALTY INTEREST on overdue amounts
    → Overdue 15 days × ৳1,050,000 × 2%/month = ৳10,500
    → Penalty posted to AR: DR AR — Customer / CR Penalty Interest Income

WHEN CUSTOMER PAYS:
    Partial payment: ৳800,000 received against ৳1,050,000 due
    → Auto-allocate: FIFO against oldest outstanding installment
    → Remaining ৳250,000 stays as AR balance
    → Receipt: DR Cash / CR AR — Customer
```

### 8. Demand Letter / Payment Reminder

| Field | Source |
|---|---|
| Customer | From UnitBooking.customer |
| Unit | From UnitBooking.unit |
| Installment # | From PaymentSchedule.installmentNumber |
| Amount Due | From PaymentSchedule.amount |
| Due Date | From PaymentSchedule.dueDate |
| Days Overdue | Computed: today − dueDate |
| Penalty Amount | Computed: overdueDays × amount × penaltyRate / 30. Config: Settings > Sales > penaltyInterestRate |
| Total Due | Computed: amount + penalty |
| Letter Type | DEMAND (first notice) / REMINDER (follow-up) / FINAL_NOTICE / LEGAL_NOTICE |
| Template | Config: Settings > Sales > demandLetterTemplate (customizable per org) |
| Delivery | Config: Email (auto) + Print (manual) + SMS (optional) |
| Generated Date | Auto |
| Letter Code | Auto. Config: Settings > Numbering |

### 9. Penalty Interest Computation

```
PENALTY COMPUTATION — August 2026

Customer: Mr. Hasan
Unit: 7A, Gulshan Residence
Installment #4: ৳1,050,000 due 15 Jul 2026
Payment: None received
Days Overdue: 41 days
Penalty Rate: 2% per month                    ← Config: Settings > Sales > penaltyInterestRate
Penalty: ৳1,050,000 × 2% × 41/30 = ৳28,700

GL Entry:
DR  Accounts Receivable — Mr. Hasan           ৳28,700
  CR  Penalty Interest Income (P&L)              ৳28,700

Dimensions: projectId, unitId, profitCenterId
```

### 10. Partial Payment & FIFO Allocation

```
PARTIAL PAYMENT — Mr. Hasan pays ৳800,000

Outstanding installments (FIFO order):
  #3: ৳1,050,000 (due 15 Apr, overdue 132 days) — ৳250,000 remaining from prior partial
  #4: ৳1,050,000 (due 15 Jul, overdue 41 days) — full amount

Allocation:
  ৳250,000 → clears installment #3 remainder    ← oldest first (FIFO)
  ৳550,000 → partial against installment #4     ← ৳500,000 still outstanding on #4

GL Entry:
DR  Cash / Bank                                ৳800,000
  CR  Accounts Receivable — Mr. Hasan            ৳800,000

PaymentSchedule #3: status → PAID
PaymentSchedule #4: paidAmount = ৳550,000, remainingAmount = ৳500,000, status → PARTIALLY_PAID
```

### 11. Entity Model

```
DemandLetter
  ├── letterCode (auto)
  ├── bookingId → UnitBooking
  ├── customerId, unitId
  ├── installmentIds[] → PaymentSchedule[]
  ├── totalAmountDue, penaltyAmount, grandTotal
  ├── letterType (DEMAND / REMINDER / FINAL_NOTICE / LEGAL_NOTICE)
  ├── templateId → DemandLetterTemplate
  ├── generatedDate, sentDate
  ├── deliveryMethod (EMAIL / PRINT / SMS / ALL)
  ├── emailSent (boolean), printedAt, smsSent
  └── status (GENERATED / SENT / ACKNOWLEDGED)

PenaltyInterestEntry
  ├── bookingId, customerId, installmentId
  ├── overdueAmount, overdueDays
  ├── penaltyRate                    ← Config: Settings > Sales > penaltyInterestRate
  ├── penaltyAmount (computed)
  ├── journalEntryId → GL
  └── status (POSTED / REVERSED / WAIVED)

PaymentAllocation (extends existing CustomerReceipt)
  ├── receiptId → CustomerReceipt
  ├── installmentId → PaymentSchedule
  ├── allocatedAmount
  └── allocationMethod (FIFO / MANUAL)
```

### 12. Collections Dashboard

```
COLLECTIONS DASHBOARD — August 2026

                    Gulshan       Uttara        Banani        Total
                    Residence     Heights       Tower

Demanded            ৳5.2M         ৳4.1M         ৳3.5M         ৳12.8M
Collected           ৳3.8M         ৳3.2M         ৳2.9M         ৳9.9M
Overdue             ৳1.4M         ৳0.9M         ৳0.6M         ৳2.9M
Efficiency          73%           78%           83%           77%

OVERDUE AGING
  0-30 days:    ৳1.2M  (8 installments)
  31-60 days:   ৳0.9M  (4 installments)
  61-90 days:   ৳0.5M  (2 installments)
  >90 days:     ৳0.3M  (1 installment)  ← ESCALATE

ACTIONS DUE
  📧 12 demand letters to generate
  📞 8 follow-up calls overdue
  ⚠️  2 accounts for legal notice
```

---

## 13. Configuration Dependencies (Both Parts)

| Config / Master | How It's Used |
|---|---|
| **Construction Loans** |
| Settings > Numbering > Loan | Loan code format |
| Settings > Finance > interestCapitalizationCutoffStage | When to stop capitalizing interest (default: FINISHING) |
| Settings > Finance > capitalizedInterestAccount | GL account for DR when capitalizing |
| Settings > Finance > interestExpenseAccount | GL account for DR when expensing |
| Core > Bank Master | Bank details for loan |
| Project > Phases | Milestones for draw-down schedule |
| **Collections** |
| Settings > Sales > penaltyInterestRate | Monthly penalty rate (default 2%) |
| Settings > Sales > demandLetterTemplate | Configurable letter template |
| Settings > Sales > gracePeriodDays | Days after due date before demand letter (default 5) |
| Settings > Sales > reminderIntervalDays | Days between reminder letters (default 15) |
| Settings > Sales > paymentAllocationMethod | FIFO (default) or MANUAL |
| Settings > Numbering > Demand Letter | Letter code format |
| Core > Chart of Accounts | Penalty Interest Income GL account |

---

## 14. Reports Fed

| Report | Source | Key Metrics |
|---|---|---|
| Loan Balance Report | ConstructionLoan[] | Sanctioned, drawn, repaid, outstanding per project |
| Interest Capitalization Report | LoanInterest[] | Monthly capitalized vs expensed, cumulative by project |
| Cash Flow Impact | LoanDrawDown[], LoanRepayment[] | Cash in from draws, cash out for repayment |
| Overdue Installments | PaymentSchedule[] where overdue | By customer, by project, by aging bucket |
| Demand Letter Log | DemandLetter[] | Letters generated, sent, acknowledged |
| Penalty Interest Report | PenaltyInterestEntry[] | Penalty computed, posted, waived |
| Collection Efficiency | Demanded vs Collected | By project, by period, trend |

---

## 15. Screen Inventory

| # | Screen | Route (proposed) | What It Shows |
|---|---|---|---|
| **Loans** |
| 1 | Loan Register | `finance/loans` | All loans with balance, draw-down %, repayment status |
| 2 | Loan Detail | `finance/loans/[id]` | Draw-down history, interest schedule, repayment history |
| 3 | Add Loan | `finance/loans/new` | Bank, amount, rate, tenure, draw-down milestones |
| 4 | Monthly Interest Run | `finance/loans/interest` | Compute + post interest for all active loans |
| **Collections** |
| 5 | Collections Dashboard | `sales/collections` | Demanded vs collected, overdue aging, actions due |
| 6 | Generate Demand Letters | `sales/collections/demands` | Batch generate for all overdue installments |
| 7 | Demand Letter Preview | `sales/collections/demands/[id]` | PDF preview before sending |
| 8 | Penalty Interest Run | `sales/collections/penalty` | Compute + post penalty for all overdue |
| 9 | Payment Allocation | Inside CustomerReceipt | FIFO allocation of partial payment against installments |

---

_Construction loans are the oxygen of real estate development — cut them off and the project dies. Collections are the heartbeat — skip a beat and cash flow collapses. Both must be in the ERP, not in spreadsheets._
