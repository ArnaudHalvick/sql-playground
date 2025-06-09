# Textarea Component

## Overview

The Textarea component is a multi-line text input field that extends the standard HTML textarea element with consistent styling and enhanced accessibility features.

## Features

- **Multi-line Input**: Supports multiple lines of text input
- **Auto-resize**: Optional automatic height adjustment based on content
- **Consistent Styling**: Unified appearance across the application
- **Accessibility**: Proper ARIA attributes and keyboard navigation
- **Form Integration**: Works seamlessly with form libraries
- **Character Counting**: Built-in support for character limits

## Props Interface

```typescript
interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string;
  // ... all standard HTML textarea attributes
}
```

## Basic Usage

```tsx
import { Textarea } from "@/components/ui/forms/textarea";

function BasicTextarea() {
  return (
    <div className="space-y-2">
      <label htmlFor="message" className="text-sm font-medium">
        Message
      </label>
      <Textarea
        id="message"
        placeholder="Type your message here..."
        className="min-h-[100px]"
      />
    </div>
  );
}
```

## Controlled Textarea

```tsx
function ControlledTextarea() {
  const [value, setValue] = useState("");
  const maxLength = 500;

  return (
    <div className="space-y-2">
      <label htmlFor="bio" className="text-sm font-medium">
        Bio
      </label>
      <Textarea
        id="bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Tell us about yourself..."
        className="min-h-[120px]"
        maxLength={maxLength}
      />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>Brief description for your profile</span>
        <span>
          {value.length}/{maxLength}
        </span>
      </div>
    </div>
  );
}
```

## Auto-resize Textarea

```tsx
function AutoResizeTextarea() {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [value]);

  return (
    <div className="space-y-2">
      <label htmlFor="notes" className="text-sm font-medium">
        Notes
      </label>
      <Textarea
        ref={textareaRef}
        id="notes"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Add your notes here..."
        className="min-h-[80px] resize-none overflow-hidden"
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
  title: z.string().min(1, "Title is required"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description cannot exceed 500 characters"),
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
                  placeholder="Describe your project..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description of your project.
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

## Textarea Variants

```tsx
function TextareaVariants() {
  return (
    <div className="space-y-6">
      {/* Small */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Small</label>
        <Textarea placeholder="Small textarea" className="min-h-[60px]" />
      </div>

      {/* Default */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Default</label>
        <Textarea placeholder="Default textarea" className="min-h-[100px]" />
      </div>

      {/* Large */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Large</label>
        <Textarea placeholder="Large textarea" className="min-h-[150px]" />
      </div>

      {/* Disabled */}
      <div className="space-y-2">
        <label className="text-sm font-medium">Disabled</label>
        <Textarea
          placeholder="Disabled textarea"
          disabled
          className="min-h-[100px]"
        />
      </div>
    </div>
  );
}
```

## Key Features

- **Multi-line text input** with proper line breaks
- **Resizable** by default (can be disabled with resize-none)
- **Character counting** support with maxLength
- **Auto-resize** capability with custom implementation
- **Form validation** support with error states
- **Disabled state** support
- **Custom styling** via className prop

## Common Patterns

1. **Set minimum height** using min-h-[Xpx] classes
2. **Use controlled state** for character counting
3. **Implement auto-resize** for dynamic content
4. **Provide clear labels** and descriptions
5. **Handle form validation** appropriately

## Accessibility

- Full keyboard navigation support
- Screen reader compatibility
- Proper ARIA attributes
- Focus management with visible focus rings

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
