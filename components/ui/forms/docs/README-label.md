# Label Component

## Overview

The Label component is a form label built on Radix UI primitives. It provides proper accessibility features and consistent styling for form inputs with automatic association and focus management.

## Features

- **Accessible**: Built with Radix UI for screen reader support
- **Auto-association**: Automatic input association via htmlFor/id
- **Focus Management**: Clicking label focuses associated input
- **Consistent Styling**: Unified appearance across forms
- **Error States**: Visual feedback for validation errors

## Props Interface

```typescript
interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> {
  className?: string;
  htmlFor?: string;
  // ... all other Radix Label props
}
```

## Basic Usage

```tsx
import { Label } from "@/components/ui/forms/label";
import { Input } from "@/components/ui/forms/input";

function BasicLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="email">Email Address</Label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  );
}
```

## Label with Required Indicator

```tsx
function RequiredLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="name">
        Full Name <span className="text-destructive">*</span>
      </Label>
      <Input id="name" placeholder="Enter your full name" required />
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
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
});

function LabelForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email with anyone else.
              </FormDescription>
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

## Variants

```tsx
function LabelVariants() {
  return (
    <div className="space-y-6">
      {/* Default */}
      <div className="space-y-2">
        <Label htmlFor="default">Default Label</Label>
        <Input id="default" placeholder="Default input" />
      </div>

      {/* Large */}
      <div className="space-y-2">
        <Label htmlFor="large" className="text-base font-semibold">
          Large Label
        </Label>
        <Input id="large" placeholder="Large label input" />
      </div>

      {/* Error State */}
      <div className="space-y-2">
        <Label htmlFor="error" className="text-destructive">
          Error Label
        </Label>
        <Input
          id="error"
          placeholder="Error input"
          className="border-destructive focus-visible:ring-destructive"
        />
        <p className="text-sm text-destructive">This field has an error</p>
      </div>
    </div>
  );
}
```

## Complex Form Labels

```tsx
function ComplexLabels() {
  return (
    <div className="space-y-6">
      {/* Checkbox with Label */}
      <div className="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <a href="#" className="underline hover:no-underline">
            terms and conditions
          </a>
        </Label>
      </div>

      {/* Switch with Label */}
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label htmlFor="notifications" className="text-base">
            Push Notifications
          </Label>
          <p className="text-sm text-muted-foreground">
            Receive notifications about your account activity.
          </p>
        </div>
        <Switch id="notifications" />
      </div>
    </div>
  );
}
```

## Key Features

- **Automatic input association** via htmlFor/id attributes
- **Click-to-focus** functionality for better UX
- **Consistent typography** and spacing
- **Error state styling** support
- **Screen reader compatibility**
- **Required field indicators**

## Common Patterns

1. **Always associate with inputs** using htmlFor/id
2. **Use consistent font weights** for hierarchy
3. **Add required indicators** for mandatory fields
4. **Provide helpful descriptions** when needed

## Accessibility

- Proper label association with form controls
- Screen reader announcements
- Click-to-focus functionality
- Semantic HTML structure
