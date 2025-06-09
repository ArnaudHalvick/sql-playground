# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Features

- Collapsible content sections
- Single or multiple items open
- Keyboard accessible
- Smooth animations
- Built on Radix UI primitives

## Installation

```bash
npm install @radix-ui/react-accordion
```

## Usage

### Basic Example

```tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/layout/accordion";

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that matches the other components.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Multiple Items Open

```tsx
function MultipleAccordion() {
  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can multiple items be open?</AccordionTrigger>
        <AccordionContent>
          Yes, when using type="multiple", multiple items can be open.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I control the state?</AccordionTrigger>
        <AccordionContent>
          Use the value and onValueChange props to control open items.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### FAQ Example

```tsx
function FAQAccordion() {
  const faqs = [
    { question: "What payment methods?", answer: "Credit cards, PayPal." },
    { question: "Shipping time?", answer: "3-5 business days." },
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{faq.question}</AccordionTrigger>
          <AccordionContent>{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

## API Reference

### Accordion

| Prop            | Type                                  | Default | Description                                |
| --------------- | ------------------------------------- | ------- | ------------------------------------------ |
| `type`          | `"single" \| "multiple"`              | -       | Whether one or multiple items can be open  |
| `collapsible`   | `boolean`                             | `false` | Allow closing all items (single type only) |
| `value`         | `string \| string[]`                  | -       | Controlled open items                      |
| `defaultValue`  | `string \| string[]`                  | -       | Default open items                         |
| `onValueChange` | `(value: string \| string[]) => void` | -       | Value change handler                       |

### AccordionItem

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `value`    | `string`  | -       | Unique identifier (required) |
| `disabled` | `boolean` | `false` | Disable the item             |

### AccordionTrigger

| Prop       | Type              | Default | Description     |
| ---------- | ----------------- | ------- | --------------- |
| `children` | `React.ReactNode` | -       | Trigger content |

### AccordionContent

| Prop       | Type              | Default | Description        |
| ---------- | ----------------- | ------- | ------------------ |
| `children` | `React.ReactNode` | -       | Content to display |

## Accessibility

- Built on Radix UI primitives
- Keyboard navigation (Enter/Space to toggle, Arrow keys to navigate)
- Screen reader support
- Proper ARIA attributes

## Best Practices

- Use descriptive trigger text
- Group related content logically
- Consider single vs multiple open behavior
- Test keyboard navigation
