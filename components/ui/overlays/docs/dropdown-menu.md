# Dropdown Menu

A dropdown menu component that displays a menu when clicking on a trigger element. Built on Radix UI's Dropdown Menu primitive.

## Features

- Click to open/close with keyboard navigation support
- Nested submenus and checkbox/radio items
- Keyboard shortcuts display and full accessibility support

## Installation

```bash
npm install @radix-ui/react-dropdown-menu lucide-react
```

## Basic Usage

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";
import { Button } from "@/components/ui/button";

export function DropdownMenuDemo() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Key Components

### DropdownMenu

- `defaultOpen?: boolean` - Default open state
- `open?: boolean` - Controlled open state
- `onOpenChange?: (open: boolean) => void` - Open state change callback
- `modal?: boolean` - Whether menu is modal (default: false)

### DropdownMenuTrigger

- `asChild?: boolean` - Change rendered element (default: false)
- `disabled?: boolean` - Whether trigger is disabled

### DropdownMenuContent

- `className?: string` - Additional CSS classes
- `sideOffset?: number` - Distance from trigger (default: 4)
- `side?: "top" | "right" | "bottom" | "left"` - Preferred side (default: "bottom")
- `align?: "start" | "center" | "end"` - Alignment (default: "center")

### Other Components

`DropdownMenuItem`, `DropdownMenuCheckboxItem`, `DropdownMenuRadioItem`, `DropdownMenuLabel`, `DropdownMenuSeparator`, `DropdownMenuShortcut` - Standard menu components.

## Examples

### User Profile Menu

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, LogOut } from "lucide-react";

function UserProfileMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="@johndoe" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <User className="mr-2 h-4 w-4" />
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Settings className="mr-2 h-4 w-4" />
          <span>Settings</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Actions Menu with Submenus

```tsx
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";
import { MoreHorizontal, Edit, Copy, Share } from "lucide-react";

function ActionsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Share className="mr-2 h-4 w-4" />
            Share
          </DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Email</DropdownMenuItem>
            <DropdownMenuItem>Copy Link</DropdownMenuItem>
            <DropdownMenuItem>Social Media</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### With Options

```tsx
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/overlays/dropdown-menu";

function OptionsMenu() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [person, setPerson] = React.useState("pedro");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Options</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>View Options</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuLabel>People</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={person} onValueChange={setPerson}>
          <DropdownMenuRadioItem value="pedro">Pedro</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="colm">Colm</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## Best Practices

- Use clear, descriptive labels for menu items
- Group related items with separators and labels
- Include keyboard shortcuts for common actions
- Use icons to improve visual hierarchy
- Keep menu depth reasonable (avoid too many nested submenus)
