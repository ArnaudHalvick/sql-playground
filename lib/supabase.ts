import { createClient as createBrowserClient } from "@/utils/supabase/client";
import { createClient as createServerClient } from "@/utils/supabase/server";

// For client-side usage
export const supabase = createBrowserClient();

// For server-side usage - this function should be called in server components
export async function getServerSupabaseClient() {
  return await createServerClient();
}

export async function executeQuery(
  query: string
): Promise<{ data: any[] | null; error: any }> {
  try {
    // Use client-side supabase for now, but this could be adapted for server-side usage
    const { data, error } = await supabase.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "An error occurred while executing the query",
    };
  }
}

// Server-side version of executeQuery
export async function executeQueryServer(
  query: string
): Promise<{ data: any[] | null; error: any }> {
  try {
    const supabaseServer = await getServerSupabaseClient();
    const { data, error } = await supabaseServer.rpc("run_query", {
      query_text: query,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error: any) {
    return {
      data: null,
      error: error.message || "An error occurred while executing the query",
    };
  }
}
