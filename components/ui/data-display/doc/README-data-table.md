# DataTable Component

## Overview

The `DataTable` component is a specialized table component designed for displaying query results and dynamic data. It provides built-in loading states, error handling, and proper formatting for database query results, making it ideal for SQL playground applications and data visualization tools.

## Features

- **Dynamic Data Display**: Renders any tabular data with flexible column structure
- **Loading States**: Built-in skeleton loading animation
- **Error Handling**: Displays formatted error messages with syntax highlighting
- **Null Value Handling**: Special formatting for NULL database values
- **Object Serialization**: Automatic JSON stringification for complex data types
- **Responsive Design**: Horizontal scrolling for wide datasets
- **Empty State**: User-friendly message when no data is available

## Props Interface

```typescript
interface DataTableProps {
  columns: string[]; // Array of column names
  rows: Record<string, any>[]; // Array of data rows
  isLoading: boolean; // Loading state indicator
  error?: string; // Optional error message
  className?: string; // Optional CSS classes
}
```

## Usage Examples

### Basic SQL Results Display

```tsx
import { DataTable } from "@/components/ui/data-display/data-table";
import { useState, useEffect } from "react";

function QueryResults() {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const executeQuery = async (query: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const response = await fetch("/api/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataTable
      columns={data.columns}
      rows={data.rows}
      isLoading={isLoading}
      error={error}
      className="h-96"
    />
  );
}
```

### User Management Table

```tsx
function UserManagement() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/users");
      const userData = await response.json();
      setUsers(userData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = ["id", "name", "email", "role", "created_at"];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <DataTable
        columns={columns}
        rows={users}
        isLoading={loading}
        className="border rounded-lg"
      />
    </div>
  );
}
```

### Analytics Dashboard

```tsx
function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    columns: ["date", "page_views", "unique_visitors", "bounce_rate"],
    rows: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const loadAnalytics = async (dateRange: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const query = `
        SELECT 
          DATE(created_at) as date,
          COUNT(*) as page_views,
          COUNT(DISTINCT user_id) as unique_visitors,
          ROUND(AVG(bounce_rate), 2) as bounce_rate
        FROM analytics 
        WHERE created_at >= NOW() - INTERVAL ${dateRange}
        GROUP BY DATE(created_at)
        ORDER BY date DESC
      `;

      // Execute query and update data
      const result = await executeAnalyticsQuery(query);
      setAnalyticsData(result);
    } catch (err) {
      setError(`Analytics query failed: ${err.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataTable
      columns={analyticsData.columns}
      rows={analyticsData.rows}
      isLoading={isLoading}
      error={error}
      className="min-h-[400px]"
    />
  );
}
```

## Data Handling Features

### NULL Value Display

The component automatically detects and formats NULL values:

```tsx
// NULL values are displayed as italicized "NULL" text
{
  row[column] === null ? (
    <span className="text-muted-foreground italic">NULL</span>
  ) : (
    String(row[column])
  );
}
```

### Object Serialization

Complex data types are automatically converted to JSON:

```tsx
// Objects and arrays are stringified for display
{
  typeof row[column] === "object"
    ? JSON.stringify(row[column])
    : String(row[column]);
}
```

### Error Display

Errors are shown in a dedicated error state with proper formatting:

```tsx
// Error state with destructive styling
<div className="bg-destructive/10 border border-destructive rounded-md p-4 text-destructive">
  <h3 className="font-semibold mb-1">Error</h3>
  <pre className="text-sm whitespace-pre-wrap">{error}</pre>
</div>
```

## Loading States

### Skeleton Loading

During loading, the component displays skeleton rows:

```tsx
// 5 skeleton rows with animated placeholders
{
  Array.from({ length: 5 }).map((_, rowIndex) => (
    <TableRow key={rowIndex}>
      {Array.from({ length: columns.length }).map((_, colIndex) => (
        <TableCell key={colIndex}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  ));
}
```

### Empty State

When no data is available:

```tsx
<TableRow>
  <TableCell
    colSpan={columns.length}
    className="text-center h-24 text-muted-foreground"
  >
    No results found
  </TableCell>
</TableRow>
```

## Styling Features

### Responsive Design

- **ScrollArea**: Horizontal scrolling for wide tables
- **Min Width**: Columns have minimum width of 100px
- **Flexible Height**: Adapts to container constraints

### Visual Hierarchy

- **Headers**: Clear column headers with proper spacing
- **Borders**: Consistent border styling
- **Hover Effects**: Row highlighting on hover
- **Typography**: Appropriate font sizes and weights

### Theme Integration

- **Color Scheme**: Uses design system colors
- **Dark Mode**: Proper contrast in both themes
- **Error States**: Destructive color palette for errors
- **Muted Text**: Subtle styling for NULL values

## Key Components Used

- **Table Components**: Table, TableHeader, TableBody, TableRow, TableCell
- **ScrollArea**: For responsive horizontal scrolling
- **Skeleton**: Loading state animations
- **Typography**: Consistent text styling

## Performance Considerations

### Efficient Rendering

- **Key Props**: Proper key assignment for React optimization
- **Conditional Rendering**: Only renders necessary elements
- **Memoization**: Consider wrapping in React.memo for large datasets

### Memory Management

- **Data Cleanup**: Clears data on unmount
- **Error Boundaries**: Graceful error handling
- **Loading States**: Prevents UI blocking during data fetch

## Common Use Cases

- **SQL Query Results**: Database query output display
- **API Response Tables**: REST API data visualization
- **Analytics Dashboards**: Metrics and KPI tables
- **Admin Panels**: User and content management
- **Data Export**: Tabular data for export functionality
- **Search Results**: Formatted search result display

## Integration Examples

### With SQL Editor

```tsx
function SQLPlayground() {
  const [queryResult, setQueryResult] = useState({ columns: [], rows: [] });
  const [isExecuting, setIsExecuting] = useState(false);
  const [error, setError] = useState<string>();

  const handleQueryExecution = async (query: string) => {
    setIsExecuting(true);
    setError(undefined);

    try {
      const result = await executeSQL(query);
      setQueryResult(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <SqlEditor onExecute={handleQueryExecution} isExecuting={isExecuting} />
      <DataTable
        columns={queryResult.columns}
        rows={queryResult.rows}
        isLoading={isExecuting}
        error={error}
      />
    </div>
  );
}
```

## Accessibility Features

- **Semantic HTML**: Proper table structure
- **Screen Reader Support**: Accessible table headers
- **Keyboard Navigation**: Tab navigation through content
- **Error Announcements**: Screen reader friendly error messages
