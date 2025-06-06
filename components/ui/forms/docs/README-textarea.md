# Textarea Component

## Overview

The Textarea component is a multi-line text input field that extends the standard HTML textarea element with consistent styling and enhanced accessibility. It's designed for longer text input such as comments, descriptions, or messages.

## Features

- **Multi-line Input**: Supports multiple lines of text
- **Auto-resize**: Can be configured to grow with content
- **Consistent Styling**: Unified appearance with other form components
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Validation States**: Visual feedback for form validation
- **Responsive**: Adapts to container width
- **Character Counting**: Can be paired with character counters

## Props Interface

```typescript
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  // ... all standard HTML textarea attributes
}
```

## Usage Examples

### Basic Textarea

```tsx
import { Textarea } from "@/components/ui/forms/textarea";
import { Label } from "@/components/ui/forms/label";

function BasicTextarea() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Type your message here..." />
    </div>
  );
}
```

### Controlled Textarea

```tsx
function ControlledTextarea() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="description">Description</Label>
      <Textarea
        id="description"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a description..."
      />
      <p className="text-sm text-muted-foreground">
        {value.length}/500 characters
      </p>
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
  title: z.string().min(1, "Title is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  feedback: z.string().optional(),
});

function TextareaForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      feedback: "",
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
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter a detailed description..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a comprehensive description of your request
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="feedback"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Feedback (Optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Any additional comments..."
                  className="min-h-[80px]"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
```

### Character Counter

```tsx
function TextareaWithCounter() {
  const [value, setValue] = useState("");
  const maxLength = 280;

  return (
    <div className="space-y-2">
      <Label htmlFor="tweet">Tweet</Label>
      <Textarea
        id="tweet"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What's happening?"
        maxLength={maxLength}
        className="min-h-[100px]"
      />
      <div className="flex justify-between text-sm">
        <span className="text-muted-foreground">Share your thoughts</span>
        <span
          className={
            value.length > maxLength * 0.9
              ? "text-destructive"
              : "text-muted-foreground"
          }
        >
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
```

### Auto-resize Textarea

```tsx
function AutoResizeTextarea() {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="auto-resize">Auto-resize Textarea</Label>
      <Textarea
        ref={textareaRef}
        id="auto-resize"
        placeholder="Start typing and watch me grow..."
        onChange={adjustHeight}
        className="min-h-[60px] max-h-[300px] resize-none overflow-hidden"
      />
    </div>
  );
}
```

### Validation States

```tsx
function ValidationTextarea() {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = (text: string) => {
    if (text.length < 10) {
      setError("Message must be at least 10 characters long");
    } else if (text.length > 500) {
      setError("Message cannot exceed 500 characters");
    } else {
      setError("");
    }
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="validation-textarea">Message</Label>
      <Textarea
        id="validation-textarea"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          validateInput(e.target.value);
        }}
        placeholder="Enter your message..."
        className={
          error ? "border-destructive focus-visible:ring-destructive" : ""
        }
      />
      {error && <p className="text-sm text-destructive">{error}</p>}
      <p className="text-sm text-muted-foreground">
        {value.length}/500 characters
      </p>
    </div>
  );
}
```

### Disabled Textarea

```tsx
function DisabledTextarea() {
  return (
    <div className="space-y-2">
      <Label htmlFor="disabled-textarea">Disabled Textarea</Label>
      <Textarea
        id="disabled-textarea"
        disabled
        value="This textarea is disabled and cannot be edited."
        className="min-h-[80px]"
      />
    </div>
  );
}
```

### Different Sizes

```tsx
function TextareaSizes() {
  return (
    <div className="space-y-6">
      {/* Small */}
      <div className="space-y-2">
        <Label>Small Textarea</Label>
        <Textarea
          placeholder="Small textarea..."
          className="min-h-[60px] text-sm"
        />
      </div>

      {/* Default */}
      <div className="space-y-2">
        <Label>Default Textarea</Label>
        <Textarea placeholder="Default textarea..." className="min-h-[80px]" />
      </div>

      {/* Large */}
      <div className="space-y-2">
        <Label>Large Textarea</Label>
        <Textarea
          placeholder="Large textarea..."
          className="min-h-[120px] text-base"
        />
      </div>
    </div>
  );
}
```

## Use Cases

- **Comments**: User comments and feedback
- **Descriptions**: Product or service descriptions
- **Messages**: Contact forms and messaging
- **Reviews**: User reviews and testimonials
- **Notes**: Personal notes and documentation
- **Code Input**: Code snippets or configuration
- **Rich Content**: Blog posts or article content
- **Feedback Forms**: Survey responses and feedback

## Best Practices

- Provide clear, descriptive labels
- Set appropriate minimum height for the use case
- Include character counters for length-limited inputs
- Use placeholder text to guide users
- Implement proper validation with clear error messages
- Consider auto-resize for dynamic content
- Ensure sufficient color contrast for accessibility
- Test keyboard navigation and screen reader compatibility
- Provide helpful descriptions for complex inputs

## Dependencies

- **React**: Component framework
- **Tailwind CSS**: Styling system
- **@/lib/utils**: Utility functions (cn)
