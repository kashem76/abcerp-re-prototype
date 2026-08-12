"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { wbsTree } from "@/lib/mock-data";
import {
  ChevronDown,
  ChevronRight,
  FolderTree,
  Plus,
  Pencil,
  Package,
  Info,
} from "lucide-react";

type WBSNode = {
  code: string;
  name: string;
  level: number;
  children?: WBSNode[];
  boqItems?: number;
};

function WBSTreeNode({
  node,
  expanded,
  toggleExpand,
}: {
  node: WBSNode;
  expanded: Record<string, boolean>;
  toggleExpand: (code: string) => void;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.level === 4;
  const isExpanded = expanded[node.code] !== false; // default expanded

  const levelStyles: Record<number, string> = {
    1: "bg-blue-50 border border-blue-200 rounded-lg p-4",
    2: "bg-slate-50 border border-slate-200 rounded-lg p-3",
    3: "bg-gray-50 border border-gray-100 rounded-md p-3",
    4: "bg-white border-l-4 border-blue-300 rounded-md p-2.5 shadow-sm",
  };

  const textStyles: Record<number, string> = {
    1: "text-lg font-bold text-blue-900",
    2: "text-base font-semibold text-slate-800",
    3: "text-sm font-medium text-gray-700",
    4: "text-sm text-gray-600",
  };

  const indent = (node.level - 1) * 24;

  return (
    <div style={{ paddingLeft: `${indent}px` }} className="space-y-2">
      <div className={levelStyles[node.level] || levelStyles[4]}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                onClick={() => toggleExpand(node.code)}
                className="p-0.5 hover:bg-gray-200 rounded transition-colors"
              >
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-gray-500" />
                )}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <span className="font-mono text-xs text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
              {node.code}
            </span>
            <span className={textStyles[node.level] || textStyles[4]}>
              {node.name}
            </span>
            {isLeaf && node.boqItems !== undefined && (
              <Badge
                variant="secondary"
                className="bg-blue-100 text-blue-700 text-xs gap-1"
              >
                <Package className="h-3 w-3" />
                {node.boqItems} BOQ items
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-1">
            {!isLeaf && (
              <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                <Plus className="h-3 w-3" />
                Add Child
              </Button>
            )}
            <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
              <Pencil className="h-3 w-3" />
              Edit
            </Button>
          </div>
        </div>
      </div>

      {hasChildren && isExpanded && (
        <div className="space-y-2">
          {node.children!.map((child) => (
            <WBSTreeNode
              key={child.code}
              node={child}
              expanded={expanded}
              toggleExpand={toggleExpand}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function WBSPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (code: string) => {
    setExpanded((prev) => ({ ...prev, [code]: prev[code] === false }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FolderTree className="h-6 w-6 text-gray-400" />
            WBS Builder — ABC Nasirabad Heights
          </h1>
          <p className="text-gray-500">
            Work Breakdown Structure — hierarchical project decomposition
          </p>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Project Structure</CardTitle>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 border-blue-200"
              >
                L1 Project
              </Badge>
              <Badge
                variant="outline"
                className="bg-slate-50 text-slate-700 border-slate-200"
              >
                L2 Block
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-600 border-gray-200"
              >
                L3 Phase
              </Badge>
              <Badge
                variant="outline"
                className="bg-white text-gray-500 border-gray-200"
              >
                L4 Activity
              </Badge>
            </div>
          </div>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="space-y-2">
            {(wbsTree as WBSNode[]).map((node) => (
              <WBSTreeNode
                key={node.code}
                node={node}
                expanded={expanded}
                toggleExpand={toggleExpand}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add WBS Node
        </Button>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Info className="h-4 w-4" />
          Only leaf nodes (Level 4) can have BOQ items attached
        </div>
      </div>
    </div>
  );
}
