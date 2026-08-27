"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import {
  Eye,
  Users,
  TrendingUp,
  Code,
  X,
  ChevronRight,
  CircleDot,
  GitBranch,
} from "lucide-react";
import { resolveGuide } from "@/lib/guide-content";
import { type ModuleId } from "@/lib/navigation";
import { type GuideTabId, type FlowData, type FlowStepColor, guideTabs } from "@/lib/guide-content/types";

const tabIcons: Record<GuideTabId, typeof Eye> = {
  overview: Eye,
  stories: Users,
  flow: GitBranch,
  value: TrendingUp,
  technical: Code,
};

interface GuidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeModule: ModuleId;
}

export function GuidePanel({ isOpen, onClose, activeModule }: GuidePanelProps) {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState<GuideTabId>("overview");

  const { screenName, content } = resolveGuide(pathname, activeModule);
  const tabContent = content[activeTab];

  return (
    <aside
      className={`fixed top-14 right-0 bottom-0 z-40 bg-white border-l border-gray-200 shadow-lg flex flex-col transition-all duration-300 ease-in-out ${
        isOpen ? "w-[380px] translate-x-0" : "w-0 translate-x-full"
      }`}
    >
      {isOpen && (
        <>
          {/* Header */}
          <div className="px-4 py-3 border-b border-gray-100 shrink-0">
            <div className="flex items-center justify-between">
              <div className="min-w-0">
                <p className="text-xs text-blue-600 font-medium uppercase tracking-wider">
                  Guide
                </p>
                <h2 className="text-sm font-semibold text-gray-900 truncate mt-0.5">
                  {screenName}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="h-7 w-7 rounded-md flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 shrink-0"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Tab bar */}
            <div className="flex gap-1 mt-3">
              {guideTabs.map((tab) => {
                const Icon = tabIcons[tab.id];
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors ${
                      isActive
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="h-3 w-3" />
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {activeTab === "overview" && <OverviewContent data={content.overview} />}
            {activeTab === "stories" && <StoriesContent data={content.stories} />}
            {activeTab === "flow" && <FlowContent data={content.flow} />}
            {activeTab === "value" && <ValueContent data={content.value} />}
            {activeTab === "technical" && <TechnicalContent data={content.technical} />}
          </div>
        </>
      )}
    </aside>
  );
}

// ─── Tab content renderers ──────────────────────────────────

function OverviewContent({
  data,
}: {
  data: {
    description: string;
    personas: { role: string; does: string }[];
    workflow?: string[];
  };
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="text-sm text-gray-700 leading-relaxed">{data.description}</p>
      </div>

      <div>
        <SectionLabel>Who Uses This</SectionLabel>
        <div className="space-y-2">
          {data.personas.map((p) => (
            <div key={p.role} className="flex gap-2">
              <div className="h-5 w-5 rounded-full bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
                <Users className="h-3 w-3 text-blue-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-900">{p.role}</p>
                <p className="text-xs text-gray-500">{p.does}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.workflow && data.workflow.length > 0 && (
        <div>
          <SectionLabel>Workflow</SectionLabel>
          <div className="space-y-1">
            {data.workflow.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="flex flex-col items-center shrink-0">
                  <div className="h-5 w-5 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] font-bold text-gray-500">
                      {i + 1}
                    </span>
                  </div>
                  {i < data.workflow!.length - 1 && (
                    <div className="w-px h-3 bg-gray-200" />
                  )}
                </div>
                <p className="text-xs text-gray-700 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StoriesContent({
  data,
}: {
  data: {
    summary: string;
    items: { id: string; role: string; story: string }[];
  };
}) {
  return (
    <div className="space-y-4">
      <p className="text-xs text-gray-500">{data.summary}</p>

      <div className="space-y-3">
        {data.items.map((item) => (
          <div
            key={item.id}
            className="border border-gray-100 rounded-lg p-3 bg-gray-50/50"
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] font-mono font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">
                {item.id}
              </span>
              <span className="text-[10px] text-gray-400 font-medium">
                {item.role}
              </span>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{item.story}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ValueContent({
  data,
}: {
  data: {
    summary: string;
    painPoints: string[];
    outcomes: string[];
    timeSavings?: string;
  };
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-gray-500">{data.summary}</p>

      <div>
        <SectionLabel color="red">Before (Pain Points)</SectionLabel>
        <div className="space-y-1.5">
          {data.painPoints.map((point, i) => (
            <div key={i} className="flex items-start gap-2">
              <CircleDot className="h-3 w-3 text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">{point}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <SectionLabel color="green">After (Outcomes)</SectionLabel>
        <div className="space-y-1.5">
          {data.outcomes.map((outcome, i) => (
            <div key={i} className="flex items-start gap-2">
              <ChevronRight className="h-3 w-3 text-green-500 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-700">{outcome}</p>
            </div>
          ))}
        </div>
      </div>

      {data.timeSavings && (
        <div className="bg-emerald-50 border border-emerald-100 rounded-lg p-3">
          <p className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider mb-1">
            Time Savings
          </p>
          <p className="text-xs text-emerald-800">{data.timeSavings}</p>
        </div>
      )}
    </div>
  );
}

function TechnicalContent({
  data,
}: {
  data: {
    summary: string;
    dataFlow?: string[];
    glEntries?: string[];
    architectureNotes?: string[];
  };
}) {
  return (
    <div className="space-y-5">
      <p className="text-xs text-gray-500">{data.summary}</p>

      {data.dataFlow && data.dataFlow.length > 0 && (
        <div>
          <SectionLabel>Data Flow</SectionLabel>
          <div className="space-y-1">
            {data.dataFlow.map((step, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-[10px] font-mono text-gray-400 shrink-0 mt-0.5 w-4 text-right">
                  {i + 1}.
                </span>
                <p className="text-xs text-gray-700 font-mono">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {data.glEntries && data.glEntries.length > 0 && (
        <div>
          <SectionLabel>GL Journal Entries</SectionLabel>
          <div className="bg-slate-900 rounded-lg p-3 space-y-1">
            {data.glEntries.map((entry, i) => (
              <p key={i} className="text-xs font-mono text-slate-300 leading-relaxed">
                {entry}
              </p>
            ))}
          </div>
        </div>
      )}

      {data.architectureNotes && data.architectureNotes.length > 0 && (
        <div>
          <SectionLabel>Architecture Notes</SectionLabel>
          <div className="space-y-1.5">
            {data.architectureNotes.map((note, i) => (
              <div key={i} className="flex items-start gap-2">
                <Code className="h-3 w-3 text-purple-400 shrink-0 mt-0.5" />
                <p className="text-xs text-gray-700">{note}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FlowContent({ data }: { data?: FlowData }) {
  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <GitBranch className="h-8 w-8 text-gray-300 mb-3" />
        <p className="text-sm text-gray-400">No flow diagram for this screen</p>
        <p className="text-xs text-gray-300 mt-1">
          Module-level flows are available on dashboard screens
        </p>
      </div>
    );
  }

  const colorMap: Record<FlowStepColor, { bg: string; border: string; text: string; dot: string }> = {
    blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-800",   dot: "bg-blue-500" },
    green:  { bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-800", dot: "bg-emerald-500" },
    amber:  { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-800",  dot: "bg-amber-500" },
    red:    { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-800",    dot: "bg-red-500" },
    gray:   { bg: "bg-gray-50",   border: "border-gray-200",   text: "text-gray-700",   dot: "bg-gray-400" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-800", dot: "bg-purple-500" },
    slate:  { bg: "bg-slate-100", border: "border-slate-300",  text: "text-slate-700",  dot: "bg-slate-500" },
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-semibold text-gray-900">{data.title}</h3>
        {data.description && (
          <p className="text-xs text-gray-500 mt-1">{data.description}</p>
        )}
      </div>

      <div className="relative">
        {data.steps.map((step, i) => {
          const c = colorMap[step.color ?? "gray"];
          const isLast = i === data.steps.length - 1;

          return (
            <div key={i} className="relative">
              {/* Connector line */}
              {!isLast && (
                <div className="absolute left-[17px] top-[40px] w-px h-[calc(100%-24px)] bg-gray-200" />
              )}

              <div className="flex gap-3 items-start pb-2">
                {/* Node indicator */}
                <div className="flex flex-col items-center shrink-0 pt-1">
                  <div
                    className={`h-[18px] w-[18px] rounded-full border-2 flex items-center justify-center ${
                      step.active
                        ? "border-blue-500 ring-2 ring-blue-200"
                        : `border-gray-300`
                    }`}
                  >
                    <div className={`h-2 w-2 rounded-full ${step.active ? "bg-blue-500" : c.dot}`} />
                  </div>
                  {!isLast && <div className="w-px h-2 bg-gray-200" />}
                </div>

                {/* Step card */}
                <div
                  className={`flex-1 rounded-lg border px-3 py-2 ${c.bg} ${c.border} ${
                    step.active ? "ring-1 ring-blue-300 shadow-sm" : ""
                  }`}
                >
                  <p className={`text-xs font-semibold ${c.text}`}>{step.label}</p>
                  {step.sub && (
                    <p className="text-[11px] text-gray-500 mt-0.5">{step.sub}</p>
                  )}
                  {step.active && (
                    <span className="inline-block mt-1.5 text-[9px] font-bold bg-blue-600 text-white px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      You are here
                    </span>
                  )}
                </div>
              </div>

              {/* Branch fork */}
              {step.branch && (
                <div className="ml-[17px] pl-6 pb-2 relative">
                  {/* Horizontal connector from main line */}
                  <div className="absolute left-0 top-3 w-6 h-px bg-gray-300" />
                  <div className="absolute left-0 top-0 w-px h-3 bg-gray-300" />

                  <div className="border border-dashed border-gray-300 rounded-lg p-2.5 bg-white">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                      {step.branch.label}
                    </p>
                    <div className="space-y-1">
                      {step.branch.steps.map((bs, j) => {
                        const bc = colorMap[bs.color ?? "gray"];
                        return (
                          <div key={j} className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${bc.dot}`} />
                            <p className={`text-[11px] ${bc.text}`}>{bs.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Shared ────────────────────────────────────────────────

function SectionLabel({
  children,
  color = "gray",
}: {
  children: React.ReactNode;
  color?: "gray" | "red" | "green";
}) {
  const colorClasses = {
    gray: "text-gray-900",
    red: "text-red-700",
    green: "text-green-700",
  };
  return (
    <p
      className={`text-[11px] font-semibold uppercase tracking-wider mb-2 ${colorClasses[color]}`}
    >
      {children}
    </p>
  );
}
