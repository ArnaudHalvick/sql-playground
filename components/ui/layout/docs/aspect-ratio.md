# Aspect Ratio

Displays content within a desired ratio.

## Features

- Maintains consistent aspect ratios
- Responsive design support
- Built on Radix UI primitives
- Custom ratio support
- Prevents layout shift

## Installation

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
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd"
          alt="Photo by Drew Beamer"
          className="rounded-md object-cover w-full h-full"
        />
      </AspectRatio>
    </div>
  );
}
```

### Common Ratios

```tsx
function CommonRatios() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <AspectRatio ratio={16 / 9} className="bg-muted rounded-md">
        <div className="flex items-center justify-center h-full">16:9</div>
      </AspectRatio>
      <AspectRatio ratio={4 / 3} className="bg-muted rounded-md">
        <div className="flex items-center justify-center h-full">4:3</div>
      </AspectRatio>
      <AspectRatio ratio={1} className="bg-muted rounded-md">
        <div className="flex items-center justify-center h-full">1:1</div>
      </AspectRatio>
    </div>
  );
}
```

### Image Gallery

```tsx
function ImageGallery() {
  const images = [
    "https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd",
    "https://images.unsplash.com/photo-1486312338219-ce68e2c6b7d3",
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {images.map((src, index) => (
        <AspectRatio
          key={index}
          ratio={1}
          className="bg-muted rounded-md overflow-hidden"
        >
          <img
            src={src}
            alt={`Gallery ${index + 1}`}
            className="object-cover w-full h-full"
          />
        </AspectRatio>
      ))}
    </div>
  );
}
```

## API Reference

### AspectRatio

| Prop        | Type              | Default | Description                             |
| ----------- | ----------------- | ------- | --------------------------------------- |
| `ratio`     | `number`          | `1`     | The desired aspect ratio (width/height) |
| `className` | `string`          | -       | Additional CSS classes                  |
| `children`  | `React.ReactNode` | -       | Content to display within the ratio     |

## Common Ratios

- **16:9** (1.777) - Widescreen, video content
- **4:3** (1.333) - Standard displays, presentations
- **3:2** (1.5) - Photography, print media
- **1:1** (1) - Square, social media posts

## Accessibility

- Built on Radix UI primitives
- Maintains semantic structure
- Supports screen readers
- No layout shift issues

## Best Practices

- Use appropriate ratios for content type
- Consider responsive behavior
- Optimize images for the display size
- Test across different screen sizes
