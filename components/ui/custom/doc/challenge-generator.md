# Challenge Generator

An AI-powered SQL challenge generation system that provides curated prompts for creating custom SQL exercises. Built as a modal dialog component with a comprehensive library of challenge types across different difficulty levels, specifically designed for **Supabase PostgreSQL** databases.

## Features

- **17 Challenge Types**: Comprehensive coverage of SQL concepts from basic queries to advanced analytics
- **3 Difficulty Levels**: Beginner, Intermediate, and Advanced challenges with color-coded badges
- **Supabase-Specific**: Prompts tailored for Supabase PostgreSQL with actual schema details
- **Realistic Data Specifications**: Includes exact order statuses, product categories, and data constraints
- **Search & Filter**: Real-time search and difficulty-based filtering of challenge types
- **Smart Sorting**: Challenges sorted by difficulty first, then alphabetically
- **AI-Ready Prompts**: Pre-written, detailed prompts optimized for AI assistants (ChatGPT, Claude, etc.)
- **Large Modal Interface**: Fixed viewport sizing (95vw × 90vh) with proper scrolling and responsive design
- **One-Click Copy**: Copy prompts to clipboard with success notifications
- **Complete Database Context**: All prompts include the full Supabase schema with data specifications

## Installation

The component uses existing UI components from the project:

```bash
# Required dependencies (already included in project)
npm install @radix-ui/react-dialog lucide-react
```

## Basic Usage

```tsx
import { ChallengeGenerator } from "@/components/ui/custom/challenge-generator";
import { Button } from "@/components/ui/inputs/button";
import { Sparkles } from "lucide-react";

export function MyComponent() {
  return (
    <ChallengeGenerator>
      <Button variant="outline" className="gap-2">
        <Sparkles size={16} />
        Generate Challenges
      </Button>
    </ChallengeGenerator>
  );
}
```

## Challenge Types

### Beginner Level (3 types)

- **Basic Queries**: Simple SELECT statements with specific columns and realistic filtering
- **Geographic Queries**: Country, city, and location-based analysis with population data
- **String Manipulation**: Text processing using PostgreSQL functions (CONCAT, ILIKE, etc.)

### Intermediate Level (9 types)

- **Table Joins**: INNER, LEFT, RIGHT joins with proper foreign key relationships
- **Aggregations**: GROUP BY with business metrics using actual column names
- **E-commerce Analysis**: Sales analysis using total_amount, price, quantity columns
- **Data Modification**: INSERT, UPDATE, DELETE with proper PostgreSQL data types
- **Date & Time Analysis**: Temporal queries using order_date, estimated_delivery, delivery_date
- **Conditional Logic**: CASE statements with actual order statuses and business rules
- **Data Quality & Validation**: NULL handling and validation with realistic scenarios
- **Delivery & Order Status**: Analysis using the 3 specific order statuses

### Advanced Level (5 types)

- **Subqueries**: Complex nested queries with actual data relationships
- **Window Functions**: Advanced analytics with proper partitioning strategies
- **Performance & Optimization**: Supabase/PostgreSQL-specific optimization techniques
- **Reporting & Analytics**: Business intelligence queries with real metrics
- **Complex Business Logic**: Multi-step calculations with enterprise scenarios

## Supabase Database Schema

All prompts include this comprehensive e-commerce database schema with **exact specifications**:

```sql
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
```

## Data Specifications

### Order Status Values (ONLY these 3 exist)

- **`'pending'`** - Orders not yet delivered (has estimated_delivery, delivery_date is NULL)
- **`'delivered'`** - Completed orders (has both estimated_delivery and delivery_date)
- **`'cancelled'`** - Cancelled orders (both estimated_delivery and delivery_date are NULL)

### Product Categories (16 available)

Electronics, Clothing, Home & Garden, Sports, Kitchen, Books, Health & Beauty, Toys, Automotive, Office Supplies, Pet Supplies, Jewelry, Music, Movies, Games, Food & Beverages

### Date Ranges

- **order_date**: Ranges from 2 years ago to today (never future dates)
- **estimated_delivery**: 3-14 days after order_date
- **delivery_date**: Can be early (-2 days) to late (+5 days) from estimated_delivery, only for delivered orders

### Geographic Data

- **Countries**: 25-30 real countries with proper codes (US, UK, FR, DE, JP, AU, BR, CA, IN, CN, etc.)
- **Cities**: 50-100 real cities with actual population data
- **Users**: Realistic names with unique email addresses
- **Products**: Generated names like "Premium Laptop Pro", "Wireless Headphones Ultra", etc.

### Technical Specifications

- **Database Platform**: Supabase (PostgreSQL)
- **Query Execution**: Use `run_query()` function for custom queries
- **Data Types**: SERIAL (auto-increment), TEXT, INTEGER, DECIMAL(10,2), DATE
- **Relationships**: Proper foreign key constraints between all related tables

## Component Architecture

### Props

```tsx
interface ChallengeGeneratorProps {
  children: React.ReactNode; // Trigger element (usually a button)
}
```

### Key Features

- **Modal Dialog**: Large (95vw × 90vh) modal optimized for big screens
- **Search Functionality**: Real-time search across challenge titles and descriptions
- **Difficulty Filtering**: Filter challenges by beginner, intermediate, or advanced levels
- **Smart Sorting**: Automatic sorting by difficulty level, then alphabetically
- **Dismissible**: ESC key and click outside to close
- **Responsive Layout**: Two-column layout with sidebar and content area
- **Scrollable Content**: Proper scroll handling for long prompts
- **Toast Notifications**: Success messages when prompts are copied

## Usage Workflow

1. **Click Trigger**: User clicks the "Generate Challenges" button
2. **Search & Filter**: Use the search bar and difficulty filter to find specific challenge types
3. **Browse Challenges**: Challenges are automatically sorted by difficulty, then alphabetically
4. **Select Type**: Choose from the filtered challenge types in the left sidebar
5. **View Prompt**: Detailed AI prompt appears with complete Supabase schema and data specs
6. **Copy Prompt**: One-click copy to clipboard with success notification
7. **Use with AI**: Paste into ChatGPT, Claude, or other AI assistants
8. **Get Challenge**: AI generates a unique SQL challenge based on the specific database structure

## Styling & Theming

The component uses the project's design system:

- **Color-coded Badges**: Green (Beginner), Blue (Intermediate), Purple (Advanced)
- **Consistent Icons**: Lucide React icons for visual identification
- **Theme Support**: Works with light/dark mode via CSS variables
- **Responsive Design**: Adapts to different screen sizes

## AI Prompt Structure

Each prompt includes:

1. **Platform Specification**: "Supabase PostgreSQL database schema"
2. **Complete Schema**: Full table definitions with exact data types
3. **Data Specifications**: Exact order statuses, product categories, date ranges
4. **Challenge Requirements**: Specific SQL concepts and realistic conditions
5. **Quality Guidelines**: 6-point checklist for generating good challenges
6. **Format Specification**: Request for question only, no solution
7. **Business Context**: Realistic e-commerce scenarios with actual data constraints

## Example Prompt Features

### Specific Data Values

- Order statuses: `'pending'`, `'delivered'`, `'cancelled'` (not "confirmed" or other values)
- Product categories: Exact 16 categories listed
- Date constraints: 2 years historical data, no future order dates

### PostgreSQL-Specific Functions

- `ILIKE` for case-insensitive pattern matching
- `SERIAL` data type for auto-increment
- `DECIMAL(10,2)` for precise monetary values
- PostgreSQL date/time functions

### Realistic Business Logic

- Delivery performance analysis (early/on-time/late)
- NULL handling for delivery dates based on order status
- Geographic analysis with actual population data
- Revenue calculations with proper decimal precision

## Best Practices

- **Use Appropriate Difficulty**: Match challenge type to user's skill level
- **Copy Full Prompt**: Don't modify the prompts for best AI results
- **Specify Supabase**: AI will generate PostgreSQL-compatible queries
- **Reference Actual Data**: Challenges will use realistic order statuses and categories
- **Test Challenges**: Verify generated challenges work with your actual database structure

## Integration Example

```tsx
// In your header component
<div className="flex-1 flex justify-center">
  <ChallengeGenerator>
    <Button variant="outline" className="gap-2">
      <Sparkles size={16} />
      Generate Challenges
    </Button>
  </ChallengeGenerator>
</div>
```

## Dependencies

- `@radix-ui/react-dialog`: Modal dialog functionality
- `lucide-react`: Icons for challenge types and UI
- `@/hooks/use-toast`: Toast notifications for copy feedback
- `@/lib/utils`: Utility functions for styling

## Accessibility

- **Keyboard Navigation**: Full keyboard support with tab navigation
- **Screen Reader Support**: Proper ARIA labels and descriptions
- **Focus Management**: Automatic focus trapping within modal
- **Escape Key**: Close modal with escape key

## What's New in This Version

### Supabase-Specific Enhancements

- **Exact Schema Match**: Prompts now match your actual database structure
- **Realistic Data Constraints**: AI won't suggest non-existent order statuses like "confirmed"
- **PostgreSQL Functions**: Prompts reference PostgreSQL-specific functions (ILIKE, SERIAL, etc.)
- **Proper Data Types**: Exact data type specifications (DECIMAL(10,2), INTEGER, TEXT)

### Improved Business Context

- **Actual Order Statuses**: Only 'pending', 'delivered', 'cancelled'
- **Real Product Categories**: 16 specific categories from your data generation
- **Accurate Date Logic**: 2-year historical data, proper delivery date handling
- **Geographic Realism**: Real countries and cities with population data

### Better AI Prompts

- **More Specific Instructions**: Detailed requirements for each challenge type
- **Business Logic Clarity**: Clear explanation of order status and delivery date relationships
- **Platform Context**: AI knows it's generating for Supabase PostgreSQL
- **Data Validation**: Prompts include actual constraints and validation rules

The Challenge Generator now provides highly accurate, database-specific prompts that will generate realistic SQL challenges perfectly suited to your Supabase e-commerce database structure.
