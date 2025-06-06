git s# Checkbox Component

## Overview

The Checkbox component is a customizable checkbox input built on Radix UI primitives. It provides an accessible, keyboard-navigable checkbox with visual feedback and proper ARIA attributes for screen readers.

## Features

- **Accessible**: Built with Radix UI for full accessibility support
- **Keyboard Navigation**: Tab navigation and space/enter activation
- **Visual States**: Clear checked/unchecked states with smooth transitions
- **Customizable**: Flexible styling through className props
- **Icon Integration**: Uses Lucide React Check icon for checked state
- **Focus Management**: Proper focus ring and outline handling

## Props Interface

```typescript
interface CheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  className?: string; // Custom CSS classes
  // ... all other Radix Checkbox props
}
```

## Usage Examples

### Basic Checkbox

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

### Controlled Checkbox

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

### Checkbox Group

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
    { id: "svelte", label: "Svelte" },
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

### Indeterminate Checkbox

```tsx
function IndeterminateCheckbox() {
  const [checkedItems, setCheckedItems] = useState([false, false, false]);

  const allChecked = checkedItems.every(Boolean);
  const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={allChecked}
          ref={(ref) => {
            if (ref) ref.indeterminate = isIndeterminate;
          }}
          onCheckedChange={(value) => setCheckedItems([value, value, value])}
        />
        <label className="text-sm font-medium">Select all</label>
      </div>
      <div className="ml-6 space-y-2">
        {checkedItems.map((checked, index) => (
          <div key={index} className="flex items-center space-x-2">
            <Checkbox
              checked={checked}
              onCheckedChange={(value) =>
                setCheckedItems((prev) =>
                  prev.map((item, i) => (i === index ? value : item))
                )
              }
            />
            <label className="text-sm">Option {index + 1}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### Disabled Checkbox

```tsx
function DisabledCheckbox() {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-unchecked" disabled />
        <label htmlFor="disabled-unchecked" className="text-sm">
          Disabled unchecked
        </label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checked" disabled checked />
        <label htmlFor="disabled-checked" className="text-sm">
          Disabled checked
        </label>
      </div>
    </div>
  );
}
```

### Form Integration

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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  Receive emails about new products, features, and more.
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
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
                <FormMessage />
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

## Styling Features

### Default Styling

- **Size**: 16px × 16px (h-4 w-4)
- **Border**: Primary color border with rounded corners
- **Background**: Transparent when unchecked, primary when checked
- **Icon**: Check icon from Lucide React
- **Focus Ring**: 2px ring with offset for accessibility

### Customization Options

```tsx
// Custom size
<Checkbox className="h-6 w-6" />

// Custom colors
<Checkbox className="border-red-500 data-[state=checked]:bg-red-500" />

// Custom styling
<Checkbox className="rounded-full border-2" />
```

## Accessibility Features

### ARIA Support

- **Role**: Proper checkbox role from Radix UI
- **States**: aria-checked attribute for screen readers
- **Labels**: Can be associated with labels via htmlFor/id
- **Descriptions**: Supports aria-describedby for additional context

### Keyboard Navigation

- **Tab**: Focus navigation between checkboxes
- **Space**: Toggle checkbox state
- **Enter**: Alternative toggle activation

### Screen Reader Support

- **State Announcement**: "Checked" or "Unchecked" states
- **Label Reading**: Associated label text is read
- **Group Context**: Proper grouping for checkbox lists

## Advanced Usage

### Custom Check Icon

```tsx
import { Star } from "lucide-react";

function CustomIconCheckbox() {
  return (
    <Checkbox className="[&>*]:hidden [&[data-state=checked]>*]:block">
      <Star className="h-4 w-4 fill-current" />
    </Checkbox>
  );
}
```

### Animated Checkbox

```tsx
function AnimatedCheckbox() {
  return (
    <Checkbox className="transition-all duration-200 hover:scale-105 data-[state=checked]:animate-pulse" />
  );
}
```

### Checkbox with Description

```tsx
function DescriptiveCheckbox() {
  return (
    <div className="flex items-start space-x-3">
      <Checkbox id="notifications" className="mt-1" />
      <div className="space-y-1">
        <label
          htmlFor="notifications"
          className="text-sm font-medium leading-none"
        >
          Push notifications
        </label>
        <p className="text-sm text-muted-foreground">
          Get notified when someone mentions you in a comment.
        </p>
      </div>
    </div>
  );
}
```

## Common Patterns

### Select All Pattern

```tsx
function SelectAllPattern() {
  const [items, setItems] = useState([
    { id: 1, name: "Item 1", selected: false },
    { id: 2, name: "Item 2", selected: false },
    { id: 3, name: "Item 3", selected: false },
  ]);

  const selectedCount = items.filter((item) => item.selected).length;
  const allSelected = selectedCount === items.length;
  const someSelected = selectedCount > 0 && selectedCount < items.length;

  const toggleAll = () => {
    setItems((prev) =>
      prev.map((item) => ({ ...item, selected: !allSelected }))
    );
  };

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox
          checked={allSelected}
          ref={(ref) => {
            if (ref) ref.indeterminate = someSelected;
          }}
          onCheckedChange={toggleAll}
        />
        <label className="text-sm font-medium">
          Select all ({selectedCount}/{items.length})
        </label>
      </div>
      <div className="ml-6 space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              checked={item.selected}
              onCheckedChange={() => toggleItem(item.id)}
            />
            <label className="text-sm">{item.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Use Cases

- **Terms and Conditions**: Agreement checkboxes
- **Preferences**: Settings and configuration options
- **Multi-Selection**: Lists with multiple selectable items
- **Permissions**: Role and permission management
- **Filters**: Search and filter interfaces
- **Todo Lists**: Task completion tracking
- **Form Validation**: Required field acknowledgments

## Best Practices

- Always provide clear, descriptive labels
- Use proper label association with htmlFor/id
- Group related checkboxes logically
- Provide feedback for form validation errors
- Consider indeterminate state for parent/child relationships
- Ensure sufficient color contrast for accessibility
- Test keyboard navigation thoroughly
- Use consistent spacing and alignment

## Dependencies

- **@radix-ui/react-checkbox**: Core checkbox functionality
- **lucide-react**: Check icon
- **Tailwind CSS**: Styling system
- **React**: Component framework
