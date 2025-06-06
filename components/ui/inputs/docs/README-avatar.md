# Avatar Component

## Overview

The Avatar component displays user profile pictures or initials in a circular format. Built on Radix UI primitives, it provides fallback handling, accessibility features, and consistent styling for user representation across the application.

## Features

- **Image Fallback**: Automatic fallback to initials when image fails to load
- **Accessible**: Built with Radix UI for screen reader support
- **Flexible Sizing**: Multiple size variants for different use cases
- **Custom Content**: Supports images, initials, or custom content
- **Loading States**: Handles image loading gracefully
- **Responsive**: Adapts to different screen sizes

## Components

### Avatar

Root container component that manages the avatar display.

### AvatarImage

Image component with automatic fallback handling.

### AvatarFallback

Fallback content displayed when image is unavailable.

## Props Interfaces

```typescript
interface AvatarProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> {
  className?: string;
}

interface AvatarImageProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image> {
  src?: string;
  alt?: string;
  className?: string;
}

interface AvatarFallbackProps
  extends React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback> {
  className?: string;
  children: React.ReactNode;
}
```

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
      {/* Small */}
      <Avatar className="h-8 w-8">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback className="text-xs">JD</AvatarFallback>
      </Avatar>

      {/* Default */}
      <Avatar>
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Large */}
      <Avatar className="h-16 w-16">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback className="text-lg">JD</AvatarFallback>
      </Avatar>

      {/* Extra Large */}
      <Avatar className="h-24 w-24">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback className="text-2xl">JD</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

### User List with Avatars

```tsx
function UserList() {
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/john.jpg",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/avatars/jane.jpg",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      avatar: null, // No image available
    },
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
    { name: "Alice Brown", avatar: "/avatars/alice.jpg" },
    { name: "Charlie Wilson", avatar: "/avatars/charlie.jpg" },
  ];

  const maxVisible = 3;
  const visibleUsers = users.slice(0, maxVisible);
  const remainingCount = users.length - maxVisible;

  return (
    <div className="flex -space-x-2">
      {visibleUsers.map((user, index) => (
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
      {remainingCount > 0 && (
        <Avatar className="border-2 border-background">
          <AvatarFallback>+{remainingCount}</AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
```

### Avatar with Status Indicator

```tsx
function AvatarWithStatus() {
  const [status, setStatus] = useState<"online" | "offline" | "away">("online");

  const statusColors = {
    online: "bg-green-500",
    offline: "bg-gray-400",
    away: "bg-yellow-500",
  };

  return (
    <div className="relative">
      <Avatar className="h-12 w-12">
        <AvatarImage src="/avatars/user.jpg" alt="User" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div
        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${statusColors[status]}`}
        title={`Status: ${status}`}
      />
    </div>
  );
}
```

### Clickable Avatar

```tsx
function ClickableAvatar() {
  const [user, setUser] = useState({
    name: "John Doe",
    avatar: "/avatars/john.jpg",
  });

  const handleAvatarClick = () => {
    // Open profile or user menu
    console.log("Avatar clicked");
  };

  return (
    <button
      onClick={handleAvatarClick}
      className="rounded-full focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
    >
      <Avatar className="h-10 w-10 hover:opacity-80 transition-opacity">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>
          {user.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </AvatarFallback>
      </Avatar>
    </button>
  );
}
```

### Avatar Upload

```tsx
function AvatarUpload() {
  const [avatarUrl, setAvatarUrl] = useState("/avatars/default.jpg");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // Upload file and get URL
      const url = await uploadFile(file);
      setAvatarUrl(url);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={avatarUrl} alt="Profile" />
          <AvatarFallback>{isUploading ? "..." : "JD"}</AvatarFallback>
        </Avatar>

        <label
          htmlFor="avatar-upload"
          className="absolute bottom-0 right-0 h-8 w-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center cursor-pointer hover:bg-primary/90 transition-colors"
        >
          <Camera className="h-4 w-4" />
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="sr-only"
            disabled={isUploading}
          />
        </label>
      </div>

      <p className="text-sm text-muted-foreground">
        Click the camera icon to upload a new avatar
      </p>
    </div>
  );
}
```

### Custom Fallback Content

```tsx
function CustomFallbackAvatar() {
  return (
    <div className="space-y-4">
      {/* Icon Fallback */}
      <Avatar>
        <AvatarImage src="/broken-image.jpg" alt="User" />
        <AvatarFallback>
          <User className="h-6 w-6" />
        </AvatarFallback>
      </Avatar>

      {/* Gradient Fallback */}
      <Avatar>
        <AvatarImage src="/broken-image.jpg" alt="User" />
        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          AB
        </AvatarFallback>
      </Avatar>

      {/* Custom Color Fallback */}
      <Avatar>
        <AvatarImage src="/broken-image.jpg" alt="User" />
        <AvatarFallback className="bg-blue-500 text-white">CD</AvatarFallback>
      </Avatar>
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Size**: 40px × 40px (h-10 w-10) default size
- **Shape**: Circular with rounded-full
- **Background**: Muted background for fallback
- **Typography**: Centered text for initials
- **Border**: Optional border support

### Customization Options

```tsx
// Custom sizes
<Avatar className="h-6 w-6" />      // Extra small
<Avatar className="h-8 w-8" />      // Small
<Avatar className="h-12 w-12" />    // Medium
<Avatar className="h-16 w-16" />    // Large
<Avatar className="h-24 w-24" />    // Extra large

// Custom colors
<AvatarFallback className="bg-blue-500 text-white" />
<AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500" />

// Custom borders
<Avatar className="border-2 border-primary" />
<Avatar className="ring-2 ring-primary ring-offset-2" />
```

## Accessibility Features

### ARIA Support

- **Alt Text**: Proper alt attributes for images
- **Role**: Appropriate roles for interactive avatars
- **Labels**: aria-label for additional context
- **Descriptions**: aria-describedby for status indicators

### Screen Reader Support

- **Image Description**: Alt text is announced for images
- **Fallback Content**: Initials or custom content is readable
- **Status Information**: Status indicators can be announced
- **Interactive Context**: Button role for clickable avatars

## Advanced Usage

### Dynamic Avatar Colors

```tsx
function DynamicColorAvatar({ name }: { name: string }) {
  const getColorFromName = (name: string) => {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-teal-500",
    ];

    const hash = name.split("").reduce((acc, char) => {
      return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    return colors[Math.abs(hash) % colors.length];
  };

  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
  const colorClass = getColorFromName(name);

  return (
    <Avatar>
      <AvatarImage
        src={`/avatars/${name.toLowerCase().replace(" ", "-")}.jpg`}
        alt={name}
      />
      <AvatarFallback className={`${colorClass} text-white`}>
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
```

### Avatar with Tooltip

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";

function AvatarWithTooltip({
  user,
}: {
  user: { name: string; email: string; avatar?: string };
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <div className="text-center">
            <p className="font-medium">{user.name}</p>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

## Common Patterns

### Team Member Grid

```tsx
function TeamGrid() {
  const team = [
    { name: "John Doe", role: "CEO", avatar: "/avatars/john.jpg" },
    { name: "Jane Smith", role: "CTO", avatar: "/avatars/jane.jpg" },
    { name: "Bob Johnson", role: "Designer", avatar: "/avatars/bob.jpg" },
    { name: "Alice Brown", role: "Developer", avatar: "/avatars/alice.jpg" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {team.map((member) => (
        <div key={member.name} className="text-center">
          <Avatar className="h-16 w-16 mx-auto mb-3">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>
              {member.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <h3 className="font-medium">{member.name}</h3>
          <p className="text-sm text-muted-foreground">{member.role}</p>
        </div>
      ))}
    </div>
  );
}
```

### Comment Thread

```tsx
function CommentThread() {
  const comments = [
    {
      id: 1,
      author: "John Doe",
      avatar: "/avatars/john.jpg",
      content: "Great work on this feature!",
      timestamp: "2 hours ago",
    },
    {
      id: 2,
      author: "Jane Smith",
      avatar: "/avatars/jane.jpg",
      content: "I agree, this will be very useful for our users.",
      timestamp: "1 hour ago",
    },
  ];

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div key={comment.id} className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={comment.avatar} alt={comment.author} />
            <AvatarFallback>
              {comment.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="font-medium text-sm">{comment.author}</span>
              <span className="text-xs text-muted-foreground">
                {comment.timestamp}
              </span>
            </div>
            <p className="text-sm mt-1">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
```

## Use Cases

- **User Profiles**: Profile pictures and user representation
- **Team Members**: Team or organization member displays
- **Comments**: Author avatars in comment systems
- **Chat**: User avatars in messaging interfaces
- **Navigation**: User menu triggers and profile links
- **Lists**: User lists and directory displays
- **Cards**: User cards and contact information
- **Status**: Online/offline status indicators

## Best Practices

- Always provide meaningful alt text for images
- Use consistent sizing across similar contexts
- Implement proper fallback content (initials or icons)
- Consider loading states for slow image loads
- Use appropriate contrast for fallback text
- Test with screen readers for accessibility
- Optimize images for different avatar sizes
- Handle broken or missing images gracefully
- Use semantic HTML for interactive avatars

## Dependencies

- **@radix-ui/react-avatar**: Core avatar functionality
- **Tailwind CSS**: Styling system
- **React**: Component framework
