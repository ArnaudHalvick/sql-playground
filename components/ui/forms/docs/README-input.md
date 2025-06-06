# Input Component

## Overview

The Input component is a versatile text input field that extends the standard HTML input element with consistent styling and enhanced accessibility. It provides a foundation for all text-based form inputs in the application.

## Features

- **HTML Input Extension**: Extends all standard HTML input attributes
- **Consistent Styling**: Unified appearance across the application
- **Focus Management**: Clear focus states with ring indicators
- **File Input Support**: Styled file input handling
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Responsive**: Adapts to container width
- **Validation States**: Visual feedback for form validation

## Props Interface

```typescript
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  type?: string;
  // ... all standard HTML input attributes
}
```

## Usage Examples

### Basic Input

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

### Controlled Input

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

### Input Types

```tsx
function InputTypes() {
  return (
    <div className="space-y-4">
      {/* Text Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Name</label>
        <Input type="text" placeholder="Your full name" />
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <Input type="email" placeholder="you@example.com" />
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Password</label>
        <Input type="password" placeholder="••••••••" />
      </div>

      {/* Number Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Age</label>
        <Input type="number" placeholder="25" min="0" max="120" />
      </div>

      {/* Date Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Birth Date</label>
        <Input type="date" />
      </div>

      {/* URL Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Website</label>
        <Input type="url" placeholder="https://example.com" />
      </div>

      {/* Tel Input */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Phone</label>
        <Input type="tel" placeholder="+1 (555) 123-4567" />
      </div>
    </div>
  );
}
```

### File Input

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

### Input with Icon

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

### Form Integration

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  age: z.number().min(18, "Must be at least 18 years old"),
});

function InputForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      age: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
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
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
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

        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
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

### Input Validation States

```tsx
function ValidationStates() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (value: string) => {
    if (!value) {
      setError("Email is required");
      setSuccess(false);
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError("Invalid email format");
      setSuccess(false);
    } else {
      setError("");
      setSuccess(true);
    }
  };

  return (
    <div className="space-y-4">
      {/* Default State */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <Input placeholder="Normal input" />
      </div>

      {/* Error State */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Error State</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          placeholder="Enter email"
          className={
            error ? "border-destructive focus-visible:ring-destructive" : ""
          }
        />
        {error && <p className="text-sm text-destructive">{error}</p>}
      </div>

      {/* Success State */}
      {success && (
        <div className="space-y-2">
          <label className="text-sm font-medium">Success State</label>
          <Input
            value={email}
            readOnly
            className="border-green-500 focus-visible:ring-green-500"
          />
          <p className="text-sm text-green-600">Email is valid!</p>
        </div>
      )}

      {/* Disabled State */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <Input placeholder="Disabled input" disabled />
      </div>
    </div>
  );
}
```

### Input Sizes

```tsx
function InputSizes() {
  return (
    <div className="space-y-4">
      {/* Small */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Small</label>
        <Input placeholder="Small input" className="h-8 px-2 text-xs" />
      </div>

      {/* Default */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <Input placeholder="Default input" />
      </div>

      {/* Large */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Large</label>
        <Input placeholder="Large input" className="h-12 px-4 text-base" />
      </div>
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Height**: 40px (h-10) default height
- **Padding**: 12px horizontal (px-3), 8px vertical (py-2)
- **Border**: Input border with rounded corners
- **Background**: Background color with transparency
- **Typography**: Small text (text-sm)
- **Focus Ring**: 2px ring with offset for accessibility

### Customization Options

```tsx
// Custom height
<Input className="h-8" />      // Small
<Input className="h-12" />     // Large

// Custom padding
<Input className="px-6 py-4" />

// Custom border
<Input className="border-2 border-blue-500" />

// Custom background
<Input className="bg-gray-50" />

// Custom text size
<Input className="text-lg" />
```

## Accessibility Features

### ARIA Support

- **Labels**: Proper label association via htmlFor/id
- **Descriptions**: aria-describedby for additional context
- **Invalid State**: aria-invalid for validation errors
- **Required Fields**: aria-required for mandatory inputs

### Keyboard Navigation

- **Tab**: Standard tab navigation
- **Enter**: Form submission (when in forms)
- **Escape**: Clear focus (browser default)
- **Arrow Keys**: Text cursor navigation

### Screen Reader Support

- **Label Reading**: Associated label text is announced
- **Placeholder**: Placeholder text provides context
- **Validation**: Error messages are announced
- **Type Context**: Input type is communicated

## Advanced Usage

### Debounced Input

```tsx
function DebouncedInput() {
  const [value, setValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, 500);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    if (debouncedValue) {
      // Perform search or API call
      console.log("Searching for:", debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <div className="space-y-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search with debounce..."
      />
      {debouncedValue && (
        <p className="text-sm text-muted-foreground">
          Searching for: {debouncedValue}
        </p>
      )}
    </div>
  );
}
```

### Input with Clear Button

```tsx
import { X } from "lucide-react";

function ClearableInput() {
  const [value, setValue] = useState("");

  return (
    <div className="relative">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
        className="pr-10"
      />
      {value && (
        <button
          onClick={() => setValue("")}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
```

### Masked Input

```tsx
function MaskedInput() {
  const [phone, setPhone] = useState("");

  const formatPhoneNumber = (value: string) => {
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;

    if (phoneNumberLength < 4) return phoneNumber;
    if (phoneNumberLength < 7) {
      return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
    }
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
      3,
      6
    )}-${phoneNumber.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhoneNumber = formatPhoneNumber(e.target.value);
    setPhone(formattedPhoneNumber);
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Phone Number</label>
      <Input
        type="tel"
        value={phone}
        onChange={handlePhoneChange}
        placeholder="(555) 123-4567"
        maxLength={14}
      />
    </div>
  );
}
```

## Common Patterns

### Search Input

```tsx
import { Search } from "lucide-react";

function SearchInput() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim()) {
      // Simulate API call
      const mockResults = ["Result 1", "Result 2", "Result 3"].filter((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setResults(mockResults);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      handleSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="space-y-2">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search..."
          className="pl-10"
        />
      </div>
      {results.length > 0 && (
        <div className="border rounded-md p-2 space-y-1">
          {results.map((result, index) => (
            <div
              key={index}
              className="p-2 hover:bg-muted rounded cursor-pointer"
            >
              {result}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
```

## Use Cases

- **Text Input**: Names, descriptions, comments
- **Email Input**: Email addresses with validation
- **Password Input**: Secure password entry
- **Number Input**: Numeric values with constraints
- **Search Input**: Search queries with suggestions
- **File Input**: File uploads with validation
- **Date Input**: Date selection
- **URL Input**: Website addresses
- **Phone Input**: Phone numbers with formatting

## Best Practices

- Always provide clear, descriptive labels
- Use appropriate input types for better UX
- Implement proper validation with clear error messages
- Consider placeholder text for additional context
- Use debouncing for search inputs
- Provide visual feedback for validation states
- Ensure sufficient color contrast for accessibility
- Test keyboard navigation thoroughly
- Use semantic HTML attributes

## Dependencies

- **React**: Component framework
- **Tailwind CSS**: Styling system
- **@/lib/utils**: Utility functions (cn)
