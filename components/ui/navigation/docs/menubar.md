# Menubar

A visually persistent menu common in desktop applications that provides a consistent set of commands.

## Features

- Multiple menu triggers in a single menubar
- Keyboard navigation support
- Nested submenus
- Checkbox and radio items
- Built on top of Radix UI Menubar primitive

## Installation

```bash
npm install @radix-ui/react-menubar lucide-react
```

## Usage

### Basic Example

```tsx
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/navigation/menubar";

export function MenubarDemo() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem disabled>New Incognito Window</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Share <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Print... <MenubarShortcut>⌘P</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Edit</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Undo <MenubarShortcut>⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Find <MenubarShortcut>⌘F</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Always Show Bookmarks Bar</MenubarItem>
          <MenubarItem>Always Show Full URLs</MenubarItem>
          <MenubarSeparator />
          <MenubarItem inset>
            Reload <MenubarShortcut>⌘R</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### With Submenus

```tsx
import {
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from "@/components/ui/navigation/menubar";

function MenubarWithSubmenus() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New File</MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>New From Template</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>React Component</MenubarItem>
              <MenubarItem>Vue Component</MenubarItem>
              <MenubarItem>Angular Component</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem>Open File</MenubarItem>
          <MenubarItem>Save File</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### With Checkbox and Radio Items

```tsx
import {
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
} from "@/components/ui/navigation/menubar";

function MenubarWithCheckboxes() {
  const [showBookmarks, setShowBookmarks] = React.useState(true);
  const [position, setPosition] = React.useState("bottom");

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={showBookmarks}
            onCheckedChange={setShowBookmarks}
          >
            Show Bookmarks
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={position} onValueChange={setPosition}>
            <MenubarRadioItem value="top">Panel Position: Top</MenubarRadioItem>
            <MenubarRadioItem value="bottom">
              Panel Position: Bottom
            </MenubarRadioItem>
            <MenubarRadioItem value="right">
              Panel Position: Right
            </MenubarRadioItem>
          </MenubarRadioGroup>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## API Reference

### Menubar

| Prop       | Type              | Default | Description            |
| ---------- | ----------------- | ------- | ---------------------- |
| `children` | `React.ReactNode` | -       | MenubarMenu components |

### MenubarMenu

| Prop       | Type              | Default | Description                       |
| ---------- | ----------------- | ------- | --------------------------------- |
| `children` | `React.ReactNode` | -       | MenubarTrigger and MenubarContent |

### MenubarTrigger

| Prop       | Type              | Default | Description     |
| ---------- | ----------------- | ------- | --------------- |
| `children` | `React.ReactNode` | -       | Trigger content |

### MenubarContent

| Prop       | Type              | Default | Description |
| ---------- | ----------------- | ------- | ----------- |
| `children` | `React.ReactNode` | -       | Menu items  |

### MenubarItem

| Prop       | Type              | Default | Description              |
| ---------- | ----------------- | ------- | ------------------------ |
| `disabled` | `boolean`         | `false` | Whether item is disabled |
| `inset`    | `boolean`         | `false` | Add left padding         |
| `children` | `React.ReactNode` | -       | Item content             |

### MenubarShortcut

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `children` | `React.ReactNode` | -       | Shortcut text |

## Accessibility

- Full keyboard navigation support
- Screen reader friendly with proper ARIA attributes
- Focus management and visual indicators
- Follows WAI-ARIA Menubar pattern

## Use Cases

- Desktop application menus
- Text editor command menus
- IDE navigation menus
- Complex application toolbars
- Any interface requiring persistent menu access
