"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Badge } from "@/components/ui/feedback/badge";
import { Button } from "@/components/ui/inputs/button";
import { PlayIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type DifficultyLevel = "beginner" | "intermediate" | "advanced";

interface ExerciseCardProps {
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  query: string;
  onSelect: (query: string) => void;
  isActive?: boolean;
  className?: string;
}

const difficultyColors: Record<DifficultyLevel, string> = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};

export function ExerciseCard({
  title,
  description,
  difficulty,
  query,
  onSelect,
  isActive = false,
  className,
}: ExerciseCardProps) {
  return (
    <Card
      className={cn(
        "w-full max-w-full transition-all duration-200 cursor-pointer hover:shadow-md",
        isActive && "ring-2 ring-primary/50 shadow-sm",
        className
      )}
      onClick={() => onSelect(query)}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-base">{title}</CardTitle>
          <Badge className={cn("ml-2", difficultyColors[difficulty])}>
            {difficulty}
          </Badge>
        </div>
        <CardDescription className="text-xs">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-xs font-mono bg-muted/50 p-2 rounded overflow-x-auto max-w-full">
        <pre className="whitespace-pre-wrap break-words max-w-full overflow-hidden">
          {query}
        </pre>
      </CardContent>
      <CardFooter className="pt-2 pb-3"></CardFooter>
    </Card>
  );
}
