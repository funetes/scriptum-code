import { describe, it, expect, vi, beforeEach } from "vitest";
import { storageService } from "./storageService";

describe("storageService", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("should store and retrieve metadata correctly", () => {
    const mockId = "test-script-id";
    const mockMetadata = {
      currentTime: 120,
      duration: 300,
    };

    storageService.setMetadata(mockId, mockMetadata as any);
    const retrieved = storageService.getMetadata(mockId);

    expect(retrieved).toEqual(mockMetadata);
    expect(localStorage.getItem(mockId)).toBe(JSON.stringify(mockMetadata));
  });

  it("should return null for non-existent id", () => {
    const retrieved = storageService.getMetadata("non-existent");
    expect(retrieved).toBeNull();
  });

  it("should handle JSON parse errors gracefully", () => {
    localStorage.setItem("bad-data", "invalid-json");
    const retrieved = storageService.getMetadata("bad-data");
    expect(retrieved).toBeNull();
  });

  it("should remove metadata correctly", () => {
    const id = "remove-me";
    storageService.setMetadata(id, { currentTime: 10 } as any);
    storageService.removeMetadata(id);
    expect(storageService.getMetadata(id)).toBeNull();
  });
});
