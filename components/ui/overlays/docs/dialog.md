# Dialog

A modal dialog component that overlays content on top of the main interface. Built on top of Radix UI's Dialog primitive with custom styling and animations.

## Features

- Modal overlay with backdrop
- Focus management and trapping
- Keyboard navigation (ESC to close)
- Customizable positioning
- Smooth animations
- Accessible by default
- Portal rendering

## Installation

```bash
npm install @radix-ui/react-dialog lucide-react
```

## Usage

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

## API Reference

### Dialog

The root component that manages the dialog state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`  | `boolean`                 | `false` | The default open state                     |
| `open`         | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `modal`        | `boolean`                 | `true`  | Whether the dialog is modal                |

### DialogTrigger

The button that opens the dialog.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### DialogContent

The content container for the dialog.

| Prop                   | Type                                       | Default | Description                               |
| ---------------------- | ------------------------------------------ | ------- | ----------------------------------------- |
| `className`            | `string`                                   | -       | Additional CSS classes                    |
| `children`             | `React.ReactNode`                          | -       | The dialog content                        |
| `onPointerDownOutside` | `(event: PointerDownOutsideEvent) => void` | -       | Callback fired when clicking outside      |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void`           | -       | Callback fired when escape key is pressed |

### DialogHeader

A container for the dialog header content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The header content     |

### DialogTitle

The title of the dialog.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The title content      |

### DialogDescription

A description for the dialog.

| Prop        | Type              | Default | Description             |
| ----------- | ----------------- | ------- | ----------------------- |
| `className` | `string`          | -       | Additional CSS classes  |
| `children`  | `React.ReactNode` | -       | The description content |

### DialogFooter

A container for the dialog footer content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The footer content     |

### DialogClose

A button that closes the dialog.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The close button content            |

## Examples

### Confirmation Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/button";

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
            account and remove your data from our servers.
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Enter the user details below. Click save when you're done.
          </DialogDescription>
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
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="role" className="text-right">
              Role
            </Label>
            <select id="role" className="col-span-3 p-2 border rounded">
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/overlays/dialog";
import { Button } from "@/components/ui/button";

function ControlledDialog() {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="space-x-2">
      <Button onClick={() => setOpen(true)}>Open Dialog</Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Controlled Dialog</DialogTitle>
            <DialogDescription>
              This dialog is controlled by external state.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <p>Dialog is currently: {open ? "Open" : "Closed"}</p>
            <Button onClick={() => setOpen(false)} className="mt-4">
              Close Dialog
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
```

### Image Gallery Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/overlays/dialog";

function ImageGalleryDialog() {
  const images = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
  ];

  return (
    <div className="grid grid-cols-3 gap-4">
      {images.map((src, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-32 object-cover rounded cursor-pointer hover:opacity-80"
            />
          </DialogTrigger>
          <DialogContent className="max-w-3xl">
            <img
              src={src}
              alt={`Image ${index + 1}`}
              className="w-full h-auto rounded"
            />
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
}
```

### Settings Dialog

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
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Manage your application preferences.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Push Notifications</Label>
            <Switch id="notifications" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="analytics">Analytics</Label>
            <Switch id="analytics" />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
```

## Styling

The dialog components can be styled using Tailwind CSS classes. The default styles provide a clean, modern appearance with smooth animations.

```tsx
<DialogContent className="sm:max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700">
  <DialogHeader>
    <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
      Custom Styled Dialog
    </DialogTitle>
  </DialogHeader>
</DialogContent>
```

## Accessibility

- Focus is automatically trapped within the dialog
- Pressing ESC closes the dialog
- Clicking the overlay closes the dialog
- Proper ARIA attributes are applied
- Screen reader compatible
- Keyboard navigation support

## Common Use Cases

- User profile editing forms
- Confirmation dialogs for destructive actions
- Image/media viewers
- Settings and preferences panels
- Contact forms and feedback
- Terms of service and privacy policy displays
- Product details and specifications
- Login and registration forms
