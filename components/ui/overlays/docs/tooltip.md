# Tooltip

A tooltip component that displays helpful information when hovering over an element. Built on top of Radix UI's Tooltip primitive with custom styling and smooth animations.

## Features

- Hover activation with delay
- Customizable positioning
- Smooth animations
- Portal rendering
- Accessible by default
- Keyboard navigation support
- Touch device support

## Installation

```bash
npm install @radix-ui/react-tooltip
```

## Usage

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Button } from "@/components/ui/button";

export function TooltipDemo() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## API Reference

### TooltipProvider

The provider component that wraps your app or component tree.

| Prop                      | Type      | Default | Description                                         |
| ------------------------- | --------- | ------- | --------------------------------------------------- |
| `delayDuration`           | `number`  | `700`   | Delay in milliseconds before showing tooltip        |
| `skipDelayDuration`       | `number`  | `300`   | Duration to skip delay when moving between tooltips |
| `disableHoverableContent` | `boolean` | `false` | Whether to disable hoverable content                |

### Tooltip

The root component that manages the tooltip state.

| Prop            | Type                      | Default | Description                                |
| --------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`   | `boolean`                 | `false` | The default open state                     |
| `open`          | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange`  | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `delayDuration` | `number`                  | -       | Override the provider delay duration       |

### TooltipTrigger

The element that triggers the tooltip.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### TooltipContent

The content container for the tooltip.

| Prop         | Type                                     | Default    | Description                   |
| ------------ | ---------------------------------------- | ---------- | ----------------------------- |
| `className`  | `string`                                 | -          | Additional CSS classes        |
| `sideOffset` | `number`                                 | `4`        | Distance from the trigger     |
| `side`       | `"top" \| "right" \| "bottom" \| "left"` | `"top"`    | Preferred side to render      |
| `align`      | `"start" \| "center" \| "end"`           | `"center"` | Alignment relative to trigger |

## Examples

### Basic Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Button } from "@/components/ui/button";

function BasicTooltips() {
  return (
    <TooltipProvider>
      <div className="flex space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Top</Button>
          </TooltipTrigger>
          <TooltipContent side="top">
            <p>Tooltip on top</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Right</Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Tooltip on right</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Bottom</Button>
          </TooltipTrigger>
          <TooltipContent side="bottom">
            <p>Tooltip on bottom</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Left</Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Tooltip on left</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Icon Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Button } from "@/components/ui/button";
import { Heart, Share, Bookmark, Download, Settings } from "lucide-react";

function IconTooltips() {
  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Add to favorites</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Share className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Share this item</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Bookmark className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Save for later</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Download file</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Settings className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Open settings</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Rich Content Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function RichContentTooltips() {
  return (
    <TooltipProvider>
      <div className="flex space-x-4">
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar className="cursor-pointer">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent className="max-w-xs">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">@johndoe</p>
                </div>
              </div>
              <p className="text-sm">
                Senior Frontend Developer with 5+ years of experience in React
                and TypeScript.
              </p>
              <div className="flex space-x-1">
                <Badge variant="secondary" className="text-xs">
                  React
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  TypeScript
                </Badge>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline">Product Info</Button>
          </TooltipTrigger>
          <TooltipContent className="max-w-sm">
            <div className="space-y-2">
              <h4 className="font-medium">Premium Headphones</h4>
              <p className="text-sm text-muted-foreground">
                High-quality wireless headphones with active noise cancellation.
              </p>
              <div className="flex items-center justify-between">
                <span className="font-bold">$99.99</span>
                <Badge variant="secondary">In Stock</Badge>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Form Field Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HelpCircle } from "lucide-react";

function FormFieldTooltips() {
  return (
    <TooltipProvider>
      <div className="space-y-4 max-w-md">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="password">Password</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <div className="space-y-1">
                  <p className="font-medium">Password Requirements:</p>
                  <ul className="text-sm space-y-1">
                    <li>• At least 8 characters</li>
                    <li>• One uppercase letter</li>
                    <li>• One lowercase letter</li>
                    <li>• One number</li>
                    <li>• One special character</li>
                  </ul>
                </div>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="password" type="password" />
        </div>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <Label htmlFor="api-key">API Key</Label>
            <Tooltip>
              <TooltipTrigger asChild>
                <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
              </TooltipTrigger>
              <TooltipContent>
                <p>You can find your API key in the developer settings</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <Input id="api-key" placeholder="Enter your API key" />
        </div>
      </div>
    </TooltipProvider>
  );
}
```

### Keyboard Shortcuts Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Button } from "@/components/ui/button";
import { Save, Copy, Undo, Redo, Search } from "lucide-react";

function KeyboardShortcutsTooltips() {
  return (
    <TooltipProvider>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Save className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Save</p>
              <p className="text-xs text-muted-foreground">⌘S</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Copy className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Copy</p>
              <p className="text-xs text-muted-foreground">⌘C</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Undo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Undo</p>
              <p className="text-xs text-muted-foreground">⌘Z</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Redo className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Redo</p>
              <p className="text-xs text-muted-foreground">⌘⇧Z</p>
            </div>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <div className="text-center">
              <p>Search</p>
              <p className="text-xs text-muted-foreground">⌘K</p>
            </div>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

### Status Indicators with Tooltips

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { Badge } from "@/components/ui/badge";

function StatusIndicatorsTooltips() {
  return (
    <TooltipProvider>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <span>Server Status:</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <Badge variant="secondary">Online</Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>Server is running normally</p>
                <p className="text-xs text-muted-foreground">
                  Last checked: 2 minutes ago
                </p>
                <p className="text-xs text-muted-foreground">Uptime: 99.9%</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center space-x-4">
          <span>Database:</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <Badge variant="outline">Warning</Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>High memory usage detected</p>
                <p className="text-xs text-muted-foreground">
                  Memory: 85% used
                </p>
                <p className="text-xs text-muted-foreground">
                  Consider optimizing queries
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center space-x-4">
          <span>API:</span>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center space-x-2 cursor-help">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <Badge variant="destructive">Error</Badge>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <div className="space-y-1">
                <p>API endpoint is unreachable</p>
                <p className="text-xs text-muted-foreground">
                  Error: Connection timeout
                </p>
                <p className="text-xs text-muted-foreground">
                  Last successful: 1 hour ago
                </p>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
```

## Styling

The tooltip components can be styled using Tailwind CSS classes. The default styles provide a clean appearance with smooth animations.

```tsx
<TooltipContent className="bg-black text-white border-none">
  <p>Dark tooltip</p>
</TooltipContent>
```

## Accessibility

- Follows WAI-ARIA design patterns
- Keyboard navigation support (focus and escape)
- Screen reader compatible
- Proper ARIA attributes
- Touch device support
- Respects user motion preferences

## Common Use Cases

- Icon button explanations
- Form field help text
- Feature descriptions
- Keyboard shortcut displays
- Status indicator details
- User profile previews
- Action confirmations
- Technical term definitions
