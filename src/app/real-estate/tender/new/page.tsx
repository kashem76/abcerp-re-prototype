"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { formatBDT } from "@/lib/mock-data";
import {
  FileText,
  Building2,
  Users,
  Calendar,
  ClipboardList,
  CheckSquare,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

const wbsNodes = [
  { code: "WBS-01", name: "Foundation Work", estimatedValue: 28500000, selected: true },
  { code: "WBS-02", name: "Structural Work (RCC)", estimatedValue: 65000000, selected: true },
  { code: "WBS-03", name: "MEP (Mechanical, Electrical, Plumbing)", estimatedValue: 32000000, selected: false },
  { code: "WBS-04", name: "Finishing & Interior", estimatedValue: 45000000, selected: false },
  { code: "WBS-05", name: "External Development", estimatedValue: 12000000, selected: false },
];

const selectedTotal = wbsNodes.filter((n) => n.selected).reduce((s, n) => s + n.estimatedValue, 0);

const contractors = [
  { name: "M/S Reliable Construction", trade: "Civil & Structural", contact: "Eng. Rahim", phone: "+880 1711-222333", invited: true },
  { name: "M/S BuildWell Engineering", trade: "Civil & Structural", contact: "Eng. Faruk", phone: "+880 1822-333444", invited: true },
  { name: "M/S Elite Builders", trade: "Civil & Structural", contact: "Mr. Karim", phone: "+880 1933-444555", invited: true },
  { name: "M/S Prime Contractors", trade: "Civil Works", contact: "Eng. Salam", phone: "+880 1644-555666", invited: false },
  { name: "M/S NorthStar Construction", trade: "Civil & Finishing", contact: "Eng. Hasan", phone: "+880 1755-666777", invited: false },
];

const documentChecklist = [
  { name: "Tender Terms & Conditions", required: true, attached: true },
  { name: "BOQ Extract (Priced)", required: true, attached: true },
  { name: "Architectural Drawings", required: true, attached: false },
  { name: "Structural Drawings", required: true, attached: false },
  { name: "Technical Specifications", required: true, attached: true },
  { name: "Site Plan & Survey", required: false, attached: false },
  { name: "Environmental Clearance", required: false, attached: false },
];

export default function CreateTenderPage() {
  return (
    <div className="space-y-6">
      <div>
        <Link
          href="/real-estate/tender"
          className="text-sm text-blue-600 hover:underline flex items-center gap-1 mb-2"
        >
          <ArrowLeft className="h-3 w-3" /> Back to Tenders
        </Link>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileText className="h-6 w-6 text-purple-600" />
          Create Tender
        </h1>
        <p className="text-gray-500">
          Prepare and issue tender for construction work packages — ABC Properties Ltd
        </p>
      </div>

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Building2 className="h-4 w-4" /> Tender Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Tender Code</label>
              <Input className="mt-1 bg-gray-50" defaultValue="TND-RE27-003" readOnly />
              <p className="text-xs text-gray-400 mt-1">Auto-generated</p>
            </div>
            <div>
              <label className="text-sm font-medium">Project</label>
              <Select defaultValue="re27">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="re27">ABC Nasirabad Heights (RE-00027)</SelectItem>
                  <SelectItem value="re31">Bay View Residence (RE-00031)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <div className="mt-2">
                <Badge className="bg-gray-100 text-gray-600">DRAFT</Badge>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="text-sm font-medium">Tender Title</label>
              <Input
                className="mt-1"
                defaultValue="Foundation & Structural Works — Tower A"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Work Package Description</label>
              <Textarea
                className="mt-1"
                defaultValue="Complete foundation (pile + raft) and RCC structural frame for Tower A including columns, beams, slabs up to 12th floor with water tank."
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Scope from BOQ */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <ClipboardList className="h-4 w-4" /> Scope from BOQ (Select WBS Nodes)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Select</TableHead>
                <TableHead>WBS Code</TableHead>
                <TableHead>Work Package</TableHead>
                <TableHead className="text-right">Estimated Value (BDT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {wbsNodes.map((node) => (
                <TableRow key={node.code} className={node.selected ? "bg-blue-50" : ""}>
                  <TableCell>
                    <input
                      type="checkbox"
                      defaultChecked={node.selected}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-mono text-sm">{node.code}</TableCell>
                  <TableCell className="font-medium">{node.name}</TableCell>
                  <TableCell className="text-right">{formatBDT(node.estimatedValue)}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-gray-50 font-bold">
                <TableCell colSpan={3} className="text-right">
                  Selected Scope Total
                </TableCell>
                <TableCell className="text-right text-blue-700">
                  {formatBDT(selectedTotal)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tender Terms */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Tender Terms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Tender Type</label>
              <Select defaultValue="item_rate">
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="item_rate">Item Rate</SelectItem>
                  <SelectItem value="lump_sum">Lump Sum</SelectItem>
                  <SelectItem value="cost_plus">Cost Plus</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Retention (%)</label>
              <Input type="number" className="mt-1" defaultValue={10} min={0} max={20} />
            </div>
            <div>
              <label className="text-sm font-medium">Security Deposit (%)</label>
              <Input type="number" className="mt-1" defaultValue={5} min={0} max={15} />
            </div>
            <div>
              <label className="text-sm font-medium">Defect Liability Period (months)</label>
              <Input type="number" className="mt-1" defaultValue={12} min={6} max={36} />
            </div>
          </div>
          <div className="mt-4">
            <label className="text-sm font-medium">Estimated Value (from BOQ)</label>
            <Input
              className="mt-1 bg-gray-50 font-bold w-64"
              defaultValue={selectedTotal}
              readOnly
            />
          </div>
        </CardContent>
      </Card>

      {/* Contractor Invitation */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" /> Contractor Invitation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Invite</TableHead>
                <TableHead>Contractor Name</TableHead>
                <TableHead>Trade</TableHead>
                <TableHead>Contact Person</TableHead>
                <TableHead>Phone</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contractors.map((c, i) => (
                <TableRow key={i} className={c.invited ? "bg-emerald-50" : ""}>
                  <TableCell>
                    <input
                      type="checkbox"
                      defaultChecked={c.invited}
                      className="h-4 w-4 rounded border-gray-300"
                    />
                  </TableCell>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell>{c.trade}</TableCell>
                  <TableCell>{c.contact}</TableCell>
                  <TableCell className="text-sm">{c.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <p className="text-xs text-gray-500 mt-2">
            {contractors.filter((c) => c.invited).length} of {contractors.length} contractors selected
          </p>
        </CardContent>
      </Card>

      {/* Timeline */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Timeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium">Issue Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-08-15" />
            </div>
            <div>
              <label className="text-sm font-medium">Submission Deadline</label>
              <Input type="date" className="mt-1" defaultValue="2026-09-15" />
            </div>
            <div>
              <label className="text-sm font-medium">Opening Date</label>
              <Input type="date" className="mt-1" defaultValue="2026-09-18" />
            </div>
            <div>
              <label className="text-sm font-medium">Evaluation By</label>
              <Input className="mt-1" defaultValue="Eng. Kamal Hossain" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Checklist */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <CheckSquare className="h-4 w-4" /> Document Checklist
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {documentChecklist.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 px-3 rounded border"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    defaultChecked={doc.attached}
                    className="h-4 w-4 rounded"
                  />
                  <span className="text-sm font-medium">{doc.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  {doc.required && (
                    <Badge variant="outline" className="text-xs bg-red-50 text-red-600 border-red-200">
                      Required
                    </Badge>
                  )}
                  <Badge
                    className={
                      doc.attached
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-gray-100 text-gray-500"
                    }
                  >
                    {doc.attached ? "Attached" : "Pending"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Link
          href="/real-estate/tender"
          className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent"
        >
          Cancel
        </Link>
        <div className="flex gap-3">
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">
            <FileText className="h-4 w-4 mr-2" />
            Issue Tender
          </Button>
        </div>
      </div>
    </div>
  );
}
