"use client";

import React, { useState, useEffect, useMemo } from "react";
import { SqlEditor } from "@/components/ui/custom/sql-editor";
import { DataTable } from "@/components/ui/data-display/data-table";
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";
import { DatabaseManager } from "@/components/ui/custom/database-manager";
import { databaseSchema } from "@/lib/schema";
import { executeQuery } from "@/lib/supabase";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";
import {
  ExerciseCard,
  DifficultyLevel,
} from "@/components/ui/custom/exercise-card";
import { exercises } from "@/lib/exercises";
import {
  DatabaseIcon,
  CodeIcon,
  BookIcon,
  SearchIcon,
  FilterIcon,
  Sparkles,
} from "lucide-react";
import { ModeToggle } from "@/components/theme-toggle";
import { ChallengeGenerator } from "@/components/ui/custom/challenge-generator";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { ScrollArea } from "@/components/ui/layout/scroll-area";
import { Input } from "@/components/ui/forms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/select";
import { Badge } from "@/components/ui/feedback/badge";
import { Button } from "@/components/ui/inputs/button";

export default function Home() {
  const [query, setQuery] = useState<string>(
    "SELECT id, first_name, last_name, email, country_id, city_id FROM users LIMIT 10"
  );
  const [results, setResults] = useState<any[] | null>(null);
  const [columns, setColumns] = useState<string[]>([]);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [activeExercise, setActiveExercise] = useState<string | null>(null);

  // Filter and search state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");

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

        // Try to order columns based on schema if this is a simple SELECT from a single table
        const extractedColumns = Object.keys(data[0]);
        let orderedColumns = extractedColumns;

        // Check if this looks like a simple table query
        const tableMatch = queryText.match(/FROM\s+(\w+)/i);
        if (tableMatch) {
          const tableName = tableMatch[1].toLowerCase();
          const tableSchema = databaseSchema.find(
            (table) => table.name.toLowerCase() === tableName
          );

          if (tableSchema) {
            // Order columns according to schema, but only include columns that exist in results
            const schemaColumnOrder = tableSchema.columns.map(
              (col) => col.name
            );
            const columnsInSchema = extractedColumns.filter((col) =>
              schemaColumnOrder.includes(col)
            );
            const columnsNotInSchema = extractedColumns.filter(
              (col) => !schemaColumnOrder.includes(col)
            );

            // Combine: schema-ordered columns first, then any additional columns
            orderedColumns = [
              ...schemaColumnOrder.filter((col) =>
                extractedColumns.includes(col)
              ),
              ...columnsNotInSchema,
            ];
          }
        }

        setColumns(orderedColumns);
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
    // Don't auto-execute - let user click Run Query button
  };

  const handleTableClick = (tableName: string) => {
    // Get the table schema to determine proper column order
    const tableSchema = databaseSchema.find(
      (table) => table.name === tableName
    );

    if (tableSchema) {
      // Use explicit column order from schema
      const columnNames = tableSchema.columns.map((col) => col.name).join(", ");
      const newQuery = `SELECT ${columnNames} FROM ${tableName} LIMIT 10;`;
      setQuery(newQuery);
    } else {
      // Fallback to SELECT * if schema not found
      const newQuery = `SELECT * FROM ${tableName} LIMIT 10;`;
      setQuery(newQuery);
    }
    // Don't auto-execute - let user click Run Query button
  };

  // Filtered exercises based on search and difficulty
  const filteredExercises = useMemo(() => {
    // Define difficulty order for sorting
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };

    return exercises
      .filter((exercise) => {
        const matchesSearch =
          exercise.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesDifficulty =
          difficultyFilter === "all" ||
          exercise.difficulty === difficultyFilter;

        return matchesSearch && matchesDifficulty;
      })
      .sort((a, b) => {
        // First sort by difficulty level
        const difficultyComparison =
          difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        if (difficultyComparison !== 0) {
          return difficultyComparison;
        }
        // If same difficulty, sort alphabetically by title
        return a.title.localeCompare(b.title);
      });
  }, [searchTerm, difficultyFilter]);

  // Get difficulty counts for the filter badges
  const difficultyCounts = useMemo(() => {
    const counts = {
      all: exercises.length,
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    exercises.forEach((exercise) => {
      counts[exercise.difficulty]++;
    });
    return counts;
  }, []);

  useEffect(() => {
    const exercise = exercises.find((ex) => ex.query === query);
    setActiveExercise(exercise?.id || null);
  }, [query]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="px-6 py-3 flex items-center">
          <div className="flex items-center gap-2">
            <DatabaseIcon size={24} className="text-primary" />
            <h1 className="text-xl font-semibold">SQL Playground</h1>
          </div>
          <div className="flex-1 flex justify-center">
            <ChallengeGenerator>
              <Button variant="outline" className="gap-2">
                <Sparkles size={16} />
                Generate Challenges
              </Button>
            </ChallengeGenerator>
          </div>
          <div className="flex items-center">
            <ModeToggle />
          </div>
        </div>
      </header>

      {/* Main Content Grid - Full Width */}
      <div className="flex-1 px-6 py-4">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-8rem)]">
          {/* Left Sidebar - Exercises & Schema */}
          <div className="col-span-4 xl:col-span-3">
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

                  <TabsContent value="exercises" className="mt-4 space-y-4">
                    {/* Search and Filter Controls */}
                    <div className="space-y-3">
                      {/* Search Input */}
                      <div className="relative">
                        <SearchIcon
                          size={16}
                          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                        />
                        <Input
                          placeholder="Search exercises..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-9 h-8 text-sm"
                        />
                      </div>

                      {/* Difficulty Filter */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <FilterIcon size={14} />
                          <span>Filter by difficulty</span>
                        </div>
                        <Select
                          value={difficultyFilter}
                          onValueChange={setDifficultyFilter}
                        >
                          <SelectTrigger className="h-8 text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">
                              <div className="flex items-center gap-2">
                                All Levels
                                <Badge variant="outline" className="text-xs">
                                  {difficultyCounts.all}
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="beginner">
                              <div className="flex items-center gap-2">
                                Beginner
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-green-100 text-green-800"
                                >
                                  {difficultyCounts.beginner}
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="intermediate">
                              <div className="flex items-center gap-2">
                                Intermediate
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-blue-100 text-blue-800"
                                >
                                  {difficultyCounts.intermediate}
                                </Badge>
                              </div>
                            </SelectItem>
                            <SelectItem value="advanced">
                              <div className="flex items-center gap-2">
                                Advanced
                                <Badge
                                  variant="outline"
                                  className="text-xs bg-purple-100 text-purple-800"
                                >
                                  {difficultyCounts.advanced}
                                </Badge>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Exercise List */}
                    <ScrollArea className="h-[calc(100vh-18rem)]">
                      <div className="space-y-3 pr-2">
                        {filteredExercises.length > 0 ? (
                          filteredExercises.map((exercise) => (
                            <ExerciseCard
                              key={exercise.id}
                              title={exercise.title}
                              description={exercise.description}
                              difficulty={exercise.difficulty}
                              query={exercise.query}
                              onSelect={handleExerciseSelect}
                              isActive={activeExercise === exercise.id}
                            />
                          ))
                        ) : (
                          <div className="text-center py-8 text-muted-foreground">
                            <BookIcon
                              size={32}
                              className="mx-auto mb-2 opacity-50"
                            />
                            <p className="text-sm">No exercises found</p>
                            <p className="text-xs">
                              Try adjusting your search or filter
                            </p>
                          </div>
                        )}
                      </div>
                    </ScrollArea>
                  </TabsContent>

                  <TabsContent value="schema" className="mt-4">
                    <div className="h-[calc(100vh-12rem)] space-y-4">
                      <DatabaseManager />
                      <SchemaViewer
                        tables={databaseSchema}
                        onTableClick={handleTableClick}
                        className="flex-1"
                      />
                    </div>
                  </TabsContent>
                </Tabs>
              </CardHeader>
            </Card>
          </div>

          {/* Right Content - Editor & Results */}
          <div className="col-span-8 xl:col-span-9 flex flex-col gap-4">
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
