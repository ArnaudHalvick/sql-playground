import { createClient } from "@supabase/supabase-js";

// Create admin client with service role key
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check your .env.local file."
    );
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Execute a single SQL statement using run_query
async function executeStatement(client: any, statement: string): Promise<void> {
  const trimmed = statement.trim();
  if (!trimmed || trimmed.startsWith("--") || trimmed.startsWith("/*")) {
    return; // Skip comments and empty statements
  }

  try {
    const { data, error } = await client.rpc("run_query", {
      query_text: trimmed,
    });

    if (error) {
      throw new Error(`SQL Error: ${error.message}`);
    }

    // Check if the response indicates an error
    if (data && typeof data === "object" && data.error) {
      throw new Error(`SQL Error: ${data.message}`);
    }

    console.log(`✅ Executed: ${trimmed.substring(0, 50)}...`);
  } catch (error: any) {
    console.error(`❌ Failed: ${trimmed.substring(0, 50)}...`);
    throw error;
  }
}

/**
 * Fix the run_query function to handle multiple rows properly
 */
export async function fixRunQueryFunction(): Promise<void> {
  console.log("🔧 Fixing run_query function...");

  const client = createAdminClient();

  const fixedFunction = `
    CREATE OR REPLACE FUNCTION run_query(query_text TEXT)
    RETURNS JSONB
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    DECLARE
      result JSONB;
      rec RECORD;
      results JSONB := '[]'::JSONB;
    BEGIN
      -- Handle different types of queries
      IF UPPER(TRIM(query_text)) LIKE 'SELECT%' THEN
        -- For SELECT queries, collect all rows
        FOR rec IN EXECUTE query_text LOOP
          results := results || to_jsonb(rec);
        END LOOP;
        RETURN results;
      ELSE
        -- For non-SELECT queries (INSERT, UPDATE, DELETE, etc.)
        EXECUTE query_text;
        RETURN '{"success": true, "message": "Query executed successfully"}'::JSONB;
      END IF;
    EXCEPTION WHEN OTHERS THEN
      -- Return error as JSON instead of raising exception
      RETURN json_build_object(
        'error', true,
        'message', SQLERRM,
        'detail', SQLSTATE
      )::JSONB;
    END;
    $$
  `;

  try {
    await executeStatement(client, fixedFunction);
    console.log("✅ run_query function fixed successfully!");
  } catch (error) {
    console.error("❌ Failed to fix run_query function:", error);
    throw error;
  }
}

/**
 * Create all database tables
 */
export async function createTables(): Promise<void> {
  console.log("📋 Creating database tables...");

  const client = createAdminClient();

  const tableStatements = [
    `CREATE TABLE IF NOT EXISTS countries (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      code TEXT NOT NULL,
      continent TEXT NOT NULL
    )`,

    `CREATE TABLE IF NOT EXISTS cities (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      country_id INTEGER REFERENCES countries(id),
      population INTEGER
    )`,

    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      first_name TEXT NOT NULL,
      last_name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      country_id INTEGER REFERENCES countries(id),
      city_id INTEGER REFERENCES cities(id)
    )`,

    `CREATE TABLE IF NOT EXISTS products (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      category TEXT,
      stock INTEGER DEFAULT 0
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES users(id),
      total_amount DECIMAL(10, 2) NOT NULL,
      status TEXT DEFAULT 'pending',
      order_date DATE DEFAULT CURRENT_DATE,
      estimated_delivery DATE,
      delivery_date DATE
    )`,

    `CREATE TABLE IF NOT EXISTS order_items (
      id SERIAL PRIMARY KEY,
      order_id INTEGER REFERENCES orders(id),
      product_id INTEGER REFERENCES products(id),
      quantity INTEGER NOT NULL,
      price DECIMAL(10, 2) NOT NULL
    )`,
  ];

  for (const statement of tableStatements) {
    await executeStatement(client, statement);
  }

  console.log("✅ All tables created successfully!");
}

/**
 * Insert sample data into all tables
 */
export async function insertSampleData(): Promise<void> {
  console.log("📊 Inserting sample data...");

  const client = createAdminClient();

  // Countries data - expanded to 25 countries
  const countriesData = `
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
    ('China', 'CN', 'Asia'),
    ('Italy', 'IT', 'Europe'),
    ('Spain', 'ES', 'Europe'),
    ('Mexico', 'MX', 'North America'),
    ('Russia', 'RU', 'Europe'),
    ('South Korea', 'KR', 'Asia'),
    ('Netherlands', 'NL', 'Europe'),
    ('Sweden', 'SE', 'Europe'),
    ('Norway', 'NO', 'Europe'),
    ('Argentina', 'AR', 'South America'),
    ('South Africa', 'ZA', 'Africa'),
    ('Egypt', 'EG', 'Africa'),
    ('Thailand', 'TH', 'Asia'),
    ('Singapore', 'SG', 'Asia'),
    ('New Zealand', 'NZ', 'Oceania'),
    ('Switzerland', 'CH', 'Europe')
    ON CONFLICT DO NOTHING
  `;

  // Cities data - expanded to 50 cities
  const citiesData = `
    INSERT INTO cities (name, country_id, population) VALUES
    ('New York', 1, 8804190),
    ('Los Angeles', 1, 3898747),
    ('Chicago', 1, 2746388),
    ('Houston', 1, 2304580),
    ('Phoenix', 1, 1608139),
    ('London', 2, 8982000),
    ('Manchester', 2, 547627),
    ('Birmingham', 2, 1141816),
    ('Paris', 3, 2148271),
    ('Lyon', 3, 516092),
    ('Marseille', 3, 861635),
    ('Berlin', 4, 3669491),
    ('Munich', 4, 1488202),
    ('Hamburg', 4, 1899160),
    ('Tokyo', 5, 13960000),
    ('Osaka', 5, 2691185),
    ('Kyoto', 5, 1474570),
    ('Sydney', 6, 5312163),
    ('Melbourne', 6, 5078193),
    ('Brisbane', 6, 2560720),
    ('São Paulo', 7, 12325232),
    ('Rio de Janeiro', 7, 6748000),
    ('Brasília', 7, 3055149),
    ('Toronto', 8, 2930000),
    ('Vancouver', 8, 675218),
    ('Montreal', 8, 1780000),
    ('Mumbai', 9, 20411274),
    ('Delhi', 9, 32941309),
    ('Bangalore', 9, 12764935),
    ('Beijing', 10, 21540000),
    ('Shanghai', 10, 28516904),
    ('Guangzhou', 10, 18676605),
    ('Rome', 11, 2872800),
    ('Milan', 11, 1396059),
    ('Madrid', 12, 3223334),
    ('Barcelona', 12, 1620343),
    ('Mexico City', 13, 9209944),
    ('Guadalajara', 13, 1385629),
    ('Moscow', 14, 12506468),
    ('St. Petersburg', 14, 5384342),
    ('Seoul', 15, 9720846),
    ('Busan', 15, 3448737),
    ('Amsterdam', 16, 872680),
    ('Stockholm', 17, 975551),
    ('Oslo', 18, 697549),
    ('Buenos Aires', 19, 3054300),
    ('Cape Town', 20, 4618263),
    ('Cairo', 21, 10230350),
    ('Bangkok', 22, 10539415),
    ('Auckland', 24, 1695200)
    ON CONFLICT DO NOTHING
  `;

  // Users data - expanded to 50 users
  const usersData = `
    INSERT INTO users (first_name, last_name, email, country_id, city_id) VALUES
    ('John', 'Smith', 'john.smith@example.com', 1, 1),
    ('Emma', 'Johnson', 'emma.johnson@example.com', 2, 6),
    ('Pierre', 'Dupont', 'pierre.dupont@example.com', 3, 9),
    ('Hans', 'Müller', 'hans.muller@example.com', 4, 12),
    ('Yuki', 'Tanaka', 'yuki.tanaka@example.com', 5, 15),
    ('Olivia', 'Brown', 'olivia.brown@example.com', 6, 18),
    ('Carlos', 'Silva', 'carlos.silva@example.com', 7, 21),
    ('Michael', 'Wilson', 'michael.wilson@example.com', 8, 24),
    ('Raj', 'Patel', 'raj.patel@example.com', 9, 27),
    ('Li', 'Wei', 'li.wei@example.com', 10, 30),
    ('Sarah', 'Miller', 'sarah.miller@example.com', 1, 3),
    ('James', 'Taylor', 'james.taylor@example.com', 2, 7),
    ('Sophie', 'Martin', 'sophie.martin@example.com', 3, 10),
    ('Thomas', 'Weber', 'thomas.weber@example.com', 4, 13),
    ('Akira', 'Sato', 'akira.sato@example.com', 5, 16),
    ('Isabella', 'Garcia', 'isabella.garcia@example.com', 12, 35),
    ('Diego', 'Rodriguez', 'diego.rodriguez@example.com', 13, 37),
    ('Anna', 'Kowalski', 'anna.kowalski@example.com', 14, 39),
    ('Kim', 'Park', 'kim.park@example.com', 15, 41),
    ('Lars', 'Andersson', 'lars.andersson@example.com', 17, 44),
    ('Maria', 'Rossi', 'maria.rossi@example.com', 11, 33),
    ('Ahmed', 'Hassan', 'ahmed.hassan@example.com', 21, 48),
    ('Priya', 'Sharma', 'priya.sharma@example.com', 9, 28),
    ('Chen', 'Wang', 'chen.wang@example.com', 10, 31),
    ('Lucas', 'Santos', 'lucas.santos@example.com', 7, 22),
    ('Emily', 'Davis', 'emily.davis@example.com', 1, 4),
    ('Oliver', 'Wilson', 'oliver.wilson@example.com', 2, 8),
    ('Camille', 'Dubois', 'camille.dubois@example.com', 3, 11),
    ('Maximilian', 'Schmidt', 'maximilian.schmidt@example.com', 4, 14),
    ('Hiroshi', 'Yamamoto', 'hiroshi.yamamoto@example.com', 5, 17),
    ('Grace', 'Thompson', 'grace.thompson@example.com', 6, 19),
    ('Rafael', 'Oliveira', 'rafael.oliveira@example.com', 7, 23),
    ('Chloe', 'Anderson', 'chloe.anderson@example.com', 8, 25),
    ('Arjun', 'Kumar', 'arjun.kumar@example.com', 9, 29),
    ('Xiao', 'Liu', 'xiao.liu@example.com', 10, 32),
    ('Marco', 'Ferrari', 'marco.ferrari@example.com', 11, 34),
    ('Carmen', 'Lopez', 'carmen.lopez@example.com', 12, 36),
    ('Alejandro', 'Hernandez', 'alejandro.hernandez@example.com', 13, 38),
    ('Natasha', 'Volkov', 'natasha.volkov@example.com', 14, 40),
    ('Min-jun', 'Lee', 'minjun.lee@example.com', 15, 42),
    ('Pieter', 'Van Der Berg', 'pieter.vandenberg@example.com', 16, 43),
    ('Erik', 'Nilsson', 'erik.nilsson@example.com', 17, 44),
    ('Ingrid', 'Hansen', 'ingrid.hansen@example.com', 18, 45),
    ('Valentina', 'Morales', 'valentina.morales@example.com', 19, 46),
    ('Thabo', 'Mthembu', 'thabo.mthembu@example.com', 20, 47),
    ('Fatima', 'Al-Rashid', 'fatima.alrashid@example.com', 21, 48),
    ('Siriporn', 'Chaiyaporn', 'siriporn.chaiyaporn@example.com', 22, 49),
    ('Wei', 'Lim', 'wei.lim@example.com', 23, 23),
    ('Emma', 'Clarke', 'emma.clarke@example.com', 24, 50),
    ('Klaus', 'Zimmermann', 'klaus.zimmermann@example.com', 25, 25)
    ON CONFLICT (email) DO NOTHING
  `;

  // Products data - expanded to 40 products with integer prices
  const productsData = `
    INSERT INTO products (name, description, price, category, stock) VALUES
    ('Smartphone X', 'Latest smartphone with high-end features', 900, 'Electronics', 120),
    ('Laptop Pro', 'Professional laptop for creative work', 1300, 'Electronics', 50),
    ('Coffee Maker', 'Automatic coffee maker with timer', 80, 'Kitchen', 200),
    ('Running Shoes', 'Comfortable shoes for marathon runners', 130, 'Sports', 150),
    ('Wireless Headphones', 'Noise-canceling wireless headphones', 250, 'Electronics', 100),
    ('Yoga Mat', 'Non-slip yoga mat for home workouts', 30, 'Sports', 300),
    ('Blender', 'High-speed blender for smoothies', 70, 'Kitchen', 120),
    ('Winter Jacket', 'Waterproof jacket for cold weather', 160, 'Clothing', 80),
    ('Smart Watch', 'Fitness tracker and smartwatch', 200, 'Electronics', 75),
    ('Gaming Console', 'Next-gen gaming console', 500, 'Electronics', 30),
    ('Desk Chair', 'Ergonomic office chair', 250, 'Furniture', 40),
    ('Water Bottle', 'Insulated stainless steel bottle', 25, 'Sports', 200),
    ('Bluetooth Speaker', 'Portable wireless speaker', 90, 'Electronics', 60),
    ('Backpack', 'Water-resistant backpack for hiking', 80, 'Outdoors', 100),
    ('Digital Camera', 'Professional DSLR camera', 1300, 'Electronics', 25),
    ('Electric Kettle', 'Fast-boiling electric kettle', 45, 'Kitchen', 150),
    ('Tennis Racket', 'Professional tennis racket', 180, 'Sports', 60),
    ('Sunglasses', 'UV protection sunglasses', 120, 'Accessories', 200),
    ('Mechanical Keyboard', 'RGB mechanical gaming keyboard', 150, 'Electronics', 80),
    ('Wireless Mouse', 'Ergonomic wireless mouse', 60, 'Electronics', 120),
    ('Hoodie', 'Comfortable cotton hoodie', 55, 'Clothing', 100),
    ('Jeans', 'Classic denim jeans', 85, 'Clothing', 150),
    ('Sneakers', 'Casual everyday sneakers', 95, 'Clothing', 180),
    ('Tablet', '10-inch tablet for productivity', 400, 'Electronics', 70),
    ('Monitor', '27-inch 4K monitor', 350, 'Electronics', 45),
    ('Desk Lamp', 'LED desk lamp with adjustable brightness', 40, 'Furniture', 90),
    ('Plant Pot', 'Ceramic plant pot with drainage', 20, 'Home & Garden', 250),
    ('Book Light', 'Rechargeable LED book light', 15, 'Accessories', 300),
    ('Protein Powder', 'Whey protein powder 2kg', 65, 'Health', 80),
    ('Resistance Bands', 'Set of 5 resistance bands', 35, 'Sports', 120),
    ('Air Fryer', 'Compact air fryer for healthy cooking', 110, 'Kitchen', 60),
    ('Pillow', 'Memory foam pillow', 50, 'Home & Garden', 200),
    ('Umbrella', 'Compact travel umbrella', 25, 'Accessories', 150),
    ('Phone Case', 'Protective phone case', 20, 'Accessories', 400),
    ('Charger Cable', 'USB-C charging cable 2m', 15, 'Electronics', 500),
    ('Notebook', 'Hardcover lined notebook', 12, 'Stationery', 300),
    ('Pen Set', 'Set of 10 ballpoint pens', 8, 'Stationery', 250),
    ('Wall Clock', 'Modern minimalist wall clock', 35, 'Home & Garden', 100),
    ('Candle', 'Scented soy candle', 18, 'Home & Garden', 180),
    ('Mug', 'Ceramic coffee mug', 12, 'Kitchen', 220)
    ON CONFLICT DO NOTHING
  `;

  const dataInserts = [
    { name: "countries", sql: countriesData },
    { name: "cities", sql: citiesData },
    { name: "users", sql: usersData },
    { name: "products", sql: productsData },
  ];

  for (const { name, sql } of dataInserts) {
    console.log(`📊 Inserting ${name} data...`);
    await executeStatement(client, sql);
  }

  // Insert orders and order items - expanded significantly
  console.log("📊 Inserting orders data...");
  const ordersData = `
    INSERT INTO orders (user_id, total_amount, status, order_date, estimated_delivery, delivery_date) VALUES
    (1, 1150, 'delivered', '2024-01-15', '2024-01-20', '2024-01-19'),
    (2, 1550, 'delivered', '2024-01-16', '2024-01-21', '2024-01-22'),
    (3, 700, 'delivered', '2024-01-18', '2024-01-23', '2024-01-23'),
    (4, 1750, 'delivered', '2024-01-20', '2024-01-25', '2024-01-24'),
    (5, 1150, 'delivered', '2024-01-22', '2024-01-27', '2024-01-28'),
    (6, 330, 'delivered', '2024-01-25', '2024-01-30', '2024-01-29'),
    (7, 580, 'delivered', '2024-01-28', '2024-02-02', '2024-02-01'),
    (8, 900, 'delivered', '2024-02-01', '2024-02-06', '2024-02-07'),
    (9, 450, 'delivered', '2024-02-03', '2024-02-08', '2024-02-08'),
    (10, 1800, 'delivered', '2024-02-05', '2024-02-10', '2024-02-09'),
    (11, 275, 'delivered', '2024-02-08', '2024-02-13', '2024-02-14'),
    (12, 620, 'delivered', '2024-02-10', '2024-02-15', '2024-02-15'),
    (13, 890, 'delivered', '2024-02-12', '2024-02-17', '2024-02-16'),
    (14, 1200, 'delivered', '2024-02-15', '2024-02-20', '2024-02-21'),
    (15, 340, 'delivered', '2024-02-18', '2024-02-23', '2024-02-22'),
    (16, 750, 'delivered', '2024-02-20', '2024-02-25', '2024-02-26'),
    (17, 480, 'delivered', '2024-02-22', '2024-02-27', '2024-02-27'),
    (18, 1100, 'delivered', '2024-02-25', '2024-03-01', '2024-02-29'),
    (19, 290, 'delivered', '2024-02-28', '2024-03-05', '2024-03-04'),
    (20, 850, 'delivered', '2024-03-02', '2024-03-07', '2024-03-08'),
    (21, 520, 'delivered', '2024-03-05', '2024-03-10', '2024-03-09'),
    (22, 1400, 'delivered', '2024-03-08', '2024-03-13', '2024-03-14'),
    (23, 380, 'delivered', '2024-03-10', '2024-03-15', '2024-03-15'),
    (24, 670, 'delivered', '2024-03-12', '2024-03-17', '2024-03-16'),
    (25, 920, 'delivered', '2024-03-15', '2024-03-20', '2024-03-21'),
    (26, 180, 'pending', '2024-12-20', '2024-12-27', NULL),
    (27, 450, 'pending', '2024-12-21', '2024-12-28', NULL),
    (28, 320, 'pending', '2024-12-22', '2024-12-29', NULL),
    (29, 780, 'pending', '2024-12-23', '2024-12-30', NULL),
    (30, 1050, 'pending', '2024-12-24', '2024-12-31', NULL),
    (31, 240, 'pending', '2024-12-25', '2025-01-02', NULL),
    (32, 560, 'pending', '2024-12-26', '2025-01-03', NULL),
    (33, 890, 'pending', '2024-12-27', '2025-01-04', NULL),
    (34, 1300, 'delivered', '2024-03-18', '2024-03-23', '2024-03-22'),
    (35, 420, 'delivered', '2024-03-20', '2024-03-25', '2024-03-26'),
    (36, 680, 'cancelled', '2024-03-22', NULL, NULL),
    (37, 150, 'cancelled', '2024-03-25', NULL, NULL),
    (38, 950, 'cancelled', '2024-03-28', NULL, NULL),
    (39, 370, 'cancelled', '2024-04-01', NULL, NULL),
    (40, 1150, 'cancelled', '2024-04-03', NULL, NULL)
    ON CONFLICT DO NOTHING
  `;

  await executeStatement(client, ordersData);

  console.log("📊 Inserting order items data...");
  const orderItemsData = `
    INSERT INTO order_items (order_id, product_id, quantity, price) VALUES
    (1, 1, 1, 900),
    (1, 3, 1, 80),
    (1, 12, 1, 25),
    (1, 16, 3, 45),
    (2, 2, 1, 1300),
    (2, 5, 1, 250),
    (3, 9, 1, 200),
    (3, 4, 2, 130),
    (3, 6, 4, 30),
    (3, 29, 1, 65),
    (4, 2, 1, 1300),
    (4, 10, 1, 500),
    (5, 1, 1, 900),
    (5, 9, 1, 200),
    (5, 33, 2, 25),
    (6, 8, 1, 160),
    (6, 4, 1, 130),
    (6, 34, 2, 20),
    (7, 10, 1, 500),
    (7, 14, 1, 80),
    (8, 1, 1, 900),
    (9, 5, 1, 250),
    (9, 9, 1, 200),
    (10, 15, 1, 1300),
    (10, 10, 1, 500),
    (11, 21, 3, 55),
    (11, 22, 1, 85),
    (11, 33, 1, 25),
    (11, 38, 3, 35),
    (12, 24, 1, 400),
    (12, 19, 1, 150),
    (12, 20, 1, 60),
    (13, 1, 1, 900),
    (14, 2, 1, 1300),
    (15, 17, 1, 180),
    (15, 18, 1, 120),
    (15, 34, 2, 20),
    (16, 25, 2, 350),
    (16, 26, 1, 40),
    (17, 31, 1, 110),
    (17, 7, 1, 70),
    (17, 3, 1, 80),
    (17, 27, 9, 20),
    (18, 2, 1, 1300),
    (19, 28, 1, 15),
    (19, 29, 1, 65),
    (19, 30, 1, 35),
    (19, 32, 3, 50),
    (19, 36, 1, 12),
    (20, 1, 1, 900),
    (21, 13, 1, 90),
    (21, 5, 1, 250),
    (21, 12, 7, 25),
    (22, 15, 1, 1300),
    (22, 19, 1, 150),
    (23, 23, 4, 95),
    (24, 11, 1, 250),
    (24, 26, 1, 40),
    (24, 27, 19, 20),
    (25, 1, 1, 900),
    (25, 34, 1, 20),
    (26, 35, 12, 15),
    (27, 4, 2, 130),
    (27, 6, 6, 30),
    (28, 40, 15, 12),
    (28, 39, 10, 18),
    (29, 24, 1, 400),
    (29, 25, 1, 350),
    (29, 34, 1, 20),
    (30, 2, 1, 1300),
    (31, 37, 30, 8),
    (32, 13, 1, 90),
    (32, 5, 1, 250),
    (32, 12, 8, 25),
    (33, 1, 1, 900),
    (34, 2, 1, 1300),
    (35, 31, 1, 110),
    (35, 7, 1, 70),
    (35, 3, 1, 80),
    (35, 27, 8, 20),
    (36, 28, 10, 15),
    (37, 36, 12, 12),
    (37, 34, 1, 20),
    (38, 1, 1, 900),
    (38, 33, 2, 25),
    (39, 23, 2, 95),
    (39, 12, 7, 25),
    (39, 34, 2, 20),
    (40, 2, 1, 1300)
    ON CONFLICT DO NOTHING
  `;

  await executeStatement(client, orderItemsData);

  console.log("✅ All sample data inserted successfully!");
}

/**
 * Drop all tables in correct order
 */
export async function dropAllTables(): Promise<void> {
  console.log("🗑️ Dropping all tables...");

  const client = createAdminClient();

  const dropStatements = [
    "DROP TABLE IF EXISTS order_items CASCADE",
    "DROP TABLE IF EXISTS orders CASCADE",
    "DROP TABLE IF EXISTS products CASCADE",
    "DROP TABLE IF EXISTS users CASCADE",
    "DROP TABLE IF EXISTS cities CASCADE",
    "DROP TABLE IF EXISTS countries CASCADE",
  ];

  for (const statement of dropStatements) {
    await executeStatement(client, statement);
  }

  console.log("✅ All tables dropped successfully!");
}

/**
 * Set up the complete database from scratch
 */
export async function setupDatabase(): Promise<void> {
  console.log("🚀 Setting up SQL Playground database...");

  try {
    await fixRunQueryFunction();
    await createTables();
    await insertSampleData();

    console.log("🎉 Database setup completed successfully!");
    console.log("📊 Your database now contains:");
    console.log("   • 25 countries with sample data");
    console.log("   • 50 cities with population data");
    console.log("   • 50 users with realistic profiles");
    console.log("   • 40 products across various categories");
    console.log("   • 40 orders with multiple statuses");
    console.log("   • Extensive order items data");
    console.log("   • Working run_query() function");
  } catch (error) {
    console.error("💥 Database setup failed:", error);
    throw error;
  }
}

/**
 * Reset the database by dropping and recreating everything
 */
export async function resetDatabase(): Promise<void> {
  console.log("🔄 Resetting SQL Playground database...");

  try {
    await dropAllTables();
    await setupDatabase();

    console.log("🎉 Database reset completed successfully!");
  } catch (error) {
    console.error("💥 Database reset failed:", error);
    throw error;
  }
}

/**
 * Check database health and return table information
 */
export async function getDatabaseInfo(): Promise<any> {
  console.log("📊 Checking database information...");

  const client = createAdminClient();

  try {
    const tables = [
      "countries",
      "cities",
      "users",
      "products",
      "orders",
      "order_items",
    ];
    const results: any = {};

    for (const table of tables) {
      try {
        const { data, error } = await client.rpc("run_query", {
          query_text: `SELECT COUNT(*) as count FROM ${table}`,
        });

        if (error || (data && data.error)) {
          results[table] = { error: "Table does not exist or query failed" };
        } else {
          results[table] = { count: data?.[0]?.count || 0 };
        }
      } catch (error) {
        results[table] = { error: "Table does not exist or query failed" };
      }
    }

    console.log("📊 Database info retrieved:", results);
    return results;
  } catch (error) {
    console.error("💥 Failed to get database info:", error);
    throw error;
  }
}

/**
 * Execute a custom SQL query safely
 */
export async function executeQuery(query: string): Promise<any> {
  console.log("🔍 Executing custom query...");

  const client = createAdminClient();

  try {
    const { data, error } = await client.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      throw new Error(`Query execution failed: ${error.message}`);
    }

    console.log("✅ Query executed successfully");
    return data;
  } catch (error) {
    console.error("❌ Query execution failed:", error);
    throw error;
  }
}

/**
 * Utility to create the exec_sql RPC function if it doesn't exist
 * This is needed for the database manager to work
 */
export async function ensureExecSqlFunction(): Promise<void> {
  const client = createAdminClient();

  const createExecSqlFunction = `
    CREATE OR REPLACE FUNCTION exec_sql(sql_query TEXT)
    RETURNS VOID
    LANGUAGE plpgsql
    SECURITY DEFINER
    AS $$
    BEGIN
      EXECUTE sql_query;
    END;
    $$;
  `;

  try {
    const { error } = await client
      .from("pg_proc")
      .select("proname")
      .eq("proname", "exec_sql")
      .single();

    if (error) {
      // Function doesn't exist, create it
      await client.rpc("exec", { sql: createExecSqlFunction });
      console.log("✅ Created exec_sql function");
    }
  } catch (error) {
    // Try to create the function directly
    try {
      await client.rpc("exec", { sql: createExecSqlFunction });
      console.log("✅ Created exec_sql function");
    } catch (createError) {
      console.warn(
        "⚠️ Could not create exec_sql function. Manual setup may be required."
      );
    }
  }
}
