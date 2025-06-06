# Table Components

## Overview

The Table components provide a complete set of building blocks for creating accessible, responsive data tables. Built with semantic HTML and styled with Tailwind CSS, these components offer a flexible foundation for displaying tabular data.

## Features

- **Semantic HTML**: Uses proper table elements for accessibility
- **Responsive Design**: Horizontal scrolling for overflow content
- **Consistent Styling**: Unified appearance across all table elements
- **Hover Effects**: Interactive row highlighting
- **Selection States**: Visual feedback for selected rows
- **Flexible Layout**: Customizable spacing and alignment

## Components

### Table

The main table wrapper with responsive overflow handling.

```typescript
interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  className?: string;
}
```

### TableHeader

Table header section (`<thead>`) with proper styling.

```typescript
interface TableHeaderProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}
```

### TableBody

Table body section (`<tbody>`) for data rows.

```typescript
interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}
```

### TableFooter

Table footer section (`<tfoot>`) for summary information.

```typescript
interface TableFooterProps
  extends React.HTMLAttributes<HTMLTableSectionElement> {
  className?: string;
}
```

### TableRow

Individual table row with hover and selection states.

```typescript
interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  className?: string;
}
```

### TableHead

Table header cell (`<th>`) with proper alignment and styling.

```typescript
interface TableHeadProps extends React.ThHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}
```

### TableCell

Table data cell (`<td>`) with consistent padding and alignment.

```typescript
interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  className?: string;
}
```

### TableCaption

Table caption for accessibility and context.

```typescript
interface TableCaptionProps
  extends React.HTMLAttributes<HTMLTableCaptionElement> {
  className?: string;
}
```

## Usage Examples

### Basic Data Table

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  TableCaption,
} from "@/components/ui/data-display/table";

const users = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Editor" },
];

function UserTable() {
  return (
    <Table>
      <TableCaption>A list of users and their roles.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id}</TableCell>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

### Table with Footer

```tsx
function SalesTable() {
  const salesData = [
    { product: "Widget A", quantity: 100, price: 25.99, total: 2599 },
    { product: "Widget B", quantity: 75, price: 19.99, total: 1499.25 },
    { product: "Widget C", quantity: 50, price: 35.99, total: 1799.5 },
  ];

  const grandTotal = salesData.reduce((sum, item) => sum + item.total, 0);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Product</TableHead>
          <TableHead className="text-right">Quantity</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {salesData.map((item, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{item.product}</TableCell>
            <TableCell className="text-right">{item.quantity}</TableCell>
            <TableCell className="text-right">${item.price}</TableCell>
            <TableCell className="text-right">${item.total}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3} className="font-medium">
            Total
          </TableCell>
          <TableCell className="text-right font-medium">
            ${grandTotal}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
```

### Selectable Rows

```tsx
function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const toggleRow = (id: number) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Select</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow
            key={item.id}
            data-state={selectedRows.includes(item.id) ? "selected" : undefined}
            className="cursor-pointer"
            onClick={() => toggleRow(item.id)}
          >
            <TableCell>
              <input
                type="checkbox"
                checked={selectedRows.includes(item.id)}
                onChange={() => toggleRow(item.id)}
              />
            </TableCell>
            <TableCell>{item.name}</TableCell>
            <TableCell>{item.status}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
```

## Styling Features

### Default Styles

- **Table**: Full width with responsive overflow
- **Header**: Border bottom with medium font weight
- **Body**: Last row has no border
- **Footer**: Top border with muted background
- **Rows**: Bottom border with hover effects
- **Cells**: Consistent padding and alignment

### Interactive States

- **Hover**: Muted background on row hover
- **Selected**: Special styling for `data-state="selected"`
- **Focus**: Proper focus management for accessibility

### Responsive Behavior

- Horizontal scrolling for wide tables
- Maintains table structure on small screens
- Proper text wrapping in cells

## Accessibility Features

### Semantic HTML

- Proper use of `<table>`, `<thead>`, `<tbody>`, `<tfoot>`
- Correct `<th>` and `<td>` elements
- Table captions for context

### ARIA Support

- Automatic role assignments
- Proper heading associations
- Screen reader friendly structure

### Keyboard Navigation

- Tab navigation through interactive elements
- Focus management for selectable rows
- Keyboard shortcuts support

## Customization Options

### CSS Classes

All components accept custom className props for styling:

```tsx
<Table className="border-2 border-primary">
  <TableRow className="bg-accent">
    <TableCell className="text-center font-bold">Custom Content</TableCell>
  </TableRow>
</Table>
```

### Alignment

```tsx
<TableHead className="text-right">Price</TableHead>
<TableCell className="text-center">Status</TableCell>
```

### Spacing

```tsx
<TableCell className="py-6 px-8">Large Padding</TableCell>
```

## Common Patterns

### Loading State

```tsx
{
  isLoading ? (
    <TableRow>
      <TableCell colSpan={columns.length} className="text-center">
        Loading...
      </TableCell>
    </TableRow>
  ) : (
    data.map((item) => <TableRow key={item.id}>...</TableRow>)
  );
}
```

### Empty State

```tsx
{
  data.length === 0 && (
    <TableRow>
      <TableCell
        colSpan={columns.length}
        className="text-center text-muted-foreground"
      >
        No data available
      </TableCell>
    </TableRow>
  );
}
```

### Sortable Headers

```tsx
<TableHead
  className="cursor-pointer hover:bg-muted"
  onClick={() => handleSort("name")}
>
  Name {sortField === "name" && (sortDirection === "asc" ? "↑" : "↓")}
</TableHead>
```

## Use Cases

- Data grids and listings
- Financial reports and dashboards
- User management interfaces
- Product catalogs
- Analytics tables
- Configuration panels

## Performance Tips

- Use `key` props for efficient re-rendering
- Implement virtualization for large datasets
- Consider pagination for better UX
- Memoize complex cell content
