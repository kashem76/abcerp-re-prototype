"use client";

import Link from "next/link";
import {
  Eye, Clipboard, TrendingUp, DollarSign, FileText,
} from "lucide-react";

type NavId = "overview" | "work" | "evaluation" | "financial" | "decision";

const BASE = "/real-estate/land-leads/LL-2026-001";

const navItems: { id: NavId; href: string; label: string; icon: typeof Eye }[] = [
  { id: "overview", href: BASE, label: "Overview", icon: Eye },
  { id: "work", href: `${BASE}/work`, label: "Work", icon: Clipboard },
  { id: "evaluation", href: `${BASE}/feasibility`, label: "Evaluation", icon: TrendingUp },
  { id: "financial", href: `${BASE}/feasibility/financial`, label: "Financial Model", icon: DollarSign },
  { id: "decision", href: `${BASE}/decision`, label: "Report & Decision", icon: FileText },
];

interface WorkspaceNavProps {
  active: NavId;
}

export function WorkspaceNav({ active }: WorkspaceNavProps) {
  return (
    <div className="flex items-center gap-1 border-b pb-3">
      {navItems.map((tab) => (
        <Link key={tab.id} href={tab.href}>
          <button className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
            tab.id === active
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:text-foreground hover:bg-muted"
          }`}>
            <tab.icon className="h-3.5 w-3.5" />
            {tab.label}
          </button>
        </Link>
      ))}
    </div>
  );
}
