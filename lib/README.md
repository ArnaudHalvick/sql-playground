# Library Directory

This directory contains core utilities, configurations, and data structures.

## Files

### `exercises.ts`
- Defines SQL practice exercises
- Includes difficulty levels
- Contains sample queries and descriptions

### `schema.ts`
- Database schema definition
- Table and column specifications
- Relationship definitions

### `supabase.ts`
- Supabase client configuration
- Query execution utilities
- Error handling

### `utils.ts`
- Helper functions
- Type definitions
- Utility constants

## Usage

Import utilities using the `@/lib` alias:

```typescript
import { executeQuery } from '@/lib/supabase';
import { databaseSchema } from '@/lib/schema';
import { exercises } from '@/lib/exercises';
```