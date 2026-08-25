"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft, ChevronDown, CheckCircle2, Circle, Clock,
  AlertTriangle, Upload, Save, Send, Shield, User,
  FileText, Plus,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

type CriterionStatus = "complete" | "in-progress" | "not-started";

interface Criterion {
  id: string;
  name: string;
  type: string;
  status: CriterionStatus;
  rating?: number;
  ratingLabel?: string;
  assessment?: string;
  riskLevel?: string;
  recommendation?: string;
}

interface Section {
  id: string;
  name: string;
  department: string;
  criteria: Criterion[];
  expanded: boolean;
}

const initialSections: Section[] = [
  {
    id: "legal", name: "Legal", department: "Legal", expanded: false,
    criteria: [
      { id: "L1", name: "Ownership Verification", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "L2", name: "Chain of Title", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "L3", name: "Encumbrance Check", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "L4", name: "Mutation Verification", type: "Pass/Fail", status: "complete", ratingLabel: "Fail", riskLevel: "Medium", recommendation: "Proceed with Conditions", assessment: "Mutation record has discrepancy with current deed. Correction required." },
      { id: "L5", name: "Litigation Search", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "L6", name: "Seller Authority", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "L7", name: "Govt Acquisition Notice", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
    ],
  },
  {
    id: "technical", name: "Technical", department: "Engineering", expanded: true,
    criteria: [
      { id: "T1", name: "Site Accessibility", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", recommendation: "Proceed" },
      { id: "T2", name: "Soil Condition", type: "Rating", status: "complete", rating: 3, ratingLabel: "Acceptable", riskLevel: "Medium", recommendation: "Proceed with Conditions", assessment: "Pile foundation likely required. Bore-log indicates alluvial soil at 8ft water table." },
      { id: "T3", name: "Buildable Area", type: "Numeric", status: "complete", ratingLabel: "24,800 sqft", recommendation: "Proceed" },
      { id: "T4", name: "Utility Availability", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", recommendation: "Proceed" },
      { id: "T5", name: "Foundation Requirement", type: "Rating", status: "in-progress", rating: 3, ratingLabel: "Acceptable" },
      { id: "T6", name: "Construction Constraints", type: "Rating", status: "complete", rating: 3, ratingLabel: "Acceptable", riskLevel: "Medium", recommendation: "Proceed with Conditions" },
      { id: "T7", name: "Construction Duration", type: "Numeric", status: "complete", ratingLabel: "32 months", recommendation: "Proceed" },
      { id: "T8", name: "Technical Risk", type: "Rating", status: "not-started" },
      { id: "T9", name: "Site Preparation", type: "Rating", status: "not-started" },
      { id: "T10", name: "Topography", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", recommendation: "Proceed" },
      { id: "T11", name: "Existing Condition", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", recommendation: "Proceed" },
    ],
  },
  {
    id: "market", name: "Market & Sales", department: "Marketing / Sales", expanded: false,
    criteria: [
      { id: "M1", name: "Market Demand", type: "Rating", status: "complete", rating: 5, ratingLabel: "Very Strong", recommendation: "Proceed" },
      { id: "M2", name: "Expected Selling Price", type: "Amount", status: "complete", ratingLabel: "৳12,000/sqft", recommendation: "Proceed" },
      { id: "M3", name: "Competitive Supply", type: "Rating", status: "complete", rating: 4, ratingLabel: "Moderate", recommendation: "Proceed" },
      { id: "M4", name: "Sales Velocity", type: "Numeric", status: "complete", ratingLabel: "8 units/qtr", recommendation: "Proceed" },
      { id: "M5", name: "Pre-Sales Potential", type: "Rating", status: "complete", rating: 5, ratingLabel: "Strong", recommendation: "Proceed" },
      { id: "M6", name: "Price Trend", type: "Rating", status: "complete", rating: 4, ratingLabel: "Stable/Up", recommendation: "Proceed" },
      { id: "M7", name: "Target Demographic", type: "Choice", status: "complete", ratingLabel: "Premium Residential", recommendation: "Proceed" },
      { id: "M8", name: "Competition Impact", type: "Rating", status: "complete", rating: 3, ratingLabel: "Moderate", recommendation: "Proceed" },
    ],
  },
  {
    id: "regulatory", name: "Regulatory", department: "Planning", expanded: false,
    criteria: [
      { id: "R1", name: "Zoning Compliance", type: "Pass/Fail", status: "complete", ratingLabel: "Pass", recommendation: "Proceed" },
      { id: "R2", name: "FAR / Coverage Limit", type: "Numeric", status: "complete", ratingLabel: "6.5 FAR", recommendation: "Proceed" },
      { id: "R3", name: "Height Restriction", type: "Numeric", status: "complete", ratingLabel: "14 floors OK", recommendation: "Proceed" },
      { id: "R4", name: "Environmental Clearance", type: "Pass/Fail", status: "not-started" },
      { id: "R5", name: "RAJUK Approval", type: "Pass/Fail", status: "not-started" },
      { id: "R6", name: "Road Widening Impact", type: "Numeric", status: "not-started" },
    ],
  },
];

// ─── Component ─────────────────────────────────────────────────

export default function SiteAssessmentPage() {
  const [sections, setSections] = useState(initialSections);
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>(null);

  const toggleSection = (sectionId: string) => {
    setSections(sections.map((s) =>
      s.id === sectionId ? { ...s, expanded: !s.expanded } : s
    ));
  };

  const allCriteria = sections.flatMap((s) => s.criteria);
  const completed = allCriteria.filter((c) => c.status === "complete").length;
  const total = allCriteria.length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads/LL-2026-001/work"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Gulshan Plot 07
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Site Assessment</h1>
            <p className="text-muted-foreground">
              All assessment areas in one view — Legal, Technical, Market, Regulatory
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right text-sm text-muted-foreground">
              <div><User className="h-3.5 w-3.5 inline mr-1" />Rahim</div>
              <div><Clock className="h-3.5 w-3.5 inline mr-1" />Due 22 Aug</div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={(completed / total) * 100} className="h-2 flex-1 max-w-md" />
          <span className="text-sm font-medium">{completed} / {total} criteria</span>
        </div>
      </div>

      {/* Sections */}
      {sections.map((section) => {
        const sectionCompleted = section.criteria.filter((c) => c.status === "complete").length;
        const sectionTotal = section.criteria.length;
        const allSectionDone = sectionCompleted === sectionTotal;

        return (
          <Card key={section.id} className={allSectionDone ? "border-emerald-200" : ""}>
            {/* Section Header — clickable to expand/collapse */}
            <div
              className="flex items-center gap-3 px-5 py-4 cursor-pointer hover:bg-muted/30 transition-colors"
              onClick={() => toggleSection(section.id)}
            >
              {allSectionDone ? (
                <CheckCircle2 className="h-5 w-5 text-emerald-600 shrink-0" />
              ) : sectionCompleted > 0 ? (
                <Clock className="h-5 w-5 text-blue-600 shrink-0" />
              ) : (
                <Circle className="h-5 w-5 text-gray-300 shrink-0" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{section.name}</h2>
                  <span className="text-xs text-muted-foreground">{section.department}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{sectionCompleted}/{sectionTotal}</span>
                <Progress value={(sectionCompleted / sectionTotal) * 100} className="h-1.5 w-20" />
                <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${section.expanded ? "rotate-180" : ""}`} />
              </div>
            </div>

            {/* Section Content */}
            {section.expanded && (
              <CardContent className="pt-0 pb-4">
                <div className="space-y-1 border-t pt-3">
                  {section.criteria.map((criterion) => {
                    const isExpanded = expandedCriterion === criterion.id;
                    const StatusIcon = criterion.status === "complete" ? CheckCircle2 : criterion.status === "in-progress" ? Clock : Circle;
                    const statusColor = criterion.status === "complete" ? "text-emerald-600" : criterion.status === "in-progress" ? "text-blue-600" : "text-gray-300";

                    return (
                      <div key={criterion.id}>
                        <div
                          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer transition-colors ${isExpanded ? "bg-muted" : "hover:bg-muted/50"}`}
                          onClick={() => setExpandedCriterion(isExpanded ? null : criterion.id)}
                        >
                          <StatusIcon className={`h-4 w-4 ${statusColor} shrink-0`} />
                          <span className="text-sm font-medium flex-1">{criterion.name}</span>
                          {criterion.ratingLabel && (
                            <span className={`text-xs ${
                              criterion.ratingLabel === "Fail" ? "text-red-600 font-medium" :
                              criterion.ratingLabel === "Pass" ? "text-emerald-600" :
                              "text-muted-foreground"
                            }`}>
                              {criterion.rating ? `${criterion.rating}/5 — ` : ""}{criterion.ratingLabel}
                            </span>
                          )}
                          {criterion.riskLevel && (
                            <Badge className="bg-amber-100 text-amber-800 text-[10px]">{criterion.riskLevel}</Badge>
                          )}
                          {criterion.status === "not-started" && (
                            <Button variant="outline" size="sm" className="text-xs h-7" onClick={(e) => { e.stopPropagation(); setExpandedCriterion(criterion.id); }}>
                              Start
                            </Button>
                          )}
                          <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </div>

                        {/* Expanded criterion form */}
                        {isExpanded && (
                          <div className="ml-7 mt-1 mb-2 p-4 border rounded-lg bg-white space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Response</label>
                                {criterion.type === "Pass/Fail" ? (
                                  <Select defaultValue={criterion.ratingLabel || ""}>
                                    <SelectTrigger className="mt-1 text-sm"><SelectValue placeholder="Select" /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="Pass">Pass</SelectItem>
                                      <SelectItem value="Fail">Fail</SelectItem>
                                      <SelectItem value="N/A">N/A</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : criterion.type === "Rating" ? (
                                  <Select defaultValue={criterion.rating?.toString() || ""}>
                                    <SelectTrigger className="mt-1 text-sm"><SelectValue placeholder="Rate" /></SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 — Very Poor</SelectItem>
                                      <SelectItem value="2">2 — Poor</SelectItem>
                                      <SelectItem value="3">3 — Acceptable</SelectItem>
                                      <SelectItem value="4">4 — Good</SelectItem>
                                      <SelectItem value="5">5 — Excellent</SelectItem>
                                    </SelectContent>
                                  </Select>
                                ) : (
                                  <Input defaultValue={criterion.ratingLabel || ""} placeholder="Enter value" className="mt-1 text-sm" />
                                )}
                              </div>
                              <div>
                                <label className="text-xs font-medium text-muted-foreground">Risk</label>
                                <Select defaultValue={criterion.riskLevel || ""}>
                                  <SelectTrigger className="mt-1 text-sm"><SelectValue placeholder="Risk level" /></SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Low">Low</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Critical">Critical</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div>
                              <label className="text-xs font-medium text-muted-foreground">Assessment / Notes</label>
                              <Textarea defaultValue={criterion.assessment || ""} placeholder="Your assessment..." className="mt-1 text-sm" rows={2} />
                            </div>
                            <div className="flex items-center justify-between">
                              <Button variant="outline" size="sm" className="text-xs gap-1">
                                <Upload className="h-3 w-3" /> Evidence
                              </Button>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" className="text-xs">Save</Button>
                                <Button size="sm" className="text-xs gap-1">
                                  <CheckCircle2 className="h-3 w-3" /> Complete
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}

      {/* Overall Summary */}
      <Separator />
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {completed}/{total} criteria completed across {sections.length} areas
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-1">
            <Save className="h-4 w-4" /> Save All
          </Button>
          <Button className="gap-1" disabled={completed < total}>
            <Send className="h-4 w-4" /> Submit Assessment
          </Button>
        </div>
      </div>

      {/* Quick findings summary */}
      {completed > 0 && (
        <Card className="border-blue-200 bg-blue-50/30">
          <CardContent className="pt-4">
            <p className="text-xs font-medium text-blue-700 uppercase tracking-wide mb-2">Key Findings So Far</p>
            <div className="space-y-1">
              {allCriteria.filter((c) => c.riskLevel).map((c) => (
                <div key={c.id} className="flex items-center gap-2 text-sm">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                  <span>{c.name}: {c.assessment || c.ratingLabel}</span>
                  <Badge className="bg-amber-100 text-amber-800 text-[10px]">{c.riskLevel}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
