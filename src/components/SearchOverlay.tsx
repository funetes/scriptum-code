import { useEffect } from "react";
import { Link } from "react-router";
import { X, Search, Sparkles, Loader2 } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { SearchInput } from "./SearchInput";
import type { ScriptSearch } from "../types/script";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const { query, setQuery, results, loading, error } =
    useSearch<ScriptSearch>("script");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black/90 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="absolute top-0 left-0 right-0 h-20 flex items-center justify-between px-6 border-b border-white/10">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Search className="w-5 h-5 text-amber-500" />
          전체 검색
        </h2>
        <button
          onClick={onClose}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-white"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="max-w-4xl mx-auto pt-24 px-6 h-full flex flex-col">
        <div className="relative">
          <SearchInput value={query} onChange={setQuery} />
          {error && (
            <p className="text-red-400 text-xs text-center mt-2">
              검색 서버 연결에 실패했습니다.
            </p>
          )}
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {query.trim() ? (
            <div className="space-y-4 pb-12">
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 opacity-50">
                  <Loader2 className="w-10 h-10 text-amber-500 animate-spin mb-4" />
                  <p className="text-neutral-500">검색 중...</p>
                </div>
              ) : results.length > 0 ? (
                <div className="grid grid-cols-1 gap-4">
                  {results.map((script) => {
                    const highlightedSnippet = (script as any)._highlightResult
                      ?.full_text?.value;

                    return (
                      <Link
                        to={`/${script.category_id}/${script.id}`}
                        key={script.id}
                        onClick={onClose}
                        className="group flex flex-col p-4 bg-neutral-800/40 border border-neutral-700/50 rounded-2xl hover:border-amber-500/50 hover:bg-neutral-800/60 transition-all duration-300"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-700 text-neutral-300 rounded-md group-hover:bg-amber-500 group-hover:text-black transition-colors duration-300">
                            {script.category || "스크립트"}
                          </span>
                        </div>
                        <h3
                          className="text-lg font-bold text-neutral-100 group-hover:text-white transition-colors mb-2"
                          dangerouslySetInnerHTML={{
                            __html:
                              (script as any)._highlightResult?.title?.value ||
                              script.title ||
                              script.id,
                          }}
                        />
                        {highlightedSnippet ? (
                          <p
                            className="text-sm text-neutral-500 line-clamp-2 group-hover:text-neutral-400 transition-colors [&_mark]:bg-amber-500/30 [&_mark]:text-amber-200 [&_mark]:px-0.5 [&_mark]:rounded-sm"
                            dangerouslySetInnerHTML={{
                              __html: highlightedSnippet,
                            }}
                          />
                        ) : (
                          script.full_text && (
                            <p className="text-sm text-neutral-500 line-clamp-2 group-hover:text-neutral-400 transition-colors">
                              {script.full_text}
                            </p>
                          )
                        )}
                      </Link>
                    );
                  })}
                </div>
              ) : (
                !loading && (
                  <div className="text-center py-20">
                    <div className="p-4 rounded-full bg-neutral-800/50 w-fit mx-auto mb-4">
                      <Search className="w-8 h-8 text-neutral-600" />
                    </div>
                    <p className="text-neutral-500 text-xl font-medium">
                      "{query}"에 대한 검색 결과가 없습니다.
                    </p>
                  </div>
                )
              )}
            </div>
          ) : (
            <div className="text-center py-20 text-neutral-500 italic">
              <Sparkles className="w-12 h-12 text-neutral-800 mx-auto mb-4" />
              검색어를 입력하여 스크립트를 찾아보세요.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
