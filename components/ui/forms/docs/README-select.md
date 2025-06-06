# Select Component

## Overview

The Select component is a dropdown selection input built on Radix UI primitives. It provides a searchable, accessible dropdown with keyboard navigation, custom styling, and support for complex option layouts.

## Features

- **Accessible**: Built with Radix UI for screen reader support
- **Keyboard Navigation**: Arrow keys, typing to search, Enter to select
- **Searchable**: Type to filter options (when enabled)
- **Scrollable**: Handles large option lists with scroll buttons
- **Customizable**: Flexible styling and content options
- **Portal Rendering**: Dropdown renders in portal for proper layering
- **Form Integration**: Works seamlessly with form libraries

## Components

### Select

Root component that manages the select state.

### SelectTrigger

Button that opens the dropdown when clicked.

### SelectValue

Displays the selected value or placeholder.

### SelectContent

Container for the dropdown options.

### SelectItem

Individual selectable option.

### SelectLabel

Section label for grouping options.

### SelectSeparator

Visual separator between option groups.

### SelectGroup

Groups related options together.

### SelectScrollUpButton / SelectScrollDownButton

Scroll controls for long option lists.

## Props Interfaces

```typescript
interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  // ... all other Radix Select props
}

interface SelectItemProps {
  value: string; // Required: unique value
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}
```

## Usage Examples

### Basic Select

```tsx
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/forms/select";

function BasicSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
        <SelectItem value="grape">Grape</SelectItem>
      </SelectContent>
    </Select>
  );
}
```

### Controlled Select

```tsx
function ControlledSelect() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-2">
      <Label htmlFor="country">Country</Label>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select country" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="us">United States</SelectItem>
          <SelectItem value="ca">Canada</SelectItem>
          <SelectItem value="uk">United Kingdom</SelectItem>
          <SelectItem value="de">Germany</SelectItem>
          <SelectItem value="fr">France</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-sm text-muted-foreground">Selected: {value}</p>
      )}
    </div>
  );
}
```

### Grouped Options

```tsx
function GroupedSelect() {
  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a framework" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Frontend</SelectLabel>
          <SelectItem value="react">React</SelectItem>
          <SelectItem value="vue">Vue</SelectItem>
          <SelectItem value="angular">Angular</SelectItem>
          <SelectItem value="svelte">Svelte</SelectItem>
        </SelectGroup>
        <SelectSeparator />
        <SelectGroup>
          <SelectLabel>Backend</SelectLabel>
          <SelectItem value="node">Node.js</SelectItem>
          <SelectItem value="python">Python</SelectItem>
          <SelectItem value="java">Java</SelectItem>
          <SelectItem value="go">Go</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

### Form Integration

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  category: z.string().min(1, "Please select a category"),
  priority: z.enum(["low", "medium", "high"]),
});

function SelectForm() {
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
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bug">Bug Report</SelectItem>
                  <SelectItem value="feature">Feature Request</SelectItem>
                  <SelectItem value="question">Question</SelectItem>
                  <SelectItem value="feedback">Feedback</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best describes your issue
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
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
function DisabledSelect() {
  return (
    <div className="space-y-4">
      {/* Disabled Select */}
      <div className="space-y-2">
        <Label>Disabled Select</Label>
        <Select disabled>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Cannot select" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select with Disabled Options */}
      <div className="space-y-2">
        <Label>Select with Disabled Options</Label>
        <Select>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select option" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="available1">Available Option 1</SelectItem>
            <SelectItem value="available2">Available Option 2</SelectItem>
            <SelectItem value="disabled1" disabled>
              Disabled Option 1
            </SelectItem>
            <SelectItem value="disabled2" disabled>
              Disabled Option 2
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
```

### Custom Option Content

```tsx
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/inputs/avatar";

function CustomContentSelect() {
  const users = [
    {
      value: "john",
      name: "John Doe",
      email: "john@example.com",
      avatar: "/avatars/john.jpg",
    },
    {
      value: "jane",
      name: "Jane Smith",
      email: "jane@example.com",
      avatar: "/avatars/jane.jpg",
    },
    {
      value: "bob",
      name: "Bob Johnson",
      email: "bob@example.com",
      avatar: "/avatars/bob.jpg",
    },
  ];

  return (
    <Select>
      <SelectTrigger className="w-[300px]">
        <SelectValue placeholder="Select a user" />
      </SelectTrigger>
      <SelectContent>
        {users.map((user) => (
          <SelectItem key={user.value} value={user.value}>
            <div className="flex items-center space-x-3">
              <Avatar className="h-6 w-6">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-medium">{user.name}</span>
                <span className="text-xs text-muted-foreground">
                  {user.email}
                </span>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
```

### Large Option Lists

```tsx
function LargeSelect() {
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    // ... many more countries
    "Zambia",
    "Zimbabwe",
  ];

  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select country" />
      </SelectTrigger>
      <SelectContent className="max-h-[200px]">
        <SelectScrollUpButton />
        {countries.map((country) => (
          <SelectItem key={country} value={country.toLowerCase()}>
            {country}
          </SelectItem>
        ))}
        <SelectScrollDownButton />
      </SelectContent>
    </Select>
  );
}
```

### Multi-Level Select

```tsx
function MultiLevelSelect() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  const categories = {
    electronics: ["Phones", "Laptops", "Tablets", "Accessories"],
    clothing: ["Shirts", "Pants", "Shoes", "Accessories"],
    books: ["Fiction", "Non-Fiction", "Textbooks", "Comics"],
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Category</Label>
        <Select
          value={category}
          onValueChange={(value) => {
            setCategory(value);
            setSubcategory(""); // Reset subcategory
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="clothing">Clothing</SelectItem>
            <SelectItem value="books">Books</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {category && (
        <div className="space-y-2">
          <Label>Subcategory</Label>
          <Select value={subcategory} onValueChange={setSubcategory}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select subcategory" />
            </SelectTrigger>
            <SelectContent>
              {categories[category]?.map((sub) => (
                <SelectItem key={sub} value={sub.toLowerCase()}>
                  {sub}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Trigger**: Input-like appearance with chevron icon
- **Content**: Elevated dropdown with shadow and border
- **Items**: Hover and focus states with smooth transitions
- **Scrolling**: Smooth scroll with scroll indicators
- **Portal**: Renders above other content with proper z-index

### Customization Options

```tsx
// Custom trigger width
<SelectTrigger className="w-[300px]">

// Custom content max height
<SelectContent className="max-h-[300px]">

// Custom item styling
<SelectItem className="text-lg py-3">

// Custom positioning
<SelectContent side="top" align="end">
```

## Accessibility Features

### ARIA Support

- **Role**: Proper combobox and listbox roles
- **States**: aria-expanded, aria-selected
- **Labels**: aria-labelledby for proper labeling
- **Descriptions**: aria-describedby for additional context

### Keyboard Navigation

- **Space/Enter**: Open dropdown
- **Arrow Keys**: Navigate options
- **Escape**: Close dropdown
- **Home/End**: Jump to first/last option
- **Type to Search**: Filter options by typing

### Screen Reader Support

- **Option Announcement**: Each option is properly announced
- **Selection State**: Current selection is communicated
- **Group Context**: Option groups are announced
- **Count Information**: Number of options may be announced

## Advanced Usage

### Searchable Select

```tsx
function SearchableSelect() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const options = [
    "Apple",
    "Banana",
    "Cherry",
    "Date",
    "Elderberry",
    "Fig",
    "Grape",
    "Honeydew",
    "Kiwi",
    "Lemon",
  ];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value || "Select fruit..."}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search fruits..."
            value={searchTerm}
            onValueChange={setSearchTerm}
          />
          <CommandEmpty>No fruit found.</CommandEmpty>
          <CommandGroup>
            {filteredOptions.map((option) => (
              <CommandItem
                key={option}
                onSelect={() => {
                  setValue(option);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option ? "opacity-100" : "opacity-0"
                  )}
                />
                {option}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
```

### Dynamic Options

```tsx
function DynamicSelect() {
  const [options, setOptions] = useState([
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
  ]);
  const [loading, setLoading] = useState(false);

  const loadMoreOptions = async () => {
    setLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newOptions = Array.from({ length: 5 }, (_, i) => ({
      value: `option${options.length + i + 1}`,
      label: `Option ${options.length + i + 1}`,
    }));

    setOptions((prev) => [...prev, ...newOptions]);
    setLoading(false);
  };

  return (
    <Select>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select option" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
        <div className="p-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={loadMoreOptions}
            disabled={loading}
            className="w-full"
          >
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      </SelectContent>
    </Select>
  );
}
```

## Common Patterns

### Settings Select

```tsx
function SettingsSelect() {
  const [theme, setTheme] = useState("system");

  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <Label>Theme</Label>
        <p className="text-sm text-muted-foreground">
          Choose your preferred theme
        </p>
      </div>
      <Select value={theme} onValueChange={setTheme}>
        <SelectTrigger className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="light">Light</SelectItem>
          <SelectItem value="dark">Dark</SelectItem>
          <SelectItem value="system">System</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

### Filter Select

```tsx
function FilterSelect() {
  const [status, setStatus] = useState("all");

  return (
    <div className="flex items-center space-x-2">
      <Label htmlFor="status-filter">Status:</Label>
      <Select value={status} onValueChange={setStatus}>
        <SelectTrigger className="w-[120px]" id="status-filter">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
```

## Use Cases

- **Form Fields**: Category, priority, or status selection
- **Settings**: Theme, language, or preference selection
- **Filters**: Data filtering and sorting options
- **User Selection**: Assignee or owner selection
- **Location**: Country, state, or city selection
- **Time Zones**: Time zone selection
- **Categories**: Product or content categorization
- **Permissions**: Role or permission level selection

## Best Practices

- Provide clear, descriptive placeholder text
- Use appropriate option grouping for large lists
- Include search functionality for extensive options
- Implement proper loading states for dynamic content
- Ensure sufficient contrast for accessibility
- Test keyboard navigation thoroughly
- Use consistent option ordering (alphabetical, logical)
- Provide helpful descriptions for complex options
- Consider multi-level selects for hierarchical data

## Dependencies

- **@radix-ui/react-select**: Core select functionality
- **lucide-react**: ChevronDown, ChevronUp, Check icons
- **Tailwind CSS**: Styling system
- **React**: Component framework
