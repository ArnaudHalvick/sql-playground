# Drawer

A drawer component that slides in from the bottom of the screen, perfect for mobile interfaces and quick actions. Built on Vaul.

## Features

- Slides in from bottom with touch/swipe gestures
- Backdrop scaling effect and drag handle indicator
- Smooth animations and mobile-first design
- Accessible by default with portal rendering

## Installation

```bash
npm install vaul
```

## Basic Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Key Components

### Drawer

Root component managing drawer state.

- `shouldScaleBackground?: boolean` - Scale background when open (default: true)
- `snapPoints?: (number | string)[]` - Array of snap points
- `activeSnapPoint?: number | string | null` - Active snap point
- `setActiveSnapPoint?: (snapPoint) => void` - Set active snap point callback
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `closeThreshold?: number` - Threshold for closing (default: 0.25)
- `scrollLockTimeout?: number` - Timeout for scroll lock (default: 100ms)

### DrawerTrigger

Button that opens the drawer.

- `asChild?: boolean` - Change rendered element (default: false)

### DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter, DrawerClose

Layout and content components with standard `className` and `children` props.

## Examples

### Mobile Menu

```tsx
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

function MobileMenuDrawer() {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <DrawerClose key={item.label} asChild>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </DrawerClose>
              ))}
            </nav>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Form Drawer

```tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function FormDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Note</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add New Note</DrawerTitle>
            <DrawerDescription>
              Create a new note to save your thoughts.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter note title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your note here..."
                  rows={4}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Save Note</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### With Snap Points

```tsx
function SnapPointsDrawer() {
  const [snap, setSnap] = React.useState<number | string | null>("148px");

  return (
    <Drawer
      snapPoints={["148px", "355px", 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">Open with Snap Points</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Drawer with Snap Points</DrawerTitle>
            <DrawerDescription>
              This drawer has multiple snap points. Try dragging it to different
              positions.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <p className="text-sm text-muted-foreground">
              Current snap point: {snap}
            </p>
            <div className="mt-4 space-y-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSnap("148px")}
                className="w-full"
              >
                Snap to 148px
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSnap(1)}
                className="w-full"
              >
                Snap to 100%
              </Button>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Best Practices

- Primarily designed for mobile interfaces
- Use for quick actions and forms that don't require full screen
- Include drag handle for better UX (automatically provided)
- Keep content concise and focused
- Consider snap points for multi-step interactions
