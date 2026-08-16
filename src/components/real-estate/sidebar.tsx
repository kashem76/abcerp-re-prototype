"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { fixedTopNav, moduleNav, modules, type ModuleId } from "@/lib/navigation";
import { Settings, HelpCircle } from "lucide-react";

interface SidebarProps {
  activeModule: ModuleId;
  onModuleChange: (moduleId: ModuleId) => void;
}

export function Sidebar({ activeModule, onModuleChange }: SidebarProps) {
  const pathname = usePathname();
  const sections = moduleNav[activeModule] ?? [];
  const activeModuleMeta = modules.find((m) => m.id === activeModule);

  function isActive(href: string) {
    if (href === "/real-estate") return pathname === href;
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <aside className="w-56 bg-slate-900 text-white flex flex-col fixed top-14 left-0 bottom-0 z-40">
      {/* Module indicator */}
      <div className="px-4 py-3 border-b border-slate-700/50">
        <div className="flex items-center gap-2">
          {activeModuleMeta && (
            <activeModuleMeta.icon className="h-4 w-4 text-blue-400" />
          )}
          <span className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
            {activeModuleMeta?.label}
          </span>
        </div>
      </div>

      <nav className="flex-1 py-2 overflow-y-auto">
        {/* Fixed top items */}
        <div className="mb-1 pb-1 border-b border-slate-700/30">
          {fixedTopNav.map((item) => {
            const active = isActive(item.href);
            // Dashboard link points to the module's dashboard
            const href =
              item.label === "Dashboard" && activeModuleMeta
                ? activeModuleMeta.dashboardHref
                : item.href;
            return (
              <Link
                key={item.label}
                href={href}
                className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                  active
                    ? "bg-blue-600 text-white font-medium"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Module-specific sections */}
        {sections.map((section) => (
          <div key={section.title} className="mt-2">
            <p className="px-4 py-1.5 text-[10px] uppercase tracking-wider text-slate-500 font-semibold">
              {section.title}
            </p>
            {section.items.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2.5 px-4 py-2 text-sm transition-colors ${
                    active
                      ? "bg-blue-600 text-white font-medium"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom fixed */}
      <div className="border-t border-slate-700 py-2">
        <button
          onClick={() => onModuleChange("settings")}
          className={`flex items-center gap-2.5 px-4 py-2 text-sm w-full transition-colors ${
            activeModule === "settings"
              ? "text-white"
              : "text-slate-400 hover:text-white hover:bg-slate-800"
          }`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </button>
      </div>

      <div className="px-4 py-3 border-t border-slate-700 text-[10px] text-slate-500">
        <p>ABC Properties Ltd.</p>
        <p className="mt-0.5">Prototype v0.3</p>
        <span className="inline-block mt-1.5 text-[9px] bg-yellow-500/20 text-yellow-300 px-1.5 py-0.5 rounded-full font-medium">
          PROTOTYPE
        </span>
      </div>
    </aside>
  );
}
