# ScrollArea

Augments native scroll functionality for custom, cross-platform styling.

## Features

- Custom scrollbar styling
- Cross-platform consistency
- Smooth scrolling behavior
- Horizontal and vertical scrolling
- Built on Radix UI primitives
- Accessible by default

## Installation

```bash
npm install @radix-ui/react-scroll-area
```

## Usage

### Basic Example

```tsx
import { ScrollArea } from "@/components/ui/layout/scroll-area";

export function ScrollAreaDemo() {
  return (
    <ScrollArea className="h-72 w-48 rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm font-medium leading-none">Tags</h4>
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="text-sm">
            v1.2.0-beta.{i}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Horizontal Scrolling

```tsx
function HorizontalScrollArea() {
  return (
    <ScrollArea className="w-96 whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="shrink-0 rounded-md bg-muted p-4 w-32 h-20">
            Item {i + 1}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Chat Messages

```tsx
function ChatMessages() {
  const messages = [
    { id: 1, user: "Alice", text: "Hey there!" },
    { id: 2, user: "Bob", text: "How's it going?" },
    { id: 3, user: "Alice", text: "Pretty good, thanks for asking!" },
    // ... more messages
  ];

  return (
    <ScrollArea className="h-80 w-full rounded-md border p-4">
      <div className="space-y-4">
        {messages.map((message) => (
          <div key={message.id} className="flex space-x-2">
            <div className="font-semibold">{message.user}:</div>
            <div>{message.text}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Code Block

```tsx
function CodeBlock() {
  const code = `function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10));`;

  return (
    <ScrollArea className="h-48 w-full rounded-md border">
      <pre className="p-4 text-sm">
        <code>{code}</code>
      </pre>
    </ScrollArea>
  );
}
```

### Navigation Menu

```tsx
function NavigationMenu() {
  const menuItems = [
    "Dashboard",
    "Analytics",
    "Reports",
    "Users",
    "Settings",
    "Billing",
    "Support",
    "Documentation",
    "API Keys",
    "Webhooks",
    "Integrations",
    "Security",
  ];

  return (
    <ScrollArea className="h-64 w-48 rounded-md border">
      <div className="p-2">
        {menuItems.map((item) => (
          <div
            key={item}
            className="px-3 py-2 text-sm hover:bg-muted rounded cursor-pointer"
          >
            {item}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Data Table

```tsx
function DataTable() {
  const data = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    name: `User ${i + 1}`,
    email: `user${i + 1}@example.com`,
    role: i % 3 === 0 ? "Admin" : i % 2 === 0 ? "Editor" : "Viewer",
  }));

  return (
    <ScrollArea className="h-80 w-full rounded-md border">
      <table className="w-full">
        <thead className="sticky top-0 bg-background">
          <tr className="border-b">
            <th className="p-2 text-left">ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Email</th>
            <th className="p-2 text-left">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b">
              <td className="p-2">{row.id}</td>
              <td className="p-2">{row.name}</td>
              <td className="p-2">{row.email}</td>
              <td className="p-2">{row.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </ScrollArea>
  );
}
```

## API Reference

### ScrollArea

| Prop        | Type                                        | Default   | Description             |
| ----------- | ------------------------------------------- | --------- | ----------------------- |
| `className` | `string`                                    | -         | Additional CSS classes  |
| `children`  | `React.ReactNode`                           | -         | Content to be scrolled  |
| `type`      | `"auto" \| "always" \| "scroll" \| "hover"` | `"hover"` | When to show scrollbars |

## Accessibility

- Built on Radix UI primitives
- Keyboard navigation support
- Screen reader compatible
- Proper focus management
- ARIA attributes included

## Best Practices

- Set explicit height/width for the scroll container
- Use for content that may overflow
- Consider performance with large datasets
- Provide visual indicators for scrollable content
- Test keyboard navigation thoroughly
