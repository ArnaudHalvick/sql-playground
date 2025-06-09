# Toggle Component

## Overview

The Toggle component is a two-state button built on Radix UI primitives. It provides a pressed/unpressed state with visual feedback, commonly used for toolbar actions and feature toggles.

## Features

- **Two-State Button**: Clear pressed/unpressed visual states
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Space/Enter key activation
- **Size Variants**: Default, small, and large sizes
- **Icon Support**: Perfect for icon-based toggle buttons

## Usage Examples

### Basic Toggle

```tsx
import { Toggle } from "@/components/ui/inputs/toggle";
import { Bold } from "lucide-react";

function BasicToggle() {
  return (
    <Toggle aria-label="Toggle bold">
      <Bold className="h-4 w-4" />
    </Toggle>
  );
}
```

### Controlled Toggle

```tsx
function ControlledToggle() {
  const [isBold, setIsBold] = useState(false);

  return (
    <div className="space-y-2">
      <Toggle
        pressed={isBold}
        onPressedChange={setIsBold}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <p className="text-sm text-muted-foreground">
        Bold is {isBold ? "enabled" : "disabled"}
      </p>
    </div>
  );
}
```

### Toggle Sizes

```tsx
function ToggleSizes() {
  return (
    <div className="flex items-center space-x-2">
      <Toggle size="sm" aria-label="Small toggle">
        <Bold className="h-3 w-3" />
      </Toggle>
      <Toggle size="default" aria-label="Default toggle">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle size="lg" aria-label="Large toggle">
        <Bold className="h-5 w-5" />
      </Toggle>
    </div>
  );
}
```

### Toggle Variants

```tsx
function ToggleVariants() {
  return (
    <div className="space-x-2">
      <Toggle variant="default" aria-label="Default variant">
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle variant="outline" aria-label="Outline variant">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

### Text Formatting Toolbar

```tsx
function FormattingToolbar() {
  const [formatting, setFormatting] = useState({
    bold: false,
    italic: false,
    underline: false,
  });

  const toggleFormat = (format: keyof typeof formatting) => {
    setFormatting((prev) => ({ ...prev, [format]: !prev[format] }));
  };

  return (
    <div className="flex items-center space-x-1 p-2 border rounded-md">
      <Toggle
        pressed={formatting.bold}
        onPressedChange={() => toggleFormat("bold")}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={formatting.italic}
        onPressedChange={() => toggleFormat("italic")}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      <Toggle
        pressed={formatting.underline}
        onPressedChange={() => toggleFormat("underline")}
        aria-label="Toggle underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

## API Reference

### Toggle

| Prop              | Type                         | Default     | Description                  |
| ----------------- | ---------------------------- | ----------- | ---------------------------- |
| `variant`         | `"default" \| "outline"`     | `"default"` | Visual style variant         |
| `size`            | `"default" \| "sm" \| "lg"`  | `"default"` | Size of the toggle           |
| `pressed`         | `boolean`                    | -           | Controlled pressed state     |
| `onPressedChange` | `(pressed: boolean) => void` | -           | Pressed state change handler |
| `disabled`        | `boolean`                    | `false`     | Disable the toggle           |

## Accessibility

- Built on Radix UI primitives
- Proper ARIA attributes (aria-pressed)
- Keyboard navigation support
- Screen reader announcements

## Best Practices

- Always provide `aria-label` for icon-only toggles
- Use descriptive labels that explain the toggle's purpose
- Group related toggles logically
- Consider using ToggleGroup for multiple related toggles

## Dependencies

- **@radix-ui/react-toggle**: Core toggle functionality
- **class-variance-authority**: Variant management
- **lucide-react**: Icon components
- **Tailwind CSS**: Styling system
- **React**: Component framework
