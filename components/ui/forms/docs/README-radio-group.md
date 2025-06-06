# RadioGroup Component

## Overview

The RadioGroup component provides a set of mutually exclusive radio button options built on Radix UI primitives. It ensures only one option can be selected at a time and provides proper accessibility features.

## Features

- **Mutually Exclusive**: Only one option can be selected
- **Keyboard Navigation**: Arrow key navigation between options
- **Accessible**: Built with Radix UI for screen reader support
- **Controlled/Uncontrolled**: Supports both controlled and uncontrolled usage
- **Custom Styling**: Flexible appearance customization
- **Form Integration**: Works seamlessly with form libraries

## Components

### RadioGroup

Container component that manages the radio group state.

### RadioGroupItem

Individual radio button option within the group.

## Props Interfaces

```typescript
interface RadioGroupProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root> {
  className?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  // ... all other Radix RadioGroup props
}

interface RadioGroupItemProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item> {
  className?: string;
  value: string; // Required: unique value for this option
  // ... all other Radix RadioGroupItem props
}
```

## Usage Examples

### Basic Radio Group

```tsx
import { RadioGroup, RadioGroupItem } from "@/components/ui/forms/radio-group";
import { Label } from "@/components/ui/forms/label";

function BasicRadioGroup() {
  return (
    <RadioGroup defaultValue="option1">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option1" id="option1" />
        <Label htmlFor="option1">Option 1</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option2" id="option2" />
        <Label htmlFor="option2">Option 2</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option3" id="option3" />
        <Label htmlFor="option3">Option 3</Label>
      </div>
    </RadioGroup>
  );
}
```

### Controlled Radio Group

```tsx
function ControlledRadioGroup() {
  const [value, setValue] = useState("email");

  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Preferred Contact Method</Label>
      <RadioGroup value={value} onValueChange={setValue}>
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
      <p className="text-sm text-muted-foreground">Selected: {value}</p>
    </div>
  );
}
```

### Radio Group with Descriptions

```tsx
function RadioGroupWithDescriptions() {
  const [plan, setPlan] = useState("basic");

  const plans = [
    {
      value: "basic",
      label: "Basic Plan",
      description: "Perfect for individuals getting started",
      price: "$9/month",
    },
    {
      value: "pro",
      label: "Pro Plan",
      description: "Great for growing teams and businesses",
      price: "$29/month",
    },
    {
      value: "enterprise",
      label: "Enterprise Plan",
      description: "Advanced features for large organizations",
      price: "$99/month",
    },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">Choose Your Plan</Label>
      <RadioGroup value={plan} onValueChange={setPlan}>
        {plans.map((planOption) => (
          <div key={planOption.value} className="flex items-start space-x-3">
            <RadioGroupItem
              value={planOption.value}
              id={planOption.value}
              className="mt-1"
            />
            <div className="space-y-1">
              <Label htmlFor={planOption.value} className="font-medium">
                {planOption.label}
              </Label>
              <p className="text-sm text-muted-foreground">
                {planOption.description}
              </p>
              <p className="text-sm font-semibold text-primary">
                {planOption.price}
              </p>
            </div>
          </div>
        ))}
      </RadioGroup>
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
  contactMethod: z.enum(["email", "phone", "sms"], {
    required_error: "Please select a contact method",
  }),
  priority: z.enum(["low", "medium", "high"]),
});

function RadioGroupForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      priority: "medium",
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
          name="contactMethod"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Contact Method</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Priority Level</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
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

### Disabled Options

```tsx
function DisabledRadioGroup() {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Account Type</Label>
      <RadioGroup defaultValue="personal">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="personal" id="personal" />
          <Label htmlFor="personal">Personal</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="business" id="business" />
          <Label htmlFor="business">Business</Label>
        </div>
        <div className="flex items-center space-x-2 opacity-50">
          <RadioGroupItem value="enterprise" id="enterprise" disabled />
          <Label htmlFor="enterprise">Enterprise (Coming Soon)</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

### Horizontal Layout

```tsx
function HorizontalRadioGroup() {
  return (
    <div className="space-y-3">
      <Label className="text-base font-medium">Size</Label>
      <RadioGroup defaultValue="medium" className="flex space-x-6">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="small" id="small" />
          <Label htmlFor="small">Small</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="medium" id="medium" />
          <Label htmlFor="medium">Medium</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="large" id="large" />
          <Label htmlFor="large">Large</Label>
        </div>
      </RadioGroup>
    </div>
  );
}
```

### Card-Style Options

```tsx
function CardRadioGroup() {
  const [selected, setSelected] = useState("standard");

  const options = [
    {
      value: "standard",
      title: "Standard Delivery",
      description: "5-7 business days",
      price: "Free",
    },
    {
      value: "express",
      title: "Express Delivery",
      description: "2-3 business days",
      price: "$9.99",
    },
    {
      value: "overnight",
      title: "Overnight Delivery",
      description: "Next business day",
      price: "$24.99",
    },
  ];

  return (
    <div className="space-y-3">
      <Label className="text-lg font-semibold">Delivery Options</Label>
      <RadioGroup value={selected} onValueChange={setSelected}>
        {options.map((option) => (
          <div key={option.value} className="relative">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selected === option.value
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/50"
              }`}
            >
              <div className="flex items-start space-x-3">
                <RadioGroupItem
                  value={option.value}
                  id={option.value}
                  className="mt-1"
                />
                <div className="flex-1">
                  <Label
                    htmlFor={option.value}
                    className="font-medium cursor-pointer"
                  >
                    {option.title}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{option.price}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Size**: 16px × 16px (h-4 w-4) radio buttons
- **Border**: Primary color border with circular shape
- **Indicator**: Filled circle when selected
- **Focus**: Ring indicator for keyboard navigation
- **Grid Layout**: Default vertical stacking with gap

### Customization Options

```tsx
// Horizontal layout
<RadioGroup className="flex space-x-6">

// Custom spacing
<RadioGroup className="space-y-4">

// Custom radio button size
<RadioGroupItem className="h-6 w-6" />

// Custom colors
<RadioGroupItem className="border-blue-500 text-blue-500" />
```

## Accessibility Features

### ARIA Support

- **Role**: Proper radiogroup role from Radix UI
- **States**: aria-checked for selected state
- **Labels**: Associated with labels via htmlFor/id
- **Required**: aria-required for mandatory selections

### Keyboard Navigation

- **Arrow Keys**: Navigate between radio options
- **Tab**: Enter/exit the radio group
- **Space**: Select the focused option
- **Home/End**: Jump to first/last option

### Screen Reader Support

- **Group Context**: Radio group is announced as a group
- **Option Reading**: Each option's label is read
- **Selection State**: Current selection is announced
- **Count**: Total number of options may be announced

## Advanced Usage

### Conditional Options

```tsx
function ConditionalRadioGroup() {
  const [userType, setUserType] = useState("individual");
  const [plan, setPlan] = useState("");

  const plans = {
    individual: ["basic", "premium"],
    business: ["starter", "professional", "enterprise"],
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
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

      <div className="space-y-3">
        <Label>Plan</Label>
        <RadioGroup value={plan} onValueChange={setPlan}>
          {plans[userType].map((planOption) => (
            <div key={planOption} className="flex items-center space-x-2">
              <RadioGroupItem value={planOption} id={planOption} />
              <Label htmlFor={planOption} className="capitalize">
                {planOption}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
```

### Dynamic Options

```tsx
function DynamicRadioGroup() {
  const [options, setOptions] = useState([
    { id: "1", label: "Option 1", value: "option1" },
    { id: "2", label: "Option 2", value: "option2" },
  ]);
  const [selected, setSelected] = useState("");

  const addOption = () => {
    const newId = (options.length + 1).toString();
    setOptions([
      ...options,
      {
        id: newId,
        label: `Option ${newId}`,
        value: `option${newId}`,
      },
    ]);
  };

  return (
    <div className="space-y-4">
      <Label>Dynamic Options</Label>
      <RadioGroup value={selected} onValueChange={setSelected}>
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <RadioGroupItem value={option.value} id={option.value} />
            <Label htmlFor={option.value}>{option.label}</Label>
          </div>
        ))}
      </RadioGroup>
      <Button onClick={addOption} variant="outline" size="sm">
        Add Option
      </Button>
    </div>
  );
}
```

## Common Patterns

### Survey Questions

```tsx
function SurveyQuestion() {
  const [satisfaction, setSatisfaction] = useState("");

  return (
    <div className="space-y-4">
      <Label className="text-base">
        How satisfied are you with our service?
      </Label>
      <RadioGroup value={satisfaction} onValueChange={setSatisfaction}>
        {[
          "Very Dissatisfied",
          "Dissatisfied",
          "Neutral",
          "Satisfied",
          "Very Satisfied",
        ].map((option, index) => (
          <div key={index} className="flex items-center space-x-2">
            <RadioGroupItem
              value={option.toLowerCase().replace(" ", "-")}
              id={option.toLowerCase().replace(" ", "-")}
            />
            <Label htmlFor={option.toLowerCase().replace(" ", "-")}>
              {option}
            </Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
}
```

### Settings Panel

```tsx
function SettingsPanel() {
  const [theme, setTheme] = useState("system");
  const [language, setLanguage] = useState("en");

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <Label className="text-base font-medium">Theme</Label>
        <RadioGroup value={theme} onValueChange={setTheme}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="light" />
            <Label htmlFor="light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="dark" />
            <Label htmlFor="dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="system" />
            <Label htmlFor="system">System</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-3">
        <Label className="text-base font-medium">Language</Label>
        <RadioGroup value={language} onValueChange={setLanguage}>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="en" id="en" />
            <Label htmlFor="en">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="es" id="es" />
            <Label htmlFor="es">Español</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="fr" id="fr" />
            <Label htmlFor="fr">Français</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
```

## Use Cases

- **Single Choice Selection**: When only one option should be selected
- **Settings**: Theme, language, or preference selection
- **Forms**: Contact method, priority level, or category selection
- **Surveys**: Rating scales and opinion questions
- **Shipping Options**: Delivery method selection
- **Payment Methods**: Payment type selection
- **Account Types**: User role or plan selection

## Best Practices

- Always provide clear, descriptive labels for each option
- Use logical grouping and ordering of options
- Provide a default selection when appropriate
- Include descriptions for complex options
- Ensure sufficient spacing between options
- Test keyboard navigation thoroughly
- Use consistent styling across radio groups
- Consider card-style layouts for complex options
- Validate required selections in forms

## Dependencies

- **@radix-ui/react-radio-group**: Core radio group functionality
- **lucide-react**: Circle icon for indicator
- **Tailwind CSS**: Styling system
- **React**: Component framework
