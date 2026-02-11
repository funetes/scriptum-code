import { useNavigate, useParams } from "react-router";
import { useAuth } from "../context/AuthContext";
import { LogOut, User, Mail, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import { userService } from "../services/userService";
import { scriptService } from "../services/scriptService";
import { ScriptCard } from "../components/ScriptCard";
import { ConfirmModal } from "../components/modals/ConfirmModal";
import type { ScriptOverview, Category } from "../types/script";

export function UserPage() {
  const { userId } = useParams();
  const { user, logout, withdraw, loading } = useAuth();
  const navigate = useNavigate();
  const [favoriteScripts, setFavoriteScripts] = useState<ScriptOverview[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [isWithdrawModalOpen, setIsWithdrawModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    async function init() {
      if (user && user.uid === userId) {
        setIsFetching(true);
        try {
          const [favoriteIds, allCategories] = await Promise.all([
            userService.getAllFavorites(user.uid),
            scriptService.getCategories(),
          ]);
          setCategories(allCategories);

          if (favoriteIds.length > 0) {
            const scripts = await scriptService.getScriptsByIds(favoriteIds);
            setFavoriteScripts(scripts);
          } else {
            setFavoriteScripts([]);
          }
        } catch (error) {
          console.error("Failed to fetch data on UserPage:", error);
        } finally {
          setIsFetching(false);
        }
      }
    }
    init();
  }, [user, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!user || user.uid !== userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
        <p className="text-neutral-500 mb-4">
          접근 권한이 없거나 존재하지 않는 사용자입니다.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2 bg-blue-600 rounded-full font-bold cursor-pointer"
        >
          홈으로 가기
        </button>
      </div>
    );
  }

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const handleWithdraw = async () => {
    try {
      await withdraw();
      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/");
    } catch (error: any) {
      console.error("Withdrawal error:", error);
      if (error.code === "auth/requires-recent-login") {
        alert(
          "보안을 위해 다시 로그인이 필요합니다.\n로그아웃 후 다시 로그인하여 시도해주세요.",
        );
      } else {
        alert("회원 탈퇴 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
      }
    } finally {
      setIsWithdrawModalOpen(false);
    }
  };

  const handleFavoriteToggle = async (scriptId: string) => {
    if (!user) return;
    try {
      // In UserPage, we only care about UNFAVORITING (since only favorited items are shown)
      await userService.toggleFavorite(user.uid, scriptId, true);
      setFavoriteScripts((prev) => prev.filter((s) => s.id !== scriptId));
    } catch (error) {
      console.error("Failed to toggle favorite in UserPage:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Compact Profile Header */}
      <div className="mb-10">
        <div className="bg-slate-900/50 dark:bg-slate-900/50 border border-black/5 dark:border-white/10 rounded-3xl p-6 shadow-xl backdrop-blur-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-linear-to-l from-blue-600/5 to-transparent pointer-events-none" />

          <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Avatar - Smaller and simpler */}
            <div className="relative">
              <div className="w-16 h-16 rounded-2xl border-2 border-white/10 overflow-hidden bg-slate-800 shadow-lg">
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/20">
                    <User size={32} />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 border-2 border-slate-900 rounded-full" />
            </div>

            {/* User Info - Compact and horizontal */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {user.displayName || "사용자"}
                </h2>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-500/10 text-blue-500 border border-blue-500/20 uppercase tracking-wider mx-auto md:mx-0">
                  Member
                </span>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-4 text-slate-500 dark:text-neutral-400 text-sm">
                <div className="flex items-center gap-1.5">
                  <Mail size={14} className="text-blue-500/70" />
                  <span className="truncate max-w-[200px]">{user.email}</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-slate-700 rounded-full" />
                <div className="flex items-center gap-1.5 font-medium">
                  <Heart size={14} className="text-red-500" />
                  <span>즐겨찾기 {favoriteScripts.length}개</span>
                </div>
              </div>
            </div>

            {/* Logout & Withdraw Buttons */}
            <div className="flex flex-col items-center md:items-end gap-2">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-5 py-2.5 bg-slate-500/5 hover:bg-slate-500/10 text-slate-500 dark:text-neutral-400 hover:text-slate-700 dark:hover:text-neutral-200 text-xs font-bold rounded-xl transition-all border border-slate-500/10 cursor-pointer"
              >
                <LogOut size={14} />
                로그아웃
              </button>
              <button
                onClick={() => setIsWithdrawModalOpen(true)}
                className="text-[10px] text-red-500/60 hover:text-red-500 underline decoration-red-500/30 hover:decoration-red-500 transition-all cursor-pointer"
              >
                회원 탈퇴
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Favorites Section - Expanded Width */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Heart size={20} className="text-red-500" />
            내가 즐겨찾기한 영상
          </h3>
        </div>

        {isFetching ? (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-neutral-900/30 rounded-3xl border border-black/5 dark:border-white/5">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-4" />
            <p className="text-slate-400 dark:text-neutral-500 text-sm">
              목록을 가져오는 중...
            </p>
          </div>
        ) : favoriteScripts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteScripts.map((script) => {
              const category = categories.find(
                (c) => c.name === script.category,
              );
              const categoryId = category?.id || "unknown";

              return (
                <ScriptCard
                  key={script.id}
                  script={script}
                  categoryId={categoryId}
                  isFavorite={true}
                  onFavoriteToggle={() => handleFavoriteToggle(script.id)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-slate-50 dark:bg-neutral-900/30 rounded-3xl border border-dashed border-slate-200 dark:border-neutral-800 text-center px-6">
            <div className="w-16 h-16 bg-slate-200 dark:bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
              <Heart
                size={28}
                className="text-slate-400 dark:text-neutral-600"
              />
            </div>
            <p className="text-slate-600 dark:text-neutral-400 font-medium mb-1">
              즐겨찾기한 영상이 없습니다.
            </p>
            <p className="text-slate-400 dark:text-neutral-600 text-sm">
              관심 있는 영상의 하트 버튼을 눌러보세요!
            </p>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={isWithdrawModalOpen}
        onClose={() => setIsWithdrawModalOpen(false)}
        onConfirm={handleWithdraw}
        title="정말 탈퇴하시겠습니까?"
        message={`즐겨찾기 및 북마크 등 모든 데이터가 삭제되며\n복구할 수 없습니다.`}
        confirmText="탈퇴하기"
        cancelText="취소"
        isDangerous={true}
      />
    </div>
  );
}
