"use client";

import React, { useState, useEffect } from "react";
import { SqlEditor } from "@/components/ui/custom/sql-editor";
import { DataTable } from "@/components/ui/data-display/data-table";
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";
import { databaseSchema } from "@/lib/schema";
import { executeQuery } from "@/lib/supabase";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import { ExerciseCard } from "@/components/ui/custom/exercise-card";
import { exercises } from "@/lib/exercises";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/layout/resizable";
import { DatabaseIcon, CodeIcon, BookIcon } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";

export default function Home() {
  const [query, setQuery] = useState<string>("SELECT * FROM users LIMIT 10;");
  const [results, setResults] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  const executeUserQuery = async (queryText: string) => {
    setIsExecuting(true);
    setError(null);

    try {
      const { data, error } = await executeQuery(queryText);

      if (error) {
        setError(error);
        setResults(null);
        setColumns([]);
      } else if (data && data.length > 0) {
        setResults(data);
        setColumns(Object.keys(data[0]));
      } else {
        setResults([]);
        setColumns([]);
      }
    } catch (err: any) {
      setError(err.message || "An error occurred");
      setResults(null);
      setColumns([]);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleExerciseSelect = (exerciseQuery: string) => {
    setQuery(exerciseQuery);
    // Auto-execute the query when selecting an exercise
    executeUserQuery(exerciseQuery);
  };

  const handleTableClick = (tableName: string) => {
    const newQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
    setQuery(newQuery);
    executeUserQuery(newQuery);
  };

  useEffect(() => {
    // Execute initial query on load
    executeUserQuery(query);
  }, []); // Only run once on mount

  useEffect(() => {
    // Find which exercise is active based on the current query
    const exercise = exercises.find((ex) => ex.query === query);
    setActiveExercise(exercise?.id || null);
  }, [query]);

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DatabaseIcon size={24} className="text-primary" />
            <h1 className="text-xl font-semibold">SQL Playground</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      <div className="container mx-auto p-4 flex-1 flex flex-col">
        <ResizablePanelGroup
          direction="horizontal"
          className="min-h-[calc(100vh-8rem)]"
        >
          {/* Left sidebar */}
          <ResizablePanel defaultSize={25} minSize={20} maxSize={30}>
            <Tabs defaultValue="exercises" className="h-full flex flex-col">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger
                  value="exercises"
                  className="flex gap-1 items-center"
                >
                  <BookIcon size={16} />
                  Exercises
                </TabsTrigger>
                <TabsTrigger value="schema" className="flex gap-1 items-center">
                  <DatabaseIcon size={16} />
                  Schema
                </TabsTrigger>
              </TabsList>
              <TabsContent value="exercises" className="flex-1 overflow-auto">
                <div className="grid gap-4 p-1">
                  {exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise.id}
                      title={exercise.title}
                      description={exercise.description}
                      difficulty={exercise.difficulty}
                      query={exercise.query}
                      onSelect={handleExerciseSelect}
                      isActive={activeExercise === exercise.id}
                    />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="schema" className="flex-1 overflow-hidden">
                <SchemaViewer
                  tables={databaseSchema}
                  onTableClick={handleTableClick}
                  className="h-full"
                />
              </TabsContent>
            </Tabs>
          </ResizablePanel>

          <ResizableHandle />

          {/* Main content */}
          <ResizablePanel defaultSize={75}>
            <ResizablePanelGroup direction="vertical">
              {/* Editor panel */}
              <ResizablePanel defaultSize={40} minSize={30}>
                <div className="p-4 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <CodeIcon size={18} />
                    <h2 className="text-lg font-medium">SQL Editor</h2>
                  </div>
                  <SqlEditor
                    defaultValue={query}
                    onExecute={executeUserQuery}
                    onChange={setQuery}
                    isExecuting={isExecuting}
                    className="flex-1"
                  />
                </div>
              </ResizablePanel>

              <ResizableHandle />

              {/* Results panel */}
              <ResizablePanel defaultSize={60}>
                <div className="p-4 h-full flex flex-col">
                  <div className="flex justify-between items-center mb-3">
                    <h2 className="text-lg font-medium flex items-center gap-2">
                      <DatabaseIcon size={18} />
                      Results
                    </h2>
                    {results && !error && (
                      <span className="text-sm text-muted-foreground">
                        {results.length} rows returned
                      </span>
                    )}
                  </div>
                  <DataTable
                    columns={columns}
                    rows={results || []}
                    isLoading={isExecuting}
                    error={error || undefined}
                    className="flex-1"
                  />
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </main>
  );
}
