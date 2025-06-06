# Progress Component

## Overview

The Progress component is a visual indicator that shows the completion progress of a task or process. Built on Radix UI primitives, it provides an accessible and customizable progress bar with smooth animations and proper ARIA attributes.

## Features

- **Accessible**: Built with Radix UI for screen reader support
- **Smooth Animations**: CSS transitions for progress changes
- **Customizable**: Flexible styling through className props
- **Responsive**: Adapts to container width
- **Value-based**: Accepts percentage values (0-100)
- **Theme Integration**: Works with light and dark themes

## Props Interface

```typescript
interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  value?: number; // Progress value (0-100)
  className?: string; // Custom CSS classes
  // ... all other Radix Progress props
}
```

## Usage Examples

### Basic Progress Bar

```tsx
import { Progress } from "@/components/ui/feedback/progress";

function BasicProgress() {
  return <Progress value={60} className="w-full" />;
}
```

### File Upload Progress

```tsx
function FileUploadProgress() {
  const [progress, setProgress] = useState(0);

  const simulateUpload = () => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Uploading file...</span>
        <span>{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
      <button
        onClick={simulateUpload}
        className="px-4 py-2 bg-primary text-primary-foreground rounded"
      >
        Start Upload
      </button>
    </div>
  );
}
```

### Multi-step Form Progress

```tsx
function FormProgress() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="space-y-4">
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>
          Step {currentStep} of {totalSteps}
        </span>
        <span>{Math.round(progress)}% Complete</span>
      </div>
      <Progress value={progress} className="w-full" />
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(totalSteps, currentStep + 1))}
          disabled={currentStep === totalSteps}
          className="px-4 py-2 bg-primary text-primary-foreground rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
```

### Loading Progress with Text

```tsx
function LoadingProgress() {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState("Initializing...");

  useEffect(() => {
    const steps = [
      { progress: 20, status: "Loading configuration..." },
      { progress: 40, status: "Connecting to server..." },
      { progress: 60, status: "Fetching data..." },
      { progress: 80, status: "Processing results..." },
      { progress: 100, status: "Complete!" },
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setProgress(steps[currentStep].progress);
        setStatus(steps[currentStep].status);
        currentStep++;
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium">{status}</span>
        <span className="text-sm text-muted-foreground">{progress}%</span>
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
```

### Skill Level Indicators

```tsx
function SkillProgress() {
  const skills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Node.js", level: 75 },
    { name: "Python", level: 60 },
    { name: "Docker", level: 45 },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Skills</h3>
      {skills.map((skill) => (
        <div key={skill.name} className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="font-medium">{skill.name}</span>
            <span className="text-muted-foreground">{skill.level}%</span>
          </div>
          <Progress value={skill.level} className="w-full" />
        </div>
      ))}
    </div>
  );
}
```

### Custom Styled Progress

```tsx
function CustomProgress() {
  return (
    <div className="space-y-4">
      {/* Large progress bar */}
      <Progress value={75} className="w-full h-6 bg-gray-200" />

      {/* Colored progress bar */}
      <Progress value={60} className="w-full [&>div]:bg-green-500" />

      {/* Rounded progress bar */}
      <Progress value={45} className="w-full rounded-full h-2" />

      {/* Striped progress bar */}
      <Progress
        value={80}
        className="w-full [&>div]:bg-gradient-to-r [&>div]:from-blue-500 [&>div]:to-purple-500"
      />
    </div>
  );
}
```

## Styling Features

### Default Styling

- **Height**: 16px (h-4) default height
- **Background**: Secondary color for track
- **Indicator**: Primary color for progress fill
- **Border Radius**: Rounded corners
- **Transitions**: Smooth progress animations

### Customization Options

```tsx
// Custom height
<Progress value={50} className="h-2" />      // Thin
<Progress value={50} className="h-6" />      // Thick

// Custom colors
<Progress value={50} className="bg-gray-100 [&>div]:bg-red-500" />

// Custom width
<Progress value={50} className="w-64" />     // Fixed width
<Progress value={50} className="w-full" />   // Full width
```

### Animation Control

The progress indicator uses CSS transforms for smooth animations:

```css
transform: translateX(-${100 - (value || 0)}%);
```

## Accessibility Features

### ARIA Support

- **Role**: Proper progressbar role from Radix UI
- **Value Attributes**: aria-valuenow, aria-valuemin, aria-valuemax
- **Label Support**: Can be labeled with aria-label or aria-labelledby

### Screen Reader Support

- **Progress Announcement**: Screen readers announce progress changes
- **Value Communication**: Current progress value is communicated
- **Context**: Can be associated with descriptive text

### Keyboard Navigation

- **Focus Management**: Proper focus handling
- **No Interaction**: Progress bars are typically not interactive

## Advanced Usage

### Indeterminate Progress

```tsx
function IndeterminateProgress() {
  return (
    <div className="space-y-2">
      <span className="text-sm">Loading...</span>
      <div className="w-full h-4 bg-secondary rounded-full overflow-hidden">
        <div className="h-full bg-primary animate-pulse" />
      </div>
    </div>
  );
}
```

### Segmented Progress

```tsx
function SegmentedProgress() {
  const segments = [
    { completed: true, label: "Step 1" },
    { completed: true, label: "Step 2" },
    { completed: false, label: "Step 3" },
    { completed: false, label: "Step 4" },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs text-muted-foreground">
        {segments.map((segment, index) => (
          <span key={index} className={segment.completed ? "text-primary" : ""}>
            {segment.label}
          </span>
        ))}
      </div>
      <div className="flex gap-1">
        {segments.map((segment, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded ${
              segment.completed ? "bg-primary" : "bg-secondary"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
```

### Progress with Buffer

```tsx
function BufferedProgress() {
  const [progress, setProgress] = useState(30);
  const [buffer, setBuffer] = useState(60);

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Video Progress</span>
        <span>
          {progress}% / {buffer}% buffered
        </span>
      </div>
      <div className="relative w-full h-4 bg-secondary rounded-full overflow-hidden">
        {/* Buffer indicator */}
        <div
          className="absolute inset-0 bg-secondary-foreground/20 transition-all"
          style={{ width: `${buffer}%` }}
        />
        {/* Progress indicator */}
        <div
          className="absolute inset-0 bg-primary transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
```

## Common Patterns

### Progress with Cancel

```tsx
function CancellableProgress() {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const startProgress = () => {
    setIsRunning(true);
    setProgress(0);
    // Simulate progress
  };

  const cancelProgress = () => {
    setIsRunning(false);
    setProgress(0);
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-sm">Processing...</span>
        {isRunning && (
          <button onClick={cancelProgress} className="text-sm text-destructive">
            Cancel
          </button>
        )}
      </div>
      <Progress value={progress} className="w-full" />
    </div>
  );
}
```

## Use Cases

- **File Uploads**: Show upload progress
- **Form Completion**: Multi-step form progress
- **Loading States**: Data fetching progress
- **Skill Levels**: Display proficiency levels
- **Task Completion**: Project or task progress
- **Media Playback**: Video/audio progress
- **Installation Progress**: Software installation
- **Data Processing**: Batch operation progress

## Best Practices

- Always provide context for what the progress represents
- Include percentage or step information when helpful
- Use appropriate colors for different types of progress
- Ensure sufficient contrast for accessibility
- Consider animation performance for frequent updates
- Provide cancel options for long-running operations
- Use indeterminate progress for unknown durations
- Test with screen readers for accessibility

## Dependencies

- **@radix-ui/react-progress**: Core progress functionality
- **Tailwind CSS**: Styling system
- **React**: Component framework
