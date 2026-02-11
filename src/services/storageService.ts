import type { PlaybackMetadata } from "../types/script";

export const storageService = {
  getMetadata(id: string): PlaybackMetadata | null {
    const data = localStorage.getItem(id);
    if (!data) return null;
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse playback metadata", e);
      return null;
    }
  },

  setMetadata(id: string, metadata: PlaybackMetadata): void {
    localStorage.setItem(id, JSON.stringify(metadata));
  },

  removeMetadata(id: string): void {
    localStorage.removeItem(id);
  },
};
