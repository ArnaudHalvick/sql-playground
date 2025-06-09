/*
  # Database Reset Script
  
  This script will completely reset your SQL Playground database to its original state.
  
  ## How to use:
  1. Copy this entire script
  2. Go to your Supabase SQL Editor
  3. Paste and run this script
  4. Your database will be reset with fresh sample data
  
  ## What this does:
  - Drops all existing tables and functions
  - Recreates all tables with proper relationships
  - Inserts fresh sample data
  - Recreates the run_query() function
*/

-- ============================================================================
-- STEP 1: DROP ALL EXISTING TABLES AND FUNCTIONS
-- ============================================================================

-- Drop all tables (in correct order due to foreign keys)
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS cities CASCADE;
DROP TABLE IF EXISTS countries CASCADE;

-- Drop functions
DROP FUNCTION IF EXISTS run_query(TEXT);
DROP FUNCTION IF EXISTS exec_sql(TEXT);

-- ============================================================================
-- STEP 2: RECREATE ALL TABLES
-- ============================================================================

-- Create tables
CREATE TABLE IF NOT EXISTS countries (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  continent TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS cities (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  country_id INTEGER REFERENCES countries(id),
  population INTEGER
);

CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  country_id INTEGER REFERENCES countries(id),
  city_id INTEGER REFERENCES cities(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================================
-- STEP 3: INSERT FRESH SAMPLE DATA
-- ============================================================================

-- Insert countries
INSERT INTO countries (name, code, continent) VALUES
('United States', 'US', 'North America'),
('United Kingdom', 'UK', 'Europe'),
('France', 'FR', 'Europe'),
('Germany', 'DE', 'Europe'),
('Japan', 'JP', 'Asia'),
('Australia', 'AU', 'Oceania'),
('Brazil', 'BR', 'South America'),
('Canada', 'CA', 'North America'),
('India', 'IN', 'Asia'),
('China', 'CN', 'Asia');

-- Insert cities
INSERT INTO cities (name, country_id, population) VALUES
('New York', 1, 8804190),
('Los Angeles', 1, 3898747),
('London', 2, 8982000),
('Paris', 3, 2148271),
('Berlin', 4, 3669491),
('Tokyo', 5, 13960000),
('Sydney', 6, 5312163),
('Rio de Janeiro', 7, 6748000),
('Toronto', 8, 2930000),
('Mumbai', 9, 20411274),
('Beijing', 10, 21540000),
('Chicago', 1, 2746388),
('Manchester', 2, 547627),
('Lyon', 3, 516092),
('Munich', 4, 1488202);

-- Insert users
INSERT INTO users (first_name, last_name, email, country_id, city_id, created_at) VALUES
('John', 'Smith', 'john.smith@example.com', 1, 1, NOW() - INTERVAL '365 days'),
('Emma', 'Johnson', 'emma.johnson@example.com', 2, 3, NOW() - INTERVAL '300 days'),
('Pierre', 'Dupont', 'pierre.dupont@example.com', 3, 4, NOW() - INTERVAL '250 days'),
('Hans', 'Müller', 'hans.muller@example.com', 4, 5, NOW() - INTERVAL '200 days'),
('Yuki', 'Tanaka', 'yuki.tanaka@example.com', 5, 6, NOW() - INTERVAL '150 days'),
('Olivia', 'Brown', 'olivia.brown@example.com', 6, 7, NOW() - INTERVAL '125 days'),
('Carlos', 'Silva', 'carlos.silva@example.com', 7, 8, NOW() - INTERVAL '100 days'),
('Michael', 'Wilson', 'michael.wilson@example.com', 8, 9, NOW() - INTERVAL '90 days'),
('Raj', 'Patel', 'raj.patel@example.com', 9, 10, NOW() - INTERVAL '80 days'),
('Li', 'Wei', 'li.wei@example.com', 10, 11, NOW() - INTERVAL '70 days'),
('Sarah', 'Miller', 'sarah.miller@example.com', 1, 12, NOW() - INTERVAL '60 days'),
('James', 'Taylor', 'james.taylor@example.com', 2, 13, NOW() - INTERVAL '50 days'),
('Sophie', 'Martin', 'sophie.martin@example.com', 3, 14, NOW() - INTERVAL '40 days'),
('Thomas', 'Weber', 'thomas.weber@example.com', 4, 15, NOW() - INTERVAL '30 days'),
('Akira', 'Sato', 'akira.sato@example.com', 5, 6, NOW() - INTERVAL '20 days');

-- Insert products
INSERT INTO products (name, description, price, category, stock, created_at) VALUES
('Smartphone X', 'Latest smartphone with high-end features', 899.99, 'Electronics', 120, NOW() - INTERVAL '400 days'),
('Laptop Pro', 'Professional laptop for creative work', 1299.99, 'Electronics', 50, NOW() - INTERVAL '350 days'),
('Coffee Maker', 'Automatic coffee maker with timer', 79.99, 'Kitchen', 200, NOW() - INTERVAL '300 days'),
('Running Shoes', 'Comfortable shoes for marathon runners', 129.99, 'Sports', 150, NOW() - INTERVAL '250 days'),
('Wireless Headphones', 'Noise-canceling wireless headphones', 249.99, 'Electronics', 100, NOW() - INTERVAL '200 days'),
('Yoga Mat', 'Non-slip yoga mat for home workouts', 29.99, 'Sports', 300, NOW() - INTERVAL '150 days'),
('Blender', 'High-speed blender for smoothies', 69.99, 'Kitchen', 120, NOW() - INTERVAL '125 days'),
('Winter Jacket', 'Waterproof jacket for cold weather', 159.99, 'Clothing', 80, NOW() - INTERVAL '100 days'),
('Smart Watch', 'Fitness tracker and smartwatch', 199.99, 'Electronics', 75, NOW() - INTERVAL '90 days'),
('Gaming Console', 'Next-gen gaming console', 499.99, 'Electronics', 30, NOW() - INTERVAL '80 days'),
('Desk Chair', 'Ergonomic office chair', 249.99, 'Furniture', 40, NOW() - INTERVAL '70 days'),
('Water Bottle', 'Insulated stainless steel bottle', 24.99, 'Sports', 200, NOW() - INTERVAL '60 days'),
('Bluetooth Speaker', 'Portable wireless speaker', 89.99, 'Electronics', 60, NOW() - INTERVAL '50 days'),
('Backpack', 'Water-resistant backpack for hiking', 79.99, 'Outdoors', 100, NOW() - INTERVAL '40 days'),
('Digital Camera', 'Professional DSLR camera', 1299.99, 'Electronics', 25, NOW() - INTERVAL '30 days');

-- Insert sample orders
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(1, 1149.98, 'completed', NOW() - INTERVAL '340 days'),
(2, 1549.98, 'completed', NOW() - INTERVAL '320 days'),
(3, 699.96, 'completed', NOW() - INTERVAL '300 days'),
(4, 1749.97, 'completed', NOW() - INTERVAL '280 days'),
(5, 1149.98, 'completed', NOW() - INTERVAL '260 days'),
(6, 329.98, 'completed', NOW() - INTERVAL '240 days'),
(7, 579.97, 'completed', NOW() - INTERVAL '220 days'),
(8, 899.99, 'completed', NOW() - INTERVAL '200 days'),
(9, 449.98, 'completed', NOW() - INTERVAL '180 days'),
(10, 1799.97, 'completed', NOW() - INTERVAL '160 days');

-- Insert order items
INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
-- Order 1 (John Smith)
(1, 1, 1, 899.99, NOW() - INTERVAL '340 days'),
(1, 3, 1, 79.99, NOW() - INTERVAL '340 days'),
(1, 12, 1, 24.99, NOW() - INTERVAL '340 days'),
(1, 6, 1, 29.99, NOW() - INTERVAL '340 days'),
(1, 7, 1, 69.99, NOW() - INTERVAL '340 days'),

-- Order 2 (Emma Johnson)
(2, 2, 1, 1299.99, NOW() - INTERVAL '320 days'),
(2, 5, 1, 249.99, NOW() - INTERVAL '320 days'),

-- Order 3 (Pierre Dupont)
(3, 9, 1, 199.99, NOW() - INTERVAL '300 days'),
(3, 4, 2, 129.99, NOW() - INTERVAL '300 days'),
(3, 12, 1, 24.99, NOW() - INTERVAL '300 days'),
(3, 6, 1, 29.99, NOW() - INTERVAL '300 days'),
(3, 13, 1, 89.99, NOW() - INTERVAL '300 days'),

-- Order 4 (Hans Müller)
(4, 2, 1, 1299.99, NOW() - INTERVAL '280 days'),
(4, 5, 1, 249.99, NOW() - INTERVAL '280 days'),
(4, 10, 1, 499.99, NOW() - INTERVAL '280 days'),

-- Order 5 (Yuki Tanaka)
(5, 1, 1, 899.99, NOW() - INTERVAL '260 days'),
(5, 9, 1, 199.99, NOW() - INTERVAL '260 days'),
(5, 6, 1, 29.99, NOW() - INTERVAL '260 days'),
(5, 12, 1, 24.99, NOW() - INTERVAL '260 days'),

-- Additional orders
(6, 8, 1, 159.99, NOW() - INTERVAL '240 days'),
(6, 4, 1, 129.99, NOW() - INTERVAL '240 days'),
(6, 11, 1, 249.99, NOW() - INTERVAL '240 days'),

(7, 10, 1, 499.99, NOW() - INTERVAL '220 days'),
(7, 14, 1, 79.99, NOW() - INTERVAL '220 days'),

(8, 1, 1, 899.99, NOW() - INTERVAL '200 days'),

(9, 5, 1, 249.99, NOW() - INTERVAL '180 days'),
(9, 9, 1, 199.99, NOW() - INTERVAL '180 days'),

(10, 15, 1, 1299.99, NOW() - INTERVAL '160 days'),
(10, 10, 1, 499.99, NOW() - INTERVAL '160 days');

-- ============================================================================
-- STEP 4: CREATE SECURITY FUNCTIONS
-- ============================================================================

-- Create the run_query function for secure SQL execution
CREATE OR REPLACE FUNCTION run_query(query_text TEXT)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSONB;
BEGIN
  EXECUTE query_text INTO result;
  RETURN result;
EXCEPTION WHEN OTHERS THEN
  RAISE EXCEPTION '%', SQLERRM;
END;
$$;

-- Create exec_sql function for database management
CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  EXECUTE sql_query;
END;
$$;

-- ============================================================================
-- RESET COMPLETE!
-- ============================================================================

-- Verify the reset by showing table counts
SELECT 
  'countries' as table_name, 
  COUNT(*) as record_count 
FROM countries
UNION ALL
SELECT 
  'cities' as table_name, 
  COUNT(*) as record_count 
FROM cities
UNION ALL
SELECT 
  'users' as table_name, 
  COUNT(*) as record_count 
FROM users
UNION ALL
SELECT 
  'products' as table_name, 
  COUNT(*) as record_count 
FROM products
UNION ALL
SELECT 
  'orders' as table_name, 
  COUNT(*) as record_count 
FROM orders
UNION ALL
SELECT 
  'order_items' as table_name, 
  COUNT(*) as record_count 
FROM order_items
ORDER BY table_name; 