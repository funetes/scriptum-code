import { useState, useEffect } from "react";
import { scriptService } from "../services/scriptService";
import type { Category } from "../types/script";

export const useCategory = (categoryId: string | undefined) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (!categoryId) {
      setCategory(null);
      return;
    }

    let ignore = false;
    setIsLoading(true);
    setError(null);

    scriptService
      .getCategoryById(categoryId)
      .then((data) => {
        if (!ignore) {
          setCategory(data);
        }
      })
      .catch((err) => {
        if (!ignore) {
          setError(
            err instanceof Error ? err : new Error("Failed to fetch category"),
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
  }, [categoryId]);

  return { category, isLoading, error };
};
