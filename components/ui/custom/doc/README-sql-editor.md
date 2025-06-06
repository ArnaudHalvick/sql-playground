# SqlEditor Component

## Overview

The `SqlEditor` is a React component that provides a code editor specifically designed for writing and executing SQL queries. It features syntax highlighting, theme support, and execution controls.

## Features

- **SQL Syntax Highlighting**: Built-in SQL language support with proper syntax coloring
- **Theme Support**: Automatically switches between light and dark themes
- **Code Execution**: Run button to execute SQL queries
- **Query Reset**: Reset button to restore default or clear current query
- **Real-time Changes**: Optional callback for query changes
- **Execution State**: Visual feedback during query execution
- **Responsive Design**: Fixed height with proper styling

## Props Interface

```typescript
interface SqlEditorProps {
  defaultValue?: string; // Default SQL query (default: "SELECT * FROM users LIMIT 10;")
  onExecute: (query: string) => void; // Required callback when query is executed
  onChange?: (query: string) => void; // Optional callback for query changes
  isExecuting: boolean; // Whether query is currently executing
  className?: string; // Optional CSS classes
  resetQuery?: () => void; // Optional custom reset function
}
```

## Usage Example

```tsx
import { SqlEditor } from "@/components/ui/custom/sql-editor";
import { useState } from "react";

function MyComponent() {
  const [isExecuting, setIsExecuting] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");

  const handleExecute = async (query: string) => {
    setIsExecuting(true);
    try {
      // Execute your SQL query here
      console.log("Executing query:", query);
      // await executeQuery(query);
    } catch (error) {
      console.error("Query execution failed:", error);
    } finally {
      setIsExecuting(false);
    }
  };

  const handleQueryChange = (query: string) => {
    setCurrentQuery(query);
  };

  const handleReset = () => {
    setCurrentQuery("SELECT * FROM users LIMIT 10;");
  };

  return (
    <SqlEditor
      defaultValue="SELECT * FROM users LIMIT 10;"
      onExecute={handleExecute}
      onChange={handleQueryChange}
      isExecuting={isExecuting}
      resetQuery={handleReset}
      className="w-full"
    />
  );
}
```

## Key Dependencies

- **CodeMirror**: `@uiw/react-codemirror` for the code editor
- **SQL Language Support**: `@codemirror/lang-sql` for syntax highlighting
- **Themes**:
  - `@uiw/codemirror-theme-dracula` for dark mode
  - `@uiw/codemirror-theme-xcode` for light mode
- **Theme Detection**: `next-themes` for automatic theme switching

## Visual Elements

- **Code Editor**: 200px height with syntax highlighting
- **Control Buttons**:
  - Reset button (left) with rotate icon
  - Run Query button (right) with play icon
- **Button States**:
  - Run button disabled during execution or when query is empty
  - Visual feedback for execution state

## Theme Integration

- Automatically detects system/app theme using `next-themes`
- Switches between Dracula (dark) and Xcode Light themes
- Seamless theme transitions

## State Management

- Internal state for current query value
- Syncs with external state through callbacks
- Preserves query content during theme changes
- Resets to default value when reset is triggered

## Keyboard Shortcuts

- Standard CodeMirror shortcuts available
- Tab for indentation
- Ctrl/Cmd + A for select all
- Standard copy/paste functionality

## Styling

- Uses Tailwind CSS for layout and spacing
- Rounded borders with proper visual hierarchy
- Responsive button layout
- Consistent spacing and typography

## Error Handling

- Gracefully handles empty queries (disables execution)
- Prevents execution during ongoing operations
- Maintains editor state during errors

## Use Cases

- SQL learning platforms
- Database query tools
- Interactive SQL tutorials
- Database administration interfaces
- Code playground applications

## Customization Options

- Custom default queries
- Custom reset behavior
- Flexible styling through className
- Configurable execution handling
- Optional change tracking
