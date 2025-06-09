import { NextRequest, NextResponse } from "next/server";
import { setupDatabase } from "@/utils/supabase/database-manager";

export async function POST(request: NextRequest) {
  try {
    console.log("🚀 Starting database setup...");

    // Call the setup function directly
    await setupDatabase();

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
