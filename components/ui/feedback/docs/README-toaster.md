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

## Toast Options

```tsx
toast({
  title: "Title",
  description: "Description text",
  variant: "default" | "destructive",
  duration: 5000, // milliseconds
  action: <ToastAction altText="Undo">Undo</ToastAction>,
});
```

## Common Usage Patterns

### Success Toast

```tsx
const showSuccess = () => {
  toast({
    title: "Success",
    description: "Operation completed successfully.",
  });
};
```

### Error Toast

```tsx
const showError = () => {
  toast({
    title: "Error",
    description: "Something went wrong.",
    variant: "destructive",
  });
};
```

### Toast with Action

```tsx
const showWithAction = () => {
  toast({
    title: "File deleted",
    description: "Your file has been deleted.",
    action: (
      <ToastAction altText="Undo" onClick={handleUndo}>
        Undo
      </ToastAction>
    ),
  });
};
```

## Implementation Notes

- The Toaster component automatically reads toast state from the useToast hook context
- Toasts are automatically dismissed after a default duration (5 seconds)
- Maximum of 1 toast is shown at a time by default
- Toasts stack vertically when multiple are triggered
- The component handles all positioning, animations, and accessibility features
- No props are required - the component manages everything internally

## Accessibility

- Screen reader announcements for new toasts
- Keyboard navigation support
- Focus management for interactive elements
- ARIA labels and descriptions
- Proper semantic markup

## Styling

The component uses CSS classes for styling and supports theme customization through CSS variables. All animations and transitions are handled automatically.
