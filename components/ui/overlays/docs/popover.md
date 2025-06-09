# Popover

A popover component that displays rich content in a floating panel. Built on top of Radix UI's Popover primitive with custom styling and smooth animations.

## Features

- Click to open/close
- Rich content display
- Customizable positioning
- Smooth animations
- Portal rendering
- Accessible by default
- Focus management

## Installation

```bash
npm install @radix-ui/react-popover
```

## Usage

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

## API Reference

### Popover

The root component that manages the popover state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`  | `boolean`                 | `false` | The default open state                     |
| `open`         | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `modal`        | `boolean`                 | `false` | Whether the popover is modal               |

### PopoverTrigger

The button that opens the popover.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### PopoverContent

The content container for the popover.

| Prop                   | Type                                       | Default    | Description                               |
| ---------------------- | ------------------------------------------ | ---------- | ----------------------------------------- |
| `className`            | `string`                                   | -          | Additional CSS classes                    |
| `align`                | `"start" \| "center" \| "end"`             | `"center"` | Alignment relative to trigger             |
| `sideOffset`           | `number`                                   | `4`        | Distance from the trigger                 |
| `alignOffset`          | `number`                                   | `0`        | Alignment offset                          |
| `side`                 | `"top" \| "right" \| "bottom" \| "left"`   | `"bottom"` | Preferred side to render                  |
| `onPointerDownOutside` | `(event: PointerDownOutsideEvent) => void` | -          | Callback fired when clicking outside      |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void`           | -          | Callback fired when escape key is pressed |

## Examples

### Date Picker Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Settings } from "lucide-react";

function SettingsPopover() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [volume, setVolume] = React.useState([50]);

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
            <h4 className="font-medium leading-none">Settings</h4>
            <p className="text-sm text-muted-foreground">
              Configure your preferences.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="notifications" className="text-sm">
                Push Notifications
              </Label>
              <Switch
                id="notifications"
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="text-sm">
                Dark Mode
              </Label>
              <Switch
                id="dark-mode"
                checked={darkMode}
                onCheckedChange={setDarkMode}
              />
            </div>
            <div className="space-y-2">
              <Label className="text-sm">Volume</Label>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="text-xs text-muted-foreground text-center">
                {volume[0]}%
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### User Profile Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Settings, LogOut } from "lucide-react";

function UserProfilePopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80" align="end">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/01.png" alt="@johndoe" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <h4 className="text-sm font-semibold">John Doe</h4>
                <Badge variant="secondary">Pro</Badge>
              </div>
              <p className="text-xs text-muted-foreground">john@example.com</p>
            </div>
          </div>
          <Separator />
          <div className="space-y-1">
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
            <Button variant="ghost" className="w-full justify-start" size="sm">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
          <Separator />
          <Button variant="ghost" className="w-full justify-start" size="sm">
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Share Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share, Copy, Mail, MessageCircle, Twitter } from "lucide-react";

function SharePopover() {
  const [url] = React.useState("https://example.com/shared-content");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Share className="mr-2 h-4 w-4" />
          Share
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Share this content</h4>
            <p className="text-sm text-muted-foreground">
              Anyone with the link can view this content.
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="link">Link</Label>
            <div className="flex space-x-2">
              <Input id="link" value={url} readOnly />
              <Button size="sm" onClick={copyToClipboard}>
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <Label>Share via</Label>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Mail className="mr-2 h-4 w-4" />
                Email
              </Button>
              <Button variant="outline" size="sm">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

### Filter Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Filter } from "lucide-react";

function FilterPopover() {
  const [filters, setFilters] = React.useState({
    categories: [],
    status: [],
    priority: [],
  });

  const categories = ["Design", "Development", "Marketing", "Sales"];
  const statuses = ["Active", "Inactive", "Pending"];
  const priorities = ["High", "Medium", "Low"];

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filters</h4>
            <p className="text-sm text-muted-foreground">
              Filter items by category, status, and priority.
            </p>
          </div>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium">Categories</Label>
              <div className="mt-2 space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Status</Label>
              <div className="mt-2 space-y-2">
                {statuses.map((status) => (
                  <div key={status} className="flex items-center space-x-2">
                    <Checkbox id={status} />
                    <Label htmlFor={status} className="text-sm">
                      {status}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            <Separator />
            <div>
              <Label className="text-sm font-medium">Priority</Label>
              <div className="mt-2 space-y-2">
                {priorities.map((priority) => (
                  <div key={priority} className="flex items-center space-x-2">
                    <Checkbox id={priority} />
                    <Label htmlFor={priority} className="text-sm">
                      {priority}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Button size="sm" className="flex-1">
              Apply
            </Button>
            <Button variant="outline" size="sm" className="flex-1">
              Reset
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
```

## Styling

The popover components can be styled using Tailwind CSS classes. The default styles provide a clean appearance with smooth animations.

```tsx
<PopoverContent className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
  <div className="p-4">
    <h4 className="font-semibold text-gray-900 dark:text-white">
      Custom Styled Popover
    </h4>
  </div>
</PopoverContent>
```

## Accessibility

- Focus is automatically managed
- Pressing ESC closes the popover
- Clicking outside closes the popover
- Proper ARIA attributes are applied
- Screen reader compatible
- Keyboard navigation support

## Common Use Cases

- Date and time pickers
- Color pickers and selectors
- Settings and configuration panels
- User profile menus
- Share and export options
- Filter and search interfaces
- Form field helpers
- Quick action menus
