# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Features

- Accessible navigation landmark
- Customizable separators
- Support for ellipsis (collapsed items)
- Keyboard navigation support
- Semantic HTML structure

## Installation

```bash
npm install @radix-ui/react-slot lucide-react
```

## Usage

### Basic Example

```tsx
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/navigation/breadcrumb";

export function BreadcrumbDemo() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### With Custom Separator

```tsx
import { Slash } from "lucide-react";

<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator>
      <Slash />
    </BreadcrumbSeparator>
    <BreadcrumbItem>
      <BreadcrumbPage>Components</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>;
```

### With Ellipsis

```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbEllipsis />
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

## API Reference

### Breadcrumb

| Prop        | Type              | Default | Description              |
| ----------- | ----------------- | ------- | ------------------------ |
| `separator` | `React.ReactNode` | -       | Custom separator element |
| `className` | `string`          | -       | Additional CSS classes   |

### BreadcrumbList

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbItem

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbLink

| Prop        | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `asChild`   | `boolean` | `false` | Render as child component |
| `href`      | `string`  | -       | Link destination          |
| `className` | `string`  | -       | Additional CSS classes    |

### BreadcrumbPage

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbSeparator

| Prop        | Type              | Default            | Description              |
| ----------- | ----------------- | ------------------ | ------------------------ |
| `children`  | `React.ReactNode` | `<ChevronRight />` | Custom separator content |
| `className` | `string`          | -                  | Additional CSS classes   |

### BreadcrumbEllipsis

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

## Accessibility

- Uses semantic `nav` element with proper ARIA labels
- Screen reader friendly with descriptive text
- Keyboard navigation support
- Proper focus management

## Use Cases

- Website navigation hierarchy
- File system path display
- E-commerce category navigation
- Documentation section navigation
- Any hierarchical content structure
