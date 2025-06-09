# Context Menu

A context menu component that displays a menu when right-clicking on an element. Built on top of Radix UI's Context Menu primitive with custom styling.

## Features

- Right-click activation
- Keyboard navigation support
- Nested submenus
- Checkbox and radio items
- Keyboard shortcuts display
- Customizable styling
- Full accessibility support

## Installation

```bash
npm install @radix-ui/react-context-menu lucide-react
```

## Usage

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

## API Reference

### ContextMenu

The root component that manages the context menu state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `modal`        | `boolean`                 | `true`  | Whether the menu is modal                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |

### ContextMenuTrigger

The element that triggers the context menu on right-click.

| Prop       | Type      | Default | Description                         |
| ---------- | --------- | ------- | ----------------------------------- |
| `asChild`  | `boolean` | `false` | Change the default rendered element |
| `disabled` | `boolean` | `false` | Whether the trigger is disabled     |

### ContextMenuContent

The content container for the context menu.

| Prop          | Type     | Default | Description               |
| ------------- | -------- | ------- | ------------------------- |
| `className`   | `string` | -       | Additional CSS classes    |
| `sideOffset`  | `number` | `4`     | Distance from the trigger |
| `alignOffset` | `number` | `0`     | Alignment offset          |

### ContextMenuItem

A menu item within the context menu.

| Prop       | Type                     | Default | Description                               |
| ---------- | ------------------------ | ------- | ----------------------------------------- |
| `inset`    | `boolean`                | `false` | Whether to add left padding for alignment |
| `disabled` | `boolean`                | `false` | Whether the item is disabled              |
| `onSelect` | `(event: Event) => void` | -       | Callback fired when item is selected      |

### ContextMenuCheckboxItem

A checkbox menu item.

| Prop              | Type                         | Default | Description                               |
| ----------------- | ---------------------------- | ------- | ----------------------------------------- |
| `checked`         | `boolean \| "indeterminate"` | -       | The checked state                         |
| `onCheckedChange` | `(checked: boolean) => void` | -       | Callback fired when checked state changes |
| `disabled`        | `boolean`                    | `false` | Whether the item is disabled              |

### ContextMenuRadioItem

A radio menu item.

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `value`    | `string`  | -       | The value of the radio item  |
| `disabled` | `boolean` | `false` | Whether the item is disabled |

### ContextMenuLabel

A label for grouping menu items.

| Prop        | Type      | Default | Description                               |
| ----------- | --------- | ------- | ----------------------------------------- |
| `inset`     | `boolean` | `false` | Whether to add left padding for alignment |
| `className` | `string`  | -       | Additional CSS classes                    |

### ContextMenuSeparator

A visual separator between menu items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### ContextMenuShortcut

A component for displaying keyboard shortcuts.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

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
            <ContextMenuItem>Extensions</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem>Settings</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### With Checkboxes and Radio Items

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
  const [showFullUrls, setShowFullUrls] = React.useState(false);
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
        <ContextMenuCheckboxItem
          checked={showFullUrls}
          onCheckedChange={setShowFullUrls}
        >
          Show Full URLs
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

### With Keyboard Shortcuts

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
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          View Source
          <ContextMenuShortcut>⌘U</ContextMenuShortcut>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
```

### File Explorer Context Menu

```tsx
import { File, Folder, Trash2, Edit, Copy } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/overlays/context-menu";

function FileExplorerContextMenu() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {[1, 2, 3, 4].map((item) => (
        <ContextMenu key={item}>
          <ContextMenuTrigger className="flex flex-col items-center p-4 rounded-lg border hover:bg-muted cursor-pointer">
            {item % 2 === 0 ? (
              <Folder className="h-8 w-8 mb-2" />
            ) : (
              <File className="h-8 w-8 mb-2" />
            )}
            <span className="text-sm">
              {item % 2 === 0 ? `Folder ${item}` : `File ${item}.txt`}
            </span>
          </ContextMenuTrigger>
          <ContextMenuContent>
            <ContextMenuItem>
              <Edit className="mr-2 h-4 w-4" />
              Rename
            </ContextMenuItem>
            <ContextMenuItem>
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </ContextMenuItem>
            <ContextMenuSeparator />
            <ContextMenuItem className="text-red-600">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </ContextMenuItem>
          </ContextMenuContent>
        </ContextMenu>
      ))}
    </div>
  );
}
```

## Styling

The context menu components can be styled using Tailwind CSS classes. The default styles provide a clean, modern appearance that matches other UI components.

```tsx
<ContextMenuContent className="w-56 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
  <ContextMenuItem className="text-green-600 hover:bg-green-50 dark:hover:bg-green-900/20">
    Create New
  </ContextMenuItem>
</ContextMenuContent>
```

## Accessibility

- Supports keyboard navigation with arrow keys
- Follows WAI-ARIA design patterns
- Proper focus management
- Screen reader compatible
- Supports escape key to close

## Common Use Cases

- File/folder operations in file managers
- Text editing operations (cut, copy, paste)
- Image manipulation options
- Table row actions
- Canvas/drawing application tools
- Code editor context actions
