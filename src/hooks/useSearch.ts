import { useState, useCallback, useEffect } from "react";
import { useDebouncedCallback } from "@tanstack/react-pacer";
import { typesenseAdapter } from "../utils/search";

interface SearchResponse<T> {
  results: {
    hits: T[];
  }[];
}

export function useSearch<T>(collectionName: string, debounceMs: number = 500) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const performSearch = useCallback(
    async (searchQuery: string) => {
      if (!searchQuery.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = (await (typesenseAdapter.searchClient as any).search([
          {
            indexName: collectionName,
            params: {
              query: searchQuery,
            },
          },
        ])) as SearchResponse<T>;

        // Typesense InstantSearch adapter returns results in Algolia format
        // The results include _highlightResult which we can use for highlighting
        const hits = response.results[0].hits;
        setResults(hits);
        setError(null);
      } catch (err) {
        console.error(
          "Typesense search failed. Check node connectivity and protocol (http vs https).",
          err,
        );
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    },
    [collectionName],
  );

  const debouncedSearch = useDebouncedCallback(performSearch, {
    wait: debounceMs,
  });

  useEffect(() => {
    debouncedSearch(query);
  }, [query, debouncedSearch]);

  return { query, setQuery, results, loading, error };
}
