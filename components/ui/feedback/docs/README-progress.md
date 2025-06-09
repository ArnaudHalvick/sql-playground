# Progress Component

## Overview

The Progress component displays the completion progress of a task, typically shown as a progress bar. Built on Radix UI primitives, it provides accessible progress indication with customizable styling and smooth animations.

## Features

- **Radix UI Foundation**: Built on accessible progress primitives
- **Smooth Animations**: Animated progress transitions
- **Accessibility**: Screen reader support with progress announcements
- **Customizable**: Flexible styling and theming
- **Value Control**: Precise progress value management
- **Responsive**: Adapts to container width

## Props Interface

```typescript
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number; // Progress value (0-100)
  className?: string;
}
```

## Usage Examples

### Basic Progress

```tsx
import { Progress } from "@/components/ui/feedback/progress";

function BasicProgress() {
  return <Progress value={50} className="w-full" />;
}
```

### Animated Progress

```tsx
function AnimatedProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500);
    return () => clearTimeout(timer);
  }, []);

  return <Progress value={progress} className="w-full" />;
}
```

### File Upload Progress

```tsx
function FileUploadProgress() {
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileUpload = async (file: File) => {
    // Simulate upload progress
    for (let i = 0; i <= 100; i += 10) {
      setUploadProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 200));
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading file...</span>
        <span>{uploadProgress}%</span>
      </div>
      <Progress value={uploadProgress} className="w-full" />
    </div>
  );
}
```

### Multi-step Progress

```tsx
function MultiStepProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}%</span>
      </div>
      <Progress value={progress} className="w-full" />

      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Loading Progress

```tsx
function LoadingProgress() {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 300);
  };

  return (
    <div className="space-y-4">
      <button onClick={startLoading} disabled={isLoading}>
        {isLoading ? "Loading..." : "Start Loading"}
      </button>

      {isLoading && (
        <div className="space-y-2">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-muted-foreground">
            Loading... {Math.round(progress)}%
          </p>
        </div>
      )}
    </div>
  );
}
```

### Progress with Status

```tsx
function ProgressWithStatus() {
  const [progress, setProgress] = useState(0);

  const getStatus = (value: number) => {
    if (value === 0)
      return { text: "Not started", color: "text-muted-foreground" };
    if (value < 50) return { text: "In progress", color: "text-blue-600" };
    if (value < 100) return { text: "Almost done", color: "text-orange-600" };
    return { text: "Completed", color: "text-green-600" };
  };

  const status = getStatus(progress);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className={`text-sm font-medium ${status.color}`}>
          {status.text}
        </span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />

      <div className="flex space-x-2">
        <button onClick={() => setProgress(0)}>Reset</button>
        <button onClick={() => setProgress(25)}>25%</button>
        <button onClick={() => setProgress(50)}>50%</button>
        <button onClick={() => setProgress(75)}>75%</button>
        <button onClick={() => setProgress(100)}>100%</button>
      </div>
    </div>
  );
}
```

### Circular Progress (Custom)

```tsx
function CircularProgress({
  value = 0,
  size = 120,
}: {
  value?: number;
  size?: number;
}) {
  const radius = (size - 8) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${circumference} ${circumference}`;
  const strokeDashoffset = circumference - (value / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          className="text-muted"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth="4"
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className="text-primary transition-all duration-300 ease-in-out"
        />
      </svg>
      <span className="absolute text-sm font-medium">{Math.round(value)}%</span>
    </div>
  );
}
```

## Styling

The Progress component uses CSS transforms for smooth animations:

```css
/* Progress bar styling */
.progress-indicator {
  transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
  transform: translateX(-100%);
}

/* When progress value is set */
.progress-indicator[data-value] {
  transform: translateX(-${100 - value}%);
}
```

## Accessibility Features

- **ARIA Attributes**: Proper `role="progressbar"` and value attributes
- **Screen Reader**: Progress value announcements
- **Keyboard Navigation**: Focusable when interactive
- **Value Range**: Supports min/max value attributes

## Best Practices

- Always provide visual progress percentage when possible
- Use smooth animations for better user experience
- Provide clear labels and context for the progress
- Consider indeterminate progress for unknown durations
- Test with screen readers for accessibility
- Use appropriate colors for different progress states

## Common Use Cases

- File upload/download progress
- Form completion progress
- Loading states and data fetching
- Multi-step wizard progress
- Task completion tracking
- Installation or setup progress
- Data processing status
- Goal achievement tracking
