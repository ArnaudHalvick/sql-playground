# Avatar Component

## Overview

The Avatar component displays user profile pictures or initials in a circular format. Built on Radix UI primitives with automatic fallback handling and accessibility features.

## Features

- **Image Fallback**: Automatic fallback to initials when image fails
- **Accessible**: Built with Radix UI for screen reader support
- **Flexible Sizing**: Multiple size variants
- **Custom Content**: Supports images, initials, or custom content
- **Responsive**: Adapts to different screen sizes

## Components

### Avatar

Root container component that manages the avatar display.

### AvatarImage

Image component with automatic fallback handling.

### AvatarFallback

Fallback content displayed when image is unavailable.

## Usage Examples

### Basic Avatar

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/inputs/avatar";

function BasicAvatar() {
  return (
    <Avatar>
      <AvatarImage src="/avatars/user.jpg" alt="User" />
      <AvatarFallback>JD</AvatarFallback>
    </Avatar>
  );
}
```

### Avatar Sizes

```tsx
function AvatarSizes() {
  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback className="text-xs">JD</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <Avatar className="h-16 w-16">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback className="text-lg">JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

### User List

```tsx
function UserList() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/john.jpg",
    },
    { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: null },
  ];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-4">
      {users.map((user) => (
        <div key={user.id} className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### Avatar Group

```tsx
function AvatarGroup() {
  const users = [
    { name: "John Doe", avatar: "/avatars/john.jpg" },
    { name: "Jane Smith", avatar: "/avatars/jane.jpg" },
    { name: "Bob Johnson", avatar: "/avatars/bob.jpg" },
  ];

  return (
    <div className="flex -space-x-2">
      {users.map((user, index) => (
        <Avatar key={index} className="border-2 border-background">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>
            {user.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
      ))}
    </div>
  );
}
```

## API Reference

### Avatar

| Prop        | Type              | Default | Description                         |
| ----------- | ----------------- | ------- | ----------------------------------- |
| `className` | `string`          | -       | Additional CSS classes              |
| `children`  | `React.ReactNode` | -       | Avatar content (Image and Fallback) |

### AvatarImage

| Prop        | Type     | Default | Description                |
| ----------- | -------- | ------- | -------------------------- |
| `src`       | `string` | -       | Image source URL           |
| `alt`       | `string` | -       | Alt text for accessibility |
| `className` | `string` | -       | Additional CSS classes     |

### AvatarFallback

| Prop        | Type              | Default | Description                         |
| ----------- | ----------------- | ------- | ----------------------------------- |
| `children`  | `React.ReactNode` | -       | Fallback content (usually initials) |
| `className` | `string`          | -       | Additional CSS classes              |

## Accessibility

- Built on Radix UI primitives
- Proper alt text for images
- Fallback content for screen readers
- Semantic HTML structure

## Best Practices

- Always provide meaningful alt text for images
- Use initials as fallback content
- Consider different sizes for different contexts
- Use consistent sizing within the same interface
