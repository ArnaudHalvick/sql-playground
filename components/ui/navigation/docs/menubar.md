# Menubar

A visually persistent menu common in desktop applications that provides a consistent set of commands.

## Features

- Multiple menu triggers in a single menubar
- Keyboard navigation support
- Nested submenus
- Checkbox and radio items
- Keyboard shortcuts display
- Built on top of Radix UI Menubar primitive
- Accessible by default

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

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
  const [showFullUrls, setShowFullUrls] = React.useState(false);
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
          <MenubarCheckboxItem
            checked={showFullUrls}
            onCheckedChange={setShowFullUrls}
          >
            Show Full URLs
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

The root menubar component.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | MenubarMenu components |

### MenubarMenu

Individual menu within the menubar.

| Prop       | Type              | Default | Description                       |
| ---------- | ----------------- | ------- | --------------------------------- |
| `children` | `React.ReactNode` | -       | MenubarTrigger and MenubarContent |

### MenubarTrigger

Button that opens the menu.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Trigger content        |

### MenubarContent

Container for menu items.

| Prop         | Type                           | Default   | Description                   |
| ------------ | ------------------------------ | --------- | ----------------------------- |
| `className`  | `string`                       | -         | Additional CSS classes        |
| `align`      | `"start" \| "center" \| "end"` | `"start"` | Alignment relative to trigger |
| `sideOffset` | `number`                       | `8`       | Distance from trigger         |

### MenubarItem

Individual menu item.

| Prop       | Type         | Default | Description                    |
| ---------- | ------------ | ------- | ------------------------------ |
| `inset`    | `boolean`    | `false` | Whether to inset the item      |
| `disabled` | `boolean`    | `false` | Whether the item is disabled   |
| `onSelect` | `() => void` | -       | Callback when item is selected |

### MenubarCheckboxItem

Menu item with checkbox functionality.

| Prop              | Type                         | Default | Description                         |
| ----------------- | ---------------------------- | ------- | ----------------------------------- |
| `checked`         | `boolean`                    | -       | Whether the item is checked         |
| `onCheckedChange` | `(checked: boolean) => void` | -       | Callback when checked state changes |

### MenubarRadioGroup

Container for radio menu items.

| Prop            | Type                      | Default | Description                     |
| --------------- | ------------------------- | ------- | ------------------------------- |
| `value`         | `string`                  | -       | Currently selected value        |
| `onValueChange` | `(value: string) => void` | -       | Callback when selection changes |

### MenubarRadioItem

Radio menu item.

| Prop    | Type     | Default | Description                  |
| ------- | -------- | ------- | ---------------------------- |
| `value` | `string` | -       | The value of this radio item |

### MenubarSub

Container for submenu.

| Prop       | Type              | Default | Description                             |
| ---------- | ----------------- | ------- | --------------------------------------- |
| `children` | `React.ReactNode` | -       | MenubarSubTrigger and MenubarSubContent |

### MenubarSubTrigger

Trigger for submenu.

| Prop       | Type              | Default | Description                  |
| ---------- | ----------------- | ------- | ---------------------------- |
| `inset`    | `boolean`         | `false` | Whether to inset the trigger |
| `children` | `React.ReactNode` | -       | Trigger content              |

### MenubarSubContent

Container for submenu items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### MenubarSeparator

Visual separator between menu items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### MenubarShortcut

Displays keyboard shortcuts.

| Prop       | Type              | Default | Description   |
| ---------- | ----------------- | ------- | ------------- |
| `children` | `React.ReactNode` | -       | Shortcut text |

## Examples

### Text Editor Menubar

```tsx
function TextEditorMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Save <MenubarShortcut>⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Save As... <MenubarShortcut>⇧⌘S</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Export as PDF</MenubarItem>
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
            Cut <MenubarShortcut>⌘X</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Copy <MenubarShortcut>⌘C</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Paste <MenubarShortcut>⌘V</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Format</MenubarTrigger>
        <MenubarContent>
          <MenubarSub>
            <MenubarSubTrigger>Text</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Bold</MenubarItem>
              <MenubarItem>Italic</MenubarItem>
              <MenubarItem>Underline</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSub>
            <MenubarSubTrigger>Align</MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem>Left</MenubarItem>
              <MenubarItem>Center</MenubarItem>
              <MenubarItem>Right</MenubarItem>
              <MenubarItem>Justify</MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### Application Menubar

```tsx
function ApplicationMenubar() {
  const [theme, setTheme] = React.useState("light");
  const [sidebarVisible, setSidebarVisible] = React.useState(true);

  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Application</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Application</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Preferences <MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Quit <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>View</MenubarTrigger>
        <MenubarContent>
          <MenubarCheckboxItem
            checked={sidebarVisible}
            onCheckedChange={setSidebarVisible}
          >
            Show Sidebar
          </MenubarCheckboxItem>
          <MenubarSeparator />
          <MenubarRadioGroup value={theme} onValueChange={setTheme}>
            <MenubarRadioItem value="light">Light Theme</MenubarRadioItem>
            <MenubarRadioItem value="dark">Dark Theme</MenubarRadioItem>
            <MenubarRadioItem value="system">System Theme</MenubarRadioItem>
          </MenubarRadioGroup>
          <MenubarSeparator />
          <MenubarItem>
            Zoom In <MenubarShortcut>⌘+</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Zoom Out <MenubarShortcut>⌘-</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Help</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>Documentation</MenubarItem>
          <MenubarItem>Keyboard Shortcuts</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Report Issue</MenubarItem>
          <MenubarItem>Contact Support</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

### Browser-style Menubar

```tsx
function BrowserMenubar() {
  return (
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>Chrome</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>About Chrome</MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Preferences <MenubarShortcut>⌘,</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Hide Chrome <MenubarShortcut>⌘H</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Quit Chrome <MenubarShortcut>⌘Q</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            New Tab <MenubarShortcut>⌘T</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Window <MenubarShortcut>⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            New Incognito Window <MenubarShortcut>⇧⌘N</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>
            Open File <MenubarShortcut>⌘O</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Open Location <MenubarShortcut>⌘L</MenubarShortcut>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarMenu>
        <MenubarTrigger>Bookmarks</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            Bookmark This Page <MenubarShortcut>⌘D</MenubarShortcut>
          </MenubarItem>
          <MenubarItem>
            Bookmark All Tabs <MenubarShortcut>⇧⌘D</MenubarShortcut>
          </MenubarItem>
          <MenubarSeparator />
          <MenubarItem>Show Bookmarks Bar</MenubarItem>
          <MenubarItem>Bookmark Manager</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom styling
<Menubar className="border-2 border-blue-200 rounded-xl">
  <MenubarMenu>
    <MenubarTrigger className="text-blue-600 hover:bg-blue-50">
      Custom Menu
    </MenubarTrigger>
    <MenubarContent className="border-blue-200">
      <MenubarItem className="hover:bg-blue-50">Custom Item</MenubarItem>
    </MenubarContent>
  </MenubarMenu>
</Menubar>
```

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape)
- Screen reader support with proper ARIA attributes
- Focus management between menus
- Supports assistive technologies
- Follows WAI-ARIA Menubar pattern

## Use Cases

- **Desktop applications**: Traditional application menus
- **Text editors**: File, edit, format operations
- **Web applications**: Complex navigation structures
- **Admin panels**: Administrative actions and settings
- **Development tools**: IDE-like interfaces
- **Media applications**: Playback and editing controls
