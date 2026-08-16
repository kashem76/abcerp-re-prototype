"use client";

import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Camera,
  Calendar,
  User,
  ClipboardList,
  ImagePlus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Clock,
  Save,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const leadId = "LL-2026-042";
const leadLocation = "Bayazid Bostami, Chattogram";

const engineers = [
  { id: "E001", name: "Eng. Rafiq Ahmed" },
  { id: "E002", name: "Eng. Nasima Begum" },
  { id: "E003", name: "Eng. Kamal Hossain" },
  { id: "E004", name: "Eng. Shahidul Islam" },
];

const purposes = [
  "Initial Assessment",
  "Soil Test",
  "Boundary Verification",
  "Management Review",
  "Follow-up",
];

const previousVisits = [
  {
    id: "SV-003",
    date: "2026-07-28",
    visitedBy: "Eng. Rafiq Ahmed",
    purpose: "Boundary Verification",
    recommendation: "Proceed with Conditions",
    conditions: "Eastern boundary needs re-survey with adjacent owner present. Minor encroachment (~2ft) to resolve before acquisition.",
    findings: "Verified boundary markers against CS/RS maps. Northern, Southern, Western boundaries match. Eastern boundary shows ~2ft encroachment from neighboring property. Existing pond on SW corner — approximately 8 katha — needs filling cost estimate.",
    photos: 6,
  },
  {
    id: "SV-002",
    date: "2026-07-15",
    visitedBy: "Eng. Nasima Begum",
    purpose: "Soil Test",
    recommendation: "Proceed",
    conditions: null,
    findings: "Bore log completed at 4 points. Soil bearing capacity adequate for 10-story structure at 65ft depth. No peat layer detected. Water table at 12ft during monsoon. Recommended pile foundation — estimated 14-inch RCC piles.",
    photos: 12,
  },
  {
    id: "SV-001",
    date: "2026-07-02",
    visitedBy: "Eng. Kamal Hossain",
    purpose: "Initial Assessment",
    recommendation: "Proceed with Conditions",
    conditions: "Conduct detailed soil investigation before committing. Verify eastern boundary with mouza map overlay.",
    findings: "First site inspection of 22 katha land at Bayazid Bostami. Flat terrain, good road access from 30ft municipal road. Two existing structures (tin-shed) — demolition required. Neighboring plots have 8-10 story buildings. CDA residential zone — FAR 5.0 applicable. Preliminary assessment is favorable for a mid-rise residential project.",
    photos: 8,
  },
];

const recommendationColor: Record<string, string> = {
  Proceed: "bg-emerald-100 text-emerald-700 border-emerald-300",
  "Proceed with Conditions": "bg-yellow-100 text-yellow-700 border-yellow-300",
  Hold: "bg-orange-100 text-orange-700 border-orange-300",
  Reject: "bg-red-100 text-red-700 border-red-300",
};

const recommendationIcon: Record<string, React.ReactNode> = {
  Proceed: <CheckCircle2 className="h-4 w-4 text-emerald-600" />,
  "Proceed with Conditions": <AlertTriangle className="h-4 w-4 text-yellow-600" />,
  Hold: <Clock className="h-4 w-4 text-orange-600" />,
  Reject: <XCircle className="h-4 w-4 text-red-600" />,
};

export default function RecordSiteVisitPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Lead Detail
        </Link>
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-blue-600" />
                Record Site Visit
              </h1>
            </div>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              {leadId} &middot; {leadLocation}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Cancel</Button>
            <Button className="gap-2">
              <Save className="h-4 w-4" />
              Save Visit Record
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      {/* Visit Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Visit Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visit Date</label>
                  <Input type="date" defaultValue="2026-08-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Visited By</label>
                  <Select defaultValue="E001">
                    <SelectTrigger>
                      <SelectValue placeholder="Select engineer" />
                    </SelectTrigger>
                    <SelectContent>
                      {engineers.map((eng) => (
                        <SelectItem key={eng.id} value={eng.id}>
                          {eng.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Purpose</label>
                  <Select defaultValue="Follow-up">
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                    <SelectContent>
                      {purposes.map((p) => (
                        <SelectItem key={p} value={p}>
                          {p}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Findings */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Findings &amp; Observations</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Describe your observations from the site visit in detail. Include measurements, conditions, access routes, neighboring developments, and any concerns..."
                className="min-h-[180px]"
              />
            </CardContent>
          </Card>

          {/* Photos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Camera className="h-4 w-4 text-muted-foreground" />
                Site Photos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="aspect-square rounded-lg border-2 border-dashed border-muted-foreground/25 flex flex-col items-center justify-center gap-2 hover:border-primary/50 hover:bg-muted/50 cursor-pointer transition-colors"
                  >
                    <ImagePlus className="h-8 w-8 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground">
                      Photo {i}
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Upload up to 20 photos. Accepted formats: JPG, PNG (max 10MB each).
              </p>
            </CardContent>
          </Card>

          {/* Recommendation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recommendation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {["Proceed", "Proceed with Conditions", "Hold", "Reject"].map(
                  (rec) => (
                    <label
                      key={rec}
                      className={`flex items-center gap-2 p-3 rounded-lg border cursor-pointer transition-colors hover:bg-muted/50 ${
                        rec === "Proceed with Conditions"
                          ? "border-yellow-400 bg-yellow-50"
                          : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="recommendation"
                        value={rec}
                        defaultChecked={rec === "Proceed with Conditions"}
                        className="accent-primary"
                      />
                      <span className="text-sm font-medium">{rec}</span>
                    </label>
                  )
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Conditions / Notes{" "}
                  <span className="text-muted-foreground font-normal">
                    (required if conditional)
                  </span>
                </label>
                <Textarea
                  placeholder="Specify conditions that must be met before proceeding..."
                  className="min-h-[100px]"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar — Lead Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Lead Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lead ID</span>
                <span className="font-medium">{leadId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Location</span>
                <span className="font-medium">Bayazid Bostami</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Area</span>
                <span className="font-medium">22 Katha</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Asking Price</span>
                <span className="font-medium">৳ 4.40 Cr</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Visits</span>
                <span className="font-medium">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Stage</span>
                <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                  DUE DILIGENCE
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                Visit #4 Info
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              <p>This will be the 4th site visit for this lead. Previous visits established soil conditions and boundary issues.</p>
              <Separator className="my-3" />
              <p className="text-xs">Visit records are attached to the lead&apos;s due diligence file and are referenced during feasibility analysis.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      <Separator />

      {/* Previous Visits Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            Previous Site Visits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative space-y-6">
            {previousVisits.map((visit, idx) => (
              <div key={visit.id} className="relative pl-8">
                {/* Timeline line */}
                {idx < previousVisits.length - 1 && (
                  <div className="absolute left-3 top-8 bottom-0 w-px bg-border" />
                )}
                {/* Timeline dot */}
                <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>

                <div className="rounded-lg border p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">{visit.id}</span>
                      <span className="text-sm text-muted-foreground">{visit.date}</span>
                      <Badge variant="outline" className="text-xs">
                        {visit.purpose}
                      </Badge>
                    </div>
                    <Badge
                      variant="outline"
                      className={recommendationColor[visit.recommendation]}
                    >
                      <span className="flex items-center gap-1">
                        {recommendationIcon[visit.recommendation]}
                        {visit.recommendation}
                      </span>
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="h-3 w-3" />
                    {visit.visitedBy}
                    <span className="mx-1">&middot;</span>
                    <Camera className="h-3 w-3" />
                    {visit.photos} photos
                  </div>
                  <p className="text-sm leading-relaxed">{visit.findings}</p>
                  {visit.conditions && (
                    <div className="bg-yellow-50 border border-yellow-200 rounded-md p-3 text-sm">
                      <span className="font-medium text-yellow-800">Conditions:</span>{" "}
                      <span className="text-yellow-700">{visit.conditions}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
