# Label Component

## Overview

The Label component is an accessible form label built on Radix UI primitives. It provides proper semantic labeling for form controls with enhanced styling and automatic accessibility features.

## Features

- **Accessible**: Built with Radix UI for screen reader support
- **Semantic**: Proper HTML label element with associations
- **Peer Styling**: Automatic styling based on associated input states
- **Disabled State**: Visual feedback for disabled form controls
- **Consistent Typography**: Unified text styling across forms
- **Click Handling**: Proper focus delegation to associated controls

## Props Interface

```typescript
interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  className?: string;
  htmlFor?: string; // Associates with form control
  // ... all other Radix Label props
}
```

## Usage Examples

### Basic Label

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

### Required Field Label

```tsx
function RequiredLabel() {
  return (
    <div className="space-y-2">
      <Label htmlFor="password">
        Password <span className="text-destructive">*</span>
      </Label>
      <Input id="password" type="password" required />
    </div>
  );
}
```

### Label with Description

```tsx
function LabelWithDescription() {
  return (
    <div className="space-y-2">
      <Label htmlFor="username">Username</Label>
      <Input id="username" type="text" />
      <p className="text-sm text-muted-foreground">
        Choose a unique username between 3-20 characters
      </p>
    </div>
  );
}
```

### Checkbox Label

```tsx
import { Checkbox } from "@/components/ui/forms/checkbox";

function CheckboxLabel() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <Label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        I accept the terms and conditions
      </Label>
    </div>
  );
}
```

### Radio Group Labels

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/forms/radio-group";

function RadioLabels() {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Preferred Contact Method</Label>
      <RadioGroup defaultValue="email">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="email" id="email" />
          <Label htmlFor="email">Email</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="phone" id="phone" />
          <Label htmlFor="phone">Phone</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="sms" id="sms" />
          <Label htmlFor="sms">SMS</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

### Form Integration

```tsx
import { useForm } from "react-hook-form";

function FormLabels() {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="John" {...field} />
              </FormControl>
              <FormDescription>Enter your legal first name</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newsletter"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Subscribe to newsletter</FormLabel>
                <FormDescription>
                  Receive updates about new features and products
                </FormDescription>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Label Variants

```tsx
function LabelVariants() {
  return (
    <div className="space-y-4">
      {/* Default Label */}
      <div className="space-y-2">
        <Label htmlFor="default">Default Label</Label>
        <Input id="default" />
      </div>

      {/* Large Label */}
      <div className="space-y-2">
        <Label htmlFor="large" className="text-base font-semibold">
          Large Label
        </Label>
        <Input id="large" />
      </div>

      {/* Small Label */}
      <div className="space-y-2">
        <Label htmlFor="small" className="text-xs">
          Small Label
        </Label>
        <Input id="small" />
      </div>

      {/* Colored Label */}
      <div className="space-y-2">
        <Label htmlFor="colored" className="text-blue-600">
          Colored Label
        </Label>
        <Input id="colored" />
      </div>
    </div>
  );
}
```

### Error State Labels

```tsx
function ErrorStateLabels() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const validateEmail = (value: string) => {
    if (!value) {
      setError("Email is required");
    } else if (!/\S+@\S+\.\S+/.test(value)) {
      setError("Invalid email format");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label
        htmlFor="email-validation"
        className={error ? "text-destructive" : ""}
      >
        Email Address {error && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id="email-validation"
        type="email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        className={error ? "border-destructive" : ""}
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
```

### Disabled State

```tsx
function DisabledLabel() {
  return (
    <div className="space-y-4">
      {/* Disabled Input */}
      <div className="space-y-2">
        <Label htmlFor="disabled-input">Disabled Input</Label>
        <Input id="disabled-input" disabled placeholder="Cannot edit" />
      </div>

      {/* Disabled Checkbox */}
      <div className="flex items-center space-x-2">
        <Checkbox id="disabled-checkbox" disabled />
        <Label
          htmlFor="disabled-checkbox"
          className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Disabled Option
        </Label>
      </div>
    </div>
  );
}
```

### Complex Form Layout

```tsx
function ComplexFormLayout() {
  return (
    <div className="space-y-6">
      {/* Personal Information Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Personal Information</h3>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first-name">First Name</Label>
            <Input id="first-name" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last-name">Last Name</Label>
            <Input id="last-name" />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Textarea id="bio" placeholder="Tell us about yourself" />
        </div>
      </div>

      {/* Preferences Section */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Preferences</h3>

        <div className="space-y-3">
          <Label className="text-base">Notification Settings</Label>

          <div className="space-y-2 ml-4">
            <div className="flex items-center space-x-2">
              <Checkbox id="email-notifications" />
              <Label htmlFor="email-notifications">Email notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="push-notifications" />
              <Label htmlFor="push-notifications">Push notifications</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="sms-notifications" />
              <Label htmlFor="sms-notifications">SMS notifications</Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Typography**: Small text (text-sm) with medium font weight
- **Line Height**: Tight leading for compact appearance
- **Peer States**: Automatic styling based on associated input states
- **Disabled Handling**: Reduced opacity and disabled cursor for disabled inputs

### Customization Options

```tsx
// Custom typography
<Label className="text-lg font-bold">Large Bold Label</Label>
<Label className="text-xs font-normal">Small Normal Label</Label>

// Custom colors
<Label className="text-blue-600">Blue Label</Label>
<Label className="text-destructive">Error Label</Label>

// Custom spacing
<Label className="mb-4">Spaced Label</Label>
```

## Accessibility Features

### ARIA Support

- **Label Association**: Proper htmlFor/id association with form controls
- **Screen Reader**: Label text is announced when focusing associated controls
- **Required Fields**: Can include required indicators for screen readers
- **Error States**: Works with aria-describedby for error messages

### Keyboard Navigation

- **Click Delegation**: Clicking label focuses associated form control
- **Tab Navigation**: Proper tab order with associated controls
- **Focus Management**: Maintains focus relationships

### Screen Reader Support

- **Label Reading**: Label text is read when control receives focus
- **Context**: Provides context for form controls
- **Grouping**: Supports fieldset/legend grouping patterns

## Advanced Usage

### Dynamic Labels

```tsx
function DynamicLabels() {
  const [required, setRequired] = useState(false);
  const [fieldType, setFieldType] = useState("text");

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="required-toggle"
            checked={required}
            onCheckedChange={setRequired}
          />
          <Label htmlFor="required-toggle">Required field</Label>
        </div>

        <Select value={fieldType} onValueChange={setFieldType}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="text">Text</SelectItem>
            <SelectItem value="email">Email</SelectItem>
            <SelectItem value="password">Password</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="dynamic-input">
          {fieldType.charAt(0).toUpperCase() + fieldType.slice(1)}
          {required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Input
          id="dynamic-input"
          type={fieldType}
          required={required}
          placeholder={`Enter your ${fieldType}`}
        />
      </div>
    </div>
  );
}
```

### Label with Tooltip

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";
import { HelpCircle } from "lucide-react";

function LabelWithTooltip() {
  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Label htmlFor="api-key">API Key</Label>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <HelpCircle className="h-4 w-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Your API key can be found in your account settings</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <Input id="api-key" type="password" placeholder="Enter your API key" />
    </div>
  );
}
```

### Conditional Labels

```tsx
function ConditionalLabels() {
  const [userType, setUserType] = useState("individual");

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>User Type</Label>
        <RadioGroup value={userType} onValueChange={setUserType}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="business" id="business" />
            <Label htmlFor="business">Business</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">
          {userType === "business" ? "Company Name" : "Full Name"}
        </Label>
        <Input
          id="name"
          placeholder={
            userType === "business"
              ? "Enter company name"
              : "Enter your full name"
          }
        />
      </div>
    </div>
  );
}
```

## Common Patterns

### Fieldset with Legend

```tsx
function FieldsetPattern() {
  return (
    <fieldset className="space-y-4 border rounded-lg p-4">
      <legend className="text-lg font-semibold px-2">
        Contact Information
      </legend>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email</Label>
          <Input id="contact-email" type="email" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-phone">Phone</Label>
          <Input id="contact-phone" type="tel" />
        </div>
      </div>
    </fieldset>
  );
}
```

### Label Groups

```tsx
function LabelGroups() {
  return (
    <div className="space-y-6">
      {/* Address Group */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">Address</Label>

        <div className="space-y-3 ml-4">
          <div className="space-y-2">
            <Label htmlFor="street">Street Address</Label>
            <Input id="street" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Input id="city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="zip">ZIP Code</Label>
              <Input id="zip" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## Use Cases

- **Form Fields**: Labeling all types of form inputs
- **Checkboxes**: Clickable labels for checkbox controls
- **Radio Buttons**: Option labels in radio groups
- **File Uploads**: Descriptive labels for file inputs
- **Required Fields**: Indicating mandatory form fields
- **Error States**: Highlighting fields with validation errors
- **Grouped Controls**: Organizing related form elements
- **Accessibility**: Providing context for screen readers

## Best Practices

- Always associate labels with form controls using htmlFor/id
- Use clear, descriptive label text
- Indicate required fields consistently
- Provide additional context with descriptions when needed
- Use proper semantic markup (fieldset/legend for groups)
- Ensure sufficient color contrast for accessibility
- Test with screen readers
- Keep label text concise but informative
- Use consistent styling across the application

## Dependencies

- **@radix-ui/react-label**: Core label functionality
- **class-variance-authority**: Variant styling system
- **Tailwind CSS**: Styling system
- **React**: Component framework
