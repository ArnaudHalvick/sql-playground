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
    id: "basic-window-functions",
    title: "Basic Window Functions",
    description: "Simple ROW_NUMBER and basic ranking",
    difficulty: "beginner" as const,
    icon: TrendingUp,
    color: "bg-green-100 text-green-800 border-green-200",
  },
  {
    id: "window-functions",
    title: "Window Functions",
    description: "ROW_NUMBER, RANK, and basic partitioning",
    difficulty: "intermediate" as const,
    icon: TrendingUp,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
  {
    id: "advanced-window-functions",
    title: "Advanced Window Functions",
    description: "LAG, LEAD, complex partitioning, and analytical functions",
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
  {
    id: "delivery-analysis",
    title: "Delivery & Order Status",
    description: "Order tracking, delivery performance, and status analysis",
    difficulty: "intermediate" as const,
    icon: ShoppingCart,
    color: "bg-blue-100 text-blue-800 border-blue-200",
  },
];

// Database schema for AI prompts
const databaseSchema = `
-- Supabase PostgreSQL Database Schema for SQL Playground

-- countries table
CREATE TABLE countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  continent TEXT NOT NULL
);

-- cities table  
CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_id INTEGER REFERENCES countries(id),
  population INTEGER
);

-- users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  country_id INTEGER REFERENCES countries(id),
  city_id INTEGER REFERENCES cities(id)
);

-- products table
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0
);

-- orders table
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  order_date DATE DEFAULT CURRENT_DATE,
  estimated_delivery DATE,
  delivery_date DATE
);

-- order_items table
CREATE TABLE order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
);

-- IMPORTANT DATA SPECIFICATIONS:

-- Order Status Values (ONLY these 3 values exist):
-- • 'pending' - Orders not yet delivered (has estimated_delivery, delivery_date is NULL)
-- • 'delivered' - Completed orders (has both estimated_delivery and delivery_date)  
-- • 'cancelled' - Cancelled orders (both estimated_delivery and delivery_date are NULL)

-- Product Categories (16 categories available):
-- Electronics, Clothing, Home & Garden, Sports, Kitchen, Books, Health & Beauty, 
-- Toys, Automotive, Office Supplies, Pet Supplies, Jewelry, Music, Movies, Games, Food & Beverages

-- Date Ranges:
-- • order_date: Ranges from 2 years ago to today (never future dates)
-- • estimated_delivery: 3-14 days after order_date
-- • delivery_date: Can be early (-2 days) to late (+5 days) from estimated_delivery, only for delivered orders

-- Countries: 25-30 real countries with proper codes (US, UK, FR, DE, JP, AU, BR, CA, IN, CN, etc.)
-- Cities: 50-100 real cities with actual population data
-- Users: Realistic names with unique email addresses
-- Products: Generated names like "Premium Laptop Pro", "Wireless Headphones Ultra", etc.

-- Database Platform: Supabase (PostgreSQL)
-- Query Execution: Use run_query() function for custom queries
-- Data Types: SERIAL (auto-increment), TEXT, INTEGER, DECIMAL(10,2), DATE

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
    beginner: `Generate a SQL challenge for a beginner level focusing on basic queries. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Simple SELECT statements with specific columns
- Basic WHERE clauses with realistic conditions
- LIMIT and ORDER BY clauses
- Basic filtering with comparison operators
- Use actual data values (order status: 'pending', 'delivered', 'cancelled')

The challenge should:
1. Have a clear, specific business question
2. Be solvable with basic SQL knowledge (SELECT, WHERE, ORDER BY, LIMIT)
3. Use realistic e-commerce scenarios
4. Reference actual column names and data types from the schema
5. Include the expected difficulty level: BEGINNER
6. Provide a brief hint about which table(s) to query

Format: Provide only the challenge question and context, no solution.`,
  },
  joins: {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on table joins. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- INNER JOIN, LEFT JOIN, or RIGHT JOIN between 2-3 tables
- Meaningful business questions requiring data from multiple related tables
- Proper use of foreign key relationships (user_id, country_id, city_id, order_id, product_id)
- Realistic filtering conditions using actual data values

The challenge should:
1. Have a clear, specific business question
2. Require understanding of table relationships and foreign keys
3. Use realistic e-commerce scenarios (customers, orders, products, locations)
4. Reference actual column names and relationships from the schema
5. Include the expected difficulty level: INTERMEDIATE
6. Provide a brief hint about which tables to join and the relationship

Format: Provide only the challenge question and context, no solution.`,
  },
  aggregations: {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on aggregations. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- GROUP BY clauses with meaningful grouping (by country, category, status, date)
- Aggregate functions (COUNT, SUM, AVG, MAX, MIN) on appropriate columns
- HAVING clauses for filtering groups
- Business metrics calculation (revenue, order counts, average prices)
- Use actual data values (order status: 'pending', 'delivered', 'cancelled')

The challenge should:
1. Have a clear, specific business question about metrics or summaries
2. Require grouping data and calculating meaningful aggregates
3. Use realistic e-commerce scenarios (sales analysis, customer metrics, product performance)
4. Reference actual column names and data types (total_amount, price, quantity, etc.)
5. Include the expected difficulty level: INTERMEDIATE
6. Provide a brief hint about grouping strategy and which aggregates to use

Format: Provide only the challenge question and context, no solution.`,
  },
  subqueries: {
    advanced: `Generate a SQL challenge for an advanced level focusing on subqueries. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Nested SELECT statements (correlated or non-correlated subqueries)
- EXISTS, IN, or comparison operators with subqueries
- Complex business logic requiring multi-step data retrieval
- Use actual data values and relationships from the schema

The challenge should:
1. Have a clear, specific business question requiring advanced SQL thinking
2. Require nested queries to solve complex business problems
3. Use realistic e-commerce scenarios (customer analysis, product comparisons, order patterns)
4. Reference actual column names, relationships, and data types
5. Include the expected difficulty level: ADVANCED
6. Provide a brief hint about the subquery approach (EXISTS, IN, correlated, etc.)

Format: Provide only the challenge question and context, no solution.`,
  },
  "basic-window-functions": {
    beginner: `Generate a SQL challenge for a beginner level focusing on very basic window functions. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Only ROW_NUMBER() window function (the simplest to understand)
- Simple ORDER BY clause (no PARTITION BY needed)
- Straightforward numbering of rows in a result set
- Clear, easy-to-understand business scenarios

The challenge should:
1. Have a very clear, simple business question that requires numbering rows
2. Use only ROW_NUMBER() to assign sequential numbers to rows
3. Use realistic but simple e-commerce scenarios (listing products, customers, or orders in order)
4. Reference actual column names from the schema (name, total_amount, order_date, etc.)
5. Include the expected difficulty level: BEGINNER
6. Provide a clear hint that ROW_NUMBER() is needed to number the rows

Focus on very simple scenarios like:
- Number all products by price (highest to lowest)
- Assign row numbers to customers by their last name alphabetically
- Number orders by date (most recent first)
- List cities numbered by population size

Keep it simple - no partitioning, no complex logic, just basic row numbering.

Format: Provide only the challenge question and context, no solution.`,
  },
  "window-functions": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on basic window functions. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Basic window functions (ROW_NUMBER, RANK, DENSE_RANK)
- Simple PARTITION BY and ORDER BY clauses
- Ranking customers, products, or orders within categories
- Straightforward analytical queries for business insights

The challenge should:
1. Have a clear, specific business question requiring basic ranking or numbering
2. Require simple window functions to solve ranking problems (top customers, best-selling products, recent orders)
3. Use realistic e-commerce scenarios that are easy to understand
4. Reference actual column names and data types (total_amount, price, order_date, etc.)
5. Include the expected difficulty level: INTERMEDIATE
6. Provide a brief hint about which basic window function to use (ROW_NUMBER or RANK)

Focus on simple scenarios like:
- Ranking customers by total order value
- Finding the top 3 products in each category
- Numbering orders by date for each customer
- Ranking cities by population

Format: Provide only the challenge question and context, no solution.`,
  },
  "advanced-window-functions": {
    advanced: `Generate a SQL challenge for an advanced level focusing on complex window functions. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Advanced window functions (LAG, LEAD, SUM, AVG with window frames)
- Complex PARTITION BY and ORDER BY clauses with multiple columns
- Running totals, moving averages, or comparative analysis between rows
- Advanced analytical queries requiring sophisticated window function knowledge

The challenge should:
1. Have a clear, specific business question requiring advanced analytical thinking
2. Require complex window functions to solve time-series analysis, running calculations, or row comparisons
3. Use realistic e-commerce scenarios (sales trends over time, customer behavior patterns, performance comparisons)
4. Reference actual column names and data types (order_date, total_amount, price, etc.)
5. Include the expected difficulty level: ADVANCED
6. Provide a brief hint about which advanced window function to use and complex partitioning strategy

Focus on advanced scenarios like:
- Calculating running totals of sales over time
- Comparing current month sales to previous month (LAG/LEAD)
- Finding moving averages over specific time windows
- Calculating percentage of total within partitions

Format: Provide only the challenge question and context, no solution.`,
  },
  "ecommerce-analysis": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on e-commerce analysis. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Sales and revenue analysis using total_amount, price, quantity
- Customer behavior patterns across orders and products
- Product performance metrics by category or individual products
- Order fulfillment insights using order status ('pending', 'delivered', 'cancelled')
- Geographic analysis using countries and cities data

The challenge should:
1. Have a clear, specific e-commerce business question
2. Require joining multiple tables (orders, users, products, order_items)
3. Use realistic business scenarios (revenue analysis, customer insights, product performance)
4. Reference actual column names, order statuses, and product categories
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about the business goal and expected insights

Format: Provide only the challenge question and context, no solution.`,
  },
  "geographic-queries": {
    beginner: `Generate a SQL challenge for a beginner level focusing on geographic queries. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Country and city data analysis using the countries and cities tables
- Geographic filtering and grouping by continent, country, or city
- Population-based queries using the population column in cities
- Simple geographic relationships between users, cities, and countries

The challenge should:
1. Have a clear, specific question about geographic data
2. Be solvable with basic to intermediate SQL (SELECT, WHERE, JOIN, GROUP BY)
3. Use realistic geographic scenarios (population analysis, user distribution, regional insights)
4. Reference actual column names (continent, population, country_id, city_id)
5. Include the expected difficulty level: BEGINNER
6. Provide context about the geographic aspect and expected results

Format: Provide only the challenge question and context, no solution.`,
  },
  "data-modification": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on data modification. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- INSERT statements with proper data types (TEXT, INTEGER, DECIMAL(10,2), DATE)
- UPDATE operations with realistic conditions and value changes
- DELETE operations with safety considerations and proper WHERE clauses
- Consider foreign key relationships and data integrity

The challenge should:
1. Have a clear, specific business scenario requiring data changes
2. Require understanding of data types and constraints
3. Use realistic data modification scenarios (updating order status, adding products, user management)
4. Reference actual column names, data types, and relationships
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about the business need for data changes and safety considerations

Format: Provide only the challenge question and context, no solution.`,
  },
  "performance-optimization": {
    advanced: `Generate a SQL challenge for an advanced level focusing on performance optimization. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Query optimization techniques for Supabase/PostgreSQL
- Index recommendations for improving query performance
- Efficient JOIN strategies and query structure
- Performance considerations for large datasets

The challenge should:
1. Present a realistic performance problem scenario
2. Require advanced SQL optimization knowledge for PostgreSQL/Supabase
3. Use realistic performance scenarios (slow queries, large table joins, complex aggregations)
4. Reference actual table structures and relationships
5. Include the expected difficulty level: ADVANCED
6. Provide context about performance requirements and expected improvements

Format: Provide only the challenge question and context, no solution.`,
  },
  "date-time-queries": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on date and time analysis. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Date functions and calculations using order_date, estimated_delivery, delivery_date
- Time series analysis of orders over time (2 years of historical data)
- Date range filtering and temporal data aggregation
- Delivery performance analysis (early, on-time, late deliveries)

The challenge should:
1. Have a clear, time-based business question
2. Require understanding of PostgreSQL date/time functions
3. Use realistic temporal scenarios (order trends, delivery performance, seasonal analysis)
4. Reference actual date columns and their relationships
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about the time-based analysis and business insights

Note: order_date ranges from 2 years ago to today, estimated_delivery is 3-14 days after order_date, delivery_date exists only for delivered orders.

Format: Provide only the challenge question and context, no solution.`,
  },
  "string-manipulation": {
    beginner: `Generate a SQL challenge for a beginner level focusing on string manipulation. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- String functions (CONCAT, SUBSTRING, LENGTH, UPPER, LOWER, etc.)
- Pattern matching with LIKE and ILIKE (PostgreSQL case-insensitive)
- String cleaning and formatting of names, emails, or product descriptions
- Text processing on actual data fields (first_name, last_name, email, product names)

The challenge should:
1. Have a clear, specific question about text processing
2. Be solvable with basic PostgreSQL string functions
3. Use realistic text processing scenarios (name formatting, email validation, product search)
4. Reference actual text columns (first_name, last_name, email, name, description)
5. Include the expected difficulty level: BEGINNER
6. Provide context about the string manipulation need and expected output format

Format: Provide only the challenge question and context, no solution.`,
  },
  "conditional-logic": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on conditional logic. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- CASE statements for conditional logic based on actual data values
- IF/THEN logic implementation using order status ('pending', 'delivered', 'cancelled')
- Nested conditions and complex business rules
- Logical operators (AND, OR, NOT) with realistic conditions

The challenge should:
1. Have a clear business logic requirement
2. Require understanding of CASE statements and conditional expressions
3. Use realistic business rule scenarios (order categorization, customer segmentation, product classification)
4. Reference actual column values and business logic
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about the business logic and expected categorization

Format: Provide only the challenge question and context, no solution.`,
  },
  "data-quality": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on data quality and validation. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- NULL value handling and detection in delivery_date, estimated_delivery
- Data validation rules for email format, price ranges, quantity values
- Data consistency checks across related tables
- Identifying data anomalies or inconsistencies

The challenge should:
1. Present a realistic data quality problem
2. Require understanding of NULL handling and data validation techniques
3. Use realistic data quality scenarios (missing delivery dates, invalid emails, price inconsistencies)
4. Reference actual column constraints and relationships
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about data quality requirements and business impact

Format: Provide only the challenge question and context, no solution.`,
  },
  "reporting-analytics": {
    advanced: `Generate a SQL challenge for an advanced level focusing on reporting and analytics. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Complex business reports combining multiple tables and metrics
- KPI calculations (revenue, conversion rates, customer lifetime value)
- Multi-dimensional analysis (by geography, product category, time period)
- Advanced analytical functions and business intelligence queries

The challenge should:
1. Present a comprehensive reporting requirement for business stakeholders
2. Require advanced analytical thinking and complex SQL
3. Use realistic business intelligence scenarios (executive dashboards, performance reports, trend analysis)
4. Reference actual business metrics and data relationships
5. Include the expected difficulty level: ADVANCED
6. Provide context about the business reporting need and stakeholder requirements

Format: Provide only the challenge question and context, no solution.`,
  },
  "complex-business-logic": {
    advanced: `Generate a SQL challenge for an advanced level focusing on complex business logic. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Multi-step calculations using order amounts, quantities, and prices
- Complex business rule implementation (customer tiers, product recommendations, order prioritization)
- Hierarchical data processing using geographic relationships
- Advanced logical operations combining multiple business conditions

The challenge should:
1. Present a complex business scenario requiring sophisticated SQL logic
2. Require advanced SQL problem-solving skills and business understanding
3. Use realistic enterprise-level scenarios (customer segmentation, inventory management, pricing strategies)
4. Reference actual business relationships and data constraints
5. Include the expected difficulty level: ADVANCED
6. Provide context about the complex business requirements and expected outcomes

Format: Provide only the challenge question and context, no solution.`,
  },
  "delivery-analysis": {
    intermediate: `Generate a SQL challenge for an intermediate level focusing on delivery and order status analysis. Use this Supabase PostgreSQL database schema:

${databaseSchema}

Create a challenge that involves:
- Order status tracking using the 3 specific statuses: 'pending', 'delivered', 'cancelled'
- Delivery performance analysis comparing estimated_delivery vs delivery_date
- Date calculations between order_date, estimated_delivery, and delivery_date
- Order fulfillment metrics and delivery trends over time

The challenge should:
1. Present a realistic delivery/logistics scenario
2. Require understanding of date functions and NULL handling for delivery dates
3. Use meaningful business questions about order fulfillment and delivery performance
4. Reference the specific order status values and date column relationships
5. Include the expected difficulty level: INTERMEDIATE
6. Provide context about delivery performance goals and business metrics

Important: 
- Pending orders have estimated_delivery but delivery_date is NULL
- Delivered orders have both estimated_delivery and delivery_date filled
- Cancelled orders have both delivery dates as NULL
- Delivery can be early (delivery_date < estimated_delivery) or late (delivery_date > estimated_delivery)

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
