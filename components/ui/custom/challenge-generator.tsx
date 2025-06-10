"use client";

import React, { useState, useMemo } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/inputs/button";
import { Badge } from "@/components/ui/feedback/badge";
import { ScrollArea } from "@/components/ui/layout/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import {
  Copy,
  Sparkles,
  Database,
  TrendingUp,
  Users,
  ShoppingCart,
  MapPin,
  BarChart3,
  SearchIcon,
  FilterIcon,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/forms/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/select";

// Challenge types with their metadata
const challengeTypes = [
  {
    id: "basic-queries",
    title: "Basic Queries",
    description: "Simple SELECT statements and filtering",
    difficulty: "beginner" as const,
    icon: Database,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "joins",
    title: "Table Joins",
    description: "INNER, LEFT, RIGHT, and FULL OUTER joins",
    difficulty: "intermediate" as const,
    icon: Users,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "aggregations",
    title: "Aggregations",
    description: "GROUP BY, COUNT, SUM, AVG, and HAVING",
    difficulty: "intermediate" as const,
    icon: BarChart3,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "subqueries",
    title: "Subqueries",
    description: "Nested queries and correlated subqueries",
    difficulty: "advanced" as const,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "window-functions",
    title: "Window Functions",
    description: "ROW_NUMBER, RANK, LAG, LEAD, and partitioning",
    difficulty: "advanced" as const,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "ecommerce-analysis",
    title: "E-commerce Analysis",
    description: "Sales, orders, and customer behavior analysis",
    difficulty: "intermediate" as const,
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "geographic-queries",
    title: "Geographic Queries",
    description: "Country, city, and location-based analysis",
    difficulty: "beginner" as const,
    icon: MapPin,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "data-modification",
    title: "Data Modification",
    description: "INSERT, UPDATE, DELETE, and UPSERT operations",
    difficulty: "intermediate" as const,
    icon: Database,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "performance-optimization",
    title: "Performance & Optimization",
    description: "Query optimization, indexes, and execution plans",
    difficulty: "advanced" as const,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "date-time-queries",
    title: "Date & Time Analysis",
    description: "Date functions, time series, and temporal queries",
    difficulty: "intermediate" as const,
    icon: BarChart3,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "string-manipulation",
    title: "String Manipulation",
    description: "Text processing, pattern matching, and string functions",
    difficulty: "beginner" as const,
    icon: Database,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "conditional-logic",
    title: "Conditional Logic",
    description: "CASE statements, IF conditions, and logical operations",
    difficulty: "intermediate" as const,
    icon: BarChart3,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "data-quality",
    title: "Data Quality & Validation",
    description: "NULL handling, data validation, and cleansing",
    difficulty: "intermediate" as const,
    icon: Database,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "reporting-analytics",
    title: "Reporting & Analytics",
    description: "Business reports, KPIs, and analytical queries",
    difficulty: "advanced" as const,
    icon: BarChart3,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
  {
    id: "complex-business-logic",
    title: "Complex Business Logic",
    description: "Multi-step calculations and business rule implementation",
    difficulty: "advanced" as const,
    icon: TrendingUp,
    color: "bg-purple-100 text-purple-800 border-purple-200",
  },
];

// Database schema for AI prompts
const databaseSchema = `
-- Database Schema Structure

-- products table
CREATE TABLE products (
  id INT PRIMARY KEY,
  name TEXT,
  description TEXT,
  price DECIMAL,
  category TEXT,
  stock INT
);

-- orders table
CREATE TABLE orders (
  id INT PRIMARY KEY,
  user_id INT,
  total_amount DECIMAL,
  status TEXT
);

-- order_items table
CREATE TABLE order_items (
  id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT,
  price DECIMAL
);

-- users table
CREATE TABLE users (
  id INT PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email TEXT,
  country_id INT,
  city_id INT
);

-- cities table
CREATE TABLE cities (
  id INT PRIMARY KEY,
  name TEXT,
  country_id INT,
  population INT
);

-- countries table
CREATE TABLE countries (
  id INT PRIMARY KEY,
  name TEXT,
  code TEXT,
  continent TEXT
);

-- Relationships:
-- orders.user_id → users.id
-- order_items.order_id → orders.id
-- order_items.product_id → products.id
-- users.country_id → countries.id
-- users.city_id → cities.id
-- cities.country_id → countries.id
`;

// AI prompts for each challenge type
const challengePrompts = {
  "basic-queries": {
    beginner: `Generate a SQL challenge for a beginner level focusing on basic queries. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Simple SELECT statements
- Basic WHERE clauses
- LIMIT and ORDER BY
- Basic filtering with comparison operators

The challenge should:
1. Have a clear, specific question
2. Be solvable with basic SQL knowledge
3. Use realistic business scenarios
4. Include the expected difficulty level: BEGINNER
5. Provide a brief hint if needed

Format: Provide only the challenge question and context, no solution.`,
  },
  joins: {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on table joins. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- INNER JOIN, LEFT JOIN, or RIGHT JOIN
- Joining 2-3 tables
- Meaningful business questions requiring data from multiple tables
- Proper use of foreign key relationships

The challenge should:
1. Have a clear, specific question
2. Require understanding of table relationships
3. Use realistic business scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide a brief hint about which tables to join

Format: Provide only the challenge question and context, no solution.`,
  },
  aggregations: {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on aggregations. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- GROUP BY clauses
- Aggregate functions (COUNT, SUM, AVG, MAX, MIN)
- HAVING clauses for filtering groups
- Meaningful business metrics

The challenge should:
1. Have a clear, specific question
2. Require grouping and calculating metrics
3. Use realistic business scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide a brief hint about grouping strategy

Format: Provide only the challenge question and context, no solution.`,
  },
  subqueries: {
    advanced: `Generate a SQL challenge for an advanced level focusing on subqueries. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Nested SELECT statements
- Correlated or non-correlated subqueries
- EXISTS, IN, or comparison operators with subqueries
- Complex business logic

The challenge should:
1. Have a clear, specific question
2. Require advanced SQL thinking
3. Use realistic business scenarios
4. Include the expected difficulty level: ADVANCED
5. Provide a brief hint about the subquery approach

Format: Provide only the challenge question and context, no solution.`,
  },
  "window-functions": {
    advanced: `Generate a SQL challenge for an advanced level focusing on window functions. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Window functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)
- PARTITION BY and ORDER BY in window functions
- Running totals or moving averages
- Advanced analytical queries

The challenge should:
1. Have a clear, specific question
2. Require advanced analytical thinking
3. Use realistic business scenarios
4. Include the expected difficulty level: ADVANCED
5. Provide a brief hint about which window function to use

Format: Provide only the challenge question and context, no solution.`,
  },
  "ecommerce-analysis": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on e-commerce analysis. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Sales and revenue analysis
- Customer behavior patterns
- Product performance metrics
- Order and inventory insights

The challenge should:
1. Have a clear, specific business question
2. Require joining multiple tables
3. Use realistic e-commerce scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide context about the business goal

Format: Provide only the challenge question and context, no solution.`,
  },
  "geographic-queries": {
    beginner: `Generate a SQL challenge for a beginner level focusing on geographic queries. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Country and city data analysis
- Geographic filtering and grouping
- Population or location-based queries
- Simple geographic relationships

The challenge should:
1. Have a clear, specific question
2. Be solvable with basic to intermediate SQL
3. Use realistic geographic scenarios
4. Include the expected difficulty level: BEGINNER
5. Provide context about the geographic aspect

Format: Provide only the challenge question and context, no solution.`,
  },
  "data-modification": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on data modification. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- INSERT statements with proper data types
- UPDATE operations with conditions
- DELETE operations with safety considerations
- UPSERT or INSERT...ON CONFLICT scenarios

The challenge should:
1. Have a clear, specific business scenario
2. Require understanding of data integrity
3. Use realistic data modification scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide context about the business need for data changes

Format: Provide only the challenge question and context, no solution.`,
  },
  "performance-optimization": {
    advanced: `Generate a SQL challenge for an advanced level focusing on performance optimization. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Query optimization techniques
- Index usage and recommendations
- Execution plan analysis
- Performance bottleneck identification

The challenge should:
1. Present a performance problem scenario
2. Require advanced SQL optimization knowledge
3. Use realistic performance scenarios
4. Include the expected difficulty level: ADVANCED
5. Provide context about performance requirements

Format: Provide only the challenge question and context, no solution.`,
  },
  "date-time-queries": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on date and time analysis. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Date functions and calculations
- Time series analysis
- Date range filtering
- Temporal data aggregation

The challenge should:
1. Have a clear, time-based business question
2. Require understanding of date/time functions
3. Use realistic temporal scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide context about the time-based analysis

Format: Provide only the challenge question and context, no solution.`,
  },
  "string-manipulation": {
    beginner: `Generate a SQL challenge for a beginner level focusing on string manipulation. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- String functions (CONCAT, SUBSTRING, LENGTH, etc.)
- Pattern matching with LIKE
- Case conversion (UPPER, LOWER)
- String cleaning and formatting

The challenge should:
1. Have a clear, specific question
2. Be solvable with basic string functions
3. Use realistic text processing scenarios
4. Include the expected difficulty level: BEGINNER
5. Provide context about the string manipulation need

Format: Provide only the challenge question and context, no solution.`,
  },
  "conditional-logic": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on conditional logic. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- CASE statements for conditional logic
- IF/THEN logic implementation
- Nested conditions
- Logical operators (AND, OR, NOT)

The challenge should:
1. Have a clear business logic requirement
2. Require understanding of conditional statements
3. Use realistic business rule scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide context about the business logic

Format: Provide only the challenge question and context, no solution.`,
  },
  "data-quality": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on data quality and validation. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- NULL value handling and detection
- Data validation rules
- Data cleansing operations
- Duplicate detection and removal

The challenge should:
1. Present a data quality problem
2. Require understanding of data validation techniques
3. Use realistic data quality scenarios
4. Include the expected difficulty level: INTERMEDIATE
5. Provide context about data quality requirements

Format: Provide only the challenge question and context, no solution.`,
  },
  "reporting-analytics": {
    advanced: `Generate a SQL challenge for an advanced level focusing on reporting and analytics. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Complex business reports
- KPI calculations
- Multi-dimensional analysis
- Advanced analytical functions

The challenge should:
1. Present a comprehensive reporting requirement
2. Require advanced analytical thinking
3. Use realistic business intelligence scenarios
4. Include the expected difficulty level: ADVANCED
5. Provide context about the business reporting need

Format: Provide only the challenge question and context, no solution.`,
  },
  "complex-business-logic": {
    advanced: `Generate a SQL challenge for an advanced level focusing on complex business logic. Use this database schema:

${databaseSchema}

Create a challenge that involves:
- Multi-step calculations
- Complex business rule implementation
- Hierarchical data processing
- Advanced logical operations

The challenge should:
1. Present a complex business scenario
2. Require advanced SQL problem-solving skills
3. Use realistic enterprise-level scenarios
4. Include the expected difficulty level: ADVANCED
5. Provide context about the complex business requirements

Format: Provide only the challenge question and context, no solution.`,
  },
};

interface ChallengeGeneratorProps {
  children: React.ReactNode;
}

export function ChallengeGenerator({ children }: ChallengeGeneratorProps) {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(
    null
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [difficultyFilter, setDifficultyFilter] = useState<string>("all");
  const { toast } = useToast();

  // Filtered and sorted challenge types
  const filteredAndSortedChallengeTypes = useMemo(() => {
    // First filter by search and difficulty
    const filtered = challengeTypes.filter((challenge) => {
      const matchesSearch =
        challenge.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        challenge.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDifficulty =
        difficultyFilter === "all" || challenge.difficulty === difficultyFilter;

      return matchesSearch && matchesDifficulty;
    });

    // Then sort by difficulty first, then alphabetically
    const difficultyOrder = { beginner: 1, intermediate: 2, advanced: 3 };
    return filtered.sort((a, b) => {
      // First sort by difficulty
      const difficultyComparison =
        difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
      if (difficultyComparison !== 0) {
        return difficultyComparison;
      }
      // Then sort alphabetically by title
      return a.title.localeCompare(b.title);
    });
  }, [searchTerm, difficultyFilter]);

  // Get difficulty counts for the filter badges
  const difficultyCounts = useMemo(() => {
    const counts = {
      all: challengeTypes.length,
      beginner: 0,
      intermediate: 0,
      advanced: 0,
    };
    challengeTypes.forEach((challenge) => {
      counts[challenge.difficulty]++;
    });
    return counts;
  }, []);

  const handleCopyPrompt = async (challengeId: string) => {
    const challenge = challengeTypes.find((c) => c.id === challengeId);
    if (!challenge) return;

    const challengePrompt =
      challengePrompts[challengeId as keyof typeof challengePrompts];
    if (!challengePrompt) return;

    const prompt =
      challengePrompt[challenge.difficulty as keyof typeof challengePrompt];
    if (!prompt) return;

    try {
      await navigator.clipboard.writeText(prompt);
      toast({
        title: "Prompt copied!",
        description: `${challenge.title} prompt copied to clipboard`,
        duration: 3000,
      });
    } catch (error) {
      toast({
        title: "Failed to copy",
        description: "Could not copy prompt to clipboard",
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  const getDifficultyBadgeColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "advanced":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="w-[95vw] max-w-7xl h-[90vh] p-0 flex flex-col">
        <DialogHeader className="p-6 pb-0 flex-shrink-0">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="h-5 w-5 text-primary" />
            Generate SQL Challenges
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-1 min-h-0">
          {/* Left Sidebar - Challenge Types */}
          <div className="w-80 border-r bg-muted/30 p-4 flex flex-col">
            <h3 className="font-medium text-sm text-muted-foreground mb-4 uppercase tracking-wide flex-shrink-0">
              Challenge Types
            </h3>

            {/* Search and Filter Controls */}
            <div className="space-y-3 mb-4 flex-shrink-0">
              {/* Search Input */}
              <div className="relative">
                <SearchIcon
                  size={16}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                />
                <Input
                  placeholder="Search challenge types..."
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

            <ScrollArea className="flex-1">
              <div className="space-y-2 pr-2">
                {filteredAndSortedChallengeTypes.length > 0 ? (
                  filteredAndSortedChallengeTypes.map((challenge) => {
                    const Icon = challenge.icon;
                    const isSelected = selectedChallenge === challenge.id;

                    return (
                      <Card
                        key={challenge.id}
                        className={cn(
                          "cursor-pointer transition-all hover:shadow-md border-2",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-transparent hover:border-muted-foreground/20"
                        )}
                        onClick={() => setSelectedChallenge(challenge.id)}
                      >
                        <CardHeader className="p-4 pb-2">
                          <div className="flex items-start gap-3">
                            <div
                              className={cn("p-2 rounded-lg", challenge.color)}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <CardTitle className="text-sm font-medium leading-tight">
                                {challenge.title}
                              </CardTitle>
                              <Badge
                                variant="outline"
                                className={cn(
                                  "mt-1 text-xs border",
                                  getDifficultyBadgeColor(challenge.difficulty)
                                )}
                              >
                                {challenge.difficulty}
                              </Badge>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {challenge.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Sparkles size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No challenge types found</p>
                    <p className="text-xs">
                      Try adjusting your search or filter
                    </p>
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Right Content - Prompt Display */}
          <div className="flex-1 p-6 flex flex-col min-h-0">
            {selectedChallenge ? (
              <div className="flex-1 flex flex-col min-h-0">
                {(() => {
                  const challenge = challengeTypes.find(
                    (c) => c.id === selectedChallenge
                  );
                  if (!challenge) return null;

                  const challengePrompt =
                    challengePrompts[
                      selectedChallenge as keyof typeof challengePrompts
                    ];
                  if (!challengePrompt) return null;

                  const prompt =
                    challengePrompt[
                      challenge.difficulty as keyof typeof challengePrompt
                    ];
                  if (!prompt) return null;

                  const Icon = challenge.icon;

                  return (
                    <>
                      <div className="flex items-center gap-3 mb-6 flex-shrink-0">
                        <div className={cn("p-3 rounded-xl", challenge.color)}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h2 className="text-xl font-semibold">
                            {challenge.title}
                          </h2>
                          <p className="text-muted-foreground">
                            {challenge.description}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={cn(
                            "ml-auto border",
                            getDifficultyBadgeColor(challenge.difficulty)
                          )}
                        >
                          {challenge.difficulty}
                        </Badge>
                      </div>

                      <div className="flex-1 flex flex-col min-h-0">
                        <div className="flex items-center justify-between mb-4 flex-shrink-0">
                          <h3 className="font-medium">AI Prompt</h3>
                          <Button
                            onClick={() => handleCopyPrompt(selectedChallenge)}
                            size="sm"
                            variant="outline"
                            className="gap-2"
                          >
                            <Copy className="h-4 w-4" />
                            Copy Prompt
                          </Button>
                        </div>

                        <Card className="flex-1 min-h-0">
                          <CardContent className="p-0 h-full">
                            <ScrollArea className="h-full">
                              <pre className="p-6 text-sm leading-relaxed whitespace-pre-wrap font-mono">
                                {prompt}
                              </pre>
                            </ScrollArea>
                          </CardContent>
                        </Card>

                        <div className="mt-4 p-4 bg-muted/50 rounded-lg flex-shrink-0">
                          <p className="text-sm text-muted-foreground">
                            <strong>How to use:</strong> Copy this prompt and
                            paste it into your preferred AI assistant (ChatGPT,
                            Claude, etc.) to generate a custom SQL challenge.
                            The AI will create a unique problem based on your
                            database schema and the specified difficulty level.
                          </p>
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <Sparkles className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">
                    Select a Challenge Type
                  </h3>
                  <p className="text-muted-foreground max-w-md">
                    Choose a challenge type from the left sidebar to view the AI
                    prompt. Copy the prompt and use it with your favorite AI
                    assistant to generate custom SQL challenges.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
