# Resizable

Accessible resizable panel groups and layouts.

## Features

- Resizable panels with drag handles
- Keyboard accessible
- Horizontal and vertical layouts
- Minimum and maximum size constraints
- Built on react-resizable-panels

## Installation

```bash
npm install react-resizable-panels
```

## Usage

### Basic Example

```tsx
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
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
function VerticalResizable() {
  return (
    <ResizablePanelGroup
      direction="vertical"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          Header
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={75}>
        <div className="flex h-full items-center justify-center p-6">
          Content
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### Three Panel Layout

```tsx
function ThreePanelLayout() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">
          Sidebar
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">Main</div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={25}>
        <div className="flex h-full items-center justify-center p-6">Aside</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

### With Size Constraints

```tsx
function ConstrainedResizable() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="min-h-[200px] max-w-md rounded-lg border"
    >
      <ResizablePanel defaultSize={50} minSize={30} maxSize={70}>
        <div className="flex h-full items-center justify-center p-6">
          Constrained (30-70%)
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-6">
          Flexible
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
```

## API Reference

### ResizablePanelGroup

| Prop        | Type                         | Default        | Description                 |
| ----------- | ---------------------------- | -------------- | --------------------------- |
| `direction` | `"horizontal" \| "vertical"` | `"horizontal"` | Layout direction            |
| `className` | `string`                     | -              | Additional CSS classes      |
| `children`  | `React.ReactNode`            | -              | Panel and handle components |

### ResizablePanel

| Prop          | Type              | Default | Description             |
| ------------- | ----------------- | ------- | ----------------------- |
| `defaultSize` | `number`          | -       | Initial size percentage |
| `minSize`     | `number`          | -       | Minimum size percentage |
| `maxSize`     | `number`          | -       | Maximum size percentage |
| `className`   | `string`          | -       | Additional CSS classes  |
| `children`    | `React.ReactNode` | -       | Panel content           |

### ResizableHandle

| Prop         | Type      | Default | Description                  |
| ------------ | --------- | ------- | ---------------------------- |
| `className`  | `string`  | -       | Additional CSS classes       |
| `withHandle` | `boolean` | `false` | Show visual handle indicator |

## Accessibility

- Keyboard navigation support
- Screen reader announcements
- ARIA attributes for resize handles
- Proper semantic structure

## Best Practices

- Set reasonable min/max size constraints
- Provide visual feedback during resize
- Consider responsive behavior
- Test keyboard navigation
