# Switch Component

## Overview

The Switch component is a toggle control built on Radix UI primitives. It provides a binary on/off state with smooth animations and accessibility features, commonly used for settings and preferences.

## Features

- **Binary State**: Clear on/off toggle functionality
- **Smooth Animation**: Fluid thumb transition between states
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Space/Enter key activation
- **Touch Support**: Works on touch devices
- **Custom Styling**: Flexible appearance customization
- **Form Integration**: Works with form libraries

## Props Interface

```typescript
interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  // ... all other Radix Switch props
}
```

## Usage Examples

### Basic Switch

```tsx
import { Switch } from "@/components/ui/forms/switch";
import { Label } from "@/components/ui/forms/label";

function BasicSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane mode</Label>
    </div>
  );
}
```

### Controlled Switch

```tsx
function ControlledSwitch() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch
          id="notifications"
          checked={enabled}
          onCheckedChange={setEnabled}
        />
        <Label htmlFor="notifications">Enable notifications</Label>
      </div>
      <p className="text-sm text-muted-foreground">
        Notifications are {enabled ? "enabled" : "disabled"}
      </p>
    </div>
  );
}
```

### Form Integration

```tsx
import { useForm } from "react-hook-form";

function SwitchForm() {
  const form = useForm({
    defaultValues: {
      marketing: false,
      analytics: true,
      functional: true,
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="analytics"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Analytics</FormLabel>
                <FormDescription>
                  Help us improve our product with usage analytics.
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    autoSave: true,
    soundEffects: false,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Preferences</h3>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Dark mode</Label>
            <p className="text-sm text-muted-foreground">
              Use dark theme across the application
            </p>
          </div>
          <Switch
            checked={settings.darkMode}
            onCheckedChange={(checked) => updateSetting("darkMode", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Push notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive push notifications on your device
            </p>
          </div>
          <Switch
            checked={settings.notifications}
            onCheckedChange={(checked) =>
              updateSetting("notifications", checked)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Auto-save</Label>
            <p className="text-sm text-muted-foreground">
              Automatically save your work
            </p>
          </div>
          <Switch
            checked={settings.autoSave}
            onCheckedChange={(checked) => updateSetting("autoSave", checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label>Sound effects</Label>
            <p className="text-sm text-muted-foreground">
              Play sounds for interactions
            </p>
          </div>
          <Switch
            checked={settings.soundEffects}
            onCheckedChange={(checked) =>
              updateSetting("soundEffects", checked)
            }
          />
        </div>
      </div>
    </div>
  );
}
```

### Disabled Switch

```tsx
function DisabledSwitch() {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Switch id="disabled-off" disabled />
        <Label htmlFor="disabled-off">Disabled (Off)</Label>
      </div>

      <div className="flex items-center space-x-2">
        <Switch id="disabled-on" disabled checked />
        <Label htmlFor="disabled-on">Disabled (On)</Label>
      </div>
    </div>
  );
}
```

## Use Cases

- **Settings**: Theme, notifications, or feature toggles
- **Preferences**: User preference controls
- **Feature Flags**: Enable/disable application features
- **Privacy Controls**: Data sharing or tracking preferences
- **Accessibility**: Screen reader or high contrast mode
- **Permissions**: Grant or revoke access permissions
- **Status Controls**: Online/offline or active/inactive states

## Best Practices

- Always provide clear, descriptive labels
- Use consistent switch placement (typically right-aligned)
- Provide immediate feedback when state changes
- Group related switches logically
- Consider the impact of state changes on the user
- Test keyboard navigation thoroughly
- Ensure sufficient color contrast for accessibility
- Use switches for binary states, not multi-option selections

## Dependencies

- **@radix-ui/react-switch**: Core switch functionality
- **Tailwind CSS**: Styling system
- **React**: Component framework
