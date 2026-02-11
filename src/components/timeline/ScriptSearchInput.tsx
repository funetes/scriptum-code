import { Search, X, ChevronUp, ChevronDown } from "lucide-react";

interface ScriptSearchInputProps {
  query: string;
  onQueryChange: (value: string) => void;
  currentMatchIndex: number;
  totalMatches: number;
  onNext: () => void;
  onPrev: () => void;
}

export function ScriptSearchInput({
  query,
  onQueryChange,
  currentMatchIndex,
  totalMatches,
  onNext,
  onPrev,
}: ScriptSearchInputProps) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (e.shiftKey) {
        onPrev();
      } else {
        onNext();
      }
    }
  };

  return (
    <div className="sticky top-0 z-10 backdrop-blur-md border-b">
      <div className="relative flex items-center gap-2">
        <div className="relative flex-1 group">
          <input
            type="text"
            className="max-w-50 pl-9 pr-8 py-1.5 bg-white/5 border border-white/10 rounded-lg text-base sm:text-sm text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
            placeholder="스크립트 검색"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-amber-500 transition-colors"
          />

          {query && (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {totalMatches > 0 && (
                <span className="text-xs text-white/40 mr-1 select-none">
                  {currentMatchIndex + 1} / {totalMatches}
                </span>
              )}
              <button
                onClick={() => onQueryChange("")}
                className="p-0.5 rounded-full hover:bg-white/10 text-white/30 hover:text-white transition-colors"
              >
                <X size={14} />
              </button>
            </div>
          )}
        </div>
        <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
          <button
            onClick={onPrev}
            disabled={totalMatches === 0}
            className="p-2 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 hover:bg-white/5 rounded-l-lg transition-colors border-r border-white/10"
          >
            <ChevronUp size={18} />
          </button>
          <button
            onClick={onNext}
            disabled={totalMatches === 0}
            className="p-2 text-white/50 hover:text-white disabled:opacity-30 disabled:hover:text-white/50 hover:bg-white/5 rounded-r-lg transition-colors"
          >
            <ChevronDown size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
