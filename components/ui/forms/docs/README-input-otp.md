# Input OTP Component

## Overview

The Input OTP component is a specialized input for one-time passwords and verification codes. It provides individual input slots for each digit with automatic focus management and validation.

## Features

- **Individual Slots**: Separate input for each digit/character
- **Auto-focus**: Automatic focus progression between slots
- **Keyboard Navigation**: Arrow keys and backspace handling
- **Paste Support**: Automatic distribution of pasted values
- **Validation**: Built-in pattern validation and error states
- **Customizable**: Flexible slot count and styling

## Components

- **InputOTP**: Root container component
- **InputOTPGroup**: Groups related slots together
- **InputOTPSlot**: Individual character input slot
- **InputOTPSeparator**: Visual separator between groups

## Props Interface

```typescript
interface InputOTPProps {
  value?: string;
  onChange?: (value: string) => void;
  maxLength: number;
  pattern?: string;
  disabled?: boolean;
  className?: string;
}

interface InputOTPSlotProps {
  index: number;
  className?: string;
}
```

## Basic Usage

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/forms/input-otp";

function BasicOTP() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Enter verification code</label>
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
```

## Grouped OTP

```tsx
import { InputOTPSeparator } from "@/components/ui/forms/input-otp";

function GroupedOTP() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Enter 6-digit code</label>
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPSeparator />
        <InputOTPGroup>
          <InputOTPSlot index={3} />
          <InputOTPSlot index={4} />
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
```

## Pattern Validation

```tsx
function PatternOTP() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">Enter numeric code</label>
      <InputOTP
        maxLength={4}
        pattern="[0-9]*"
        value={value}
        onChange={setValue}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      <p className="text-xs text-muted-foreground">Numbers only</p>
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
  pin: z.string().min(6, "Please enter all 6 digits"),
});

function OTPForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>One-Time Password</FormLabel>
              <FormControl>
                <InputOTP maxLength={6} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>
                Please enter the one-time password sent to your phone.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Verify Code
        </Button>
      </form>
    </Form>
  );
}
```

## OTP Variants

```tsx
function OTPVariants() {
  return (
    <div className="space-y-8">
      {/* 4-digit PIN */}
      <div className="space-y-2">
        <label className="text-sm font-medium">4-digit PIN</label>
        <InputOTP maxLength={4}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* 6-digit code */}
      <div className="space-y-2">
        <label className="text-sm font-medium">6-digit verification</label>
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <InputOTP maxLength={4} disabled>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
```

## Key Features

- **Auto-focus progression** between slots
- **Paste support** for quick entry
- **Backspace handling** with focus management
- **Pattern validation** for specific input types
- **Keyboard navigation** with arrow keys
- **Disabled state** support
- **Customizable slot count** and grouping

## Common Patterns

1. **Use appropriate maxLength** for the code type
2. **Group slots logically** for better UX
3. **Provide clear labels** and instructions
4. **Handle validation errors** appropriately
5. **Consider pattern restrictions** for security

## Accessibility

- Full keyboard navigation support
- Screen reader announcements
- Proper ARIA attributes and labels
- Focus management between slots
