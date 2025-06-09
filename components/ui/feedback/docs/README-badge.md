# Badge Component

## Overview

The Badge component is a small, versatile UI element used to display status, categories, counts, or labels. It provides multiple visual variants and is designed to be compact while maintaining readability and accessibility.

## Features

- **Multiple Variants**: Default, secondary, destructive, and outline styles
- **Compact Design**: Small footprint with clear typography
- **Flexible Content**: Supports text, numbers, and icons
- **Accessibility**: Focus states and keyboard navigation support
- **Responsive**: Adapts to content size automatically
- **Customizable**: Easy styling through className props

## Props Interface

```typescript
interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}
```

## Usage Examples

### Basic Badge

```tsx
import { Badge } from "@/components/ui/feedback/badge";

function BasicBadge() {
  return <Badge>New</Badge>;
}
```

### Status Badges

```tsx
function StatusBadges() {
  return (
    <div className="flex gap-2">
      <Badge variant="default">Active</Badge>
      <Badge variant="secondary">Pending</Badge>
      <Badge variant="destructive">Error</Badge>
      <Badge variant="outline">Draft</Badge>
    </div>
  );
}
```

### Count Badges

```tsx
function CountBadges() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2">
        <span>Messages</span>
        <Badge>12</Badge>
      </div>
      <div className="flex items-center gap-2">
        <span>Notifications</span>
        <Badge variant="destructive">3</Badge>
      </div>
    </div>
  );
}
```

### Badge with Icon

```tsx
import { CheckIcon, XIcon, ClockIcon } from "lucide-react";

function IconBadges() {
  return (
    <div className="flex gap-2">
      <Badge className="gap-1">
        <CheckIcon className="h-3 w-3" />
        Completed
      </Badge>
      <Badge variant="destructive" className="gap-1">
        <XIcon className="h-3 w-3" />
        Failed
      </Badge>
      <Badge variant="secondary" className="gap-1">
        <ClockIcon className="h-3 w-3" />
        Pending
      </Badge>
    </div>
  );
}
```

### Interactive Badges

```tsx
function InteractiveBadges() {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const tags = ["React", "Vue", "Angular", "Svelte"];

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={selectedTags.includes(tag) ? "default" : "outline"}
          className="cursor-pointer hover:bg-primary/80"
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
```

## Variants

### Default

- **Background**: Primary color
- **Text**: Primary foreground color
- **Use Case**: Primary status, important labels

### Secondary

- **Background**: Secondary color
- **Text**: Secondary foreground color
- **Use Case**: Secondary information, neutral status

### Destructive

- **Background**: Destructive/error color
- **Text**: Destructive foreground color
- **Use Case**: Errors, warnings, critical status

### Outline

- **Background**: Transparent
- **Text**: Foreground color
- **Border**: Current text color
- **Use Case**: Subtle labels, tags, categories

## Styling Features

- **Layout**: Inline flex with horizontal content alignment
- **Shape**: Full border radius for pill appearance
- **Typography**: Small, semibold text for readability
- **Interactive States**: Focus ring and hover transitions
- **Spacing**: Compact padding for minimal footprint

## Common Use Cases

- Status indicators (active, pending, error)
- Category tags and labels
- Notification counts
- User roles and permissions
- Content metadata
- Filter tags
- Achievement badges
- Priority levels
