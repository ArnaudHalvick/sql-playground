# Navigation Menu

A collection of links for navigating websites.

## Features

- Horizontal navigation with dropdown support
- Keyboard navigation
- Smooth animations and transitions
- Built on top of Radix UI Navigation Menu primitive
- Accessible by default

## Installation

```bash
npm install @radix-ui/react-navigation-menu class-variance-authority lucide-react
```

## Usage

### Basic Example

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation/navigation-menu";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <ListItem
                title="Alert Dialog"
                href="/docs/primitives/alert-dialog"
              >
                A modal dialog that interrupts the user with important content.
              </ListItem>
              <ListItem title="Hover Card" href="/docs/primitives/hover-card">
                For sighted users to preview content available behind a link.
              </ListItem>
              <ListItem title="Progress" href="/docs/primitives/progress">
                Displays an indicator showing the completion progress.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
```

### Simple Navigation

```tsx
function SimpleNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/services">Services</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## API Reference

### NavigationMenu

| Prop       | Type              | Default | Description        |
| ---------- | ----------------- | ------- | ------------------ |
| `children` | `React.ReactNode` | -       | Navigation content |

### NavigationMenuList

| Prop       | Type              | Default | Description      |
| ---------- | ----------------- | ------- | ---------------- |
| `children` | `React.ReactNode` | -       | Navigation items |

### NavigationMenuItem

| Prop       | Type              | Default | Description  |
| ---------- | ----------------- | ------- | ------------ |
| `children` | `React.ReactNode` | -       | Item content |

### NavigationMenuTrigger

| Prop       | Type              | Default | Description     |
| ---------- | ----------------- | ------- | --------------- |
| `children` | `React.ReactNode` | -       | Trigger content |

### NavigationMenuContent

| Prop       | Type              | Default | Description      |
| ---------- | ----------------- | ------- | ---------------- |
| `children` | `React.ReactNode` | -       | Dropdown content |

### NavigationMenuLink

| Prop      | Type      | Default | Description               |
| --------- | --------- | ------- | ------------------------- |
| `asChild` | `boolean` | `false` | Render as child component |
| `href`    | `string`  | -       | Link destination          |

## Accessibility

- Full keyboard navigation support
- Screen reader friendly with proper ARIA attributes
- Focus management and visual indicators
- Follows WAI-ARIA Navigation Menu pattern

## Use Cases

- Website main navigation
- Header navigation menus
- Dropdown navigation systems
- Multi-level menu structures
- Any hierarchical navigation interface
