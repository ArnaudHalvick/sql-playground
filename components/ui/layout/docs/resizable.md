# Resizable

Accessible resizable panel groups and layouts.

## Features

- Resizable panels with drag handles
- Keyboard accessible
- Supports both horizontal and vertical layouts
- Minimum and maximum size constraints
- Collapsible panels
- Built on top of react-resizable-panels
- Smooth animations and interactions

## Installation

This component is built using react-resizable-panels. Make sure you have the required dependencies:

```bash
npm install react-resizable-panels lucide-react
```

## Usage

### Basic Example

```tsx
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/layout/resizable";

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">One</span>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-[200px] items-center justify-center p-6">
          <span className="font-semibold">Two</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### Vertical Layout

```tsx
<ResizablePanelGroup
  direction="vertical"
  className="min-h-[200px] max-w-md rounded-lg border"
>
  <ResizablePanel defaultSize={25}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Header</span>
    </div>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={75}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

### With Handle

```tsx
<ResizablePanelGroup
  direction="horizontal"
  className="min-h-[200px] max-w-md rounded-lg border"
>
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Sidebar</span>
    </div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-6">
      <span className="font-semibold">Content</span>
    </div>
  </ResizablePanel>
</ResizablePanelGroup>
```

## API Reference

### ResizablePanelGroup

The root container that manages the resizable panels.

| Prop        | Type                         | Default        | Description                            |
| ----------- | ---------------------------- | -------------- | -------------------------------------- |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | The direction of the panel group       |
| `className` | `string`                     | -              | Additional CSS classes                 |
| `onLayout`  | `(sizes: number[]) => void`  | -              | Callback fired when panel sizes change |

### ResizablePanel

An individual resizable panel within the group.

| Prop            | Type         | Default | Description                                |
| --------------- | ------------ | ------- | ------------------------------------------ |
| `defaultSize`   | `number`     | -       | The default size of the panel (percentage) |
| `minSize`       | `number`     | -       | The minimum size of the panel (percentage) |
| `maxSize`       | `number`     | -       | The maximum size of the panel (percentage) |
| `collapsible`   | `boolean`    | `false` | Whether the panel can be collapsed         |
| `collapsedSize` | `number`     | `0`     | The size when collapsed (percentage)       |
| `onCollapse`    | `() => void` | -       | Callback fired when panel collapses        |
| `onExpand`      | `() => void` | -       | Callback fired when panel expands          |

### ResizableHandle

The draggable handle between panels.

| Prop         | Type      | Default | Description                                 |
| ------------ | --------- | ------- | ------------------------------------------- |
| `withHandle` | `boolean` | `false` | Whether to show the visual handle indicator |
| `className`  | `string`  | -       | Additional CSS classes                      |

## Examples

### Three Panel Layout

```tsx
function ThreePanelLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] rounded-lg border"
    >
      <ResizablePanel defaultSize={20} minSize={15} maxSize={30}>
        <div className="flex h-full items-center justify-center p-6 bg-muted">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={60}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={20} minSize={15} maxSize={25}>
        <div className="flex h-full items-center justify-center p-6 bg-muted">
          <span className="font-semibold">Inspector</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### Nested Layouts

```tsx
function NestedLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[400px] rounded-lg border"
    >
      <ResizablePanel defaultSize={30}>
        <div className="flex h-full items-center justify-center p-6 bg-muted">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={70}>
        <ResizablePanelGroup direction="vertical">
          <ResizablePanel defaultSize={70}>
            <div className="flex h-full items-center justify-center p-6">
              <span className="font-semibold">Main Content</span>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={30}>
            <div className="flex h-full items-center justify-center p-6 bg-muted">
              <span className="font-semibold">Footer</span>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### Code Editor Layout

```tsx
function CodeEditorLayout() {
  return (
    <div className="h-screen">
      <ResizablePanelGroup direction="vertical">
        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={20} minSize={10} collapsible>
              <div className="flex h-full flex-col p-4 bg-muted">
                <h3 className="font-semibold mb-4">Explorer</h3>
                <div className="space-y-2 text-sm">
                  <div>📁 src</div>
                  <div className="pl-4">📄 index.ts</div>
                  <div className="pl-4">📄 app.tsx</div>
                  <div>📁 components</div>
                  <div className="pl-4">📄 button.tsx</div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60}>
              <div className="flex h-full items-center justify-center p-6">
                <span className="font-semibold">Editor</span>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={20} minSize={10} collapsible>
              <div className="flex h-full flex-col p-4 bg-muted">
                <h3 className="font-semibold mb-4">Properties</h3>
                <div className="space-y-2 text-sm">
                  <div>Width: 100%</div>
                  <div>Height: auto</div>
                  <div>Margin: 0</div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20} minSize={10}>
          <div className="flex h-full items-center justify-center p-6 bg-muted">
            <span className="font-semibold">Terminal</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
```

### Collapsible Panels

```tsx
function CollapsiblePanels() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[300px] rounded-lg border"
    >
      <ResizablePanel
        defaultSize={25}
        minSize={10}
        collapsible
        collapsedSize={5}
        onCollapse={() => console.log("Panel collapsed")}
        onExpand={() => console.log("Panel expanded")}
      >
        <div className="flex h-full items-center justify-center p-6 bg-muted">
          <span className="font-semibold">Collapsible</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Main Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## Styling

The component uses CSS custom properties and data attributes for styling:

- `data-panel-group-direction` - The direction of the panel group
- `data-panel-group-id` - Unique identifier for the panel group
- `data-resize-handle-active` - When a handle is being dragged

You can customize the appearance using these attributes:

```css
[data-panel-group-direction="vertical"] {
  flex-direction: column;
}

[data-resize-handle-active] {
  background-color: blue;
}
```

## Accessibility

- Supports keyboard navigation (Arrow keys, Home, End)
- Proper ARIA attributes for screen readers
- Focus management during resize operations
- Respects user's motion preferences

## Use Cases

- **Code editors**: File explorer, editor, and properties panels
- **Dashboard layouts**: Resizable widgets and sections
- **Data visualization**: Adjustable chart and table views
- **Email clients**: Folder list, message list, and preview pane
- **Design tools**: Tool panels, canvas, and property inspectors
- **Documentation**: Table of contents and content areas
