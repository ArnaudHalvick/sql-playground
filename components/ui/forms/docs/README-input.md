# Input Component

## Overview

The Input component is a versatile text input field that extends the standard HTML input element with consistent styling and enhanced accessibility. It provides a foundation for all text-based form inputs.

## Features

- **HTML Input Extension**: Extends all standard HTML input attributes
- **Consistent Styling**: Unified appearance across the application
- **Focus Management**: Clear focus states with ring indicators
- **File Input Support**: Styled file input handling
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Validation States**: Visual feedback for form validation

## Props Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  // ... all standard HTML input attributes
}
```

## Basic Usage

```tsx
import { Input } from "@/components/ui/forms/input";

function BasicInput() {
  return (
    <div className="space-y-2">
      <label htmlFor="email" className="text-sm font-medium">
        Email
      </label>
      <Input id="email" type="email" placeholder="Enter your email" />
    </div>
  );
}
```

## Controlled Input

```tsx
function ControlledInput() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label htmlFor="username" className="text-sm font-medium">
        Username
      </label>
      <Input
        id="username"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Choose a username"
      />
      <p className="text-sm text-muted-foreground">
        {value.length}/20 characters
      </p>
    </div>
  );
}
```

## Input Types

```tsx
function InputTypes() {
  return (
    <div className="space-y-4">
      {/* Text Input */}
      <Input type="text" placeholder="Your full name" />

      {/* Email Input */}
      <Input type="email" placeholder="you@example.com" />

      {/* Password Input */}
      <Input type="password" placeholder="••••••••" />

      {/* Number Input */}
      <Input type="number" placeholder="25" min="0" max="120" />

      {/* Date Input */}
      <Input type="date" />

      {/* URL Input */}
      <Input type="url" placeholder="https://example.com" />

      {/* Tel Input */}
      <Input type="tel" placeholder="+1 (555) 123-4567" />
    </div>
  );
}
```

## File Input

```tsx
function FileInput() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || null);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Upload Document</label>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".pdf,.doc,.docx"
        />
      </div>

      {selectedFile && (
        <div className="p-3 bg-muted rounded-md">
          <p className="text-sm">
            <strong>Selected:</strong> {selectedFile.name}
          </p>
          <p className="text-xs text-muted-foreground">
            Size: {(selectedFile.size / 1024).toFixed(1)} KB
          </p>
        </div>
      )}
    </div>
  );
}
```

## Input with Icon

```tsx
import { Search, Mail, Lock } from "lucide-react";

function InputWithIcon() {
  return (
    <div className="space-y-4">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input type="search" placeholder="Search..." className="pl-10" />
      </div>

      {/* Email Input */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input type="email" placeholder="Email address" className="pl-10" />
      </div>

      {/* Password Input */}
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input type="password" placeholder="Password" className="pl-10" />
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
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      email: "",
      age: 0,
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
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

## Key Features

- **All HTML input types supported** (text, email, password, number, date, etc.)
- **File upload handling** with custom styling
- **Icon integration** using relative positioning
- **Form library compatibility** (React Hook Form, Formik, etc.)
- **Responsive design** adapts to container width
- **Accessibility** built-in with proper ARIA attributes

## Styling

The Input component uses Tailwind CSS classes and can be customized via the `className` prop. Default styling includes focus rings, border states, and consistent padding.
