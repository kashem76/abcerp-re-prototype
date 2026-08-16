"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { TopBar } from "@/components/real-estate/top-bar";
import { Sidebar } from "@/components/real-estate/sidebar";
import { detectModuleFromPath, type ModuleId } from "@/lib/navigation";

export default function RealEstateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [activeModule, setActiveModule] = useState<ModuleId>(() =>
    detectModuleFromPath(pathname)
  );

  // Sync active module when user navigates via links (not tab clicks)
  useEffect(() => {
    const detected = detectModuleFromPath(pathname);
    setActiveModule(detected);
  }, [pathname]);

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar activeModule={activeModule} onModuleChange={setActiveModule} />
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      <main className="ml-56 pt-14 min-h-screen">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
