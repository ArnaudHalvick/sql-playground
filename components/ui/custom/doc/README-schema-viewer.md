# SchemaViewer Component

## Overview

The `SchemaViewer` is a React component that displays database schema information in an interactive, collapsible format. It's designed for SQL learning applications where users need to understand database structure.

## Features

- **Interactive Schema Display**: Shows database tables with expandable/collapsible sections
- **Column Information**: Displays column names, data types, primary keys, and foreign key relationships
- **Visual Indicators**: Uses icons to highlight primary keys and foreign key relationships
- **Clickable Tables**: Optional callback for table selection
- **External Schema Link**: Button to view full schema diagram
- **Responsive Design**: Scrollable area with proper spacing

## Props Interface

```typescript
interface SchemaViewerProps {
  tables: SchemaTable[]; // Array of database tables
  onTableClick?: (tableName: string) => void; // Optional callback when table is clicked
  className?: string; // Optional CSS classes
}

interface SchemaTable {
  name: string; // Table name
  columns: TableColumn[]; // Array of table columns
}

interface TableColumn {
  name: string; // Column name
  type: string; // Data type (e.g., 'VARCHAR', 'INTEGER')
  isPrimary: boolean; // Whether this is a primary key
  isForeign: boolean; // Whether this is a foreign key
  references?: string; // Referenced table (if foreign key)
}
```

## Usage Example

```tsx
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";

const sampleTables = [
  {
    name: "users",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true, isForeign: false },
      { name: "email", type: "VARCHAR", isPrimary: false, isForeign: false },
      {
        name: "created_at",
        type: "TIMESTAMP",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
  {
    name: "posts",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true, isForeign: false },
      {
        name: "user_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "users.id",
      },
      { name: "title", type: "VARCHAR", isPrimary: false, isForeign: false },
    ],
  },
];

function MyComponent() {
  const handleTableClick = (tableName: string) => {
    console.log(`Selected table: ${tableName}`);
  };

  return (
    <SchemaViewer
      tables={sampleTables}
      onTableClick={handleTableClick}
      className="h-96"
    />
  );
}
```

## Key Components Used

- **Accordion**: For expandable table sections
- **Badge**: To display column data types
- **Button**: For external schema link
- **ScrollArea**: For scrollable content
- **Icons**: DatabaseIcon, KeyIcon, ExternalLinkIcon from Lucide React

## Visual Elements

- **Primary Keys**: Displayed with a yellow key icon
- **Foreign Keys**: Show reference relationships with arrow notation
- **Data Types**: Shown as small badges next to column names
- **Hover Effects**: Tables are clickable with hover states

## State Management

- Maintains expanded/collapsed state for each table
- Supports multiple tables being expanded simultaneously
- Preserves state during re-renders

## Styling

- Uses Tailwind CSS classes
- Responsive design with proper spacing
- Dark/light theme compatible
- Monospace font for table/column names

## Use Cases

- SQL learning applications
- Database documentation tools
- Schema exploration interfaces
- Educational database tools
