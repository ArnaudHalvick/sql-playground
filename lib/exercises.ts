import { DifficultyLevel } from "@/components/ui/custom/exercise-card";

export interface Exercise {
  id: string;
  title: string;
  description: string;
  difficulty: DifficultyLevel;
  query: string;
}

export const exercises: Exercise[] = [
  {
    id: "select-all-users",
    title: "Get all users",
    description: "Retrieve all columns for all users in the database.",
    difficulty: "beginner",
    query: "SELECT * FROM users",
  },
  {
    id: "select-specific-columns",
    title: "Select specific user columns",
    description:
      "Retrieve only first name, last name, and email for all users.",
    difficulty: "beginner",
    query: "SELECT first_name, last_name, email FROM users",
  },
  {
    id: "limit-and-order",
    title: "Limit and order results",
    description:
      "Get the 5 most recently created users, ordered by creation date.",
    difficulty: "beginner",
    query: "SELECT * FROM users ORDER BY created_at DESC LIMIT 5",
  },
  {
    id: "filter-with-where",
    title: "Filter with WHERE clause",
    description: "Find all products with price greater than $50.",
    difficulty: "beginner",
    query: "SELECT * FROM products WHERE price > 50",
  },
  {
    id: "simple-join",
    title: "Join two tables",
    description: "Get all orders with the corresponding user information.",
    difficulty: "intermediate",
    query: `SELECT o.id, o.total_amount, o.status, u.first_name, u.last_name, u.email
FROM orders o
JOIN users u ON o.user_id = u.id`,
  },
  {
    id: "multi-table-join",
    title: "Multi-table join",
    description: "Get order details with product information.",
    difficulty: "intermediate",
    query: `SELECT o.id as order_id, u.first_name, u.last_name, 
       p.name as product_name, oi.quantity, oi.price
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN order_items oi ON oi.order_id = o.id
JOIN products p ON oi.product_id = p.id`,
  },
  {
    id: "group-by-aggregate",
    title: "Group By with aggregates",
    description: "Calculate total sales by country.",
    difficulty: "intermediate",
    query: `SELECT c.name as country, SUM(o.total_amount) as total_sales
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN countries c ON u.country_id = c.id
GROUP BY c.name
ORDER BY total_sales DESC`,
  },
  {
    id: "having-clause",
    title: "HAVING clause",
    description: "Find countries with total sales over $1000.",
    difficulty: "intermediate",
    query: `SELECT c.name as country, SUM(o.total_amount) as total_sales
FROM orders o
JOIN users u ON o.user_id = u.id
JOIN countries c ON u.country_id = c.id
GROUP BY c.name
HAVING SUM(o.total_amount) > 1000
ORDER BY total_sales DESC`,
  },
  {
    id: "subquery",
    title: "Subquery",
    description:
      "Find users who have placed orders with a total amount greater than the average order amount.",
    difficulty: "advanced",
    query: `SELECT DISTINCT u.first_name, u.last_name, u.email
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.total_amount > (
  SELECT AVG(total_amount) FROM orders
)`,
  },
  {
    id: "window-function",
    title: "Window function",
    description: "Rank products by price within each category.",
    difficulty: "advanced",
    query: `SELECT name, category, price,
       RANK() OVER (PARTITION BY category ORDER BY price DESC) as price_rank
FROM products`,
  },
  {
    id: "case-expression",
    title: "CASE expression",
    description: "Categorize products by price range.",
    difficulty: "advanced",
    query: `SELECT name, price,
       CASE
         WHEN price < 25 THEN 'Budget'
         WHEN price >= 25 AND price < 75 THEN 'Mid-range'
         ELSE 'Premium'
       END as price_category
FROM products
ORDER BY price`,
  },
  {
    id: "common-table-expression",
    title: "Common Table Expression (CTE)",
    description: "Find the most valuable customers using a CTE.",
    difficulty: "advanced",
    query: `WITH customer_totals AS (
  SELECT u.id, u.first_name, u.last_name, SUM(o.total_amount) as total_spent
  FROM users u
  JOIN orders o ON u.id = o.user_id
  GROUP BY u.id, u.first_name, u.last_name
)
SELECT first_name, last_name, total_spent
FROM customer_totals
ORDER BY total_spent DESC
LIMIT 5`,
  },
  {
    id: "count-distinct",
    title: "COUNT DISTINCT",
    description: "Find the number of unique products ordered by each user.",
    difficulty: "intermediate",
    query: `SELECT u.first_name, u.last_name,
       COUNT(DISTINCT oi.product_id) as unique_products_ordered
FROM users u
JOIN orders o ON u.id = o.user_id
JOIN order_items oi ON o.id = oi.order_id
GROUP BY u.id, u.first_name, u.last_name
ORDER BY unique_products_ordered DESC`,
  },
  {
    id: "date-functions",
    title: "Date Functions",
    description: "Analyze orders by month and year.",
    difficulty: "intermediate",
    query: `SELECT 
  EXTRACT(YEAR FROM order_date) as year,
  EXTRACT(MONTH FROM order_date) as month,
  COUNT(*) as order_count,
  SUM(total_amount) as total_sales
FROM orders
GROUP BY year, month
ORDER BY year, month`,
  },
  {
    id: "self-join",
    title: "Self Join",
    description: "Find cities in the same country.",
    difficulty: "intermediate",
    query: `SELECT 
  c1.name as city1,
  c2.name as city2,
  co.name as country
FROM cities c1
JOIN cities c2 ON c1.country_id = c2.country_id AND c1.id < c2.id
JOIN countries co ON c1.country_id = co.id
ORDER BY country, city1, city2`,
  },
  {
    id: "exists-subquery",
    title: "EXISTS Subquery",
    description: "Find users who have never placed an order.",
    difficulty: "advanced",
    query: `SELECT first_name, last_name, email
FROM users u
WHERE NOT EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
)`,
  },
  {
    id: "union-query",
    title: "UNION Query",
    description:
      "Combine high-value customers and users from specific countries.",
    difficulty: "advanced",
    query: `SELECT first_name, last_name, 'High Value' as category
FROM users u
WHERE EXISTS (
  SELECT 1 FROM orders o
  WHERE o.user_id = u.id
  GROUP BY o.user_id
  HAVING SUM(o.total_amount) > 1000
)
UNION
SELECT first_name, last_name, 'Premium Market' as category
FROM users u
JOIN countries c ON u.country_id = c.id
WHERE c.name IN ('United States', 'United Kingdom', 'Japan')
ORDER BY first_name, last_name`,
  },
  {
    id: "complex-aggregation",
    title: "Complex Aggregation",
    description: "Calculate product sales statistics.",
    difficulty: "advanced",
    query: `SELECT 
  p.category,
  COUNT(DISTINCT p.id) as unique_products,
  COUNT(oi.id) as total_sales,
  ROUND(AVG(oi.price), 2) as avg_sale_price,
  MIN(oi.price) as min_price,
  MAX(oi.price) as max_price,
  SUM(oi.quantity) as total_units_sold
FROM products p
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.category
ORDER BY total_units_sold DESC`,
  },
  {
    id: "nested-subqueries",
    title: "Nested Subqueries",
    description:
      "Find products that have sold more units than the average product in their category.",
    difficulty: "advanced",
    query: `SELECT p.name, p.category, 
       SUM(oi.quantity) as total_sold
FROM products p
JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.category
HAVING SUM(oi.quantity) > (
  SELECT AVG(product_sales.total_quantity)
  FROM (
    SELECT p2.id, p2.category, SUM(oi2.quantity) as total_quantity
    FROM products p2
    JOIN order_items oi2 ON p2.id = oi2.product_id
    GROUP BY p2.id, p2.category
  ) product_sales
  WHERE product_sales.category = p.category
)
ORDER BY total_sold DESC`,
  },
  {
    id: "string-functions",
    title: "String Functions",
    description: "Analyze and format user names.",
    difficulty: "intermediate",
    query: `SELECT 
  first_name,
  last_name,
  UPPER(first_name) as upper_first,
  LOWER(last_name) as lower_last,
  LENGTH(first_name || last_name) as name_length,
  CONCAT(LEFT(first_name, 1), '. ', last_name) as formatted_name
FROM users
ORDER BY name_length DESC`,
  },
];
