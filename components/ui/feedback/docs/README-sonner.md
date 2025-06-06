# Sonner (Toaster) Component

## Overview

The Sonner component is a modern toast notification system built on the Sonner library. It provides beautiful, accessible toast notifications with automatic theme detection, smooth animations, and comprehensive customization options.

## Features

- **Automatic Theme Detection**: Syncs with your app's theme system
- **Beautiful Animations**: Smooth slide-in/out animations
- **Accessible**: Screen reader support and keyboard navigation
- **Customizable**: Flexible styling through className props
- **Action Support**: Buttons and interactive elements in toasts
- **Auto-dismiss**: Configurable auto-dismiss timing
- **Position Control**: Multiple positioning options

## Props Interface

```typescript
interface ToasterProps extends React.ComponentProps<typeof Sonner> {
  // All Sonner props are supported
  theme?: "light" | "dark" | "system";
  position?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
  expand?: boolean;
  richColors?: boolean;
  closeButton?: boolean;
  // ... and many more Sonner options
}
```

## Setup

### 1. Add Toaster to Your App

```tsx
// app/layout.tsx or _app.tsx
import { Toaster } from "@/components/ui/feedback/sonner";

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

### 2. Use Toast Function

```tsx
import { toast } from "sonner";

function MyComponent() {
  const showToast = () => {
    toast("Hello World!");
  };

  return <button onClick={showToast}>Show Toast</button>;
}
```

## Usage Examples

### Basic Toasts

```tsx
import { toast } from "sonner";

function BasicToasts() {
  return (
    <div className="space-x-2">
      <button onClick={() => toast("Basic message")}>Basic</button>

      <button onClick={() => toast.success("Success message")}>Success</button>

      <button onClick={() => toast.error("Error message")}>Error</button>

      <button onClick={() => toast.warning("Warning message")}>Warning</button>

      <button onClick={() => toast.info("Info message")}>Info</button>
    </div>
  );
}
```

### Toast with Description

```tsx
function DescriptiveToasts() {
  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          toast("Event has been created", {
            description: "Sunday, December 03, 2023 at 9:00 AM",
          })
        }
      >
        With Description
      </button>

      <button
        onClick={() =>
          toast.success("Payment successful", {
            description: "Your payment has been processed successfully.",
          })
        }
      >
        Success with Description
      </button>
    </div>
  );
}
```

### Toast with Actions

```tsx
function ActionToasts() {
  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          toast("Event has been created", {
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          })
        }
      >
        With Action
      </button>

      <button
        onClick={() =>
          toast.error("Something went wrong", {
            action: {
              label: "Retry",
              onClick: () => console.log("Retry"),
            },
          })
        }
      >
        Error with Action
      </button>
    </div>
  );
}
```

### Custom Toast Duration

```tsx
function DurationToasts() {
  return (
    <div className="space-x-2">
      <button onClick={() => toast("Quick message", { duration: 1000 })}>
        1 Second
      </button>

      <button onClick={() => toast("Long message", { duration: 10000 })}>
        10 Seconds
      </button>

      <button
        onClick={() => toast("Persistent message", { duration: Infinity })}
      >
        Persistent
      </button>
    </div>
  );
}
```

### Loading Toast

```tsx
function LoadingToast() {
  const handleAsyncAction = async () => {
    const toastId = toast.loading("Uploading file...");

    try {
      // Simulate async operation
      await new Promise((resolve) => setTimeout(resolve, 3000));

      toast.success("File uploaded successfully!", {
        id: toastId,
      });
    } catch (error) {
      toast.error("Failed to upload file", {
        id: toastId,
      });
    }
  };

  return <button onClick={handleAsyncAction}>Upload File</button>;
}
```

### Promise Toast

```tsx
function PromiseToast() {
  const handlePromise = () => {
    const myPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Success!") : reject("Error!");
      }, 2000);
    });

    toast.promise(myPromise, {
      loading: "Processing...",
      success: (data) => `Operation completed: ${data}`,
      error: (error) => `Operation failed: ${error}`,
    });
  };

  return <button onClick={handlePromise}>Promise Toast</button>;
}
```

### Custom Styled Toast

```tsx
function CustomToast() {
  return (
    <div className="space-x-2">
      <button
        onClick={() =>
          toast("Custom styled toast", {
            className: "bg-blue-500 text-white border-blue-600",
          })
        }
      >
        Custom Style
      </button>

      <button
        onClick={() =>
          toast.success("Success with custom style", {
            className: "bg-green-500 text-white",
            style: {
              background: "linear-gradient(45deg, #10b981, #059669)",
            },
          })
        }
      >
        Gradient Success
      </button>
    </div>
  );
}
```

## Toaster Configuration

### Basic Configuration

```tsx
function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster position="top-right" richColors closeButton />
    </>
  );
}
```

### Advanced Configuration

```tsx
function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster
        position="bottom-center"
        expand={true}
        richColors={true}
        closeButton={true}
        toastOptions={{
          duration: 4000,
          style: {
            background: "var(--background)",
            color: "var(--foreground)",
            border: "1px solid var(--border)",
          },
          className: "my-toast",
          descriptionClassName: "my-toast-description",
        }}
      />
    </>
  );
}
```

## Theme Integration

The component automatically detects and applies your app's theme:

```tsx
// The component uses next-themes to detect theme
const { theme = "system" } = useTheme();

return (
  <Sonner
    theme={theme as ToasterProps["theme"]}
    // ... other props
  />
);
```

## Styling Features

### Default Styling

- **Background**: Uses CSS variables for theme colors
- **Border**: Consistent with design system
- **Shadow**: Subtle shadow for depth
- **Typography**: Proper text sizing and colors

### Custom Class Names

```tsx
<Toaster
  toastOptions={{
    classNames: {
      toast:
        "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
      description: "group-[.toast]:text-muted-foreground",
      actionButton:
        "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
      cancelButton:
        "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
    },
  }}
/>
```

## Advanced Usage

### Dismissing Toasts

```tsx
function DismissToasts() {
  const showDismissibleToast = () => {
    const toastId = toast("This toast can be dismissed", {
      duration: Infinity,
    });

    // Dismiss after 5 seconds
    setTimeout(() => {
      toast.dismiss(toastId);
    }, 5000);
  };

  return (
    <div className="space-x-2">
      <button onClick={showDismissibleToast}>Show Dismissible</button>

      <button onClick={() => toast.dismiss()}>Dismiss All</button>
    </div>
  );
}
```

### Toast with Custom Content

```tsx
function CustomContentToast() {
  const showCustomToast = () => {
    toast.custom((t) => (
      <div className="flex items-center gap-3 bg-white border rounded-lg p-4 shadow-lg">
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center">
          <span className="text-white text-sm font-bold">!</span>
        </div>
        <div className="flex-1">
          <h4 className="font-semibold">Custom Toast</h4>
          <p className="text-sm text-gray-600">
            This is a completely custom toast
          </p>
        </div>
        <button
          onClick={() => toast.dismiss(t)}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>
    ));
  };

  return <button onClick={showCustomToast}>Custom Content</button>;
}
```

## Accessibility Features

### Screen Reader Support

- **ARIA Labels**: Proper labeling for toast content
- **Live Regions**: Automatic announcement of new toasts
- **Focus Management**: Proper focus handling for actions

### Keyboard Navigation

- **Escape Key**: Dismiss focused toast
- **Tab Navigation**: Navigate through toast actions
- **Enter/Space**: Activate toast actions

## Common Patterns

### Form Submission Feedback

```tsx
function FormWithToast() {
  const handleSubmit = async (formData: FormData) => {
    const toastId = toast.loading("Saving changes...");

    try {
      await saveData(formData);
      toast.success("Changes saved successfully!", { id: toastId });
    } catch (error) {
      toast.error("Failed to save changes", {
        id: toastId,
        action: {
          label: "Retry",
          onClick: () => handleSubmit(formData),
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <button type="submit">Save</button>
    </form>
  );
}
```

### Undo Functionality

```tsx
function UndoToast() {
  const deleteItem = (id: string) => {
    // Optimistically remove item
    removeItemFromUI(id);

    toast("Item deleted", {
      action: {
        label: "Undo",
        onClick: () => {
          restoreItemToUI(id);
          toast.success("Item restored");
        },
      },
    });
  };

  return <button onClick={() => deleteItem("123")}>Delete Item</button>;
}
```

## Use Cases

- **Form Feedback**: Success/error messages for form submissions
- **Action Confirmations**: Confirm user actions like delete, save
- **Loading States**: Show progress for async operations
- **Error Handling**: Display error messages with retry options
- **Notifications**: System notifications and updates
- **Undo Actions**: Provide undo functionality for destructive actions
- **Status Updates**: Real-time status updates

## Best Practices

- Use appropriate toast types for different message types
- Keep messages concise and actionable
- Provide undo options for destructive actions
- Use loading toasts for long-running operations
- Don't overuse toasts - they can be disruptive
- Ensure sufficient contrast for accessibility
- Test with screen readers
- Consider toast positioning based on your app layout

## Dependencies

- **sonner**: Core toast functionality
- **next-themes**: Theme detection
- **React**: Component framework
