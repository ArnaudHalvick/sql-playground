# Command

Fast, composable, unstyled command menu for React.

## Features

- Fast fuzzy search
- Keyboard navigation
- Composable command groups
- Custom filtering and sorting
- Built on top of cmdk
- Accessible by default
- Customizable styling

## Installation

This component is built using cmdk and Lucide React icons. Make sure you have the required dependencies:

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
import {
  Calendar,
  Smile,
  Calculator,
  User,
  CreditCard,
  Settings,
} from "lucide-react";

function CommandWithIcons() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type a command or search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Suggestions">
          <CommandItem>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Calendar</span>
          </CommandItem>
          <CommandItem>
            <Smile className="mr-2 h-4 w-4" />
            <span>Search Emoji</span>
          </CommandItem>
          <CommandItem>
            <Calculator className="mr-2 h-4 w-4" />
            <span>Calculator</span>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
            <CommandShortcut>⌘P</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <CreditCard className="mr-2 h-4 w-4" />
            <span>Billing</span>
            <CommandShortcut>⌘B</CommandShortcut>
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

The root command component.

| Prop            | Type                                        | Default | Description                     |
| --------------- | ------------------------------------------- | ------- | ------------------------------- |
| `value`         | `string`                                    | -       | The controlled selected value   |
| `onValueChange` | `(value: string) => void`                   | -       | Callback when selection changes |
| `filter`        | `(value: string, search: string) => number` | -       | Custom filter function          |
| `shouldFilter`  | `boolean`                                   | `true`  | Whether to filter items         |
| `loop`          | `boolean`                                   | `false` | Whether to loop through items   |

### CommandDialog

A command component rendered in a dialog.

| Prop           | Type                      | Default | Description                      |
| -------------- | ------------------------- | ------- | -------------------------------- |
| `open`         | `boolean`                 | -       | Whether the dialog is open       |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback when open state changes |

### CommandInput

The command input for searching.

| Prop            | Type                      | Default | Description                 |
| --------------- | ------------------------- | ------- | --------------------------- |
| `placeholder`   | `string`                  | -       | Input placeholder text      |
| `value`         | `string`                  | -       | Controlled input value      |
| `onValueChange` | `(value: string) => void` | -       | Callback when input changes |

### CommandList

Container for command items.

| Prop       | Type              | Default | Description              |
| ---------- | ----------------- | ------- | ------------------------ |
| `children` | `React.ReactNode` | -       | Command items and groups |

### CommandEmpty

Displayed when no items match the search.

| Prop       | Type              | Default | Description         |
| ---------- | ----------------- | ------- | ------------------- |
| `children` | `React.ReactNode` | -       | Empty state content |

### CommandGroup

Groups related command items.

| Prop       | Type              | Default | Description        |
| ---------- | ----------------- | ------- | ------------------ |
| `heading`  | `string`          | -       | Group heading text |
| `children` | `React.ReactNode` | -       | Command items      |

### CommandItem

Individual command item.

| Prop       | Type                      | Default | Description                    |
| ---------- | ------------------------- | ------- | ------------------------------ |
| `value`    | `string`                  | -       | Item value for filtering       |
| `onSelect` | `(value: string) => void` | -       | Callback when item is selected |
| `disabled` | `boolean`                 | `false` | Whether the item is disabled   |

### CommandSeparator

Visual separator between groups.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### CommandShortcut

Displays keyboard shortcuts.

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `children` | `React.ReactNode` | -       | Shortcut text |

## Examples

### File Search

```tsx
function FileSearchCommand() {
  const files = [
    { name: "README.md", path: "/docs/README.md" },
    { name: "package.json", path: "/package.json" },
    { name: "tsconfig.json", path: "/tsconfig.json" },
    { name: "index.tsx", path: "/src/index.tsx" },
    { name: "App.tsx", path: "/src/App.tsx" },
  ];

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search files..." />
      <CommandList>
        <CommandEmpty>No files found.</CommandEmpty>
        <CommandGroup heading="Files">
          {files.map((file) => (
            <CommandItem key={file.path} value={file.name}>
              <span>{file.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {file.path}
              </span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Navigation Command

```tsx
function NavigationCommand() {
  const navigate = (path: string) => {
    // Handle navigation
    console.log(`Navigating to ${path}`);
  };

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Go to..." />
      <CommandList>
        <CommandEmpty>No pages found.</CommandEmpty>
        <CommandGroup heading="Pages">
          <CommandItem onSelect={() => navigate("/dashboard")}>
            <span>Dashboard</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/users")}>
            <span>Users</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/settings")}>
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Documentation">
          <CommandItem onSelect={() => navigate("/docs")}>
            <span>Getting Started</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/docs/components")}>
            <span>Components</span>
          </CommandItem>
          <CommandItem onSelect={() => navigate("/docs/api")}>
            <span>API Reference</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Theme Switcher

```tsx
function ThemeSwitcherCommand() {
  const [theme, setTheme] = React.useState("system");

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Change theme..." />
      <CommandList>
        <CommandEmpty>No theme found.</CommandEmpty>
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => setTheme("light")}>
            <span>Light</span>
            {theme === "light" && <span className="ml-auto">✓</span>}
          </CommandItem>
          <CommandItem onSelect={() => setTheme("dark")}>
            <span>Dark</span>
            {theme === "dark" && <span className="ml-auto">✓</span>}
          </CommandItem>
          <CommandItem onSelect={() => setTheme("system")}>
            <span>System</span>
            {theme === "system" && <span className="ml-auto">✓</span>}
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Action Command

```tsx
function ActionCommand() {
  const actions = [
    { label: "Copy", shortcut: "⌘C", action: () => console.log("Copy") },
    { label: "Cut", shortcut: "⌘X", action: () => console.log("Cut") },
    { label: "Paste", shortcut: "⌘V", action: () => console.log("Paste") },
    { label: "Undo", shortcut: "⌘Z", action: () => console.log("Undo") },
    { label: "Redo", shortcut: "⌘⇧Z", action: () => console.log("Redo") },
  ];

  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Type an action..." />
      <CommandList>
        <CommandEmpty>No actions found.</CommandEmpty>
        <CommandGroup heading="Actions">
          {actions.map((action) => (
            <CommandItem key={action.label} onSelect={action.action}>
              <span>{action.label}</span>
              <CommandShortcut>{action.shortcut}</CommandShortcut>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

### Multi-Group Command

```tsx
function MultiGroupCommand() {
  return (
    <Command className="rounded-lg border shadow-md">
      <CommandInput placeholder="Search..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        <CommandGroup heading="Recent">
          <CommandItem>
            <span>Project Alpha</span>
          </CommandItem>
          <CommandItem>
            <span>Project Beta</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Projects">
          <CommandItem>
            <span>Create New Project</span>
            <CommandShortcut>⌘N</CommandShortcut>
          </CommandItem>
          <CommandItem>
            <span>Import Project</span>
            <CommandShortcut>⌘I</CommandShortcut>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        <CommandGroup heading="Account">
          <CommandItem>
            <span>Profile Settings</span>
          </CommandItem>
          <CommandItem>
            <span>Billing</span>
          </CommandItem>
          <CommandItem>
            <span>Sign Out</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom styling
<Command className="rounded-xl border-2 border-blue-200 shadow-xl">
  <CommandInput className="border-none focus:ring-0" />
  <CommandList className="max-h-80">
    <CommandGroup className="text-blue-600">
      <CommandItem className="hover:bg-blue-50">Custom Item</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>
```

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader support with proper ARIA attributes
- Focus management
- Supports assistive technologies

## Use Cases

- **Command palettes**: Quick actions and navigation
- **Search interfaces**: File search, content search
- **Quick switchers**: Theme, language, workspace switching
- **Action menus**: Context-sensitive actions
- **Navigation**: Quick page/section navigation
- **Tool launchers**: Application or tool selection
