# Button Component

## Overview

The Button component is a versatile, accessible button built with class-variance-authority for consistent styling and behavior. It supports multiple variants, sizes, and states while maintaining excellent accessibility and user experience.

## Features

- **Multiple Variants**: Default, destructive, outline, secondary, ghost, and link styles
- **Size Options**: Default, small, large, and icon sizes
- **Loading States**: Built-in loading spinner support
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Icon Support**: Leading and trailing icon placement
- **Disabled States**: Visual and functional disabled state handling

## Props Interface

```typescript
interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  loading?: boolean;
}
```

## Usage Examples

### Basic Button

```tsx
import { Button } from "@/components/ui/inputs/button";

function BasicButton() {
  return (
    <div className="space-x-2">
      <Button>Default Button</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
```

### Button Variants

```tsx
function ButtonVariants() {
  return (
    <div className="space-y-4">
      <div className="space-x-2">
        <Button variant="default">Default</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="destructive">Destructive</Button>
      </div>
      <div className="space-x-2">
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  );
}
```

### Button Sizes

```tsx
function ButtonSizes() {
  return (
    <div className="flex items-center space-x-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

### Buttons with Icons

```tsx
import { Mail, Download, ArrowRight, Loader2 } from "lucide-react";

function ButtonsWithIcons() {
  return (
    <div className="space-y-4">
      {/* Leading Icons */}
      <div className="space-x-2">
        <Button>
          <Mail className="mr-2 h-4 w-4" />
          Send Email
        </Button>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </div>

      {/* Trailing Icons */}
      <div className="space-x-2">
        <Button>
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      {/* Icon Only */}
      <div className="space-x-2">
        <Button size="icon">
          <Plus className="h-4 w-4" />
        </Button>
        <Button size="icon" variant="outline">
          <Settings className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
```

### Loading States

```tsx
function LoadingButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    // Simulate async operation
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <div className="space-x-2">
      <Button onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Loading...
          </>
        ) : (
          "Click me"
        )}
      </Button>
    </div>
  );
}
```

### Disabled Buttons

```tsx
function DisabledButtons() {
  return (
    <div className="space-x-2">
      <Button disabled>Disabled Default</Button>
      <Button variant="secondary" disabled>
        Disabled Secondary
      </Button>
      <Button variant="outline" disabled>
        Disabled Outline
      </Button>
    </div>
  );
}
```

### Form Integration

```tsx
function FormExample() {
  return (
    <form className="space-y-4">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" className="w-full p-2 border rounded" />
      </div>
      <div className="flex space-x-2">
        <Button type="submit">Submit</Button>
        <Button type="button" variant="outline">
          Cancel
        </Button>
      </div>
    </form>
  );
}
```

## API Reference

### Button

| Prop       | Type                                                                          | Default     | Description             |
| ---------- | ----------------------------------------------------------------------------- | ----------- | ----------------------- |
| `variant`  | `"default" \| "destructive" \| "outline" \| "secondary" \| "ghost" \| "link"` | `"default"` | Visual style variant    |
| `size`     | `"default" \| "sm" \| "lg" \| "icon"`                                         | `"default"` | Size of the button      |
| `asChild`  | `boolean`                                                                     | `false`     | Render as child element |
| `disabled` | `boolean`                                                                     | `false`     | Disable the button      |
| `loading`  | `boolean`                                                                     | `false`     | Show loading state      |

## Accessibility

- Uses semantic `<button>` element
- Supports keyboard navigation (Enter/Space)
- Proper focus management
- ARIA attributes for screen readers
- Disabled state properly communicated

## Best Practices

- Use descriptive button text
- Include `aria-label` for icon-only buttons
- Handle loading states for async actions
- Use appropriate variants for context
- Consider button hierarchy in layouts
