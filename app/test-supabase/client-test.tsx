"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";

export default function ClientTest() {
  const [connectionStatus, setConnectionStatus] = useState<
    "loading" | "success" | "error"
  >("loading");
  const [user, setUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        const supabase = createClient();
        const {
          data: { user },
          error,
        } = await supabase.auth.getUser();

        if (error) {
          setError(error.message);
          setConnectionStatus("error");
        } else {
          setUser(user);
          setConnectionStatus("success");
        }
      } catch (err: any) {
        setError(err.message);
        setConnectionStatus("error");
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-semibold mb-2">Client-side Connection</h2>

      {connectionStatus === "loading" && (
        <p className="text-blue-600">🔄 Testing client-side connection...</p>
      )}

      {connectionStatus === "error" && (
        <p className="text-red-600">❌ Error: {error}</p>
      )}

      {connectionStatus === "success" && (
        <div>
          <p className="text-green-600">
            ✅ Client-side connection successful!
          </p>
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
      )}
    </div>
  );
}
