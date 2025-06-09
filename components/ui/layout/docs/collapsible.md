# Collapsible

An interactive component which expands/collapses a panel.

## Features

- Smooth expand/collapse animations
- Keyboard accessible
- Built on Radix UI primitives
- Controlled and uncontrolled modes
- ARIA attributes for accessibility

## Installation

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
        Yes. Free to use for personal and commercial projects.
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### With Custom Styling

```tsx
function StyledCollapsible() {
  return (
    <Collapsible className="w-full space-y-2">
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2 font-medium hover:bg-muted/80">
        Is it accessible?
        <ChevronDown className="h-4 w-4" />
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border px-4 py-2">
        Yes. It adheres to the WAI-ARIA design pattern.
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### Controlled State

```tsx
function ControlledCollapsible() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-2">
        How do I get started?
        <ChevronDown
          className={`h-4 w-4 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent className="rounded-md border px-4 py-2">
        <p>Getting started is easy:</p>
        <ol className="list-decimal list-inside">
          <li>Install the package</li>
          <li>Import the components</li>
          <li>Use them in your project</li>
        </ol>
      </CollapsibleContent>
    </Collapsible>
  );
}
```

### FAQ Section

```tsx
function FAQSection() {
  const faqs = [
    {
      question: "What is this for?",
      answer: "Creating collapsible content sections.",
    },
    {
      question: "Is it mobile-friendly?",
      answer: "Yes, works great on mobile devices.",
    },
  ];

  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <Collapsible key={index} className="w-full">
          <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-muted px-4 py-3 text-left font-medium">
            {faq.question}
            <ChevronDown className="h-4 w-4" />
          </CollapsibleTrigger>
          <CollapsibleContent className="px-4 py-3 border-x border-b rounded-b-md">
            {faq.answer}
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
}
```

## API Reference

### Collapsible

| Prop           | Type                      | Default | Description               |
| -------------- | ------------------------- | ------- | ------------------------- |
| `defaultOpen`  | `boolean`                 | `false` | Default open state        |
| `open`         | `boolean`                 | -       | Controlled open state     |
| `onOpenChange` | `(open: boolean) => void` | -       | Open state change handler |
| `disabled`     | `boolean`                 | `false` | Disable the collapsible   |

### CollapsibleTrigger

| Prop       | Type              | Default | Description     |
| ---------- | ----------------- | ------- | --------------- |
| `children` | `React.ReactNode` | -       | Trigger content |

### CollapsibleContent

| Prop       | Type              | Default | Description         |
| ---------- | ----------------- | ------- | ------------------- |
| `children` | `React.ReactNode` | -       | Collapsible content |

## Accessibility

- Built on Radix UI primitives
- Keyboard navigation (Enter/Space to toggle)
- Screen reader support
- Proper ARIA attributes

## Best Practices

- Use descriptive trigger text
- Provide visual indicators for open/closed state
- Test keyboard navigation
- Group related collapsible sections logically
