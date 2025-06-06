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

### Testimonial Carousel

```tsx
function TestimonialCarousel() {
  const testimonials = [
    {
      quote: "This product changed my life!",
      author: "John Doe",
      role: "CEO, Company A",
    },
    {
      quote: "Incredible experience and support.",
      author: "Jane Smith",
      role: "Designer, Company B",
    },
    {
      quote: "Highly recommend to everyone.",
      author: "Bob Johnson",
      role: "Developer, Company C",
    },
  ];

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full max-w-lg mx-auto"
    >
      <CarouselContent>
        {testimonials.map((testimonial, index) => (
          <CarouselItem key={index}>
            <div className="p-6 text-center">
              <blockquote className="text-lg italic mb-4">
                "{testimonial.quote}"
              </blockquote>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">
                  {testimonial.role}
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
          <CarouselItem key={index} className="pt-1 md:basis-1/3">
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

## Advanced Configuration

### Custom Options

```tsx
<Carousel
  opts={{
    align: "start",        // Alignment of slides
    loop: true,           // Infinite loop
    skipSnaps: false,     // Skip snap points
    dragFree: true,       // Free drag without snapping
    containScroll: "trimSnaps", // Contain scroll behavior
  }}
>
```

### Plugin Integration

```tsx
import Autoplay from "embla-carousel-autoplay";

function AutoplayCarousel() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full max-w-xs"
    >
      {/* Carousel content */}
    </Carousel>
  );
}
```

### API Access

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
    <div>
      <Carousel setApi={setApi} className="w-full max-w-xs">
        <CarouselContent>{/* Items */}</CarouselContent>
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

## Responsive Behavior

### Responsive Item Sizing

```tsx
<CarouselItem className="basis-full md:basis-1/2 lg:basis-1/3">
  {/* Content adapts to screen size */}
</CarouselItem>
```

### Mobile Optimization

- **Touch Gestures**: Native swipe support
- **Momentum Scrolling**: Smooth touch interactions
- **Responsive Navigation**: Buttons adapt to screen size
- **Performance**: Optimized for mobile devices

## Styling Features

### Default Styling

- **Navigation Buttons**: Positioned absolutely with proper spacing
- **Smooth Transitions**: CSS transitions for interactions
- **Focus States**: Keyboard navigation indicators
- **Responsive Design**: Adapts to container size

### Customization Options

```tsx
// Custom navigation button styling
<CarouselPrevious className="left-2 bg-primary text-primary-foreground" />
<CarouselNext className="right-2 bg-primary text-primary-foreground" />

// Custom item spacing
<CarouselContent className="-ml-2">
  <CarouselItem className="pl-2">
    {/* Content */}
  </CarouselItem>
</CarouselContent>
```

## Accessibility Features

### Keyboard Navigation

- **Arrow Keys**: Navigate between slides
- **Tab Navigation**: Focus management for interactive elements
- **Enter/Space**: Activate navigation buttons

### Screen Reader Support

- **ARIA Labels**: Proper labeling for navigation
- **Role Attributes**: Semantic carousel structure
- **Live Regions**: Announce slide changes
- **Focus Management**: Logical focus flow

### Visual Accessibility

- **High Contrast**: Clear button visibility
- **Focus Indicators**: Visible focus states
- **Motion Preferences**: Respects reduced motion settings

## Performance Considerations

### Optimization Features

- **Lazy Loading**: Only render visible slides
- **Virtual Scrolling**: For large datasets
- **Efficient Re-renders**: Minimal DOM updates
- **Memory Management**: Proper cleanup on unmount

### Best Practices

- Use `key` props for dynamic content
- Implement image lazy loading
- Consider virtualization for many items
- Optimize images for web

## Common Use Cases

- **Image Galleries**: Photo slideshows
- **Product Showcases**: E-commerce carousels
- **Testimonials**: Customer review displays
- **Feature Highlights**: Product feature tours
- **Content Sliders**: Blog post previews
- **Media Players**: Video/audio playlists

## Dependencies

- **embla-carousel-react**: Core carousel functionality
- **lucide-react**: Navigation icons
- **React**: Component framework
- **Tailwind CSS**: Styling system
