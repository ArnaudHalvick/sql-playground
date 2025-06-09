# ToggleGroup Component

## Overview

The ToggleGroup component manages a group of toggle buttons built on Radix UI primitives. It supports both single and multiple selection modes with proper accessibility.

## Features

- **Single/Multiple Selection**: Choose between exclusive or multi-select modes
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow key navigation between items
- **Size Variants**: Consistent sizing with Toggle component
- **Flexible Layout**: Horizontal or vertical orientation

## Components

### ToggleGroup

Root component that manages the group state and selection.

### ToggleGroupItem

Individual toggle item within the group.

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
      <ToggleGroup type="single" size="sm">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-3 w-3" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-3 w-3" />
        </ToggleGroupItem>
      </ToggleGroup>
      <ToggleGroup type="single" size="lg">
        <ToggleGroupItem value="bold" aria-label="Bold">
          <Bold className="h-5 w-5" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Italic">
          <Italic className="h-5 w-5" />
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
    </ToggleGroup>
  );
}
```

## API Reference

### ToggleGroup

| Prop            | Type                                  | Default        | Description          |
| --------------- | ------------------------------------- | -------------- | -------------------- |
| `type`          | `"single" \| "multiple"`              | -              | Selection mode       |
| `value`         | `string \| string[]`                  | -              | Controlled value     |
| `defaultValue`  | `string \| string[]`                  | -              | Default value        |
| `onValueChange` | `(value: string \| string[]) => void` | -              | Value change handler |
| `variant`       | `"default" \| "outline"`              | `"default"`    | Visual style         |
| `size`          | `"default" \| "sm" \| "lg"`           | `"default"`    | Size variant         |
| `orientation`   | `"horizontal" \| "vertical"`          | `"horizontal"` | Layout direction     |

### ToggleGroupItem

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `value`    | `string`  | -       | Unique identifier (required) |
| `disabled` | `boolean` | `false` | Disable the item             |

## Accessibility

- Built on Radix UI primitives
- Keyboard navigation with arrow keys
- Screen reader support
- Proper ARIA attributes

## Best Practices

- Use descriptive `aria-label` for icon-only items
- Group related functionality together
- Consider single vs multiple selection based on use case
- Use consistent sizing within the same interface
