"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useTheme } from "next-themes";
import CodeMirror from "@uiw/react-codemirror";
import { sql } from "@codemirror/lang-sql";
import { dracula } from "@uiw/codemirror-theme-dracula";
import { xcodeLight } from "@uiw/codemirror-theme-xcode";
import { Button } from "@/components/ui/inputs/button";
import { PlayIcon, RotateCcwIcon, GripHorizontalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface SqlEditorProps {
  defaultValue?: string;
  onExecute: (query: string) => void;
  onChange?: (query: string) => void;
  isExecuting: boolean;
  className?: string;
  resetQuery?: () => void;
  minHeight?: number;
  maxHeight?: number;
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
}: SqlEditorProps) {
  const [query, setQuery] = useState<string>(defaultValue);
  const [editorHeight, setEditorHeight] = useState<number>(200);
  const [isResizing, setIsResizing] = useState<boolean>(false);
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

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative">
        <div className="relative border rounded-md overflow-hidden">
          <CodeMirror
            value={query}
            height={`${editorHeight}px`}
            extensions={[sql()]}
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
