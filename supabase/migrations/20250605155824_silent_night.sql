/*
  # Create SQL Playground Schema

  1. New Tables
    - `users` - For storing user data
    - `products` - For storing product information
    - `orders` - For storing order metadata
    - `order_items` - For storing order line items
    - `countries` - For storing country information
    - `cities` - For storing city information
  
  2. Sample Data
    - Inserts sample data into all tables for learning purposes
*/

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

-- Create a stored procedure to run user SQL queries safely
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

-- Insert sample data
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

-- Insert orders and order items (simulating purchases over time)
-- Order 1 (John Smith)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(1, 1149.98, 'completed', NOW() - INTERVAL '340 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(1, 1, 1, 899.99, NOW() - INTERVAL '340 days'),
(1, 3, 1, 79.99, NOW() - INTERVAL '340 days'),
(1, 12, 1, 24.99, NOW() - INTERVAL '340 days'),
(1, 6, 1, 29.99, NOW() - INTERVAL '340 days'),
(1, 7, 1, 69.99, NOW() - INTERVAL '340 days');

-- Order 2 (Emma Johnson)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(2, 1549.98, 'completed', NOW() - INTERVAL '320 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(2, 2, 1, 1299.99, NOW() - INTERVAL '320 days'),
(2, 5, 1, 249.99, NOW() - INTERVAL '320 days');

-- Order 3 (Pierre Dupont)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(3, 699.96, 'completed', NOW() - INTERVAL '300 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(3, 9, 1, 199.99, NOW() - INTERVAL '300 days'),
(3, 4, 2, 129.99, NOW() - INTERVAL '300 days'),
(3, 12, 1, 24.99, NOW() - INTERVAL '300 days'),
(3, 6, 1, 29.99, NOW() - INTERVAL '300 days'),
(3, 13, 1, 89.99, NOW() - INTERVAL '300 days');

-- Order 4 (Hans Müller)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(4, 1749.97, 'completed', NOW() - INTERVAL '280 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(4, 2, 1, 1299.99, NOW() - INTERVAL '280 days'),
(4, 5, 1, 249.99, NOW() - INTERVAL '280 days'),
(4, 10, 1, 499.99, NOW() - INTERVAL '280 days');

-- Order 5 (Yuki Tanaka)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(5, 1149.98, 'completed', NOW() - INTERVAL '260 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(5, 1, 1, 899.99, NOW() - INTERVAL '260 days'),
(5, 9, 1, 199.99, NOW() - INTERVAL '260 days'),
(5, 6, 1, 29.99, NOW() - INTERVAL '260 days'),
(5, 12, 1, 24.99, NOW() - INTERVAL '260 days');

-- Order 6 (Olivia Brown)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(6, 1399.97, 'completed', NOW() - INTERVAL '240 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(6, 15, 1, 1299.99, NOW() - INTERVAL '240 days'),
(6, 12, 1, 24.99, NOW() - INTERVAL '240 days'),
(6, 6, 1, 29.99, NOW() - INTERVAL '240 days'),
(6, 3, 1, 79.99, NOW() - INTERVAL '240 days');

-- Order 7 (Carlos Silva)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(7, 619.97, 'completed', NOW() - INTERVAL '220 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(7, 8, 1, 159.99, NOW() - INTERVAL '220 days'),
(7, 5, 1, 249.99, NOW() - INTERVAL '220 days'),
(7, 13, 1, 89.99, NOW() - INTERVAL '220 days'),
(7, 12, 1, 24.99, NOW() - INTERVAL '220 days'),
(7, 6, 1, 29.99, NOW() - INTERVAL '220 days'),
(7, 7, 1, 69.99, NOW() - INTERVAL '220 days');

-- Order 8 (Michael Wilson)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(8, 1699.98, 'completed', NOW() - INTERVAL '200 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(8, 2, 1, 1299.99, NOW() - INTERVAL '200 days'),
(8, 10, 1, 499.99, NOW() - INTERVAL '200 days');

-- Order 9 (Raj Patel)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(9, 329.97, 'completed', NOW() - INTERVAL '180 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(9, 4, 1, 129.99, NOW() - INTERVAL '180 days'),
(9, 6, 1, 29.99, NOW() - INTERVAL '180 days'),
(9, 7, 1, 69.99, NOW() - INTERVAL '180 days'),
(9, 12, 1, 24.99, NOW() - INTERVAL '180 days'),
(9, 13, 1, 89.99, NOW() - INTERVAL '180 days');

-- Order 10 (Li Wei)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(10, 1699.97, 'completed', NOW() - INTERVAL '160 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(10, 1, 1, 899.99, NOW() - INTERVAL '160 days'),
(10, 5, 1, 249.99, NOW() - INTERVAL '160 days'),
(10, 9, 1, 199.99, NOW() - INTERVAL '160 days'),
(10, 11, 1, 249.99, NOW() - INTERVAL '160 days'),
(10, 12, 1, 24.99, NOW() - INTERVAL '160 days'),
(10, 6, 1, 29.99, NOW() - INTERVAL '160 days'),
(10, 14, 1, 79.99, NOW() - INTERVAL '160 days');

-- Order 11 (Sarah Miller)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(11, 1529.97, 'completed', NOW() - INTERVAL '140 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(11, 2, 1, 1299.99, NOW() - INTERVAL '140 days'),
(11, 3, 1, 79.99, NOW() - INTERVAL '140 days'),
(11, 6, 1, 29.99, NOW() - INTERVAL '140 days'),
(11, 12, 1, 24.99, NOW() - INTERVAL '140 days'),
(11, 5, 1, 249.99, NOW() - INTERVAL '140 days');

-- Order 12 (James Taylor)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(12, 279.96, 'completed', NOW() - INTERVAL '120 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(12, 6, 1, 29.99, NOW() - INTERVAL '120 days'),
(12, 7, 1, 69.99, NOW() - INTERVAL '120 days'),
(12, 12, 1, 24.99, NOW() - INTERVAL '120 days'),
(12, 13, 1, 89.99, NOW() - INTERVAL '120 days'),
(12, 14, 1, 79.99, NOW() - INTERVAL '120 days');

-- Order 13 (Sophie Martin)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(13, 1399.97, 'completed', NOW() - INTERVAL '100 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(13, 15, 1, 1299.99, NOW() - INTERVAL '100 days'),
(13, 12, 1, 24.99, NOW() - INTERVAL '100 days'),
(13, 6, 1, 29.99, NOW() - INTERVAL '100 days'),
(13, 14, 1, 79.99, NOW() - INTERVAL '100 days');

-- Order 14 (Thomas Weber)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(14, 1549.98, 'completed', NOW() - INTERVAL '80 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(14, 2, 1, 1299.99, NOW() - INTERVAL '80 days'),
(14, 5, 1, 249.99, NOW() - INTERVAL '80 days');

-- Order 15 (Akira Sato)
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(15, 1399.97, 'completed', NOW() - INTERVAL '60 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(15, 15, 1, 1299.99, NOW() - INTERVAL '60 days'),
(15, 6, 1, 29.99, NOW() - INTERVAL '60 days'),
(15, 7, 1, 69.99, NOW() - INTERVAL '60 days');

-- Second orders for some users

-- John Smith's second order
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(1, 769.97, 'completed', NOW() - INTERVAL '200 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(16, 9, 1, 199.99, NOW() - INTERVAL '200 days'),
(16, 5, 1, 249.99, NOW() - INTERVAL '200 days'),
(16, 11, 1, 249.99, NOW() - INTERVAL '200 days'),
(16, 6, 1, 29.99, NOW() - INTERVAL '200 days'),
(16, 14, 1, 79.99, NOW() - INTERVAL '200 days');

-- Emma Johnson's second order
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(2, 279.96, 'completed', NOW() - INTERVAL '180 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(17, 13, 1, 89.99, NOW() - INTERVAL '180 days'),
(17, 8, 1, 159.99, NOW() - INTERVAL '180 days'),
(17, 6, 1, 29.99, NOW() - INTERVAL '180 days');

-- Pierre Dupont's second order
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(3, 1079.98, 'completed', NOW() - INTERVAL '150 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(18, 1, 1, 899.99, NOW() - INTERVAL '150 days'),
(18, 11, 1, 249.99, NOW() - INTERVAL '150 days');

-- Hans Müller's second order
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(4, 279.96, 'completed', NOW() - INTERVAL '120 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(19, 4, 1, 129.99, NOW() - INTERVAL '120 days'),
(19, 6, 1, 29.99, NOW() - INTERVAL '120 days'),
(19, 12, 1, 24.99, NOW() - INTERVAL '120 days'),
(19, 13, 1, 89.99, NOW() - INTERVAL '120 days');

-- Yuki Tanaka's second order
INSERT INTO orders (user_id, total_amount, status, created_at) VALUES
(5, 1549.98, 'completed', NOW() - INTERVAL '90 days');

INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
(20, 2, 1, 1299.99, NOW() - INTERVAL '90 days'),
(20, 5, 1, 249.99, NOW() - INTERVAL '90 days');