import {
  useState,
  useMemo,
  useCallback,
  useEffect,
  useDeferredValue,
} from "react";
import Fuse, { type IFuseOptions, type FuseResult } from "fuse.js";
import type { ScriptItem } from "../types/script";

export interface SearchResult extends FuseResult<ScriptItem> {}

interface UseScriptSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  matches: SearchResult[];
  currentMatchIndex: number; // 0-based index of the current match in `matches` array
  currentScriptIndex: number | null; // The actual index in the original scripts array
  nextMatch: () => void;
  prevMatch: () => void;
  totalMatches: number;
}

export function useScriptSearch(
  scripts: ScriptItem[],
  options?: IFuseOptions<ScriptItem>,
): UseScriptSearchReturn {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [currentMatchIndex, setCurrentMatchIndex] = useState(-1);

  // Initialize Fuse instance
  const fuse = useMemo(() => {
    const defaultOptions: IFuseOptions<ScriptItem> = {
      keys: ["text"],
      includeMatches: true,
      threshold: 0.4, // Adjust for fuzziness (0.0 = exact, 1.0 = match anything)
      ignoreLocation: true, // Search entire string properly
      minMatchCharLength: 2,
      ...options,
    };
    return new Fuse(scripts, defaultOptions);
  }, [scripts, options]);

  // Perform search
  const matches = useMemo(() => {
    if (!deferredQuery.trim()) return [];
    const results = fuse.search(deferredQuery);
    return results.sort((a, b) => a.refIndex - b.refIndex);
  }, [fuse, deferredQuery]);

  // Reset navigation when matches change
  useEffect(() => {
    // Reset index when search results change
    setCurrentMatchIndex(-1);
  }, [matches]);

  const totalMatches = matches.length;

  const nextMatch = useCallback(() => {
    if (totalMatches === 0) return;
    setCurrentMatchIndex((prev) => (prev + 1) % totalMatches);
  }, [totalMatches]);

  const prevMatch = useCallback(() => {
    if (totalMatches === 0) return;
    setCurrentMatchIndex((prev) =>
      prev - 1 < 0 ? totalMatches - 1 : prev - 1,
    );
  }, [totalMatches]);

  const currentScriptIndex = useMemo(() => {
    if (currentMatchIndex >= 0 && matches[currentMatchIndex]) {
      return matches[currentMatchIndex].refIndex;
    }
    return null;
  }, [currentMatchIndex, matches]);

  return {
    query,
    setQuery,
    matches,
    currentMatchIndex,
    currentScriptIndex,
    nextMatch,
    prevMatch,
    totalMatches,
  };
}
