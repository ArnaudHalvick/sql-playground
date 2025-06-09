# Popover

A popover component that displays rich content in a floating panel. Built on Radix UI's Popover primitive.

## Features

- Click to open/close with rich content display
- Customizable positioning and smooth animations
- Portal rendering and accessible by default
- Focus management

## Installation

```bash
npm install @radix-ui/react-popover
```

## Basic Usage

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";

export function PopoverDemo() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open popover</Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Dimensions</h4>
            <p className="text-sm text-muted-foreground">
              Set the dimensions for the layer.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="width">Width</label>
              <input
                id="width"
                defaultValue="100%"
                className="col-span-2 h-8"
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <label htmlFor="height">Height</label>
              <input
                id="height"
                defaultValue="25px"
                className="col-span-2 h-8"
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Key Components

### Popover

Root component managing popover state.

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `modal?: boolean` - Whether popover is modal (default: false)

### PopoverTrigger

Button that opens the popover.

- `asChild?: boolean` - Change rendered element (default: false)

### PopoverContent

Content container for the popover.

- `className?: string` - Additional CSS classes
- `align?: "start" | "center" | "end"` - Alignment relative to trigger (default: "center")
- `sideOffset?: number` - Distance from trigger (default: 4)
- `alignOffset?: number` - Alignment offset (default: 0)
- `side?: "top" | "right" | "bottom" | "left"` - Preferred side (default: "bottom")
- `onPointerDownOutside?: (event) => void` - Outside click callback
- `onEscapeKeyDown?: (event) => void` - Escape key callback

## Examples

### Date Picker Popover

```tsx
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

function DatePickerPopover() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[280px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
```

### Color Picker Popover

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function ColorPickerPopover() {
  const [color, setColor] = React.useState("#3b82f6");

  const presetColors = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
  ];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[200px] justify-start">
          <div
            className="w-4 h-4 rounded mr-2"
            style={{ backgroundColor: color }}
          />
          {color}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="color">Color</Label>
            <Input
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              placeholder="#000000"
            />
          </div>
          <div className="space-y-2">
            <Label>Presets</Label>
            <div className="grid grid-cols-8 gap-2">
              {presetColors.map((presetColor) => (
                <button
                  key={presetColor}
                  className="w-6 h-6 rounded border border-gray-200 hover:scale-110 transition-transform"
                  style={{ backgroundColor: presetColor }}
                  onClick={() => setColor(presetColor)}
                />
              ))}
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Settings Popover

```tsx
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

function SettingsPopover() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Manage your preferences
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications">Notifications</Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode">Dark Mode</Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Best Practices

- Use for rich interactive content that needs more space than tooltips
- Position appropriately based on available screen space
- Include clear actions or close mechanisms
- Keep content focused and organized
- Consider mobile responsiveness and touch interactions
