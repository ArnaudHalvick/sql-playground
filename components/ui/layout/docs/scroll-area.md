# Scroll Area

Augments native scroll functionality for custom, cross-browser styling.

## Features

- Custom styled scrollbars
- Cross-browser compatibility
- Smooth scrolling experience
- Keyboard accessible
- Built on top of Radix UI Scroll Area primitive
- Supports both vertical and horizontal scrolling

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

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
<ScrollArea className="w-96 whitespace-nowrap rounded-md border">
  <div className="flex w-max space-x-4 p-4">
    {Array.from({ length: 20 }).map((_, i) => (
      <figure key={i} className="shrink-0">
        <div className="overflow-hidden rounded-md">
          <img
            src={`https://picsum.photos/300/400?random=${i}`}
            alt={`Photo ${i}`}
            className="aspect-[3/4] h-fit w-fit object-cover"
            width={300}
            height={400}
          />
        </div>
        <figcaption className="pt-2 text-xs text-muted-foreground">
          Photo by John Doe
        </figcaption>
      </figure>
    ))}
  </div>
</ScrollArea>
```

### Chat Messages

```tsx
function ChatMessages() {
  const messages = [
    { id: 1, user: "Alice", message: "Hey there!" },
    { id: 2, user: "Bob", message: "Hello! How are you doing?" },
    { id: 3, user: "Alice", message: "I'm doing great, thanks for asking!" },
    // ... more messages
  ];

  return (
    <ScrollArea className="h-80 w-full rounded-md border p-4">
      <div className="space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex items-start space-x-2">
            <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
              {msg.user[0]}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{msg.user}</p>
              <p className="text-sm text-muted-foreground">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

## API Reference

### ScrollArea

The root scroll area component.

| Prop        | Type                                        | Default   | Description             |
| ----------- | ------------------------------------------- | --------- | ----------------------- |
| `className` | `string`                                    | -         | Additional CSS classes  |
| `children`  | `React.ReactNode`                           | -         | The scrollable content  |
| `type`      | `"auto" \| "always" \| "scroll" \| "hover"` | `"hover"` | When to show scrollbars |

### ScrollBar

The scrollbar component (automatically included in ScrollArea).

| Prop          | Type                         | Default      | Description                      |
| ------------- | ---------------------------- | ------------ | -------------------------------- |
| `orientation` | `"vertical" \| "horizontal"` | `"vertical"` | The orientation of the scrollbar |
| `className`   | `string`                     | -            | Additional CSS classes           |

## Examples

### Code Block with Syntax Highlighting

```tsx
function CodeBlock() {
  const code = `
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Example usage
for (let i = 0; i < 10; i++) {
  console.log(\`fibonacci(\${i}) = \${fibonacci(i)}\`);
}
  `.trim();

  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <pre className="p-4 text-sm">
        <code>{code}</code>
      </pre>
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

### Image Gallery

```tsx
function ImageGallery() {
  return (
    <ScrollArea className="h-96 w-full rounded-md border">
      <div className="grid grid-cols-2 gap-4 p-4">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <img
              src={`https://picsum.photos/200/150?random=${i}`}
              alt={`Gallery image ${i + 1}`}
              className="w-full rounded-md object-cover"
            />
            <p className="text-sm text-muted-foreground">Image {i + 1}</p>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
}
```

### Sidebar Navigation

```tsx
function SidebarNavigation() {
  const navItems = [
    { label: "Dashboard", icon: "📊" },
    { label: "Analytics", icon: "📈" },
    { label: "Users", icon: "👥" },
    { label: "Settings", icon: "⚙️" },
    { label: "Reports", icon: "📋" },
    // ... more items
  ];

  return (
    <ScrollArea className="h-screen w-64 border-r">
      <div className="p-4">
        <h2 className="mb-4 text-lg font-semibold">Navigation</h2>
        <nav className="space-y-2">
          {navItems.map((item, i) => (
            <a
              key={i}
              href="#"
              className="flex items-center space-x-2 rounded-md p-2 hover:bg-muted"
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
      </div>
    </ScrollArea>
  );
}
```

### Notification List

```tsx
function NotificationList() {
  const notifications = Array.from({ length: 15 }, (_, i) => ({
    id: i + 1,
    title: `Notification ${i + 1}`,
    message: `This is the message for notification ${i + 1}`,
    time: `${i + 1}m ago`,
    unread: i < 3,
  }));

  return (
    <ScrollArea className="h-80 w-80 rounded-md border">
      <div className="p-4">
        <h3 className="mb-4 font-semibold">Notifications</h3>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`rounded-md p-3 ${
                notification.unread ? "bg-muted" : "bg-background"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {notification.message}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground">
                  {notification.time}
                </span>
              </div>
              {notification.unread && (
                <div className="mt-2 h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>
          ))}
        </div>
      </div>
    </ScrollArea>
  );
}
```

## Styling

The component uses Radix UI's data attributes for styling:

- `data-state` - The current state of the scrollbar
- `data-orientation` - The orientation of the scrollbar

You can customize the scrollbar appearance:

```css
[data-radix-scroll-area-scrollbar] {
  background: rgba(0, 0, 0, 0.1);
}

[data-radix-scroll-area-thumb] {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

[data-radix-scroll-area-thumb]:hover {
  background: rgba(0, 0, 0, 0.5);
}
```

## Accessibility

- Maintains native scrolling behavior
- Supports keyboard navigation (Arrow keys, Page Up/Down, Home, End)
- Screen reader compatible
- Respects user's motion preferences
- Proper focus management

## Use Cases

- **Long content lists**: Chat messages, notifications, comments
- **Data tables**: Large datasets with many rows
- **Code editors**: Syntax highlighted code blocks
- **Image galleries**: Grid layouts with many images
- **Navigation menus**: Long lists of menu items
- **Documentation**: Long-form content with custom scrollbars
