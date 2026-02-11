import { limit, orderBy, where } from "firebase/firestore";
import { apiClient } from "../api/apiClient";
import type {
  Script,
  ScriptData,
  ScriptOverview,
  Category,
} from "../types/script";
import { ApiError } from "../api/errors";

export const scriptService = {
  async getAllScripts(): Promise<ScriptOverview[]> {
    return apiClient.getMany<ScriptOverview>("script");
  },

  async getScriptById(id: string): Promise<ScriptData> {
    const script = await apiClient.getOne<Script>(
      "script",
      id,
      "segments",
      "data",
    );

    if (!script) {
      throw new ApiError("스크립트를 찾을 수 없습니다.", "NOT_FOUND", 404);
    }

    const { segments: scripts = [], ...rest } = script;

    return {
      ...rest,
      id,
      scripts,
    } as ScriptData;
  },

  async getScriptMetadata(id: string): Promise<ScriptOverview> {
    const data = await apiClient.getOne<ScriptOverview>("script", id);
    if (!data) {
      throw new ApiError(
        "스크립트 메타데이터를 찾을 수 없습니다.",
        "NOT_FOUND",
        404,
      );
    }
    return data;
  },

  async getCategories(): Promise<Category[]> {
    return apiClient.getMany<Category>("categories");
  },

  async getCategoryById(id: string): Promise<Category> {
    const data = await apiClient.getOne<Category>("categories", id);
    if (!data) {
      throw new ApiError("카테고리를 찾을 수 없습니다.", "NOT_FOUND", 404);
    }
    return data;
  },

  async getScriptsByCategory(categoryName: string): Promise<ScriptOverview[]> {
    return apiClient.getMany<ScriptOverview>(
      "script",
      where("category", "==", categoryName),
    );
  },

  async getRecentScripts(): Promise<ScriptOverview[]> {
    return apiClient.getMany<ScriptOverview>(
      "script",
      orderBy("updatedAt", "desc"),
      limit(5),
    );
  },

  async getScriptsByIds(ids: string[]): Promise<ScriptOverview[]> {
    if (!ids || ids.length === 0) return [];

    return apiClient.getMany<ScriptOverview>(
      "script",
      where("__name__", "in", ids),
    );
  },
};
