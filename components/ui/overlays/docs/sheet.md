# Sheet

A sheet component that slides in from the side of the screen, perfect for navigation menus, forms, and detailed content. Built on top of Radix UI's Dialog primitive with custom styling and directional variants.

## Features

- Slides from any side (top, right, bottom, left)
- Modal overlay with backdrop
- Focus management and trapping
- Keyboard navigation (ESC to close)
- Customizable sizing
- Smooth animations
- Accessible by default
- Portal rendering

## Installation

```bash
npm install @radix-ui/react-dialog class-variance-authority lucide-react
```

## Usage

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";

export function SheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">
              Name
            </label>
            <input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Save changes</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

## API Reference

### Sheet

The root component that manages the sheet state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`  | `boolean`                 | `false` | The default open state                     |
| `open`         | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `modal`        | `boolean`                 | `true`  | Whether the sheet is modal                 |

### SheetTrigger

The button that opens the sheet.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### SheetContent

The content container for the sheet.

| Prop                   | Type                                       | Default   | Description                               |
| ---------------------- | ------------------------------------------ | --------- | ----------------------------------------- |
| `side`                 | `"top" \| "right" \| "bottom" \| "left"`   | `"right"` | Side from which the sheet slides in       |
| `className`            | `string`                                   | -         | Additional CSS classes                    |
| `children`             | `React.ReactNode`                          | -         | The sheet content                         |
| `onPointerDownOutside` | `(event: PointerDownOutsideEvent) => void` | -         | Callback fired when clicking outside      |
| `onEscapeKeyDown`      | `(event: KeyboardEvent) => void`           | -         | Callback fired when escape key is pressed |

### SheetHeader

A container for the sheet header content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The header content     |

### SheetTitle

The title of the sheet.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The title content      |

### SheetDescription

A description for the sheet.

| Prop        | Type              | Default | Description             |
| ----------- | ----------------- | ------- | ----------------------- |
| `className` | `string`          | -       | Additional CSS classes  |
| `children`  | `React.ReactNode` | -       | The description content |

### SheetFooter

A container for the sheet footer content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The footer content     |

### SheetClose

A button that closes the sheet.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The close button content            |

## Examples

### Navigation Sheet

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

function NavigationSheet() {
  const menuItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
        </SheetHeader>
        <div className="py-4">
          <nav className="space-y-2">
            {menuItems.map((item) => (
              <SheetClose key={item.label} asChild>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </SheetClose>
            ))}
          </nav>
          <div className="mt-8 pt-4 border-t">
            <SheetClose asChild>
              <button className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted w-full text-left">
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Form Sheet

```tsx
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function FormSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button>Create Project</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create New Project</SheetTitle>
          <SheetDescription>
            Fill in the details below to create a new project.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-name">Project Name</Label>
            <Input id="project-name" placeholder="Enter project name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter project description"
              rows={3}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <select id="category" className="p-2 border rounded">
              <option value="">Select category</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile App</option>
              <option value="design">Design</option>
            </select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="priority">Priority</Label>
            <select id="priority" className="p-2 border rounded">
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button type="submit">Create Project</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Settings Sheet

```tsx
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Settings } from "lucide-react";

function SettingsSheet() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [autoSave, setAutoSave] = React.useState(true);
  const [volume, setVolume] = React.useState([75]);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Settings</SheetTitle>
          <SheetDescription>
            Manage your application preferences and settings.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div>
            <h3 className="text-lg font-medium">Notifications</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={notifications}
                  onCheckedChange={setNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-save">Auto Save</Label>
                <Switch
                  id="auto-save"
                  checked={autoSave}
                  onCheckedChange={setAutoSave}
                />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium">Appearance</h3>
            <div className="mt-4 space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="dark-mode">Dark Mode</Label>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
            </div>
          </div>
          <Separator />
          <div>
            <h3 className="text-lg font-medium">Audio</h3>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label>Volume</Label>
                <Slider
                  value={volume}
                  onValueChange={setVolume}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="text-sm text-muted-foreground">
                  {volume[0]}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Product Details Sheet

```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart } from "lucide-react";

function ProductDetailsSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="cursor-pointer rounded-lg border p-4 hover:shadow-md transition-shadow">
          <img
            src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
            alt="Product"
            className="w-full h-32 object-cover rounded"
          />
          <h3 className="font-medium mt-2">Wireless Headphones</h3>
          <p className="text-sm text-muted-foreground">$99.99</p>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Premium Wireless Headphones</SheetTitle>
        </SheetHeader>
        <div className="py-6 space-y-6">
          <div>
            <img
              src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e"
              alt="Product"
              className="w-full h-48 object-cover rounded"
            />
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">$99.99</span>
              <Badge variant="secondary">In Stock</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                (128 reviews)
              </span>
            </div>
            <p className="text-muted-foreground">
              High-quality wireless headphones with active noise cancellation,
              30-hour battery life, and premium sound quality. Perfect for music
              lovers and professionals.
            </p>
            <div className="space-y-2">
              <h4 className="font-medium">Features:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Active Noise Cancellation</li>
                <li>• 30-hour battery life</li>
                <li>• Bluetooth 5.0 connectivity</li>
                <li>• Quick charge (15 min = 3 hours)</li>
                <li>• Premium leather ear cups</li>
              </ul>
            </div>
            <div className="flex space-x-2">
              <Button className="flex-1">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="outline" size="icon">
                <Heart className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
```

### Different Sides

```tsx
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/overlays/sheet";
import { Button } from "@/components/ui/button";

function DifferentSidesExample() {
  return (
    <div className="flex space-x-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Sheet from Top</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <p>This sheet slides in from the top of the screen.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Sheet from Right</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <p>This sheet slides in from the right side of the screen.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Sheet from Bottom</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <p>This sheet slides in from the bottom of the screen.</p>
          </div>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Sheet from Left</SheetTitle>
          </SheetHeader>
          <div className="py-4">
            <p>This sheet slides in from the left side of the screen.</p>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```

## Styling

The sheet components can be styled using Tailwind CSS classes. The default styles provide smooth animations and responsive behavior.

```tsx
<SheetContent className="w-[400px] sm:w-[540px] bg-white dark:bg-gray-900">
  <SheetHeader className="border-b border-gray-200 dark:border-gray-700 pb-4">
    <SheetTitle className="text-xl font-bold">Custom Styled Sheet</SheetTitle>
  </SheetHeader>
</SheetContent>
```

## Accessibility

- Focus is automatically trapped within the sheet
- Pressing ESC closes the sheet
- Clicking the overlay closes the sheet
- Proper ARIA attributes are applied
- Screen reader compatible
- Keyboard navigation support

## Common Use Cases

- Navigation menus and sidebars
- Form inputs and data entry
- Product details and specifications
- Settings and configuration panels
- Shopping cart and checkout flows
- User profile editing
- Filter and search interfaces
- Documentation and help content
