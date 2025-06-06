# Accordion

A vertically stacked set of interactive headings that each reveal a section of content.

## Features

- Full keyboard navigation
- Supports single or multiple items open at the same time
- Can be controlled or uncontrolled
- Smooth animations with CSS transitions
- Built on top of Radix UI Accordion primitive

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-accordion lucide-react
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
          Yes. It comes with default styles that matches the other components'
          aesthetic.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It's animated by default, but you can disable it if you prefer.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```

### Multiple Items Open

```tsx
<Accordion type="multiple" className="w-full">
  <AccordionItem value="item-1">
    <AccordionTrigger>Section 1</AccordionTrigger>
    <AccordionContent>Content for section 1</AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Section 2</AccordionTrigger>
    <AccordionContent>Content for section 2</AccordionContent>
  </AccordionItem>
</Accordion>
```

## API Reference

### Accordion

The root component that manages the state of the accordion.

| Prop            | Type                                  | Default | Description                                                                        |
| --------------- | ------------------------------------- | ------- | ---------------------------------------------------------------------------------- |
| `type`          | `"single" \| "multiple"`              | -       | Whether one or multiple items can be opened at the same time                       |
| `collapsible`   | `boolean`                             | `false` | When `type="single"`, allows closing content when clicking trigger of an open item |
| `defaultValue`  | `string \| string[]`                  | -       | The default active item(s)                                                         |
| `value`         | `string \| string[]`                  | -       | The controlled active item(s)                                                      |
| `onValueChange` | `(value: string \| string[]) => void` | -       | Callback fired when the active item(s) change                                      |

### AccordionItem

Contains all the parts of a collapsible section.

| Prop       | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `value`    | `string`  | -       | A unique value for the item  |
| `disabled` | `boolean` | `false` | Whether the item is disabled |

### AccordionTrigger

The button that toggles the collapsed state of its associated item.

| Prop       | Type              | Default | Description                |
| ---------- | ----------------- | ------- | -------------------------- |
| `children` | `React.ReactNode` | -       | The content of the trigger |

### AccordionContent

Contains the collapsible content for an item.

| Prop       | Type              | Default | Description                          |
| ---------- | ----------------- | ------- | ------------------------------------ |
| `children` | `React.ReactNode` | -       | The content to be collapsed/expanded |

## Styling

The component uses Tailwind CSS classes and CSS custom properties for styling. You can customize the appearance by:

1. Modifying the className props
2. Updating the CSS custom properties
3. Overriding the default styles in your CSS

## Accessibility

- Uses proper ARIA attributes for screen readers
- Supports keyboard navigation (Space, Enter, Arrow keys)
- Focus management is handled automatically
- Follows WAI-ARIA Accordion pattern

## Examples

### With Custom Styling

```tsx
<Accordion type="single" collapsible className="w-full max-w-md">
  <AccordionItem value="item-1" className="border-b-2 border-blue-200">
    <AccordionTrigger className="text-blue-600 hover:text-blue-800">
      Custom Styled Item
    </AccordionTrigger>
    <AccordionContent className="text-gray-600 bg-blue-50 p-4 rounded">
      This accordion item has custom styling applied.
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Controlled Accordion

```tsx
function ControlledAccordion() {
  const [value, setValue] = React.useState<string>("");

  return (
    <Accordion
      type="single"
      value={value}
      onValueChange={setValue}
      className="w-full"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Controlled Item</AccordionTrigger>
        <AccordionContent>
          This accordion is controlled by external state.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
```
