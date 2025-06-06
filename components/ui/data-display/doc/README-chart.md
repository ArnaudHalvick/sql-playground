# Chart Components

## Overview

The Chart components provide a comprehensive charting solution built on top of Recharts. They offer a flexible, themeable, and accessible way to display data visualizations with built-in support for tooltips, legends, and responsive design.

## Features

- **Recharts Integration**: Built on the powerful Recharts library
- **Theme Support**: Automatic light/dark theme switching
- **Responsive Design**: Automatically adapts to container size
- **Custom Tooltips**: Rich, customizable tooltip content
- **Configuration System**: Flexible chart configuration with colors and labels
- **Accessibility**: Screen reader friendly with proper ARIA attributes

## Core Components

### ChartContainer

The main wrapper component that provides context and theming for all chart types.

```typescript
interface ChartContainerProps {
  config: ChartConfig; // Chart configuration object
  children: React.ReactNode; // Chart components (Bar, Line, etc.)
  className?: string; // Optional CSS classes
  id?: string; // Optional unique identifier
}
```

### ChartConfig

Configuration object that defines chart appearance and behavior:

```typescript
type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode; // Display label for the data series
    icon?: React.ComponentType; // Optional icon component
  } & (
    | { color?: string; theme?: never } // Single color for all themes
    | { color?: never; theme: Record<"light" | "dark", string> }
  ); // Theme-specific colors
};
```

## Usage Examples

### Basic Bar Chart

```tsx
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/data-display/chart";
import { Bar, BarChart, XAxis, YAxis } from "recharts";

const chartData = [
  { month: "Jan", sales: 1200, profit: 400 },
  { month: "Feb", sales: 1900, profit: 600 },
  { month: "Mar", sales: 1600, profit: 500 },
];

const chartConfig = {
  sales: {
    label: "Sales",
    color: "#3b82f6",
  },
  profit: {
    label: "Profit",
    color: "#10b981",
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

### Line Chart with Theme Support

```tsx
const chartConfig = {
  users: {
    label: "Active Users",
    theme: {
      light: "#2563eb",
      dark: "#60a5fa",
    },
  },
  sessions: {
    label: "Sessions",
    theme: {
      light: "#dc2626",
      dark: "#f87171",
    },
  },
};

function AnalyticsChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[300px]">
      <LineChart data={analyticsData}>
        <XAxis dataKey="date" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Line
          type="monotone"
          dataKey="users"
          stroke="var(--color-users)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="sessions"
          stroke="var(--color-sessions)"
          strokeWidth={2}
        />
      </LineChart>
    </ChartContainer>
  );
}
```

## ChartTooltip Components

### ChartTooltip

Wrapper component for Recharts Tooltip with enhanced functionality.

### ChartTooltipContent

Customizable tooltip content with rich formatting options:

```typescript
interface ChartTooltipContentProps {
  hideLabel?: boolean; // Hide the tooltip label
  hideIndicator?: boolean; // Hide color indicators
  indicator?: "line" | "dot" | "dashed"; // Indicator style
  nameKey?: string; // Custom name key for data
  labelKey?: string; // Custom label key for data
  formatter?: Function; // Custom value formatter
  labelFormatter?: Function; // Custom label formatter
}
```

## Theming System

The chart components automatically generate CSS custom properties for colors:

```css
/* Light theme */
[data-chart="chart-id"] {
  --color-sales: #3b82f6;
  --color-profit: #10b981;
}

/* Dark theme */
.dark [data-chart="chart-id"] {
  --color-sales: #60a5fa;
  --color-profit: #34d399;
}
```

## Supported Chart Types

All Recharts chart types are supported:

- **BarChart**: Vertical and horizontal bar charts
- **LineChart**: Line and area charts
- **PieChart**: Pie and donut charts
- **ScatterChart**: Scatter plot visualizations
- **RadarChart**: Radar/spider charts
- **ComposedChart**: Mixed chart types

## Styling Features

### Default Styling

- Responsive aspect ratio (16:9 by default)
- Proper text sizing and colors
- Grid line styling
- Hover and focus states

### Customization

- Custom CSS classes via className
- Theme-aware color schemes
- Configurable tooltip appearance
- Flexible layout options

## Accessibility Features

- Proper ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Focus management

## Advanced Features

### Custom Indicators

```tsx
<ChartTooltipContent
  indicator="dashed"
  hideLabel={false}
  formatter={(value, name) => [`$${value}`, name]}
/>
```

### Icon Integration

```tsx
const chartConfig = {
  revenue: {
    label: "Revenue",
    icon: DollarSignIcon,
    color: "#10b981",
  },
};
```

## Performance Considerations

- Lazy loading of chart data
- Efficient re-rendering with React.memo
- Optimized for large datasets
- Responsive container sizing

## Use Cases

- Business dashboards
- Analytics platforms
- Data visualization tools
- Reporting interfaces
- Educational data displays

## Dependencies

- **recharts**: Core charting library
- **React**: Component framework
- **Tailwind CSS**: Styling system
