# Land Evaluation — Developer's Guide to the Real Estate Business

**Purpose:** Help the development team understand how land evaluation actually works in Bangladesh real estate — not from specs, but from how it happens on the ground.

**Audience:** Engineers, designers, and QA who need domain context for building and demoing AbcERP.

---

## The Story

Someone calls your boss and says: *"There's a 15-katha plot in Bashundhara, the owner wants to sell."*

That's a **land lead**. Now the question: **should we buy it and build a 14-story apartment building?**

That question seems simple, but answering it requires **8 different departments** to investigate **54 different things**. No single person has all the knowledge. The CEO can't decide alone.

---

## The 8 Departments and What They Actually Look At

### 1. Land & Location (Development Team — 6 criteria)

This is the BD guy's first visit. He goes to the site and answers:

| What They Check | Why It Matters |
|---|---|
| **Location suitability** | Is this Gulshan or is this a village road? Apartment buyers care about address |
| **Road access** | Can a concrete mixer truck enter? If the access road is 10 feet wide, you can't build |
| **Neighborhood** | Are there other apartments? Schools? Markets? Or factories and slums? |
| **Land shape** | A long narrow plot can't fit a building efficiently. Square/rectangular is ideal |
| **Surrounding development** | If 5 other developers are building here too, that's both validation and competition |
| **Owner information** | Is the owner one person or 47 inheritors? More owners = more complications |

**Real-world example:** A plot in Uttara looked perfect — great location, good price. But the access road was 8 feet wide and shared with a garment factory. Concrete trucks couldn't enter. Dead on arrival.

---

### 2. Legal & Title (Legal Team — 9 criteria)

This is the most critical department. **Bad title = total loss.**

| What They Check | Why It Matters |
|---|---|
| **Ownership verification** | Does the seller actually own this land? (You'd be surprised how often they don't) |
| **Chain of title** | How did the current owner get it? Buy? Inherit? Gift? Each has different risks |
| **Encumbrance** | Is the land mortgaged to a bank? Any liens? |
| **Mutation** | Is the government land record (khatian/porcha) updated to current owner's name? |
| **Litigation** | Any court cases? Land disputes in Bangladesh can last 20+ years |
| **Seller authority** | Does this person have the legal right to sell? Power of Attorney valid? |
| **POA verification** | If selling via Power of Attorney, is it genuine? (Forgery is common) |
| **Succession** | If inherited, did all legal heirs agree? One missing heir = future lawsuit |
| **Govt acquisition** | Is the government planning to take this land for a road or railway? |

**Critical rule:** If Legal Title Verification = FAIL, the entire evaluation is automatically "Not Recommended" regardless of how good everything else looks. This is a **deal-breaker**.

**Real-world example:** A developer bought 12 katha in Mirpur. Built 4 floors. Then a person showed up with a court order claiming ownership through inheritance. The original seller was one of 5 siblings — only 3 had signed. The building was sealed by court for 8 years.

---

### 3. Engineering (Engineering Team — 11 criteria)

The structural engineer visits the site and evaluates:

| What They Check | Why It Matters |
|---|---|
| **Soil condition** | Sandy soil vs clay vs fill land. Determines foundation type and cost |
| **Buildable area** | After setbacks and FAR rules, how much can you actually build? |
| **Foundation type required** | Pile foundation costs 3-5x more than strip foundation. This changes everything |
| **Utilities availability** | Water, electricity, gas, sewerage — are they available nearby? |
| **Construction constraints** | Overhead power lines? Neighboring building too close? Underground pipes? |
| **Access for equipment** | Can a crane operate? Can a piling rig fit? |
| **Estimated duration** | 24 months? 36 months? Longer duration = more cost + more risk |
| **Construction cost estimate** | Rough estimate per sqft based on soil, height, location |
| **Topography** | Is the land flat? Sloped? Below road level? (Fill cost can be enormous) |
| **Technical risk** | Any unusual engineering challenges? |

**Real-world example:** A 20-katha plot in Bashundhara had great location and clean title. But soil testing revealed it was filled land over a natural waterbody (beel). Pile foundation cost went from estimated BDT 3 Crore to BDT 11 Crore. The project was no longer feasible.

---

### 4. Regulatory (Planning Team — 6 to 16 criteria)

This department checks what the **government allows**:

| What They Check | Why It Matters |
|---|---|
| **Zoning** | Is this zone approved for residential construction? |
| **FAR (Floor Area Ratio)** | How much total floor area can you build? If FAR is 5 on 10 katha, max = 50 katha |
| **MGC (Maximum Ground Coverage)** | How much of the land can the building footprint cover? Usually 50-60% |
| **Height restriction** | Airport proximity? Heritage zone? Army cantonment? These limit building height |
| **Setbacks** | Mandatory gaps from road, boundaries. Eat into buildable area |
| **RAJUK/CDA/municipal permit** | Can you actually get a building permit here? |
| **Environmental clearance** | Near a river? Flood zone? Environmental ministry may block |
| **Fire safety** | Fire truck access? Hydrant proximity? |

**This is Bangladesh-specific.** In UAE it would be DM permits and RERA. In KSA it would be Wafi and Balady. Same engine, different criteria — that's why the system is configurable.

**Real-world example:** A developer calculated 14 floors based on general FAR knowledge. RAJUK's Detailed Area Plan (DAP) for that specific plot allowed only 8 floors. Revenue dropped 40%. The feasibility collapsed.

---

### 5. Marketing (Marketing Team — 8 criteria)

This team answers: **can we sell apartments here, and at what price?**

| What They Check | Why It Matters |
|---|---|
| **Market demand** | Are people buying apartments in this area? Or is it oversupplied? |
| **Expected selling price** | BDT/sqft estimate based on comparables |
| **Competition** | How many other projects are selling in 2km radius? |
| **Price trend** | Are prices going up or down in this area? |
| **Demographics** | Who would buy here? Service holders? Businessmen? NRBs? |
| **Infrastructure** | Metro coming nearby? New highway? School/hospital? |
| **Comparable projects** | What did Sheltech/Rancon/Bashundhara sell at? |
| **Complexity** | Simple flat sale or complex (duplex, penthouse, commercial mix)? |

---

### 6. Sales (Sales Team — 5 criteria)

Different from Marketing. Sales asks: **how fast can we actually sell?**

| What They Check | Why It Matters |
|---|---|
| **Sales velocity** | How many units/month can we expect? 2/month vs 5/month changes cash flow |
| **Pre-sales potential** | Can we sell 30% before construction starts? (Critical for cash flow) |
| **Payment plan feasibility** | Can buyers afford 10% booking + 36 monthly installments? |
| **Customer profile** | End-users (slower but stable) vs investors (fast but may cancel) |
| **Competition impact** | Will competitor launches in the same period hurt our sales? |

---

### 7. Cost Estimate (Engineering — 17 cost categories)

Engineering does a second pass — detailed cost estimation across:

| # | Category | What It Covers |
|---|----------|---------------|
| 1 | Site Preparation | Land clearing, soil filling, temporary facilities |
| 2 | Foundation | Pile driving, pile caps, grade beams, raft |
| 3 | RCC Structure | Columns, beams, slabs, stairs — the skeleton |
| 4 | Masonry | Brick walls, block walls, partition walls |
| 5 | Plastering | Internal and external wall finish |
| 6 | Flooring | Tiles, marble, granite, wooden flooring |
| 7 | Doors & Windows | Frames, shutters, grills, glass |
| 8 | Painting | Internal and external paint, putty, primer |
| 9 | Electrical | Wiring, switches, panels, generator, transformer |
| 10 | Plumbing | Water supply, drainage, sanitary fittings |
| 11 | Fire Protection | Fire alarm, sprinkler, hydrant, extinguisher |
| 12 | HVAC | Central AC, split AC provision, ventilation |
| 13 | Lift | Passenger lift, service lift, installation |
| 14 | External Development | Boundary wall, gate, landscaping, parking, roads |
| 15 | Utility Connections | WASA, DESCO/DPDC, Titas gas, sewerage |
| 16 | Other | Consultants, approvals, marketing, legal fees |
| 17 | Contingency | Typically 5-10% buffer for unknowns |

Each category can be estimated via: Cost/sqft, Quantity x Rate, Lump Sum, Historical Average, or Manual entry.

---

### 8. Financial (Finance Team — 6 criteria)

Finance takes **everyone else's numbers** and builds the financial model:

| What They Check | Why It Matters |
|---|---|
| **IRR (Internal Rate of Return)** | Is the return better than putting money in the bank? Threshold: >15% |
| **Net margin** | Revenue - All Costs. Is this actually profitable? |
| **Payback period** | How many months until we get our money back? |
| **Peak funding** | Maximum cash we need at any point. Can we fund it? |
| **Break-even** | How many units must we sell just to cover costs? |
| **Finance cost sensitivity** | What if interest rates go up 2%? Still feasible? |

**Key insight:** Finance doesn't make up numbers. Every assumption in the financial model comes from another department:
- Revenue = Marketing's price x Sales' velocity x Engineering's buildable area
- Cost = Engineering's cost estimate
- Timeline = Engineering's duration estimate

The system tracks **source attribution** — "Revenue assumption of BDT 8,500/sqft came from Marketing department, provided by Rahim, last updated 15 Aug 2026." If that assumption is >30 days old, it shows a staleness warning.

---

## The Dependency Chain (Why Order Matters)

```
Land & Location ---+
Legal & Title -----+  (can start in parallel)
Regulatory --------+
Engineering -------+
                   |
                   v
Marketing ---------+  (needs Engineering's buildable area)
Sales -------------+  (needs Marketing's price)
                   |
                   v
Cost Estimate -----+  (needs Engineering's foundation type)
                   |
                   v
Financial ---------+  (needs EVERYONE's numbers)
```

Financial **cannot start** until Engineering, Marketing, Sales, and Cost Estimate are done. This dependency is encoded in the workflow rules of the evaluation framework.

---

## What the Client Currently Does (Probably)

Based on typical Bangladeshi developers:

1. Boss gets a call -> sends BD guy to "check the land"
2. BD guy takes photos, talks to neighbors, comes back
3. Boss asks lawyer friend to "check the papers"
4. Engineer goes to site, comes back with verbal estimate
5. Boss asks "what's the price?" — someone says a number
6. Boss decides based on gut feeling + the number
7. **Nobody writes anything down. No evaluation report. No risk register.**
8. 3 months later, a problem surfaces that someone noticed but didn't report

Our system replaces steps 1-7 with a structured, audited, multi-department process where **nothing stays in anyone's head** and the CEO gets a 1-page decision screen with everything consolidated.

---

## How to Demo This to the Client

Don't say "8 departments evaluate 54 criteria." Say:

> *"Alam bhai, last time you bought land in Uttara, do you remember the soil problem? The engineer knew about it but nobody told you until the foundation contractor quoted 3x. With this system, the engineer fills in his assessment, the system flags it as CRITICAL, and it shows up on your decision screen before you sign the agreement."*

Every feature maps to a problem they've already experienced.

---

## Key Terms for the Dev Team

| Term | What It Means |
|---|---|
| **Katha** | Land area unit in Bangladesh. 1 katha = 720 sqft. A 10-katha plot = 7,200 sqft |
| **Khatian** | Government land ownership record (like a title deed number) |
| **Dag** | Plot/parcel number within a mouza (smallest administrative area) |
| **Mouza** | Smallest revenue/administrative unit — like a neighborhood with an official number |
| **Porcha** | Copy of the khatian record from the land office |
| **Mutation** | Transfer of land record name in government registry after a sale/inheritance |
| **FAR** | Floor Area Ratio — total buildable floor area / land area. FAR 5 on 10 katha = 50 katha buildable |
| **MGC** | Maximum Ground Coverage — % of land the building footprint can cover (typically 50-60%) |
| **RAJUK** | Capital Development Authority (Dhaka). Approves building plans |
| **CDA** | Chittagong Development Authority (same role as RAJUK for Chittagong) |
| **DAP** | Detailed Area Plan — RAJUK's zoning plan that specifies FAR/height per area |
| **BNBC** | Bangladesh National Building Code — construction standards |
| **JV** | Joint Venture — landowner gives land, developer builds, they split units (e.g., 60-40) |
| **IRR** | Internal Rate of Return — annualized return on investment. >15% is typical threshold |
| **NPV** | Net Present Value — total project value in today's money. Must be positive |
| **DLP** | Defect Liability Period — 12-24 months after handover where contractor fixes defects for free |
| **NRB** | Non-Resident Bangladeshi — diaspora buyers (significant market segment) |
| **BDT** | Bangladeshi Taka (currency). 1 Crore = 10 Million BDT |

---

## What's Next in This Series

- `02-construction-lifecycle-explained.md` — What happens after land is bought (project setup through construction)
- `03-sales-and-collections-explained.md` — How apartments are sold, payment plans, and revenue recognition
- `04-financial-flows-explained.md` — How every operation creates GL entries (the money spine)
- `05-demo-playbook.md` — Person-by-person demo scripts with pain-moment hooks
