# Demo Playbook — Person-by-Person Scripts

**Purpose:** Ready-to-use demo scripts for presenting AbcERP to different audiences. Each script is a "day in the life" walkthrough with specific screens to show and pain-moment hooks to deliver.

**How to use:** Pick the demo that matches your audience. Each takes 15-25 minutes. Don't show all demos to everyone — pick 2-3 based on who's in the room.

**Golden Rule:** Never demo module-by-module. Always demo person-by-person. "You are Rahim, it's Monday morning..." is 10x more engaging than "This is the Land module."

---

## Before Every Demo: The 60-Second Setup

Open the app. Click the **Guide Panel** (book icon, top right). Say:

> "Before we start — see this panel? It explains every screen: what it does, who uses it, what business problem it solves. Your dev team can use it during development. Your board can use it during review. It travels with the app."

Then close the panel and begin the demo. Don't dwell on it — let them discover it later.

---

## Demo 1: "You Are the Boss" (For CEO / MD / Owner)

**Duration:** 20 minutes
**Audience:** The decision-maker. Cares about: Am I making money? What's at risk? What needs my attention?
**Screens:** CEO Dashboard, Land Pipeline, Profit Erosion, Feasibility vs Actual

### Opening (2 min)

> "It's Sunday evening. You're at home. You want to know one thing: across all my projects, am I on track? Right now, you'd have to call 3 PMs, check WhatsApp, maybe wait until Monday. Let me show you what Sunday evening looks like with AbcERP."

**Open:** CEO Dashboard (`/real-estate/dashboards/ceo`)

### The Two Questions (3 min)

Point to the "Two Questions" section at the top:

> "Every CEO needs to answer two questions. First — project-level: is each project on track? See these 3 projects on the 14-stage lifecycle map. Gulshan is in Construction, Nasirabad is in Finishing, Uttara is in Planning. Green means healthy. That amber flag on Nasirabad? Let's look."

Click the amber indicator:

> "Budget variance 8.2%, schedule slippage 12 days. You just learned this in 3 seconds. Without this system, when would you find out? When the PM mentions it casually in a meeting? When the contractor complains about delayed payment?"

> "Second question — company-level: is the portfolio healthy? Total GDV ৳2.35 billion, 156 units, 70 sold, collection at 87%. One screen. No phone calls."

### Profit Erosion (5 min)

Scroll to the Profit Erosion Waterfall:

> "This is the screen that will change how you run your business. Gulshan started with 28% margin in the feasibility. Right now, we're tracking at 22%. Where did 6% go?"

Point to each bar in the waterfall:

> "Steel prices went up 12% — that's 2.1% margin gone. We had to switch from strip to pile foundation — 1.4% gone. Your sales team gave 4.2% average discount instead of the 2% you approved — that's 0.9% margin gone."

**Pain moment:**

> "Right now, when do you find out your margin eroded? At project end — 3 years too late. With this, you see it every month. The steel price increase? You know about it in Month 4, not Month 36. You can renegotiate with suppliers, adjust selling price, or cut scope — while there's still time."

### Pending Decisions (3 min)

Scroll to Pending Decisions:

> "These are decisions waiting for you — auto-routed based on your approval threshold. This land acquisition needs your sign-off because it's above ৳5 Crore. This variation order needs you because it's above ৳1 Crore. Each one shows the financial impact."

> "Right now, how do decisions reach you? Someone calls. Maybe an email. You approve verbally. No record. If it goes wrong, there's no audit trail showing what you approved and based on what information. This — everything documented. Your approval is recorded with the full context."

### Land Pipeline (3 min)

**Open:** Land Pipeline (`/real-estate/land-leads`)

> "You have 8 land leads in the pipeline. How many are you aware of? This shows all of them with aging badges. See this one — Bashundhara plot has been in 'Assessment' for 45 days. That's stale. Either your BD team is stuck, or they forgot about it. Without this, that lead just dies quietly."

### Closing Hook (2 min)

> "Let me summarize what you just saw in 15 minutes: portfolio health, profit erosion factor-by-factor, decisions with context, and pipeline visibility. Right now, how long does it take you to get this information? A week? Never?"

> "This isn't a software demo. This is what your Monday morning looks like with AbcERP."

---

## Demo 2: "You Are the Site Engineer" (For Operations / Technical Team)

**Duration:** 20 minutes
**Audience:** Site engineers, PMs, QS. Cares about: daily operations, materials, measurements, bills.
**Screens:** Site Dashboard, DSR, Material Requisition, Running Bill, BOQ

### Opening (2 min)

> "It's 6:30 AM. You're Karim, the site engineer at Gulshan Residence. 77 workers are about to arrive. You have 5 contractors working simultaneously. Let's walk through your day."

**Open:** Site Engineering Dashboard (`/real-estate/dashboards/site-engineering`)

### Morning Check (3 min)

> "First thing — check yesterday's carryover. Weather: 32°C, partly cloudy, good for concrete pouring. Manpower: 77 workers across 4 trades. Equipment: crane running, mixer idle — wait, why is the mixer idle?"

Point to the equipment section:

> "Idle reason: breakdown. Reported in yesterday's DSR. Has maintenance been called? In the old system, this information lives in someone's head. Here, it's visible to everyone — PM, Director, procurement."

Point to material stock:

> "Cement: 195 bags. Daily usage: 80 bags. Days left: 2.4. That's CRITICAL — red badge. You need to raise an MR right now, or the site shuts down Wednesday."

**Pain moment:**

> "How many times has your site shut down because you ran out of cement or sand? Each shutdown: 77 workers idle × ৳500/day = ৳38,500 burned. This alert would have caught it 5 days ago."

### Filing the DSR (5 min)

**Open:** DSR (`/real-estate/dsr`)

> "It's 5:30 PM. Time to file today's report. Five tabs — takes 15 minutes."

Walk through the tabs:

> "Tab 1 — Manpower: 22 masons, 35 helpers, 8 bar benders, 12 carpenters. By trade and contractor. Tab 2 — Equipment: crane 8 hours, generator 6 hours, mixer still idle. Tab 3 — Work Done: 4 columns cast on Floor 5, progress 40% to 48%. Tab 4 — Issues: rebar spacing incorrect in Column C4 — severity CRITICAL. Tab 5 — Photos."

> "You hit Submit. The PM gets notified. The Director sees it on his dashboard. If you don't come to work tomorrow, your replacement opens this and knows exactly what happened today."

**Pain moment:**

> "Right now, how does the PM know what happened on site today? He calls you. You say 'everything fine, sir.' That's the report. No data. No history. No photos. No issue tracking."

### Material Requisition (3 min)

> "That cement alert — let's handle it. Raise an MR: 200 bags cement for Tower A Foundation."

Show the MR form:

> "Watch what happens: system checks BOQ — we estimated 3,200 bags total, 2,800 purchased, 400 remaining. This MR for 200 is within BOQ quantity. System checks budget — cost code FND has ৳2.3M available. MR value ৳104,000 is within budget. Both checks pass — MR goes to PM for approval."

**Pain moment:**

> "Today, who checks if this cement is within budget before ordering? Nobody. The store keeper calls the supplier directly. Budget overrun discovered 3 months later when the accountant reconciles."

### Running Bill (5 min)

**Open:** Running Bill screen

> "Alam Construction completed 14 columns this month. You did joint measurement. Now let's prepare the bill."

Show the bill with auto-deductions:

> "Gross amount: ৳965,400. Now watch — system auto-calculates: retention 5% = ৳48,270. Advance recovery 10% = ৳96,540. TDS 7.5% = ৳72,405. Net payable: ৳748,185. That took 0.2 seconds."

> "And here's the GL preview — DR Construction WIP, CR Payable, CR Retention, CR TDS. The accountant doesn't have to do anything. When PM clicks Approve, this posts to the ledger automatically."

**Pain moment:**

> "Your QS spends 30-45 minutes per bill calculating deductions. With 5 contractors and monthly bills, that's 60 bills a year, 30+ hours. And sometimes the retention calculation is wrong and the contractor disputes it. This never makes mistakes."

### Closing Hook (2 min)

> "You just saw Karim's day: morning dashboard, material alerts, DSR filing, and running bill — all connected. The PM knows what's happening without calling. The accountant gets GL entries without manual vouchers. The boss sees SPI/CPI without visiting the site."

---

## Demo 3: "You Are the Sales Head" (For Sales Team)

**Duration:** 15 minutes
**Audience:** Sales head, sales executives. Cares about: inventory, bookings, collections, velocity.
**Screens:** Sales Dashboard, Unit Booking, Booking Wizard, Payment Schedule

### Opening (1 min)

> "You're Nasrin, the Sales Head. You manage 4 sales executives across 2 projects. Let's look at your Monday morning."

**Open:** Sales Dashboard (`/real-estate/dashboards/sales`)

### Sales Velocity (3 min)

> "5 KPIs at the top: 8 units sold this month, 6 new bookings, ৳12.4 Crore collected, 1 cancellation, average price ৳14,200/sqft."

Point to the velocity chart:

> "This chart shows monthly bookings for the last 6 months. March: 5 units. April: 7. May: 4. June: 8. You're accelerating — but May was a dip. Why? Maybe a competitor launched that month. The point is — you can see the trend."

**Pain moment:**

> "Right now, how do you know your monthly velocity? End-of-month Excel compilation? That's 30 days too late. This is real-time."

### Unit Inventory (3 min)

**Open:** Unit Booking (`/real-estate/booking`)

> "Color-coded inventory. Green = available. Blue = booked. Gray = sold. Purple = landowner. Yellow = reserved."

> "Status strip: Available 18, Booked 14, Sold 12, Landowner 6. Total 52. One glance."

**Pain moment:**

> "Has a sales executive ever booked the same unit to two different buyers? I've seen it happen. With a chart on the wall and sticky notes, it happens. With this, when Rahim reserves Unit 5C, it turns yellow instantly. If Kamal tries to book 5C, the system says 'Already reserved by Rahim, expires in 47 hours.'"

### Booking Wizard (5 min)

**Open:** Booking Wizard (`/real-estate/booking/new`)

Walk through all 5 steps quickly:

> "Step 1: Select unit. A-502, 3-bed, 1,450 sqft, South facing. Step 2: Customer — Hasanul Islam, NID, phone, nominee. Step 3: Price — base ৳14,500/sqft + floor premium + facing premium - 5% discount = ৳20.57M. Step 4: Payment plan — 20/80 milestone, 8 installments, auto-generated."

Pause on Step 5:

> "Step 5: Review and GL preview. See this line? 'CR Booking Advance — LIABILITY.' This is not recorded as revenue. Why? Because you haven't delivered the flat yet. If Mr. Islam cancels, you owe him a refund. This gets your accounting right from day one."

**Pain moment:**

> "Your paper booking form takes 1-3 days to reach the accountant. By then, is the unit double-booked? Is the price correct? Did someone approve the 5% discount? With this, the booking is confirmed in 10 minutes with the GL posted on the spot."

### Collections (3 min)

Point to the upcoming demands table on the Sales Dashboard:

> "12 installments due next week. Total ৳24.8M. Which buyers are already overdue? This table shows 4 buyers are more than 30 days late."

> "One click: generate demand letters for all 4. Not 4 hours of typing — one click. And penalty interest? Auto-computed per the agreement rate."

**Pain moment:**

> "How much money is your team leaving on the table because nobody sends demand letters? If your collection efficiency is 78% and target is 85%, that's 7% of demanded amount uncollected. On ৳100 Crore revenue, that's ৳7 Crore sitting in buyers' pockets because nobody followed up systematically."

---

## Demo 4: "You Are the CFO" (For Finance / Accounts Team)

**Duration:** 15 minutes
**Audience:** CFO, accountant, auditor. Cares about: GL integrity, reconciliation, compliance.
**Screens:** CFO Dashboard, Budget vs Actual, Reports Hub

### Opening (1 min)

> "You're the CFO. Your auditor is coming next week. The bank wants a project-wise P&L. And you need to close the books for the quarter. Let's see how your life changes."

**Open:** CFO Dashboard (`/real-estate/dashboards/cfo`)

### Cash Position (3 min)

> "Cash position: ৳45.2M across 4 bank accounts. Monthly burn rate: ৳18.6M. Months of runway: 2.4. That's tight. Total AR: ৳86M. Total AP: ৳34M. Net working capital: ৳52M."

> "Fund requirements forecast — 30 days: ৳22M needed (contractor bills + material POs). 60 days: ৳38M. 90 days: ৳55M. Can your collections cover this? Look at collection performance — Gulshan is at 85%, but Uttara is at 68%."

**Pain moment:**

> "Right now, how do you know your cash runway? You call the accountant, who checks the bank balance, but doesn't factor in committed POs, upcoming contractor bills, or expected collections. This shows the full picture — cash in, cash out, 90-day forecast."

### Budget vs Actual (3 min)

**Open:** Budget vs Actual (`/real-estate/budget`)

> "This is your cost control cockpit. Every cost code, every project: Budget, Actual, Committed, Available."

Point to a line where Available is low:

> "Structure cost code: Budget ৳35.2Cr, Actual ৳28.4Cr, Committed ৳5.8Cr (open POs and contracts), Available ৳1.0Cr. You have only ৳1 Crore left and the structure is 80% done. Is that enough? If not, you need a Variation Order to increase the budget — and that needs Director approval."

**Pain moment:**

> "Most developers track Budget and Actual. They completely miss 'Committed' — contracts signed but not yet billed. So the budget looks fine today, but ৳5.8 Crore of spending is already locked in. You're already over budget — you just don't know it yet."

### GL Integrity (3 min)

> "Every running bill, every material issue, every booking — posts GL automatically with 7 dimensions. Your accountant doesn't re-enter anything. The GL is the operations data."

> "Period close: 6 reconciliation gates run automatically. WIP: Opening + Additions - Transfers = Closing. AR: Opening + Demands - Collections = Closing. If they don't balance, the system tells you exactly which entries are off."

**Pain moment:**

> "How long does month-end close take your team? 3 days? 5 days? With reconciliation gates, mismatches are flagged automatically. Your accountant investigates exceptions instead of checking every voucher."

### Reports Hub (3 min)

**Open:** Reports Hub (`/real-estate/reports`)

> "22 reports across 5 categories. Your auditor needs Project P&L? Here. Bank needs project-wise cash flow? Here. You need AR aging? Here. Unit profitability? Here."

> "And every number drills down: Company → Project → Phase → Tower → Floor → Unit → Cost Code → BOQ Item → PO → Supplier Invoice → GL Journal Entry. One continuous chain."

**Pain moment:**

> "When the auditor asks 'show me how you recognized revenue for Unit A-502,' what do you show them today? A voucher? An Excel? With AbcERP, you show them: handover date, clearance checklist, snag resolution, GL entry with 7 dimensions, timestamp. They'll finish the audit in half the time."

---

## Demo 5: "You Are the BD Head" (For Land & Business Development)

**Duration:** 15 minutes
**Audience:** BD head, land officers. Cares about: pipeline, evaluation progress, team performance.
**Screens:** Land Dashboard, Land Pipeline, Add Land

### Opening (1 min)

> "You're Alam, GM of Land & BD. You manage 3 land officers and 8 active land leads. Let's look at your week."

**Open:** Land Dashboard (`/real-estate/dashboards/land-dev`)

### Pipeline Health (3 min)

> "6 KPIs: 8 active leads, 3 qualified, 2 under due diligence, 1 converted, 2 rejected. Pipeline value: ৳45 Crore."

> "Feasibility studies table: Bashundhara plot — IRR 20.8%, gross margin 24%, NPV positive. Mirpur plot — IRR 12.3%, below threshold. That one's probably a no-go."

**Pain moment:**

> "Right now, how many active land leads do you have? What stage is each in? Who's working on what? If I ask you to tell me in 10 seconds, can you? This screen can."

### Adding a Lead (3 min)

**Open:** Add Land (`/real-estate/land-leads/new`)

> "Your broker calls: '15 katha in Bashundhara, owner wants ৳40 Crore.' Watch this."

Fill the form live (30 seconds):

> "Name, location, area, price, source, assigned to Rahim. Save. 30 seconds. Done."

Show the post-save guidance:

> "System doesn't leave you with a blank screen. It says: 'Lead created. Recommended next step: Complete Initial Selection.' Or you can schedule a site visit, add documents, or open the workspace. No dead ends."

**Pain moment:**

> "Right now, when a broker calls, where does the lead go? Rahim's phone contacts? A notebook? If Rahim quits, how many leads leave with him? With this, every lead is in the system from second one."

### Pipeline View (3 min)

**Open:** Land Pipeline (`/real-estate/land-leads`)

> "6 stages, filterable. See these department dots — LS (Legal), EN (Engineering), MK (Marketing), FN (Finance). Green dot means done. Yellow means in progress. Red means overdue."

> "Bashundhara plot: Legal is done, Engineering is in progress, Marketing hasn't started. Aging badge: 'On Track' — 18 days. But look at Mirpur plot: 'STALE' — 52 days, Engineering dot is red. Someone is blocking."

**Pain moment:**

> "You have a lead that's been sitting in assessment for 52 days. Is that normal? Is someone stuck? Did they forget? Today, you'd never notice. This aging badge catches it automatically."

### Evaluation & Decision (5 min)

> "Let me skip ahead to what the CEO sees. After 8 departments evaluate, the system auto-assembles a management report — 16 sections, zero manual compilation. The CEO gets a 1-page decision screen."

> "Four options: Approve, Approve with Conditions, Return for More Work, Reject. If conditions — the system tracks each condition to closure. If returned — specific departments get revision instructions."

**Pain moment:**

> "Today, the management report is a Word document. Someone spends 2-3 days compiling it from 8 department inputs — calling people, chasing data, formatting tables. With this, it's instant. The report auto-assembles from the work that was already done. Nobody compiles anything."

---

## Handling Common Objections

### "We don't need all this. We've been running fine without software."

> "You're right — you've been running. But are you running efficiently? Let me ask: do you know your exact profit margin on your last completed project? Not revenue minus obvious costs — including allocated overhead, interest capitalization, wastage, and the extra discounts your sales team gave? If you can't answer that in 10 seconds, there's value here."

### "This looks complicated. My team won't use it."

> "Which part looks complicated? The DSR? It's 5 tabs, 15 minutes. Your engineer already spends that time writing in a notebook that nobody reads. Same effort, 10x the value. The booking wizard? 5 steps, 10 minutes — faster than filling a paper form and waiting 3 days for the accountant."

### "We already use Excel for everything."

> "Excel is great for many things. But can your Excel check if a material requisition exceeds the BOQ quantity? Can it auto-deduct retention from a running bill? Can it alert you 5 days before the site runs out of cement? Can it tell you the profit margin on Unit 5C? Excel holds data. This system understands your business."

### "What about our existing accounting software?"

> "AbcERP doesn't replace your accounting software — it feeds it. Every GL entry posted here can be exported. The difference is: your current system requires the accountant to manually create vouchers from paper documents. This posts the GL automatically when the PM approves a running bill. Same data, zero re-entry."

### "Our people don't know computers well."

> "Have you seen them use WhatsApp? Facebook? bKash? They know how to use apps. The question is whether the app is designed for them. Every screen in AbcERP ends with 'What should I do next?' — the system guides the user. They don't navigate the ERP. The ERP navigates them."

### "We need to see it working with our data."

> "That's the right instinct. This prototype uses sample data to show the flow. When we build the production system, we'll configure it with your specific projects, your cost codes, your payment plans, your approval thresholds. The framework is configurable — it adapts to how YOU work, not the other way around."

### "How long will implementation take?"

Don't answer this. Instead:

> "Let's not guess at timelines until we've mapped your specific workflows. Every developer is slightly different — your payment plan structure, your approval chain, your cost code hierarchy. Let's spend 2 days mapping that, then we'll have a realistic timeline."

---

## Demo Tips

### Before the Demo

- [ ] Test the dev server. Run `npm run dev`. Visit every screen you'll show.
- [ ] Clear your browser tabs. Only AbcERP should be open.
- [ ] Know the mock data: Gulshan Residence (RE-00027), Nasirabad Heights (RE-00031), Uttara Greens (RE-00035)
- [ ] Open the Guide Panel once to show it exists, then close it. Don't make the demo about the guide — make it about the business.

### During the Demo

- **Never say "module" or "feature."** Say "let me show you what your Monday looks like."
- **Never read the screen.** The audience can read. Instead, tell the story behind the number.
- **Pause on pain moments.** Don't rush past the "aha" moment. Let it land. Ask: "Does this happen to you?"
- **Use their names.** If the CFO's name is Rashid bhai, say "Rashid bhai, this is your screen."
- **Don't show everything.** 3 screens shown well > 15 screens rushed through.
- **End every demo with one question:** "Which of these problems costs you the most money today?"

### After the Demo

- **Don't ask "What do you think?"** — that invites vague responses.
- **Ask "Which part would you want to use first?"** — that forces prioritization.
- **Ask "What did I miss? What do you do that I didn't show?"** — that opens the requirement conversation they couldn't have before seeing the app.

---

## Quick Reference: Which Demo for Which Audience

| Audience | Demo | Duration | Key Screens | Key Pain Moment |
|---|---|---|---|---|
| CEO / Owner | Demo 1 | 20 min | CEO Dashboard, Profit Erosion, Pipeline | "Where did your margin go?" |
| Site Team | Demo 2 | 20 min | Site Dashboard, DSR, Running Bill | "Site shutdowns cost ৳38K each" |
| Sales Team | Demo 3 | 15 min | Sales Dashboard, Booking Wizard | "Double-selling units" |
| CFO / Accounts | Demo 4 | 15 min | CFO Dashboard, Budget, Reports | "Committed costs are invisible" |
| BD Team | Demo 5 | 15 min | Land Dashboard, Pipeline, Add Land | "52-day stale lead nobody noticed" |
| Board Meeting | Demo 1 + 4 | 25 min | CEO + CFO Dashboards | "Sunday evening portfolio check" |
| Full Team | Demo 1 + 2 + 3 | 45 min | All | Start with boss, then operations, then sales |

---

## The One Line That Closes Every Demo

> "This prototype has 80 screens covering land acquisition, construction, sales, and project closure. Every screen was designed to solve a specific problem that real estate developers face every day. The question isn't whether you need this — you already know you do. The question is which problems are costing you the most money right now."
