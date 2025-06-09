import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { join } from "path";

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

// Read migration files
function getMigrationContent(filename: string): string {
  try {
    const migrationPath = join(
      process.cwd(),
      "supabase",
      "migrations",
      filename
    );
    return readFileSync(migrationPath, "utf-8");
  } catch (error) {
    throw new Error(`Failed to read migration file ${filename}: ${error}`);
  }
}

// Execute SQL with proper error handling
async function executeSql(client: any, sql: string, description: string) {
  try {
    console.log(`Executing: ${description}`);
    const { error } = await client.rpc("exec_sql", { sql_query: sql });

    if (error) {
      throw new Error(
        `SQL execution failed for ${description}: ${error.message}`
      );
    }

    console.log(`✅ Successfully executed: ${description}`);
  } catch (error) {
    console.error(`❌ Failed to execute ${description}:`, error);
    throw error;
  }
}

/**
 * Set up the database with all tables and sample data
 */
export async function setupDatabase(): Promise<void> {
  console.log("🚀 Starting database setup...");

  const client = createAdminClient();

  try {
    // Read migration files
    const migration1 = getMigrationContent("20250605155824_silent_night.sql");
    const migration2 = getMigrationContent("20250605155926_dusty_wind.sql");

    // Execute migrations in order
    await executeSql(client, migration1, "Initial schema and data migration");
    await executeSql(client, migration2, "RPC function creation");

    console.log("🎉 Database setup completed successfully!");
  } catch (error) {
    console.error("💥 Database setup failed:", error);
    throw error;
  }
}

/**
 * Reset the database by dropping all tables and recreating them
 */
export async function resetDatabase(): Promise<void> {
  console.log("🔄 Starting database reset...");

  const client = createAdminClient();

  try {
    // Drop all tables and functions in correct order (reverse of creation due to foreign keys)
    const dropSql = `
      -- Drop all tables (in correct order due to foreign keys)
      DROP TABLE IF EXISTS order_items CASCADE;
      DROP TABLE IF EXISTS orders CASCADE;
      DROP TABLE IF EXISTS products CASCADE;
      DROP TABLE IF EXISTS users CASCADE;
      DROP TABLE IF EXISTS cities CASCADE;
      DROP TABLE IF EXISTS countries CASCADE;
      DROP FUNCTION IF EXISTS run_query(TEXT);
    `;

    await executeSql(client, dropSql, "Dropping existing tables and functions");

    // Recreate everything
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
    const queries = [
      { name: "countries", query: "SELECT COUNT(*) as count FROM countries" },
      { name: "cities", query: "SELECT COUNT(*) as count FROM cities" },
      { name: "users", query: "SELECT COUNT(*) as count FROM users" },
      { name: "products", query: "SELECT COUNT(*) as count FROM products" },
      { name: "orders", query: "SELECT COUNT(*) as count FROM orders" },
      {
        name: "order_items",
        query: "SELECT COUNT(*) as count FROM order_items",
      },
    ];

    const results: any = {};

    for (const { name, query } of queries) {
      try {
        const { data, error } = await client.rpc("run_query", {
          query_text: query,
        });
        if (error) {
          results[name] = { error: error.message };
        } else {
          results[name] = { count: data?.[0]?.count || 0 };
        }
      } catch (error) {
        results[name] = { error: "Table does not exist or query failed" };
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
