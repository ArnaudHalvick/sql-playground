"use client";

import React, { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import { dracula } from '@uiw/codemirror-theme-dracula';
import { xcodeLight } from '@uiw/codemirror-theme-xcode';
import { Button } from './button';
import { PlayIcon, RotateCcwIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SqlEditorProps {
  defaultValue?: string;
  onExecute: (query: string) => void;
  isExecuting: boolean;
  className?: string;
  resetQuery?: () => void;
}

export function SqlEditor({
  defaultValue = "SELECT * FROM users LIMIT 10;",
  onExecute,
  isExecuting,
  className,
  resetQuery,
}: SqlEditorProps) {
  const [query, setQuery] = useState<string>(defaultValue);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

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
    }
  };

  return (
    <div className={cn("flex flex-col gap-4", className)}>
      <div className="relative border rounded-md overflow-hidden">
        <CodeMirror
          value={query}
          height="200px"
          extensions={[sql()]}
          onChange={(value) => setQuery(value)}
          theme={isDark ? dracula : xcodeLight}
          className="text-base"
        />
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
  );
}