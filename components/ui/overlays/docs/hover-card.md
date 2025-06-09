# Hover Card

A hover card component that displays rich content when hovering over an element. Built on top of Radix UI's Hover Card primitive with custom styling and smooth animations.

## Features

- Hover activation with delay
- Rich content display
- Customizable positioning
- Smooth animations
- Portal rendering
- Accessible by default
- Touch device support

## Installation

```bash
npm install @radix-ui/react-hover-card
```

## Usage

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

## API Reference

### HoverCard

The root component that manages the hover card state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`  | `boolean`                 | `false` | The default open state                     |
| `open`         | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `openDelay`    | `number`                  | `700`   | Delay in milliseconds before opening       |
| `closeDelay`   | `number`                  | `300`   | Delay in milliseconds before closing       |

### HoverCardTrigger

The element that triggers the hover card.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### HoverCardContent

The content container for the hover card.

| Prop          | Type                                     | Default    | Description                   |
| ------------- | ---------------------------------------- | ---------- | ----------------------------- |
| `className`   | `string`                                 | -          | Additional CSS classes        |
| `align`       | `"start" \| "center" \| "end"`           | `"center"` | Alignment relative to trigger |
| `sideOffset`  | `number`                                 | `4`        | Distance from the trigger     |
| `alignOffset` | `number`                                 | `0`        | Alignment offset              |
| `side`        | `"top" \| "right" \| "bottom" \| "left"` | `"bottom"` | Preferred side to render      |

## Examples

### User Profile Card

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
import { Badge } from "@/components/ui/badge";
import { Star, GitFork, Eye } from "lucide-react";

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
            <Badge variant="secondary" className="text-xs">
              typescript
            </Badge>
          </div>
          <div className="text-xs text-muted-foreground">
            Updated 2 hours ago
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

### Product Preview Card

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ShoppingCart } from "lucide-react";

function ProductPreviewCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="cursor-pointer rounded-lg border p-4 hover:shadow-md transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Product"
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="font-medium mt-2">Wireless Headphones</h3>
          <p className="text-sm text-muted-foreground">$99.99</p>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Product"
              className="w-full h-40 object-cover rounded"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-start justify-between">
              <h4 className="font-semibold">Premium Wireless Headphones</h4>
              <Badge variant="secondary">New</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              High-quality wireless headphones with noise cancellation and
              30-hour battery life.
            </p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">$99.99</span>
              <Button size="sm">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

### Link Preview Card

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
import { ExternalLink } from "lucide-react";

function LinkPreviewCard() {
  return (
    <div className="prose">
      <p>
        Check out this amazing article about{" "}
        <HoverCard>
          <HoverCardTrigger asChild>
            <a
              href="https://example.com/react-best-practices"
              className="text-primary hover:underline inline-flex items-center"
              target="_blank"
              rel="noreferrer"
            >
              React best practices
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-3">
              <img
                src="https://images.unsplash.com/photo-1633356122544-f134324a6cee"
                alt="Article preview"
                className="w-full h-32 object-cover rounded"
              />
              <div>
                <h4 className="font-semibold text-sm">
                  10 React Best Practices Every Developer Should Know
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  Learn the essential patterns and practices that will make your
                  React applications more maintainable and performant.
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>example.com</span>
                <span>5 min read</span>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>{" "}
        that covers essential patterns for modern development.
      </p>
    </div>
  );
}
```

### Team Member Card

```tsx
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/overlays/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Mail, MessageCircle } from "lucide-react";

function TeamMemberCard() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="flex items-center space-x-2 p-2 rounded hover:bg-muted cursor-pointer">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/02.png" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Alice Smith</span>
        </div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/02.png" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            <div className="space-y-1 flex-1">
              <h4 className="text-sm font-semibold">Alice Smith</h4>
              <p className="text-sm text-muted-foreground">
                Senior Frontend Developer
              </p>
              <div className="flex space-x-1">
                <Badge variant="secondary" className="text-xs">
                  React
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  TypeScript
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Next.js
                </Badge>
              </div>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">
            Passionate about creating beautiful and accessible user interfaces.
            5+ years of experience in frontend development.
          </p>
          <div className="flex space-x-2">
            <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
              <Mail className="h-4 w-4" />
              <span>Email</span>
            </button>
            <button className="flex items-center space-x-1 text-sm text-muted-foreground hover:text-foreground">
              <MessageCircle className="h-4 w-4" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
```

## Styling

The hover card components can be styled using Tailwind CSS classes. The default styles provide a clean appearance with smooth animations.

```tsx
<HoverCardContent className="w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
  <div className="p-4">
    <h4 className="font-semibold text-gray-900 dark:text-white">
      Custom Styled Card
    </h4>
  </div>
</HoverCardContent>
```

## Accessibility

- Follows WAI-ARIA design patterns
- Keyboard navigation support
- Screen reader compatible
- Proper focus management
- Touch device support
- Respects user motion preferences

## Common Use Cases

- User profile previews
- Link previews and metadata
- Product information cards
- Repository/project details
- Team member information
- Tooltip-like rich content
- Documentation references
- Social media previews
