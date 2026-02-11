import { Link } from "react-router";
import { Sparkles, Loader2, Search } from "lucide-react";
import type { Category, ScriptSearch } from "../types/script";

interface SearchResultsProps {
  loading: boolean;
  error: Error | null;
  results: ScriptSearch[];
  query: string;
  categories: Category[];
}

export function SearchResults({
  loading,
  error,
  results,
  query,
  categories,
}: SearchResultsProps) {
  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400">오류가 발생했습니다: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center">
          <Sparkles className="w-6 h-6 mr-2 text-[#3BC4C4]" />
          {loading ? "검색 중..." : `검색 결과 (${results.length})`}
        </h2>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-24 opacity-50">
          <Loader2 className="w-12 h-12 text-[#3BC4C4] animate-spin mb-4" />
          <p className="text-neutral-500 text-lg">
            최적의 결과를 찾는 중입니다.
          </p>
        </div>
      ) : results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((script) => {
            const category = categories.find((c) => c.name === script.category);
            const categoryId = category?.id || "unknown";

            // Extract highlighted text if available.
            // Using updated types script.ts
            const highlightedSnippet =
              script._highlightResult?.full_text?.value;

            return (
              <Link
                to={`/${categoryId}/${script.id}`}
                key={script.id}
                className="group relative overflow-hidden rounded-2xl bg-neutral-800/40 border border-neutral-700/50 hover:border-[#3BC4C4]/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(59,196,196,0.3)] hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-linear-to-br from-transparent to-[#3BC4C4]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-neutral-700 text-neutral-300 rounded-md group-hover:bg-[#3BC4C4] group-hover:text-black transition-colors duration-300">
                      {script.category || "스크립트"}
                    </span>
                  </div>
                  <h3
                    className="text-lg font-bold text-neutral-100 group-hover:text-white transition-colors line-clamp-2 mb-2"
                    dangerouslySetInnerHTML={{
                      __html:
                        script._highlightResult?.title?.value ||
                        script.title ||
                        script.id,
                    }}
                  />
                  {highlightedSnippet ? (
                    <p
                      className="text-sm text-neutral-500 line-clamp-3 group-hover:text-neutral-400 transition-colors [&_mark]:bg-[#3BC4C4]/30 [&_mark]:text-[#3BC4C4] [&_mark]:px-0.5 [&_mark]:rounded-sm"
                      dangerouslySetInnerHTML={{
                        __html: highlightedSnippet,
                      }}
                    />
                  ) : (
                    script.full_text && (
                      <p className="text-sm text-neutral-500 line-clamp-3 group-hover:text-neutral-400 transition-colors">
                        {script.full_text}
                      </p>
                    )
                  )}
                  <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-neutral-500 group-hover:text-[#3BC4C4] transition-colors">
                    상세 보기 &rarr;
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-24 bg-neutral-900/30 rounded-3xl border border-dashed border-neutral-800">
            <div className="p-4 rounded-full bg-neutral-800/50 w-fit mx-auto mb-4">
              <Search className="w-8 h-8 text-neutral-600" />
            </div>
            <p className="text-neutral-500 text-xl font-medium">
              "{query}"에 대한 검색 결과가 없습니다.
            </p>
            <p className="text-neutral-600 mt-2">
              다른 키워드나 제목으로 검색해 보세요.
            </p>
          </div>
        )
      )}
    </div>
  );
}
