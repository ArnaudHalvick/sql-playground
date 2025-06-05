# Data Display Components

This folder contains components specifically designed for displaying and visualizing data in various formats. These components are essential for creating rich, interactive data presentations in your application.

## Components Overview

### 📊 Chart

**File:** `chart.tsx`

A comprehensive charting library built on top of Recharts, providing a flexible and themeable charting system with built-in dark/light mode support.

#### Features

- Multiple chart types support (Bar, Line, Area, Pie, etc.)
- Automatic theme switching (dark/light mode)
- Customizable tooltips and legends
- Responsive design
- CSS custom properties for theming
- TypeScript support with strict typing

#### Core Components

```typescript
// Main container for all charts
<ChartContainer config={chartConfig}>
  {/* Your Recharts components go here */}
</ChartContainer>

// Enhanced tooltip with theme support
<ChartTooltip content={<ChartTooltipContent />} />
```

#### Configuration

```typescript
type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    icon?: React.ComponentType;
  } & (
    | { color?: string; theme?: never }
    | { color?: never; theme: Record<"light" | "dark", string> }
  );
};
```

#### Usage Example

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/data-display/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";

const chartData = [
  { month: "Jan", sales: 1200, profit: 400 },
  { month: "Feb", sales: 1900, profit: 600 },
  { month: "Mar", sales: 1600, profit: 500 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "hsl(var(--chart-1))",
  },
  profit: {
    label: "Profit",
    color: "hsl(var(--chart-2))",
  },
};

function SalesChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[400px]">
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="sales" fill="var(--color-sales)" />
        <Bar dataKey="profit" fill="var(--color-profit)" />
      </BarChart>
    </ChartContainer>
  );
}
```

#### Advanced Theming

```tsx
const chartConfig = {
  revenue: {
    label: "Revenue",
    theme: {
      light: "#3b82f6", // Blue in light mode
      dark: "#60a5fa", // Lighter blue in dark mode
    },
  },
};
```

---

### 📋 Table

**File:** `table.tsx`

A set of primitive table components that provide the foundation for building accessible, styled tables.

#### Components

- `Table` - Main table wrapper with overflow handling
- `TableHeader` - Table header section
- `TableBody` - Table body section
- `TableFooter` - Table footer section
- `TableRow` - Table row with hover effects
- `TableHead` - Header cell component
- `TableCell` - Data cell component
- `TableCaption` - Table caption for accessibility

#### Features

- Responsive overflow handling
- Hover effects on rows
- Selection state support
- Accessible markup
- Consistent styling

#### Usage Example

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/data-display/table";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
];

function UserTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

---

### 📅 Calendar

**File:** `calendar.tsx`

A flexible calendar component built on react-day-picker with full theme integration and customizable styling.

#### Features

- Date selection (single/multiple/range)
- Month/year navigation
- Disabled dates support
- Custom day rendering
- Keyboard navigation
- Accessibility compliant

#### Props

Extends all `react-day-picker` props with additional styling options:

```typescript
interface CalendarProps extends React.ComponentProps<typeof DayPicker> {
  className?: string;
  classNames?: Partial<ClassNames>; // react-day-picker class names
  showOutsideDays?: boolean; // Show days from adjacent months
}
```

#### Usage Example

```tsx
import { Calendar } from "@/components/ui/data-display/calendar";
import { useState } from "react";

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
      disabled={(date) => date < new Date()} // Disable past dates
    />
  );
}

// Range selection
function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-md border"
    />
  );
}
```

---

### 🗃️ DataTable

**File:** `data-table.tsx`

A specialized table component designed for displaying query results and data sets with loading states, error handling, and proper data formatting.

#### Features

- Loading skeleton states
- Error display with formatting
- NULL value handling
- JSON object display
- Scrollable container
- Empty state messaging

#### Props

```typescript
interface DataTableProps {
  columns: string[]; // Column names array
  rows: Record<string, any>[]; // Data rows
  isLoading: boolean; // Loading state
  error?: string; // Error message
  className?: string; // Additional CSS classes
}
```

#### Usage Example

```tsx
import { DataTable } from "@/components/ui/data-display/data-table";

function QueryResults() {
  const [data, setData] = useState({ columns: [], rows: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>();

  const executeQuery = async (query: string) => {
    setIsLoading(true);
    setError(undefined);

    try {
      const result = await fetch("/api/query", {
        method: "POST",
        body: JSON.stringify({ query }),
      });

      if (!result.ok) {
        throw new Error(await result.text());
      }

      const data = await result.json();
      setData(data);
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

#### Data Formatting

The component automatically handles different data types:

- **NULL values**: Displayed as italic "NULL"
- **Objects**: JSON.stringify() formatting
- **Primitives**: String conversion
- **Empty results**: "No results found" message

---

### 🎠 Carousel

**File:** `carousel.tsx`

A flexible carousel/slider component built on Embla Carousel with keyboard navigation, touch support, and customizable options.

#### Components

- `Carousel` - Main carousel container
- `CarouselContent` - Content wrapper
- `CarouselItem` - Individual slide
- `CarouselPrevious` - Previous button
- `CarouselNext` - Next button

#### Features

- Touch/swipe support
- Keyboard navigation (arrow keys)
- Horizontal/vertical orientation
- Auto-play support (via plugins)
- Infinite loop option
- Responsive breakpoints

#### Props

```typescript
interface CarouselProps {
  opts?: CarouselOptions; // Embla carousel options
  plugins?: CarouselPlugin[]; // Embla plugins
  orientation?: "horizontal" | "vertical";
  setApi?: (api: CarouselApi) => void; // Access to carousel API
}
```

#### Usage Example

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/data-display/carousel";

const images = [
  { id: 1, src: "/image1.jpg", alt: "Image 1" },
  { id: 2, src: "/image2.jpg", alt: "Image 2" },
  { id: 3, src: "/image3.jpg", alt: "Image 3" },
];

function ImageCarousel() {
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image) => (
          <CarouselItem key={image.id}>
            <div className="p-1">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-48 object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

#### Advanced Configuration

```tsx
// Auto-play carousel
import Autoplay from "embla-carousel-autoplay";

function AutoplayCarousel() {
  return (
    <Carousel
      plugins={[Autoplay({ delay: 2000 })]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      {/* Content */}
    </Carousel>
  );
}

// Vertical carousel
function VerticalCarousel() {
  return (
    <Carousel orientation="vertical" className="w-full max-w-xs">
      {/* Content */}
    </Carousel>
  );
}
```

## Integration Patterns

### Complete Data Dashboard

```tsx
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/data-display/chart";
import { DataTable } from "@/components/ui/data-display/data-table";
import { Calendar } from "@/components/ui/data-display/calendar";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>();
  const [chartData, setChartData] = useState([]);
  const [tableData, setTableData] = useState({ columns: [], rows: [] });

  return (
    <div className="space-y-6">
      {/* Date Filter */}
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        className="rounded-md border"
      />

      {/* Chart Visualization */}
      <ChartContainer config={chartConfig} className="h-[400px]">
        <BarChart data={chartData}>
          <XAxis dataKey="name" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill="var(--color-primary)" />
        </BarChart>
      </ChartContainer>

      {/* Detailed Data Table */}
      <DataTable
        columns={tableData.columns}
        rows={tableData.rows}
        isLoading={false}
        className="h-96"
      />
    </div>
  );
}
```

### SQL Results Display

```tsx
import { DataTable } from "@/components/ui/data-display/data-table";
import { Chart, ChartContainer } from "@/components/ui/data-display/chart";

function SqlResultsViewer({ queryResult, isLoading, error }) {
  const canVisualize =
    queryResult?.columns?.length <= 3 && queryResult?.rows?.length > 0;

  return (
    <div className="space-y-4">
      {/* Always show table */}
      <DataTable
        columns={queryResult?.columns || []}
        rows={queryResult?.rows || []}
        isLoading={isLoading}
        error={error}
      />

      {/* Show chart if data is suitable */}
      {canVisualize && (
        <ChartContainer config={chartConfig} className="h-[300px]">
          {/* Dynamic chart based on data structure */}
        </ChartContainer>
      )}
    </div>
  );
}
```

## Best Practices

### Performance

- Use `React.memo()` for table rows with large datasets
- Implement virtualization for very large tables (consider `@tanstack/react-virtual`)
- Lazy load chart data when possible

### Accessibility

- Always provide proper ARIA labels
- Use semantic HTML elements
- Ensure keyboard navigation works
- Provide alternative text for visual data

### Responsive Design

- Use responsive breakpoints for chart dimensions
- Consider horizontal scrolling for wide tables
- Stack carousel items on mobile when appropriate

### Data Formatting

- Handle edge cases (null, undefined, empty arrays)
- Format numbers and dates consistently
- Provide loading states for all async operations

## Dependencies

These components require the following packages:

- `recharts` - Charting library
- `react-day-picker` - Calendar functionality
- `embla-carousel-react` - Carousel functionality
- `lucide-react` - Icons
- Various UI components from `../layout`, `../inputs`, and `../feedback` folders

Install with:

```bash
npm install recharts react-day-picker embla-carousel-react
```
