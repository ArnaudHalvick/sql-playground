# Skeleton Component

## Overview

The Skeleton component is a loading placeholder that mimics the shape and size of content while it's being loaded. It provides visual feedback to users during loading states with a subtle pulsing animation, improving perceived performance and user experience.

## Features

- **Pulse Animation**: Built-in CSS animation for loading effect
- **Flexible Sizing**: Adapts to any width and height
- **Lightweight**: Minimal implementation with maximum impact
- **Accessible**: Screen reader friendly loading states
- **Customizable**: Easy styling through className props
- **Responsive**: Works across all screen sizes

## Props Interface

```typescript
interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string; // Custom CSS classes
}
```

## Usage Examples

### Basic Skeleton

```tsx
import { Skeleton } from "@/components/ui/feedback/skeleton";

function BasicSkeleton() {
  return <Skeleton className="h-4 w-full" />;
}
```

### Card Skeleton

```tsx
function CardSkeleton() {
  return (
    <div className="border rounded-lg p-4 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-4 w-1/2" />
      <Skeleton className="h-32 w-full" />
      <div className="flex space-x-2">
        <Skeleton className="h-8 w-16" />
        <Skeleton className="h-8 w-16" />
      </div>
    </div>
  );
}
```

### User Profile Skeleton

```tsx
function UserProfileSkeleton() {
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

### Table Skeleton

```tsx
function TableSkeleton() {
  return (
    <div className="space-y-2">
      {/* Header */}
      <div className="flex space-x-4 p-2">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-4 w-16" />
      </div>
      {/* Rows */}
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex space-x-4 p-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      ))}
    </div>
  );
}
```

### Article Skeleton

```tsx
function ArticleSkeleton() {
  return (
    <div className="space-y-4">
      {/* Title */}
      <Skeleton className="h-8 w-3/4" />

      {/* Meta info */}
      <div className="flex items-center space-x-4">
        <Skeleton className="h-6 w-6 rounded-full" />
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-4 w-20" />
      </div>

      {/* Featured image */}
      <Skeleton className="h-48 w-full rounded-lg" />

      {/* Content paragraphs */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    </div>
  );
}
```

### Dashboard Skeleton

```tsx
function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-10 w-32" />
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="border rounded-lg p-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Chart area */}
      <div className="border rounded-lg p-4">
        <Skeleton className="h-6 w-32 mb-4" />
        <Skeleton className="h-64 w-full" />
      </div>
    </div>
  );
}
```

### List Skeleton

```tsx
function ListSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className="flex items-center space-x-3 p-3 border rounded"
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
          <Skeleton className="h-8 w-20" />
        </div>
      ))}
    </div>
  );
}
```

## Common Patterns

### Conditional Skeleton

```tsx
function ConditionalSkeleton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  if (isLoading) {
    return <Skeleton className="h-20 w-full" />;
  }

  return <>{children}</>;
}
```

### Skeleton with Fade-in

```tsx
function FadeInSkeleton() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setData("Loaded content");
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="transition-opacity duration-300">
      {isLoading ? (
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ) : (
        <div className="animate-in fade-in duration-300">{data}</div>
      )}
    </div>
  );
}
```

### Skeleton Grid

```tsx
function SkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="border rounded-lg p-4 space-y-3">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      ))}
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Animation**: `animate-pulse` for subtle pulsing effect
- **Background**: Muted color that works with themes
- **Border Radius**: Rounded corners for modern appearance
- **Responsive**: Adapts to container dimensions

### Size Variations

```tsx
// Text skeletons
<Skeleton className="h-3 w-full" />    // Small text
<Skeleton className="h-4 w-full" />    // Regular text
<Skeleton className="h-6 w-full" />    // Large text
<Skeleton className="h-8 w-full" />    // Heading

// Button skeletons
<Skeleton className="h-9 w-20" />     // Small button
<Skeleton className="h-10 w-24" />    // Regular button
<Skeleton className="h-11 w-28" />    // Large button

// Image skeletons
<Skeleton className="h-32 w-32" />    // Square image
<Skeleton className="h-48 w-full" />  // Banner image
<Skeleton className="h-64 w-full" />  // Large image
```

### Shape Variations

```tsx
// Circular skeletons
<Skeleton className="h-8 w-8 rounded-full" />     // Small avatar
<Skeleton className="h-12 w-12 rounded-full" />   // Regular avatar
<Skeleton className="h-16 w-16 rounded-full" />   // Large avatar

// Rectangular skeletons
<Skeleton className="h-4 w-full rounded-none" />  // Sharp corners
<Skeleton className="h-4 w-full rounded-sm" />    // Small radius
<Skeleton className="h-4 w-full rounded-lg" />    // Large radius
```

### Custom Animations

```tsx
// Slower pulse
<Skeleton className="h-4 w-full animate-pulse [animation-duration:2s]" />

// Wave animation (custom CSS needed)
<Skeleton className="h-4 w-full skeleton-wave" />

// No animation
<Skeleton className="h-4 w-full animate-none bg-muted" />
```

## Accessibility Features

### Screen Reader Support

- **Hidden from Screen Readers**: Skeleton elements are decorative
- **Loading Announcements**: Use aria-live regions for loading states
- **Context**: Provide meaningful loading messages

### Implementation Example

```tsx
function AccessibleSkeleton({
  isLoading,
  children,
}: {
  isLoading: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <div aria-live="polite" className="sr-only">
        {isLoading ? "Loading content..." : "Content loaded"}
      </div>
      {isLoading ? (
        <div aria-hidden="true">
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        children
      )}
    </>
  );
}
```

## Performance Considerations

### Efficient Rendering

- **Minimal DOM**: Simple div structure
- **CSS Animations**: Hardware-accelerated animations
- **Reusable**: Single component for all skeleton needs

### Best Practices

```tsx
// Use consistent skeleton shapes
const SKELETON_SHAPES = {
  text: "h-4 w-full",
  title: "h-6 w-3/4",
  avatar: "h-10 w-10 rounded-full",
  button: "h-9 w-20",
  image: "h-32 w-full",
};

function OptimizedSkeleton({ type }: { type: keyof typeof SKELETON_SHAPES }) {
  return <Skeleton className={SKELETON_SHAPES[type]} />;
}
```

## Use Cases

- **Data Loading**: Show while fetching API data
- **Image Loading**: Placeholder for loading images
- **Page Transitions**: Smooth transitions between pages
- **Lazy Loading**: Content that loads progressively
- **Form Loading**: While processing form submissions
- **Search Results**: While searching and filtering
- **Infinite Scroll**: Loading more content
- **Component Mounting**: Initial component load states

## Best Practices

- Match skeleton shapes to actual content layout
- Use consistent skeleton patterns across the application
- Keep animations subtle and not distracting
- Provide appropriate loading context for screen readers
- Consider skeleton duration - not too fast or slow
- Use realistic content proportions
- Test with actual loading times
- Combine with proper error handling

## Dependencies

- **Tailwind CSS**: For styling and animations
- **React**: Component framework
