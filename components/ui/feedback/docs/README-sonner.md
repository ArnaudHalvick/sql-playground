# Sonner Toast Component

## Overview

Sonner is a modern, opinionated toast component for React applications. It provides a simple API for displaying notifications with beautiful animations, positioning, and automatic stacking. This is an alternative to the custom Toast components with a more streamlined approach.

## Features

- **Simple API**: Easy-to-use toast function
- **Beautiful Animations**: Smooth enter/exit animations
- **Auto Stacking**: Intelligent toast stacking and positioning
- **Rich Content**: Support for custom JSX content
- **Promise Integration**: Built-in loading, success, and error states
- **Customizable**: Themes, positioning, and styling options
- **Accessibility**: Screen reader support and keyboard navigation
- **TypeScript**: Full TypeScript support

## Installation & Setup

### Install Sonner

```bash
npm install sonner
```

### Add Toaster to Your App

```tsx
// app/layout.tsx (Next.js App Router)
import { Toaster } from "sonner";

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

## Basic Usage

### Simple Toast

```tsx
import { toast } from "sonner";

function MyComponent() {
  return <button onClick={() => toast("Hello World!")}>Show Toast</button>;
}
```

### Toast Types

```tsx
import { toast } from "sonner";

function ToastTypes() {
  return (
    <div className="space-x-2">
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
function DescriptionToast() {
  return (
    <button
      onClick={() =>
        toast("Event has been created", {
          description: "Sunday, December 03, 2023 at 9:00 AM",
        })
      }
    >
      Show Event Toast
    </button>
  );
}
```

### Toast with Action

```tsx
function ActionToast() {
  return (
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
      Show Action Toast
    </button>
  );
}
```

### Promise Toast

```tsx
function PromiseToast() {
  const handleSubmit = () => {
    const promise = fetch("/api/submit").then((res) => res.json());

    toast.promise(promise, {
      loading: "Submitting...",
      success: "Form submitted successfully!",
      error: "Failed to submit form",
    });
  };

  return <button onClick={handleSubmit}>Submit Form</button>;
}
```

### Custom Toast

```tsx
function CustomToast() {
  return (
    <button
      onClick={() =>
        toast(
          <div className="flex items-center gap-2">
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-muted-foreground">
                Sent you a message
              </p>
            </div>
          </div>
        )
      }
    >
      Custom Toast
    </button>
  );
}
```

## Configuration

### Toaster Props

```tsx
<Toaster
  position="top-right"
  expand={false}
  richColors
  closeButton
  toastOptions={{
    duration: 4000,
    className: "my-toast",
  }}
/>
```

### Available Positions

- `top-left`
- `top-center`
- `top-right`
- `bottom-left`
- `bottom-center`
- `bottom-right`

### Toast Options

```tsx
toast("Message", {
  duration: 5000,
  position: "top-center",
  dismissible: true,
  className: "custom-toast",
  style: {
    background: "red",
  },
  onDismiss: (t) => console.log(`Toast with id ${t.id} has been dismissed`),
  onAutoClose: (t) =>
    console.log(`Toast with id ${t.id} has been closed automatically`),
});
```

## Advanced Usage

### Programmatic Control

```tsx
import { toast } from "sonner";

function ProgrammaticControl() {
  const toastId = toast("Loading...", { duration: Infinity });

  const updateToast = () => {
    toast.success("Success!", { id: toastId });
  };

  const dismissToast = () => {
    toast.dismiss(toastId);
  };

  return (
    <div className="space-x-2">
      <button onClick={updateToast}>Update Toast</button>
      <button onClick={dismissToast}>Dismiss Toast</button>
      <button onClick={() => toast.dismiss()}>Dismiss All</button>
    </div>
  );
}
```

### Custom Styling

```tsx
// Custom theme
<Toaster
  theme="dark"
  className="toaster group"
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

## Best Practices

- Use appropriate toast types for different message categories
- Keep messages concise and actionable
- Provide actions for reversible operations
- Use promise toasts for async operations
- Don't overwhelm users with too many toasts
- Test accessibility with screen readers
- Consider toast positioning based on your app layout

## Common Use Cases

- Form submission feedback
- API request status updates
- User action confirmations
- Error handling and reporting
- Success notifications
- Loading states for async operations
- Undo functionality
