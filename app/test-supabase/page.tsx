import { createClient } from "@/utils/supabase/server";
import ClientTest from "./client-test";

export default async function TestSupabasePage() {
  const supabase = await createClient();

  // Test the connection by trying to get the current user
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Supabase SSR Connection Test</h1>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Server-side Connection</h2>
          {error ? (
            <p className="text-red-600">❌ Error: {error.message}</p>
          ) : (
            <p className="text-green-600">
              ✅ Server-side connection successful!
            </p>
          )}

          <div className="mt-2">
            <p>
              <strong>User:</strong>{" "}
              {user ? user.email || "Anonymous" : "Not authenticated"}
            </p>
            <p>
              <strong>User ID:</strong> {user?.id || "N/A"}
            </p>
          </div>
        </div>

        <ClientTest />

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Environment Variables</h2>
          <p>
            <strong>Supabase URL:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_URL ? "✅ Set" : "❌ Missing"}
          </p>
          <p>
            <strong>Supabase Anon Key:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
              ? "✅ Set"
              : "❌ Missing"}
          </p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Connection Details</h2>
          <p>
            <strong>URL:</strong> {process.env.NEXT_PUBLIC_SUPABASE_URL}
          </p>
          <p>
            <strong>Key:</strong>{" "}
            {process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 20)}...
          </p>
        </div>

        <div className="p-4 border rounded">
          <h2 className="text-lg font-semibold mb-2">Setup Summary</h2>
          <div className="space-y-2">
            <p>✅ Installed @supabase/ssr package</p>
            <p>✅ Created environment variables (.env.local)</p>
            <p>
              ✅ Set up client-side Supabase client (utils/supabase/client.ts)
            </p>
            <p>
              ✅ Set up server-side Supabase client (utils/supabase/server.ts)
            </p>
            <p>✅ Updated lib/supabase.ts to use new SSR approach</p>
            <p>✅ Configured for static export builds (no middleware needed)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
