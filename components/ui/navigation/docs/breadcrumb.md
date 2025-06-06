# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Features

- Accessible navigation landmark
- Customizable separators
- Support for ellipsis (collapsed items)
- Keyboard navigation support
- Semantic HTML structure
- Screen reader friendly

## Installation

This component uses Radix UI Slot and Lucide React icons. Make sure you have the required dependencies:

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

The root container for the breadcrumb navigation.

| Prop        | Type              | Default | Description              |
| ----------- | ----------------- | ------- | ------------------------ |
| `separator` | `React.ReactNode` | -       | Custom separator element |
| `className` | `string`          | -       | Additional CSS classes   |

### BreadcrumbList

Contains the list of breadcrumb items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbItem

Individual breadcrumb item container.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbLink

Clickable breadcrumb link.

| Prop        | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `asChild`   | `boolean` | `false` | Render as child component |
| `href`      | `string`  | -       | Link destination          |
| `className` | `string`  | -       | Additional CSS classes    |

### BreadcrumbPage

Current page indicator (non-clickable).

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### BreadcrumbSeparator

Visual separator between breadcrumb items.

| Prop        | Type              | Default            | Description              |
| ----------- | ----------------- | ------------------ | ------------------------ |
| `children`  | `React.ReactNode` | `<ChevronRight />` | Custom separator content |
| `className` | `string`          | -                  | Additional CSS classes   |

### BreadcrumbEllipsis

Indicates collapsed/hidden breadcrumb items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

## Examples

### E-commerce Navigation

```tsx
function EcommerceBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories">Categories</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories/electronics">
            Electronics
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/categories/electronics/smartphones">
            Smartphones
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>iPhone 15 Pro</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Documentation Navigation

```tsx
function DocsBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components">Components</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components/navigation">
            Navigation
          </BreadcrumbLink>
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

### With Dropdown Menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";

function BreadcrumbWithDropdown() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem>
                <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BreadcrumbLink href="/docs/components">
                  Components
                </BreadcrumbLink>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs/components/navigation">
            Navigation
          </BreadcrumbLink>
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

### File System Navigation

```tsx
function FileSystemBreadcrumb() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/files">📁 Files</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/files/documents">📁 Documents</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/files/documents/projects">
            📁 Projects
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>📄 README.md</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
```

### Responsive Breadcrumb

```tsx
function ResponsiveBreadcrumb() {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (isCollapsed) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
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

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/docs">Documentation</BreadcrumbLink>
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
  );
}
```

### Dynamic Breadcrumb

```tsx
function DynamicBreadcrumb({ path }: { path: string }) {
  const segments = path.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        {segments.map((segment, index) => {
          const href = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;

          return (
            <React.Fragment key={href}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{segment}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{segment}</BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

// Usage
<DynamicBreadcrumb path="/docs/components/navigation/breadcrumb" />;
```

## Styling

The component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. Adding custom className props
2. Modifying the default styles
3. Using CSS custom properties

### Custom Styling Examples

```tsx
// Custom colors
<Breadcrumb className="text-blue-600">
  {/* breadcrumb content */}
</Breadcrumb>

// Custom separator
<BreadcrumbSeparator className="text-red-500">
  →
</BreadcrumbSeparator>

// Custom link styling
<BreadcrumbLink className="hover:text-purple-600 underline">
  Custom Link
</BreadcrumbLink>
```

## Accessibility

- Uses semantic `nav` element with `aria-label="breadcrumb"`
- Proper list structure with `ol` and `li` elements
- Current page is marked with `aria-current="page"`
- Screen reader friendly with descriptive text
- Keyboard navigation support

## Use Cases

- **Website navigation**: Show current page location
- **E-commerce**: Product category navigation
- **Documentation**: Section and page hierarchy
- **File systems**: Folder and file navigation
- **Multi-step processes**: Progress indication
- **Admin panels**: Deep navigation structures
