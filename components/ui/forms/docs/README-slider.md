# Slider Component

## Overview

The Slider component is a range input control built on Radix UI primitives. It allows users to select a value or range of values by dragging a thumb along a track.

## Features

- **Single/Range Values**: Support for single value or range selection
- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow keys for precise value adjustment
- **Touch Support**: Works on touch devices with drag gestures
- **Customizable**: Flexible styling and step configuration
- **Form Integration**: Works seamlessly with form libraries

## Props Interface

```typescript
interface SliderProps {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  className?: string;
}
```

## Basic Usage

```tsx
import { Slider } from "@/components/ui/forms/slider";
import { Label } from "@/components/ui/forms/label";

function BasicSlider() {
  return (
    <div className="space-y-4">
      <Label>Volume</Label>
      <Slider defaultValue={[50]} max={100} step={1} className="w-full" />
    </div>
  );
}
```

## Controlled Slider

```tsx
function ControlledSlider() {
  const [value, setValue] = useState([25]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Label>Brightness</Label>
        <span className="text-sm text-muted-foreground">{value[0]}%</span>
      </div>
      <Slider
        value={value}
        onValueChange={setValue}
        max={100}
        step={1}
        className="w-full"
      />
    </div>
  );
}
```

## Range Slider

```tsx
function RangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Label>Price Range</Label>
        <span className="text-sm text-muted-foreground">
          ${range[0]} - ${range[1]}
        </span>
      </div>
      <Slider
        value={range}
        onValueChange={setRange}
        min={0}
        max={100}
        step={5}
        className="w-full"
      />
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
  volume: z.array(z.number()).length(1),
  priceRange: z.array(z.number()).length(2),
  quality: z.array(z.number()).length(1),
});

function SliderForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      volume: [50],
      priceRange: [20, 80],
      quality: [75],
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Volume</FormLabel>
                <span className="text-sm text-muted-foreground">
                  {field.value[0]}%
                </span>
              </div>
              <FormControl>
                <Slider
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  max={100}
                  step={1}
                  className="w-full"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceRange"
          render={({ field }) => (
            <FormItem>
              <div className="flex justify-between">
                <FormLabel>Price Range</FormLabel>
                <span className="text-sm text-muted-foreground">
                  ${field.value[0]} - ${field.value[1]}
                </span>
              </div>
              <FormControl>
                <Slider
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  min={0}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </FormControl>
              <FormDescription>
                Select your preferred price range
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Save Settings</Button>
      </form>
    </Form>
  );
}
```

## Slider Variants

```tsx
function SliderVariants() {
  return (
    <div className="space-y-8">
      {/* Default */}
      <div className="space-y-2">
        <Label>Default Slider</Label>
        <Slider defaultValue={[50]} max={100} step={1} />
      </div>

      {/* With Steps */}
      <div className="space-y-2">
        <Label>Step Slider (10)</Label>
        <Slider defaultValue={[50]} max={100} step={10} />
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <Label>Disabled Slider</Label>
        <Slider defaultValue={[30]} max={100} step={1} disabled />
      </div>

      {/* Vertical */}
      <div className="space-y-2">
        <Label>Vertical Slider</Label>
        <div className="h-48">
          <Slider
            defaultValue={[50]}
            max={100}
            step={1}
            orientation="vertical"
            className="h-full"
          />
        </div>
      </div>
    </div>
  );
}
```

## Key Features

- **Single or range selection** with one or two thumbs
- **Keyboard accessible** with arrow key navigation
- **Touch and mouse support** for all devices
- **Step configuration** for discrete value selection
- **Min/max bounds** with validation
- **Vertical orientation** support
- **Disabled state** support

## Common Patterns

1. **Always provide labels** for accessibility
2. **Show current values** for user feedback
3. **Use appropriate step sizes** for the use case
4. **Set reasonable min/max bounds**
5. **Handle form validation** appropriately

## Accessibility

- Full keyboard navigation with arrow keys
- Screen reader announcements for value changes
- Proper ARIA attributes and roles
- Focus management with visible focus indicators

## Use Cases

- **Volume Controls**: Audio/video volume adjustment
- **Price Ranges**: E-commerce price filtering
- **Settings**: Brightness, contrast, or other preferences
- **Progress**: Task completion or loading indicators
- **Ratings**: Star ratings or satisfaction scores
- **Time Selection**: Duration or time range selection
- **Quantity**: Product quantity or amount selection

## Best Practices

- Provide clear labels showing current values
- Use appropriate step sizes for the use case
- Include visual indicators for important values
- Test touch interactions on mobile devices
- Ensure sufficient contrast for accessibility
- Consider providing text input alternatives
- Use consistent styling across sliders
- Provide helpful descriptions for complex ranges

## Dependencies

- **@radix-ui/react-slider**: Core slider functionality
- **Tailwind CSS**: Styling system
- **React**: Component framework
