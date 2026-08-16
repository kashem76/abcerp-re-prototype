# UX Philosophy & Navigation Architecture

**Purpose:** This document defines the core UX principles and navigation structure for AbcERP Real Estate. Every screen, flow, and interaction in the prototype should follow these rules.

**Design Rule:** Don't make the user navigate the ERP. Make the ERP navigate the user.

---

## 1. Core UX Principle

The user should rarely need to decide where to go. The system should show:

1. **What is happening** — current state, key numbers, progress
2. **What is missing** — incomplete items, warnings, exceptions
3. **What to do next** — recommended action with a clear button

Every successful action ends with a recommended next action. No dead ends.

---

## 2. Four Primary Work Areas

The entire product is organized into 4 primary work areas, not 20+ sidebar modules.

```
┌──────────────────┬───────────────────────────────────────────────┐
│                  │                                               │
│  Home            │                                               │
│                  │                                               │
│  Land            │        Current Workspace                      │
│                  │                                               │
│  Projects        │                                               │
│                  │                                               │
│  Finance         │                                               │
│                  │                                               │
│  ─────────────   │                                               │
│  My Work     8   │                                               │
│  Reports         │                                               │
│                  │                                               │
├──────────────────┴───────────────────────────────────────────────┤
│  Search anything...                                  🔔   User  │
└──────────────────────────────────────────────────────────────────┘
```

### What Each Area Contains

| Area | What It Is | What It Is NOT |
|---|---|---|
| **Home** | Work assistant — "what do I need to do today?" | A dashboard of charts |
| **Land** | Unified pipeline from lead capture to project conversion | Separate Lead, Opportunity, Feasibility, Agreement modules |
| **Projects** | Active project workspaces — plan, build, sell, close | Separate BOQ, Requisition, Contract, Booking modules |
| **Finance** | Financial oversight, budgets, reports | Replicated in every module |

### Hidden Complexity

These concepts are **activities inside Land or Projects**, not separate sidebar destinations:

- Opportunity → activity inside Land workspace
- Due Diligence → activity inside Land workspace (Investigation tab)
- Feasibility → activity inside Land workspace (Feasibility tab)
- Land Agreement → activity inside Land workspace (Acquisition tab)
- BOQ → tab inside Project workspace
- Material Requisition → activity inside Project > Buy tab
- Running Bill → activity inside Project > Build tab
- Unit Booking → activity inside Project > Sales tab

Users don't need to know the internal entity model.

---

## 3. Home — "What Do I Need to Do?"

The homepage is a **work assistant**, not a dashboard.

```
HOME
Good morning, Rahim

┌────────────────────────────────────────────────────────────────────┐
│ YOUR WORK                                                          │
│                                                                    │
│  5 things need your attention                                     │
│                                                                    │
│  🔴 Gulshan Plot                                                  │
│     Mutation document missing                                     │
│     [Upload Document]                                              │
│                                                                    │
│  🟠 Bashundhara Plot                                              │
│     Site visit scheduled today · 11:00 AM                         │
│     [Open Visit]                                                   │
│                                                                    │
│  🟠 Uttara Project                                                │
│     Purchase requisition waiting for approval                     │
│     ৳1,250,000                                                     │
│     [Review]                                                       │
│                                                                    │
│  🔵 Banani Opportunity                                            │
│     Feasibility ready for your approval                           │
│     IRR 22.4% · Margin 24.1%                                      │
│     [Review Feasibility]                                           │
│                                                                    │
│                       [View All My Work →]                         │
└────────────────────────────────────────────────────────────────────┘


RECENT

Gulshan Plot       Feasibility          Updated 20 min ago
Uttara Heights     Construction         Updated 1 hr ago
Banani Plot        Due Diligence        Yesterday
```

A user can start the day **without understanding the application's navigation**.

---

## 4. Universal Interaction Pattern

Almost every important screen follows the same structure:

```
┌─────────────────────────────────────────────────────┐
│ OBJECT + STATUS                                     │
│ Gulshan Residence                CONSTRUCTION       │
├─────────────────────────────────────────────────────┤
│ SIMPLE NAVIGATION                                   │
│ Overview | BOQ | Buy | Build | Sales | Finance     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  WHAT IS HAPPENING?                                 │
│                                                     │
│  Key information / performance                     │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  WHAT NEEDS ATTENTION?                              │
│                                                     │
│  Warnings / exceptions / missing information       │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  WHAT SHOULD I DO NEXT?                             │
│                                                     │
│              [Primary Action →]                     │
│                                                     │
└─────────────────────────────────────────────────────┘
```

This consistency is more important than making individual screens clever.

---

## 5. Navigation Rules

### Every Action Has a Next Step

After any successful action (save, approve, complete), the system shows:
1. Confirmation of what happened
2. Recommended next action with a button
3. Alternative actions
4. A way back

Example after creating a land record:

```
✓ Land created

Gulshan Plot 07

We've created the land workspace.

Recommended next step:

        Schedule a site visit

        [Schedule Visit]

or

[Add Documents]      [Start Initial Review]
```

### Progressive Disclosure

- A junior BD officer sees a simple checklist
- An engineer sees technical tasks
- Finance sees numbers
- The CEO sees decisions
- An advanced user can still open full modules when necessary

### Role-Based Views

Different roles see different Home pages and different levels of detail:

| Role | Home Shows | Primary Area |
|---|---|---|
| BD Officer | Land leads, site visits due | Land |
| Engineer | BOQ items, DSR due, material requests | Projects |
| Sales | Bookings, collections due, demands | Projects > Sales |
| Finance | Approvals, payments, AR/AP | Finance |
| Project Director | Project health, exceptions, decisions | Projects |
| CEO/MD | Portfolio KPIs, decisions, risks | Home |

---

## 6. The Complete Flow

```
                        HOME
                          │
                          ▼
                       LAND
                          │
                    [+ Add Land]
                          │
                          ▼
                  LAND WORKSPACE
                          │
              ┌───────────┴───────────┐
              │ System tells user:    │
              │ "Here's what's next"  │
              └───────────┬───────────┘
                          │
                          ▼
                     INVESTIGATE
                          │
                          ▼
                     FEASIBILITY
                          │
                          ▼
                       APPROVAL
                          │
                    ┌─────┴─────┐
                  Reject      Approve
                                │
                                ▼
                          ACQUISITION
                                │
                                ▼
                         CREATE PROJECT
                                │
                                ▼
                       PROJECT WORKSPACE
                                │
             ┌──────────────────┼───────────────────┐
             ▼                  ▼                   ▼
            BOQ                BUY                 BUILD
             │                  │                   │
             └──────────────────┼───────────────────┘
                                ▼
                              SALES
                                │
                                ▼
                             FINANCE
                                │
                                ▼
                            FORECAST
                                │
                                ▼
                              CLOSE
```

---

## 7. What This Means for the Prototype

### Screens to Build

| Area | Screens |
|---|---|
| Home | My Work, Recent Activity |
| Land | Land List, Land Workspace (tabbed), Add Land (simple form) |
| Projects | Project List, Project Workspace (tabbed), Create Project |
| Finance | Budget overview, Approvals queue |
| Reports | Reports hub (already built) |
| Settings | Evaluation frameworks, Masters, Module config |

### Screens NOT Needed as Standalone Destinations

These become tabs or inline activities within Land/Project workspaces:

- ~~Opportunity list~~ → part of Land workspace
- ~~Due Diligence page~~ → Investigation tab in Land workspace
- ~~Feasibility list~~ → Feasibility tab in Land workspace
- ~~Land Agreement page~~ → Acquisition tab in Land workspace
- ~~BOQ list~~ → BOQ tab in Project workspace
- ~~Material Requisition list~~ → Buy tab in Project workspace
- ~~Running Bill list~~ → Build tab in Project workspace
- ~~Unit Booking list~~ → Sales tab in Project workspace

### Dashboards

Role-specific dashboards (CEO, CFO, etc.) become views accessible from Home, not separate sidebar destinations. The primary interface is the work assistant, not charts.
