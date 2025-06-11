"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import {
  autocompletion,
  CompletionContext,
  CompletionResult,
} from "@codemirror/autocomplete";
import { Button } from "@/components/ui/inputs/button";
import { Switch } from "@/components/ui/forms/switch";
import { Label } from "@/components/ui/forms/label";
import {
  PlayIcon,
  RotateCcwIcon,
  GripHorizontalIcon,
  CodeIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { databaseSchema } from "@/lib/schema";

interface SqlEditorProps {
  defaultValue?: string;
  onExecute: (query: string) => void;
  onChange?: (query: string) => void;
  isExecuting: boolean;
  className?: string;
  resetQuery?: () => void;
  minHeight?: number;
  maxHeight?: number;
  showTitle?: boolean;
}

export function SqlEditor({
  defaultValue = "SELECT * FROM users LIMIT 10;",
  onExecute,
  onChange,
  isExecuting,
  className,
  resetQuery,
  minHeight = 150,
  maxHeight = 600,
  showTitle = false,
}: SqlEditorProps) {
  const [query, setQuery] = useState<string>(defaultValue);
  const [editorHeight, setEditorHeight] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);
  const [keywordsEnabled, setKeywordsEnabled] = useState<boolean>(true);
  const [schemaEnabled, setSchemaEnabled] = useState<boolean>(true);
  const [textEnabled, setTextEnabled] = useState<boolean>(false);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const resizeRef = useRef<HTMLDivElement>(null);
  const startYRef = useRef<number>(0);
  const startHeightRef = useRef<number>(200);

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    if (onChange) {
      onChange(value);
    }
  };

  const handleExecute = () => {
    if (!isExecuting && query.trim()) {
      onExecute(query);
    }
  };

  const handleReset = () => {
    if (resetQuery) {
      resetQuery();
    } else {
      setQuery(defaultValue);
      if (onChange) {
        onChange(defaultValue);
      }
    }
  };

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsResizing(true);
      startYRef.current = e.clientY;
      startHeightRef.current = editorHeight;

      document.body.style.cursor = "ns-resize";
      document.body.style.userSelect = "none";
    },
    [editorHeight]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!isResizing) return;

      const deltaY = e.clientY - startYRef.current;
      const newHeight = Math.max(
        minHeight,
        Math.min(maxHeight, startHeightRef.current + deltaY)
      );

      setEditorHeight(newHeight);
    },
    [isResizing, minHeight, maxHeight]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  // Create custom completion sources
  const createKeywordCompletions = (
    context: CompletionContext
  ): CompletionResult | null => {
    const word = context.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    const sqlKeywords = [
      "SELECT",
      "FROM",
      "WHERE",
      "INSERT",
      "UPDATE",
      "DELETE",
      "CREATE",
      "DROP",
      "ALTER",
      "TABLE",
      "INDEX",
      "VIEW",
      "DATABASE",
      "SCHEMA",
      "GRANT",
      "REVOKE",
      "COMMIT",
      "ROLLBACK",
      "TRANSACTION",
      "BEGIN",
      "END",
      "IF",
      "ELSE",
      "CASE",
      "WHEN",
      "THEN",
      "AS",
      "AND",
      "OR",
      "NOT",
      "IN",
      "EXISTS",
      "BETWEEN",
      "LIKE",
      "IS",
      "NULL",
      "TRUE",
      "FALSE",
      "DISTINCT",
      "ALL",
      "ANY",
      "SOME",
      "ORDER",
      "BY",
      "GROUP",
      "HAVING",
      "LIMIT",
      "OFFSET",
      "UNION",
      "INTERSECT",
      "EXCEPT",
      "JOIN",
      "INNER",
      "LEFT",
      "RIGHT",
      "FULL",
      "OUTER",
      "ON",
      "USING",
      "COUNT",
      "SUM",
      "AVG",
      "MIN",
      "MAX",
      "CAST",
      "CONVERT",
      "SUBSTRING",
      "LENGTH",
    ];

    return {
      from: word.from,
      options: sqlKeywords.map((keyword) => ({
        label: keyword,
        type: "keyword",
        boost: 1,
      })),
      validFor: /^\w*$/,
    };
  };

  const createSchemaCompletions = (
    context: CompletionContext
  ): CompletionResult | null => {
    const word = context.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    // Use actual database schema
    const schemaSuggestions: Array<{
      label: string;
      type: string;
      detail: string;
      boost?: number;
    }> = [];

    // Add table names
    databaseSchema.forEach((table) => {
      schemaSuggestions.push({
        label: table.name,
        type: "type",
        detail: "table",
      });

      // Add column names for each table
      table.columns.forEach((column) => {
        schemaSuggestions.push({
          label: column.name,
          type: column.isPrimary ? "keyword" : "property",
          detail: `${table.name}.${column.name} (${column.type})`,
          boost: column.isPrimary ? 3 : 2,
        });
      });
    });

    return {
      from: word.from,
      options: schemaSuggestions.map((item) => ({
        label: item.label,
        type: item.type,
        detail: item.detail,
        boost: item.boost || 2,
      })),
      validFor: /^\w*$/,
    };
  };

  const createTextCompletions = (
    context: CompletionContext
  ): CompletionResult | null => {
    const word = context.matchBefore(/\w*/);
    if (!word || (word.from === word.to && !context.explicit)) return null;

    // Generic text completions - these are the "annoying" ones
    const textSuggestions = [
      "object",
      "of",
      "old",
      "on",
      "only",
      "open",
      "option",
      "or",
      "order",
    ];

    return {
      from: word.from,
      options: textSuggestions.map((text) => ({
        label: text,
        type: "text",
        boost: -1, // Lower priority
      })),
      validFor: /^\w*$/,
    };
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      {showTitle && (
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium flex items-center gap-2">
            <CodeIcon size={18} />
            SQL Editor
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Autocomplete:</span>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Label htmlFor="keywords-toggle" className="text-xs">
                  Keywords
                </Label>
                <Switch
                  id="keywords-toggle"
                  checked={keywordsEnabled}
                  onCheckedChange={setKeywordsEnabled}
                />
              </div>
              <div className="flex items-center gap-1">
                <Label htmlFor="schema-toggle" className="text-xs">
                  Schema
                </Label>
                <Switch
                  id="schema-toggle"
                  checked={schemaEnabled}
                  onCheckedChange={setSchemaEnabled}
                />
              </div>
              <div className="flex items-center gap-1">
                <Label htmlFor="text-toggle" className="text-xs">
                  Text
                </Label>
                <Switch
                  id="text-toggle"
                  checked={textEnabled}
                  onCheckedChange={setTextEnabled}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="relative">
        <div className="relative border rounded-md overflow-hidden">
          <CodeMirror
            value={query}
            height={`${editorHeight}px`}
            extensions={[
              sql(),
              autocompletion({
                override: [
                  ...(keywordsEnabled ? [createKeywordCompletions] : []),
                  ...(schemaEnabled ? [createSchemaCompletions] : []),
                  ...(textEnabled ? [createTextCompletions] : []),
                ],
                activateOnTyping:
                  keywordsEnabled || schemaEnabled || textEnabled,
                maxRenderedOptions: 15,
              }),
            ]}
            onChange={handleQueryChange}
            theme={isDark ? dracula : xcodeLight}
            className="text-base"
          />
        </div>

        {/* Resize Handle */}
        <div
          ref={resizeRef}
          onMouseDown={handleMouseDown}
          className={cn(
            "absolute bottom-0 left-0 right-0 h-2 cursor-ns-resize",
            "flex items-center justify-center",
            "hover:bg-muted/50 transition-colors",
            "group"
          )}
        >
          <div className="flex items-center justify-center w-8 h-1 rounded-full bg-muted group-hover:bg-muted-foreground/50 transition-colors">
            <GripHorizontalIcon
              size={12}
              className="text-muted-foreground group-hover:text-muted-foreground/80"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={handleReset}
          variant="outline"
          size="sm"
          className="gap-1"
        >
          <RotateCcwIcon size={16} />
          Reset
        </Button>
        <div className="flex items-center gap-2">
          <Button
            onClick={handleExecute}
            disabled={isExecuting || !query.trim()}
            size="sm"
            className="gap-1"
          >
            <PlayIcon size={16} />
            Run Query
          </Button>
        </div>
      </div>
    </div>
  );
}
