import { useState, useRef } from "react";
import { useThrottledCallback } from "@tanstack/react-pacer";

import { storageService } from "../services/storageService";
import type { ScriptItem } from "../types/script";

// Interface matching HTMLMediaElement properties as the ref seems to forward to the DOM node
interface PlayerElement {
  currentTime: number;
  duration: number;
  playbackRate: number;
}

export function usePlayerSync(
  id: string,
  scripts: ScriptItem[],
  setActiveIndex: (index: number) => void,
) {
  const [playing, setPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isRepeating, setIsRepeating] = useState(false);
  const playerRef = useRef<PlayerElement>(null);

  const updateActiveIndexCallback = useThrottledCallback(
    () => {
      if (!playerRef.current) return;
      const internalPlayer = playerRef.current;
      const playingTime = internalPlayer.currentTime;

      let foundIndex = -1;
      scripts.forEach((item, i) => {
        const currentTime = item.start;
        const nextItem = scripts[i + 1];
        const nextTime = nextItem ? nextItem.start : Infinity;

        if (playingTime >= currentTime && playingTime < nextTime) {
          foundIndex = i;
        }
      });

      if (foundIndex !== -1) {
        setActiveIndex(foundIndex);

        // Handle repeat logic
        if (isRepeating) {
          const currentItem = scripts[foundIndex];
          const nextItem = scripts[foundIndex + 1];
          const nextTime = nextItem ? nextItem.start : currentItem.start + 5; // fallback to 5s if last

          if (playingTime >= nextTime - 0.2) {
            internalPlayer.currentTime = currentItem.start;
          }
        }
      }
    },
    { wait: 200 }, // Reduced wait for smoother repeat
  );

  const autoSaveCallback = useThrottledCallback(
    () => {
      if (!playing || !playerRef.current) return;
      const internalPlayer = playerRef.current;

      storageService.setMetadata(id, {
        time: Math.floor(internalPlayer.currentTime || 0),
        rate: playbackRate,
        duration: Math.floor(internalPlayer.duration || 0),
      });
    },
    { wait: 3000 },
  );

  return {
    playing,
    setPlaying,
    playbackRate,
    setPlaybackRate,
    playerRef,
    updateActiveIndexCallback,
    autoSaveCallback,
    isRepeating,
    setIsRepeating,
  };
}
