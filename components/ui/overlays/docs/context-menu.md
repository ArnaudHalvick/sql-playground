# Context Menu

A context menu component that displays a menu when right-clicking on an element. Built on Radix UI's Context Menu primitive.

## Features

- Right-click activation with keyboard navigation support
- Nested submenus and checkbox/radio items
- Keyboard shortcuts display and full accessibility support

## Installation

```bash
npm install @radix-ui/react-context-menu lucide-react
```

## Basic Usage

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/overlays/context-menu";

export function ContextMenuDemo() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Settings</ContextMenuItem>
        <ContextMenuItem>Logout</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Key Components

### ContextMenu

- `modal?: boolean` - Whether menu is modal (default: true)
- `onOpenChange?: (open: boolean) => void` - Open state change callback

### ContextMenuTrigger

- `asChild?: boolean` - Change rendered element (default: false)
- `disabled?: boolean` - Whether trigger is disabled

### ContextMenuContent

- `className?: string` - Additional CSS classes
- `sideOffset?: number` - Distance from trigger (default: 4)

### Other Components

`ContextMenuItem`, `ContextMenuCheckboxItem`, `ContextMenuRadioItem`, `ContextMenuLabel`, `ContextMenuSeparator`, `ContextMenuShortcut` - Standard menu components with props like `disabled`, `onSelect`, `checked`, etc.

## Examples

### With Submenus

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/overlays/context-menu";

function ContextMenuWithSubmenus() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Developer Tools</ContextMenuItem>
            <ContextMenuItem>Task Manager</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Settings</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### With Options

```tsx
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/overlays/context-menu";

function ContextMenuWithOptions() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [person, setPerson] = React.useState("pedro");

  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuCheckboxItem
          checked={showBookmarks}
          onCheckedChange={setShowBookmarks}
        >
          Show Bookmarks
        </ContextMenuCheckboxItem>
        <ContextMenuSeparator />
        <ContextMenuLabel>People</ContextMenuLabel>
        <ContextMenuRadioGroup value={person} onValueChange={setPerson}>
          <ContextMenuRadioItem value="pedro">Pedro</ContextMenuRadioItem>
          <ContextMenuRadioItem value="colm">Colm</ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### With Shortcuts

```tsx
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuShortcut,
  ContextMenuTrigger,
} from "@/components/ui/overlays/context-menu";

function ContextMenuWithShortcuts() {
  return (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Copy
          <ContextMenuShortcut>⌘C</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Paste
          <ContextMenuShortcut>⌘V</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### File Actions

```tsx
import { Copy, Download, Edit, Share, Trash2 } from "lucide-react";

function FileContextMenu() {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="flex h-[200px] w-[300px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50">
          <div className="text-center">
            <div className="mx-auto h-12 w-12 text-gray-400">📁</div>
            <p className="mt-2 text-sm text-gray-600">Right-click this file</p>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Rename
        </ContextMenuItem>
        <ContextMenuItem>
          <Copy className="mr-2 h-4 w-4" />
          Copy
        </ContextMenuItem>
        <ContextMenuItem>
          <Download className="mr-2 h-4 w-4" />
          Download
        </ContextMenuItem>
        <ContextMenuItem>
          <Share className="mr-2 h-4 w-4" />
          Share
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className="text-red-600">
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

## Best Practices

- Use for contextual actions relevant to the trigger element
- Keep menu items concise and clearly labeled
- Group related actions with separators
- Include keyboard shortcuts for power users
