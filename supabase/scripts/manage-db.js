#!/usr/bin/env node

/**
 * SQL Playground Database Manager
 *
 * A simple CLI tool to manage your Supabase database for the SQL playground.
 *
 * Usage:
 *   node manage-db.js setup    - Set up the database with sample data
 *   node manage-db.js reset    - Reset the database to original state
 *   node manage-db.js info     - Show database information
 *   node manage-db.js query    - Execute a custom query
 */

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Load environment variables
require("dotenv").config({ path: path.join(process.cwd(), ".env.local") });

// Create Supabase client
function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !serviceRoleKey) {
    console.error("❌ Missing Supabase environment variables.");
    console.error(
      "Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local"
    );
    process.exit(1);
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

// Read migration files
function getMigrationContent(filename) {
  try {
    const migrationPath = path.join(__dirname, "..", "migrations", filename);
    return fs.readFileSync(migrationPath, "utf-8");
  } catch (error) {
    throw new Error(
      `Failed to read migration file ${filename}: ${error.message}`
    );
  }
}

// Execute SQL with error handling
async function executeSql(client, sql, description) {
  try {
    console.log(`🔄 ${description}...`);

    // Split SQL into individual statements and execute them one by one
    const statements = sql
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"));

    for (const statement of statements) {
      if (statement.trim()) {
        try {
          // Use run_query for individual statements
          const { error } = await client.rpc("run_query", {
            query_text: statement,
          });
          if (error) {
            console.warn(`⚠️  Statement warning: ${error.message}`);
            // Don't throw for warnings, continue with next statement
          }
        } catch (stmtError) {
          // Some statements might fail (like DROP IF EXISTS on non-existent tables)
          // This is expected behavior, so we'll log but continue
          console.warn(
            `⚠️  Statement skipped: ${stmtError.message.substring(0, 100)}...`
          );
        }
      }
    }

    console.log(`✅ ${description} completed`);
  } catch (error) {
    console.error(`❌ ${description} failed:`, error.message);
    throw error;
  }
}

// Execute a single SQL statement using run_query
async function executeStatement(client, statement) {
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
  } catch (error) {
    console.error(`❌ Failed: ${trimmed.substring(0, 50)}...`);
    throw error;
  }
}

// Fix the run_query function
async function fixRunQueryFunction() {
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

// Setup database
async function setupDatabase() {
  console.log("🚀 Setting up SQL Playground database...\n");

  try {
    const client = createAdminClient();

    // First fix the run_query function
    await fixRunQueryFunction();

    // Create tables
    console.log("📋 Creating database tables...");
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
        city_id INTEGER REFERENCES cities(id),
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category TEXT,
        stock INTEGER DEFAULT 0,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        total_amount DECIMAL(10, 2) NOT NULL,
        status TEXT DEFAULT 'pending',
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`,
      `CREATE TABLE IF NOT EXISTS order_items (
        id SERIAL PRIMARY KEY,
        order_id INTEGER REFERENCES orders(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW()
      )`,
    ];

    for (const statement of tableStatements) {
      await executeStatement(client, statement);
    }

    // Insert sample data
    console.log("📊 Inserting sample data...");

    // Countries
    await executeStatement(
      client,
      `
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
      ('China', 'CN', 'Asia')
      ON CONFLICT DO NOTHING
    `
    );

    // Cities
    await executeStatement(
      client,
      `
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
      ('Munich', 4, 1488202)
      ON CONFLICT DO NOTHING
    `
    );

    // Users
    await executeStatement(
      client,
      `
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
      ('Akira', 'Sato', 'akira.sato@example.com', 5, 6, NOW() - INTERVAL '20 days')
      ON CONFLICT (email) DO NOTHING
    `
    );

    // Products
    await executeStatement(
      client,
      `
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
      ('Digital Camera', 'Professional DSLR camera', 1299.99, 'Electronics', 25, NOW() - INTERVAL '30 days')
      ON CONFLICT DO NOTHING
    `
    );

    // Orders
    await executeStatement(
      client,
      `
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
      (10, 1799.97, 'completed', NOW() - INTERVAL '160 days')
      ON CONFLICT DO NOTHING
    `
    );

    // Order items
    await executeStatement(
      client,
      `
      INSERT INTO order_items (order_id, product_id, quantity, price, created_at) VALUES
      (1, 1, 1, 899.99, NOW() - INTERVAL '340 days'),
      (1, 3, 1, 79.99, NOW() - INTERVAL '340 days'),
      (1, 12, 1, 24.99, NOW() - INTERVAL '340 days'),
      (2, 2, 1, 1299.99, NOW() - INTERVAL '320 days'),
      (2, 5, 1, 249.99, NOW() - INTERVAL '320 days'),
      (3, 9, 1, 199.99, NOW() - INTERVAL '300 days'),
      (3, 4, 2, 129.99, NOW() - INTERVAL '300 days'),
      (4, 2, 1, 1299.99, NOW() - INTERVAL '280 days'),
      (4, 10, 1, 499.99, NOW() - INTERVAL '280 days'),
      (5, 1, 1, 899.99, NOW() - INTERVAL '260 days'),
      (5, 9, 1, 199.99, NOW() - INTERVAL '260 days'),
      (6, 8, 1, 159.99, NOW() - INTERVAL '240 days'),
      (6, 4, 1, 129.99, NOW() - INTERVAL '240 days'),
      (7, 10, 1, 499.99, NOW() - INTERVAL '220 days'),
      (7, 14, 1, 79.99, NOW() - INTERVAL '220 days'),
      (8, 1, 1, 899.99, NOW() - INTERVAL '200 days'),
      (9, 5, 1, 249.99, NOW() - INTERVAL '180 days'),
      (9, 9, 1, 199.99, NOW() - INTERVAL '180 days'),
      (10, 15, 1, 1299.99, NOW() - INTERVAL '160 days'),
      (10, 10, 1, 499.99, NOW() - INTERVAL '160 days')
      ON CONFLICT DO NOTHING
    `
    );

    console.log("🎉 Database setup completed successfully!");
    console.log("📊 Your database now contains:");
    console.log("   • 10 countries with sample data");
    console.log("   • 15 cities with population data");
    console.log("   • 15 users with realistic profiles");
    console.log("   • 15 products across various categories");
    console.log("   • Sample orders and order items");
    console.log("   • Working run_query() function");
  } catch (error) {
    console.error("💥 Setup failed:", error.message);
    console.log("\n🔄 Alternative: Use the Database Manager in the app");
    console.log("1. Go to the Schema tab in your SQL Playground app");
    console.log("2. Click 'Setup DB' button");
    console.log(
      "3. Or use the 'Fix Query Fn' button if queries aren't working"
    );
  }
}

// Reset database
async function resetDatabase() {
  console.log("🔄 Resetting SQL Playground database...\n");

  // Confirm reset
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const answer = await new Promise((resolve) => {
    rl.question(
      "⚠️  This will delete ALL data and recreate the database. Continue? (y/N): ",
      resolve
    );
  });

  rl.close();

  if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
    console.log("❌ Reset cancelled");
    return;
  }

  try {
    const client = createAdminClient();

    // Drop all tables
    console.log("🗑️ Dropping all tables...");
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

    // Now run setup to recreate everything
    await setupDatabase();
  } catch (error) {
    console.error("💥 Reset failed:", error.message);
    console.log("\n🔄 Alternative: Use the Database Manager in the app");
    console.log("1. Go to the Schema tab in your SQL Playground app");
    console.log("2. Click 'Reset DB' button");
    console.log(
      "3. Or use the manual reset script in supabase/reset-database.sql"
    );
  }
}

// Get database info
async function getDatabaseInfo() {
  console.log("📊 Checking database information...\n");

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

    console.log("Table Information:");
    console.log("==================");

    for (const table of tables) {
      try {
        const { count, error } = await client
          .from(table)
          .select("*", { count: "exact", head: true });

        if (error) {
          console.log(`❌ ${table.padEnd(12)}: Error - ${error.message}`);
        } else {
          console.log(`✅ ${table.padEnd(12)}: ${count || 0} records`);
        }
      } catch (error) {
        console.log(`❌ ${table.padEnd(12)}: Table not found or inaccessible`);
      }
    }

    // Test run_query function
    try {
      const { data, error } = await client.rpc("run_query", {
        query_text: "SELECT COUNT(*) as total FROM users",
      });

      if (error) {
        console.log("\n❌ run_query function: Not working");
      } else {
        console.log("\n✅ run_query function: Working correctly");
      }
    } catch (error) {
      console.log("\n❌ run_query function: Not available");
    }
  } catch (error) {
    console.error("\n💥 Failed to get database info:", error.message);
    process.exit(1);
  }
}

// Execute custom query
async function executeCustomQuery() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const query = await new Promise((resolve) => {
    rl.question("Enter your SQL query: ", resolve);
  });

  rl.close();

  if (!query.trim()) {
    console.log("❌ No query provided");
    return;
  }

  console.log(`\n🔍 Executing query: ${query}\n`);

  const client = createAdminClient();

  try {
    const { data, error } = await client.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      console.error("❌ Query failed:", error.message);
    } else {
      console.log("✅ Query results:");
      console.table(data);
    }
  } catch (error) {
    console.error("💥 Query execution failed:", error.message);
  }
}

// Main CLI handler
async function main() {
  const command = process.argv[2];

  console.log("🎯 SQL Playground Database Manager\n");

  switch (command) {
    case "setup":
      await setupDatabase();
      break;

    case "reset":
      await resetDatabase();
      break;

    case "info":
      await getDatabaseInfo();
      break;

    case "query":
      await executeCustomQuery();
      break;

    case "fix":
      await fixRunQueryFunction();
      break;

    default:
      console.log("Usage:");
      console.log(
        "  node manage-db.js setup    - Set up the database with sample data"
      );
      console.log(
        "  node manage-db.js reset    - Reset the database to original state"
      );
      console.log("  node manage-db.js info     - Show database information");
      console.log("  node manage-db.js query    - Execute a custom query");
      console.log("  node manage-db.js fix      - Fix the run_query function");
      console.log("\nMake sure your .env.local file contains:");
      console.log("  NEXT_PUBLIC_SUPABASE_URL=your_project_url");
      console.log("  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key");
      break;
  }
}

// Run the CLI
if (require.main === module) {
  main().catch((error) => {
    console.error("💥 Unexpected error:", error);
    process.exit(1);
  });
}

module.exports = {
  setupDatabase,
  resetDatabase,
  getDatabaseInfo,
  executeCustomQuery,
};
