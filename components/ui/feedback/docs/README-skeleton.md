# Skeleton Component

## Overview

The Skeleton component provides loading placeholders that mimic the shape and size of content while it's being loaded. It creates a better user experience by showing users where content will appear and reducing perceived loading time.

## Features

- **Loading Placeholders**: Visual indicators for loading content
- **Smooth Animation**: Subtle shimmer animation effect
- **Flexible Sizing**: Adapts to any width and height
- **Accessible**: Screen reader friendly loading states
- **Customizable**: Easy styling and theming
- **Responsive**: Works across different screen sizes

## Props Interface

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
```

## Usage Examples

### Basic Skeleton

```tsx
import { Skeleton } from "@/components/ui/feedback/skeleton";

function BasicSkeleton() {
  return <Skeleton className="w-full h-4" />;
}
```

### Text Skeletons

```tsx
function TextSkeletons() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/5" />
    </div>
  );
}
```

### Card Skeleton

```tsx
function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-1/4" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
      </div>
      <Skeleton className="h-8 w-20" />
    </div>
  );
}
```

### Profile Skeleton

```tsx
function ProfileSkeleton() {
  return (
    <div className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}
```

### List Skeleton

```tsx
function ListSkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Table Skeleton

```tsx
function TableSkeleton() {
  return (
    <div className="space-y-3">
      {/* Header */}
      <div className="flex space-x-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>

      {/* Rows */}
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="flex space-x-4">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      ))}
    </div>
  );
}
```

### Conditional Loading

```tsx
function ConditionalSkeleton({
  isLoading,
  data,
}: {
  isLoading: boolean;
  data?: any;
}) {
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-4/5" />
          <Skeleton className="h-4 w-3/5" />
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-bold">{data.title}</h2>
      <p>{data.description}</p>
    </div>
  );
}
```

## Common Patterns

### Image Skeleton

```tsx
<Skeleton className="aspect-video w-full rounded-lg" />
```

### Button Skeleton

```tsx
<Skeleton className="h-10 w-24 rounded-md" />
```

### Avatar Skeleton

```tsx
<Skeleton className="h-10 w-10 rounded-full" />
```

### Badge Skeleton

```tsx
<Skeleton className="h-6 w-16 rounded-full" />
```

## Styling

The Skeleton component uses a subtle animation and neutral colors:

```css
/* Base styles */
.skeleton {
  background: hsl(var(--muted));
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Animation */
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
```

## Best Practices

- Match skeleton shapes to actual content layout
- Use consistent spacing and sizing
- Show skeletons for 1-3 seconds maximum
- Combine with proper loading states
- Test with screen readers for accessibility
- Use semantic HTML structure
- Consider skeleton density (not too many elements)

## Accessibility

- Skeletons are hidden from screen readers by default
- Use `aria-live` regions for loading announcements
- Provide alternative loading indicators for screen readers
- Ensure proper focus management during loading states

## Common Use Cases

- Loading user profiles and avatars
- Content cards and articles
- Data tables and lists
- Image galleries
- Form placeholders
- Dashboard widgets
- Search results
- Comments and reviews
