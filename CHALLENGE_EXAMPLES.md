# SQL Data Quality Challenge Examples

This document provides examples of SQL challenges you can practice using the new **Challenge Mode** database setup, which includes intentional data quality issues.

## Setting Up Challenge Databases

### Via Web Interface

1. Open your SQL Playground
2. Click "Setup Database"
3. Select "Challenge Mode" configuration
4. This creates a database with ~5-15% error rates across different data quality issues

### Via Command Line

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

## Challenge Categories

### 1. Email Format Validation

**Challenge**: Find all users with invalid email addresses.

**Types of errors injected**:

- Missing @ symbol
- Invalid domain extensions (not .com, .net, .org)
- Double @ symbols
- Missing domain extensions
- Trailing dots

**Example Queries**:

```sql
-- Find users with missing @ symbol
SELECT id, first_name, last_name, email
FROM users
WHERE email NOT LIKE '%@%';

-- Find users with invalid domain extensions
SELECT id, first_name, last_name, email
FROM users
WHERE email NOT LIKE '%.com'
  AND email NOT LIKE '%.net'
  AND email NOT LIKE '%.org';

-- Comprehensive email validation
SELECT id, first_name, last_name, email,
  CASE
    WHEN email NOT LIKE '%@%' THEN 'Missing @ symbol'
    WHEN email LIKE '%@@%' THEN 'Double @ symbol'
    WHEN email NOT LIKE '%.com' AND email NOT LIKE '%.net' AND email NOT LIKE '%.org' THEN 'Invalid domain'
    WHEN email LIKE '%.' THEN 'Trailing dot'
    ELSE 'Valid'
  END as email_issue
FROM users
WHERE email NOT LIKE '%@%.com'
   OR email NOT LIKE '%@%.net'
   OR email NOT LIKE '%@%.org'
   OR email LIKE '%@@%'
   OR email LIKE '%.';
```

### 2. Delivery Date Inconsistencies

**Challenge**: Find orders with delivery logic violations.

**Types of errors injected**:

- Delivered status but no delivery_date
- Pending/delivered status but no estimated_delivery
- Cancelled status but has delivery dates

**Example Queries**:

```sql
-- Orders marked as delivered but missing delivery_date
SELECT id, user_id, status, order_date, estimated_delivery, delivery_date
FROM orders
WHERE status = 'delivered' AND delivery_date IS NULL;

-- Orders that should have estimated delivery but don't
SELECT id, user_id, status, order_date, estimated_delivery, delivery_date
FROM orders
WHERE status IN ('pending', 'delivered') AND estimated_delivery IS NULL;

-- Cancelled orders that incorrectly have delivery information
SELECT id, user_id, status, order_date, estimated_delivery, delivery_date
FROM orders
WHERE status = 'cancelled'
  AND (estimated_delivery IS NOT NULL OR delivery_date IS NOT NULL);

-- Comprehensive delivery validation report
SELECT
  COUNT(*) as total_orders,
  COUNT(CASE WHEN status = 'delivered' AND delivery_date IS NULL THEN 1 END) as delivered_no_date,
  COUNT(CASE WHEN status IN ('pending', 'delivered') AND estimated_delivery IS NULL THEN 1 END) as missing_estimated,
  COUNT(CASE WHEN status = 'cancelled' AND (estimated_delivery IS NOT NULL OR delivery_date IS NOT NULL) THEN 1 END) as cancelled_with_dates
FROM orders;
```

### 3. Pricing Anomalies

**Challenge**: Identify products and order items with pricing issues.

**Types of errors injected**:

- Negative prices
- Zero prices
- Extremely high prices (over $10,000)

**Example Queries**:

```sql
-- Products with invalid pricing
SELECT id, name, price, category,
  CASE
    WHEN price < 0 THEN 'Negative price'
    WHEN price = 0 THEN 'Zero price'
    WHEN price > 10000 THEN 'Price too high'
    ELSE 'Valid'
  END as price_issue
FROM products
WHERE price < 0 OR price = 0 OR price > 10000;

-- Order items with pricing issues
SELECT oi.id, oi.order_id, p.name, oi.price, oi.quantity,
  CASE
    WHEN oi.price < 0 THEN 'Negative price'
    WHEN oi.price = 0 THEN 'Zero price'
    WHEN oi.price > 10000 THEN 'Price too high'
    ELSE 'Valid'
  END as price_issue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.price < 0 OR oi.price = 0 OR oi.price > 10000;

-- Financial impact of pricing errors
SELECT
  COUNT(*) as total_items,
  SUM(CASE WHEN price < 0 THEN 1 ELSE 0 END) as negative_prices,
  SUM(CASE WHEN price = 0 THEN 1 ELSE 0 END) as zero_prices,
  SUM(CASE WHEN price > 10000 THEN 1 ELSE 0 END) as excessive_prices,
  SUM(CASE WHEN price < 0 THEN price * quantity ELSE 0 END) as negative_revenue_impact
FROM order_items;
```

### 4. Location Relationship Errors

**Challenge**: Find users with mismatched city-country relationships.

**Types of errors injected**:

- Users assigned to cities that don't belong to their country

**Example Queries**:

```sql
-- Users with mismatched city-country relationships
SELECT u.id, u.first_name, u.last_name,
       c1.name as user_country, c2.name as city, c3.name as city_country
FROM users u
JOIN countries c1 ON u.country_id = c1.id
JOIN cities c2 ON u.city_id = c2.id
JOIN countries c3 ON c2.country_id = c3.id
WHERE u.country_id != c2.country_id;

-- Count of location mismatches by country
SELECT c1.name as assigned_country, c3.name as actual_city_country, COUNT(*) as mismatch_count
FROM users u
JOIN countries c1 ON u.country_id = c1.id
JOIN cities c2 ON u.city_id = c2.id
JOIN countries c3 ON c2.country_id = c3.id
WHERE u.country_id != c2.country_id
GROUP BY c1.name, c3.name
ORDER BY mismatch_count DESC;
```

### 5. Quantity Validation

**Challenge**: Find order items with invalid quantities.

**Types of errors injected**:

- Zero quantities
- Negative quantities

**Example Queries**:

```sql
-- Order items with invalid quantities
SELECT oi.id, oi.order_id, p.name, oi.quantity, oi.price,
  CASE
    WHEN oi.quantity = 0 THEN 'Zero quantity'
    WHEN oi.quantity < 0 THEN 'Negative quantity'
    ELSE 'Valid'
  END as quantity_issue
FROM order_items oi
JOIN products p ON oi.product_id = p.id
WHERE oi.quantity <= 0;

-- Orders affected by quantity issues
SELECT DISTINCT o.id, o.user_id, o.total_amount, o.status
FROM orders o
JOIN order_items oi ON o.id = oi.order_id
WHERE oi.quantity <= 0;

-- Impact analysis of quantity errors
SELECT
  COUNT(DISTINCT oi.order_id) as affected_orders,
  COUNT(*) as invalid_line_items,
  SUM(CASE WHEN oi.quantity = 0 THEN oi.price ELSE 0 END) as zero_quantity_value,
  SUM(CASE WHEN oi.quantity < 0 THEN oi.price * oi.quantity ELSE 0 END) as negative_quantity_impact
FROM order_items oi
WHERE oi.quantity <= 0;
```

## Comprehensive Data Quality Audit

**Challenge**: Create a complete data quality report covering all error types.

```sql
-- Master data quality audit query
WITH email_issues AS (
  SELECT COUNT(*) as invalid_emails
  FROM users
  WHERE email NOT LIKE '%@%.com'
    AND email NOT LIKE '%@%.net'
    AND email NOT LIKE '%@%.org'
    OR email LIKE '%@@%'
    OR email LIKE '%.'
),
delivery_issues AS (
  SELECT
    COUNT(CASE WHEN status = 'delivered' AND delivery_date IS NULL THEN 1 END) as delivered_no_date,
    COUNT(CASE WHEN status IN ('pending', 'delivered') AND estimated_delivery IS NULL THEN 1 END) as missing_estimated,
    COUNT(CASE WHEN status = 'cancelled' AND (estimated_delivery IS NOT NULL OR delivery_date IS NOT NULL) THEN 1 END) as cancelled_with_dates
  FROM orders
),
pricing_issues AS (
  SELECT
    COUNT(CASE WHEN price < 0 OR price = 0 OR price > 10000 THEN 1 END) as product_pricing_errors
  FROM products
  UNION ALL
  SELECT
    COUNT(CASE WHEN price < 0 OR price = 0 OR price > 10000 THEN 1 END)
  FROM order_items
),
location_issues AS (
  SELECT COUNT(*) as location_mismatches
  FROM users u
  JOIN cities c ON u.city_id = c.id
  WHERE u.country_id != c.country_id
),
quantity_issues AS (
  SELECT COUNT(*) as invalid_quantities
  FROM order_items
  WHERE quantity <= 0
)
SELECT
  'Data Quality Audit Report' as report_title,
  ei.invalid_emails,
  di.delivered_no_date,
  di.missing_estimated,
  di.cancelled_with_dates,
  (SELECT SUM(product_pricing_errors) FROM pricing_issues) as total_pricing_errors,
  li.location_mismatches,
  qi.invalid_quantities
FROM email_issues ei, delivery_issues di, location_issues li, quantity_issues qi;
```

## Business Impact Analysis

**Challenge**: Quantify the business impact of data quality issues.

```sql
-- Revenue impact of data quality issues
SELECT
  'Revenue Impact Analysis' as analysis_type,
  -- Orders with delivery issues that might affect customer satisfaction
  COUNT(CASE WHEN status = 'delivered' AND delivery_date IS NULL THEN 1 END) as untracked_deliveries,
  SUM(CASE WHEN status = 'delivered' AND delivery_date IS NULL THEN total_amount ELSE 0 END) as untracked_delivery_revenue,

  -- Revenue from orders with pricing errors
  SUM(CASE WHEN oi.price < 0 THEN oi.price * oi.quantity ELSE 0 END) as negative_pricing_impact,
  SUM(CASE WHEN oi.quantity <= 0 THEN oi.price * ABS(oi.quantity) ELSE 0 END) as quantity_error_impact,

  -- Count of customers affected by email issues (can't receive notifications)
  COUNT(DISTINCT CASE WHEN u.email NOT LIKE '%@%.com' AND u.email NOT LIKE '%@%.net' AND u.email NOT LIKE '%@%.org' THEN u.id END) as customers_unreachable

FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN users u ON o.user_id = u.id;
```

## Practice Recommendations

1. **Start with Challenge Light** - Begin with 2-5% error rates to get familiar with data quality patterns
2. **Progress to Medium/Heavy** - Increase error rates as you become more comfortable
3. **Use Custom Rates** - Set specific error percentages to focus on particular types of issues
4. **Combine with Business Logic** - Create queries that not only find errors but also assess business impact
5. **Practice Data Cleaning** - Write UPDATE statements to fix the issues you identify (be careful in production!)

## Real-World Applications

These challenges mirror real-world data quality issues you'll encounter:

- **E-commerce platforms** - Invalid customer data, pricing errors, order inconsistencies
- **Financial systems** - Transaction validation, compliance checks
- **Healthcare** - Patient data integrity, regulatory compliance
- **Marketing** - Email deliverability, customer segmentation accuracy

The error injection system helps you practice identifying and resolving these issues in a safe, controlled environment before working with production data.
