# Toaster Component

## Overview

The Toaster component is a complete toast notification system that renders and manages toast messages using the underlying Toast components. It provides a centralized way to display notifications with proper positioning, stacking, and lifecycle management.

## Features

- **Centralized Management**: Single component handles all toast rendering
- **Hook Integration**: Works seamlessly with useToast hook
- **Automatic Positioning**: Proper viewport positioning and stacking
- **Lifecycle Management**: Handles toast creation, display, and dismissal
- **Accessibility**: Full screen reader and keyboard support
- **Responsive Design**: Adapts to different screen sizes
- **Theme Integration**: Consistent with design system

## Props Interface

The Toaster component doesn't accept props directly - it reads toast state from the useToast hook context.

```typescript
// The component automatically renders toasts from the hook
function Toaster(): JSX.Element;
```

## Setup and Usage

### 1. Add Toaster to Your App

```tsx
// app/layout.tsx (Next.js App Router)
import { Toaster } from "@/components/ui/feedback/toaster";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
```

```tsx
// _app.tsx (Next.js Pages Router)
import { Toaster } from "@/components/ui/feedback/toaster";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}
```

```tsx
// App.tsx (React)
import { Toaster } from "@/components/ui/feedback/toaster";

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <Toaster />
    </div>
  );
}
```

### 2. Use the Toast Hook

```tsx
import { useToast } from "@/hooks/use-toast";

function MyComponent() {
  const { toast } = useToast();

  const showToast = () => {
    toast({
      title: "Success!",
      description: "Your action was completed successfully.",
    });
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## Complete Implementation

### useToast Hook

```tsx
// hooks/use-toast.ts
import { useState, useCallback } from "react";
import type {
  ToastActionElement,
  ToastProps,
} from "@/components/ui/feedback/toast";

const TOAST_LIMIT = 1;
const TOAST_REMOVE_DELAY = 1000000;

type ToasterToast = ToastProps & {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
};

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      toastId?: ToasterToast["id"];
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      toastId?: ToasterToast["id"];
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const addToRemoveQueue = (toastId: string) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }

  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId: toastId,
    });
  }, TOAST_REMOVE_DELAY);

  toastTimeouts.set(toastId, timeout);
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.toast.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { toastId } = action;

      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast) => {
          addToRemoveQueue(toast.id);
        });
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === toastId || toastId === undefined
            ? {
                ...t,
                open: false,
              }
            : t
        ),
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === undefined) {
        return {
          ...state,
          toasts: [],
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId),
      };
  }
};

const listeners: Array<(state: State) => void> = [];

let memoryState: State = { toasts: [] };

function dispatch(action: Action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}

type Toast = Omit<ToasterToast, "id">;

function toast({ ...props }: Toast) {
  const id = genId();

  const update = (props: ToasterToast) =>
    dispatch({
      type: "UPDATE_TOAST",
      toast: { ...props, id },
    });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });

  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      },
    },
  });

  return {
    id: id,
    dismiss,
    update,
  };
}

function useToast() {
  const [state, setState] = useState<State>(memoryState);

  useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);

  return {
    ...state,
    toast,
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  };
}

export { useToast, toast };
```

### Toaster Component Implementation

```tsx
// components/ui/feedback/toaster.tsx
"use client";

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
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
```

## Usage Examples

### Basic Toast Usage

```tsx
import { useToast } from "@/hooks/use-toast";

function BasicUsage() {
  const { toast } = useToast();

  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          toast({
            title: "Success",
            description: "Your message has been sent.",
          })
        }
      >
        Show Success
      </button>

      <button
        onClick={() =>
          toast({
            variant: "destructive",
            title: "Error",
            description: "Something went wrong.",
          })
        }
      >
        Show Error
      </button>
    </div>
  );
}
```

### Toast with Actions

```tsx
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/feedback/toast";

function ToastWithActions() {
  const { toast } = useToast();

  const showActionToast = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  };

  return <button onClick={showActionToast}>Schedule Meeting</button>;
}
```

### Form Submission with Toast

```tsx
function FormWithToast() {
  const { toast } = useToast();

  const handleSubmit = async (formData: FormData) => {
    try {
      await submitForm(formData);
      toast({
        title: "Form submitted",
        description: "Your form has been submitted successfully.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Submission failed",
        description: "There was an error submitting your form.",
        action: (
          <ToastAction
            altText="Try again"
            onClick={() => handleSubmit(formData)}
          >
            Try again
          </ToastAction>
        ),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Programmatic Toast Management

```tsx
function ToastManagement() {
  const { toast, dismiss } = useToast();

  const showPersistentToast = () => {
    const { id } = toast({
      title: "Persistent notification",
      description: "This will stay until manually dismissed.",
      duration: Infinity,
    });

    // Dismiss after 10 seconds
    setTimeout(() => {
      dismiss(id);
    }, 10000);
  };

  return (
    <div className="space-x-2">
      <button onClick={showPersistentToast}>Show Persistent Toast</button>

      <button onClick={() => dismiss()}>Dismiss All Toasts</button>
    </div>
  );
}
```

## Advanced Patterns

### Toast Queue Management

```tsx
function ToastQueue() {
  const { toast } = useToast();

  const showMultipleToasts = () => {
    // These will be queued and shown one at a time
    toast({ title: "First toast", description: "This is the first message." });
    toast({
      title: "Second toast",
      description: "This is the second message.",
    });
    toast({ title: "Third toast", description: "This is the third message." });
  };

  return <button onClick={showMultipleToasts}>Show Multiple Toasts</button>;
}
```

### Custom Toast Types

```tsx
// Create helper functions for common toast types
function useCustomToast() {
  const { toast } = useToast();

  const success = (message: string) => {
    toast({
      title: "Success",
      description: message,
      className: "border-green-200 bg-green-50 text-green-800",
    });
  };

  const error = (message: string) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: message,
    });
  };

  const warning = (message: string) => {
    toast({
      title: "Warning",
      description: message,
      className: "border-yellow-200 bg-yellow-50 text-yellow-800",
    });
  };

  const info = (message: string) => {
    toast({
      title: "Info",
      description: message,
      className: "border-blue-200 bg-blue-50 text-blue-800",
    });
  };

  return { success, error, warning, info };
}

function CustomToastTypes() {
  const { success, error, warning, info } = useCustomToast();

  return (
    <div className="space-x-2">
      <button onClick={() => success("Operation completed!")}>Success</button>
      <button onClick={() => error("Something went wrong!")}>Error</button>
      <button onClick={() => warning("Please be careful!")}>Warning</button>
      <button onClick={() => info("Here's some information.")}>Info</button>
    </div>
  );
}
```

## Styling and Positioning

### Default Positioning

The Toaster automatically positions toasts in the bottom-right corner on desktop and top on mobile:

```css
/* ToastViewport positioning */
fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4
sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]
```

### Custom Positioning

To customize positioning, you can modify the ToastViewport component or create a custom implementation.

## Accessibility Features

### Screen Reader Support

- **Live Regions**: Toasts are announced when they appear
- **Proper Roles**: Uses appropriate ARIA roles
- **Context**: Clear relationship between title and description

### Keyboard Navigation

- **Focus Management**: Proper focus handling for actions
- **Escape Key**: Dismiss toasts with escape
- **Tab Navigation**: Navigate through toast actions

## Performance Considerations

### Toast Limits

The system limits the number of simultaneous toasts to prevent overwhelming the user:

```typescript
const TOAST_LIMIT = 1; // Only one toast at a time
```

### Memory Management

Toasts are automatically removed from memory after dismissal to prevent memory leaks.

## Use Cases

- **Form Feedback**: Success/error messages for form submissions
- **Action Confirmations**: Confirm user actions
- **System Notifications**: Display system status updates
- **Error Handling**: Show error messages with retry options
- **Progress Updates**: Indicate operation progress
- **Undo Actions**: Provide undo functionality
- **Real-time Updates**: Display live notifications

## Best Practices

- Place the Toaster component at the root level of your app
- Use descriptive titles and descriptions
- Provide action buttons for actionable notifications
- Don't overwhelm users with too many toasts
- Use appropriate variants for different message types
- Test with screen readers for accessibility
- Consider toast duration based on content importance
- Provide clear dismissal options

## Dependencies

- **@/hooks/use-toast**: Toast state management hook
- **@/components/ui/feedback/toast**: Underlying toast components
- **React**: Component framework
