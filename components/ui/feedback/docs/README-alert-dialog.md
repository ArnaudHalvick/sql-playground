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
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Screen reader support and ARIA attributes

## Components

### AlertDialog

The root component that manages dialog state.

### AlertDialogTrigger

Button or element that opens the dialog.

### AlertDialogContent

The main dialog container with backdrop and positioning.

### AlertDialogHeader

Header section for title and description layout.

### AlertDialogFooter

Footer section for action buttons layout.

### AlertDialogTitle

Title component for the dialog header.

### AlertDialogDescription

Description component for detailed information.

### AlertDialogAction

Primary action button (usually destructive or confirmative).

### AlertDialogCancel

Cancel/dismiss button for the dialog.

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

### Logout Confirmation

```tsx
function LogoutConfirmation({ onLogout }: { onLogout: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 border rounded hover:bg-muted">
          Sign Out
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sign out of your account?</AlertDialogTitle>
          <AlertDialogDescription>
            You will be signed out of your account and redirected to the login
            page. Any unsaved changes will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Stay signed in</AlertDialogCancel>
          <AlertDialogAction onClick={onLogout}>Sign out</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Unsaved Changes Warning

```tsx
function UnsavedChangesDialog({
  hasChanges,
  onDiscard,
  onSave,
}: {
  hasChanges: boolean;
  onDiscard: () => void;
  onSave: () => void;
}) {
  if (!hasChanges) return null;

  return (
    <AlertDialog defaultOpen={hasChanges}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved changes. What would you like to do?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onDiscard}>
            Discard Changes
          </AlertDialogCancel>
          <AlertDialogAction onClick={onSave}>Save Changes</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Controlled Dialog

```tsx
function ControlledDialog() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await performAction();
      setOpen(false);
    } catch (error) {
      console.error("Action failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <button onClick={() => setOpen(true)}>Perform Action</button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Action</AlertDialogTitle>
          <AlertDialogDescription>
            This will perform an irreversible action. Are you sure?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConfirm} disabled={isLoading}>
            {isLoading ? "Processing..." : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Custom Styled Dialog

```tsx
function CustomStyledDialog() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
          Custom Dialog
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="text-yellow-600 text-xl">⚠️</span>
          </div>
          <AlertDialogTitle className="text-xl">Warning</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            This action requires special attention. Please review carefully
            before proceeding.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-row gap-2">
          <AlertDialogCancel className="w-full sm:w-auto">
            Go Back
          </AlertDialogCancel>
          <AlertDialogAction className="w-full sm:w-auto bg-yellow-600 hover:bg-yellow-700">
            I Understand
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Multi-step Confirmation

```tsx
function MultiStepConfirmation() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    } else {
      setConfirmed(true);
      // Perform action
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="px-4 py-2 bg-destructive text-destructive-foreground rounded">
          Delete Everything
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {step === 1 ? "Delete All Data?" : "Final Confirmation"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {step === 1
              ? "This will permanently delete all your data, including files, settings, and account information."
              : 'Type "DELETE" below to confirm this irreversible action.'}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {step === 2 && (
          <div className="py-4">
            <input
              type="text"
              placeholder="Type DELETE to confirm"
              className="w-full px-3 py-2 border rounded"
              onChange={(e) => setConfirmed(e.target.value === "DELETE")}
            />
          </div>
        )}

        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setStep(1)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleNext}
            disabled={step === 2 && !confirmed}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {step === 1 ? "Continue" : "Delete Everything"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Styling Features

### Default Styling

- **Backdrop**: Semi-transparent black overlay
- **Content**: Centered modal with shadow and border
- **Animations**: Smooth fade and scale transitions
- **Responsive**: Adapts to mobile and desktop layouts

### Animation Classes

```css
/* Enter animations */
data-[state=open]:animate-in
data-[state=open]:fade-in-0
data-[state=open]:zoom-in-95
data-[state=open]:slide-in-from-left-1/2
data-[state=open]:slide-in-from-top-[48%]

/* Exit animations */
data-[state=closed]:animate-out
data-[state=closed]:fade-out-0
data-[state=closed]:zoom-out-95
data-[state=closed]:slide-out-to-left-1/2
data-[state=closed]:slide-out-to-top-[48%]
```

### Layout Structure

- **Header**: Flex column with center/left text alignment
- **Footer**: Flex row with responsive column layout on mobile
- **Content**: Grid layout with proper spacing
- **Positioning**: Fixed positioning with center alignment

## Accessibility Features

### ARIA Support

- **Role**: Proper dialog and alertdialog roles
- **Labels**: aria-labelledby and aria-describedby associations
- **Focus Management**: Automatic focus trapping and restoration
- **Escape Handling**: Dismissible with escape key

### Keyboard Navigation

- **Tab Navigation**: Cycles through interactive elements
- **Enter/Space**: Activates focused buttons
- **Escape**: Closes the dialog
- **Focus Trapping**: Keeps focus within dialog

### Screen Reader Support

- **Announcement**: Dialog content is announced when opened
- **Context**: Clear relationship between title and description
- **Actions**: Button purposes are clearly communicated

## Advanced Usage

### Programmatic Control

```tsx
function ProgrammaticDialog() {
  const [open, setOpen] = useState(false);

  const showDialog = () => setOpen(true);
  const hideDialog = () => setOpen(false);

  useEffect(() => {
    // Show dialog based on some condition
    if (someCondition) {
      showDialog();
    }
  }, [someCondition]);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>{/* Dialog content */}</AlertDialogContent>
    </AlertDialog>
  );
}
```

### Custom Trigger

```tsx
function CustomTrigger() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="cursor-pointer p-4 border rounded hover:bg-muted">
          <h3>Click to confirm</h3>
          <p className="text-sm text-muted-foreground">
            This will open a confirmation dialog
          </p>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>{/* Dialog content */}</AlertDialogContent>
    </AlertDialog>
  );
}
```

### Nested Dialogs (Not Recommended)

```tsx
// Generally avoid nesting dialogs, but if necessary:
function NestedDialogs() {
  return (
    <AlertDialog>
      <AlertDialogTrigger>Open First Dialog</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>First Dialog</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <button>Open Second Dialog</button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Second Dialog</AlertDialogTitle>
              </AlertDialogHeader>
            </AlertDialogContent>
          </AlertDialog>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Common Patterns

### Form Submission Confirmation

```tsx
function FormSubmissionDialog({ onSubmit }: { onSubmit: () => void }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Submit Form
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Submit Form?</AlertDialogTitle>
          <AlertDialogDescription>
            Once submitted, you won't be able to edit this form. Please review
            your information before continuing.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Review Again</AlertDialogCancel>
          <AlertDialogAction onClick={onSubmit}>Submit</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

### Error Dialog

```tsx
function ErrorDialog({
  error,
  onRetry,
}: {
  error: string;
  onRetry: () => void;
}) {
  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-destructive">
            Error Occurred
          </AlertDialogTitle>
          <AlertDialogDescription>{error}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
          <AlertDialogAction onClick={onRetry}>Try Again</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
```

## Use Cases

- **Delete Confirmations**: Confirm destructive actions
- **Form Submissions**: Confirm important form submissions
- **Logout Confirmations**: Confirm user sign-out
- **Unsaved Changes**: Warn about losing unsaved work
- **Critical Warnings**: Display important system warnings
- **Account Actions**: Confirm account-related changes
- **Data Loss Prevention**: Prevent accidental data loss
- **Terms Acceptance**: Require explicit agreement

## Best Practices

- Use for critical actions that can't be easily undone
- Keep titles concise and descriptive
- Provide clear, specific descriptions
- Use appropriate button labels (not just "OK" and "Cancel")
- Consider the severity of the action when styling
- Don't overuse - reserve for truly important confirmations
- Ensure keyboard navigation works properly
- Test with screen readers for accessibility
- Provide clear escape routes for users

## Dependencies

- **@radix-ui/react-alert-dialog**: Core dialog functionality
- **@/components/ui/inputs/button**: Button variants for actions
- **Tailwind CSS**: Styling system
- **React**: Component framework
