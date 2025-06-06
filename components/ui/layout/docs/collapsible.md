# Collapsible

An interactive component which expands/collapses a panel.

## Features

- Smooth expand/collapse animations
- Keyboard accessible
- Can be controlled or uncontrolled
- Built on top of Radix UI Collapsible primitive
- Customizable trigger and content

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-collapsible
```

## Usage

### Basic Example

```tsx
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/layout/collapsible";

export function CollapsibleDemo() {
  return (
    <Collapsible>
      <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
      <CollapsibleContent>
        Yes. Free to use for personal and commercial projects. No attribution
        required.
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### With Custom Styling

```tsx
import { ChevronDown } from "lucide-react";

function StyledCollapsible() {
  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left bg-muted rounded-lg hover:bg-muted/80 transition-colors">
        <span className="font-medium">Show more details</span>
        <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
        <div className="space-y-2">
          <p>This is additional content that can be shown or hidden.</p>
          <p>It supports any kind of content including other components.</p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### Controlled Collapsible

```tsx
function ControlledCollapsible() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          {isOpen ? "Close" : "Open"} Panel
        </button>
        <span className="text-sm text-muted-foreground">
          Panel is {isOpen ? "open" : "closed"}
        </span>
      </div>

      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full p-4 text-left bg-muted rounded-lg">
          Click to toggle (controlled externally)
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg">
          This collapsible is controlled by external state.
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## API Reference

### Collapsible

The root component that manages the collapsible state.

| Prop           | Type                      | Default | Description                                |
| -------------- | ------------------------- | ------- | ------------------------------------------ |
| `defaultOpen`  | `boolean`                 | `false` | The default open state                     |
| `open`         | `boolean`                 | -       | The controlled open state                  |
| `onOpenChange` | `(open: boolean) => void` | -       | Callback fired when the open state changes |
| `disabled`     | `boolean`                 | `false` | Whether the collapsible is disabled        |

### CollapsibleTrigger

The button that toggles the collapsible.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### CollapsibleContent

Contains the collapsible content.

| Prop         | Type              | Default | Description                                        |
| ------------ | ----------------- | ------- | -------------------------------------------------- |
| `forceMount` | `boolean`         | `false` | Used to force mounting when more control is needed |
| `children`   | `React.ReactNode` | -       | The collapsible content                            |

## Examples

### FAQ Section

```tsx
function FAQSection() {
  const faqs = [
    {
      question: "What is this component for?",
      answer:
        "This component is used to create collapsible sections of content.",
    },
    {
      question: "Is it accessible?",
      answer:
        "Yes, it follows WAI-ARIA guidelines and supports keyboard navigation.",
    },
    {
      question: "Can I customize the styling?",
      answer:
        "Absolutely! You can customize it using Tailwind classes or custom CSS.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Collapsible key={index} className="border rounded-lg">
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 text-left hover:bg-muted/50 transition-colors">
            <span className="font-medium">{faq.question}</span>
            <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 pb-4 text-sm text-muted-foreground">
            {faq.answer}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
```

### Sidebar Menu

```tsx
function SidebarMenu() {
  return (
    <div className="w-64 space-y-2">
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-muted rounded">
          <span>Navigation</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 space-y-1">
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            Home
          </a>
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            About
          </a>
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            Contact
          </a>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full p-2 text-left hover:bg-muted rounded">
          <span>Settings</span>
          <ChevronDown className="h-4 w-4 transition-transform duration-200 [&[data-state=open]]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pl-4 space-y-1">
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            Profile
          </a>
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            Preferences
          </a>
          <a href="#" className="block p-2 text-sm hover:bg-muted rounded">
            Security
          </a>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

### Content Preview

```tsx
function ContentPreview() {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const longContent = `
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
    tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim 
    veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea 
    commodo consequat. Duis aute irure dolor in reprehenderit in voluptate 
    velit esse cillum dolore eu fugiat nulla pariatur.
  `;

  return (
    <div className="max-w-md">
      <h3 className="font-semibold mb-2">Article Preview</h3>
      <p className="text-sm text-muted-foreground mb-4">
        {isExpanded ? longContent : longContent.substring(0, 100) + "..."}
      </p>

      <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
        <CollapsibleTrigger className="text-sm text-primary hover:underline">
          {isExpanded ? "Show less" : "Read more"}
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 text-sm text-muted-foreground">
          <p>Additional content that appears when expanded.</p>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
```

## Styling

The component uses Radix UI's data attributes for styling states:

- `data-state="open"` - When the collapsible is open
- `data-state="closed"` - When the collapsible is closed
- `data-disabled` - When the collapsible is disabled

You can use these attributes in your CSS:

```css
[data-state="open"] .chevron {
  transform: rotate(180deg);
}

[data-state="closed"] .content {
  display: none;
}
```

## Accessibility

- Uses proper ARIA attributes for screen readers
- Supports keyboard navigation (Space, Enter)
- Focus management is handled automatically
- Follows WAI-ARIA Disclosure pattern

## Use Cases

- **FAQ sections**: Expandable question and answer pairs
- **Navigation menus**: Collapsible menu sections
- **Content previews**: Show/hide additional content
- **Settings panels**: Expandable configuration sections
- **Documentation**: Collapsible code examples or details
