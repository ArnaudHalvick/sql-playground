# SQL Playground

An interactive SQL learning platform built with Next.js and Supabase. Practice SQL queries against a real database with instant feedback.

## Features

- 🔍 Interactive SQL editor with syntax highlighting
- 📊 Real-time query execution and results display
- 📚 Curated exercises from beginner to advanced
- 📋 Sample database with realistic data
- 🎨 Clean, modern UI with dark mode support
- 📱 Responsive design for all devices

## Tech Stack

- **Frontend**: Next.js 13+, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: Supabase (PostgreSQL)
- **Editor**: CodeMirror
- **Icons**: Lucide React

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Connect to Supabase using the "Connect to Supabase" button
4. Start the development server: `npm run dev`

## Project Structure

```
├── app/                  # Next.js app directory
├── components/          
│   ├── ui/              # Reusable UI components
│   ├── theme-provider   # Dark mode provider
│   └── theme-toggle     # Theme toggle component
├── lib/                 # Utility functions and configurations
│   ├── exercises.ts     # SQL practice exercises
│   ├── schema.ts       # Database schema definition
│   ├── supabase.ts     # Supabase client setup
│   └── utils.ts        # Helper utilities
└── supabase/           
    └── migrations/      # Database migrations
```

## Development

The application uses a modern React stack with Next.js 13+ features:

- Server Components for improved performance
- Client Components where interactivity is needed
- Tailwind CSS for styling
- shadcn/ui for UI components
- CodeMirror for SQL editing
- Supabase for database operations

## Database Schema

The sample database includes the following tables:

- `users`: User information
- `products`: Product catalog
- `orders`: Order metadata
- `order_items`: Order line items
- `countries`: Country information
- `cities`: City information

See `/lib/schema.ts` for detailed schema information.

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT