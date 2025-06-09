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

// Setup database
async function setupDatabase() {
  console.log("🚀 Setting up SQL Playground database...\n");

  // Check if database already has data
  const client = createAdminClient();

  try {
    const { count } = await client
      .from("users")
      .select("*", { count: "exact", head: true });

    if (count > 0) {
      console.log("✅ Database already contains data!");
      console.log(`   Found ${count} users in the database`);
      console.log("\n📊 Current database status:");
      await getDatabaseInfo();
      console.log(
        "\n💡 If you want to reset the database, use: npm run db:reset"
      );
      return;
    }
  } catch (error) {
    // Table might not exist, continue with setup
  }

  console.log("🔄 For database setup, please use the manual method:");
  console.log("1. Go to your Supabase dashboard → SQL Editor");
  console.log(
    "2. Copy the contents of supabase/migrations/20250605155824_silent_night.sql"
  );
  console.log("3. Paste and run it in the SQL Editor");
  console.log(
    "4. Copy the contents of supabase/migrations/20250605155926_dusty_wind.sql"
  );
  console.log("5. Paste and run it in the SQL Editor");
  console.log("\nThis is the safest way to set up your database.");
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

  console.log("\n🔄 For database reset, please use the manual method:");
  console.log("1. Go to your Supabase dashboard → SQL Editor");
  console.log("2. Copy the contents of supabase/reset-database.sql");
  console.log("3. Paste and run it in the SQL Editor");
  console.log("\nThis will:");
  console.log("   • Drop all existing tables and functions");
  console.log("   • Recreate all tables with proper relationships");
  console.log("   • Insert fresh sample data");
  console.log("   • Recreate the run_query() function");
  console.log(
    "\nThis is the safest way to reset your database with the current setup."
  );
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
