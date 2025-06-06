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
- **Responsive**: Adapts to different screen sizes

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
  // ... all standard HTML button attributes
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
        <Button variant="secondary">
          Learn More
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
        <Button size="icon" variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
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

      <Button variant="outline" disabled={isLoading}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
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
      <Button variant="destructive" disabled>
        Disabled Destructive
      </Button>
    </div>
  );
}
```

### Button Groups

```tsx
function ButtonGroups() {
  const [selected, setSelected] = useState("left");

  return (
    <div className="space-y-4">
      {/* Segmented Control */}
      <div className="inline-flex rounded-md shadow-sm" role="group">
        <Button
          variant={selected === "left" ? "default" : "outline"}
          className="rounded-r-none"
          onClick={() => setSelected("left")}
        >
          Left
        </Button>
        <Button
          variant={selected === "center" ? "default" : "outline"}
          className="rounded-none border-l-0"
          onClick={() => setSelected("center")}
        >
          Center
        </Button>
        <Button
          variant={selected === "right" ? "default" : "outline"}
          className="rounded-l-none border-l-0"
          onClick={() => setSelected("right")}
        >
          Right
        </Button>
      </div>

      {/* Action Group */}
      <div className="flex space-x-2">
        <Button variant="outline">
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </Button>
        <Button variant="outline">
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </Button>
        <Button variant="outline">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </div>
    </div>
  );
}
```

### Form Buttons

```tsx
function FormButtons() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <div className="space-x-2">
          <Button type="button" variant="secondary">
            Save Draft
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
```

### Responsive Buttons

```tsx
function ResponsiveButtons() {
  return (
    <div className="space-y-4">
      {/* Mobile: Icon only, Desktop: Text + Icon */}
      <Button className="md:px-4">
        <Plus className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline">Add Item</span>
      </Button>

      {/* Responsive sizing */}
      <Button size="sm" className="md:size-default lg:size-lg">
        Responsive Size
      </Button>

      {/* Full width on mobile */}
      <Button className="w-full md:w-auto">Full Width Mobile</Button>
    </div>
  );
}
```

### Custom Button Styles

```tsx
function CustomButtons() {
  return (
    <div className="space-y-4">
      {/* Gradient Button */}
      <Button className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
        Gradient Button
      </Button>

      {/* Rounded Button */}
      <Button className="rounded-full px-6">Rounded Button</Button>

      {/* Shadow Button */}
      <Button className="shadow-lg hover:shadow-xl transition-shadow">
        Shadow Button
      </Button>

      {/* Animated Button */}
      <Button className="group">
        <span className="group-hover:translate-x-1 transition-transform">
          Animated
        </span>
        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
      </Button>
    </div>
  );
}
```

### Button as Link

```tsx
import { Link } from "react-router-dom";

function ButtonAsLink() {
  return (
    <div className="space-x-2">
      {/* Using asChild prop */}
      <Button asChild>
        <Link to="/dashboard">Go to Dashboard</Link>
      </Button>

      {/* Link variant */}
      <Button variant="link" asChild>
        <Link to="/help">Need Help?</Link>
      </Button>

      {/* External link */}
      <Button variant="outline" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          External Link
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </Button>
    </div>
  );
}
```

## Styling Features

### Variant Styles

- **Default**: Primary brand color with white text
- **Secondary**: Muted background with dark text
- **Destructive**: Red/danger color for delete actions
- **Outline**: Transparent background with border
- **Ghost**: Transparent background, visible on hover
- **Link**: Text-only appearance like a hyperlink

### Size Options

- **sm**: Smaller padding and text (h-9, px-3, text-sm)
- **default**: Standard size (h-10, px-4, py-2)
- **lg**: Larger padding and text (h-11, px-8)
- **icon**: Square button for icons only (h-10, w-10)

### State Styles

- **Hover**: Subtle color changes and transitions
- **Focus**: Ring outline for keyboard navigation
- **Active**: Pressed state styling
- **Disabled**: Reduced opacity and pointer-events-none

## Accessibility Features

### ARIA Support

- **Role**: Implicit button role
- **States**: aria-disabled for disabled state
- **Labels**: aria-label for icon-only buttons
- **Descriptions**: aria-describedby for additional context

### Keyboard Navigation

- **Enter/Space**: Activate button
- **Tab**: Focus navigation
- **Escape**: Cancel action (in modals)

### Screen Reader Support

- **Button Text**: Clear, descriptive button text
- **Loading States**: Screen reader announcements
- **Icon Context**: Proper labeling for icon buttons
- **State Changes**: Announced state changes

## Advanced Usage

### Compound Button

```tsx
function CompoundButton() {
  return (
    <Button className="h-auto p-4 flex-col items-start">
      <div className="font-semibold">Create Project</div>
      <div className="text-sm text-muted-foreground">
        Start a new project from scratch
      </div>
    </Button>
  );
}
```

### Button with Badge

```tsx
function ButtonWithBadge() {
  const [count, setCount] = useState(3);

  return (
    <Button variant="outline" className="relative">
      Messages
      {count > 0 && (
        <span className="absolute -top-2 -right-2 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
          {count}
        </span>
      )}
    </Button>
  );
}
```

### Confirmation Button

```tsx
function ConfirmationButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    if (!showConfirm) {
      setShowConfirm(true);
      setTimeout(() => setShowConfirm(false), 3000);
      return;
    }

    // Perform delete action
    console.log("Deleted!");
    setShowConfirm(false);
  };

  return (
    <Button
      variant={showConfirm ? "destructive" : "outline"}
      onClick={handleDelete}
    >
      {showConfirm ? "Click again to confirm" : "Delete"}
    </Button>
  );
}
```

## Common Patterns

### Call-to-Action Section

```tsx
function CTASection() {
  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold">Ready to get started?</h2>
      <p className="text-muted-foreground">
        Join thousands of users already using our platform
      </p>
      <div className="space-x-4">
        <Button size="lg">Get Started Free</Button>
        <Button variant="outline" size="lg">
          Learn More
        </Button>
      </div>
    </div>
  );
}
```

### Toolbar

```tsx
function Toolbar() {
  return (
    <div className="flex items-center space-x-1 p-2 border rounded-md">
      <Button size="sm" variant="ghost">
        <Bold className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost">
        <Italic className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost">
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button size="sm" variant="ghost">
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost">
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button size="sm" variant="ghost">
        <AlignRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
```

## Use Cases

- **Primary Actions**: Main call-to-action buttons
- **Form Submission**: Submit, save, and cancel buttons
- **Navigation**: Page navigation and routing
- **Toolbar Actions**: Editor and interface controls
- **Modal Actions**: Confirm, cancel, and close buttons
- **Data Actions**: Create, edit, delete operations
- **Social Actions**: Like, share, follow buttons
- **File Operations**: Upload, download, export buttons

## Best Practices

- Use descriptive button text that clearly indicates the action
- Choose appropriate variants based on action importance
- Include loading states for async operations
- Provide proper focus management and keyboard navigation
- Use consistent sizing within the same interface
- Add icons to improve recognition and usability
- Implement proper disabled states when actions are unavailable
- Test with screen readers for accessibility
- Consider mobile touch targets (minimum 44px)
- Group related actions logically

## Dependencies

- **class-variance-authority**: Variant management
- **@radix-ui/react-slot**: Polymorphic component support
- **lucide-react**: Icon components
- **Tailwind CSS**: Styling system
- **React**: Component framework
