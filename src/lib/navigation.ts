import {
  LayoutDashboard, Building2, MapPin, TrendingUp, BarChart3,
  FileText, FolderTree, Calculator, CheckSquare, ClipboardList,
  Package, Hammer, Home, UserCircle, Settings, Database,
  DollarSign, HardHat, ShoppingCart, Users, Landmark,
  FileBarChart, Search, Bell, ChevronDown, Shield, Map,
  Clipboard, GitBranch, Hash, ShieldCheck, Layers,
  Handshake, FileSpreadsheet, Truck, Receipt, PenLine,
  type LucideIcon,
} from "lucide-react";

// ─── Module definitions ───────────────────────────────────────

export type ModuleId =
  | "executive"
  | "land-bd"
  | "project-office"
  | "procurement"
  | "site-engineering"
  | "sales"
  | "settings";

export interface ModuleTab {
  id: ModuleId;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
  dashboardHref: string;
}

export const modules: ModuleTab[] = [
  { id: "executive",        label: "Executive",        shortLabel: "Exec",   icon: BarChart3,    dashboardHref: "/real-estate/dashboards/ceo" },
  { id: "land-bd",          label: "Land & BD",        shortLabel: "Land",   icon: Landmark,     dashboardHref: "/real-estate/dashboards/land-dev" },
  { id: "project-office",   label: "Project Office",   shortLabel: "Proj",   icon: HardHat,      dashboardHref: "/real-estate/dashboards/project-director" },
  { id: "procurement",      label: "Procurement",      shortLabel: "Procure",icon: ShoppingCart,  dashboardHref: "/real-estate/dashboards/procurement" },
  { id: "site-engineering",  label: "Site Engineering", shortLabel: "Site",   icon: Hammer,       dashboardHref: "/real-estate/dashboards/site-engineering" },
  { id: "sales",            label: "Sales",            shortLabel: "Sales",  icon: Users,        dashboardHref: "/real-estate/dashboards/sales" },
  { id: "settings",         label: "Settings",         shortLabel: "Config", icon: Settings,     dashboardHref: "/real-estate/settings" },
];

// ─── Sidebar nav items ───────────────────────────────────────

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

// Fixed items — always visible regardless of active module
export const fixedTopNav: NavItem[] = [
  { href: "/real-estate",          label: "Dashboard",  icon: LayoutDashboard },
  { href: "/real-estate/projects", label: "Projects",   icon: Building2 },
  { href: "/real-estate/reports",  label: "Reports",    icon: FileBarChart },
];

// Module-specific nav sections
export const moduleNav: Record<ModuleId, NavSection[]> = {
  executive: [
    {
      title: "Dashboards",
      items: [
        { href: "/real-estate/dashboards/ceo",  label: "CEO Dashboard",  icon: BarChart3 },
        { href: "/real-estate/dashboards/cfo",  label: "CFO Dashboard",  icon: DollarSign },
      ],
    },
    {
      title: "Portfolio",
      items: [
        { href: "/real-estate/budget",          label: "Budget vs Actual", icon: FileSpreadsheet },
        { href: "/real-estate/land-leads",      label: "Land Pipeline",    icon: MapPin },
      ],
    },
  ],

  "land-bd": [
    {
      title: "Land",
      items: [
        { href: "/real-estate/land-leads",       label: "Land Pipeline",  icon: MapPin },
        { href: "/real-estate/land-leads/new",   label: "Add Land",       icon: MapPin },
      ],
    },
  ],

  "project-office": [
    {
      title: "Planning",
      items: [
        { href: "/real-estate/wbs",              label: "WBS Builder",      icon: FolderTree },
        { href: "/real-estate/boq",              label: "BOQ & Estimation", icon: Calculator },
        { href: "/real-estate/boq/approve",      label: "BOQ Approval",     icon: CheckSquare },
      ],
    },
    {
      title: "Monitoring",
      items: [
        { href: "/real-estate/budget",           label: "Budget vs Actual", icon: FileSpreadsheet },
      ],
    },
    {
      title: "Closeout",
      items: [
        { href: "/real-estate/handover",         label: "Handover",        icon: CheckSquare },
        { href: "/real-estate/closure",          label: "Project Closure", icon: Shield },
      ],
    },
  ],

  procurement: [
    {
      title: "Sourcing",
      items: [
        { href: "/real-estate/tender",           label: "Tenders & CS",   icon: FileText },
        { href: "/real-estate/contract",         label: "Contracts",      icon: Handshake },
        { href: "/real-estate/work-order",       label: "Work Orders",    icon: Clipboard },
      ],
    },
    {
      title: "Materials",
      items: [
        { href: "/real-estate/material-requisition", label: "Requisitions",     icon: Package },
        { href: "/real-estate/material-issue",       label: "Material Issue",   icon: Truck },
      ],
    },
  ],

  "site-engineering": [
    {
      title: "Daily Ops",
      items: [
        { href: "/real-estate/dsr",              label: "Daily Site Report", icon: ClipboardList },
      ],
    },
    {
      title: "Materials",
      items: [
        { href: "/real-estate/material-requisition", label: "Requisitions",     icon: Package },
        { href: "/real-estate/material-issue",       label: "Material Issue",   icon: Truck },
      ],
    },
    {
      title: "Billing",
      items: [
        { href: "/real-estate/running-bill",     label: "Running Bills",    icon: Receipt },
        { href: "/real-estate/variation",        label: "Variations",       icon: PenLine },
      ],
    },
  ],

  sales: [
    {
      title: "Bookings",
      items: [
        { href: "/real-estate/booking",               label: "Unit Booking",   icon: Home },
        { href: "/real-estate/booking/cancellation",   label: "Cancellation",   icon: Shield },
        { href: "/real-estate/booking/transfer",       label: "Transfer",       icon: Users },
      ],
    },
    {
      title: "Customer",
      items: [
        { href: "/real-estate/buyer-portal",     label: "Buyer Portal",   icon: UserCircle },
      ],
    },
  ],

  settings: [
    {
      title: "Master Data",
      items: [
        { href: "/real-estate/masters/cost-codes",     label: "Cost Codes",       icon: Database },
        { href: "/real-estate/masters/boq-items",       label: "BOQ Item Master",  icon: Database },
        { href: "/real-estate/masters/rate-templates",  label: "Rate Templates",   icon: Database },
      ],
    },
    {
      title: "Project Config",
      items: [
        { href: "/real-estate/settings",                    label: "Module Settings",      icon: Settings },
        { href: "/real-estate/settings/lifecycle",          label: "Lifecycle Stages",     icon: GitBranch },
        { href: "/real-estate/settings/numbering",          label: "Numbering",            icon: Hash },
        { href: "/real-estate/settings/approval-workflows", label: "Approval Workflows",   icon: ShieldCheck },
        { href: "/real-estate/settings/dimension-rules",    label: "Dimension Rules",      icon: Layers },
      ],
    },
    {
      title: "Land Config",
      items: [
        { href: "/real-estate/settings/land-evaluation",    label: "Land Evaluation",      icon: Map },
      ],
    },
  ],
};

// ─── Route → Module mapping ──────────────────────────────────
// Used to auto-detect which module tab should be active based on current URL

interface RouteMapping {
  prefix: string;
  module: ModuleId;
}

const routeMappings: RouteMapping[] = [
  // Executive dashboards
  { prefix: "/real-estate/dashboards/ceo",              module: "executive" },
  { prefix: "/real-estate/dashboards/cfo",              module: "executive" },
  // Land & BD
  { prefix: "/real-estate/land-leads",                  module: "land-bd" },
  { prefix: "/real-estate/dashboards/land-dev",         module: "land-bd" },
  // Project Office
  { prefix: "/real-estate/dashboards/project-director", module: "project-office" },
  { prefix: "/real-estate/wbs",                         module: "project-office" },
  { prefix: "/real-estate/boq",                         module: "project-office" },
  { prefix: "/real-estate/budget",                      module: "project-office" },
  { prefix: "/real-estate/handover",                    module: "project-office" },
  { prefix: "/real-estate/closure",                     module: "project-office" },
  // Procurement
  { prefix: "/real-estate/dashboards/procurement",      module: "procurement" },
  { prefix: "/real-estate/tender",                      module: "procurement" },
  { prefix: "/real-estate/contract",                    module: "procurement" },
  { prefix: "/real-estate/work-order",                  module: "procurement" },
  // Site Engineering
  { prefix: "/real-estate/dashboards/site-engineering", module: "site-engineering" },
  { prefix: "/real-estate/dsr",                         module: "site-engineering" },
  { prefix: "/real-estate/material-requisition",        module: "site-engineering" },
  { prefix: "/real-estate/material-issue",              module: "site-engineering" },
  { prefix: "/real-estate/running-bill",                module: "site-engineering" },
  { prefix: "/real-estate/variation",                   module: "site-engineering" },
  // Sales
  { prefix: "/real-estate/dashboards/sales",            module: "sales" },
  { prefix: "/real-estate/booking",                     module: "sales" },
  { prefix: "/real-estate/buyer-portal",                module: "sales" },
  // Settings
  { prefix: "/real-estate/settings",                    module: "settings" },
  { prefix: "/real-estate/masters",                     module: "settings" },
];

export function detectModuleFromPath(pathname: string): ModuleId {
  // Sort by prefix length descending so more specific routes match first
  const sorted = [...routeMappings].sort((a, b) => b.prefix.length - a.prefix.length);
  for (const mapping of sorted) {
    if (pathname.startsWith(mapping.prefix)) {
      return mapping.module;
    }
  }
  return "executive"; // default
}
