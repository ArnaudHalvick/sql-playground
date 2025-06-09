# Chart Components

## Overview

The Chart components provide a comprehensive charting solution built on Recharts. They offer various chart types including bar charts, line charts, pie charts, and area charts with responsive design and customizable styling.

## Features

- **Recharts Integration**: Built on the powerful Recharts library
- **Multiple Chart Types**: Bar, line, pie, area, and more
- **Responsive Design**: Automatically adapts to container size
- **Customizable**: Flexible styling and theming options
- **Interactive**: Hover effects and tooltips
- **Accessible**: Screen reader friendly with proper ARIA labels
- **Animation**: Smooth chart animations and transitions

## Chart Types

### Bar Chart

```tsx
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 600 },
  { name: "Apr", value: 800 },
  { name: "May", value: 500 },
];

function SimpleBarChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="hsl(var(--primary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### Line Chart

```tsx
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SimpleLineChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

### Pie Chart

```tsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Desktop", value: 60, color: "hsl(var(--primary))" },
  { name: "Mobile", value: 30, color: "hsl(var(--secondary))" },
  { name: "Tablet", value: 10, color: "hsl(var(--muted))" },
];

function SimplePieChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
```

### Area Chart

```tsx
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function SimpleAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="value"
          stroke="hsl(var(--primary))"
          fill="hsl(var(--primary))"
          fillOpacity={0.3}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
```

### Multi-Series Chart

```tsx
const multiData = [
  { name: "Jan", sales: 400, revenue: 240 },
  { name: "Feb", sales: 300, revenue: 139 },
  { name: "Mar", sales: 600, revenue: 980 },
  { name: "Apr", sales: 800, revenue: 390 },
  { name: "May", sales: 500, revenue: 480 },
];

function MultiSeriesChart() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={multiData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="sales" fill="hsl(var(--primary))" />
        <Bar dataKey="revenue" fill="hsl(var(--secondary))" />
      </BarChart>
    </ResponsiveContainer>
  );
}
```

### Chart with Custom Tooltip

```tsx
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-lg">
        <p className="font-medium">{`${label}`}</p>
        {payload.map((entry, index) => (
          <p key={index} style={{ color: entry.color }}>
            {`${entry.dataKey}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
}

function ChartWithCustomTooltip() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" />
      </LineChart>
    </ResponsiveContainer>
  );
}
```

## Common Configuration

### Responsive Container

Always wrap charts in ResponsiveContainer for responsive behavior:

```tsx
<ResponsiveContainer width="100%" height={400}>
  {/* Chart component */}
</ResponsiveContainer>
```

### Theme Integration

Use CSS variables for consistent theming:

```tsx
<Bar dataKey="value" fill="hsl(var(--primary))" stroke="hsl(var(--border))" />
```

### Animation

Enable animations for smooth transitions:

```tsx
<Bar dataKey="value" fill="hsl(var(--primary))" animationDuration={300} />
```

## Styling Options

### Colors

```tsx
// Using theme colors
fill = "hsl(var(--primary))";
stroke = "hsl(var(--border))";

// Custom colors
fill = "#8884d8";
stroke = "#82ca9d";
```

### Grid and Axes

```tsx
<CartesianGrid
  strokeDasharray="3 3"
  stroke="hsl(var(--border))"
  opacity={0.3}
/>
<XAxis
  stroke="hsl(var(--muted-foreground))"
  fontSize={12}
/>
<YAxis
  stroke="hsl(var(--muted-foreground))"
  fontSize={12}
/>
```

## Accessibility Features

- **ARIA Labels**: Proper labeling for screen readers
- **Keyboard Navigation**: Focus management for interactive elements
- **Color Contrast**: Sufficient contrast for visual accessibility
- **Alternative Text**: Descriptive text for chart content

## Best Practices

- Use ResponsiveContainer for responsive design
- Provide meaningful labels and tooltips
- Choose appropriate chart types for data
- Ensure sufficient color contrast
- Test with screen readers
- Consider mobile touch targets
- Use consistent color schemes
- Provide data tables as alternatives

## Common Use Cases

- Sales and revenue dashboards
- Analytics and metrics visualization
- Performance tracking charts
- User engagement graphs
- Financial reporting
- Progress and goal tracking
- Comparison charts
- Time series data visualization
