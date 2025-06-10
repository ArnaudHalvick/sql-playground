# Challenge Generator

An AI-powered SQL challenge generation system that provides curated prompts for creating custom SQL exercises. Built as a modal dialog component with a comprehensive library of challenge types across different difficulty levels.

## Features

- **16 Challenge Types**: Comprehensive coverage of SQL concepts from basic queries to advanced analytics
- **3 Difficulty Levels**: Beginner, Intermediate, and Advanced challenges with color-coded badges
- **Search & Filter**: Real-time search and difficulty-based filtering of challenge types
- **Smart Sorting**: Challenges sorted by difficulty first, then alphabetically
- **AI-Ready Prompts**: Pre-written, detailed prompts optimized for AI assistants (ChatGPT, Claude, etc.)
- **Large Modal Interface**: Fixed viewport sizing (95vw × 90vh) with proper scrolling and responsive design
- **One-Click Copy**: Copy prompts to clipboard with success notifications
- **Database Schema Integration**: All prompts include the complete database schema for context

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

### Beginner Level (4 types)

- **Basic Queries**: Simple SELECT statements and filtering
- **Geographic Queries**: Country, city, and location-based analysis
- **String Manipulation**: Text processing, pattern matching, and string functions

### Intermediate Level (8 types)

- **Table Joins**: INNER, LEFT, RIGHT, and FULL OUTER joins
- **Aggregations**: GROUP BY, COUNT, SUM, AVG, and HAVING
- **E-commerce Analysis**: Sales, orders, and customer behavior analysis
- **Data Modification**: INSERT, UPDATE, DELETE, and UPSERT operations
- **Date & Time Analysis**: Date functions, time series, and temporal queries
- **Conditional Logic**: CASE statements, IF conditions, and logical operations
- **Data Quality & Validation**: NULL handling, data validation, and cleansing

### Advanced Level (5 types)

- **Subqueries**: Nested queries and correlated subqueries
- **Window Functions**: ROW_NUMBER, RANK, LAG, LEAD, and partitioning
- **Performance & Optimization**: Query optimization, indexes, and execution plans
- **Reporting & Analytics**: Business reports, KPIs, and analytical queries
- **Complex Business Logic**: Multi-step calculations and business rule implementation

## Database Schema

All prompts include this comprehensive e-commerce database schema:

```sql
-- Products, Orders, Users, Cities, Countries tables
-- with proper relationships and foreign keys
-- Realistic data structure for meaningful challenges
```

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
5. **View Prompt**: Detailed AI prompt appears in the right content area
6. **Copy Prompt**: One-click copy to clipboard with success notification
7. **Use with AI**: Paste into ChatGPT, Claude, or other AI assistants
8. **Get Challenge**: AI generates a unique SQL challenge based on the prompt

## Styling & Theming

The component uses the project's design system:

- **Color-coded Badges**: Green (Beginner), Blue (Intermediate), Purple (Advanced)
- **Consistent Icons**: Lucide React icons for visual identification
- **Theme Support**: Works with light/dark mode via CSS variables
- **Responsive Design**: Adapts to different screen sizes

## AI Prompt Structure

Each prompt includes:

1. **Clear Instructions**: Specific difficulty level and focus area
2. **Database Schema**: Complete table structure and relationships
3. **Challenge Requirements**: What SQL concepts to include
4. **Quality Guidelines**: 5-point checklist for good challenges
5. **Format Specification**: Request for question only, no solution

## Best Practices

- **Use Appropriate Difficulty**: Match challenge type to user's skill level
- **Copy Full Prompt**: Don't modify the prompts for best AI results
- **Iterate if Needed**: Generate multiple challenges for variety
- **Test Challenges**: Verify generated challenges work with your database

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

The Challenge Generator provides a comprehensive solution for creating diverse, AI-generated SQL challenges tailored to different skill levels and learning objectives.
