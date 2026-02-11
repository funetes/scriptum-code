import { memo } from "react";
import { Bookmark, CheckIcon } from "lucide-react";
import Highlighter from "react-highlight-words";
import { formatTime } from "../../utils/time";
import type { ScriptItem } from "../../types/script";
import type { SearchResult } from "../../hooks/useScriptSearch";

interface TimelineItemProps {
  item: ScriptItem;
  index: number;
  isActive: boolean;
  isImportant: boolean;
  isBookmarked: boolean;
  isSearchResult: boolean;
  searchWords: string[];
  onItemClick: (startTime: number) => void;
  onBookmarkToggle?: (index: number) => void;
  itemRef: (el: HTMLDivElement | null) => void;
}

const TimelineItem = memo(
  ({
    item,
    index,
    isActive,
    isImportant,
    isBookmarked,
    isSearchResult,
    searchWords,
    onItemClick,
    onBookmarkToggle,
    itemRef,
  }: TimelineItemProps) => {
    return (
      <div
        ref={itemRef}
        onClick={() => onItemClick(item.start)}
        className={`group relative rounded-2xl p-2 transition-all duration-300 cursor-pointer border backdrop-blur-sm ${
          isActive
            ? "shadow-lg shadow-black/20"
            : "bg-white/5 border-transparent hover:bg-white/10 hover:border-white/10 opacity-60 hover:opacity-100"
        } ${isSearchResult ? "ring-2 ring-amber-500/50 bg-amber-500/10 !opacity-100" : ""}`}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <span
                className={`text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/60`}
              >
                {formatTime(Math.round(item.start))}
              </span>
              {isImportant ? (
                <span className="text-white bg-blue-600 rounded-full p-0.5">
                  <CheckIcon size={12} strokeWidth={4} />
                </span>
              ) : null}

              {onBookmarkToggle ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmarkToggle(index);
                  }}
                  className={`p-1 rounded-full transition-all cursor-pointer ${
                    isBookmarked
                      ? "text-amber-500 scale-110"
                      : "text-white/20 hover:text-white/50"
                  }`}
                  title={isBookmarked ? "Remove Bookmark" : "Add Bookmark"}
                >
                  <Bookmark
                    size={18}
                    fill={isBookmarked ? "currentColor" : "none"}
                  />
                </button>
              ) : null}
            </div>
          </div>

          <p
            className={`text-sm md:text-base leading-relaxed transition-colors duration-300 ${
              isActive ? "text-white font-medium" : "text-white/80"
            }`}
          >
            <Highlighter
              highlightClassName="bg-amber-500/40 text-white rounded-sm px-0.5"
              searchWords={searchWords}
              autoEscape={true}
              textToHighlight={item.text}
            />
          </p>
        </div>
      </div>
    );
  },
);

TimelineItem.displayName = "TimelineItem";

interface ScriptTimelineProps {
  scripts: ScriptItem[];
  activeIndex: number;
  itemRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
  onItemClick: (startTime: number) => void;
  importantIndices?: number[];
  bookmarkedIndices?: number[];
  onBookmarkToggle?: (index: number) => void;
  searchQuery: string;
  searchMatches: SearchResult[];
  currentMatchIndex: number;
}

export function ScriptTimeline({
  scripts,
  activeIndex,
  itemRefs,
  onItemClick,
  importantIndices,
  bookmarkedIndices,
  onBookmarkToggle,
  searchQuery,
  searchMatches,
  currentMatchIndex,
}: ScriptTimelineProps) {
  const searchWords = searchQuery ? [searchQuery] : [];

  return (
    <div className="flex flex-col gap-4 px-2 max-w-2xl mx-auto relative">
      {scripts.map((item, index) => (
        <TimelineItem
          key={index}
          item={item}
          index={index}
          isActive={index === activeIndex}
          isImportant={importantIndices?.includes(index) ?? false}
          isBookmarked={bookmarkedIndices?.includes(index) ?? false}
          isSearchResult={
            searchQuery !== "" &&
            searchMatches.some((match) => match.item === item) &&
            searchMatches[currentMatchIndex]?.item === item
          }
          searchWords={searchWords}
          onItemClick={onItemClick}
          onBookmarkToggle={onBookmarkToggle}
          itemRef={(el) => {
            itemRefs.current[index] = el;
          }}
        />
      ))}
    </div>
  );
}
