# Calendar Component

## Overview

The Calendar component is a flexible, accessible date picker built on top of `react-day-picker`. It provides a clean interface for date selection with full keyboard navigation, customizable styling, and comprehensive date handling capabilities.

## Features

- **Date Selection**: Single date, multiple dates, or date range selection
- **Keyboard Navigation**: Full keyboard accessibility with arrow keys
- **Customizable Styling**: Tailwind CSS classes with theme support
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: ARIA labels, screen reader support, and focus management
- **Flexible Configuration**: Extensive customization options through props

## Props Interface

```typescript
interface CalendarProps extends React.ComponentProps<typeof DayPicker> {
  className?: string; // Custom CSS classes
  classNames?: Partial<ClassNames>; // Custom class names for internal elements
  showOutsideDays?: boolean; // Show days from adjacent months (default: true)
  // ... all other DayPicker props are supported
}
```

## Usage Examples

### Basic Date Picker

```tsx
import { Calendar } from "@/components/ui/data-display/calendar";
import { useState } from "react";

function DatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
```

### Date Range Picker

```tsx
import { DateRange } from "react-day-picker";

function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>();

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
      numberOfMonths={2}
      className="rounded-md border"
    />
  );
}
```

### Multiple Date Selection

```tsx
function MultiDatePicker() {
  const [dates, setDates] = useState<Date[]>([]);

  return (
    <Calendar
      mode="multiple"
      selected={dates}
      onSelect={setDates}
      className="rounded-md border"
    />
  );
}
```

### Disabled Dates

```tsx
function RestrictedCalendar() {
  const [date, setDate] = useState<Date>();

  // Disable weekends
  const disableWeekends = (date: Date) => {
    return date.getDay() === 0 || date.getDay() === 6;
  };

  // Disable past dates
  const disablePastDates = (date: Date) => {
    return date < new Date();
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={[disableWeekends, disablePastDates]}
      className="rounded-md border"
    />
  );
}
```

### Custom Styling

```tsx
function CustomCalendar() {
  return (
    <Calendar
      mode="single"
      className="rounded-md border shadow-lg"
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-lg font-semibold",
        nav: "space-x-1 flex items-center",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "relative p-0 text-center text-sm focus-within:relative focus-within:z-20",
        day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
      }}
    />
  );
}
```

## Key Features

### Navigation

- **Month Navigation**: Previous/next month buttons
- **Year Navigation**: Click on month/year to navigate quickly
- **Keyboard Navigation**: Arrow keys, Page Up/Down, Home/End
- **Today Button**: Quick navigation to current date

### Selection Modes

- **Single**: Select one date
- **Multiple**: Select multiple individual dates
- **Range**: Select a date range
- **None**: Display-only calendar

### Date Constraints

- **Disabled Dates**: Prevent selection of specific dates
- **Min/Max Dates**: Set date boundaries
- **Custom Validators**: Complex date validation logic

## Styling System

### Default Classes

The component comes with comprehensive default styling:

```typescript
const defaultClassNames = {
  months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
  month: "space-y-4",
  caption: "flex justify-center pt-1 relative items-center",
  caption_label: "text-sm font-medium",
  nav: "space-x-1 flex items-center",
  nav_button: "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
  nav_button_previous: "absolute left-1",
  nav_button_next: "absolute right-1",
  table: "w-full border-collapse space-y-1",
  head_row: "flex",
  head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
  row: "flex w-full mt-2",
  cell: "h-9 w-9 text-center text-sm p-0 relative",
  day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
  day_range_end: "day-range-end",
  day_selected:
    "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
  day_today: "bg-accent text-accent-foreground",
  day_outside: "day-outside text-muted-foreground opacity-50",
  day_disabled: "text-muted-foreground opacity-50",
  day_range_middle:
    "aria-selected:bg-accent aria-selected:text-accent-foreground",
  day_hidden: "invisible",
};
```

### Theme Integration

- **Light/Dark Mode**: Automatic theme switching
- **CSS Variables**: Uses design system tokens
- **Consistent Colors**: Matches application theme

## Accessibility Features

### Keyboard Navigation

- **Arrow Keys**: Navigate between dates
- **Enter/Space**: Select date
- **Page Up/Down**: Navigate months
- **Home/End**: Go to start/end of week
- **Ctrl+Page Up/Down**: Navigate years

### Screen Reader Support

- **ARIA Labels**: Proper labeling for all elements
- **Role Attributes**: Correct semantic roles
- **Live Regions**: Announce changes to screen readers
- **Focus Management**: Logical focus flow

### Visual Accessibility

- **High Contrast**: Clear visual distinctions
- **Focus Indicators**: Visible focus states
- **Color Independence**: Not relying solely on color
- **Text Alternatives**: Proper text descriptions

## Advanced Configuration

### Custom Components

```tsx
<Calendar
  components={{
    IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
    IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
  }}
/>
```

### Localization

```tsx
import { es } from "date-fns/locale";

<Calendar
  locale={es}
  weekStartsOn={1} // Monday
/>;
```

### Custom Formatters

```tsx
<Calendar
  formatters={{
    formatCaption: (date, options) => {
      return format(date, "LLLL yyyy", { locale: options?.locale });
    },
  }}
/>
```

## Common Use Cases

- **Date Pickers**: Form input date selection
- **Event Calendars**: Display and select event dates
- **Booking Systems**: Available date selection
- **Date Range Filters**: Analytics and reporting
- **Scheduling**: Appointment and meeting planning

## Performance Considerations

- **Lazy Loading**: Only render visible months
- **Memoization**: Prevent unnecessary re-renders
- **Event Delegation**: Efficient event handling
- **Virtual Scrolling**: For large date ranges

## Dependencies

- **react-day-picker**: Core calendar functionality
- **date-fns**: Date manipulation utilities
- **lucide-react**: Navigation icons
- **Tailwind CSS**: Styling system
