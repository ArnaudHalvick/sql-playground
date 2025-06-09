# AlertDialog Components

## Overview

The AlertDialog components provide a modal dialog system for critical user interactions that require immediate attention. Built on Radix UI primitives, they offer accessible, customizable dialogs for confirmations, warnings, and important notifications that interrupt the user's workflow.

## Features

- **Radix UI Foundation**: Built on accessible dialog primitives
- **Modal Behavior**: Blocks interaction with underlying content
- **Keyboard Navigation**: Full keyboard support with focus management
- **Escape Handling**: Dismissible with escape key
- **Backdrop Click**: Optional dismissal on backdrop click
- **Smooth Animations**: Enter/exit animations with CSS transitions
- **Accessibility**: Screen reader support and ARIA attributes

## Components

- **AlertDialog**: Root component that manages dialog state
- **AlertDialogTrigger**: Button or element that opens the dialog
- **AlertDialogContent**: Main dialog container with backdrop and positioning
- **AlertDialogHeader**: Header section for title and description layout
- **AlertDialogFooter**: Footer section for action buttons layout
- **AlertDialogTitle**: Title component for the dialog header
- **AlertDialogDescription**: Description component for detailed information
- **AlertDialogAction**: Primary action button (usually destructive or confirmative)
- **AlertDialogCancel**: Cancel/dismiss button for the dialog

## Usage Examples

### Basic Confirmation Dialog

```tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/feedback/alert-dialog";

function BasicConfirmation() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded">
          Delete Account
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Delete Confirmation

```tsx
function DeleteConfirmation({
  itemName,
  onDelete,
}: {
  itemName: string;
  onDelete: () => void;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-3 py-1 text-sm bg-destructive text-destructive-foreground rounded">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {itemName}?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The item "{itemName}" will be
            permanently removed from your account.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Programmatic Control

```tsx
function ProgrammaticDialog() {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    // Perform action
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button onClick={() => setOpen(true)}>Open Dialog</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to proceed with this action?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Props

### AlertDialog

```tsx
interface AlertDialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}
```

### AlertDialogTrigger

```tsx
interface AlertDialogTriggerProps {
  asChild?: boolean;
  children: React.ReactNode;
}
```

### AlertDialogContent

```tsx
interface AlertDialogContentProps {
  className?: string;
  children: React.ReactNode;
}
```

## Accessibility Features

- **Focus Management**: Automatic focus trapping within dialog
- **Keyboard Navigation**: Tab navigation between interactive elements
- **Escape Key**: Close dialog with escape key
- **Screen Reader**: Proper ARIA labels and descriptions
- **Focus Return**: Returns focus to trigger element on close

## Best Practices

- Use for critical actions that require user confirmation
- Keep titles concise and descriptive
- Provide clear descriptions of consequences
- Use destructive styling for dangerous actions
- Always provide a cancel option
- Test with keyboard navigation and screen readers

## Common Use Cases

- Account deletion confirmations
- Data loss warnings
- Logout confirmations
- File deletion prompts
- Subscription cancellations
- Irreversible action confirmations
