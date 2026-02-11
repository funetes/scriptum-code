import { useState, useEffect } from "react";
import { scriptService } from "../services/scriptService";
import type { ScriptOverview } from "../types/script";

export const useScriptMetadata = (id: string | undefined) => {
  const [metadata, setMetadata] = useState<ScriptOverview | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      setMetadata(null);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    scriptService
      .getScriptMetadata(id)
      .then((data) => {
        if (!ignore) {
          setMetadata(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err instanceof Error
              ? err
              : new Error("Failed to fetch script metadata"),
          );
        }
      })
      .finally(() => {
        if (!ignore) {
          setIsLoading(false);
        }
      });

    return () => {
      ignore = true;
    };
  }, [id]);

  return { metadata, isLoading, error };
};
