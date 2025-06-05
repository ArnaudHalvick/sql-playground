"use client";

import { useState } from "react";
import { executeQuery } from "@/lib/supabase";

export default function TestDatabasePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const testQueries = [
    { name: "Count Users", query: "SELECT COUNT(*) as user_count FROM users" },
    {
      name: "List Countries",
      query: "SELECT name, code FROM countries LIMIT 5",
    },
    {
      name: "Sample Products",
      query: "SELECT name, price, category FROM products LIMIT 5",
    },
    {
      name: "Recent Orders",
      query:
        "SELECT id, total_amount, status FROM orders ORDER BY created_at DESC LIMIT 5",
    },
  ];

  const runTest = async (query: string, testName: string) => {
    setLoading(true);
    setError(null);

    try {
      console.log(`Running test: ${testName}`);
      console.log(`Query: ${query}`);

      const { data, error } = await executeQuery(query);

      if (error) {
        setError(`${testName} failed: ${error}`);
        setResult(null);
      } else {
        setResult({ testName, data });
        setError(null);
      }
    } catch (err: any) {
      setError(`${testName} failed: ${err.message}`);
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Database Connection Test</h1>

      <div className="grid gap-4 mb-6">
        {testQueries.map((test, index) => (
          <button
            key={index}
            onClick={() => runTest(test.query, test.name)}
            disabled={loading}
            className="p-3 border rounded hover:bg-gray-50 disabled:opacity-50 text-left"
          >
            <div className="font-medium">{test.name}</div>
            <div className="text-sm text-gray-600">{test.query}</div>
          </button>
        ))}
      </div>

      {loading && (
        <div className="p-4 border rounded bg-blue-50">
          <p className="text-blue-600">🔄 Running query...</p>
        </div>
      )}

      {error && (
        <div className="p-4 border rounded bg-red-50">
          <p className="text-red-600">❌ {error}</p>
        </div>
      )}

      {result && (
        <div className="p-4 border rounded bg-green-50">
          <h3 className="font-medium text-green-800 mb-2">
            ✅ {result.testName} - Success!
          </h3>
          <pre className="text-sm bg-white p-2 rounded border overflow-auto">
            {JSON.stringify(result.data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
