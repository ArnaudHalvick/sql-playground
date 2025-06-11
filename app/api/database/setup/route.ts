import { NextRequest, NextResponse } from "next/server";
import {
  setupDatabase,
  DataGenerationConfig,
} from "@/utils/supabase/database-manager";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Starting database setup...");

    // Parse the request body to get configuration
    let config: DataGenerationConfig | undefined;
    try {
      const body = await request.json();
      config = body.config;
      console.log("📋 Using configuration:", config ? "Custom" : "Default");
    } catch (parseError) {
      console.log("📋 No configuration provided, using default");
      // If no body or invalid JSON, use default config
    }

    // Call the setup function with optional configuration
    await setupDatabase(config);

    console.log("✅ Database setup completed successfully");

    return NextResponse.json({
      success: true,
      message: "Database setup completed successfully",
    });
  } catch (error: any) {
    console.error("Database setup error:", error);
    return NextResponse.json(
      { error: error.message || "Database setup failed" },
      { status: 500 }
    );
  }
}
