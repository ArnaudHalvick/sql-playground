# Checkbox Component

## Overview

The Checkbox component is a customizable checkbox input built on Radix UI primitives. It provides an accessible, keyboard-navigable checkbox with visual feedback and proper ARIA attributes for screen readers.

## Features

- **Accessible**: Built with Radix UI for full accessibility support
- **Keyboard Navigation**: Tab navigation and space/enter activation
- **Visual States**: Clear checked/unchecked states with smooth transitions
- **Customizable**: Flexible styling through className props
- **Focus Management**: Proper focus ring and outline handling

## Props Interface

```typescript
interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string; // Custom CSS classes
  // ... all other Radix Checkbox props
}
```

## Basic Usage

```tsx
import { Checkbox } from "@/components/ui/forms/checkbox";

function BasicCheckbox() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}
```

## Controlled Checkbox

```tsx
function ControlledCheckbox() {
  const [checked, setChecked] = useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="newsletter"
        checked={checked}
        onCheckedChange={setChecked}
      />
      <label htmlFor="newsletter" className="text-sm">
        Subscribe to newsletter
      </label>
    </div>
  );
}
```

## Checkbox Group

```tsx
function CheckboxGroup() {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const toggleItem = (item: string) => {
    setSelectedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const items = [
    { id: "react", label: "React" },
    { id: "vue", label: "Vue" },
    { id: "angular", label: "Angular" },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium">Select frameworks:</h3>
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-2">
          <Checkbox
            id={item.id}
            checked={selectedItems.includes(item.id)}
            onCheckedChange={() => toggleItem(item.id)}
          />
          <label htmlFor={item.id} className="text-sm">
            {item.label}
          </label>
        </div>
      ))}
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
  marketing: z.boolean().default(false),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

function CheckboxForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      marketing: false,
      terms: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="terms"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Accept terms and conditions</FormLabel>
                <FormDescription>
                  You agree to our Terms of Service and Privacy Policy.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="marketing"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Marketing emails</FormLabel>
                <FormDescription>
                  Receive emails about new products and features.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

## Key Features

- **Three states**: unchecked, checked, and indeterminate
- **Keyboard accessible** with space/enter activation
- **Visual feedback** with smooth transitions
- **Form validation** support with error states
- **Disabled state** support

## Common Patterns

1. **Always associate with labels** using htmlFor/id
2. **Use controlled state** for dynamic behavior
3. **Group related checkboxes** logically
4. **Provide clear descriptions** for complex options

## Accessibility

- Full keyboard navigation support
- Screen reader announcements
- Proper ARIA attributes
- Focus management with visible focus rings
