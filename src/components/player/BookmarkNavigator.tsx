import { ChevronLeft, ChevronRight, Bookmark } from "lucide-react";

interface BookmarkNavigatorProps {
  bookmarks: number[];
  currentIndex: number;
  onNavigate: (index: number) => void;
}

export function BookmarkNavigator({
  bookmarks,
  currentIndex,
  onNavigate,
}: BookmarkNavigatorProps) {
  if (!bookmarks || bookmarks.length === 0) return null;

  const sorted = [...bookmarks].sort((a, b) => a - b);

  const next = sorted.find((i) => i > currentIndex);
  const prev = [...sorted].reverse().find((i) => i < currentIndex);

  const lastPassedCount = sorted.filter((i) => i <= currentIndex).length;
  const displayIdx = Math.max(1, lastPassedCount);

  const nextBookmark = next !== undefined ? next : sorted[0];
  const prevBookmark = prev !== undefined ? prev : sorted[sorted.length - 1];

  return (
    <div className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center backdrop-blur-sm border border-white/10 rounded-2xl shadow-2xl animate-in slide-in-from-bottom-4 duration-300">
      <button
        onClick={() => onNavigate(prevBookmark)}
        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-colors cursor-pointer group"
        title="Previous Bookmark"
      >
        <ChevronLeft
          size={20}
          className="group-active:scale-90 transition-transform"
        />
      </button>

      <div className="px-3 flex items-center gap-2 text-white/90 font-bold text-sm min-w-[80px] justify-center select-none">
        <Bookmark size={14} className="text-amber-500" fill="currentColor" />
        <span className="tabular-nums">
          {displayIdx} / {bookmarks.length}
        </span>
      </div>

      <button
        onClick={() => onNavigate(nextBookmark)}
        className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 text-white transition-colors cursor-pointer group"
        title="Next Bookmark"
      >
        <ChevronRight
          size={20}
          className="group-active:scale-90 transition-transform"
        />
      </button>
    </div>
  );
}
