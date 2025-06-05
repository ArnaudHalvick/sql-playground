# Components Directory

This directory contains all React components used in the application.

## Structure

### UI Components (`/ui`)
- `sql-editor.tsx`: CodeMirror-based SQL editor
- `data-table.tsx`: Results display component
- `schema-viewer.tsx`: Database schema browser
- `exercise-card.tsx`: Exercise selection cards
- Other shadcn/ui components

### Theme Components
- `theme-provider.tsx`: Context provider for theme management
- `theme-toggle.tsx`: Theme switching component

## Design Philosophy

Components follow these principles:
- Composition over inheritance
- Single responsibility
- Reusability
- Type safety with TypeScript
- Consistent styling with Tailwind CSS

## Usage

Components are imported using the `@/components` alias:

```typescript
import { SqlEditor } from '@/components/ui/sql-editor';
import { DataTable } from '@/components/ui/data-table';
```