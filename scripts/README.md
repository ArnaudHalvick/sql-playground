# Database Setup Scripts

This folder contains CLI scripts for setting up and managing the SQL Playground database with various configurations and challenge modes.

## Scripts Overview

### `database-manager.js`

Compiled JavaScript version of the TypeScript database manager. This is the core module that all other scripts import.

### `db.js`

Basic database operations script with simple commands:

```bash
npm run db:setup    # Default database setup
npm run db:info     # Show table information
npm run db:fix      # Fix the run_query function
```

### `advanced-db-setup.js`

Advanced database configurations with different dataset sizes:

```bash
npm run db:setup-small      # 50 users, 100 orders
npm run db:setup-medium     # 200 users, 500 orders
npm run db:setup-large      # 1000 users, 2000 orders
npm run db:setup-realistic  # 500 users, 1500 orders
npm run db:setup-custom X   # Custom multiplier
```

### `challenge-db-setup.js`

Challenge mode with configurable data quality issues:

```bash
npm run db:challenge-light   # 2-5% error rates
npm run db:challenge-medium  # 5-15% error rates
npm run db:challenge-heavy   # 10-25% error rates
npm run db:challenge-custom X # Custom error rate
```

## Database Schema

The scripts create a complete e-commerce database with the following tables:

### Core Tables

- **countries**: Country information with codes and continents
- **cities**: Cities with population data, linked to countries
- **users**: Customer profiles with names, emails, and locations
- **products**: Product catalog with descriptions, prices, and categories
- **orders**: Order metadata with statuses and dates
- **order_items**: Individual line items with quantities and prices

### Relationships

```
countries (1) -> (many) cities
countries (1) -> (many) users
cities (1) -> (many) users
users (1) -> (many) orders
orders (1) -> (many) order_items
products (1) -> (many) order_items
```

## Data Generation Features

### Realistic Data

- **Names**: Curated lists of first and last names
- **Emails**: Generated from names with realistic domains
- **Locations**: Real countries and cities with proper relationships
- **Products**: Dynamic product names with contextual descriptions
- **Orders**: Distributed across 2 years with realistic statuses

### Order Logic

- **Date Distribution**: Orders from 2 years ago to today
- **Status Logic**:
  - Future orders: pending
  - Recent orders: pending
  - Older orders: 80% delivered, 10% pending, 10% cancelled
- **Delivery Dates**: Realistic delivery timing with balanced distribution
  - Early delivery: -3 to -1 days from estimated (60%)
  - On-time delivery: exactly on estimated date (20%)
  - Late delivery: +1 day from estimated (20%)

## Challenge Mode - Data Quality Issues

### Error Types

#### 1. Email Validation Issues

- Missing @ symbols: `johndoe.gmail.com`
- Invalid domains: `john@example.xyz`
- Double @ symbols: `john@@gmail.com`
- Missing extensions: `john@gmail`
- Trailing dots: `john@gmail.com.`

#### 2. Delivery Date Inconsistencies

- Delivered orders missing delivery_date
- Pending/delivered orders missing estimated_delivery
- Cancelled orders with delivery information

#### 3. Pricing Anomalies

- Negative prices: `-$50.00`
- Zero prices: `$0.00`
- Excessive prices: `$25,000.00`

#### 4. Location Relationship Errors

- Users assigned to cities that don't belong to their country
- Example: User in "USA" assigned to "Paris" (which belongs to France)

#### 5. Quantity Validation Issues

- Zero quantities in order items
- Negative quantities: `-2 items`

### Error Configuration

Each error type can be configured independently with percentages (0-100%):

```javascript
errorConfig: {
  enabled: true,
  emailErrors: 15,      // 15% of users have invalid emails
  deliveryErrors: 10,   // 10% of orders have delivery issues
  pricingErrors: 8,     // 8% of products/items have pricing issues
  locationErrors: 12,   // 12% of users have location mismatches
  quantityErrors: 5     // 5% of order items have quantity issues
}
```

## Usage Examples

### Clean Database Setup

```bash
# Standard clean database (no errors)
npm run db:setup-medium
```

### Challenge Database Setup

```bash
# Light challenge for beginners
npm run db:challenge-light

# Custom error rate
npm run db:challenge-custom 15  # 15% base error rate
```

### From Code

```javascript
const dbManager = require("./database-manager.js");

const config = {
  users: 200,
  products: 150,
  orders: 500,
  // ... other config
  errorConfig: {
    enabled: true,
    emailErrors: 10,
    deliveryErrors: 5,
    // ... other error rates
  },
};

await dbManager.setupDatabase(config);
```

## Environment Setup

### Required Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

### Compilation

The TypeScript source is compiled to JavaScript before execution:

```bash
npm run db:compile  # Compiles utils/supabase/database-manager.ts
```

## Educational Use Cases

### Beginner Practice

- Start with clean databases to learn basic SQL
- Use small datasets for quick iteration

### Intermediate Practice

- Introduce light error rates (5-10%)
- Practice data validation queries
- Learn JOIN operations with clean data

### Advanced Practice

- Use heavy error rates (15-25%)
- Practice comprehensive data quality audits
- Learn data cleaning and transformation
- Business impact analysis queries

### Real-World Preparation

- Challenge mode mirrors actual production issues
- Practice identifying and quantifying data quality problems
- Learn to write defensive queries and validation rules

## Performance Considerations

- **Small datasets**: Instant setup, good for quick testing
- **Medium datasets**: 1-2 seconds setup, balanced for learning
- **Large datasets**: 5-10 seconds setup, good for performance testing
- **Batch processing**: Large datasets use batched inserts for efficiency

## Recent Updates

### v2.1.0 - Delivery Date Distribution Fix

**Issue**: Clean databases were generating ~60% late deliveries, which was unrealistic for learning SQL.

**Fix**: Updated delivery variation logic from `randomInt(-2, 5)` to `randomInt(-3, 2)`:

- **Before**: 62.5% late deliveries (heavily skewed)
- **After**: 20% late deliveries (realistic distribution)

**Files Updated**:

- `scripts/database-manager.js` (line 871)
- `utils/supabase/database-manager.ts` (line 966)

**Verification Query**:

```sql
SELECT
  COUNT(*) as total_delivered,
  COUNT(CASE WHEN delivery_date > estimated_delivery THEN 1 END) as late_deliveries,
  ROUND(
    COUNT(CASE WHEN delivery_date > estimated_delivery THEN 1 END) * 100.0 / COUNT(*),
    1
  ) as late_percentage
FROM orders
WHERE status = 'delivered'
  AND delivery_date IS NOT NULL
  AND estimated_delivery IS NOT NULL;
```

## Troubleshooting

### Common Issues

1. **Missing environment variables**: Check `.env.local` file
2. **Permission errors**: Ensure service role key has proper permissions
3. **Connection timeouts**: Check Supabase project status
4. **Compilation errors**: Run `npm run db:compile` manually

### Debug Mode

Add console logging to see detailed execution:

```bash
node scripts/db.js setup  # Shows detailed progress
```
