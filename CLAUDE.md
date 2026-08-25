# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project Overview

AbcERP Real Estate is a **clickable UI prototype** (80+ screens) demonstrating a complete real estate development ERP lifecycle — from land lead acquisition through project closure. There is **no backend, no database, no API, no auth**. All data is static mock data.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build
npm run lint     # ESLint
```

No test framework is configured.

## Tech Stack

- **Next.js 16.3** (App Router) with React 19, TypeScript 5
- **Tailwind CSS 4** with `@tailwindcss/postcss`
- **shadcn/ui** (Base UI + CVA + tailwind-merge) — components in `src/components/ui/`
- **Recharts** for charts/dashboards
- **Lucide React** for icons
- Path alias: `@/*` maps to `./src/*`

## Architecture

### Routing

All screens live under `src/app/real-estate/` with a shared sidebar layout (`layout.tsx`, client component). The root `/` redirects or is unused — the app entry point is `/real-estate`.

Navigation sections in the sidebar: Overview, Pre-Project, Planning & BOQ, Execution, Revenue, Close & Portal, Reports, Settings.

### Data Layer

**Everything is mock data.** Shared mock data lives in `src/lib/mock-data.ts` (projects array with financials, units, health scores). Many screens also define inline mock data within their own page files. Currency formatting uses a `formatBDT()` helper from mock-data.

### Screen Pattern

Each screen is a `page.tsx` that is typically `"use client"` and self-contained:
- Imports shadcn components (`Card`, `Table`, `Badge`, `Tabs`, etc.)
- Imports icons from `lucide-react`
- Uses inline or shared mock data
- No API calls, no server actions, no data fetching

### Utilities

- `src/lib/utils.ts` — single `cn()` helper (clsx + twMerge)

## Key Conventions

- All monetary values are in BDT (Bangladeshi Taka), formatted via `formatBDT()`
- Project IDs follow `RE-XXXXX` pattern
- Screens are organized by business workflow phase (pre-project → planning → execution → revenue → closure)
- Build progress is tracked in `_docs/93-screen-tracker.md` and `_docs/05-build-plan.md`
