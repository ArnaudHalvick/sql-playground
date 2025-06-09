# Hover Card

A hover card component that displays rich content when hovering over an element. Built on Radix UI's Hover Card primitive.

## Features

- Hover activation with customizable delay
- Rich content display and customizable positioning
- Smooth animations and portal rendering
- Accessible by default with touch device support

## Installation

```bash
npm install @radix-ui/react-hover-card
```

## Basic Usage

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function HoverCardDemo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          className="inline-block cursor-pointer rounded-full"
          href="https://twitter.com/vercel"
          target="_blank"
          rel="noreferrer"
        >
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="flex justify-between space-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <h4 className="text-sm font-semibold">@vercel</h4>
            <p className="text-sm">
              The React Framework – created and maintained by @vercel.
            </p>
            <div className="flex items-center pt-2">
              <span className="text-xs text-muted-foreground">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Key Components

### HoverCard

Root component managing hover card state.

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `openDelay?: number` - Delay before opening (default: 700ms)
- `closeDelay?: number` - Delay before closing (default: 300ms)

### HoverCardTrigger

Element that triggers the hover card.

- `asChild?: boolean` - Change rendered element (default: false)

### HoverCardContent

Content container for the hover card.

- `className?: string` - Additional CSS classes
- `align?: "start" | "center" | "end"` - Alignment relative to trigger (default: "center")
- `sideOffset?: number` - Distance from trigger (default: 4)
- `alignOffset?: number` - Alignment offset (default: 0)
- `side?: "top" | "right" | "bottom" | "left"` - Preferred side (default: "bottom")

## Examples

### User Profile Card

```tsx
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Link } from "lucide-react";

function UserProfileCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          className="inline-flex items-center space-x-2 text-sm font-medium text-primary hover:underline"
          href="#"
        >
          <Avatar className="h-6 w-6">
            <AvatarImage src="/avatars/01.png" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <span>@johndoe</span>
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/01.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-semibold">John Doe</h4>
                <Badge variant="secondary">Pro</Badge>
              </div>
              <p className="text-sm text-muted-foreground">@johndoe</p>
              <p className="text-sm">
                Full-stack developer passionate about creating amazing user
                experiences.
              </p>
            </div>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>San Francisco, CA</span>
            </div>
            <div className="flex items-center space-x-2">
              <Link className="h-4 w-4" />
              <span>johndoe.dev</span>
            </div>
            <div className="flex items-center space-x-2">
              <CalendarDays className="h-4 w-4" />
              <span>Joined March 2021</span>
            </div>
          </div>
          <div className="flex space-x-4 text-sm">
            <div>
              <span className="font-semibold">1,234</span>
              <span className="text-muted-foreground ml-1">Following</span>
            </div>
            <div>
              <span className="font-semibold">5,678</span>
              <span className="text-muted-foreground ml-1">Followers</span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

### Repository Card

```tsx
import { Badge } from "@/components/ui/badge";
import { Star, GitFork } from "lucide-react";

function RepositoryCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <a
          className="text-primary hover:underline font-medium"
          href="https://github.com/vercel/next.js"
          target="_blank"
          rel="noreferrer"
        >
          vercel/next.js
        </a>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div>
            <h4 className="text-sm font-semibold">vercel/next.js</h4>
            <p className="text-sm text-muted-foreground mt-1">
              The React Framework for the Web. Used by some of the world's
              largest companies.
            </p>
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>JavaScript</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4" />
              <span>118k</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="h-4 w-4" />
              <span>25.9k</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <Badge variant="secondary" className="text-xs">
              react
            </Badge>
            <Badge variant="secondary" className="text-xs">
              nextjs
            </Badge>
            <Badge variant="secondary" className="text-xs">
              javascript
            </Badge>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Best Practices

- Use for rich preview content that enhances user experience
- Keep hover delays reasonable (700ms open, 300ms close)
- Ensure content is valuable and not just decorative
- Consider mobile users - hover cards don't work on touch devices
- Position appropriately to avoid covering important content
