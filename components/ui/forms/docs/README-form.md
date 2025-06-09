# Form Component

## Overview

The Form component is a comprehensive form management system built on React Hook Form and Radix UI primitives. It provides form handling with validation, error management, and accessibility features.

## Features

- **React Hook Form Integration**: Built on React Hook Form for performance
- **Validation Support**: Works with Zod, Yup, and other validation libraries
- **Accessibility**: Proper ARIA attributes and screen reader support
- **Error Handling**: Automatic error display and management
- **TypeScript Support**: Full type safety

## Components

- **Form**: Root form provider component (wraps React Hook Form's FormProvider)
- **FormField**: Connects form fields to React Hook Form's Controller
- **FormItem**: Container for individual form fields with proper spacing
- **FormLabel**: Label component with automatic error state styling
- **FormControl**: Wrapper for form inputs with proper ARIA attributes
- **FormDescription**: Helper text component for additional field context
- **FormMessage**: Error message component that displays validation errors

## Basic Usage

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/forms/form";

const formSchema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

function BasicForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="Enter email" {...field} />
              </FormControl>
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

## Complex Form Example

```tsx
const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  email: z.string().email("Invalid email address"),
  bio: z.string().max(500, "Bio cannot exceed 500 characters").optional(),
  notifications: z.boolean().default(false),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      email: "",
      bio: "",
      notifications: false,
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
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us about yourself..." {...field} />
              </FormControl>
              <FormDescription>
                Brief description for your profile (optional)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="notifications"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Email Notifications</FormLabel>
                <FormDescription>
                  Receive emails about your account activity.
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

        <Button type="submit">Update profile</Button>
      </form>
    </Form>
  );
}
```

## Key Patterns

1. **Always wrap forms with `<Form {...form}>`**
2. **Use FormField for each input with render prop pattern**
3. **Include FormLabel, FormControl, and FormMessage for each field**
4. **Use FormDescription for helpful hints**
5. **Validation errors automatically appear in FormMessage**

## TypeScript

The Form components are fully typed. Use `z.infer<typeof schema>` to get TypeScript types from your Zod schema.

## Accessibility

- Automatic ARIA attributes
- Proper label associations
- Error announcements for screen readers
- Keyboard navigation support
