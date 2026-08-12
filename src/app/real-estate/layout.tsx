"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, Building2, ClipboardList, Calculator,
  FileText, Home, TrendingUp, BarChart3, UserCircle
} from "lucide-react";

const navItems = [
  { href: "/real-estate", label: "Dashboard", icon: LayoutDashboard },
  { href: "/real-estate/projects", label: "Projects", icon: Building2 },
  { href: "/real-estate/dsr", label: "Daily Site Report", icon: ClipboardList },
  { href: "/real-estate/boq", label: "BOQ & Estimation", icon: Calculator },
  { href: "/real-estate/running-bill", label: "Running Bill", icon: FileText },
  { href: "/real-estate/booking", label: "Unit Booking", icon: Home },
  { href: "/real-estate/feasibility", label: "Feasibility", icon: TrendingUp },
  { href: "/real-estate/budget", label: "Budget vs Actual", icon: BarChart3 },
  { href: "/real-estate/buyer-portal", label: "Buyer Portal", icon: UserCircle },
];

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full">
        <div className="p-5 border-b border-slate-700">
          <h1 className="text-lg font-bold">AbcERP</h1>
          <p className="text-xs text-slate-400 mt-0.5">Real Estate Development</p>
          <span className="inline-block mt-2 text-[10px] bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded-full font-medium">
            PROTOTYPE
          </span>
        </div>
        <nav className="flex-1 py-4 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href ||
              (item.href !== "/real-estate" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-slate-700 text-xs text-slate-500">
          <p>ABC Properties Ltd.</p>
          <p className="mt-0.5">Prototype v0.1 — Static Data</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 bg-gray-50 min-h-screen">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
