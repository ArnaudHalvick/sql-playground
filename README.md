# SQL Playground

An interactive SQL learning platform built with Next.js and Supabase. Practice SQL queries against a real database with instant feedback.

## Features

- 🔍 Interactive SQL editor with syntax highlighting
- 📊 Real-time query execution and results display
- 📚 Curated exercises from beginner to advanced
- 📋 Sample database with realistic data
- 🎨 Clean, modern UI with dark mode support
- 📱 Responsive design for all devices
- 🐛 **NEW: Challenge Mode** - Practice data quality validation with intentional errors
- ⚙️ **NEW: Configurable Error Injection** - Control data quality issues for advanced practice

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

## Database Setup Options

### Standard Datasets

```bash
# Basic setup with clean data
npm run db:setup-small      # 50 users, 100 orders
npm run db:setup-medium     # 200 users, 500 orders
npm run db:setup-large      # 1000 users, 2000 orders
npm run db:setup-realistic  # 500 users, 1500 orders
```

### Challenge Mode (Data Quality Issues)

Perfect for practicing data validation and quality audits:

```bash
# Light errors (2-5% error rates)
npm run db:challenge-light

# Medium errors (5-15% error rates)
npm run db:challenge-medium

# Heavy errors (10-25% error rates)
npm run db:challenge-heavy

# Custom error rate (e.g., 12% base rate)
npm run db:challenge-custom 12
```

### Via Web Interface

1. Click "Setup Database" in the app
2. Choose from multiple configurations including "Challenge Mode"
3. Challenge Mode includes intentional data quality issues for practice

## Challenge Mode Features

The Challenge Mode introduces realistic data quality issues that you'll encounter in real-world scenarios:

### Email Validation Issues

- Missing @ symbols
- Invalid domain extensions
- Double @ symbols
- Trailing dots

### Delivery Date Inconsistencies

- Delivered orders missing delivery dates
- Pending orders missing estimated delivery
- Cancelled orders with delivery information

### Pricing Anomalies

- Negative prices
- Zero prices
- Excessively high prices (>$10,000)

### Location Relationship Errors

- Users assigned to cities that don't match their country

### Quantity Validation Issues

- Zero quantities in order items
- Negative quantities

## Example Challenge Queries

### Find Invalid Emails

```sql
SELECT id, first_name, last_name, email
FROM users
WHERE email NOT LIKE '%@%'
   OR email NOT LIKE '%.com'
   AND email NOT LIKE '%.net'
   AND email NOT LIKE '%.org';
```

### Delivery Inconsistencies

```sql
-- Orders marked delivered but missing delivery date
SELECT id, user_id, status, order_date, delivery_date
FROM orders
WHERE status = 'delivered' AND delivery_date IS NULL;
```

### Pricing Issues

```sql
SELECT id, name, price,
  CASE
    WHEN price < 0 THEN 'Negative price'
    WHEN price = 0 THEN 'Zero price'
    WHEN price > 10000 THEN 'Price too high'
  END as issue
FROM products
WHERE price < 0 OR price = 0 OR price > 10000;
```

See `CHALLENGE_EXAMPLES.md` for comprehensive examples and practice queries.

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
├── scripts/             # Database setup and management scripts
│   ├── db.js           # Main database CLI
│   ├── advanced-db-setup.js  # Advanced configurations
│   ├── challenge-db-setup.js # Challenge mode setup
│   └── database-manager.js   # Compiled TypeScript
├── utils/supabase/      # Database management utilities
│   └── database-manager.ts   # TypeScript source
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

- `users`: User information (with optional email validation issues)
- `products`: Product catalog (with optional pricing anomalies)
- `orders`: Order metadata (with optional delivery inconsistencies)
- `order_items`: Order line items (with optional quantity/pricing issues)
- `countries`: Country information
- `cities`: City information (with optional location mismatches)

See `/lib/schema.ts` for detailed schema information.

## Real-World Applications

The Challenge Mode helps you practice skills needed for:

- **E-commerce platforms** - Customer data validation, order integrity
- **Financial systems** - Transaction validation, compliance checks
- **Healthcare** - Patient data integrity, regulatory compliance
- **Marketing** - Email deliverability, data segmentation accuracy

## Contributing

1. Create a feature branch
2. Make your changes
3. Submit a pull request

## License

MIT
