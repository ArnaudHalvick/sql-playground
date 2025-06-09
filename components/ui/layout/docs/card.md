# Card

Displays a card with header, content and footer.

## Features

- Flexible layout with optional header, content, and footer sections
- Consistent styling and spacing
- Responsive design
- Customizable with Tailwind CSS classes
- Semantic HTML structure

## Installation

This component uses standard HTML elements and doesn't require additional dependencies beyond Tailwind CSS.

## Usage

### Basic Example

```tsx
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";

export function CardDemo() {
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name">Name</label>
              <input id="name" placeholder="Name of your project" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="framework">Framework</label>
              <select id="framework">
                <option value="">Select</option>
                <option value="next">Next.js</option>
                <option value="sveltekit">SvelteKit</option>
                <option value="astro">Astro</option>
                <option value="nuxt">Nuxt.js</option>
              </select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <button variant="outline">Cancel</button>
        <button>Deploy</button>
      </CardFooter>
    </Card>
  );
}
```

### Simple Card

```tsx
<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>
</Card>
```

### Card with Image

```tsx
<Card className="w-full max-w-sm">
  <CardContent className="p-0">
    <img
      src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
      alt="Card image"
      className="w-full h-48 object-cover rounded-t-lg"
    />
  </CardContent>
  <CardHeader>
    <CardTitle>Beautiful Landscape</CardTitle>
    <CardDescription>A stunning view of nature</CardDescription>
  </CardHeader>
  <CardFooter>
    <button className="w-full">View Details</button>
  </CardFooter>
</Card>
```

### Product Card

```tsx
function ProductCard() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-0">
        <img
          src="/product-image.jpg"
          alt="Product"
          className="w-full h-48 object-cover rounded-t-lg"
        />
      </CardContent>
      <CardHeader>
        <CardTitle>Premium Headphones</CardTitle>
        <CardDescription>High-quality wireless headphones</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold">$299</span>
          <div className="flex items-center">
            <span className="text-yellow-400">★★★★★</span>
            <span className="ml-1 text-sm text-muted-foreground">(4.5)</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <button className="w-full">Add to Cart</button>
      </CardFooter>
    </Card>
  );
}
```

### Stats Card

```tsx
function StatsCard() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        <DollarSign className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}
```

## API Reference

### Card

The root container component.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The card content       |

### CardHeader

Contains the card's header content, typically title and description.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The header content     |

### CardTitle

The main heading of the card.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The title content      |

### CardDescription

A description or subtitle for the card.

| Prop        | Type              | Default | Description             |
| ----------- | ----------------- | ------- | ----------------------- |
| `className` | `string`          | -       | Additional CSS classes  |
| `children`  | `React.ReactNode` | -       | The description content |

### CardContent

The main content area of the card.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The main content       |

### CardFooter

The footer section of the card, typically containing actions.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The footer content     |

## Best Practices

- Use CardHeader for titles and descriptions
- Place main content in CardContent
- Use CardFooter for actions and buttons
- Maintain consistent spacing and padding
- Consider responsive design for different screen sizes
- Use semantic HTML structure for accessibility
