import { useEffect, useRef } from "react";
import { BotIcon, X } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { RelatedVideos } from "./RelatedVideos";

interface SummaryBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  summary?: string;
  highlights?: string[];
  relatedVideos?: { title: string; thumbnail: string; videoId: string }[];
}

export function SummaryBottomSheet({
  isOpen,
  onClose,
  summary,
  highlights,
  relatedVideos,
}: SummaryBottomSheetProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div
      ref={containerRef}
      className={`pointer-events-auto fixed z-50 bg-white dark:bg-black shadow-2xl transition-all duration-300 ease-out transform
        ${
          isOpen
            ? "translate-y-0 opacity-100 md:translate-x-0"
            : "translate-y-[110%] opacity-0 md:translate-y-0 md:translate-x-full"
        }
        /* Mobile */
        bottom-0 inset-x-0 top-[calc(56.25vw+3.5rem)] rounded-t-xl border-t
        /* Desktop */
        md:top-0 md:bottom-0 md:right-0 md:left-auto md:w-96 md:h-full md:rounded-l-2xl md:rounded-t-none md:border-l md:border-t-0
        border-gray-100 dark:border-zinc-800 flex flex-col`}
    >
      <button
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors z-10"
        onClick={onClose}
      >
        <X size={24} className="text-gray-500 dark:text-zinc-400" />
      </button>

      <div className="px-6 pt-10 pb-10 overflow-y-auto overscroll-contain">
        <div className="flex items-center gap-2 mb-4 md:mb-6">
          <BotIcon className="text-lime-500" size={20} />
          <h2 className="text-lg md:text-xl font-bold dark:text-white">
            AI Summary
          </h2>
        </div>

        {summary ? (
          <div className="space-y-5 md:space-y-6">
            <section>
              <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-zinc-300 leading-relaxed text-base md:text-lg">
                <ReactMarkdown
                  components={{
                    h1: ({ ...props }) => (
                      <h1
                        className="text-xl font-bold mb-4 mt-6 dark:text-white"
                        {...props}
                      />
                    ),
                    h2: ({ ...props }) => (
                      <h2
                        className="text-lg font-bold mb-3 mt-5 dark:text-white"
                        {...props}
                      />
                    ),
                    h3: ({ ...props }) => (
                      <h3
                        className="text-base font-bold mb-2 mt-4 dark:text-white"
                        {...props}
                      />
                    ),
                    p: ({ ...props }) => (
                      <p className="mb-4 last:mb-0" {...props} />
                    ),
                    ul: ({ ...props }) => (
                      <ul
                        className="list-disc pl-5 mb-4 space-y-1"
                        {...props}
                      />
                    ),
                    ol: ({ ...props }) => (
                      <ol
                        className="list-decimal pl-5 mb-4 space-y-1"
                        {...props}
                      />
                    ),
                    li: ({ ...props }) => <li className="mb-1" {...props} />,
                    strong: ({ ...props }) => (
                      <strong
                        className="font-bold text-black dark:text-white"
                        {...props}
                      />
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            </section>

            {highlights && highlights.length > 0 && (
              <section>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                  Key Highlights
                </h3>
                <ul className="space-y-2 md:space-y-3">
                  {highlights.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-gray-600 dark:text-zinc-400 text-sm md:text-base"
                    >
                      <span className="text-lime-500 font-bold">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {relatedVideos && relatedVideos.length > 0 && (
              <RelatedVideos videos={relatedVideos} />
            )}
          </div>
        ) : (
          <div className="py-10 text-center text-gray-500">
            No summary available for this video.
          </div>
        )}
      </div>
    </div>
  );
}
