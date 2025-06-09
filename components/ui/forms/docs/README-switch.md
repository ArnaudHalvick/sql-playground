# Switch Component

## Overview

The Switch component is a toggle control built on Radix UI primitives. It provides a binary on/off state with smooth animations and full accessibility support.

## Features

- **Binary State**: Clear on/off toggle functionality
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Space/Enter to toggle, Tab for focus
- **Smooth Animation**: Fluid transition between states
- **Form Integration**: Works seamlessly with form libraries
- **Customizable**: Flexible styling through className props

## Props Interface

```typescript
interface SwitchProps
  extends React.ComponentPropsWithoutRef<typeof SwitchPrimitive.Root> {
  className?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  // ... all other Radix Switch props
}
```

## Basic Usage

```tsx
import { Switch } from "@/components/ui/forms/switch";
import { Label } from "@/components/ui/forms/label";

function BasicSwitch() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  );
}
```

## Controlled Switch

```tsx
function ControlledSwitch() {
  const [isEnabled, setIsEnabled] = useState(false);

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-0.5">
        <Label htmlFor="notifications" className="text-base">
          Push Notifications
        </Label>
        <p className="text-sm text-muted-foreground">
          Receive notifications about your account activity.
        </p>
      </div>
      <Switch
        id="notifications"
        checked={isEnabled}
        onCheckedChange={setIsEnabled}
      />
    </div>
  );
}
```

## Switch with Description

```tsx
function SwitchWithDescription() {
  const [settings, setSettings] = useState({
    marketing: false,
    analytics: true,
    functional: true,
  });

  const updateSetting = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="marketing">Marketing emails</Label>
          <p className="text-sm text-muted-foreground">
            Receive emails about new products, features, and more.
          </p>
        </div>
        <Switch
          id="marketing"
          checked={settings.marketing}
          onCheckedChange={(value) => updateSetting("marketing", value)}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="analytics">Analytics cookies</Label>
          <p className="text-sm text-muted-foreground">
            Help us improve our service by allowing analytics tracking.
          </p>
        </div>
        <Switch
          id="analytics"
          checked={settings.analytics}
          onCheckedChange={(value) => updateSetting("analytics", value)}
        />
      </div>
    </div>
  );
}
```

## Form Integration

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  marketingEmails: z.boolean().default(false),
  securityAlerts: z.boolean().default(true),
  productUpdates: z.boolean().default(false),
});

function SwitchForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketingEmails: false,
      securityAlerts: true,
      productUpdates: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="marketingEmails"
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
          name="securityAlerts"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Security alerts</FormLabel>
                <FormDescription>
                  Receive alerts about your account security.
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

        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  );
}
```

## Disabled Switch

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

## Key Features

- **Binary toggle** with clear on/off states
- **Smooth animations** with CSS transitions
- **Keyboard accessible** with space/enter activation
- **Touch-friendly** for mobile devices
- **Form validation** support
- **Disabled state** support
- **Custom styling** via className prop

## Common Patterns

1. **Always associate with labels** using htmlFor/id
2. **Use controlled state** for dynamic behavior
3. **Provide clear descriptions** for complex settings
4. **Group related switches** logically
5. **Handle form validation** appropriately

## Accessibility

- Full keyboard navigation support
- Screen reader announcements for state changes
- Proper ARIA attributes and roles
- Focus management with visible focus rings
