# Pagination

Pagination with page navigation, next and previous links.

## Features

- Accessible navigation controls
- Customizable page numbers
- Previous/Next navigation
- Ellipsis for large page ranges
- Keyboard navigation support

## Installation

```bash
npm install lucide-react
```

## Usage

### Basic Example

```tsx
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/navigation/pagination";

export function PaginationDemo() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### With Ellipsis

```tsx
function PaginationWithEllipsis() {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">8</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">9</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

### Controlled Pagination

```tsx
function ControlledPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          />
        </PaginationItem>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
```

## API Reference

### Pagination

| Prop       | Type              | Default | Description        |
| ---------- | ----------------- | ------- | ------------------ |
| `children` | `React.ReactNode` | -       | Pagination content |

### PaginationContent

| Prop       | Type              | Default | Description      |
| ---------- | ----------------- | ------- | ---------------- |
| `children` | `React.ReactNode` | -       | Pagination items |

### PaginationItem

| Prop       | Type              | Default | Description  |
| ---------- | ----------------- | ------- | ------------ |
| `children` | `React.ReactNode` | -       | Item content |

### PaginationLink

| Prop       | Type      | Default | Description                      |
| ---------- | --------- | ------- | -------------------------------- |
| `href`     | `string`  | -       | Link destination                 |
| `isActive` | `boolean` | `false` | Whether this is the current page |

### PaginationPrevious

| Prop   | Type     | Default | Description      |
| ------ | -------- | ------- | ---------------- |
| `href` | `string` | -       | Link destination |

### PaginationNext

| Prop   | Type     | Default | Description      |
| ------ | -------- | ------- | ---------------- |
| `href` | `string` | -       | Link destination |

### PaginationEllipsis

Ellipsis indicator for skipped pages.

## Accessibility

- Full keyboard navigation support
- Screen reader friendly with proper ARIA labels
- Focus management and visual indicators
- Semantic HTML structure

## Use Cases

- Table data pagination
- Search results navigation
- Blog post listings
- Product catalog browsing
- Any content that needs to be split across multiple pages
