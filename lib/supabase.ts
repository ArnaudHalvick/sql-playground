import { createClient } from "@/utils/supabase/client";

// For client-side usage (works with static export builds)
export const supabase = createClient();

export async function executeQuery(
  query: string
): Promise<{ data: any[] | null; error: any }> {
  try {
    const { data, error } = await supabase.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    // Check if the RPC function returned an error in the data
    if (data && typeof data === "object" && data.error) {
      return { data: null, error: data.message || "Query execution failed" };
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "An error occurred while executing the query",
    };
  }
}
