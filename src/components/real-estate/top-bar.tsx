"use client";

import Link from "next/link";
import { modules, type ModuleId } from "@/lib/navigation";
import { Search, Bell, ChevronDown } from "lucide-react";

interface TopBarProps {
  activeModule: ModuleId;
  onModuleChange: (moduleId: ModuleId) => void;
}

export function TopBar({ activeModule, onModuleChange }: TopBarProps) {
  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center px-4 gap-4 fixed top-0 left-0 right-0 z-50">
      {/* Brand */}
      <Link href="/real-estate" className="flex items-center gap-2 mr-2 shrink-0">
        <div className="h-8 w-8 rounded-lg bg-blue-600 flex items-center justify-center">
          <span className="text-white font-bold text-sm">A</span>
        </div>
        <div className="hidden sm:block">
          <p className="text-sm font-bold text-gray-900 leading-none">AbcERP</p>
          <p className="text-[10px] text-gray-400 leading-none mt-0.5">Real Estate</p>
        </div>
      </Link>

      {/* Module Tabs */}
      <nav className="flex items-center gap-0.5 overflow-x-auto flex-1 min-w-0">
        {modules.map((mod) => {
          const isActive = activeModule === mod.id;
          const Icon = mod.icon;
          return (
            <button
              key={mod.id}
              onClick={() => onModuleChange(mod.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-sm whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-blue-50 text-blue-700 font-medium"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">{mod.label}</span>
              <span className="lg:hidden">{mod.shortLabel}</span>
            </button>
          );
        })}
      </nav>

      {/* Right section */}
      <div className="flex items-center gap-2 shrink-0">
        <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100">
          <Search className="h-4 w-4" />
        </button>
        <button className="h-8 w-8 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
        </button>
        <div className="h-6 w-px bg-gray-200 mx-1" />
        <button className="flex items-center gap-2 px-2 py-1 rounded-md hover:bg-gray-50 text-sm">
          <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-xs font-medium text-slate-600">
            AK
          </div>
          <span className="hidden md:inline text-gray-700">Abul Kashem</span>
          <ChevronDown className="h-3 w-3 text-gray-400" />
        </button>
      </div>
    </header>
  );
}
