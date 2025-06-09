# SQL Playground - Supabase Setup Guide

This directory contains database migrations and configurations for the SQL Playground. This playground allows anyone to create and experiment with Supabase databases safely.

## 🚀 Quick Start

### Option 1: Manual Setup (Copy & Paste)

1. **Create a new Supabase project** at [supabase.com](https://supabase.com)
2. **Go to SQL Editor** in your Supabase dashboard
3. **Copy and paste** the migration files in order:
   - First: `migrations/20250605155824_silent_night.sql`
   - Second: `migrations/20250605155926_dusty_wind.sql`
4. **Execute each migration** by clicking "Run"
5. **Get your credentials** from Settings > API
6. **Update your environment variables**:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=your_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ```

### Option 2: Programmatic Setup

Use the provided utility functions to set up databases programmatically:

```typescript
import {
  setupDatabase,
  resetDatabase,
} from "@/utils/supabase/database-manager";

// Setup a new database
await setupDatabase();

// Reset database to original state
await resetDatabase();
```

### Option 3: CLI Tools

Use the built-in npm scripts for easy database management:

```bash
# Set up the database with sample data
npm run db:setup

# Reset database to original state (with confirmation)
npm run db:reset

# Check database status and table counts
npm run db:info

# Execute a custom SQL query interactively
npm run db:query
```

## 📊 Database Schema

The playground creates a complete e-commerce-like schema with sample data:

### Tables Created:

- **countries** - Country information with codes and continents
- **cities** - City data linked to countries with population
- **users** - User profiles with location references
- **products** - Product catalog with categories and pricing
- **orders** - Order records with status tracking
- **order_items** - Individual items within orders

### Sample Data:

- 10 countries across different continents
- 15 cities with population data
- 15 users with realistic profiles
- 15 products across various categories
- Multiple orders with line items spanning different time periods

### Security Functions:

- **run_query()** - Secure RPC function for executing user SQL queries

## 🛠️ Database Management

### Reset Database

To reset your database to the original state (useful for playground experimentation):

```typescript
import { resetDatabase } from "@/utils/supabase/database-manager";

// This will drop all tables and recreate them with fresh sample data
await resetDatabase();
```

### Manual Reset (SQL Editor)

If you prefer to reset manually:

1. Go to SQL Editor in Supabase
2. Run the reset script:
   ```sql
   -- Drop all tables (in correct order due to foreign keys)
   DROP TABLE IF EXISTS order_items CASCADE;
   DROP TABLE IF EXISTS orders CASCADE;
   DROP TABLE IF EXISTS products CASCADE;
   DROP TABLE IF EXISTS users CASCADE;
   DROP TABLE IF EXISTS cities CASCADE;
   DROP TABLE IF EXISTS countries CASCADE;
   DROP FUNCTION IF EXISTS run_query(TEXT);
   ```
3. Re-run both migration files in order

## 🔧 Environment Setup

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: For multiple database management
SUPABASE_PROJECT_ID=your-project-id
SUPABASE_ACCESS_TOKEN=your-access-token
```

## 📝 Migration Files

### `20250605155824_silent_night.sql`

- Creates all core tables with proper relationships
- Inserts comprehensive sample data
- Sets up foreign key constraints
- Includes realistic timestamps for data analysis

### `20250605155926_dusty_wind.sql`

- Creates the `run_query()` RPC function
- Enables secure SQL execution from the frontend
- Provides error handling for invalid queries

## 🔒 Security Notes

- **RLS is disabled** for learning purposes - this is a playground environment
- The `run_query()` function uses `SECURITY DEFINER` for controlled access
- Error messages are sanitized to prevent information leakage
- **Do not use this setup in production** without proper security measures

## 🎯 Usage Examples

### Basic Queries to Try:

```sql
-- Get all users with their countries
SELECT u.first_name, u.last_name, c.name as country
FROM users u
JOIN countries c ON u.country_id = c.id;

-- Top selling products
SELECT p.name, SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name
ORDER BY total_sold DESC;

-- Monthly sales analysis
SELECT
  DATE_TRUNC('month', created_at) as month,
  COUNT(*) as order_count,
  SUM(total_amount) as revenue
FROM orders
GROUP BY month
ORDER BY month;
```

## 🚨 Troubleshooting

### Common Issues:

1. **Migration fails**: Ensure you're running migrations in the correct order
2. **Permission errors**: Check that your service role key is correct
3. **Connection issues**: Verify your Supabase URL and keys
4. **Query timeouts**: Large datasets may need query optimization

### Getting Help:

- Check the Supabase logs in your dashboard
- Verify environment variables are set correctly
- Ensure your Supabase project is active and not paused

## 🔄 Development Workflow

1. **Experiment freely** - break things, run complex queries
2. **Reset when needed** - use the reset function to start fresh
3. **Learn by doing** - try different SQL patterns and joins
4. **Share discoveries** - document interesting queries you find

---

**Remember**: This is a playground environment designed for learning and experimentation. Feel free to break things - you can always reset and start over!
