# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Features

- Keyboard navigation support
- Automatic and manual activation modes
- Horizontal and vertical orientations
- Accessible by default
- Built on top of Radix UI Tabs primitive

## Installation

```bash
npm install @radix-ui/react-tabs
```

## Usage

### Basic Example

```tsx
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/navigation/tabs";

export function TabsDemo() {
  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Make changes to your account here.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full p-2 border rounded"
              defaultValue="Pedro Duarte"
            />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Save changes
          </button>
        </div>
      </TabsContent>
      <TabsContent value="password">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Password Settings</h3>
          <p className="text-sm text-muted-foreground">
            Change your password here.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current password</label>
            <input type="password" className="w-full p-2 border rounded" />
          </div>
          <button className="px-4 py-2 bg-primary text-primary-foreground rounded">
            Save password
          </button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### Controlled Tabs

```tsx
function ControlledTabs() {
  const [activeTab, setActiveTab] = React.useState("overview");

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Overview</h3>
          <p className="text-muted-foreground">Current tab: {activeTab}</p>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Analytics</h3>
          <p className="text-muted-foreground">Analytics dashboard content.</p>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Reports</h3>
          <p className="text-muted-foreground">
            Reports and data visualization.
          </p>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### Vertical Tabs

```tsx
function VerticalTabs() {
  return (
    <Tabs
      defaultValue="general"
      orientation="vertical"
      className="flex space-x-4"
    >
      <TabsList className="flex flex-col h-fit">
        <TabsTrigger value="general" className="w-full justify-start">
          General
        </TabsTrigger>
        <TabsTrigger value="security" className="w-full justify-start">
          Security
        </TabsTrigger>
        <TabsTrigger value="advanced" className="w-full justify-start">
          Advanced
        </TabsTrigger>
      </TabsList>

      <div className="flex-1">
        <TabsContent value="general">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">General Settings</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">Display Name</label>
              <input className="w-full p-2 border rounded" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <button className="px-4 py-2 border rounded">Enable 2FA</button>
          </div>
        </TabsContent>

        <TabsContent value="advanced">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Advanced Settings</h3>
            <p className="text-muted-foreground">
              Advanced configuration options.
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
```

## API Reference

### Tabs

| Prop            | Type                         | Default        | Description                      |
| --------------- | ---------------------------- | -------------- | -------------------------------- |
| `defaultValue`  | `string`                     | -              | The default active tab           |
| `value`         | `string`                     | -              | The controlled active tab        |
| `onValueChange` | `(value: string) => void`    | -              | Callback when active tab changes |
| `orientation`   | `"horizontal" \| "vertical"` | `"horizontal"` | Orientation of the tabs          |

### TabsList

| Prop       | Type              | Default | Description  |
| ---------- | ----------------- | ------- | ------------ |
| `children` | `React.ReactNode` | -       | Tab triggers |

### TabsTrigger

| Prop       | Type              | Default | Description                        |
| ---------- | ----------------- | ------- | ---------------------------------- |
| `value`    | `string`          | -       | The value that identifies this tab |
| `disabled` | `boolean`         | `false` | Whether the tab is disabled        |
| `children` | `React.ReactNode` | -       | Trigger content                    |

### TabsContent

| Prop       | Type              | Default | Description                            |
| ---------- | ----------------- | ------- | -------------------------------------- |
| `value`    | `string`          | -       | The value that identifies this content |
| `children` | `React.ReactNode` | -       | Tab content                            |

## Accessibility

- Full keyboard navigation (Arrow keys, Home, End, Tab)
- Screen reader support with proper ARIA attributes
- Focus management and visual indicators
- Follows WAI-ARIA Tabs pattern

## Use Cases

- Settings panels and configuration options
- Product details with different information sections
- Dashboard sections with different data views
- Documentation with multiple topics
- Multi-step form interfaces
- Content organization for any multi-section display
