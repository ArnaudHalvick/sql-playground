#!/usr/bin/env node

/**
 * Challenge Database Setup CLI
 * Demonstrates the new data quality error injection system
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
  const errorRate = process.argv[3];

  console.log("🎯 SQL Challenge Database Manager\n");

  // Import compiled JavaScript version
  try {
    const dbManager = require("./database-manager.js");

    switch (command) {
      case "light":
        console.log("🔧 Setting up challenge database with light errors...");
        const lightConfig = {
          countries: 15,
          cities: 30,
          users: 200,
          products: 150,
          orders: 400,
          orderItemsPerOrder: { min: 1, max: 4 },
          dateRange: getDynamicDateRange(),
          errorConfig: {
            enabled: true,
            emailErrors: 5, // 5% of users have invalid emails
            deliveryErrors: 3, // 3% of orders have delivery inconsistencies
            pricingErrors: 2, // 2% of products/items have pricing issues
            locationErrors: 4, // 4% of users have mismatched city-country relationships
            quantityErrors: 2, // 2% of order items have invalid quantities
          },
        };
        await dbManager.setupDatabase(lightConfig);
        break;

      case "medium":
        console.log("🔧 Setting up challenge database with medium errors...");
        const mediumConfig = {
          countries: 20,
          cities: 50,
          users: 300,
          products: 200,
          orders: 800,
          orderItemsPerOrder: { min: 1, max: 5 },
          dateRange: getDynamicDateRange(),
          errorConfig: {
            enabled: true,
            emailErrors: 15, // 15% of users have invalid emails
            deliveryErrors: 10, // 10% of orders have delivery inconsistencies
            pricingErrors: 8, // 8% of products/items have pricing issues
            locationErrors: 12, // 12% of users have mismatched city-country relationships
            quantityErrors: 5, // 5% of order items have invalid quantities
          },
        };
        await dbManager.setupDatabase(mediumConfig);
        break;

      case "heavy":
        console.log("🔧 Setting up challenge database with heavy errors...");
        const heavyConfig = {
          countries: 25,
          cities: 60,
          users: 400,
          products: 250,
          orders: 1000,
          orderItemsPerOrder: { min: 1, max: 6 },
          dateRange: getDynamicDateRange(),
          errorConfig: {
            enabled: true,
            emailErrors: 25, // 25% of users have invalid emails
            deliveryErrors: 20, // 20% of orders have delivery inconsistencies
            pricingErrors: 15, // 15% of products/items have pricing issues
            locationErrors: 18, // 18% of users have mismatched city-country relationships
            quantityErrors: 10, // 10% of order items have invalid quantities
          },
        };
        await dbManager.setupDatabase(heavyConfig);
        break;

      case "custom":
        if (!errorRate || isNaN(errorRate)) {
          console.log(
            "❌ Please provide an error rate for custom setup (e.g., 'custom 10' for 10% error rate)"
          );
          return;
        }

        const rate = parseInt(errorRate);
        if (rate < 0 || rate > 50) {
          console.log("❌ Error rate must be between 0 and 50");
          return;
        }

        console.log(
          `🔧 Setting up custom challenge database with ${rate}% error rate...`
        );

        const customConfig = {
          countries: 20,
          cities: 50,
          users: 300,
          products: 200,
          orders: 800,
          orderItemsPerOrder: { min: 1, max: 5 },
          dateRange: getDynamicDateRange(),
          errorConfig: {
            enabled: true,
            emailErrors: rate,
            deliveryErrors: Math.max(1, Math.round(rate * 0.7)),
            pricingErrors: Math.max(1, Math.round(rate * 0.5)),
            locationErrors: Math.max(1, Math.round(rate * 0.8)),
            quantityErrors: Math.max(1, Math.round(rate * 0.3)),
          },
        };
        await dbManager.setupDatabase(customConfig);
        break;

      default:
        console.log("Challenge Database Setup Options:");
        console.log("==================================");
        console.log(
          "  npm run db:challenge-light   - Light errors (2-5% error rates)"
        );
        console.log(
          "  npm run db:challenge-medium  - Medium errors (5-15% error rates)"
        );
        console.log(
          "  npm run db:challenge-heavy   - Heavy errors (10-25% error rates)"
        );
        console.log(
          "  npm run db:challenge-custom X - Custom error rate (e.g., 'custom 12')"
        );
        console.log("");
        console.log("Data Quality Issues Included:");
        console.log("• Invalid email formats (missing @, wrong domains, etc.)");
        console.log(
          "• Delivery inconsistencies (missing dates, wrong statuses)"
        );
        console.log(
          "• Pricing anomalies (negative prices, zero values, too high)"
        );
        console.log("• Location mismatches (city-country relationship errors)");
        console.log("• Quantity errors (zero or negative quantities)");
        console.log("");
        console.log("Perfect for practicing:");
        console.log("• Data validation queries");
        console.log("• Data quality audits");
        console.log("• Business rule compliance checks");
        console.log("• Data cleaning and transformation");
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
