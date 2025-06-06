# ToggleGroup Component

## Overview

The ToggleGroup component manages a group of toggle buttons built on Radix UI primitives. It supports both single and multiple selection modes, providing an intuitive interface for grouped toggle controls with proper accessibility.

## Features

- **Single/Multiple Selection**: Choose between exclusive or multi-select modes
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow key navigation between items
- **Size Variants**: Consistent sizing with Toggle component
- **Flexible Layout**: Horizontal or vertical orientation
- **Custom Styling**: Flexible appearance customization

## Components

### ToggleGroup

Root component that manages the group state and selection.

### ToggleGroupItem

Individual toggle item within the group.

## Props Interfaces

```typescript
interface ToggleGroupProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  type: "single" | "multiple";
  value?: string | string[];
  defaultValue?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  orientation?: "horizontal" | "vertical";
  // ... all other Radix ToggleGroup props
}

interface ToggleGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item>,
    VariantProps<typeof toggleVariants> {
  value: string; // Required: unique value for this item
  // ... all other Radix ToggleGroupItem props
}
```

## Usage Examples

### Basic Single Selection

```tsx
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/inputs/toggle-group";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

function BasicToggleGroup() {
  return (
    <ToggleGroup type="single" defaultValue="center">
      <ToggleGroupItem value="left" aria-label="Align left">
        <AlignLeft className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="center" aria-label="Align center">
        <AlignCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="right" aria-label="Align right">
        <AlignRight className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Multiple Selection

```tsx
function MultipleSelectionGroup() {
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);

  return (
    <div className="space-y-4">
      <ToggleGroup
        type="multiple"
        value={selectedFormats}
        onValueChange={setSelectedFormats}
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="strikethrough" aria-label="Strikethrough">
          <Strikethrough className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <p className="text-sm text-muted-foreground">
        Selected: {selectedFormats.join(", ") || "None"}
      </p>
    </div>
  );
}
```

### Size Variants

```tsx
function ToggleGroupSizes() {
  return (
    <div className="space-y-4">
      {/* Small */}
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-3 w-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-3 w-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-3 w-3" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Default */}
      <ToggleGroup type="single">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      {/* Large */}
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-5 w-5" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

### Outline Variant

```tsx
function OutlineToggleGroup() {
  return (
    <ToggleGroup type="single" variant="outline" defaultValue="grid">
      <ToggleGroupItem value="grid" aria-label="Grid view">
        <Grid className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="list" aria-label="List view">
        <List className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="card" aria-label="Card view">
        <LayoutGrid className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Vertical Orientation

```tsx
function VerticalToggleGroup() {
  return (
    <ToggleGroup type="single" orientation="vertical" defaultValue="top">
      <ToggleGroupItem value="top" aria-label="Align top">
        <AlignVerticalJustifyStart className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="middle" aria-label="Align middle">
        <AlignVerticalJustifyCenter className="h-4 w-4" />
      </ToggleGroupItem>
      <ToggleGroupItem value="bottom" aria-label="Align bottom">
        <AlignVerticalJustifyEnd className="h-4 w-4" />
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Text-Based Toggle Group

```tsx
function TextToggleGroup() {
  const [selectedSize, setSelectedSize] = useState("medium");

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Size</label>
      <ToggleGroup
        type="single"
        value={selectedSize}
        onValueChange={setSelectedSize}
      >
        <ToggleGroupItem value="small">Small</ToggleGroupItem>
        <ToggleGroupItem value="medium">Medium</ToggleGroupItem>
        <ToggleGroupItem value="large">Large</ToggleGroupItem>
        <ToggleGroupItem value="xlarge">X-Large</ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

### Filter Toggle Group

```tsx
function FilterToggleGroup() {
  const [activeFilters, setActiveFilters] = useState<string[]>(["active"]);

  const filters = [
    { value: "all", label: "All", icon: List },
    { value: "active", label: "Active", icon: CheckCircle },
    { value: "pending", label: "Pending", icon: Clock },
    { value: "completed", label: "Completed", icon: Check },
    { value: "archived", label: "Archived", icon: Archive },
  ];

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium">Filter by Status</label>
      <ToggleGroup
        type="multiple"
        value={activeFilters}
        onValueChange={setActiveFilters}
        variant="outline"
      >
        {filters.map((filter) => {
          const Icon = filter.icon;
          return (
            <ToggleGroupItem
              key={filter.value}
              value={filter.value}
              aria-label={`Filter by ${filter.label}`}
              className="space-x-2"
            >
              <Icon className="h-4 w-4" />
              <span>{filter.label}</span>
            </ToggleGroupItem>
          );
        })}
      </ToggleGroup>

      <p className="text-sm text-muted-foreground">
        Active filters: {activeFilters.join(", ")}
      </p>
    </div>
  );
}
```

### Toolbar with Sections

```tsx
function EditorToolbar() {
  const [formatting, setFormatting] = useState<string[]>([]);
  const [alignment, setAlignment] = useState("left");

  return (
    <div className="flex items-center space-x-4 p-2 border rounded-md">
      {/* Text Formatting */}
      <ToggleGroup
        type="multiple"
        value={formatting}
        onValueChange={setFormatting}
        size="sm"
      >
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Underline">
          <Underline className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>

      <div className="w-px h-6 bg-border" />

      {/* Text Alignment */}
      <ToggleGroup
        type="single"
        value={alignment}
        onValueChange={setAlignment}
        size="sm"
      >
        <ToggleGroupItem value="left" aria-label="Align left">
          <AlignLeft className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="center" aria-label="Align center">
          <AlignCenter className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="right" aria-label="Align right">
          <AlignRight className="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="justify" aria-label="Justify">
          <AlignJustify className="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
```

### Disabled Items

```tsx
function DisabledToggleGroup() {
  return (
    <ToggleGroup type="single" defaultValue="option1">
      <ToggleGroupItem value="option1">Available</ToggleGroupItem>
      <ToggleGroupItem value="option2" disabled>
        Disabled
      </ToggleGroupItem>
      <ToggleGroupItem value="option3">Available</ToggleGroupItem>
    </ToggleGroup>
  );
}
```

### Responsive Toggle Group

```tsx
function ResponsiveToggleGroup() {
  const [view, setView] = useState("grid");

  return (
    <ToggleGroup
      type="single"
      value={view}
      onValueChange={setView}
      className="grid grid-cols-2 md:flex md:w-auto"
    >
      <ToggleGroupItem value="grid" className="flex-1 md:flex-none">
        <Grid className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Grid</span>
      </ToggleGroupItem>
      <ToggleGroupItem value="list" className="flex-1 md:flex-none">
        <List className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">List</span>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
```

## Styling Features

### Default Styling

- **Grouped Appearance**: Items appear connected as a single unit
- **Selection States**: Clear visual feedback for selected items
- **Hover Effects**: Smooth transitions on interaction
- **Focus Management**: Proper focus ring for keyboard navigation

### Customization Options

```tsx
// Custom spacing
<ToggleGroup className="space-x-1">

// Custom borders
<ToggleGroup className="border-2 border-primary rounded-lg">

// Custom item styling
<ToggleGroupItem className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground">
```

## Accessibility Features

### ARIA Support

- **Role**: Proper radiogroup or group role based on type
- **States**: aria-pressed for individual items
- **Labels**: aria-label for icon-only items
- **Orientation**: aria-orientation for vertical groups

### Keyboard Navigation

- **Arrow Keys**: Navigate between items
- **Space/Enter**: Toggle item selection
- **Tab**: Enter/exit the group
- **Home/End**: Jump to first/last item

### Screen Reader Support

- **Group Context**: Group is announced with proper role
- **Selection State**: Current selection is communicated
- **Item Labels**: Each item's purpose is clear
- **Count Information**: Number of items may be announced

## Advanced Usage

### Custom Toggle Group

```tsx
function CustomToggleGroup() {
  const [priority, setPriority] = useState("medium");

  const priorities = [
    { value: "low", label: "Low", color: "text-green-600" },
    { value: "medium", label: "Medium", color: "text-yellow-600" },
    { value: "high", label: "High", color: "text-red-600" },
  ];

  return (
    <ToggleGroup
      type="single"
      value={priority}
      onValueChange={setPriority}
      variant="outline"
    >
      {priorities.map((item) => (
        <ToggleGroupItem
          key={item.value}
          value={item.value}
          className={`data-[state=on]:${item.color} data-[state=on]:border-current`}
        >
          <Flag className="h-4 w-4 mr-2" />
          {item.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  );
}
```

### Form Integration

```tsx
function FormWithToggleGroup() {
  const form = useForm({
    defaultValues: {
      alignment: "left",
      formatting: [],
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="alignment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Alignment</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="single"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="left" aria-label="Align left">
                    <AlignLeft className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="center" aria-label="Align center">
                    <AlignCenter className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="right" aria-label="Align right">
                    <AlignRight className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="formatting"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Text Formatting</FormLabel>
              <FormControl>
                <ToggleGroup
                  type="multiple"
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <ToggleGroupItem value="bold" aria-label="Bold">
                    <Bold className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="italic" aria-label="Italic">
                    <Italic className="h-4 w-4" />
                  </ToggleGroupItem>
                  <ToggleGroupItem value="underline" aria-label="Underline">
                    <Underline className="h-4 w-4" />
                  </ToggleGroupItem>
                </ToggleGroup>
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

## Common Patterns

### Settings Panel

```tsx
function SettingsPanel() {
  const [theme, setTheme] = useState("system");
  const [features, setFeatures] = useState<string[]>(["notifications"]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-sm font-medium">Theme</label>
        <ToggleGroup
          type="single"
          value={theme}
          onValueChange={setTheme}
          variant="outline"
        >
          <ToggleGroupItem value="light">
            <Sun className="h-4 w-4 mr-2" />
            Light
          </ToggleGroupItem>
          <ToggleGroupItem value="dark">
            <Moon className="h-4 w-4 mr-2" />
            Dark
          </ToggleGroupItem>
          <ToggleGroupItem value="system">
            <Monitor className="h-4 w-4 mr-2" />
            System
          </ToggleGroupItem>
        </ToggleGroup>
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium">Features</label>
        <ToggleGroup
          type="multiple"
          value={features}
          onValueChange={setFeatures}
          variant="outline"
        >
          <ToggleGroupItem value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </ToggleGroupItem>
          <ToggleGroupItem value="analytics">
            <BarChart className="h-4 w-4 mr-2" />
            Analytics
          </ToggleGroupItem>
          <ToggleGroupItem value="sync">
            <RefreshCw className="h-4 w-4 mr-2" />
            Auto Sync
          </ToggleGroupItem>
        </ToggleGroup>
      </div>
    </div>
  );
}
```

## Use Cases

- **Text Formatting**: Bold, italic, underline controls in editors
- **Alignment**: Text or object alignment controls
- **View Modes**: Grid, list, card view toggles
- **Filters**: Multi-select filter options
- **Settings**: Theme, feature, or preference selection
- **Toolbar Actions**: Grouped toolbar controls
- **Navigation**: Tab-like navigation with toggle behavior
- **Data Display**: Chart type or visualization mode selection

## Best Practices

- Use single selection for mutually exclusive options
- Use multiple selection for independent toggles
- Provide clear, descriptive labels or aria-labels
- Group related functionality logically
- Use consistent sizing within the same interface
- Consider the visual hierarchy and importance
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for all states
- Use appropriate icons that clearly represent the function
- Consider responsive behavior on smaller screens

## Dependencies

- **@radix-ui/react-toggle-group**: Core toggle group functionality
- **class-variance-authority**: Variant management
- **lucide-react**: Icon components
- **Tailwind CSS**: Styling system
- **React**: Component framework
