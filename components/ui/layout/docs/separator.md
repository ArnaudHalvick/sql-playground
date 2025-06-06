# Separator

Visually or semantically separates content.

## Features

- Horizontal and vertical orientations
- Semantic separation for screen readers
- Customizable styling
- Built on top of Radix UI Separator primitive
- Accessible by default

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-separator
```

## Usage

### Basic Example

```tsx
import { Separator } from "@/components/ui/layout/separator";

export function SeparatorDemo() {
  return (
    <div>
      <div className="space-y-1">
        <h4 className="text-sm font-medium leading-none">Radix Primitives</h4>
        <p className="text-sm text-muted-foreground">
          An open-source UI component library.
        </p>
      </div>
      <Separator className="my-4" />
      <div className="flex h-5 items-center space-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
  );
}
```

### Horizontal Separator

```tsx
<div className="space-y-4">
  <div>
    <h3 className="text-lg font-semibold">Section 1</h3>
    <p className="text-muted-foreground">Content for the first section.</p>
  </div>

  <Separator />

  <div>
    <h3 className="text-lg font-semibold">Section 2</h3>
    <p className="text-muted-foreground">Content for the second section.</p>
  </div>
</div>
```

### Vertical Separator

```tsx
<div className="flex items-center space-x-4">
  <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
    Save
  </button>

  <Separator orientation="vertical" className="h-6" />

  <button className="px-4 py-2 bg-secondary text-secondary-foreground rounded">
    Cancel
  </button>
</div>
```

## API Reference

### Separator

The separator component.

| Prop          | Type                         | Default        | Description                                     |
| ------------- | ---------------------------- | -------------- | ----------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The orientation of the separator                |
| `decorative`  | `boolean`                    | `true`         | Whether the separator is decorative or semantic |
| `className`   | `string`                     | -              | Additional CSS classes                          |

## Examples

### Navigation Menu

```tsx
function NavigationMenu() {
  return (
    <nav className="flex items-center space-x-4 text-sm">
      <a href="#" className="hover:text-primary">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">
        About
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">
        Services
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-primary">
        Contact
      </a>
    </nav>
  );
}
```

### Card with Sections

```tsx
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";

function CardWithSections() {
  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>User Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-medium">Personal Information</h4>
          <p className="text-sm text-muted-foreground">
            Name: John Doe
            <br />
            Email: john@example.com
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium">Preferences</h4>
          <p className="text-sm text-muted-foreground">
            Theme: Dark
            <br />
            Language: English
          </p>
        </div>

        <Separator />

        <div>
          <h4 className="font-medium">Account Status</h4>
          <p className="text-sm text-muted-foreground">
            Status: Active
            <br />
            Member since: 2023
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Toolbar

```tsx
function Toolbar() {
  return (
    <div className="flex items-center space-x-2 p-2 border rounded-md">
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Bold</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Italic</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Underline</span>
      </button>

      <Separator orientation="vertical" className="h-6" />

      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Left</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Center</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Right</span>
      </button>

      <Separator orientation="vertical" className="h-6" />

      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Link</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Image</span>
      </button>
    </div>
  );
}
```

### Sidebar Layout

```tsx
function SidebarLayout() {
  return (
    <div className="flex h-screen">
      <aside className="w-64 p-4 bg-muted">
        <h2 className="font-semibold mb-4">Navigation</h2>
        <nav className="space-y-2">
          <a href="#" className="block p-2 hover:bg-background rounded">
            Dashboard
          </a>
          <a href="#" className="block p-2 hover:bg-background rounded">
            Users
          </a>
          <a href="#" className="block p-2 hover:bg-background rounded">
            Settings
          </a>
        </nav>
      </aside>

      <Separator orientation="vertical" />

      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area.</p>
      </main>
    </div>
  );
}
```

### Form Sections

```tsx
function FormWithSections() {
  return (
    <form className="space-y-6 max-w-md">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Personal Details</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">First Name</label>
          <input className="w-full p-2 border rounded" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Last Name</label>
          <input className="w-full p-2 border rounded" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Contact Information</h3>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" className="w-full p-2 border rounded" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Phone</label>
          <input type="tel" className="w-full p-2 border rounded" />
        </div>
      </div>

      <Separator />

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Subscribe to newsletter</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span className="text-sm">Enable notifications</span>
          </label>
        </div>
      </div>
    </form>
  );
}
```

### Breadcrumb Navigation

```tsx
function BreadcrumbNavigation() {
  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
      <a href="#" className="hover:text-foreground">
        Home
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-foreground">
        Products
      </a>
      <Separator orientation="vertical" className="h-4" />
      <a href="#" className="hover:text-foreground">
        Electronics
      </a>
      <Separator orientation="vertical" className="h-4" />
      <span className="text-foreground">Smartphones</span>
    </nav>
  );
}
```

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Adding custom className props
2. Modifying the default styles
3. Using CSS custom properties

### Custom Styling Examples

```tsx
// Thick separator
<Separator className="h-1 bg-primary" />

// Dashed separator
<Separator className="border-dashed border-t border-muted-foreground" />

// Gradient separator
<Separator className="h-px bg-gradient-to-r from-transparent via-muted-foreground to-transparent" />

// Colored separator
<Separator className="bg-red-500" />
```

## Accessibility

- Uses proper ARIA attributes for screen readers
- Semantic separation when `decorative={false}`
- Maintains proper focus order
- Follows WAI-ARIA Separator pattern

### Semantic vs Decorative

```tsx
// Decorative separator (default) - purely visual
<Separator decorative />

// Semantic separator - meaningful separation for screen readers
<Separator decorative={false} />
```

## Use Cases

- **Content sections**: Separating different sections of content
- **Navigation menus**: Dividing menu items
- **Toolbars**: Grouping related actions
- **Forms**: Separating form sections
- **Sidebars**: Dividing sidebar content
- **Cards**: Creating visual breaks within cards
- **Lists**: Separating list items or groups
