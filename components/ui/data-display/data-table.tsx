"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-display/table";
import { ScrollArea } from "@/components/ui/layout/scroll-area";
import { Skeleton } from "@/components/ui/feedback/skeleton";

interface DataTableProps {
  columns: string[];
  rows: Record<string, any>[];
  isLoading: boolean;
  error?: string;
  className?: string;
}

export function DataTable({
  columns,
  rows,
  isLoading,
  error,
  className,
}: DataTableProps) {
  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive rounded-md p-4 text-destructive">
        <h3 className="font-semibold mb-1">Error</h3>
        <pre className="text-sm whitespace-pre-wrap">{error}</pre>
      </div>
    );
  }

  return (
    <div className={className}>
      <ScrollArea className="h-full w-full rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((column, index) => (
                <TableHead key={index} className="min-w-[100px]">
                  {column}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array.from({ length: columns.length }).map((_, colIndex) => (
                    <TableCell key={colIndex}>
                      <Skeleton className="h-4 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center h-24 text-muted-foreground"
                >
                  No results found
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((column, colIndex) => (
                    <TableCell key={colIndex}>
                      {row[column] === null ? (
                        <span className="text-muted-foreground italic">
                          NULL
                        </span>
                      ) : typeof row[column] === "object" ? (
                        JSON.stringify(row[column])
                      ) : (
                        String(row[column])
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </ScrollArea>
    </div>
  );
}
