# Tabs

A set of layered sections of content—known as tab panels—that are displayed one at a time.

## Features

- Keyboard navigation support
- Automatic and manual activation modes
- Horizontal and vertical orientations
- Accessible by default
- Built on top of Radix UI Tabs primitive
- Customizable styling

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

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
            Make changes to your account here. Click save when you're done.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Name</label>
            <input
              className="w-full p-2 border rounded"
              defaultValue="Pedro Duarte"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Username</label>
            <input
              className="w-full p-2 border rounded"
              defaultValue="@peduarte"
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
            Change your password here. After saving, you'll be logged out.
          </p>
          <div className="space-y-2">
            <label className="text-sm font-medium">Current password</label>
            <input type="password" className="w-full p-2 border rounded" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">New password</label>
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
        <TabsTrigger value="notifications">Notifications</TabsTrigger>
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
          <p className="text-muted-foreground">
            Analytics dashboard content goes here.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Reports</h3>
          <p className="text-muted-foreground">
            Reports and data visualization content.
          </p>
        </div>
      </TabsContent>

      <TabsContent value="notifications" className="mt-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-2">Notifications</h3>
          <p className="text-muted-foreground">
            Notification settings and preferences.
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
        <TabsTrigger value="integrations" className="w-full justify-start">
          Integrations
        </TabsTrigger>
        <TabsTrigger value="support" className="w-full justify-start">
          Support
        </TabsTrigger>
        <TabsTrigger value="organizations" className="w-full justify-start">
          Organizations
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <input type="email" className="w-full p-2 border rounded" />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Security Settings</h3>
            <div className="space-y-2">
              <label className="text-sm font-medium">
                Two-factor Authentication
              </label>
              <button className="px-4 py-2 border rounded">Enable 2FA</button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Integrations</h3>
            <p className="text-muted-foreground">
              Connect your account with third-party services.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="support">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Support</h3>
            <p className="text-muted-foreground">
              Get help and contact support.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="organizations">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Organizations</h3>
            <p className="text-muted-foreground">
              Manage your organization settings.
            </p>
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

The root tabs component.

| Prop             | Type                         | Default        | Description                      |
| ---------------- | ---------------------------- | -------------- | -------------------------------- |
| `defaultValue`   | `string`                     | -              | The default active tab           |
| `value`          | `string`                     | -              | The controlled active tab        |
| `onValueChange`  | `(value: string) => void`    | -              | Callback when active tab changes |
| `orientation`    | `"horizontal" \| "vertical"` | `"horizontal"` | Orientation of the tabs          |
| `dir`            | `"ltr" \| "rtl"`             | `"ltr"`        | Reading direction                |
| `activationMode` | `"automatic" \| "manual"`    | `"automatic"`  | How tabs are activated           |

### TabsList

Container for tab triggers.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Tab triggers           |

### TabsTrigger

Individual tab trigger button.

| Prop        | Type              | Default | Description                        |
| ----------- | ----------------- | ------- | ---------------------------------- |
| `value`     | `string`          | -       | The value that identifies this tab |
| `disabled`  | `boolean`         | `false` | Whether the tab is disabled        |
| `className` | `string`          | -       | Additional CSS classes             |
| `children`  | `React.ReactNode` | -       | Trigger content                    |

### TabsContent

Content panel for a tab.

| Prop         | Type              | Default | Description                            |
| ------------ | ----------------- | ------- | -------------------------------------- |
| `value`      | `string`          | -       | The value that identifies this content |
| `forceMount` | `boolean`         | `false` | Force mount the content                |
| `className`  | `string`          | -       | Additional CSS classes                 |
| `children`   | `React.ReactNode` | -       | Tab content                            |

## Examples

### Dashboard Tabs

```tsx
function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="analytics">Analytics</TabsTrigger>
        <TabsTrigger value="reports">Reports</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold">$45,231.89</p>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Subscriptions</h3>
            <p className="text-2xl font-bold">+2350</p>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Sales</h3>
            <p className="text-2xl font-bold">+12,234</p>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="font-semibold">Active Now</h3>
            <p className="text-2xl font-bold">+573</p>
            <p className="text-xs text-muted-foreground">
              +201 since last hour
            </p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="analytics" className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Analytics Dashboard</h3>
          <div className="h-64 bg-muted rounded flex items-center justify-center">
            <p className="text-muted-foreground">Chart placeholder</p>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reports" className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Reports</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center p-2 border rounded">
              <span>Monthly Report - January 2024</span>
              <button className="text-sm text-blue-600 hover:underline">
                Download
              </button>
            </div>
            <div className="flex justify-between items-center p-2 border rounded">
              <span>Quarterly Report - Q4 2023</span>
              <button className="text-sm text-blue-600 hover:underline">
                Download
              </button>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="settings" className="space-y-4">
        <div className="p-4 border rounded-lg">
          <h3 className="font-semibold mb-4">Dashboard Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Email notifications</label>
              <input type="checkbox" className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Push notifications</label>
              <input type="checkbox" className="rounded" />
            </div>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### Product Details Tabs

```tsx
function ProductDetailsTabs() {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList>
        <TabsTrigger value="description">Description</TabsTrigger>
        <TabsTrigger value="specifications">Specifications</TabsTrigger>
        <TabsTrigger value="reviews">Reviews</TabsTrigger>
        <TabsTrigger value="shipping">Shipping</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="mt-4">
        <div className="prose max-w-none">
          <h3>Product Description</h3>
          <p>
            This is a high-quality product designed with attention to detail and
            crafted from premium materials. It offers exceptional performance
            and durability.
          </p>
          <ul>
            <li>Premium materials and construction</li>
            <li>Exceptional performance</li>
            <li>Long-lasting durability</li>
            <li>Modern design</li>
          </ul>
        </div>
      </TabsContent>

      <TabsContent value="specifications" className="mt-4">
        <div className="space-y-4">
          <h3 className="font-semibold">Technical Specifications</h3>
          <div className="grid gap-2">
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Dimensions</span>
              <span>10" x 8" x 2"</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Weight</span>
              <span>2.5 lbs</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Material</span>
              <span>Aluminum alloy</span>
            </div>
            <div className="flex justify-between py-2 border-b">
              <span className="font-medium">Color</span>
              <span>Space Gray</span>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="reviews" className="mt-4">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className="text-yellow-400">
                  ★
                </span>
              ))}
            </div>
            <span className="font-medium">4.8 out of 5</span>
            <span className="text-muted-foreground">(124 reviews)</span>
          </div>

          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">John D.</span>
                <div className="flex">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Excellent product! Exactly as described and arrived quickly.
              </p>
            </div>

            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <span className="font-medium">Sarah M.</span>
                <div className="flex">
                  {Array.from({ length: 4 }, (_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Good quality, though shipping took a bit longer than expected.
              </p>
            </div>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping" className="mt-4">
        <div className="space-y-4">
          <h3 className="font-semibold">Shipping Information</h3>
          <div className="space-y-2">
            <div className="flex justify-between py-2">
              <span className="font-medium">Standard Shipping</span>
              <span>5-7 business days - Free</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Express Shipping</span>
              <span>2-3 business days - $9.99</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="font-medium">Overnight Shipping</span>
              <span>1 business day - $19.99</span>
            </div>
          </div>

          <div className="mt-4 p-4 bg-muted rounded-lg">
            <h4 className="font-medium mb-2">Return Policy</h4>
            <p className="text-sm text-muted-foreground">
              30-day return policy. Items must be in original condition.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
```

### Code Editor Tabs

```tsx
function CodeEditorTabs() {
  const [files, setFiles] = React.useState([
    {
      id: "app.tsx",
      name: "App.tsx",
      content:
        'import React from "react";\n\nfunction App() {\n  return <div>Hello World</div>;\n}',
    },
    {
      id: "styles.css",
      name: "styles.css",
      content: ".app {\n  padding: 20px;\n  font-family: Arial;\n}",
    },
    {
      id: "package.json",
      name: "package.json",
      content: '{\n  "name": "my-app",\n  "version": "1.0.0"\n}',
    },
  ]);

  const [activeFile, setActiveFile] = React.useState("app.tsx");

  return (
    <div className="border rounded-lg overflow-hidden">
      <Tabs value={activeFile} onValueChange={setActiveFile} className="w-full">
        <TabsList className="w-full justify-start rounded-none border-b bg-muted/50">
          {files.map((file) => (
            <TabsTrigger
              key={file.id}
              value={file.id}
              className="rounded-none border-r data-[state=active]:bg-background"
            >
              {file.name}
              <button
                className="ml-2 hover:bg-muted rounded-sm p-0.5"
                onClick={(e) => {
                  e.stopPropagation();
                  setFiles(files.filter((f) => f.id !== file.id));
                  if (activeFile === file.id && files.length > 1) {
                    setActiveFile(
                      files.find((f) => f.id !== file.id)?.id || ""
                    );
                  }
                }}
              >
                ×
              </button>
            </TabsTrigger>
          ))}
        </TabsList>

        {files.map((file) => (
          <TabsContent
            key={file.id}
            value={file.id}
            className="m-0 rounded-none"
          >
            <div className="p-4 font-mono text-sm bg-background min-h-[300px]">
              <pre className="whitespace-pre-wrap">{file.content}</pre>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom styling
<Tabs defaultValue="tab1" className="w-full">
  <TabsList className="bg-blue-100 rounded-xl p-1">
    <TabsTrigger
      value="tab1"
      className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
    >
      Custom Tab 1
    </TabsTrigger>
    <TabsTrigger
      value="tab2"
      className="rounded-lg data-[state=active]:bg-blue-600 data-[state=active]:text-white"
    >
      Custom Tab 2
    </TabsTrigger>
  </TabsList>

  <TabsContent
    value="tab1"
    className="mt-4 p-4 border-2 border-blue-200 rounded-lg"
  >
    Custom content styling
  </TabsContent>
</Tabs>
```

## Accessibility

- Full keyboard navigation (Arrow keys, Home, End, Tab)
- Screen reader support with proper ARIA attributes
- Focus management and visual indicators
- Supports assistive technologies
- Follows WAI-ARIA Tabs pattern

## Use Cases

- **Settings panels**: Organize configuration options
- **Product details**: Display different aspects of products
- **Dashboard sections**: Organize different views of data
- **Documentation**: Separate different topics or sections
- **Form wizards**: Multi-step form interfaces
- **Code editors**: File and view management
- **Content organization**: Any multi-section content display
