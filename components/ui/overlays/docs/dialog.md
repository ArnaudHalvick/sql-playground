# Dialog

A modal dialog component that overlays content on top of the main interface. Built on Radix UI's Dialog primitive.

## Features

- Modal overlay with backdrop
- Focus management and keyboard navigation (ESC to close)
- Customizable positioning and smooth animations
- Accessible by default with portal rendering

## Installation

```bash
npm install @radix-ui/react-dialog lucide-react
```

## Basic Usage

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/button";

export function DialogDemo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Key Components

### Dialog

Root component managing dialog state.

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `modal?: boolean` - Whether dialog is modal (default: true)

### DialogTrigger

Button that opens the dialog.

- `asChild?: boolean` - Change rendered element (default: false)

### DialogContent

Content container for the dialog.

- `className?: string` - Additional CSS classes
- `onPointerDownOutside?: (event) => void` - Outside click callback
- `onEscapeKeyDown?: (event) => void` - Escape key callback

### DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose

Layout and content components with standard `className` and `children` props.

## Common Examples

### Confirmation Dialog

```tsx
function ConfirmationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Delete Account</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline">Cancel</Button>
          <Button variant="destructive">Delete Account</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Form Dialog

```tsx
function FormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>Enter the user details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input id="email" type="email" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

### Controlled Dialog

```tsx
function ControlledDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Controlled Dialog</DialogTitle>
        </DialogHeader>
        <p>This dialog's state is controlled externally.</p>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
```

## Best Practices

- Use `DialogDescription` for accessibility
- Keep content focused and concise
- Provide clear actions in `DialogFooter`
- Use `asChild` prop to customize trigger elements
- Handle form submissions properly in form dialogs
