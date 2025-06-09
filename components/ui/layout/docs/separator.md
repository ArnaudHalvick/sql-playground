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

      <Separator orientation="vertical" className="h-6" />

      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Left</span>
      </button>
      <button className="p-2 hover:bg-muted rounded">
        <span className="text-sm">Center</span>
      </button>
    </div>
  );
}
```

## API Reference

### Separator

| Prop          | Type                         | Default        | Description                                     |
| ------------- | ---------------------------- | -------------- | ----------------------------------------------- |
| `orientation` | `"horizontal" \| "vertical"` | `"horizontal"` | The orientation of the separator                |
| `decorative`  | `boolean`                    | `true`         | Whether the separator is decorative or semantic |
| `className`   | `string`                     | -              | Additional CSS classes                          |

## Accessibility

- Built on Radix UI primitives
- Proper ARIA roles for semantic separation
- Screen reader support
- Decorative vs semantic separation options

## Best Practices

- Use horizontal separators to divide content sections
- Use vertical separators in navigation or toolbars
- Set appropriate height for vertical separators
- Consider semantic vs decorative usage
- Maintain consistent spacing around separators
