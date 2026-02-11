import { Link } from "react-router";
import { WandSparklesIcon, Heart } from "lucide-react";
import { memo } from "react";
import type { ScriptOverview } from "../types/script";
import { storageService } from "../services/storageService";

const parseDate = (updatedAt: any): Date => {
  if (updatedAt && typeof updatedAt === "object" && "seconds" in updatedAt) {
    return new Date(updatedAt.seconds * 1000);
  }
  return new Date(updatedAt);
};

const ProgressBar = memo(
  ({ time, duration }: { time: number; duration: number }) => {
    const progress =
      duration > 0 && !isNaN(time / duration) && isFinite(time / duration)
        ? Math.min(100, Math.max(0, Math.floor((time / duration) * 100)))
        : 0;

    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-1.5 text-xs text-neutral-400 font-medium">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="w-full bg-neutral-700/50 rounded-full h-2 overflow-hidden">
          <div
            className="bg-blue-500 h-full transition-all duration-300 ease-out shadow-[0_0_10px_rgba(59,130,246,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    );
  },
);

interface ScriptCardProps {
  script: ScriptOverview;
  isFavorite?: boolean;
  onFavoriteToggle?: () => void;
  categoryId?: string;
}

const ScriptCardComponent = ({
  script,
  isFavorite,
  onFavoriteToggle,
  categoryId,
}: ScriptCardProps) => {
  const updatedAt = parseDate(script.updatedAt);
  const isNew =
    updatedAt &&
    new Date().getTime() - updatedAt.getTime() < 5 * 60 * 60 * 1000;

  const metadata = storageService.getMetadata(script.id);
  const duration = metadata?.duration ?? 0;
  const time = metadata?.time ?? 0;

  const finalCategoryId = categoryId || script.category_id || script.categoryId;

  return (
    <Link
      to={`/${finalCategoryId}/${script.id}`}
      className="group flex flex-col h-full p-6 bg-neutral-800/40 hover:bg-neutral-800/60 border border-neutral-700/50 hover:border-blue-500/30 rounded-2xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-linear-to-br from-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative flex-1">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="text-lg font-bold text-neutral-200 group-hover:text-white transition-colors line-clamp-2 pr-8">
            {script.title || script.id}
          </h3>
          <div className="flex items-center gap-2 shrink-0">
            {isNew ? (
              <span className="inline-flex items-center justify-center p-1.5 bg-blue-500/10 text-blue-400 rounded-lg shadow-sm border border-blue-500/20">
                <WandSparklesIcon className="w-4 h-4" />
              </span>
            ) : null}
            {onFavoriteToggle ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onFavoriteToggle();
                }}
                className={`p-2 rounded-full transition-all cursor-pointer shadow-sm
                ${isFavorite ? "bg-red-500/20 text-red-500 hover:bg-red-500/30" : "bg-white/5 text-white/30 hover:bg-white/10 hover:text-white/50"}`}
                title="Favorite"
              >
                <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="relative mt-auto">
        <ProgressBar time={time} duration={duration} />
      </div>
    </Link>
  );
};

export const ScriptCard = memo(ScriptCardComponent);
