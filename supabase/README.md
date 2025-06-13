# SQL Playground Database Setup

Complete setup guide for your SQL Playground with Supabase. **No manual copy/paste required** - everything is automated!

## ⚠️ Prerequisites

**You MUST have the service role key configured** for database setup to work!

### Required Environment Variables

Create `.env.local` in your project root with:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### Why Service Role Key is Required

The SQL Playground needs **admin privileges** to:

- ✅ Create and drop database tables
- ✅ Insert sample data with proper relationships
- ✅ Create the `run_query()` function for SQL execution
- ✅ Reset the database when needed
- ✅ Set up challenge mode with data quality issues

**Without the service role key, database setup will fail!**

### How to Get Your Keys

1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Navigate to **Settings > API**
4. Copy these values:
   - **Project URL** (at the top)
   - **anon/public key** (for regular queries)
   - **service_role key** (for database management)

## 🚀 Quick Start (Recommended)

### Option 1: Use the App Interface

1. **Set up environment**: Copy `.env.local.example` to `.env.local` and fill in your Supabase credentials
2. **Start your app**: `npm run dev`
3. **Go to Schema tab** in the app
4. **Click "Setup DB"** button
5. **Done!** Your database is ready with sample data

### Option 2: Use CLI Commands

```bash
# Setup complete database with sample data
npm run db:setup

# Reset database (delete all data and recreate)
npm run db:reset

# Check database status
npm run db:info

# Fix query function if needed
npm run db:fix
```

## 📋 What Gets Created

Your database will include these tables **without** `created_at` and `updated_at` fields:

### Tables Structure

- **countries** (10 records) - Countries with codes and continents
- **cities** (15 records) - Cities with population data
- **users** (15 records) - Sample users with realistic profiles
- **products** (15 records) - Products across various categories
- **orders** (10 records) - Sample customer orders
- **order_items** (35 records) - Individual items in orders

### Sample Data Preview

```sql
-- Users table (no timestamps)
SELECT id, first_name, last_name, email, country_id, city_id FROM users LIMIT 3;

-- Products table (no timestamps)
SELECT id, name, price, category, stock FROM products LIMIT 3;

-- Orders table (no timestamps)
SELECT id, user_id, total_amount, status FROM orders LIMIT 3;
```

## 🔧 Database Functions

### run_query() Function

- **Purpose**: Executes SQL queries safely from your app
- **Returns**: JSON results for SELECT queries, success messages for others
- **Error Handling**: Returns errors as JSON instead of throwing exceptions
- **Fixed**: Handles multi-row SELECT queries properly (unlike the original migration)

## 📁 Migration Files Status

### Included Automatically

- ✅ **utils/supabase/database-manager.ts** - Main database functions (setup, reset, info, fix)
- ✅ **scripts/db.js** - CLI wrapper for database operations
- ✅ **app/api/database/** - API routes for web interface
- ✅ **.env.local.example** - Environment variables template

**Note**: All database operations now use the same unified codebase for consistency.

## 🛠️ Available Commands

| Command            | Description                              | Usage            |
| ------------------ | ---------------------------------------- | ---------------- |
| `npm run db:setup` | Create all tables and insert sample data | First-time setup |
| `npm run db:reset` | Delete everything and recreate           | Clean slate      |
| `npm run db:info`  | Show table counts and status             | Health check     |
| `npm run db:fix`   | Fix the run_query function               | If queries fail  |

## 🎯 Key Features

### ✅ Fully Automated

- No copy/paste from Supabase dashboard required
- No manual SQL execution needed
- Everything works through buttons and commands

### ✅ Clean Schema

- **No created_at or updated_at fields** - cleaner query results
- Focused on essential data only
- Better for learning SQL fundamentals

### ✅ Multiple Interfaces

- **Web Interface**: Database Manager component in Schema tab
- **CLI Interface**: npm run commands for terminal users
- **Unified Codebase**: Both interfaces use the same `database-manager.ts` functions

### ✅ Error Handling

- Detailed error messages
- Graceful failure recovery
- Alternative methods if one fails

## 🔍 Troubleshooting

### "Missing Supabase environment variables" Error?

This means your `.env.local` file is missing or incomplete:

1. **Copy the template**: `cp .env.local.example .env.local`
2. **Fill in your Supabase credentials** (URL, anon key, service role key)
3. **Restart your app**: `npm run dev`

### Query Button Not Working?

```bash
npm run db:fix
```

This fixes the run_query function that powers the "Run Query" button.

### Want to Start Fresh?

```bash
npm run db:reset
```

This deletes all data and recreates everything from scratch.

### Check What's in Database?

```bash
npm run db:info
```

Shows table counts and verifies everything is working.

### CLI Commands Failing?

1. **Check your `.env.local`** - make sure all three keys are present
2. **Use the web interface instead**:
   - Go to Schema tab in your app
   - Use the Database Manager buttons
   - All functionality is available in both places

## 📊 Sample Queries to Try

Once setup is complete, try these queries in your SQL Playground:

```sql
-- Basic queries (no timestamps to worry about!)
SELECT * FROM users LIMIT 5;
SELECT * FROM products WHERE category = 'Electronics';
SELECT * FROM orders WHERE status = 'completed';

-- Joins
SELECT u.first_name, u.last_name, c.name as country
FROM users u
JOIN countries c ON u.country_id = c.id;

-- Aggregations
SELECT category, COUNT(*) as product_count, AVG(price) as avg_price
FROM products
GROUP BY category;

-- Complex queries
SELECT
  u.first_name,
  u.last_name,
  COUNT(o.id) as order_count,
  SUM(o.total_amount) as total_spent
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.first_name, u.last_name
ORDER BY total_spent DESC;
```

## 🎉 You're All Set!

Your SQL Playground is now ready with:

- ✅ Clean database schema (no timestamp clutter)
- ✅ Rich sample data for learning
- ✅ Working query execution
- ✅ Multiple management interfaces
- ✅ No manual setup required

Start exploring SQL with `SELECT * FROM users;` and have fun! 🚀
