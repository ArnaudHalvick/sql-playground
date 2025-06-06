# Aspect Ratio

Displays content within a desired ratio.

## Features

- Maintains consistent aspect ratios across different screen sizes
- Prevents layout shift when content loads
- Built on top of Radix UI Aspect Ratio primitive
- Responsive and flexible

## Installation

This component is built using Radix UI. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-aspect-ratio
```

## Usage

### Basic Example

```tsx
import { AspectRatio } from "@/components/ui/layout/aspect-ratio";

export function AspectRatioDemo() {
  return (
    <div className="w-[450px]">
      <AspectRatio ratio={16 / 9}>
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
```

### Video Container

```tsx
<div className="w-full max-w-md">
  <AspectRatio ratio={16 / 9}>
    <iframe
      src="https://www.youtube.com/embed/dQw4w9WgXcQ"
      title="YouTube video player"
      className="w-full h-full rounded-md"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    />
  </AspectRatio>
</div>
```

### Square Ratio

```tsx
<div className="w-64">
  <AspectRatio ratio={1}>
    <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
      <span className="text-sm text-muted-foreground">1:1 Square</span>
    </div>
  </AspectRatio>
</div>
```

## API Reference

### AspectRatio

The root component that maintains the aspect ratio of its content.

| Prop       | Type              | Default | Description                                         |
| ---------- | ----------------- | ------- | --------------------------------------------------- |
| `ratio`    | `number`          | `1`     | The desired aspect ratio (width / height)           |
| `children` | `React.ReactNode` | -       | The content to be displayed within the aspect ratio |

## Common Aspect Ratios

Here are some commonly used aspect ratios:

- **16:9** (Widescreen): `16 / 9` = `1.777...`
- **4:3** (Standard): `4 / 3` = `1.333...`
- **1:1** (Square): `1 / 1` = `1`
- **3:2** (Photography): `3 / 2` = `1.5`
- **21:9** (Ultrawide): `21 / 9` = `2.333...`

## Examples

### Image Gallery

```tsx
function ImageGallery() {
  const images = [
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    "https://images.unsplash.com/photo-1464822759844-d150baec013c",
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {images.map((src, index) => (
        <AspectRatio key={index} ratio={4 / 3}>
          <img
            src={src}
            alt={`Gallery image ${index + 1}`}
            className="rounded-md object-cover w-full h-full"
          />
        </AspectRatio>
      ))}
    </div>
  );
}
```

### Card with Aspect Ratio

```tsx
import { Card, CardContent } from "@/components/ui/layout/card";

function CardWithAspectRatio() {
  return (
    <Card className="w-full max-w-sm">
      <CardContent className="p-0">
        <AspectRatio ratio={16 / 9}>
          <img
            src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
            alt="Card image"
            className="rounded-t-lg object-cover w-full h-full"
          />
        </AspectRatio>
        <div className="p-4">
          <h3 className="font-semibold">Card Title</h3>
          <p className="text-sm text-muted-foreground">Card description</p>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Responsive Aspect Ratio

```tsx
function ResponsiveAspectRatio() {
  return (
    <div className="w-full">
      <AspectRatio ratio={16 / 9} className="bg-muted">
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-sm text-muted-foreground text-center">
            This container maintains a 16:9 aspect ratio
            <br />
            regardless of the screen size
          </p>
        </div>
      </AspectRatio>
    </div>
  );
}
```

## Styling

The component uses CSS to maintain the aspect ratio. You can customize the appearance by:

1. Adding className props to the AspectRatio component
2. Styling the child elements as needed
3. Using responsive classes for different screen sizes

## Use Cases

- **Media containers**: Images, videos, and embedded content
- **Card layouts**: Consistent card heights in grids
- **Placeholder content**: Loading states and empty states
- **Responsive design**: Maintaining proportions across devices
- **Image galleries**: Uniform image display
