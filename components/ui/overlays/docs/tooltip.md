# Tooltip

A tooltip component that displays helpful information when hovering over an element. Built on Radix UI's Tooltip primitive.

## Features

- Hover activation with customizable delay
- Customizable positioning and smooth animations
- Portal rendering and accessible by default
- Keyboard navigation and touch device support

## Installation

```bash
npm install @radix-ui/react-tooltip
```

## Basic Usage

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

## Key Components

### TooltipProvider

Wraps your app or component tree.

- `delayDuration?: number` - Delay before showing tooltip (default: 700ms)
- `skipDelayDuration?: number` - Skip delay when moving between tooltips (default: 300ms)
- `disableHoverableContent?: boolean` - Disable hoverable content (default: false)

### Tooltip

Root component managing tooltip state.

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `delayDuration?: number` - Override provider delay duration

### TooltipTrigger

Element that triggers the tooltip.

- `asChild?: boolean` - Change rendered element (default: false)

### TooltipContent

Content container for the tooltip.

- `className?: string` - Additional CSS classes
- `sideOffset?: number` - Distance from trigger (default: 4)
- `side?: "top" | "right" | "bottom" | "left"` - Preferred side (default: "top")
- `align?: "start" | "center" | "end"` - Alignment (default: "center")

## Examples

### Basic Tooltips with Different Positions

```tsx
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
import { Heart, Share, Settings } from "lucide-react";

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

### Rich Content Tooltip

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

function RichContentTooltip() {
  return (
    <TooltipProvider>
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
            <p className="text-sm">Full-stack developer</p>
            <div className="flex space-x-1">
              <Badge variant="secondary" className="text-xs">
                React
              </Badge>
              <Badge variant="secondary" className="text-xs">
                Node.js
              </Badge>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Best Practices

- Always wrap components with `TooltipProvider`
- Keep tooltip content concise and helpful
- Use appropriate positioning based on layout
- Consider touch devices - tooltips may not work as expected
- Use `asChild` prop to apply tooltips to custom components
- Avoid tooltips on mobile-only interfaces
