# ExerciseCard Component

## Overview

The `ExerciseCard` is a React component designed for displaying SQL exercises or coding challenges in a card format. It shows exercise details, difficulty levels, and provides interaction capabilities for educational applications.

## Features

- **Exercise Information**: Displays title, description, and SQL query
- **Difficulty Levels**: Visual difficulty indicators with color coding
- **Interactive Selection**: Click-to-select functionality with visual feedback
- **Query Preview**: Shows the SQL query in a formatted code block
- **Active State**: Visual indication when an exercise is currently selected
- **Action Button**: Dedicated "Try it" button for exercise execution

## Props Interface

```typescript
interface ExerciseCardProps {
  title: string; // Exercise title
  description: string; // Exercise description
  difficulty: DifficultyLevel; // Difficulty level
  query: string; // SQL query for the exercise
  onSelect: (query: string) => void; // Callback when exercise is selected
  isActive?: boolean; // Whether this exercise is currently active
  className?: string; // Optional CSS classes
}

type DifficultyLevel = "beginner" | "intermediate" | "advanced";
```

## Usage Example

```tsx
import { ExerciseCard } from "@/components/ui/custom/exercise-card";
import { useState } from "react";

function ExerciseList() {
  const [activeQuery, setActiveQuery] = useState<string>("");

  const exercises = [
    {
      title: "Basic SELECT Query",
      description: "Learn how to select all columns from a table",
      difficulty: "beginner" as const,
      query: "SELECT * FROM users;",
    },
    {
      title: "JOIN Operations",
      description: "Practice joining multiple tables together",
      difficulty: "intermediate" as const,
      query:
        "SELECT u.name, p.title FROM users u JOIN posts p ON u.id = p.user_id;",
    },
    {
      title: "Complex Aggregations",
      description: "Advanced grouping and aggregation functions",
      difficulty: "advanced" as const,
      query:
        "SELECT category, COUNT(*), AVG(price) FROM products GROUP BY category HAVING COUNT(*) > 5;",
    },
  ];

  const handleExerciseSelect = (query: string) => {
    setActiveQuery(query);
    // Load query into editor or execute it
    console.log("Selected query:", query);
  };

  return (
    <div className="grid gap-4">
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          title={exercise.title}
          description={exercise.description}
          difficulty={exercise.difficulty}
          query={exercise.query}
          onSelect={handleExerciseSelect}
          isActive={activeQuery === exercise.query}
        />
      ))}
    </div>
  );
}
```

## Difficulty Level Styling

The component uses color-coded badges for different difficulty levels:

```typescript
const difficultyColors = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
  intermediate: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  advanced:
    "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
};
```

- **Beginner**: Green color scheme
- **Intermediate**: Blue color scheme
- **Advanced**: Purple color scheme

## Visual States

### Default State

- Clean card layout with hover effects
- Subtle shadow on hover
- Clickable with cursor pointer

### Active State

- Ring border with primary color
- Enhanced shadow
- Visual indication of selection

### Interactive Elements

- **Card Click**: Selects the entire exercise
- **Try it Button**: Alternative selection method with play icon
- **Hover Effects**: Smooth transitions and visual feedback

## Card Structure

1. **Header Section**:

   - Exercise title
   - Difficulty badge (top-right)
   - Exercise description

2. **Content Section**:

   - SQL query in formatted code block
   - Monospace font for code readability
   - Muted background for code area

3. **Footer Section**:
   - "Try it" button with play icon
   - Right-aligned for consistent layout

## Key Components Used

- **Card Components**: CardHeader, CardContent, CardFooter from layout
- **Badge**: For difficulty level display
- **Button**: For the "Try it" action
- **PlayIcon**: From Lucide React for visual cue

## Styling Features

- **Responsive Design**: Works on different screen sizes
- **Dark Mode Support**: Proper color schemes for both themes
- **Typography**: Appropriate font sizes and weights
- **Spacing**: Consistent padding and margins
- **Transitions**: Smooth hover and state changes

## Event Handling

- **Click Events**: Both card and button trigger selection
- **Event Propagation**: Button click prevents card click bubbling
- **Callback Pattern**: Uses function callbacks for parent communication

## Use Cases

- SQL learning platforms
- Coding exercise libraries
- Interactive tutorials
- Programming challenges
- Educational content management

## Accessibility

- Proper semantic HTML structure
- Keyboard navigation support
- Screen reader friendly
- Clear visual hierarchy
- Appropriate contrast ratios

## Customization Options

- Custom CSS classes through className prop
- Flexible difficulty level system
- Configurable selection behavior
- Extensible card content structure
