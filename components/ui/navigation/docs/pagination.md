# Pagination

Pagination with page navigation, next and previous links.

## Features

- Accessible navigation controls
- Customizable page numbers
- Previous/Next navigation
- Ellipsis for large page ranges
- Keyboard navigation support
- Screen reader friendly
- Responsive design

## Installation

This component uses Lucide React icons. Make sure you have the required dependencies:

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

### Simple Pagination

```tsx
function SimplePagination() {
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

## API Reference

### Pagination

The root pagination component.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Pagination content     |

### PaginationContent

Container for pagination items.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Pagination items       |

### PaginationItem

Individual pagination item container.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Item content           |

### PaginationLink

Clickable pagination link.

| Prop        | Type                                  | Default  | Description                      |
| ----------- | ------------------------------------- | -------- | -------------------------------- |
| `href`      | `string`                              | -        | Link destination                 |
| `isActive`  | `boolean`                             | `false`  | Whether this is the current page |
| `size`      | `"default" \| "sm" \| "lg" \| "icon"` | `"icon"` | Size variant                     |
| `className` | `string`                              | -        | Additional CSS classes           |

### PaginationPrevious

Previous page navigation link.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `href`      | `string` | -       | Link destination       |
| `className` | `string` | -       | Additional CSS classes |

### PaginationNext

Next page navigation link.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `href`      | `string` | -       | Link destination       |
| `className` | `string` | -       | Additional CSS classes |

### PaginationEllipsis

Ellipsis indicator for skipped pages.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

## Examples

### Controlled Pagination

```tsx
function ControlledPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 10;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;

    if (!showEllipsis) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Show ellipsis for large page counts
      pages.push(
        <PaginationItem key={1}>
          <PaginationLink
            href="#"
            isActive={currentPage === 1}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(1);
            }}
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      if (currentPage > 3) {
        pages.push(
          <PaginationItem key="ellipsis1">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={currentPage === i}
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      if (currentPage < totalPages - 2) {
        pages.push(
          <PaginationItem key="ellipsis2">
            <PaginationEllipsis />
          </PaginationItem>
        );
      }

      pages.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            href="#"
            isActive={currentPage === totalPages}
            onClick={(e) => {
              e.preventDefault();
              handlePageChange(totalPages);
            }}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }

    return pages;
  };

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">
        Page {currentPage} of {totalPages}
      </p>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) handlePageChange(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {renderPageNumbers()}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) handlePageChange(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

### Data Table Pagination

```tsx
function DataTablePagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(10);
  const totalItems = 250;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-2">
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <select
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="h-8 w-[70px] rounded border border-input bg-background px-3 py-1 text-sm"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          {startItem}-{endItem} of {totalItems}
        </div>
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink href="#" isActive>
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
```

### Blog Pagination

```tsx
function BlogPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalPages = 15;
  const postsPerPage = 5;

  return (
    <div className="space-y-8">
      {/* Blog posts would go here */}
      <div className="space-y-4">
        {Array.from({ length: postsPerPage }, (_, i) => (
          <div key={i} className="border rounded-lg p-4">
            <h3 className="font-semibold">
              Blog Post {(currentPage - 1) * postsPerPage + i + 1}
            </h3>
            <p className="text-muted-foreground">
              This is a sample blog post excerpt...
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {/* Show first page */}
            <PaginationItem>
              <PaginationLink
                href="#"
                isActive={currentPage === 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(1);
                }}
              >
                1
              </PaginationLink>
            </PaginationItem>

            {/* Show ellipsis if needed */}
            {currentPage > 3 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show current page and neighbors */}
            {currentPage > 2 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage - 1);
                  }}
                >
                  {currentPage - 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage !== 1 && currentPage !== totalPages && (
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
            )}

            {currentPage < totalPages - 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(currentPage + 1);
                  }}
                >
                  {currentPage + 1}
                </PaginationLink>
              </PaginationItem>
            )}

            {/* Show ellipsis if needed */}
            {currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            {/* Show last page */}
            {totalPages > 1 && (
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={currentPage === totalPages}
                  onClick={(e) => {
                    e.preventDefault();
                    setCurrentPage(totalPages);
                  }}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
```

### Search Results Pagination

```tsx
function SearchResultsPagination() {
  const [currentPage, setCurrentPage] = React.useState(1);
  const totalResults = 1247;
  const resultsPerPage = 10;
  const totalPages = Math.ceil(totalResults / resultsPerPage);

  return (
    <div className="space-y-6">
      <div className="text-sm text-muted-foreground">
        About {totalResults.toLocaleString()} results
      </div>

      {/* Search results would go here */}
      <div className="space-y-4">
        {Array.from({ length: resultsPerPage }, (_, i) => (
          <div key={i} className="space-y-2">
            <h3 className="text-lg font-medium text-blue-600 hover:underline cursor-pointer">
              Search Result {(currentPage - 1) * resultsPerPage + i + 1}
            </h3>
            <p className="text-sm text-muted-foreground">
              This is a sample search result description that shows relevant
              information...
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Showing {(currentPage - 1) * resultsPerPage + 1} to{" "}
          {Math.min(currentPage * resultsPerPage, totalResults)} of{" "}
          {totalResults.toLocaleString()} results
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) setCurrentPage(currentPage - 1);
                }}
                className={
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNumber = currentPage <= 3 ? i + 1 : currentPage - 2 + i;
              if (pageNumber > totalPages) return null;

              return (
                <PaginationItem key={pageNumber}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === pageNumber}
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(pageNumber);
                    }}
                  >
                    {pageNumber}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                }}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom styling
<Pagination className="my-8">
  <PaginationContent className="gap-2">
    <PaginationItem>
      <PaginationPrevious
        href="#"
        className="border-2 border-blue-200 hover:bg-blue-50"
      />
    </PaginationItem>
    <PaginationItem>
      <PaginationLink
        href="#"
        isActive
        className="bg-blue-600 text-white hover:bg-blue-700"
      >
        1
      </PaginationLink>
    </PaginationItem>
  </PaginationContent>
</Pagination>
```

## Accessibility

- Uses semantic `nav` element with proper ARIA labels
- Screen reader friendly with descriptive text
- Keyboard navigation support
- Proper focus management
- Current page indication for assistive technologies

## Use Cases

- **Data tables**: Navigate through large datasets
- **Blog posts**: Browse through article archives
- **Search results**: Navigate through search pages
- **Product listings**: Browse e-commerce catalogs
- **User lists**: Navigate through user directories
- **Content galleries**: Browse through image or media collections
