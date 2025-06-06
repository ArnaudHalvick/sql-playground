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
      <div className="flex items-center gap-2">
        <span>Drafts</span>
        <Badge variant="secondary">5</Badge>
      </div>
    </div>
  );
}
```

### Category Badges

```tsx
function CategoryBadges() {
  const categories = [
    { name: "React", variant: "default" },
    { name: "TypeScript", variant: "secondary" },
    { name: "CSS", variant: "outline" },
    { name: "JavaScript", variant: "default" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => (
        <Badge key={category.name} variant={category.variant}>
          {category.name}
        </Badge>
      ))}
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
- **Border**: Transparent
- **Hover**: Slightly darker primary
- **Use Case**: Primary status, important labels

### Secondary

- **Background**: Secondary color
- **Text**: Secondary foreground color
- **Border**: Transparent
- **Hover**: Slightly darker secondary
- **Use Case**: Secondary information, neutral status

### Destructive

- **Background**: Destructive/error color
- **Text**: Destructive foreground color
- **Border**: Transparent
- **Hover**: Slightly darker destructive
- **Use Case**: Errors, warnings, critical status

### Outline

- **Background**: Transparent
- **Text**: Foreground color
- **Border**: Current text color
- **Hover**: No background change
- **Use Case**: Subtle labels, tags, categories

## Styling Features

### Layout

- **Inline Flex**: Horizontal layout for content
- **Rounded**: Full border radius for pill shape
- **Padding**: Compact horizontal and vertical spacing
- **Font**: Small, semibold text for readability

### Interactive States

- **Focus**: Ring outline for keyboard navigation
- **Hover**: Color transitions for interactive badges
- **Transitions**: Smooth color changes

### Typography

- **Size**: Extra small (xs) for compact appearance
- **Weight**: Semibold for better readability
- **Alignment**: Centered content alignment

## Customization Options

### Custom Colors

```tsx
// Custom success badge
<Badge className="bg-green-100 text-green-800 hover:bg-green-200">
  Success
</Badge>

// Custom warning badge
<Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
  Warning
</Badge>

// Custom info badge
<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
  Info
</Badge>
```

### Size Variations

```tsx
// Large badge
<Badge className="px-3 py-1 text-sm">
  Large Badge
</Badge>

// Extra small badge
<Badge className="px-1.5 py-0.5 text-xs">
  XS
</Badge>

// Square badge (for single characters/numbers)
<Badge className="h-6 w-6 rounded-full p-0 flex items-center justify-center">
  5
</Badge>
```

### Shape Variations

```tsx
// Rounded rectangle
<Badge className="rounded-md">
  Rounded
</Badge>

// Square
<Badge className="rounded-none">
  Square
</Badge>

// Circular (for single characters)
<Badge className="rounded-full h-8 w-8 p-0 flex items-center justify-center">
  A
</Badge>
```

## Common Patterns

### Notification Badge

```tsx
function NotificationBadge({ count }: { count: number }) {
  if (count === 0) return null;

  return (
    <div className="relative">
      <BellIcon className="h-6 w-6" />
      <Badge
        variant="destructive"
        className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
      >
        {count > 99 ? "99+" : count}
      </Badge>
    </div>
  );
}
```

### Status Indicator

```tsx
function StatusIndicator({
  status,
}: {
  status: "online" | "offline" | "away";
}) {
  const variants = {
    online: { variant: "default", color: "bg-green-500" },
    offline: { variant: "secondary", color: "bg-gray-500" },
    away: { variant: "secondary", color: "bg-yellow-500" },
  };

  return (
    <Badge variant={variants[status].variant} className="gap-2">
      <div className={`h-2 w-2 rounded-full ${variants[status].color}`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}
```

### Removable Tag

```tsx
function RemovableTag({
  tag,
  onRemove,
}: {
  tag: string;
  onRemove: () => void;
}) {
  return (
    <Badge variant="secondary" className="gap-1 pr-1">
      {tag}
      <button
        onClick={onRemove}
        className="ml-1 rounded-full hover:bg-secondary-foreground/20 p-0.5"
      >
        <XIcon className="h-3 w-3" />
      </button>
    </Badge>
  );
}
```

## Accessibility Features

### Keyboard Navigation

- **Focus States**: Clear focus indicators
- **Tab Navigation**: Proper tab order for interactive badges
- **Enter/Space**: Activation for clickable badges

### Screen Reader Support

- **Semantic HTML**: Uses div with proper ARIA attributes
- **Text Content**: Clear, descriptive text
- **Context**: Meaningful labels for status badges

### Visual Accessibility

- **Contrast**: Sufficient color contrast ratios
- **Size**: Minimum touch target size for interactive badges
- **Focus Indicators**: Visible focus rings

## Use Cases

- **Status Indicators**: Show current state or condition
- **Category Labels**: Tag content with categories
- **Count Displays**: Show numbers, quantities, or counts
- **Notification Badges**: Indicate new or unread items
- **Filter Tags**: Display active filters or selections
- **Skill Tags**: Show technologies, skills, or attributes
- **Priority Levels**: Indicate importance or urgency
- **Version Labels**: Show software versions or releases

## Best Practices

- Keep text short and descriptive
- Use consistent variants for similar types of information
- Ensure sufficient color contrast for accessibility
- Consider using icons for better visual communication
- Group related badges logically
- Use appropriate variants for semantic meaning
- Test with screen readers for accessibility
- Avoid overusing badges to prevent visual clutter

## Dependencies

- **class-variance-authority**: For variant management
- **Tailwind CSS**: For styling system
- **React**: Component framework
