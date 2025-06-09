import { NextRequest, NextResponse } from "next/server";
import { resetDatabase } from "@/utils/supabase/database-manager";

export async function POST(request: NextRequest) {
  try {
    console.log("🔄 Starting database reset...");

    // Call the reset function directly (bypasses CLI confirmation)
    await resetDatabase();

    console.log("✅ Database reset completed successfully");

    return NextResponse.json({
      success: true,
      message: "Database reset completed successfully",
    });
  } catch (error: any) {
    console.error("Database reset error:", error);
    return NextResponse.json(
      { error: error.message || "Database reset failed" },
      { status: 500 }
    );
  }
}
