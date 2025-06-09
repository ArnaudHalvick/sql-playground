# Sheet

A sheet component that slides in from the side of the screen, perfect for navigation menus, forms, and detailed content. Built on Radix UI's Dialog primitive.

## Features

- Slides from any side (top, right, bottom, left)
- Modal overlay with backdrop and focus management
- Keyboard navigation (ESC to close) and smooth animations
- Customizable sizing and accessible by default

## Installation

```bash
npm install @radix-ui/react-dialog class-variance-authority lucide-react
```

## Basic Usage

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

## Key Components

### Sheet

Root component managing sheet state.

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `modal?: boolean` - Whether sheet is modal (default: true)

### SheetTrigger

Button that opens the sheet.

- `asChild?: boolean` - Change rendered element (default: false)

### SheetContent

Content container for the sheet.

- `side?: "top" | "right" | "bottom" | "left"` - Side to slide from (default: "right")
- `className?: string` - Additional CSS classes
- `onPointerDownOutside?: (event) => void` - Outside click callback
- `onEscapeKeyDown?: (event) => void` - Escape key callback

### SheetHeader, SheetTitle, SheetDescription, SheetFooter, SheetClose

Layout and content components with standard `className` and `children` props.

## Examples

### Navigation Sheet

```tsx
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
              placeholder="Project description..."
              rows={3}
            />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Create Project</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
```

### Different Sides

```tsx
function DifferentSidesSheet() {
  return (
    <div className="flex space-x-2">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Left</Button>
        </SheetTrigger>
        <SheetContent side="left">
          <SheetHeader>
            <SheetTitle>Left Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Right</Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetHeader>
            <SheetTitle>Right Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Top</Button>
        </SheetTrigger>
        <SheetContent side="top">
          <SheetHeader>
            <SheetTitle>Top Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">Bottom</Button>
        </SheetTrigger>
        <SheetContent side="bottom">
          <SheetHeader>
            <SheetTitle>Bottom Sheet</SheetTitle>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
}
```

## Best Practices

- Use appropriate side based on content and layout
- Include `SheetClose` in interactive elements for easy dismissal
- Keep content organized with `SheetHeader` and `SheetFooter`
- Use `asChild` prop to customize trigger elements
- Consider mobile responsiveness when choosing sheet sides
