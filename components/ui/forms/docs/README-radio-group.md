# Radio Group Component

## Overview

The Radio Group component provides a set of mutually exclusive radio buttons built on Radix UI primitives. It ensures only one option can be selected at a time with full accessibility support.

## Features

- **Mutually Exclusive**: Only one option can be selected at a time
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow keys for navigation, space/enter to select
- **Visual States**: Clear selected/unselected states with smooth transitions
- **Form Integration**: Works seamlessly with form libraries
- **Customizable**: Flexible styling through className props

## Components

- **RadioGroup**: Root container that manages the group state
- **RadioGroupItem**: Individual radio button option

## Props Interface

```typescript
interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  // ... all other Radix RadioGroup props
}

interface RadioGroupItemProps {
  value: string; // Required: unique value for the option
  disabled?: boolean;
  className?: string;
}
```

## Basic Usage

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/forms/radio-group";
import { Label } from "@/components/ui/forms/label";

function BasicRadioGroup() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  );
}
```

## Controlled Radio Group

```tsx
function ControlledRadioGroup() {
  const [value, setValue] = useState("medium");

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Priority Level</Label>
      <RadioGroup value={value} onValueChange={setValue}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="low" id="low" />
          <Label htmlFor="low">Low Priority</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Medium Priority</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="high" id="high" />
          <Label htmlFor="high">High Priority</Label>
        </div>
      </RadioGroup>
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  );
}
```

## Horizontal Layout

```tsx
function HorizontalRadioGroup() {
  return (
    <RadioGroup defaultValue="card" className="flex space-x-6">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="card" id="card" />
        <Label htmlFor="card">Credit Card</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="paypal" id="paypal" />
        <Label htmlFor="paypal">PayPal</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="bank" id="bank" />
        <Label htmlFor="bank">Bank Transfer</Label>
      </div>
    </RadioGroup>
  );
}
```

## Form Integration

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  type: z.enum(["personal", "business", "enterprise"], {
    required_error: "Please select an account type",
  }),
  notifications: z.enum(["all", "mentions", "none"]),
});

function RadioGroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      notifications: "all",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Account Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="personal" id="personal" />
                    <Label htmlFor="personal">Personal</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="business" id="business" />
                    <Label htmlFor="business">Business</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="enterprise" id="enterprise" />
                    <Label htmlFor="enterprise">Enterprise</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Email Notifications</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="all" id="all" />
                    <Label htmlFor="all">All notifications</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="mentions" id="mentions" />
                    <Label htmlFor="mentions">Only mentions</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="none" />
                    <Label htmlFor="none">No notifications</Label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save preferences</Button>
      </form>
    </Form>
  );
}
```

## Key Features

- **Mutually exclusive selection** - only one option at a time
- **Keyboard navigation** with arrow keys
- **Accessible** with proper ARIA attributes
- **Visual feedback** with smooth transitions
- **Form validation** support
- **Horizontal and vertical** layouts
- **Disabled state** support

## Common Patterns

1. **Always associate with labels** using htmlFor/id
2. **Use unique values** for each RadioGroupItem
3. **Provide default selection** when appropriate
4. **Group related options** logically
5. **Use controlled state** for dynamic behavior

## Accessibility

- Full keyboard navigation with arrow keys
- Screen reader announcements
- Proper ARIA attributes and roles
- Focus management handled by Radix UI
