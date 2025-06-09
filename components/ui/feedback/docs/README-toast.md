# Toast Components

## Overview

The Toast components provide a notification system for displaying temporary messages to users. Built on Radix UI primitives, they offer accessible, customizable notifications that appear briefly and then automatically dismiss.

## Features

- **Radix UI Foundation**: Built on accessible toast primitives
- **Auto-dismiss**: Configurable automatic dismissal timing
- **Manual Control**: User can dismiss manually
- **Action Support**: Optional action buttons
- **Positioning**: Configurable viewport positioning
- **Accessibility**: Screen reader announcements and keyboard support
- **Smooth Animations**: Enter/exit transitions

## Components

- **ToastProvider**: Context provider for toast functionality
- **ToastViewport**: Container that positions toasts in the viewport
- **Toast**: Individual toast notification container
- **ToastTitle**: Title component for the toast
- **ToastDescription**: Description text component
- **ToastAction**: Action button component
- **ToastClose**: Close/dismiss button component

## Usage Examples

### Basic Toast

```tsx
import {
  Toast,
  ToastAction,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/feedback/toast";

function BasicToast() {
  return (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>Success</ToastTitle>
          <ToastDescription>Your message has been sent.</ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
```

### Toast with Action

```tsx
function ToastWithAction() {
  return (
    <ToastProvider>
      <Toast>
        <div className="grid gap-1">
          <ToastTitle>File deleted</ToastTitle>
          <ToastDescription>
            Your file has been moved to trash.
          </ToastDescription>
        </div>
        <ToastAction altText="Undo file deletion">Undo</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
```

### Error Toast

```tsx
function ErrorToast() {
  return (
    <ToastProvider>
      <Toast variant="destructive">
        <div className="grid gap-1">
          <ToastTitle>Error</ToastTitle>
          <ToastDescription>
            Something went wrong. Please try again.
          </ToastDescription>
        </div>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
```

### Complete Implementation

```tsx
function ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Show Toast
      </button>

      <Toast open={open} onOpenChange={setOpen}>
        <div className="grid gap-1">
          <ToastTitle>Notification</ToastTitle>
          <ToastDescription>This is a toast notification.</ToastDescription>
        </div>
        <ToastAction altText="Take action">Action</ToastAction>
        <ToastClose />
      </Toast>
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Props

### Toast

```typescript
interface ToastProps {
  variant?: "default" | "destructive";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  duration?: number;
  className?: string;
}
```

### ToastAction

```typescript
interface ToastActionProps {
  altText: string; // Required for accessibility
  onClick?: () => void;
  className?: string;
}
```

### ToastProvider

```typescript
interface ToastProviderProps {
  swipeDirection?: "right" | "left" | "up" | "down";
  swipeThreshold?: number;
  duration?: number;
}
```

## Variants

### Default

- Standard appearance with neutral colors
- Used for general notifications and information

### Destructive

- Red/error styling for warnings and errors
- Used for error messages and critical notifications

## Accessibility Features

- **Screen Reader**: Automatic announcements when toasts appear
- **Keyboard Navigation**: Focus management and keyboard dismissal
- **ARIA Labels**: Proper labeling for assistive technologies
- **Alt Text**: Required alt text for action buttons
- **Focus Management**: Proper focus handling

## Best Practices

- Keep messages concise and clear
- Use appropriate variants for message types
- Provide action buttons for actionable notifications
- Set reasonable duration times
- Test with screen readers
- Don't overwhelm users with too many toasts
- Use descriptive alt text for actions

## Common Use Cases

- Form submission confirmations
- Error message display
- Success notifications
- Undo actions
- System status updates
- Real-time notifications
- Progress updates
