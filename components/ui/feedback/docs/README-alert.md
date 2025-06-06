# Alert Component

## Overview

The Alert component is a flexible notification system for displaying important messages to users. It provides different visual variants for various types of feedback and supports icons, titles, and descriptions for comprehensive messaging.

## Features

- **Multiple Variants**: Default and destructive styling options
- **Icon Support**: Automatic positioning and styling for icons
- **Structured Content**: Separate title and description components
- **Accessibility**: Built-in ARIA role for screen readers
- **Responsive Design**: Adapts to different screen sizes
- **Customizable**: Flexible styling through className props

## Components

### Alert

The main container component with variant styling.

```typescript
interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "destructive";
  className?: string;
}
```

### AlertTitle

Header component for the alert message.

```typescript
interface AlertTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}
```

### AlertDescription

Content component for detailed alert information.

```typescript
interface AlertDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
}
```

## Usage Examples

### Basic Alert

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/feedback/alert";

function BasicAlert() {
  return (
    <Alert>
      <AlertTitle>Information</AlertTitle>
      <AlertDescription>
        This is a basic alert message to inform users about something important.
      </AlertDescription>
    </Alert>
  );
}
```

### Alert with Icon

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/feedback/alert";
import { InfoIcon } from "lucide-react";

function IconAlert() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Heads up!</AlertTitle>
      <AlertDescription>
        You can add components to your app using the cli.
      </AlertDescription>
    </Alert>
  );
}
```

### Destructive Alert

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/feedback/alert";
import { AlertTriangleIcon } from "lucide-react";

function ErrorAlert() {
  return (
    <Alert variant="destructive">
      <AlertTriangleIcon className="h-4 w-4" />
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
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/feedback/alert";
import { CheckCircleIcon } from "lucide-react";

function SuccessAlert() {
  return (
    <Alert className="border-green-200 bg-green-50 text-green-800">
      <CheckCircleIcon className="h-4 w-4" />
      <AlertTitle>Success!</AlertTitle>
      <AlertDescription>
        Your changes have been saved successfully.
      </AlertDescription>
    </Alert>
  );
}
```

### Warning Alert

```tsx
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/feedback/alert";
import { AlertTriangleIcon } from "lucide-react";

function WarningAlert() {
  return (
    <Alert className="border-yellow-200 bg-yellow-50 text-yellow-800">
      <AlertTriangleIcon className="h-4 w-4" />
      <AlertTitle>Warning</AlertTitle>
      <AlertDescription>
        This action cannot be undone. Please proceed with caution.
      </AlertDescription>
    </Alert>
  );
}
```

## Variants

### Default

- **Background**: Uses theme background color
- **Text**: Uses theme foreground color
- **Border**: Standard border styling
- **Use Case**: General information and neutral messages

### Destructive

- **Background**: Error/destructive background
- **Text**: Destructive text color
- **Border**: Destructive border color
- **Use Case**: Error messages, warnings, critical alerts

## Styling Features

### Icon Integration

The component automatically handles icon positioning:

```css
[&>svg~*]:pl-7          /* Content padding when icon present */
[&>svg+div]:translate-y-[-3px]  /* Vertical alignment adjustment */
[&>svg]:absolute        /* Absolute positioning for icons */
[&>svg]:left-4          /* Left positioning */
[&>svg]:top-4           /* Top positioning */
```

### Layout Structure

- **Full Width**: Takes full width of container
- **Rounded Corners**: Consistent border radius
- **Padding**: Comfortable internal spacing
- **Border**: Subtle border for definition

### Typography

- **Title**: Medium font weight, tight tracking
- **Description**: Smaller text size, relaxed line height
- **Hierarchy**: Clear visual distinction between title and content

## Accessibility Features

### ARIA Support

- **Role**: Automatically includes `role="alert"` for screen readers
- **Semantic HTML**: Uses proper heading elements for titles
- **Focus Management**: Proper focus handling for interactive elements

### Screen Reader Support

- **Announcement**: Alert role ensures immediate announcement
- **Structure**: Logical heading and content structure
- **Context**: Clear relationship between title and description

## Customization Options

### Custom Styling

```tsx
<Alert className="border-blue-200 bg-blue-50 text-blue-800">
  <AlertTitle className="text-blue-900">Custom Title</AlertTitle>
  <AlertDescription className="text-blue-700">
    Custom description with different colors.
  </AlertDescription>
</Alert>
```

### Size Variations

```tsx
// Compact alert
<Alert className="p-2">
  <AlertTitle className="text-xs">Small Alert</AlertTitle>
  <AlertDescription className="text-xs">
    Compact version for limited space.
  </AlertDescription>
</Alert>

// Large alert
<Alert className="p-6">
  <AlertTitle className="text-lg">Large Alert</AlertTitle>
  <AlertDescription className="text-base">
    Expanded version for important messages.
  </AlertDescription>
</Alert>
```

## Common Patterns

### Dismissible Alert

```tsx
function DismissibleAlert() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Notification</AlertTitle>
      <AlertDescription>This is a dismissible alert message.</AlertDescription>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-2 rounded-md p-1 hover:bg-muted"
      >
        <X className="h-4 w-4" />
      </button>
    </Alert>
  );
}
```

### Alert with Actions

```tsx
function ActionAlert() {
  return (
    <Alert>
      <InfoIcon className="h-4 w-4" />
      <AlertTitle>Update Available</AlertTitle>
      <AlertDescription>
        A new version is available. Would you like to update now?
      </AlertDescription>
      <div className="mt-3 flex gap-2">
        <Button size="sm">Update Now</Button>
        <Button variant="outline" size="sm">
          Later
        </Button>
      </div>
    </Alert>
  );
}
```

## Use Cases

- **Form Validation**: Display validation errors and success messages
- **System Notifications**: Show system status and updates
- **User Feedback**: Confirm user actions and operations
- **Error Handling**: Display error messages and troubleshooting info
- **Warnings**: Alert users about potential issues or consequences
- **Information**: Provide helpful tips and contextual information

## Best Practices

- Use appropriate variants for message types
- Include clear, actionable titles
- Provide specific, helpful descriptions
- Use icons to reinforce message meaning
- Consider dismissibility for non-critical alerts
- Ensure sufficient color contrast for accessibility
- Test with screen readers for proper announcement

## Dependencies

- **class-variance-authority**: For variant management
- **Tailwind CSS**: For styling system
- **Lucide React**: For icons (optional)
