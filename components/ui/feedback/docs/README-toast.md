# Toast Components

## Overview

The Toast components provide a comprehensive notification system built on Radix UI primitives. They offer accessible, customizable toast notifications with support for actions, descriptions, and various styling options. This is the foundational toast system that works with the Toaster component.

## Features

- **Radix UI Foundation**: Built on accessible primitives
- **Multiple Variants**: Default and destructive styling
- **Action Support**: Interactive buttons within toasts
- **Swipe to Dismiss**: Touch-friendly dismissal
- **Animations**: Smooth enter/exit animations
- **Viewport Management**: Proper positioning and stacking
- **Accessibility**: Full screen reader and keyboard support

## Components

### ToastProvider

The root provider component that manages toast state and context.

### ToastViewport

The container that positions and displays toasts on screen.

### Toast

The main toast component with variant support.

```typescript
interface ToastProps
  extends React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> {
  variant?: "default" | "destructive";
  className?: string;
}
```

### ToastTitle

Header component for toast messages.

### ToastDescription

Content component for detailed toast information.

### ToastAction

Interactive button component for toast actions.

### ToastClose

Close button component with proper accessibility.

## Usage Examples

### Basic Setup

```tsx
// First, wrap your app with ToastProvider and add ToastViewport
import { ToastProvider, ToastViewport } from "@/components/ui/feedback/toast";

function App() {
  return (
    <ToastProvider>
      {/* Your app content */}
      <ToastViewport />
    </ToastProvider>
  );
}
```

### Simple Toast

```tsx
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
} from "@/components/ui/feedback/toast";

function SimpleToast() {
  return (
    <Toast>
      <ToastTitle>Notification</ToastTitle>
      <ToastDescription>
        Your message has been sent successfully.
      </ToastDescription>
      <ToastClose />
    </Toast>
  );
}
```

### Toast with Action

```tsx
import {
  Toast,
  ToastTitle,
  ToastDescription,
  ToastAction,
  ToastClose,
} from "@/components/ui/feedback/toast";

function ActionToast() {
  return (
    <Toast>
      <ToastTitle>File deleted</ToastTitle>
      <ToastDescription>The file has been moved to trash.</ToastDescription>
      <ToastAction altText="Undo deletion" onClick={() => console.log("Undo")}>
        Undo
      </ToastAction>
      <ToastClose />
    </Toast>
  );
}
```

### Destructive Toast

```tsx
function ErrorToast() {
  return (
    <Toast variant="destructive">
      <ToastTitle>Error</ToastTitle>
      <ToastDescription>
        Failed to save changes. Please try again.
      </ToastDescription>
      <ToastAction altText="Retry saving" onClick={() => console.log("Retry")}>
        Retry
      </ToastAction>
      <ToastClose />
    </Toast>
  );
}
```

### Complete Toast System with Hook

```tsx
// hooks/use-toast.ts
import { useState, useCallback } from "react";

interface ToastData {
  id: string;
  title?: string;
  description?: string;
  action?: React.ReactElement;
  variant?: "default" | "destructive";
}

export function useToast() {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const toast = useCallback((data: Omit<ToastData, "id">) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts((prev) => [...prev, { ...data, id }]);

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);

    return id;
  }, []);

  const dismiss = useCallback((id?: string) => {
    if (id) {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    } else {
      setToasts([]);
    }
  }, []);

  return { toasts, toast, dismiss };
}

// components/toaster.tsx
import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/feedback/toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(({ id, title, description, action, variant }) => (
        <Toast key={id} variant={variant}>
          <div className="grid gap-1">
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
          </div>
          {action}
          <ToastClose />
        </Toast>
      ))}
      <ToastViewport />
    </ToastProvider>
  );
}
```

### Using the Toast System

```tsx
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();

  const showSuccess = () => {
    toast({
      title: "Success!",
      description: "Your changes have been saved.",
    });
  };

  const showError = () => {
    toast({
      variant: "destructive",
      title: "Error",
      description: "Something went wrong.",
      action: (
        <ToastAction altText="Try again" onClick={() => console.log("Retry")}>
          Try again
        </ToastAction>
      ),
    });
  };

  return (
    <div className="space-x-2">
      <button onClick={showSuccess}>Show Success</button>
      <button onClick={showError}>Show Error</button>
    </div>
  );
}
```

## Styling Features

### Variants

#### Default

- **Background**: Theme background color
- **Text**: Theme foreground color
- **Border**: Standard border styling
- **Use Case**: General notifications, success messages

#### Destructive

- **Background**: Destructive background color
- **Text**: Destructive foreground color
- **Border**: Destructive border color
- **Use Case**: Error messages, warnings, critical alerts

### Animations

The toast components include sophisticated animations:

```css
/* Enter animations */
data-[state=open]:animate-in
data-[state=open]:slide-in-from-top-full
data-[state=open]:sm:slide-in-from-bottom-full

/* Exit animations */
data-[state=closed]:animate-out
data-[state=closed]:fade-out-80
data-[state=closed]:slide-out-to-right-full

/* Swipe animations */
data-[swipe=cancel]:translate-x-0
data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)]
data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]
data-[swipe=move]:transition-none
```

### Positioning

The ToastViewport handles positioning:

```css
/* Desktop positioning */
fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4
sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]
```

## Advanced Usage

### Custom Toast Duration

```tsx
function CustomDurationToast() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => setOpen(false), 10000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <Toast open={open} onOpenChange={setOpen}>
      <ToastTitle>Long Duration Toast</ToastTitle>
      <ToastDescription>This toast will stay for 10 seconds.</ToastDescription>
      <ToastClose />
    </Toast>
  );
}
```

### Toast with Multiple Actions

```tsx
function MultiActionToast() {
  return (
    <Toast>
      <ToastTitle>Confirm Action</ToastTitle>
      <ToastDescription>
        Are you sure you want to delete this item?
      </ToastDescription>
      <div className="flex gap-2">
        <ToastAction
          altText="Confirm deletion"
          onClick={() => console.log("Delete")}
          className="bg-destructive text-destructive-foreground"
        >
          Delete
        </ToastAction>
        <ToastAction
          altText="Cancel deletion"
          onClick={() => console.log("Cancel")}
          className="bg-secondary text-secondary-foreground"
        >
          Cancel
        </ToastAction>
      </div>
      <ToastClose />
    </Toast>
  );
}
```

### Persistent Toast

```tsx
function PersistentToast() {
  const [open, setOpen] = useState(true);

  return (
    <Toast
      open={open}
      onOpenChange={setOpen}
      duration={Infinity} // Prevents auto-dismiss
    >
      <ToastTitle>Important Notice</ToastTitle>
      <ToastDescription>This message requires your attention.</ToastDescription>
      <ToastAction altText="Acknowledge" onClick={() => setOpen(false)}>
        Got it
      </ToastAction>
    </Toast>
  );
}
```

## Accessibility Features

### ARIA Support

- **Role**: Proper toast role for screen readers
- **Live Regions**: Automatic announcement of new toasts
- **Labels**: Descriptive labels for actions and close buttons
- **Alt Text**: Required alt text for action buttons

### Keyboard Navigation

- **Escape Key**: Dismiss toast
- **Tab Navigation**: Navigate through toast actions
- **Enter/Space**: Activate focused actions
- **Focus Management**: Proper focus trapping and restoration

### Screen Reader Support

- **Announcement**: New toasts are announced immediately
- **Context**: Clear relationship between title and description
- **Actions**: Action buttons are properly labeled

## Swipe Gestures

The toast components support touch gestures:

```tsx
// Swipe events are handled automatically
<Toast
  onSwipeStart={(event) => console.log("Swipe started")}
  onSwipeMove={(event) => console.log("Swipe moving")}
  onSwipeCancel={(event) => console.log("Swipe cancelled")}
  onSwipeEnd={(event) => console.log("Swipe ended")}
>
  {/* Toast content */}
</Toast>
```

## Common Patterns

### Form Validation Toast

```tsx
function FormValidationToast({ errors }: { errors: string[] }) {
  return (
    <Toast variant="destructive">
      <ToastTitle>Validation Error</ToastTitle>
      <ToastDescription>
        <ul className="list-disc list-inside">
          {errors.map((error, index) => (
            <li key={index}>{error}</li>
          ))}
        </ul>
      </ToastDescription>
      <ToastClose />
    </Toast>
  );
}
```

### Loading Toast

```tsx
function LoadingToast({ isLoading }: { isLoading: boolean }) {
  return (
    <Toast open={isLoading}>
      <div className="flex items-center gap-2">
        <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        <ToastTitle>Processing...</ToastTitle>
      </div>
      <ToastDescription>
        Please wait while we process your request.
      </ToastDescription>
    </Toast>
  );
}
```

## Use Cases

- **Form Feedback**: Validation errors and success messages
- **Action Confirmations**: Confirm destructive actions
- **System Notifications**: Status updates and alerts
- **Error Handling**: Display errors with retry options
- **Progress Updates**: Show operation progress
- **Undo Actions**: Provide undo functionality
- **Real-time Updates**: Live notifications

## Best Practices

- Always provide meaningful titles and descriptions
- Use appropriate variants for message types
- Include action buttons for actionable notifications
- Ensure sufficient contrast for accessibility
- Test with screen readers and keyboard navigation
- Don't overwhelm users with too many toasts
- Provide clear dismissal options
- Use consistent timing for auto-dismiss

## Dependencies

- **@radix-ui/react-toast**: Core toast functionality
- **class-variance-authority**: Variant management
- **lucide-react**: Close icon
- **Tailwind CSS**: Styling system
- **React**: Component framework
