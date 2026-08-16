"use client";

import { useState } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft, ChevronDown, ChevronRight, CheckCircle2, Circle,
  AlertTriangle, Upload, Send, User, Clock, FileText,
  MessageSquare, History, ClipboardList, Plus, ArrowRight,
  Shield, Save,
} from "lucide-react";

// ─── Mock Data ─────────────────────────────────────────────────

type CriterionStatus = "complete" | "in-progress" | "not-started";

interface AssessmentCriterion {
  id: string;
  name: string;
  type: string;
  status: CriterionStatus;
  rating?: number;
  ratingLabel?: string;
  assessment?: string;
  riskLevel?: string;
  recommendation?: string;
  evidence?: string[];
}

const criteria: AssessmentCriterion[] = [
  { id: "EC1", name: "Site Accessibility", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", assessment: "Access road is 40ft wide. Heavy equipment can enter from south side. Minor congestion during peak hours.", riskLevel: "Low", recommendation: "Proceed", evidence: ["Site_Access_Photo.jpg"] },
  { id: "EC2", name: "Existing Site Condition", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", assessment: "Site is relatively flat with minimal existing structures. One temporary shed to be demolished.", riskLevel: "Low", recommendation: "Proceed", evidence: ["Site_Condition_Report.pdf"] },
  { id: "EC3", name: "Topography", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", assessment: "Generally flat terrain with slight slope to the east. No significant grading required.", riskLevel: "Low", recommendation: "Proceed" },
  { id: "EC4", name: "Soil Condition", type: "Rating", status: "complete", rating: 3, ratingLabel: "Acceptable", assessment: "Preliminary bore-log indicates alluvial soil. Bearing capacity adequate for pile foundation. Water table at 8ft.", riskLevel: "Medium", recommendation: "Proceed with Conditions", evidence: ["Bore_Log_Preliminary.pdf", "Soil_Test_Lab.pdf"] },
  { id: "EC5", name: "Buildable Area", type: "Numeric", status: "complete", rating: 5, ratingLabel: "Excellent", assessment: "After RAJUK setbacks: 24,800 sqft buildable. No road widening impact. No easements identified.", riskLevel: "Low", recommendation: "Proceed" },
  { id: "EC6", name: "Utility Availability", type: "Rating", status: "complete", rating: 4, ratingLabel: "Good", assessment: "WASA, DESCO, Titas Gas all available within 200m. Capacity adequate for 14-story building.", riskLevel: "Low", recommendation: "Proceed", evidence: ["Utility_Survey.pdf"] },
  { id: "EC7", name: "Construction Constraints", type: "Rating", status: "complete", rating: 3, ratingLabel: "Acceptable", assessment: "Adjacent buildings on north and east. Need careful piling. Limited storage area — offsite staging may be needed.", riskLevel: "Medium", recommendation: "Proceed with Conditions" },
  { id: "EC8", name: "Foundation Requirement", type: "Rating", status: "in-progress", rating: 3, ratingLabel: "Acceptable" },
  { id: "EC9", name: "Site Preparation", type: "Rating", status: "not-started" },
  { id: "EC10", name: "Construction Approach", type: "Rating", status: "not-started" },
  { id: "EC11", name: "Technical Risk", type: "Rating", status: "not-started" },
];

interface Finding {
  id: string;
  title: string;
  criterion: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  impact: string;
  recommendation: string;
  owner: string;
  status: "Open" | "Resolved";
}

const findings: Finding[] = [
  {
    id: "F001", title: "Pile foundation likely required", criterion: "Soil Condition",
    severity: "Medium", impact: "Foundation cost may be 8-12% higher than standard company benchmark.",
    recommendation: "Include pile foundation estimate in preliminary cost. Validate with detailed bore-log after approval.",
    owner: "Engineering", status: "Open",
  },
  {
    id: "F002", title: "Access road may not support piling equipment", criterion: "Site Accessibility",
    severity: "Medium", impact: "Potential construction logistics cost increase. May need temporary road reinforcement.",
    recommendation: "Negotiate temporary access through adjacent parcel or schedule piling during low-traffic hours.",
    owner: "Engineering", status: "Open",
  },
  {
    id: "F003", title: "Limited site storage area", criterion: "Construction Constraints",
    severity: "Low", impact: "May require offsite material staging, increasing logistics cost by 2-3%.",
    recommendation: "Plan phased material delivery. Consider renting adjacent vacant lot for staging.",
    owner: "Engineering", status: "Open",
  },
];

const files = [
  { name: "Bore_Log_Preliminary.pdf", criterion: "Soil Condition", uploaded: "15 Aug", size: "2.4 MB" },
  { name: "Soil_Test_Lab.pdf", criterion: "Soil Condition", uploaded: "15 Aug", size: "1.1 MB" },
  { name: "Site_Access_Photo.jpg", criterion: "Site Accessibility", uploaded: "13 Aug", size: "3.8 MB" },
  { name: "Site_Condition_Report.pdf", criterion: "Existing Site Condition", uploaded: "13 Aug", size: "4.2 MB" },
  { name: "Utility_Survey.pdf", criterion: "Utility Availability", uploaded: "14 Aug", size: "1.8 MB" },
];

const discussions = [
  { user: "Eng. Rafi", time: "6h ago", text: "Bore-log results suggest pile depth of 55-60ft. Need to confirm with structural consultant before finalizing cost estimate." },
  { user: "Chief Engineer", time: "4h ago", text: "Agreed. Use 60ft as planning assumption. We can refine after detailed investigation." },
  { user: "Eng. Rafi", time: "2h ago", text: "Updated soil condition assessment. Rating 3/5 with pile foundation assumption noted." },
];

// ─── Component ─────────────────────────────────────────────────

export default function StepAssessmentPage() {
  const [activeTab, setActiveTab] = useState("assessment");
  const [expandedCriterion, setExpandedCriterion] = useState<string | null>("EC8");

  const completed = criteria.filter((c) => c.status === "complete").length;
  const allDone = completed === criteria.length;

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads/LL-2026-001/work"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Work Board
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">Engineering Assessment</h1>
            <p className="text-muted-foreground">Gulshan Plot 07</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <User className="h-3.5 w-3.5" /> Eng. Rafi
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-3.5 w-3.5" /> Chief Engineer
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-3.5 w-3.5" /> Due 22 Aug
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3">
          <Progress value={(completed / criteria.length) * 100} className="h-2 flex-1 max-w-xs" />
          <span className="text-sm font-medium">{completed} / {criteria.length}</span>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="assessment" className="gap-1.5">
            <ClipboardList className="h-3.5 w-3.5" /> Assessment
          </TabsTrigger>
          <TabsTrigger value="findings" className="gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5" /> Findings
            <Badge variant="secondary" className="text-[10px] ml-1">{findings.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="files" className="gap-1.5">
            <FileText className="h-3.5 w-3.5" /> Files
            <Badge variant="secondary" className="text-[10px] ml-1">{files.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="discussion" className="gap-1.5">
            <MessageSquare className="h-3.5 w-3.5" /> Discussion
          </TabsTrigger>
          <TabsTrigger value="history" className="gap-1.5">
            <History className="h-3.5 w-3.5" /> History
          </TabsTrigger>
        </TabsList>

        {/* ─── Assessment Tab ────────────────────────── */}
        <TabsContent value="assessment" className="space-y-2 mt-4">
          {criteria.map((criterion) => {
            const isExpanded = expandedCriterion === criterion.id;
            const StatusIcon = criterion.status === "complete" ? CheckCircle2 : criterion.status === "in-progress" ? Clock : Circle;
            const statusColor = criterion.status === "complete" ? "text-emerald-600" : criterion.status === "in-progress" ? "text-blue-600" : "text-gray-300";

            return (
              <div key={criterion.id}>
                {/* Criterion Row */}
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg cursor-pointer transition-colors ${
                    isExpanded ? "bg-muted" : "hover:bg-muted/50"
                  }`}
                  onClick={() => setExpandedCriterion(isExpanded ? null : criterion.id)}
                >
                  <StatusIcon className={`h-4 w-4 ${statusColor} shrink-0`} />
                  <span className="text-sm font-medium flex-1">{criterion.name}</span>
                  {criterion.ratingLabel && (
                    <span className="text-xs text-muted-foreground">{criterion.rating}/5 — {criterion.ratingLabel}</span>
                  )}
                  {criterion.status === "not-started" && (
                    <Button variant="outline" size="sm" className="text-xs" onClick={(e) => { e.stopPropagation(); setExpandedCriterion(criterion.id); }}>
                      Evaluate
                    </Button>
                  )}
                  <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                </div>

                {/* Expanded Form */}
                {isExpanded && (
                  <Card className="mt-1 mb-2 ml-7">
                    <CardContent className="pt-4 space-y-4">
                      {/* Rating */}
                      <div>
                        <label className="text-sm font-medium">Rating</label>
                        <Select defaultValue={criterion.rating?.toString()}>
                          <SelectTrigger className="mt-1 max-w-xs"><SelectValue placeholder="Select rating" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 — Very Poor</SelectItem>
                            <SelectItem value="2">2 — Poor</SelectItem>
                            <SelectItem value="3">3 — Acceptable</SelectItem>
                            <SelectItem value="4">4 — Good</SelectItem>
                            <SelectItem value="5">5 — Excellent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Assessment */}
                      <div>
                        <label className="text-sm font-medium">Assessment / Findings</label>
                        <Textarea
                          defaultValue={criterion.assessment || ""}
                          placeholder="Describe your assessment..."
                          className="mt-1"
                          rows={3}
                        />
                      </div>

                      {/* Evidence */}
                      <div>
                        <label className="text-sm font-medium">Evidence</label>
                        <div className="mt-1 space-y-1">
                          {criterion.evidence?.map((file) => (
                            <div key={file} className="flex items-center gap-2 text-sm">
                              <FileText className="h-3.5 w-3.5 text-muted-foreground" />
                              <span>{file}</span>
                            </div>
                          ))}
                          <Button variant="outline" size="sm" className="gap-1 text-xs mt-1">
                            <Upload className="h-3.5 w-3.5" /> Add Evidence
                          </Button>
                        </div>
                      </div>

                      {/* Risk */}
                      <div>
                        <label className="text-sm font-medium">Risk Level</label>
                        <Select defaultValue={criterion.riskLevel || ""}>
                          <SelectTrigger className="mt-1 max-w-[200px]"><SelectValue placeholder="Select risk" /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Low">Low</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="High">High</SelectItem>
                            <SelectItem value="Critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Recommendation */}
                      <div>
                        <label className="text-sm font-medium">Recommendation</label>
                        <div className="space-y-2 mt-2">
                          {["Proceed", "Proceed with Conditions", "Further Investigation Required", "Not Recommended"].map((opt) => (
                            <div key={opt} className="flex items-center gap-2">
                              <input type="radio" name={`rec-${criterion.id}`} defaultChecked={criterion.recommendation === opt} className="h-4 w-4" />
                              <label className="text-sm">{opt}</label>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 pt-2">
                        <Button variant="outline" size="sm" className="gap-1">
                          <Save className="h-3.5 w-3.5" /> Save Draft
                        </Button>
                        <Button size="sm" className="gap-1">
                          <CheckCircle2 className="h-3.5 w-3.5" /> Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}

          {/* Submit */}
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {completed}/{criteria.length} criteria completed
            </p>
            <Button disabled={!allDone} className="gap-1">
              <Send className="h-4 w-4" /> Submit for Review
            </Button>
          </div>
        </TabsContent>

        {/* ─── Findings Tab ──────────────────────────── */}
        <TabsContent value="findings" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{findings.length} findings</p>
            <Button size="sm" className="gap-1">
              <Plus className="h-4 w-4" /> Add Finding
            </Button>
          </div>

          {findings.map((finding) => (
            <Card key={finding.id}>
              <CardContent className="pt-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-medium text-sm">{finding.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      Related: {finding.criterion} &middot; Owner: {finding.owner}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={
                      finding.severity === "Critical" ? "bg-red-100 text-red-800" :
                      finding.severity === "High" ? "bg-orange-100 text-orange-800" :
                      finding.severity === "Medium" ? "bg-amber-100 text-amber-800" :
                      "bg-gray-100 text-gray-700"
                    }>{finding.severity}</Badge>
                    <Badge variant="outline" className="text-[10px]">{finding.status}</Badge>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Impact</p>
                  <p className="text-sm">{finding.impact}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recommendation</p>
                  <p className="text-sm">{finding.recommendation}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="text-xs gap-1">
                    <AlertTriangle className="h-3 w-3" /> Create Risk
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        {/* ─── Files Tab ─────────────────────────────── */}
        <TabsContent value="files" className="space-y-4 mt-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{files.length} files</p>
            <Button size="sm" className="gap-1">
              <Upload className="h-4 w-4" /> Upload
            </Button>
          </div>
          <Card>
            <div className="divide-y">
              {files.map((file) => (
                <div key={file.name} className="flex items-center gap-3 px-4 py-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">{file.criterion}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{file.size}</span>
                  <span className="text-xs text-muted-foreground">{file.uploaded}</span>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* ─── Discussion Tab ────────────────────────── */}
        <TabsContent value="discussion" className="space-y-4 mt-4">
          <div className="space-y-4">
            {discussions.map((msg, i) => (
              <div key={i} className="flex gap-3">
                <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                  {msg.user.split(" ").map((w) => w[0]).join("")}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-medium">{msg.user}</span>
                    <span className="text-muted-foreground">{msg.time}</span>
                  </div>
                  <p className="text-sm mt-1">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Separator />
          <div className="flex gap-2">
            <Textarea placeholder="Add to discussion..." rows={2} className="flex-1" />
            <Button size="sm" className="self-end gap-1">
              <Send className="h-3.5 w-3.5" /> Post
            </Button>
          </div>
        </TabsContent>

        {/* ─── History Tab ────────────────────────────── */}
        <TabsContent value="history" className="space-y-3 mt-4">
          {[
            { time: "2h ago", event: "Soil Condition criterion updated. Rating changed from 2 to 3.", user: "Eng. Rafi" },
            { time: "5h ago", event: "Bore_Log_Preliminary.pdf uploaded to Soil Condition.", user: "Eng. Rafi" },
            { time: "1d ago", event: "Construction Constraints criterion completed. Rating: 3/5.", user: "Eng. Rafi" },
            { time: "1d ago", event: "Finding created: \"Access road may not support piling equipment\".", user: "Eng. Rafi" },
            { time: "2d ago", event: "Utility Availability criterion completed. Rating: 4/5.", user: "Eng. Rafi" },
            { time: "3d ago", event: "Assessment started. 11 criteria assigned.", user: "System" },
          ].map((entry, i) => (
            <div key={i} className="flex gap-3 text-sm">
              <div className="h-2 w-2 rounded-full bg-gray-300 mt-2 shrink-0" />
              <div>
                <p>{entry.event}</p>
                <p className="text-xs text-muted-foreground">{entry.user} &middot; {entry.time}</p>
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {/* Department Sign-off Section (shown when all criteria are complete) */}
      {allDone && (
        <>
          <Separator />
          <Card className="border-emerald-300">
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Shield className="h-5 w-5 text-emerald-600" />
                Department Review & Sign-off
              </CardTitle>
              <p className="text-sm text-muted-foreground">All 11 criteria completed. Ready for department head review.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">78</p>
                  <p className="text-xs text-muted-foreground">Overall Score</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">{findings.length}</p>
                  <p className="text-xs text-muted-foreground">Findings</p>
                </div>
                <div className="text-center p-3 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-2xl font-bold text-amber-700">2</p>
                  <p className="text-xs text-amber-700">Medium Risks</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Preliminary Recommendation</label>
                <Badge className="bg-blue-100 text-blue-800 ml-2">Proceed with Conditions</Badge>
              </div>

              <div>
                <label className="text-sm font-medium">Key Findings</label>
                <ul className="list-disc list-inside text-sm mt-1 space-y-1 text-muted-foreground">
                  <li>Pile foundation likely required</li>
                  <li>Site access acceptable with constraints</li>
                  <li>Utilities readily available</li>
                  <li>Estimated construction period: 30-34 months</li>
                </ul>
              </div>

              <div>
                <label className="text-sm font-medium">Department Comments</label>
                <Textarea
                  placeholder="Department head's comments..."
                  defaultValue="Technically viable. Foundation cost should be validated after detailed soil investigation."
                  className="mt-1"
                  rows={3}
                />
              </div>

              <div className="text-sm text-muted-foreground">
                Reviewed by: <span className="text-foreground font-medium">Chief Engineer</span>
              </div>

              <div className="flex gap-3 justify-end">
                <Button variant="outline" className="gap-1">
                  <ArrowRight className="h-4 w-4 rotate-180" /> Return for Revision
                </Button>
                <Button className="gap-1 bg-emerald-600 hover:bg-emerald-700">
                  <CheckCircle2 className="h-4 w-4" /> Sign Off
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
}
