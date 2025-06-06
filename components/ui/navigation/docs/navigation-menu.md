# Navigation Menu

A collection of links for navigating websites.

## Features

- Horizontal navigation with dropdown support
- Keyboard navigation
- Smooth animations and transitions
- Responsive design
- Built on top of Radix UI Navigation Menu primitive
- Accessible by default
- Customizable styling

## Installation

This component is built using Radix UI and class-variance-authority. Make sure you have the required dependencies:

```bash
npm install @radix-ui/react-navigation-menu class-variance-authority lucide-react
```

## Usage

### Basic Example

```tsx
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation/navigation-menu";

export function NavigationMenuDemo() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      shadcn/ui
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautifully designed components built with Radix UI and
                      Tailwind CSS.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/docs" title="Introduction">
                Re-usable components built using Radix UI and Tailwind CSS.
              </ListItem>
              <ListItem href="/docs/installation" title="Installation">
                How to install dependencies and structure your app.
              </ListItem>
              <ListItem href="/docs/primitives/typography" title="Typography">
                Styles for headings, paragraphs, lists...etc
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/docs">Documentation</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
```

### Simple Navigation

```tsx
function SimpleNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="/">Home</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about">About</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/services">Services</NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### With Dropdown Menus

```tsx
function NavigationWithDropdowns() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Products</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/web-design"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Web Design
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Custom website design and development services.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/mobile-apps"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Mobile Apps
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      iOS and Android application development.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/products/consulting"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Consulting
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Technical consulting and strategy services.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/blog"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Blog</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Latest articles and insights.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/documentation"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Documentation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Comprehensive guides and API reference.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/contact">Contact</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## API Reference

### NavigationMenu

The root navigation menu component.

| Prop        | Type              | Default | Description             |
| ----------- | ----------------- | ------- | ----------------------- |
| `className` | `string`          | -       | Additional CSS classes  |
| `children`  | `React.ReactNode` | -       | Navigation menu content |

### NavigationMenuList

Container for navigation menu items.

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### NavigationMenuItem

Individual navigation menu item.

| Prop       | Type              | Default | Description       |
| ---------- | ----------------- | ------- | ----------------- |
| `children` | `React.ReactNode` | -       | Menu item content |

### NavigationMenuTrigger

Button that triggers a dropdown menu.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Trigger content        |

### NavigationMenuContent

Container for dropdown menu content.

| Prop        | Type              | Default | Description            |
| ----------- | ----------------- | ------- | ---------------------- |
| `className` | `string`          | -       | Additional CSS classes |
| `children`  | `React.ReactNode` | -       | Dropdown content       |

### NavigationMenuLink

Navigation link component.

| Prop        | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `asChild`   | `boolean` | `false` | Render as child component |
| `href`      | `string`  | -       | Link destination          |
| `className` | `string`  | -       | Additional CSS classes    |

### NavigationMenuViewport

Viewport for dropdown content (automatically included).

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

### NavigationMenuIndicator

Visual indicator for active menu item (automatically included).

| Prop        | Type     | Default | Description            |
| ----------- | -------- | ------- | ---------------------- |
| `className` | `string` | -       | Additional CSS classes |

## Examples

### E-commerce Navigation

```tsx
function EcommerceNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] md:grid-cols-2 lg:w-[500px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/category/electronics"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Electronics
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Smartphones, laptops, and gadgets.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/category/clothing"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Clothing
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Fashion and apparel for all ages.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/category/home"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Home & Garden
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Furniture, decor, and garden supplies.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/category/sports"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Sports
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Equipment and gear for all sports.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/deals">Deals</NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/new-arrivals">
            New Arrivals
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Support</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[300px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/help"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Help Center
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Find answers to common questions.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/contact"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Contact Us
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Get in touch with our support team.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

### Documentation Navigation

```tsx
function DocsNavigation() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting Started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/introduction"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Introduction
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Learn about the basics and core concepts.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/installation"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Installation
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Step-by-step installation guide.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/configuration"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Configuration
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Configure your project settings.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>Components</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/components/button"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Button
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Clickable button component with variants.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/components/input"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Input
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Text input with validation support.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/components/card"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">Card</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Flexible content container component.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <li>
                <NavigationMenuLink asChild>
                  <a
                    href="/docs/components/dialog"
                    className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  >
                    <div className="text-sm font-medium leading-none">
                      Dialog
                    </div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                      Modal dialog for important interactions.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/docs/api">
            API Reference
          </NavigationMenuLink>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuLink href="/examples">Examples</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
```

## Styling

The component uses Tailwind CSS classes and can be customized:

```tsx
// Custom styling
<NavigationMenu className="border-2 border-blue-200 rounded-xl">
  <NavigationMenuList className="space-x-4">
    <NavigationMenuItem>
      <NavigationMenuTrigger className="text-blue-600 hover:bg-blue-50">
        Custom Menu
      </NavigationMenuTrigger>
      <NavigationMenuContent className="border-blue-200">
        <div className="p-4 bg-blue-50">Custom content</div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  </NavigationMenuList>
</NavigationMenu>
```

## Accessibility

- Full keyboard navigation (Arrow keys, Enter, Escape, Tab)
- Screen reader support with proper ARIA attributes
- Focus management and visual indicators
- Supports assistive technologies
- Follows WAI-ARIA Navigation Menu pattern

## Use Cases

- **Website navigation**: Primary site navigation
- **Documentation sites**: Organized content navigation
- **E-commerce**: Product category navigation
- **SaaS applications**: Feature and section navigation
- **Marketing sites**: Service and resource navigation
- **Admin panels**: Module and page navigation
