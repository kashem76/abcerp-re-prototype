"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { formatNumber } from "@/lib/mock-data";
import {
  Settings, GitBranch, Hash, ShieldCheck, Layers, Banknote,
  ArrowRight, Percent, Calendar, Building2, FileText, Map,
} from "lucide-react";

const moduleLinks = [
  {
    title: "Lifecycle Stages",
    description: "Configure project lifecycle stages and allowed transitions. Controls which operations are available at each project phase.",
    icon: GitBranch,
    href: "/real-estate/settings/lifecycle",
    color: "text-blue-600",
    stages: 10,
  },
  {
    title: "Numbering Sequences",
    description: "Auto-numbering configuration for projects, BOQs, MRs, running bills, bookings, and all transactional documents.",
    icon: Hash,
    href: "/real-estate/settings/numbering",
    color: "text-emerald-600",
    entities: 12,
  },
  {
    title: "Approval Workflows",
    description: "Configure multi-step approval chains for BOQ, Variation Orders, Running Bills, Bookings, and more. Includes SLA and escalation rules.",
    icon: ShieldCheck,
    href: "/real-estate/settings/approval-workflows",
    color: "text-purple-600",
    workflows: 7,
  },
  {
    title: "Dimension Rules",
    description: "Mandatory accounting dimensions per transaction type. Ensures every financial posting carries the right project, WBS, and cost code tags.",
    icon: Layers,
    href: "/real-estate/settings/dimension-rules",
    color: "text-amber-600",
    rules: 6,
  },
  {
    title: "Land Evaluation",
    description: "Configure land selection criteria, evaluation frameworks, team assignments, workflow, scoring rules, and management report templates.",
    icon: Map,
    href: "/real-estate/settings/land-evaluation",
    color: "text-teal-600",
    frameworks: 3,
  },
];

const generalSettings = [
  { label: "Default Currency", value: "BDT", type: "select", options: ["BDT", "USD", "EUR"], icon: Banknote },
  { label: "Default Retention %", value: "10", type: "number", unit: "%", icon: Percent },
  { label: "Default TDS Rate", value: "3", type: "number", unit: "%", icon: Percent },
  { label: "DLP Period", value: "12", type: "number", unit: "Months", icon: Calendar },
  { label: "Booking Forfeiture %", value: "10", type: "number", unit: "%", icon: Percent },
  { label: "Revenue Recognition Method", value: "POC", type: "select", options: ["POC (% of Completion)", "CC (Completed Contract)"], icon: FileText },
];

export default function RESettingsPage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <div className="flex items-center gap-3">
          <Settings className="h-7 w-7 text-slate-700" />
          <h1 className="text-2xl font-bold">Real Estate Module Settings</h1>
        </div>
        <p className="text-muted-foreground mt-1">ABC Properties Ltd — Module configuration and rules</p>
      </div>

      {/* Configuration Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {moduleLinks.map((link) => (
          <Link key={link.title} href={link.href}>
            <Card className="hover:border-primary/40 transition-colors cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-base">
                  <link.icon className={`h-5 w-5 ${link.color}`} />
                  {link.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">{link.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {"stages" in link && `${link.stages} Stages`}
                    {"entities" in link && `${link.entities} Entities`}
                    {"workflows" in link && `${link.workflows} Workflows`}
                    {"rules" in link && `${link.rules} Transaction Types`}
                    {"frameworks" in link && `${link.frameworks} Frameworks`}
                  </Badge>
                  <div className="flex items-center gap-1 text-sm text-primary font-medium">
                    Configure <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <Separator />

      {/* General Settings */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="h-5 w-5 text-slate-600" /> General Settings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {generalSettings.map((setting) => (
            <Card key={setting.label}>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <setting.icon className="h-4 w-4 text-muted-foreground" />
                  {setting.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {setting.type === "select" ? (
                  <Select defaultValue={setting.value}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {setting.options!.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="flex items-center gap-2">
                    <Input type="number" defaultValue={setting.value} className="max-w-[100px]" />
                    {setting.unit && (
                      <span className="text-sm text-muted-foreground">{setting.unit}</span>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Changes to lifecycle stages, numbering, and approval workflows affect all active projects.
            Dimension rules apply only to new transactions — existing posted entries remain unchanged.
            All settings changes are audit-logged with user, timestamp, and previous value.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
