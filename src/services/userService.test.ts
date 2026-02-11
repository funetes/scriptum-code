import { describe, it, expect, vi, beforeEach } from "vitest";
import { userService } from "./userService";
import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";

// Mock firebase/firestore
vi.mock("firebase/firestore", () => {
  const mockDocRef = { id: "mock-id" };
  return {
    doc: vi.fn(() => mockDocRef),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    deleteDoc: vi.fn(),
    collection: vi.fn(() => ({ id: "mock-collection" })),
    query: vi.fn(() => ({ id: "mock-query" })),
    where: vi.fn(),
    getDocs: vi.fn(),
    serverTimestamp: vi.fn(() => "mock-timestamp"),
  };
});

// Mock the db instance
vi.mock("../../firebase.config", () => ({
  db: {},
}));

describe("userService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("syncUser", () => {
    it("should create a new user profile if it doesn't exist", async () => {
      const mockUser = {
        uid: "user-123",
        email: "test@example.com",
        displayName: "Test User",
        photoURL: "http://example.com/photo.jpg",
      };

      const mockSnap = { exists: () => false };
      (getDoc as any).mockResolvedValue(mockSnap);

      await userService.syncUser(mockUser as any);

      expect(doc).toHaveBeenCalledWith(expect.anything(), "users", "user-123");
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          email: "test@example.com",
          displayName: "Test User",
        }),
      );
    });

    it("should update lastLogin if user already exists", async () => {
      const mockUser = { uid: "user-123" };
      const mockSnap = {
        exists: () => true,
        id: "user-123",
        data: () => ({}),
      };
      (getDoc as any).mockResolvedValue(mockSnap);

      await userService.syncUser(mockUser as any);

      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        { lastLogin: "mock-timestamp" },
        { merge: true },
      );
    });
  });

  describe("isFavorite", () => {
    it("should return true if favorite exists", async () => {
      (getDoc as any).mockResolvedValue({
        exists: () => true,
        id: "script-1",
        data: () => ({}),
      });
      const result = await userService.isFavorite("user-1", "script-1");
      expect(result).toBe(true);
    });

    it("should return false if favorite does not exist", async () => {
      (getDoc as any).mockResolvedValue({ exists: () => false });
      const result = await userService.isFavorite("user-1", "script-1");
      expect(result).toBe(false);
    });
  });

  describe("toggleFavorite", () => {
    it("should delete favorite if isFavorite is true", async () => {
      await userService.toggleFavorite("user-1", "script-1", true);
      expect(deleteDoc).toHaveBeenCalled();
    });

    it("should add favorite if isFavorite is false", async () => {
      await userService.toggleFavorite("user-1", "script-1", false);
      expect(setDoc).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          scriptId: "script-1",
        }),
      );
    });
  });
});
