#!/usr/bin/env node

/**
 * Advanced Database Setup CLI
 * Demonstrates the new configurable data generation system
 */

require("dotenv").config({ path: ".env.local" });

// Helper function to get dynamic date range
function getDynamicDateRange() {
  const now = new Date();

  // Start from 2 years ago to have good historical data
  const startDate = new Date(now);
  startDate.setFullYear(startDate.getFullYear() - 2);
  const start = startDate.toISOString().split("T")[0];

  // End today (orders are placed up to today, not in the future)
  const end = now.toISOString().split("T")[0];

  return { start, end };
}

async function main() {
  const command = process.argv[2];
  const amount = process.argv[3];

  console.log("🎯 Advanced SQL Playground Database Manager\n");

  // Import compiled JavaScript version
  try {
    const dbManager = require("./database-manager.js");

    switch (command) {
      case "small":
        console.log("🔧 Setting up small database...");
        const smallConfig = {
          countries: 10,
          cities: 20,
          users: 50,
          products: 50,
          orders: 100,
          orderItemsPerOrder: { min: 1, max: 3 },
          dateRange: getDynamicDateRange(),
        };
        await dbManager.setupDatabase(smallConfig);
        break;

      case "medium":
        console.log("🔧 Setting up medium database...");
        const mediumConfig = {
          countries: 20,
          cities: 40,
          users: 200,
          products: 150,
          orders: 500,
          orderItemsPerOrder: { min: 1, max: 5 },
          dateRange: getDynamicDateRange(),
        };
        await dbManager.setupDatabase(mediumConfig);
        break;

      case "large":
        console.log("🔧 Setting up large database...");
        await dbManager.setupLargeDatabase();
        break;

      case "custom":
        if (!amount || isNaN(amount)) {
          console.log(
            "❌ Please provide a multiplier for custom setup (e.g., 'custom 2' for 2x default)"
          );
          return;
        }

        const multiplier = parseInt(amount);
        console.log(
          `🔧 Setting up custom database with ${multiplier}x multiplier...`
        );

        const customConfig = {
          countries: Math.min(30, 25 * multiplier), // Cap at 30 countries
          cities: Math.min(100, 50 * multiplier), // Cap at 100 cities
          users: 100 * multiplier,
          products: 100 * multiplier,
          orders: 500 * multiplier,
          orderItemsPerOrder: { min: 1, max: Math.min(8, 3 + multiplier) },
          dateRange: getDynamicDateRange(),
        };
        await dbManager.setupDatabase(customConfig);
        break;

      case "realistic":
        console.log("🔧 Setting up realistic e-commerce database...");
        const realisticConfig = {
          countries: 25,
          cities: 75,
          users: 500,
          products: 300,
          orders: 1500,
          orderItemsPerOrder: { min: 1, max: 6 },
          dateRange: getDynamicDateRange(),
        };
        await dbManager.setupDatabase(realisticConfig);
        break;

      default:
        console.log("Advanced Database Setup Options:");
        console.log("================================");
        console.log(
          "  npm run db:setup-small     - Small dataset (50 users, 100 orders)"
        );
        console.log(
          "  npm run db:setup-medium    - Medium dataset (200 users, 500 orders)"
        );
        console.log(
          "  npm run db:setup-large     - Large dataset (1000 users, 2000 orders)"
        );
        console.log(
          "  npm run db:setup-realistic - Realistic e-commerce (500 users, 1500 orders)"
        );
        console.log(
          "  npm run db:setup-custom X  - Custom with X multiplier (e.g., 'custom 3')"
        );
        console.log("");
        console.log("Features:");
        console.log("• Configurable number of records per table");
        console.log("• Random but realistic user names and emails");
        console.log("• Dynamic product generation with descriptions");
        console.log("• Smart order date distribution (2 years ago to today)");
        console.log("• Realistic order statuses (delivered/pending/cancelled)");
        console.log("• Proper delivery date logic (past/present/future/null)");
        console.log("• Batch processing for large datasets");
        console.log("");
        console.log("Challenge Mode (Data Quality Issues):");
        console.log("====================================");
        console.log(
          "  npm run db:challenge-light  - Light errors (2-5% error rates)"
        );
        console.log(
          "  npm run db:challenge-medium - Medium errors (5-15% error rates)"
        );
        console.log(
          "  npm run db:challenge-heavy  - Heavy errors (10-25% error rates)"
        );
        console.log(
          "  npm run db:challenge-custom X - Custom error rate (e.g., 'custom 12')"
        );
        console.log("");
        console.log("Challenge Features:");
        console.log("• Invalid email formats for validation practice");
        console.log("• Delivery date inconsistencies");
        console.log("• Pricing anomalies (negative, zero, excessive prices)");
        console.log("• Location relationship errors");
        console.log("• Quantity validation issues");
        console.log("• Perfect for data quality audit practice");
        console.log("");
        console.log("Make sure your .env.local file contains:");
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
