import { useState, useEffect, useCallback } from "react";
import { BotIcon, Heart, MoreVertical, Search, X } from "lucide-react";
import { useLoaderData } from "react-router";
import { storageService } from "../services/storageService";
import { userService } from "../services/userService";
import { useScriptAutoScroll } from "../hooks/useScriptAutoScroll";
import { usePlayerSync } from "../hooks/usePlayerSync";
import { VideoPlayer } from "../components/player/VideoPlayer";
import { ScriptTimeline } from "../components/timeline/ScriptTimeline";
import { ScrollToCurrentButton } from "../components/player/ScrollToCurrentButton";
import { SummaryBottomSheet } from "../components/player/SummaryBottomSheet";
import { LoginRequiredModal } from "../components/modals/LoginRequiredModal";
import type { ScriptData } from "../types/script";
import { ScriptSearchInput } from "../components/timeline/ScriptSearchInput";
import { useScriptSearch } from "../hooks/useScriptSearch";
import { useAuth } from "../context/AuthContext";

import { BookmarkNavigator } from "../components/player/BookmarkNavigator";

function DetailScriptPage() {
  const data = useLoaderData<ScriptData>();
  const [el, setEl] = useState<HTMLVideoElement | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);
  const [bookmarkedIndices, setBookmarkedIndices] = useState<number[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginModalInfo, setLoginModalInfo] = useState({
    title: "",
    description: "",
  });
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { user, login } = useAuth();

  const {
    activeIndex,
    setActiveIndex,
    manualScroll,
    setManualScroll,
    itemRefs,
    scrollToCurrentScript,
    scrollToIndex,
  } = useScriptAutoScroll();

  const {
    query,
    setQuery,
    matches,
    currentMatchIndex,
    currentScriptIndex,
    nextMatch,
    prevMatch,
    totalMatches,
  } = useScriptSearch(data.scripts);

  const {
    playing,
    setPlaying,
    playbackRate,
    setPlaybackRate,
    playerRef,
    updateActiveIndexCallback,
    autoSaveCallback,
  } = usePlayerSync(data.id, data.scripts, setActiveIndex);

  const handleBookmarkToggle = useCallback(
    async (index: number) => {
      if (!user) {
        setLoginModalInfo({
          title: "",
          description: "스크립트 구간을 북마크하려면 로그인해주세요.",
        });
        setLoginModalOpen(true);
        return;
      }

      const isBookmarked = bookmarkedIndices.includes(index);
      try {
        await userService.toggleBookmark(
          user.uid,
          data.id,
          index,
          isBookmarked,
        );
        setBookmarkedIndices((prev) =>
          isBookmarked ? prev.filter((i) => i !== index) : [...prev, index],
        );
      } catch (error) {
        console.error("Failed to toggle bookmark:", error);
      }
    },
    [user, data.id, bookmarkedIndices],
  );

  const handleFavoriteToggle = useCallback(async () => {
    if (!user) {
      setLoginModalInfo({
        title: "",
        description: "이 영상을 즐겨찾기에 추가하려면 로그인해주세요.",
      });
      setLoginModalOpen(true);
      return;
    }

    try {
      await userService.toggleFavorite(user.uid, data.id, isFavorite);
      setIsFavorite((prev) => !prev);
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  }, [user, data.id, isFavorite]);

  const onScriptItemClick = useCallback(
    (startTime: number) => {
      const internalPlayer = playerRef.current;
      if (internalPlayer) {
        internalPlayer.currentTime = startTime;
        setPlaybackRate(internalPlayer.playbackRate);
      }
      if (!playing) {
        setPlaying(true);
      }
    },
    [playerRef, playing, setPlaybackRate, setPlaying],
  );

  const handleBookmarkNavigate = useCallback(
    (index: number) => {
      const targetScript = data.scripts[index];
      if (targetScript) {
        onScriptItemClick(targetScript.start);
        setManualScroll(false);
        scrollToCurrentScript();
      }
    },
    [data.scripts, onScriptItemClick, scrollToCurrentScript],
  );

  const toggleMenu = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setMenuOpen((prev) => !prev);
  }, []);

  const closeMenuAndDo = useCallback((fn: () => void) => {
    fn();
  }, []);

  // Scroll to search result when navigating
  useEffect(() => {
    if (currentScriptIndex !== null) {
      setManualScroll(true); // Ensure manual scroll is set so auto-scroll doesn't override immediately if playing
      scrollToIndex(currentScriptIndex);
    }
  }, [currentScriptIndex, scrollToIndex, setManualScroll]);

  useEffect(() => {
    if (user) {
      userService.getBookmarks(user.uid, data.id).then(setBookmarkedIndices);
      userService.isFavorite(user.uid, data.id).then(setIsFavorite);
    } else {
      setBookmarkedIndices([]);
      setIsFavorite(false);
    }
  }, [user, data.id]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleClickOutside = () => setMenuOpen(false);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    if (!el) return;
    const metadata = storageService.getMetadata(data.id);

    if (!metadata) {
      const internalPlayer = playerRef.current;
      if (internalPlayer) {
        internalPlayer.currentTime = data.scripts[0]?.start || 0;
      }
      if (process.env.NODE_ENV === "production") {
        el.play();
      }
      return;
    }

    const { time, rate } = metadata;
    const internalPlayer = playerRef.current;
    if (internalPlayer) {
      if (Number.isFinite(time)) {
        internalPlayer.currentTime = time;
      }
      if (Number.isFinite(rate)) {
        internalPlayer.playbackRate = rate;
      }
      if (process.env.NODE_ENV === "production" && el) {
        el.play().catch(() => {});
      }
    }
  }, [data.id, data.scripts, el, playerRef]);

  return (
    <div className="max-w-2xl mx-auto">
      <VideoPlayer
        videoId={data.id}
        playing={playing}
        playbackRate={playbackRate}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={() => {
          updateActiveIndexCallback();
          autoSaveCallback();
        }}
        onEnded={() => storageService.removeMetadata(data.id)}
        playerRef={playerRef}
        setEl={setEl}
        renderExtra={() => (
          <>
            <div className="absolute -bottom-11 right-2 flex items-center justify-end">
              <div
                className={`flex items-center overflow-hidden transition-all duration-300 ease-in-out h-10 ${
                  menuOpen
                    ? searchOpen
                      ? "w-80 opacity-100 translate-x-0"
                      : "w-30 opacity-100 translate-x-0"
                    : "w-0 opacity-0 translate-x-10 mr-0 pointer-events-none"
                }`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-2 bg-transparent h-full shadow-lg whitespace-nowrap">
                  {searchOpen ? (
                    <div className="flex items-center gap-2">
                      <ScriptSearchInput
                        query={query}
                        onQueryChange={setQuery}
                        currentMatchIndex={currentMatchIndex}
                        totalMatches={totalMatches}
                        onNext={nextMatch}
                        onPrev={prevMatch}
                      />
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSearchOpen(true)}
                      className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/60 transition-colors"
                    >
                      <Search size={18} />
                    </button>
                  )}
                </div>

                <div className="flex items-center bg-transparent h-full shadow-lg whitespace-nowrap">
                  <button
                    onClick={() => closeMenuAndDo(handleFavoriteToggle)}
                    className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group cursor-pointer ${isFavorite ? "text-red-500" : "text-white/60"}`}
                    title="즐겨찾기"
                  >
                    <Heart
                      size={18}
                      className="group-hover:scale-110 transition-transform"
                      fill={isFavorite ? "currentColor" : "none"}
                    />
                  </button>

                  {data.summary ? (
                    <button
                      onClick={() => {
                        setSummaryOpen(true);
                      }}
                      className={`w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors group cursor-pointer ${summaryOpen ? "text-amber-500" : "text-white/60"}`}
                      title="AI 요약"
                    >
                      <BotIcon
                        size={18}
                        className="group-hover:scale-110 transition-transform"
                      />
                    </button>
                  ) : null}
                </div>
              </div>

              <button
                onClick={toggleMenu}
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all shrink-0 shadow-sm cursor-pointer border border-white/10 z-10
                ${menuOpen ? "bg-white/20 text-white" : "backdrop-blur-md text-white hover:bg-white/10"}`}
                title="Menu"
              >
                <MoreVertical size={20} />
              </button>
            </div>
          </>
        )}
      />

      <div className="mx-auto h-full relative">
        <ScriptTimeline
          scripts={data.scripts}
          importantIndices={data.important_indices}
          bookmarkedIndices={bookmarkedIndices}
          onBookmarkToggle={handleBookmarkToggle}
          activeIndex={activeIndex}
          itemRefs={itemRefs}
          onItemClick={onScriptItemClick}
          searchQuery={query}
          searchMatches={matches}
          currentMatchIndex={currentMatchIndex}
        />

        {manualScroll ? (
          <ScrollToCurrentButton
            onClick={() => {
              setManualScroll(false);
              scrollToCurrentScript();
            }}
          />
        ) : null}
        <div className="w-full h-75" />
      </div>

      {!summaryOpen && (
        <BookmarkNavigator
          bookmarks={bookmarkedIndices}
          currentIndex={activeIndex}
          onNavigate={handleBookmarkNavigate}
        />
      )}

      <SummaryBottomSheet
        isOpen={summaryOpen}
        onClose={() => setSummaryOpen(false)}
        summary={data.summary}
        highlights={data.highlights}
        relatedVideos={data.relatedVideos}
      />

      <LoginRequiredModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLogin={login}
        title={loginModalInfo.title}
        description={loginModalInfo.description}
      />
    </div>
  );
}

export default DetailScriptPage;
