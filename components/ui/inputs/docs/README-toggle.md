# Toggle Component

## Overview

The Toggle component is a two-state button built on Radix UI primitives. It provides a pressed/unpressed state with visual feedback, commonly used for toolbar actions, formatting controls, and feature toggles.

## Features

- **Two-State Button**: Clear pressed/unpressed visual states
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Space/Enter key activation
- **Size Variants**: Default, small, and large sizes
- **Icon Support**: Perfect for icon-based toggle buttons
- **Custom Styling**: Flexible appearance customization

## Props Interface

```typescript
interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg";
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  // ... all other Radix Toggle props
}
```

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
    <div className="space-y-4">
      <div className="space-x-2">
        <Toggle variant="default" aria-label="Default variant">
          <Bold className="h-4 w-4" />
        </Toggle>

        <Toggle variant="outline" aria-label="Outline variant">
          <Italic className="h-4 w-4" />
        </Toggle>
      </div>
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
    strikethrough: false,
  });

  const toggleFormat = (format: keyof typeof formatting) => {
    setFormatting((prev) => ({
      ...prev,
      [format]: !prev[format],
    }));
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

      <Toggle
        pressed={formatting.strikethrough}
        onPressedChange={() => toggleFormat("strikethrough")}
        aria-label="Toggle strikethrough"
      >
        <Strikethrough className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

### View Mode Toggle

```tsx
function ViewModeToggle() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex items-center space-x-1">
      <Toggle
        pressed={viewMode === "grid"}
        onPressedChange={(pressed) => pressed && setViewMode("grid")}
        aria-label="Grid view"
      >
        <Grid className="h-4 w-4" />
      </Toggle>

      <Toggle
        pressed={viewMode === "list"}
        onPressedChange={(pressed) => pressed && setViewMode("list")}
        aria-label="List view"
      >
        <List className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

### Feature Toggles

```tsx
function FeatureToggles() {
  const [features, setFeatures] = useState({
    notifications: true,
    darkMode: false,
    autoSave: true,
    analytics: false,
  });

  const toggleFeature = (feature: keyof typeof features) => {
    setFeatures((prev) => ({
      ...prev,
      [feature]: !prev[feature],
    }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Feature Settings</h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Notifications</label>
            <p className="text-xs text-muted-foreground">
              Receive push notifications
            </p>
          </div>
          <Toggle
            pressed={features.notifications}
            onPressedChange={() => toggleFeature("notifications")}
            aria-label="Toggle notifications"
          >
            <Bell className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Dark Mode</label>
            <p className="text-xs text-muted-foreground">Use dark theme</p>
          </div>
          <Toggle
            pressed={features.darkMode}
            onPressedChange={() => toggleFeature("darkMode")}
            aria-label="Toggle dark mode"
          >
            <Moon className="h-4 w-4" />
          </Toggle>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <label className="text-sm font-medium">Auto Save</label>
            <p className="text-xs text-muted-foreground">
              Automatically save changes
            </p>
          </div>
          <Toggle
            pressed={features.autoSave}
            onPressedChange={() => toggleFeature("autoSave")}
            aria-label="Toggle auto save"
          >
            <Save className="h-4 w-4" />
          </Toggle>
        </div>
      </div>
    </div>
  );
}
```

### Disabled Toggle

```tsx
function DisabledToggle() {
  return (
    <div className="space-x-2">
      <Toggle disabled aria-label="Disabled toggle (off)">
        <Bold className="h-4 w-4" />
      </Toggle>

      <Toggle disabled pressed aria-label="Disabled toggle (on)">
        <Italic className="h-4 w-4" />
      </Toggle>
    </div>
  );
}
```

### Toggle with Text

```tsx
function ToggleWithText() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Toggle
      pressed={isVisible}
      onPressedChange={setIsVisible}
      aria-label="Toggle visibility"
      className="space-x-2"
    >
      {isVisible ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      <span>{isVisible ? "Hide" : "Show"}</span>
    </Toggle>
  );
}
```

## Use Cases

- **Text Formatting**: Bold, italic, underline toggles in editors
- **View Modes**: Grid/list view, card/table view toggles
- **Feature Flags**: Enable/disable application features
- **Toolbar Actions**: Toggle states in toolbars and menus
- **Filters**: Toggle filter options on/off
- **Settings**: Binary preference controls
- **Media Controls**: Play/pause, mute/unmute toggles
- **Visibility**: Show/hide content toggles

## Best Practices

- Always provide descriptive aria-label for accessibility
- Use consistent icons that clearly represent the toggle state
- Provide visual feedback for pressed/unpressed states
- Group related toggles logically
- Consider using Toggle Group for mutually exclusive options
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for all states
- Use appropriate sizing for the context
- Provide clear visual indication of the current state

## Dependencies

- **@radix-ui/react-toggle**: Core toggle functionality
- **class-variance-authority**: Variant management
- **lucide-react**: Icon components
- **Tailwind CSS**: Styling system
- **React**: Component framework
