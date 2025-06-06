# InputOTP Component

## Overview

The InputOTP component is a specialized input for One-Time Passwords (OTP) and verification codes. Built on the `input-otp` library, it provides a user-friendly interface for entering multi-digit codes with individual character slots and visual feedback.

## Features

- **Individual Slots**: Each character has its own visual slot
- **Auto-Focus**: Automatic focus progression between slots
- **Paste Support**: Intelligent paste handling for complete codes
- **Keyboard Navigation**: Arrow key navigation between slots
- **Visual Feedback**: Active slot highlighting and caret animation
- **Flexible Layout**: Grouping and separator support
- **Accessibility**: Screen reader support and proper ARIA attributes

## Components

### InputOTP

Main container component that manages the OTP input state.

### InputOTPGroup

Groups related slots together for visual organization.

### InputOTPSlot

Individual character slot with index-based rendering.

### InputOTPSeparator

Visual separator between groups (uses Dot icon).

## Props Interfaces

```typescript
interface InputOTPProps
  extends React.ComponentPropsWithoutRef<typeof OTPInput> {
  className?: string;
  containerClassName?: string;
  maxLength?: number;
  value?: string;
  onChange?: (value: string) => void;
  // ... all other input-otp props
}

interface InputOTPSlotProps extends React.ComponentPropsWithoutRef<"div"> {
  index: number; // Required: slot position
  className?: string;
}
```

## Usage Examples

### Basic OTP Input

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/forms/input-otp";

function BasicOTP() {
  const [value, setValue] = useState("");

  return (
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
  );
}
```

### Grouped OTP with Separator

```tsx
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/forms/input-otp";

function GroupedOTP() {
  const [value, setValue] = useState("");

  return (
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
  );
}
```

### Phone Verification

```tsx
function PhoneVerification() {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete verification code");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      await verifyPhoneCode(otp);
      // Handle success
    } catch (err) {
      setError("Invalid verification code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Verify your phone</h2>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your phone
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          disabled={isLoading}
        >
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

      {error && <p className="text-sm text-destructive text-center">{error}</p>}

      <Button
        onClick={handleSubmit}
        disabled={otp.length !== 6 || isLoading}
        className="w-full"
      >
        {isLoading ? "Verifying..." : "Verify Code"}
      </Button>
    </div>
  );
}
```

### Two-Factor Authentication

```tsx
function TwoFactorAuth() {
  const [code, setCode] = useState("");
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const resendCode = () => {
    setTimeLeft(30);
    setCode("");
    // Resend logic here
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-semibold">Two-Factor Authentication</h2>
        <p className="text-sm text-muted-foreground mt-2">
          Enter the 6-digit code from your authenticator app
        </p>
      </div>

      <div className="flex justify-center">
        <InputOTP maxLength={6} value={code} onChange={setCode}>
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

      <div className="text-center space-y-2">
        {timeLeft > 0 ? (
          <p className="text-sm text-muted-foreground">
            Resend code in {timeLeft}s
          </p>
        ) : (
          <Button variant="link" onClick={resendCode} className="text-sm">
            Resend verification code
          </Button>
        )}
      </div>

      <Button
        disabled={code.length !== 6}
        className="w-full"
        onClick={() => console.log("Verify:", code)}
      >
        Verify & Continue
      </Button>
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
  pin: z.string().min(4, "PIN must be 4 digits").max(4, "PIN must be 4 digits"),
});

function PINForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pin: "",
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
          name="pin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Enter your PIN</FormLabel>
              <FormControl>
                <InputOTP maxLength={4} {...field}>
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormDescription>Enter your 4-digit security PIN</FormDescription>
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

### Custom Styling

```tsx
function CustomStyledOTP() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4">
      {/* Large OTP */}
      <InputOTP maxLength={4} value={value} onChange={setValue}>
        <InputOTPGroup>
          <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
        </InputOTPGroup>
      </InputOTP>

      {/* Colored OTP */}
      <InputOTP maxLength={6} value={value} onChange={setValue}>
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="border-blue-500 data-[active=true]:ring-blue-500"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      {/* Rounded OTP */}
      <InputOTP maxLength={5} value={value} onChange={setValue}>
        <InputOTPGroup>
          {Array.from({ length: 5 }, (_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className="rounded-full w-12 h-12"
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Slot Size**: 40px × 40px (h-10 w-10)
- **Border**: Input border with rounded corners
- **Focus**: Ring with primary color
- **Active State**: Z-index elevation and ring
- **Caret**: Animated blinking cursor
- **Typography**: Centered text alignment

### Customization Options

```tsx
// Container styling
<InputOTP containerClassName="gap-4" />

// Individual slot styling
<InputOTPSlot className="w-12 h-12 text-lg font-bold" />

// Group spacing
<InputOTPGroup className="gap-3" />
```

## Accessibility Features

### ARIA Support

- **Role**: Proper input roles for screen readers
- **Labels**: Accessible labeling for each slot
- **State**: Active and filled state communication
- **Navigation**: Logical tab order

### Keyboard Navigation

- **Arrow Keys**: Navigate between slots
- **Backspace**: Delete and move to previous slot
- **Delete**: Clear current slot
- **Tab**: Standard tab navigation
- **Paste**: Intelligent paste distribution

### Screen Reader Support

- **Slot Announcement**: Current position and content
- **Progress**: Completion status
- **Validation**: Error state communication

## Advanced Usage

### Pattern Validation

```tsx
function PatternOTP() {
  const [value, setValue] = useState("");
  const isValid = /^\d{6}$/.test(value);

  return (
    <div className="space-y-2">
      <InputOTP
        maxLength={6}
        value={value}
        onChange={setValue}
        pattern={REGEXP_ONLY_DIGITS}
      >
        <InputOTPGroup>
          {Array.from({ length: 6 }, (_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={
                value.length > i && !isValid ? "border-destructive" : ""
              }
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {value.length === 6 && !isValid && (
        <p className="text-sm text-destructive">Please enter only numbers</p>
      )}
    </div>
  );
}
```

### Auto-Submit

```tsx
function AutoSubmitOTP() {
  const [value, setValue] = useState("");

  useEffect(() => {
    if (value.length === 6) {
      // Auto-submit when complete
      handleSubmit(value);
    }
  }, [value]);

  const handleSubmit = async (code: string) => {
    try {
      await verifyCode(code);
    } catch (error) {
      setValue(""); // Clear on error
    }
  };

  return (
    <InputOTP maxLength={6} value={value} onChange={setValue}>
      <InputOTPGroup>
        {Array.from({ length: 6 }, (_, i) => (
          <InputOTPSlot key={i} index={i} />
        ))}
      </InputOTPGroup>
    </InputOTP>
  );
}
```

## Common Patterns

### Resend Timer

```tsx
function ResendTimer() {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResend = () => {
    setCanResend(false);
    setCountdown(60);
    // Resend logic
  };

  return (
    <div className="text-center">
      {canResend ? (
        <Button variant="link" onClick={handleResend}>
          Resend code
        </Button>
      ) : (
        <p className="text-sm text-muted-foreground">Resend in {countdown}s</p>
      )}
    </div>
  );
}
```

## Use Cases

- **Phone Verification**: SMS verification codes
- **Two-Factor Authentication**: TOTP codes
- **Email Verification**: Email confirmation codes
- **PIN Entry**: Security PIN inputs
- **Backup Codes**: Recovery code entry
- **Payment Verification**: Transaction codes
- **Account Recovery**: Password reset codes

## Best Practices

- Use appropriate maxLength for your use case
- Provide clear instructions about expected format
- Implement proper error handling and validation
- Consider auto-submit for better UX
- Add resend functionality with appropriate delays
- Test paste functionality thoroughly
- Ensure proper focus management
- Use semantic HTML for accessibility

## Dependencies

- **input-otp**: Core OTP input functionality
- **lucide-react**: Dot separator icon
- **Tailwind CSS**: Styling system
- **React**: Component framework
