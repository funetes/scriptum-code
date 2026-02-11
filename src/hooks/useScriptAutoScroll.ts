import { useState, useRef, useEffect, useCallback } from "react";
import { useDebouncedCallback } from "@tanstack/react-pacer";

const SCRIPT_MARGIN = 16;

export function useScriptAutoScroll() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [height, setHeight] = useState(0);
  const [manualScroll, setManualScroll] = useState(false);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const isFirstScroll = useRef(true);

  const scrollToIndex = useCallback((index: number) => {
    if (index < 0) return;

    const calculatedHeight = itemRefs.current
      .filter((_, i) => i < index)
      .reduce((acc, cur) => {
        if (!cur) return 0;
        return cur.getBoundingClientRect().height + acc + SCRIPT_MARGIN;
      }, 0);

    setHeight(calculatedHeight);
    window.scrollTo({
      behavior: isFirstScroll.current ? "instant" : "smooth",
      top: calculatedHeight,
    });

    if (isFirstScroll.current) {
      isFirstScroll.current = false;
    }
  }, []);

  const scrollToCurrentScript = useCallback(() => {
    scrollToIndex(activeIndex);
  }, [activeIndex, scrollToIndex]);

  const manualScrollDetectedCallback = useDebouncedCallback(
    () => {
      if (Math.abs(Math.floor(height) - Math.floor(window.scrollY)) > 5) {
        setManualScroll(true);
      }
    },
    { wait: 100 },
  );

  useEffect(() => {
    if (activeIndex >= 0 && !manualScroll) {
      scrollToCurrentScript();
    }
  }, [activeIndex, manualScroll, scrollToCurrentScript]);

  useEffect(() => {
    const handleScroll = () => manualScrollDetectedCallback();
    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [manualScrollDetectedCallback]);

  return {
    activeIndex,
    setActiveIndex,
    manualScroll,
    setManualScroll,
    itemRefs,
    scrollToCurrentScript,
    scrollToIndex,
  };
}
