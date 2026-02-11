import { describe, it, expect, vi, beforeEach } from "vitest";
import { scriptService } from "./scriptService";
import { getDocs, getDoc, doc, collection, where } from "firebase/firestore";

// Mock firebase/firestore
vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  orderBy: vi.fn(),
  limit: vi.fn(),
}));

// Mock the db instance
vi.mock("../../firebase.config", () => ({
  db: {},
}));

describe("scriptService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAllScripts", () => {
    it("should fetch all scripts and return them as an array", async () => {
      const mockDocs = [
        { id: "1", exists: () => true, data: () => ({ title: "Script 1" }) },
        { id: "2", exists: () => true, data: () => ({ title: "Script 2" }) },
      ];
      (getDocs as any).mockResolvedValue({ docs: mockDocs });

      const result = await scriptService.getAllScripts();

      expect(result).toHaveLength(2);
      expect(result[0]).toEqual({ id: "1", title: "Script 1" });
      expect(collection).toHaveBeenCalledWith(expect.anything(), "script");
    });
  });

  describe("getScriptById", () => {
    it("should fetch script segments data by id", async () => {
      const mockResult = {
        id: "test-id",
        exists: () => true,
        data: () => ({
          segments: [{ text: "Hello" }],
          title: "Test Script",
        }),
      };
      (getDoc as any).mockResolvedValue(mockResult);

      const result = await scriptService.getScriptById("test-id");

      expect(result).toEqual({
        id: "test-id",
        scripts: [{ text: "Hello" }],
        title: "Test Script",
      });
      expect(doc).toHaveBeenCalledWith(
        expect.anything(),
        "script",
        "test-id",
        "segments",
        "data",
      );
    });
  });

  describe("getScriptMetadata", () => {
    it("should fetch script metadata by id", async () => {
      const mockResult = {
        id: "test-id",
        exists: () => true,
        data: () => ({ title: "Metadata Title" }),
      };
      (getDoc as any).mockResolvedValue(mockResult);

      const result = await scriptService.getScriptMetadata("test-id");

      expect(result).toEqual({
        id: "test-id",
        title: "Metadata Title",
      });
      expect(doc).toHaveBeenCalledWith(expect.anything(), "script", "test-id");
    });
  });

  describe("getScriptsByCategory", () => {
    it("should fetch scripts filtered by category", async () => {
      const mockDocs = [
        {
          id: "1",
          exists: () => true,
          data: () => ({ title: "Cat Script", category: "News" }),
        },
      ];
      (getDocs as any).mockResolvedValue({ docs: mockDocs });

      const result = await scriptService.getScriptsByCategory("News");

      expect(result).toHaveLength(1);
      expect(result[0].category).toBe("News");
      expect(where).toHaveBeenCalledWith("category", "==", "News");
    });
  });
});
