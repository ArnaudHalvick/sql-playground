# Calendar Component

## Overview

The Calendar component provides a flexible date picker and calendar interface built on React DayPicker. It offers date selection, navigation, and customization options with full accessibility support and responsive design.

## Features

- **React DayPicker**: Built on the powerful React DayPicker library
- **Date Selection**: Single and multiple date selection modes
- **Navigation**: Month and year navigation controls
- **Accessibility**: Full keyboard navigation and screen reader support
- **Customizable**: Flexible styling and behavior options
- **Responsive**: Mobile-friendly touch interactions
- **Internationalization**: Multi-language support

## Props Interface

```typescript
interface CalendarProps {
  mode?: "single" | "multiple" | "range";
  selected?: Date | Date[] | DateRange;
  onSelect?: (date: Date | Date[] | DateRange | undefined) => void;
  disabled?: (date: Date) => boolean;
  className?: string;
  // ... other React DayPicker props
}
```

## Usage Examples

### Basic Calendar

```tsx
import { Calendar } from "@/components/ui/data-display/calendar";
import { useState } from "react";

function BasicCalendar() {
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

### Date Range Selection

```tsx
import { DateRange } from "react-day-picker";

function DateRangeCalendar() {
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
function MultipleDateCalendar() {
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

### Calendar with Disabled Dates

```tsx
function CalendarWithDisabledDates() {
  const [date, setDate] = useState<Date>();

  const disabledDays = (date: Date) => {
    // Disable weekends
    return date.getDay() === 0 || date.getDay() === 6;
  };

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={disabledDays}
      className="rounded-md border"
    />
  );
}
```

### Calendar with Min/Max Dates

```tsx
function CalendarWithLimits() {
  const [date, setDate] = useState<Date>();
  const today = new Date();
  const oneMonthFromNow = new Date(
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate()
  );

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      disabled={(date) => date < today || date > oneMonthFromNow}
      className="rounded-md border"
    />
  );
}
```

### Calendar in a Popover

```tsx
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/overlays/popover";
import { Button } from "@/components/ui/inputs/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

function CalendarPopover() {
  const [date, setDate] = useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
```

### Event Calendar

```tsx
function EventCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>();

  const events = [
    { date: new Date(2024, 0, 15), title: "Team Meeting" },
    { date: new Date(2024, 0, 20), title: "Project Deadline" },
    { date: new Date(2024, 0, 25), title: "Client Call" },
  ];

  const hasEvent = (date: Date) => {
    return events.some(
      (event) => event.date.toDateString() === date.toDateString()
    );
  };

  return (
    <div className="space-y-4">
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        modifiers={{
          hasEvent: (date) => hasEvent(date),
        }}
        modifiersStyles={{
          hasEvent: { backgroundColor: "hsl(var(--primary))", color: "white" },
        }}
        className="rounded-md border"
      />

      {selectedDate && (
        <div className="p-4 border rounded-md">
          <h3 className="font-semibold">
            {format(selectedDate, "MMMM d, yyyy")}
          </h3>
          {events
            .filter(
              (event) =>
                event.date.toDateString() === selectedDate.toDateString()
            )
            .map((event, index) => (
              <p key={index} className="text-sm text-muted-foreground">
                {event.title}
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
```

## Configuration Options

### Selection Modes

- **single**: Select one date
- **multiple**: Select multiple dates
- **range**: Select a date range

### Common Props

```tsx
<Calendar
  mode="single"
  numberOfMonths={2} // Show multiple months
  showOutsideDays={true} // Show days from adjacent months
  fixedWeeks={true} // Always show 6 weeks
  weekStartsOn={1} // Start week on Monday (0 = Sunday)
  disabled={(date) => date < new Date()} // Disable past dates
  modifiers={{
    // Custom day modifiers
    weekend: (date) => date.getDay() === 0 || date.getDay() === 6,
  }}
/>
```

## Styling

The Calendar component uses CSS classes for styling:

```css
/* Custom day styling */
.rdp-day_selected {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.rdp-day_today {
  font-weight: bold;
  color: hsl(var(--accent-foreground));
}

.rdp-day_disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
```

## Accessibility Features

- **Keyboard Navigation**: Arrow keys for date navigation
- **Screen Reader**: Proper ARIA labels and announcements
- **Focus Management**: Clear focus indicators
- **Date Announcements**: Selected dates are announced
- **Semantic Markup**: Proper table structure for calendar grid

## Best Practices

- Provide clear visual feedback for selected dates
- Use appropriate date ranges and constraints
- Consider time zones for date handling
- Test keyboard navigation thoroughly
- Provide context for disabled dates
- Use consistent date formatting
- Consider mobile touch targets

## Common Use Cases

- Date pickers for forms
- Event scheduling interfaces
- Booking and reservation systems
- Date range filters
- Availability calendars
- Deadline and milestone tracking
- Holiday and vacation planners
- Appointment scheduling
