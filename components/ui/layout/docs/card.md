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

## Examples

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="h-4 w-4 text-muted-foreground"
        >
          <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
        </svg>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">$45,231.89</div>
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
}
```

### Card Grid

```tsx
function CardGrid() {
  const cards = [
    { title: "Card 1", description: "Description 1" },
    { title: "Card 2", description: "Description 2" },
    { title: "Card 3", description: "Description 3" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{card.title}</CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Some content for {card.title}</p>
          </CardContent>
          <CardFooter>
            <button variant="outline">Learn More</button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
```

### Interactive Card

```tsx
function InteractiveCard() {
  const [isLiked, setIsLiked] = React.useState(false);

  return (
    <Card className="w-full max-w-md hover:shadow-lg transition-shadow cursor-pointer">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Interactive Card</CardTitle>
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`p-2 rounded-full ${
              isLiked ? "text-red-500" : "text-gray-400"
            }`}
          >
            ♥
          </button>
        </div>
        <CardDescription>Click the heart to like this card</CardDescription>
      </CardHeader>
      <CardContent>
        <p>This card responds to user interactions.</p>
      </CardContent>
    </Card>
  );
}
```

## Styling

The card components use Tailwind CSS classes for styling. You can customize the appearance by:

1. Adding custom className props
2. Modifying the default styles
3. Using Tailwind utility classes
4. Creating custom CSS classes

## Accessibility

- Uses semantic HTML elements (`div` elements with appropriate roles)
- Supports keyboard navigation when interactive elements are included
- Maintains proper heading hierarchy with CardTitle
- Screen reader friendly structure

## Use Cases

- **Content display**: Articles, blog posts, product information
- **Dashboard widgets**: Statistics, metrics, quick actions
- **User profiles**: Avatar, name, bio, actions
- **Media galleries**: Images with descriptions and metadata
- **Form containers**: Grouping related form fields
- **Feature highlights**: Showcasing key features or benefits
