import React, { useState } from "react";
import db from "../db/initDB";

function SqlQueryExecutor() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const executeQuery = async () => {
    try {
      const res = await db.query(query);
      setResults(res.rows);
      setError(null);
    } catch (err) {
      setError(err.message);
      setResults(null);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-blue-700">
        Execute SQL Search
      </h2>

      <textarea
        rows="6"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Write your SQL query here"
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={executeQuery}
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
      >
        Execute
      </button>

      {error && <p className="mt-4 text-red-600 font-medium">Error: {error}</p>}

      {results && (
        <pre className="mt-4 bg-gray-100 p-4 rounded text-sm overflow-x-auto">
          {JSON.stringify(results, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default SqlQueryExecutor;
