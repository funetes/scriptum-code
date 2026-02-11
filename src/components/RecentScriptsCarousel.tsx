import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router";
import type { Category, ScriptOverview } from "../types/script";
import { useCallback, useEffect, useState } from "react";
import type { EmblaCarouselType } from "embla-carousel";

interface RecentScriptsCarouselProps {
  scripts: ScriptOverview[];
  categories: Category[];
}

export function RecentScriptsCarousel({
  scripts,
  categories,
}: RecentScriptsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "center",
      containScroll: "trimSnaps",
      loop: true,
    },
    [
      Autoplay({
        delay: 5000,
        stopOnInteraction: false,
        stopOnMouseEnter: true,
      }),
    ],
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onInit = useCallback((emblaApi: EmblaCarouselType) => {
    setScrollSnaps(emblaApi.scrollSnapList());
  }, []);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onInit(emblaApi);
    onSelect(emblaApi);
    emblaApi.on("reInit", onInit).on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onInit, onSelect]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y p-4 gap-4 md:gap-6 md:p-6">
          {scripts.map((script) => {
            const category = categories.find((c) => c.name === script.category);
            const categoryId = category?.id || "unknown";

            return (
              <div key={script.id} className="flex-[0_0_95%] sm:flex-[0_0_50%]">
                <Link
                  to={`/${categoryId}/${script.id}`}
                  className="block h-full group/card relative overflow-hidden rounded-2xl bg-neutral-800/40 border border-neutral-700/50 hover:border-[#3BC4C4]/50 transition-all duration-500 hover:shadow-[0_0_30px_-10px_rgba(59,196,196,0.3)] hover:-translate-y-1"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover/card:scale-105 opacity-40"
                    style={{
                      backgroundImage: `url(https://img.youtube.com/vi/${script.id}/maxresdefault.jpg)`,
                    }}
                  />
                  <div className="absolute inset-0 bg-neutral-900/40" />
                  <div className="absolute inset-0 bg-linear-to-t from-neutral-950 via-neutral-900/60 to-transparent" />
                  <div className="absolute inset-0 bg-linear-to-br from-transparent to-[#3BC4C4]/5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                  <div className="p-5 sm:p-6 flex flex-col h-full relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border border-white/10 text-neutral-200 rounded-md group-hover/card:bg-[#3BC4C4] group-hover/card:text-black group-hover/card:border-[#3BC4C4] transition-colors duration-300">
                        {script.category || "스크립트"}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover/card:text-[#3BC4C4] transition-colors line-clamp-2 mb-2 drop-shadow-md">
                      {script.title}
                    </h3>
                    <div className="mt-auto pt-4 flex items-center text-xs font-semibold text-neutral-300 group-hover/card:text-[#3BC4C4] transition-colors">
                      상세 보기 &rarr;
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dots */}
      <div className="flex justify-center items-center mt-6 px-1">
        <div className="flex gap-3">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all duration-300 border ${
                index === selectedIndex
                  ? "bg-transparent border-[#3BC4C4] scale-125"
                  : "bg-neutral-800 border-transparent hover:bg-neutral-700"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            >
              <div
                className={`w-full h-full rounded-full ${index === selectedIndex ? "bg-[#3BC4C4] scale-50" : ""}`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
