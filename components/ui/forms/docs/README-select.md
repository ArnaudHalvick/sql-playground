# Select Component

## Overview

The Select component is a dropdown selection input built on Radix UI primitives. It provides an accessible dropdown with keyboard navigation, custom styling, and support for complex option layouts.

## Features

- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow keys, typing to search, Enter to select
- **Scrollable**: Handles large option lists with scroll buttons
- **Customizable**: Flexible styling and content options
- **Portal Rendering**: Dropdown renders in portal for proper layering
- **Form Integration**: Works seamlessly with form libraries

## Components

- **Select**: Root component that manages the select state
- **SelectTrigger**: Button that opens the dropdown when clicked
- **SelectValue**: Displays the selected value or placeholder
- **SelectContent**: Container for the dropdown options
- **SelectItem**: Individual selectable option
- **SelectLabel**: Section label for grouping options
- **SelectSeparator**: Visual separator between option groups
- **SelectGroup**: Groups related options together

## Props Interface

```typescript
interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  // ... all other Radix Select props
}

interface SelectItemProps {
  value: string; // Required: unique value
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

## Basic Usage

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/select";

function BasicSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

## Controlled Select

```tsx
function ControlledSelect() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      )}
    </div>
  );
}
```

## Grouped Options

```tsx
function GroupedSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="go">Go</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

## Form Integration

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["low", "medium", "high"]),
});

function SelectForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "medium",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best describes your issue
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
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

- **Keyboard accessible** with arrow key navigation
- **Type-ahead search** by typing option names
- **Disabled options** support
- **Custom option content** with icons, descriptions, etc.
- **Scrollable content** for long option lists
- **Portal rendering** prevents z-index issues
- **Form validation** integration

## Common Patterns

1. **Always wrap SelectTrigger with SelectValue for placeholder**
2. **Use SelectGroup and SelectLabel for organized options**
3. **Set unique value prop for each SelectItem**
4. **Use FormControl wrapper in forms for proper validation**
5. **Handle onValueChange for controlled components**

## Accessibility

- Full keyboard navigation support
- Screen reader announcements
- ARIA attributes automatically applied
- Focus management handled by Radix UI
