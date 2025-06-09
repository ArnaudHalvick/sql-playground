# SqlEditor Component

## Overview

The `SqlEditor` is a React component that provides a code editor specifically designed for writing and executing SQL queries. It features syntax highlighting, theme support, execution controls, and a resizable interface for better usability with large queries.

## Features

- **SQL Syntax Highlighting**: Built-in SQL language support with proper syntax coloring
- **Theme Support**: Automatically switches between light and dark themes
- **Code Execution**: Run button to execute SQL queries
- **Query Reset**: Reset button to restore default or clear current query
- **Real-time Changes**: Optional callback for query changes
- **Execution State**: Visual feedback during query execution
- **Resizable Interface**: Drag handle to adjust editor height for large queries
- **Height Constraints**: Configurable minimum and maximum height limits
- **Responsive Design**: Adaptive layout with proper styling

## Props Interface

```typescript
interface SqlEditorProps {
  defaultValue?: string; // Default SQL query (default: "SELECT * FROM users LIMIT 10;")
  onExecute: (query: string) => void; // Required callback when query is executed
  onChange?: (query: string) => void; // Optional callback for query changes
  isExecuting: boolean; // Whether query is currently executing
  className?: string; // Optional CSS classes
  resetQuery?: () => void; // Optional custom reset function
  minHeight?: number; // Minimum editor height in pixels (default: 150)
  maxHeight?: number; // Maximum editor height in pixels (default: 600)
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
      minHeight={200}
      maxHeight={800}
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

- **Code Editor**: Resizable height (default 200px) with syntax highlighting
- **Resize Handle**: Draggable grip at the bottom of the editor for height adjustment
- **Control Buttons**:
  - Reset button (left) with rotate icon
  - Run Query button (right) with play icon
- **Height Indicator**: Shows current editor height in pixels
- **Button States**:
  - Run button disabled during execution or when query is empty
  - Visual feedback for execution state

## Resizing Functionality

- **Drag to Resize**: Users can drag the grip handle at the bottom to adjust editor height
- **Height Constraints**: Respects minimum and maximum height limits
- **Visual Feedback**: Hover effects and cursor changes during resize operations
- **Smooth Interaction**: Real-time height updates while dragging
- **Height Display**: Current height shown next to the Run Query button

## Theme Integration

- Automatically detects system/app theme using `next-themes`
- Switches between Dracula (dark) and Xcode Light themes
- Seamless theme transitions

## State Management

- Internal state for current query value and editor height
- Syncs with external state through callbacks
- Preserves query content and height during theme changes
- Resets to default value when reset is triggered
- Maintains resize state during drag operations

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
- Hover effects for interactive elements

## Error Handling

- Gracefully handles empty queries (disables execution)
- Prevents execution during ongoing operations
- Maintains editor state during errors
- Proper cleanup of event listeners

## Use Cases

- SQL learning platforms with varying query sizes
- Database query tools requiring flexible editor space
- Interactive SQL tutorials with complex queries
- Database administration interfaces
- Code playground applications

## Customization Options

- Custom default queries
- Custom reset behavior
- Configurable height constraints
- Flexible styling through className
- Configurable execution handling
- Optional change tracking

## Accessibility

- Proper cursor indicators during resize operations
- Keyboard navigation support through CodeMirror
- Screen reader compatible
- Focus management during interactions
