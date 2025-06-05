import { createBrowserClient } from "@supabase/ssr";

// For static export builds, we'll use the browser client on the server side as well
// This is a simplified approach for static sites
export async function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
