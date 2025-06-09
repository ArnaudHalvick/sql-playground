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
  city_id INTEGER REFERENCES cities(id)
);

CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  category TEXT,
  stock INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status TEXT DEFAULT 'pending'
);

CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER REFERENCES orders(id),
  product_id INTEGER REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price DECIMAL(10, 2) NOT NULL
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

INSERT INTO users (first_name, last_name, email, country_id, city_id) VALUES
('John', 'Smith', 'john.smith@example.com', 1, 1),
('Emma', 'Johnson', 'emma.johnson@example.com', 2, 3),
('Pierre', 'Dupont', 'pierre.dupont@example.com', 3, 4),
('Hans', 'Müller', 'hans.muller@example.com', 4, 5),
('Yuki', 'Tanaka', 'yuki.tanaka@example.com', 5, 6),
('Olivia', 'Brown', 'olivia.brown@example.com', 6, 7),
('Carlos', 'Silva', 'carlos.silva@example.com', 7, 8),
('Michael', 'Wilson', 'michael.wilson@example.com', 8, 9),
('Raj', 'Patel', 'raj.patel@example.com', 9, 10),
('Li', 'Wei', 'li.wei@example.com', 10, 11),
('Sarah', 'Miller', 'sarah.miller@example.com', 1, 12),
('James', 'Taylor', 'james.taylor@example.com', 2, 13),
('Sophie', 'Martin', 'sophie.martin@example.com', 3, 14),
('Thomas', 'Weber', 'thomas.weber@example.com', 4, 15),
('Akira', 'Sato', 'akira.sato@example.com', 5, 6);

INSERT INTO products (name, description, price, category, stock) VALUES
('Smartphone X', 'Latest smartphone with high-end features', 899.99, 'Electronics', 120),
('Laptop Pro', 'Professional laptop for creative work', 1299.99, 'Electronics', 50),
('Coffee Maker', 'Automatic coffee maker with timer', 79.99, 'Kitchen', 200),
('Running Shoes', 'Comfortable shoes for marathon runners', 129.99, 'Sports', 150),
('Wireless Headphones', 'Noise-canceling wireless headphones', 249.99, 'Electronics', 100),
('Yoga Mat', 'Non-slip yoga mat for home workouts', 29.99, 'Sports', 300),
('Blender', 'High-speed blender for smoothies', 69.99, 'Kitchen', 120),
('Winter Jacket', 'Waterproof jacket for cold weather', 159.99, 'Clothing', 80),
('Smart Watch', 'Fitness tracker and smartwatch', 199.99, 'Electronics', 75),
('Gaming Console', 'Next-gen gaming console', 499.99, 'Electronics', 30),
('Desk Chair', 'Ergonomic office chair', 249.99, 'Furniture', 40),
('Water Bottle', 'Insulated stainless steel bottle', 24.99, 'Sports', 200),
('Bluetooth Speaker', 'Portable wireless speaker', 89.99, 'Electronics', 60),
('Backpack', 'Water-resistant backpack for hiking', 79.99, 'Outdoors', 100),
('Digital Camera', 'Professional DSLR camera', 1299.99, 'Electronics', 25);

-- Insert realistic orders with varied IDs and multiple orders per user
-- Multiple orders for John Smith (user_id: 1)
INSERT INTO orders (user_id, total_amount, status) VALUES
(1, 1149.98, 'completed'),
(1, 329.97, 'completed'),
(1, 199.99, 'pending');

-- Multiple orders for Emma Johnson (user_id: 2)  
INSERT INTO orders (user_id, total_amount, status) VALUES
(2, 1549.98, 'completed'),
(2, 159.99, 'completed');

-- Multiple orders for Pierre Dupont (user_id: 3)
INSERT INTO orders (user_id, total_amount, status) VALUES
(3, 699.96, 'completed'),
(3, 899.99, 'completed');

-- Single order for Hans Müller (user_id: 4)
INSERT INTO orders (user_id, total_amount, status) VALUES
(4, 1749.97, 'completed');

-- Multiple orders for Yuki Tanaka (user_id: 5)
INSERT INTO orders (user_id, total_amount, status) VALUES
(5, 1149.98, 'completed'),
(5, 1299.99, 'completed'),
(5, 79.99, 'pending');

-- Single order for Olivia Brown (user_id: 6)
INSERT INTO orders (user_id, total_amount, status) VALUES
(6, 329.98, 'completed');

-- Multiple orders for Carlos Silva (user_id: 7)
INSERT INTO orders (user_id, total_amount, status) VALUES
(7, 579.97, 'completed'),
(7, 249.99, 'completed');

-- Single order for Michael Wilson (user_id: 8)
INSERT INTO orders (user_id, total_amount, status) VALUES
(8, 899.99, 'completed');

-- Multiple orders for Raj Patel (user_id: 9)
INSERT INTO orders (user_id, total_amount, status) VALUES
(9, 449.98, 'completed'),
(9, 129.99, 'completed'),
(9, 69.99, 'pending');

-- Multiple orders for Li Wei (user_id: 10)
INSERT INTO orders (user_id, total_amount, status) VALUES
(10, 1799.97, 'completed'),
(10, 499.99, 'completed');

-- Single orders for remaining users
INSERT INTO orders (user_id, total_amount, status) VALUES
(11, 1529.97, 'completed'),
(12, 279.96, 'completed'),
(13, 1399.97, 'completed'),
(14, 1549.98, 'completed'),
(15, 1399.97, 'completed');

-- Insert order items for all orders
-- Order 1 (John Smith - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(1, 1, 1, 899.99),
(1, 3, 1, 79.99),
(1, 12, 1, 24.99),
(1, 6, 1, 29.99),
(1, 7, 1, 69.99),
(1, 14, 1, 79.99);

-- Order 2 (John Smith - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(2, 8, 1, 159.99),
(2, 4, 1, 129.99),
(2, 14, 1, 79.99);

-- Order 3 (John Smith - third order - pending)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(3, 9, 1, 199.99);

-- Order 4 (Emma Johnson - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(4, 2, 1, 1299.99),
(4, 5, 1, 249.99);

-- Order 5 (Emma Johnson - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(5, 8, 1, 159.99);

-- Order 6 (Pierre Dupont - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(6, 9, 1, 199.99),
(6, 4, 2, 129.99),
(6, 12, 1, 24.99),
(6, 6, 1, 29.99),
(6, 13, 1, 89.99);

-- Order 7 (Pierre Dupont - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(7, 1, 1, 899.99);

-- Order 8 (Hans Müller - single order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(8, 2, 1, 1299.99),
(8, 5, 1, 249.99),
(8, 9, 1, 199.99);

-- Order 9 (Yuki Tanaka - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(9, 1, 1, 899.99),
(9, 9, 1, 199.99),
(9, 6, 1, 29.99),
(9, 12, 1, 24.99);

-- Order 10 (Yuki Tanaka - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(10, 2, 1, 1299.99);

-- Order 11 (Yuki Tanaka - third order - pending)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(11, 14, 1, 79.99);

-- Order 12 (Olivia Brown - single order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(12, 8, 1, 159.99),
(12, 4, 1, 129.99),
(12, 14, 1, 79.99);

-- Order 13 (Carlos Silva - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(13, 10, 1, 499.99),
(13, 14, 1, 79.99);

-- Order 14 (Carlos Silva - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(14, 5, 1, 249.99);

-- Order 15 (Michael Wilson - single order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(15, 1, 1, 899.99);

-- Order 16 (Raj Patel - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(16, 5, 1, 249.99),
(16, 9, 1, 199.99);

-- Order 17 (Raj Patel - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(17, 4, 1, 129.99);

-- Order 18 (Raj Patel - third order - pending)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(18, 7, 1, 69.99);

-- Order 19 (Li Wei - first order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(19, 15, 1, 1299.99),
(19, 10, 1, 499.99);

-- Order 20 (Li Wei - second order)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(20, 10, 1, 499.99);

-- Order 21 (Sarah Miller)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(21, 2, 1, 1299.99),
(21, 3, 1, 79.99),
(21, 6, 1, 29.99),
(21, 12, 1, 24.99),
(21, 5, 1, 249.99);

-- Order 22 (James Taylor)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(22, 6, 1, 29.99),
(22, 7, 1, 69.99),
(22, 12, 1, 24.99),
(22, 13, 1, 89.99),
(22, 14, 1, 79.99);

-- Order 23 (Sophie Martin)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(23, 15, 1, 1299.99),
(23, 12, 1, 24.99),
(23, 6, 1, 29.99),
(23, 14, 1, 79.99);

-- Order 24 (Thomas Weber)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(24, 2, 1, 1299.99),
(24, 5, 1, 249.99);

-- Order 25 (Akira Sato)
INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
(25, 15, 1, 1299.99),
(25, 6, 1, 29.99),
(25, 7, 1, 69.99);