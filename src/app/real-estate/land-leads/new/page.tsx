"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, MapPin, Info } from "lucide-react";

export default function AddLandPage() {
  return (
    <div className="space-y-6 p-6 max-w-2xl">
      {/* Header */}
      <div>
        <Link
          href="/real-estate/land-leads"
          className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 mb-2"
        >
          <ChevronLeft className="h-4 w-4" /> Land Pipeline
        </Link>
        <div className="flex items-center gap-3">
          <MapPin className="h-7 w-7 text-blue-600" />
          <div>
            <h1 className="text-2xl font-bold">Add Land</h1>
            <p className="text-muted-foreground">Record a new land opportunity for evaluation.</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Card>
        <CardContent className="pt-6 space-y-4">
          <div>
            <label className="text-sm font-medium">Land Name *</label>
            <Input placeholder="e.g., Gulshan Plot 07" className="mt-1" />
          </div>

          <div>
            <label className="text-sm font-medium">Location *</label>
            <Input placeholder="e.g., Gulshan, Dhaka" className="mt-1" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Approx. Area</label>
              <div className="flex gap-2 mt-1">
                <Input type="number" placeholder="32" className="max-w-[100px]" />
                <Select defaultValue="katha">
                  <SelectTrigger className="w-[110px]"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="katha">Katha</SelectItem>
                    <SelectItem value="decimal">Decimal</SelectItem>
                    <SelectItem value="bigha">Bigha</SelectItem>
                    <SelectItem value="sqft">Sq Ft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Expected Price</label>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-muted-foreground">৳</span>
                <Input type="number" placeholder="450000000" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Owner / Contact</label>
              <Input placeholder="Owner name" className="mt-1" />
            </div>
            <div>
              <label className="text-sm font-medium">Source</label>
              <Select>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select source" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="broker">Broker</SelectItem>
                  <SelectItem value="direct">Direct Owner</SelectItem>
                  <SelectItem value="auction">Auction</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium">Assigned To</label>
            <Select>
              <SelectTrigger className="mt-1"><SelectValue placeholder="Select team member" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="rahim">Rahim</SelectItem>
                <SelectItem value="kamal">Kamal</SelectItem>
                <SelectItem value="sumon">Sumon</SelectItem>
                <SelectItem value="nadia">Nadia</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm font-medium">Notes</label>
            <Textarea placeholder="Any initial observations or context..." className="mt-1" rows={3} />
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card className="border-blue-200 bg-blue-50/50">
        <CardContent className="pt-4 flex gap-3">
          <Info className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            After saving, you&apos;ll be taken to the land workspace where initial assessment
            work steps will be generated from the configured workflow template.
          </p>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Link href="/real-estate/land-leads">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Link href="/real-estate/land-leads/LL-2026-001">
          <Button>Create Land</Button>
        </Link>
      </div>
    </div>
  );
}
