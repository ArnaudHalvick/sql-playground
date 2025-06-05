# Custom Components

This folder contains specialized components built for the SQL Playground application. These components are designed to work together to provide an interactive SQL learning and execution environment.

## Components Overview

### 🔧 SqlEditor

**File:** `sql-editor.tsx`

A sophisticated SQL code editor built with CodeMirror that provides syntax highlighting, theme support, and execution controls.

#### Features

- SQL syntax highlighting
- Dark/light theme support
- Query execution with loading states
- Reset functionality
- Responsive design

#### Props

```typescript
interface SqlEditorProps {
  defaultValue?: string; // Default SQL query (default: "SELECT * FROM users LIMIT 10;")
  onExecute: (query: string) => void; // Callback when query is executed
  onChange?: (query: string) => void; // Callback when query text changes
  isExecuting: boolean; // Loading state for execution button
  className?: string; // Additional CSS classes
  resetQuery?: () => void; // Custom reset function
}
```

#### Usage Example

```tsx
import { SqlEditor } from "@/components/ui/custom/sql-editor";

function QueryInterface() {
  const [isExecuting, setIsExecuting] = useState(false);

  const handleExecute = async (query: string) => {
    setIsExecuting(true);
    try {
      // Execute your SQL query
      await executeQuery(query);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <SqlEditor
      defaultValue="SELECT * FROM products WHERE price > 100;"
      onExecute={handleExecute}
      isExecuting={isExecuting}
      onChange={(query) => console.log("Query changed:", query)}
    />
  );
}
```

#### Dependencies

- `@uiw/react-codemirror` - CodeMirror React wrapper
- `@codemirror/lang-sql` - SQL language support
- `@uiw/codemirror-theme-dracula` - Dark theme
- `@uiw/codemirror-theme-xcode` - Light theme
- `next-themes` - Theme detection

---

### 📚 ExerciseCard

**File:** `exercise-card.tsx`

Interactive cards that display SQL exercises with difficulty levels, descriptions, and sample queries.

#### Features

- Difficulty level badges with color coding
- Interactive hover and selection states
- Query preview with syntax highlighting
- Click-to-select functionality

#### Props

```typescript
interface ExerciseCardProps {
  title: string; // Exercise title
  description: string; // Exercise description
  difficulty: DifficultyLevel; // "beginner" | "intermediate" | "advanced"
  query: string; // Sample SQL query
  onSelect: (query: string) => void; // Callback when exercise is selected
  isActive?: boolean; // Whether this card is currently active
  className?: string; // Additional CSS classes
}
```

#### Usage Example

```tsx
import { ExerciseCard } from "@/components/ui/custom/exercise-card";

const exercises = [
  {
    title: "Basic SELECT",
    description: "Learn to select data from a single table",
    difficulty: "beginner" as const,
    query: "SELECT * FROM users WHERE age > 18;",
  },
  // ... more exercises
];

function ExerciseList() {
  const [selectedQuery, setSelectedQuery] = useState("");

  return (
    <div className="grid gap-4">
      {exercises.map((exercise, index) => (
        <ExerciseCard
          key={index}
          {...exercise}
          onSelect={setSelectedQuery}
          isActive={selectedQuery === exercise.query}
        />
      ))}
    </div>
  );
}
```

#### Styling

The component uses color-coded badges for difficulty levels:

- **Beginner**: Green (`bg-green-100 text-green-800`)
- **Intermediate**: Blue (`bg-blue-100 text-blue-800`)
- **Advanced**: Purple (`bg-purple-100 text-purple-800`)

---

### 🗄️ SchemaViewer

**File:** `schema-viewer.tsx`

A collapsible database schema viewer that displays tables, columns, data types, and relationships.

#### Features

- Expandable/collapsible table sections
- Primary key indicators
- Foreign key relationships
- Data type badges
- Clickable table names
- Scrollable container

#### Props

```typescript
interface SchemaViewerProps {
  tables: SchemaTable[]; // Array of database tables
  onTableClick?: (tableName: string) => void; // Callback when table name is clicked
  className?: string; // Additional CSS classes
}

interface SchemaTable {
  name: string; // Table name
  columns: TableColumn[]; // Array of table columns
}

interface TableColumn {
  name: string; // Column name
  type: string; // Data type (e.g., "VARCHAR", "INTEGER")
  isPrimary: boolean; // Whether this is a primary key
  isForeign: boolean; // Whether this is a foreign key
  references?: string; // Referenced table (if foreign key)
}
```

#### Usage Example

```tsx
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";

const databaseSchema = [
  {
    name: "users",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true, isForeign: false },
      {
        name: "email",
        type: "VARCHAR(255)",
        isPrimary: false,
        isForeign: false,
      },
      {
        name: "created_at",
        type: "TIMESTAMP",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "id", type: "INTEGER", isPrimary: true, isForeign: false },
      {
        name: "user_id",
        type: "INTEGER",
        isPrimary: false,
        isForeign: true,
        references: "users.id",
      },
      {
        name: "total",
        type: "DECIMAL(10,2)",
        isPrimary: false,
        isForeign: false,
      },
    ],
  },
];

function DatabaseExplorer() {
  const handleTableClick = (tableName: string) => {
    console.log(`Selected table: ${tableName}`);
    // Maybe generate a SELECT query for this table
  };

  return (
    <SchemaViewer
      tables={databaseSchema}
      onTableClick={handleTableClick}
      className="h-96 border rounded-lg"
    />
  );
}
```

#### Visual Indicators

- 🔑 **Primary Keys**: Yellow key icon
- **Foreign Keys**: Arrow notation showing relationships (→ referenced_table.column)
- **Data Types**: Outlined badges showing column types

## Integration Patterns

### Complete SQL Playground Setup

```tsx
import { SqlEditor } from "@/components/ui/custom/sql-editor";
import { ExerciseCard } from "@/components/ui/custom/exercise-card";
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";

function SqlPlayground() {
  const [currentQuery, setCurrentQuery] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Schema Sidebar */}
      <div className="lg:col-span-1">
        <SchemaViewer
          tables={schema}
          onTableClick={(table) =>
            setCurrentQuery(`SELECT * FROM ${table} LIMIT 10;`)
          }
        />
      </div>

      {/* Main Editor Area */}
      <div className="lg:col-span-2 space-y-6">
        <SqlEditor
          defaultValue={currentQuery}
          onExecute={handleExecuteQuery}
          isExecuting={isExecuting}
          onChange={setCurrentQuery}
        />

        {/* Exercise Cards */}
        <div className="grid gap-4">
          {exercises.map((exercise, index) => (
            <ExerciseCard
              key={index}
              {...exercise}
              onSelect={setCurrentQuery}
              isActive={currentQuery === exercise.query}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
```

## Styling & Theming

All components support:

- **Dark/Light Mode**: Automatic theme detection via `next-themes`
- **Tailwind CSS**: Fully styled with Tailwind utility classes
- **Custom Classes**: `className` prop for additional styling
- **Responsive Design**: Mobile-first responsive layouts

## Dependencies

These components rely on several external libraries:

- `@uiw/react-codemirror` - Code editor functionality
- `@codemirror/lang-sql` - SQL syntax highlighting
- `next-themes` - Theme management
- `lucide-react` - Icons
- Various UI components from the `../layout`, `../inputs`, and `../feedback` folders

Make sure these dependencies are installed in your project's `package.json`.
