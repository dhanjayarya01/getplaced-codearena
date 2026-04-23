import { useState, useEffect } from "react";

/**
 * Custom hook: useFetch
 * Should fetch data from a given URL and return { data, loading, error }
 *
 * BUG 1: The useEffect dependency array is wrong — it causes an infinite loop
 * BUG 2: The error state is never set when fetch fails
 * TODO: Fix both bugs so data loads exactly once and errors are handled
 */
export function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // BUG: This runs every render because dependency array is wrong
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        // TODO: Set the error state here instead of just logging
        console.error("Fetch failed:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [data]); // BUG: Should depend on [url], not [data]

  return { data, loading, error };
}
