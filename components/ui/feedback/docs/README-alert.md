# Alert Component

## Overview

The Alert component displays important messages, notifications, or status information to users. It provides different visual variants to communicate various types of information effectively with proper accessibility support.

## Features

- **Multiple Variants**: Default, destructive, and custom styling options
- **Icon Support**: Optional icons for visual context
- **Flexible Content**: Supports titles, descriptions, and custom content
- **Accessibility**: Proper ARIA roles and screen reader support
- **Responsive**: Adapts to different screen sizes
- **Dismissible**: Optional close functionality

## Components

- **Alert**: Main container component
- **AlertTitle**: Title/heading component
- **AlertDescription**: Description text component

## Props Interface

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  className?: string;
}
```

## Usage Examples

### Basic Alert

```tsx
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/feedback/alert";

function BasicAlert() {
  return (
    <Alert>
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
```

### Alert with Icon

```tsx
import { AlertCircle } from "lucide-react";

function AlertWithIcon() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}
```

### Destructive Alert

```tsx
function DestructiveAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>
  );
}
```

### Success Alert

```tsx
import { CheckCircle } from "lucide-react";

function SuccessAlert() {
  return (
    <Alert className="border-green-200 bg-green-50 text-green-800">
      <CheckCircle className="h-4 w-4" />
      <AlertTitle>Success</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  );
}
```

### Warning Alert

```tsx
import { AlertTriangle } from "lucide-react";

function WarningAlert() {
  return (
    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  );
}
```

### Info Alert

```tsx
import { Info } from "lucide-react";

function InfoAlert() {
  return (
    <Alert className="border-blue-200 bg-blue-50 text-blue-800">
      <Info className="h-4 w-4" />
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        New features are available. Check out the latest updates.
      </AlertDescription>
    </Alert>
  );
}
```

### Dismissible Alert

```tsx
import { X } from "lucide-react";

function DismissibleAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert className="relative">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>This is a dismissible alert message.</AlertDescription>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute top-2 right-2 p-1 rounded-sm hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
```

### Alert with Actions

```tsx
function AlertWithActions() {
  return (
    <Alert>
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new version of the application is available.
      </AlertDescription>
      <div className="mt-4 flex space-x-2">
        <button className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm">
          Update Now
        </button>
        <button className="px-3 py-1 border rounded text-sm">Later</button>
      </div>
    </Alert>
  );
}
```

## Variants

### Default

- **Background**: Subtle background color
- **Border**: Light border
- **Text**: Standard foreground color
- **Use Case**: General information and notifications

### Destructive

- **Background**: Red/error background
- **Border**: Red border
- **Text**: Error text color
- **Use Case**: Errors, warnings, and critical alerts

## Styling Features

- **Layout**: Flexible container with proper spacing
- **Typography**: Clear hierarchy with title and description
- **Icons**: Consistent icon sizing and positioning
- **Responsive**: Adapts to container width
- **Customizable**: Easy styling through className props

## Accessibility Features

- **ARIA Role**: Proper alert role for screen readers
- **Semantic HTML**: Meaningful structure
- **Color Independence**: Not relying solely on color
- **Focus Management**: Proper focus handling for interactive elements

## Best Practices

- Use appropriate variants for different message types
- Include clear, actionable titles
- Provide specific descriptions when needed
- Use icons to reinforce message type
- Consider dismissibility for non-critical alerts
- Test with screen readers for accessibility
- Don't overwhelm users with too many alerts

## Common Use Cases

- Form validation errors
- Success confirmations
- System status notifications
- Warning messages
- Information announcements
- Update notifications
- Error handling
- User feedback
