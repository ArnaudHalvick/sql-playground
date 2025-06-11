#!/usr/bin/env node

/**
 * CLI wrapper for database operations
 * Uses the same database-manager.ts functions as the web interface
 */

require("dotenv").config({ path: ".env.local" });

async function main() {
  const command = process.argv[2];

  console.log("🎯 SQL Playground Database Manager\n");

  // Import compiled JavaScript version
  try {
    const dbManager = require("./database-manager.js");

    switch (command) {
      case "setup":
        await dbManager.setupDatabase();
        break;

      case "info":
        const info = await dbManager.getDatabaseInfo();
        console.log("\nTable Information:");
        console.log("==================");
        Object.entries(info).forEach(([table, data]) => {
          if (data.error) {
            console.log(`❌ ${table.padEnd(12)}: ${data.error}`);
          } else {
            console.log(`✅ ${table.padEnd(12)}: ${data.count} records`);
          }
        });
        break;

      case "fix":
        await dbManager.fixRunQueryFunction();
        break;

      default:
        console.log("Usage:");
        console.log(
          "  npm run db:setup    - Set up the database with sample data (default config)"
        );
        console.log("  npm run db:info     - Show database information");
        console.log("  npm run db:fix      - Fix the run_query function");
        console.log("\nAdvanced Setup Options:");
        console.log(
          "  npm run db:setup-small      - Small dataset (50 users, 100 orders)"
        );
        console.log(
          "  npm run db:setup-medium     - Medium dataset (200 users, 500 orders)"
        );
        console.log(
          "  npm run db:setup-large      - Large dataset (1000 users, 2000 orders)"
        );
        console.log(
          "  npm run db:setup-realistic  - Realistic e-commerce (500 users, 1500 orders)"
        );
        console.log("  npm run db:setup-custom X   - Custom with X multiplier");
        console.log("\nMake sure your .env.local file contains:");
        console.log("  NEXT_PUBLIC_SUPABASE_URL=your_project_url");
        console.log("  SUPABASE_SERVICE_ROLE_KEY=your_service_role_key");
        break;
    }
  } catch (error) {
    console.error("💥 Operation failed:", error.message);
    process.exit(1);
  }
}

main();
