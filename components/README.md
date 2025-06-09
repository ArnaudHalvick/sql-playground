# Components Directory

This directory contains all React components used in the SQL Playground application, organized by category and functionality.

## Structure

### UI Components (`/ui`)

#### Custom Components (`/ui/custom`)

Application-specific components for the SQL playground:

- **`sql-editor.tsx`**: CodeMirror-based SQL editor with syntax highlighting, theme support, and execution controls
- **`schema-viewer.tsx`**: Database schema browser for exploring table structures
- **`exercise-card.tsx`**: Interactive cards for SQL exercise selection
- **`data-table.tsx`**: Results display component for query outputs

#### Data Display (`/ui/data-display`)

Components for presenting and visualizing data:

- **`table.tsx`**: Semantic HTML table components with responsive design and accessibility
- **`data-table.tsx`**: Advanced data table with sorting, filtering, and pagination
- **`calendar.tsx`**: Date picker and calendar component
- **`chart.tsx`**: Chart and data visualization components
- **`carousel.tsx`**: Image and content carousel with navigation

#### Forms (`/ui/forms`)

Form controls and validation components:

- **`form.tsx`**: React Hook Form integration with validation and error handling
- **`input.tsx`**: Text input with validation states and accessibility
- **`textarea.tsx`**: Multi-line text input component
- **`select.tsx`**: Dropdown selection component with search
- **`checkbox.tsx`**: Checkbox input with indeterminate state
- **`radio-group.tsx`**: Radio button group component
- **`switch.tsx`**: Toggle switch component
- **`slider.tsx`**: Range slider input
- **`input-otp.tsx`**: One-time password input component
- **`label.tsx`**: Form label with proper associations

#### Inputs (`/ui/inputs`)

Interactive input components:

- **`button.tsx`**: Versatile button with multiple variants, sizes, and loading states
- **`toggle.tsx`**: Toggle button component
- **`toggle-group.tsx`**: Group of toggle buttons
- **`avatar.tsx`**: User avatar component with fallback support

#### Navigation (`/ui/navigation`)

Navigation and routing components:

- **`tabs.tsx`**: Tabbed interface with keyboard navigation
- **`breadcrumb.tsx`**: Breadcrumb navigation component
- **`pagination.tsx`**: Page navigation with customizable controls
- **`navigation-menu.tsx`**: Hierarchical navigation menu
- **`menubar.tsx`**: Menu bar with dropdown menus
- **`command.tsx`**: Command palette and search interface

#### Layout (`/ui/layout`)

Layout and structural components:

- **`card.tsx`**: Content container with header, body, and footer
- **`separator.tsx`**: Visual divider component
- **`accordion.tsx`**: Collapsible content sections
- **`collapsible.tsx`**: Simple collapsible content
- **`scroll-area.tsx`**: Custom scrollable area
- **`resizable.tsx`**: Resizable panels and layouts
- **`aspect-ratio.tsx`**: Aspect ratio container

#### Overlays (`/ui/overlays`)

Modal and overlay components:

- **`dialog.tsx`**: Modal dialog with backdrop and focus management
- **`sheet.tsx`**: Slide-out panel component
- **`popover.tsx`**: Floating content container
- **`tooltip.tsx`**: Contextual help tooltips
- **`hover-card.tsx`**: Content preview on hover
- **`dropdown-menu.tsx`**: Dropdown menu with keyboard navigation
- **`context-menu.tsx`**: Right-click context menu
- **`drawer.tsx`**: Mobile-friendly drawer component

#### Feedback (`/ui/feedback`)

User feedback and status components:

- **`alert.tsx`**: Alert messages with different severity levels
- **`alert-dialog.tsx`**: Confirmation and alert dialogs
- **`toast.tsx`**: Toast notification system
- **`toaster.tsx`**: Toast container and provider
- **`sonner.tsx`**: Advanced toast notifications
- **`progress.tsx`**: Progress indicators and loading bars
- **`skeleton.tsx`**: Loading placeholder components
- **`badge.tsx`**: Status badges and labels

### Theme Components

Theme management and customization:

- **`theme-provider.tsx`**: Context provider for theme management using next-themes
- **`theme-toggle.tsx`**: Theme switching component with light/dark/system modes

## Design Philosophy

Components follow these principles:

- **Composition over inheritance**: Components are designed to be composed together
- **Single responsibility**: Each component has a focused, well-defined purpose
- **Reusability**: Components are generic and reusable across different contexts
- **Type safety**: Full TypeScript support with proper type definitions
- **Accessibility**: WCAG compliant with proper ARIA attributes and keyboard navigation
- **Consistent styling**: Unified design system using Tailwind CSS and CSS variables
- **Theme support**: Light and dark mode support throughout all components

## Usage

Components are imported using the `@/components` alias with organized paths:

```typescript
// Custom components
import { SqlEditor } from "@/components/ui/custom/sql-editor";
import { SchemaViewer } from "@/components/ui/custom/schema-viewer";

// Form components
import { Button } from "@/components/ui/inputs/button";
import { Input } from "@/components/ui/forms/input";
import { Form, FormField, FormItem } from "@/components/ui/forms/form";

// Layout components
import { Card, CardHeader, CardContent } from "@/components/ui/layout/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/navigation/tabs";

// Data display
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/ui/data-display/table";

// Overlays
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/overlays/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/overlays/tooltip";

// Theme components
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "@/components/theme-toggle";
```

## Key Features

### Accessibility

- Proper ARIA attributes and roles
- Keyboard navigation support
- Screen reader compatibility
- Focus management
- Color contrast compliance

### Theming

- CSS custom properties for consistent theming
- Light and dark mode support
- System preference detection
- Smooth theme transitions
- Theme-aware component variants

### Performance

- Tree-shakeable imports
- Optimized bundle sizes
- Lazy loading support
- Minimal runtime overhead
- Efficient re-rendering

### Developer Experience

- Full TypeScript support
- Comprehensive documentation
- Consistent API patterns
- Helpful error messages
- IntelliSense support

## Component Categories

### Interactive Components

Components that respond to user input: buttons, forms, toggles, sliders

### Display Components

Components for showing data: tables, charts, cards, badges

### Navigation Components

Components for moving through the application: tabs, breadcrumbs, menus

### Feedback Components

Components for user feedback: alerts, toasts, progress indicators

### Layout Components

Components for structuring content: cards, separators, grids

### Overlay Components

Components that appear above other content: dialogs, tooltips, dropdowns

## Best Practices

1. **Import only what you need** to keep bundle sizes small
2. **Use TypeScript** for better development experience and type safety
3. **Follow accessibility guidelines** when composing components
4. **Leverage theme variables** for consistent styling
5. **Test components** in both light and dark themes
6. **Use semantic HTML** elements when possible
7. **Handle loading and error states** appropriately
8. **Provide meaningful labels** and descriptions for screen readers
