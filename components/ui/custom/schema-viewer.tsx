"use client";

import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/layout/accordion";
import { Badge } from "@/components/ui/feedback/badge";
import { Button } from "@/components/ui/inputs/button";
import { DatabaseIcon, KeyIcon, ExternalLinkIcon } from "lucide-react";
import { Separator } from "@/components/ui/layout/separator";
import { ScrollArea } from "@/components/ui/layout/scroll-area";

export interface TableColumn {
  name: string;
  type: string;
  isPrimary: boolean;
  isForeign: boolean;
  references?: string;
}

export interface SchemaTable {
  name: string;
  columns: TableColumn[];
}

interface SchemaViewerProps {
  tables: SchemaTable[];
  onTableClick?: (tableName: string) => void;
  className?: string;
}

export function SchemaViewer({
  tables,
  onTableClick,
  className,
}: SchemaViewerProps) {
  const [expanded, setExpanded] = useState<string[]>([]);

  const toggleTable = (tableName: string) => {
    if (expanded.includes(tableName)) {
      setExpanded(expanded.filter((name) => name !== tableName));
    } else {
      setExpanded([...expanded, tableName]);
    }
  };

  const handleTableClick = (tableName: string) => {
    if (onTableClick) {
      onTableClick(tableName);
    }
  };

  return (
    <ScrollArea className={className}>
      <div className="p-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-sm flex items-center gap-2">
            <DatabaseIcon size={16} />
            Database Schema
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open("/supabase-schema.png", "_blank")}
            className="h-6 px-2 text-xs"
          >
            <ExternalLinkIcon size={12} className="mr-1" />
            View Full Schema
          </Button>
        </div>
        <Separator className="my-2" />
        <Accordion
          type="multiple"
          value={expanded}
          onValueChange={setExpanded}
          className="w-full"
        >
          {tables.map((table) => (
            <AccordionItem key={table.name} value={table.name}>
              <AccordionTrigger
                onClick={() => toggleTable(table.name)}
                className="py-2 text-sm hover:no-underline"
              >
                <span
                  className="font-mono text-sm cursor-pointer hover:text-primary hover:underline"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleTableClick(table.name);
                  }}
                >
                  {table.name}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-1 pb-2">
                <ul className="space-y-1">
                  {table.columns.map((column) => (
                    <li
                      key={column.name}
                      className="flex items-center text-xs pl-2"
                    >
                      {column.isPrimary && (
                        <KeyIcon size={12} className="mr-1 text-yellow-500" />
                      )}
                      <span className="font-mono">{column.name}</span>
                      <Badge
                        variant="outline"
                        className="ml-2 text-xs h-4 px-1"
                      >
                        {column.type}
                      </Badge>
                      {column.isForeign && column.references && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          → {column.references}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </ScrollArea>
  );
}
