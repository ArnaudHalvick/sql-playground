# Command

Fast, composable, unstyled command menu for React.

## Features

- Fast fuzzy search
- Keyboard navigation
- Composable command groups
- Built on top of cmdk
- Accessible by default

## Installation

```bash
npm install cmdk lucide-react
```

## Usage

### Basic Example

```tsx
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/navigation/command";

export function CommandDemo() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Command Dialog

```tsx
function CommandDialogDemo() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <p className="text-sm text-muted-foreground">
        Press{" "}
        <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </p>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
            <CommandItem>
              <span>Search Emoji</span>
            </CommandItem>
            <CommandItem>
              <span>Calculator</span>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
```

### With Icons

```tsx
import { Calendar, User, Settings } from "lucide-react";

function CommandWithIcons() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
            <CommandShortcut>⌘S</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## API Reference

### Command

| Prop            | Type                      | Default | Description                     |
| --------------- | ------------------------- | ------- | ------------------------------- |
| `value`         | `string`                  | -       | The controlled selected value   |
| `onValueChange` | `(value: string) => void` | -       | Callback when selection changes |

### CommandDialog

| Prop           | Type                      | Default | Description                      |
| -------------- | ------------------------- | ------- | -------------------------------- |
| `open`         | `boolean`                 | -       | Whether the dialog is open       |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes |

### CommandInput

| Prop          | Type     | Default | Description            |
| ------------- | -------- | ------- | ---------------------- |
| `placeholder` | `string` | -       | Input placeholder text |

### CommandList

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `children` | `React.ReactNode` | -       | Command items |

### CommandEmpty

| Prop       | Type              | Default | Description         |
| ---------- | ----------------- | ------- | ------------------- |
| `children` | `React.ReactNode` | -       | Empty state content |

### CommandGroup

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `heading`  | `string`          | -       | Group heading |
| `children` | `React.ReactNode` | -       | Command items |

### CommandItem

| Prop       | Type              | Default | Description              |
| ---------- | ----------------- | ------- | ------------------------ |
| `value`    | `string`          | -       | Item value for search    |
| `disabled` | `boolean`         | `false` | Whether item is disabled |
| `onSelect` | `() => void`      | -       | Callback when selected   |
| `children` | `React.ReactNode` | -       | Item content             |

### CommandShortcut

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `children` | `React.ReactNode` | -       | Shortcut text |

## Accessibility

- Full keyboard navigation support
- Screen reader friendly with proper ARIA attributes
- Focus management and visual indicators

## Use Cases

- Application command palettes
- Quick action menus
- Search interfaces
- Navigation shortcuts
