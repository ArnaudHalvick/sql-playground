# Carousel Component

## Overview

The Carousel component is a flexible, accessible slideshow component built on top of Embla Carousel. It provides smooth navigation through content with keyboard support, touch gestures, and customizable styling options.

## Features

- **Smooth Scrolling**: Fluid transitions between slides
- **Touch Support**: Swipe gestures on mobile devices
- **Keyboard Navigation**: Arrow key navigation
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: ARIA labels and keyboard support
- **Flexible Orientation**: Horizontal or vertical scrolling
- **Plugin Support**: Extensible with Embla plugins
- **Auto-scroll**: Optional automatic progression

## Core Components

### Carousel

The main container component that provides context and functionality.

```typescript
interface CarouselProps {
  opts?: CarouselOptions; // Embla carousel options
  plugins?: CarouselPlugin; // Embla plugins array
  orientation?: "horizontal" | "vertical"; // Scroll direction
  setApi?: (api: CarouselApi) => void; // Access to carousel API
  className?: string; // Custom CSS classes
  children: React.ReactNode; // Carousel content
}
```

### CarouselContent

Container for all carousel items with overflow handling.

### CarouselItem

Individual slide wrapper with proper spacing and sizing.

### CarouselPrevious

Navigation button for previous slide with accessibility features.

### CarouselNext

Navigation button for next slide with accessibility features.

## Usage Examples

### Basic Image Carousel

```tsx
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/data-display/carousel";

function ImageCarousel() {
  const images = [
    { src: "/image1.jpg", alt: "Description 1" },
    { src: "/image2.jpg", alt: "Description 2" },
    { src: "/image3.jpg", alt: "Description 3" },
  ];

  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

### Product Showcase

```tsx
function ProductCarousel() {
  const products = [
    { id: 1, name: "Product A", price: "$99", image: "/product-a.jpg" },
    { id: 2, name: "Product B", price: "$149", image: "/product-b.jpg" },
    { id: 3, name: "Product C", price: "$199", image: "/product-c.jpg" },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-sm"
    >
      <CarouselContent>
        {products.map((product) => (
          <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <div className="border rounded-lg p-4 text-center">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded mb-2"
                />
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-lg font-bold text-primary">
                  {product.price}
                </p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

### Vertical Carousel

```tsx
function VerticalCarousel() {
  return (
    <Carousel
      orientation="vertical"
      opts={{
        align: "start",
      }}
      className="w-full max-w-xs"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index} className="pt-1 md:basis-1/2">
            <div className="flex items-center justify-center p-6">
              <span className="text-3xl font-semibold">{index + 1}</span>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
```

### Carousel with API Control

```tsx
function ControlledCarousel() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="space-y-4">
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <div className="flex aspect-square items-center justify-center p-6">
                  <span className="text-4xl font-semibold">{index + 1}</span>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="py-2 text-center text-sm text-muted-foreground">
        Slide {current} of {count}
      </div>
    </div>
  );
}
```

## Configuration Options

### Embla Options

```tsx
<Carousel
  opts={{
    align: "start" | "center" | "end",
    loop: true,
    skipSnaps: false,
    dragFree: true,
    containScroll: "trimSnaps",
  }}
>
```

### Common Configurations

```tsx
// Auto-play carousel
<Carousel
  plugins={[Autoplay({ delay: 2000 })]}
  className="w-full max-w-xs"
>

// Multiple items per view
<CarouselItem className="md:basis-1/2 lg:basis-1/3">

// Responsive breakpoints
<CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
```

## Accessibility Features

- **Keyboard Navigation**: Arrow keys for navigation
- **ARIA Labels**: Proper labeling for screen readers
- **Focus Management**: Keyboard focus handling
- **Touch Support**: Mobile-friendly swipe gestures
- **Screen Reader**: Announces current slide information

## Best Practices

- Provide clear navigation controls
- Use appropriate slide indicators for longer carousels
- Ensure touch targets are large enough for mobile
- Test keyboard navigation thoroughly
- Consider auto-play timing for accessibility
- Provide pause controls for auto-playing carousels
- Use semantic HTML structure

## Common Use Cases

- Image galleries and portfolios
- Product showcases and catalogs
- Testimonials and reviews
- Feature highlights
- News and article previews
- Team member profiles
- Before/after comparisons
- Step-by-step tutorials
