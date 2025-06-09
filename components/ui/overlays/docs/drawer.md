# Drawer

A drawer component that slides in from the bottom of the screen, perfect for mobile interfaces and quick actions. Built on top of Vaul with custom styling and smooth animations.

## Features

- Slides in from bottom
- Touch/swipe gestures
- Backdrop scaling effect
- Drag handle indicator
- Smooth animations
- Mobile-first design
- Accessible by default
- Portal rendering

## Installation

```bash
npm install vaul
```

## Usage

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";

export function DrawerDemo() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Drawer</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## API Reference

### Drawer

The root component that manages the drawer state.

| Prop                    | Type                                            | Default | Description                                         |
| ----------------------- | ----------------------------------------------- | ------- | --------------------------------------------------- |
| `shouldScaleBackground` | `boolean`                                       | `true`  | Whether to scale the background when drawer is open |
| `snapPoints`            | `(number \| string)[]`                          | -       | Array of snap points for the drawer                 |
| `activeSnapPoint`       | `number \| string \| null`                      | -       | The active snap point                               |
| `setActiveSnapPoint`    | `(snapPoint: number \| string \| null) => void` | -       | Callback to set active snap point                   |
| `open`                  | `boolean`                                       | -       | The controlled open state                           |
| `onOpenChange`          | `(open: boolean) => void`                       | -       | Callback fired when the open state changes          |
| `closeThreshold`        | `number`                                        | `0.25`  | Threshold for closing the drawer                    |
| `scrollLockTimeout`     | `number`                                        | `100`   | Timeout for scroll lock                             |

### DrawerTrigger

The button that opens the drawer.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The trigger content                 |

### DrawerContent

The content container for the drawer.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The drawer content     |

### DrawerHeader

A container for the drawer header content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The header content     |

### DrawerTitle

The title of the drawer.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The title content      |

### DrawerDescription

A description for the drawer.

| Prop        | Type              | Default | Description             |
| ----------- | ----------------- | ------- | ----------------------- |
| `className` | `string`          | -       | Additional CSS classes  |
| `children`  | `React.ReactNode` | -       | The description content |

### DrawerFooter

A container for the drawer footer content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | The footer content     |

### DrawerClose

A button that closes the drawer.

| Prop       | Type              | Default | Description                         |
| ---------- | ----------------- | ------- | ----------------------------------- |
| `asChild`  | `boolean`         | `false` | Change the default rendered element |
| `children` | `React.ReactNode` | -       | The close button content            |

## Examples

### Mobile Menu Drawer

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";
import { Menu, Home, User, Settings, LogOut } from "lucide-react";

function MobileMenuDrawer() {
  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: User, label: "Profile", href: "/profile" },
    { icon: Settings, label: "Settings", href: "/settings" },
    { icon: LogOut, label: "Logout", href: "/logout" },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon">
          <Menu className="h-4 w-4" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Menu</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <DrawerClose key={item.label} asChild>
                  <a
                    href={item.href}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted"
                  >
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </a>
                </DrawerClose>
              ))}
            </nav>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Form Drawer

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function FormDrawer() {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button>Add Note</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Add New Note</DrawerTitle>
            <DrawerDescription>
              Create a new note to save your thoughts.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter note title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  placeholder="Write your note here..."
                  rows={4}
                />
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Save Note</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Snap Points Drawer

```tsx
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";

function SnapPointsDrawer() {
  const [snap, setSnap] = React.useState<number | string | null>(null);

  return (
    <Drawer
      snapPoints={["148px", "355px", 1]}
      activeSnapPoint={snap}
      setActiveSnapPoint={setSnap}
    >
      <DrawerTrigger asChild>
        <Button variant="outline">Open with Snap Points</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <div className="p-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Snap Points Demo</h3>
              <p className="text-sm text-muted-foreground">
                This drawer has multiple snap points. Drag to see different
                heights.
              </p>
              <div className="space-y-2">
                <p>Current snap point: {snap}</p>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSnap("148px")}
                  >
                    Small (148px)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSnap("355px")}
                  >
                    Medium (355px)
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSnap(1)}
                  >
                    Full Height
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Shopping Cart Drawer

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, Trash2 } from "lucide-react";

function ShoppingCartDrawer() {
  const [items, setItems] = React.useState([
    { id: 1, name: "Product 1", price: 29.99, quantity: 2 },
    { id: 2, name: "Product 2", price: 19.99, quantity: 1 },
  ]);

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const updateQuantity = (id: number, change: number) => {
    setItems(
      items
        .map((item) =>
          item.id === id
            ? { ...item, quantity: Math.max(0, item.quantity + change) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart ({items.length})
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Shopping Cart</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, -1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Checkout</Button>
            <DrawerClose asChild>
              <Button variant="outline">Continue Shopping</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

### Filter Drawer

```tsx
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/overlays/drawer";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Filter } from "lucide-react";

function FilterDrawer() {
  const [filters, setFilters] = React.useState({
    categories: [],
    priceRange: [],
    brands: [],
  });

  const categories = ["Electronics", "Clothing", "Books", "Home & Garden"];
  const priceRanges = ["Under $25", "$25-$50", "$50-$100", "Over $100"];
  const brands = ["Brand A", "Brand B", "Brand C", "Brand D"];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Filter Products</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox id={category} />
                    <Label htmlFor={category}>{category}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range} className="flex items-center space-x-2">
                    <Checkbox id={range} />
                    <Label htmlFor={range}>{range}</Label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-3">Brands</h3>
              <div className="space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox id={brand} />
                    <Label htmlFor={brand}>{brand}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button>Apply Filters</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
```

## Styling

The drawer components can be styled using Tailwind CSS classes. The default styles provide smooth animations and a mobile-first design.

```tsx
<DrawerContent className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
  <DrawerHeader className="border-b border-gray-200 dark:border-gray-700">
    <DrawerTitle className="text-xl font-bold">
      Custom Styled Drawer
    </DrawerTitle>
  </DrawerHeader>
</DrawerContent>
```

## Accessibility

- Focus management when drawer opens/closes
- Keyboard navigation support
- Screen reader compatible
- Proper ARIA attributes
- Touch/swipe gesture support
- Escape key to close

## Common Use Cases

- Mobile navigation menus
- Shopping cart interfaces
- Filter and sort options
- Quick action panels
- Form inputs on mobile
- Settings and preferences
- Contact information
- Social sharing options
