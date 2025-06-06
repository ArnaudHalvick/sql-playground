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
import { DatabaseIcon, CodeIcon, BookIcon } from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { ScrollArea } from "@/components/ui/layout/scroll-area";

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
    executeUserQuery(exerciseQuery);
  };

  const handleTableClick = (tableName: string) => {
    const newQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
    setQuery(newQuery);
    executeUserQuery(newQuery);
  };

  useEffect(() => {
    executeUserQuery(query);
  }, []);

  useEffect(() => {
    const exercise = exercises.find((ex) => ex.query === query);
    setActiveExercise(exercise?.id || null);
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <DatabaseIcon size={24} className="text-primary" />
            <h1 className="text-xl font-semibold">SQL Playground</h1>
          </div>
          <ModeToggle />
        </div>
      </header>

      {/* Main Content Grid */}
      <div className="flex-1 container mx-auto p-4">
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Exercises & Schema */}
          <div className="col-span-3">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <Tabs defaultValue="exercises" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger
                      value="exercises"
                      className="flex gap-1 items-center text-xs"
                    >
                      <BookIcon size={14} />
                      Exercises
                    </TabsTrigger>
                    <TabsTrigger
                      value="schema"
                      className="flex gap-1 items-center text-xs"
                    >
                      <DatabaseIcon size={14} />
                      Schema
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="exercises" className="mt-4">
                    <ScrollArea className="h-[calc(100vh-12rem)]">
                      <div className="space-y-3 pr-2">
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
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="schema" className="mt-4">
                    <div className="h-[calc(100vh-12rem)]">
                      <SchemaViewer
                        tables={databaseSchema}
                        onTableClick={handleTableClick}
                        className="h-full"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>

          {/* Right Content - Editor & Results */}
          <div className="col-span-9 flex flex-col gap-4">
            {/* SQL Editor */}
            <Card className="flex-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium flex items-center gap-2">
                  <CodeIcon size={18} />
                  SQL Editor
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SqlEditor
                  defaultValue={query}
                  onExecute={executeUserQuery}
                  onChange={setQuery}
                  isExecuting={isExecuting}
                />
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="flex-1 min-h-0">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <DatabaseIcon size={18} />
                    Results
                  </CardTitle>
                  {results && !error && (
                    <span className="text-sm text-muted-foreground">
                      {results.length} rows returned
                    </span>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 min-h-0">
                <div className="h-full">
                  <DataTable
                    columns={columns}
                    rows={results || []}
                    isLoading={isExecuting}
                    error={error || undefined}
                    className="h-full"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
