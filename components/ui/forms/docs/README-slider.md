# Slider Component

## Overview

The Slider component is a range input control built on Radix UI primitives. It allows users to select a value or range of values by dragging a thumb along a track, providing an intuitive interface for numeric input.

## Features

- **Touch Support**: Works on touch devices with gesture support
- **Keyboard Navigation**: Arrow keys for precise value adjustment
- **Accessible**: Built with Radix UI for screen reader support
- **Range Support**: Single value or range selection
- **Custom Styling**: Flexible appearance customization
- **Smooth Animation**: Fluid thumb movement and transitions
- **Value Constraints**: Min, max, and step value support

## Props Interface

```typescript
interface SliderProps
  extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  className?: string;
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  // ... all other Radix Slider props
}
```

## Usage Examples

### Basic Slider

```tsx
import { Slider } from "@/components/ui/forms/slider";

function BasicSlider() {
  const [value, setValue] = useState([50]);

  return (
    <div className="space-y-4">
      <Label>Volume: {value[0]}%</Label>
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

### Range Slider

```tsx
function RangeSlider() {
  const [range, setRange] = useState([20, 80]);

  return (
    <div className="space-y-4">
      <Label>
        Price Range: ${range[0]} - ${range[1]}
      </Label>
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

### Form Integration

```tsx
import { useForm } from "react-hook-form";

function SliderForm() {
  const form = useForm({
    defaultValues: {
      volume: [75],
      brightness: [50],
      range: [25, 75],
    },
  });

  return (
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="volume"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Volume ({field.value[0]}%)</FormLabel>
              <FormControl>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  max={100}
                  step={1}
                />
              </FormControl>
              <FormDescription>Adjust the audio volume level</FormDescription>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="range"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Price Range (${field.value[0]} - ${field.value[1]})
              </FormLabel>
              <FormControl>
                <Slider
                  value={field.value}
                  onValueChange={field.onChange}
                  min={0}
                  max={1000}
                  step={10}
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
```

### Custom Step Values

```tsx
function StepSlider() {
  const [value, setValue] = useState([0]);

  const stepLabels = {
    0: "Off",
    25: "Low",
    50: "Medium",
    75: "High",
    100: "Maximum",
  };

  return (
    <div className="space-y-4">
      <Label>Performance: {stepLabels[value[0]] || value[0]}</Label>
      <Slider
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
        step={25}
        className="w-full"
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Off</span>
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
        <span>Max</span>
      </div>
    </div>
  );
}
```

### Disabled Slider

```tsx
function DisabledSlider() {
  return (
    <div className="space-y-4">
      <Label>Disabled Slider</Label>
      <Slider value={[30]} disabled max={100} className="w-full" />
    </div>
  );
}
```

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
