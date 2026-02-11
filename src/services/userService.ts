import { serverTimestamp, where } from "firebase/firestore";
import type { User } from "firebase/auth";
import { apiClient } from "../api/apiClient";

export const userService = {
  async syncUser(user: User) {
    const userPath = "users";
    const userId = user.uid;

    const userDoc = await apiClient.getOne(userPath, userId);

    if (!userDoc) {
      await apiClient.set(
        userPath,
        {
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          createdAt: serverTimestamp(),
          lastLogin: serverTimestamp(),
        },
        undefined,
        userId,
      );
    } else {
      await apiClient.set(
        userPath,
        {
          lastLogin: serverTimestamp(),
        },
        { merge: true },
        userId,
      );
    }
  },

  async toggleFavorite(userId: string, scriptId: string, isFavorite: boolean) {
    const path = `users/${userId}/favorites`;
    if (isFavorite) {
      await apiClient.remove(path, scriptId);
    } else {
      await apiClient.set(
        path,
        {
          scriptId,
          createdAt: serverTimestamp(),
        },
        undefined,
        scriptId,
      );
    }
  },

  async isFavorite(userId: string, scriptId: string): Promise<boolean> {
    const data = await apiClient.getOne(`users/${userId}/favorites`, scriptId);
    return !!data;
  },

  async toggleBookmark(
    userId: string,
    scriptId: string,
    segmentIndex: number,
    isBookmarked: boolean,
  ) {
    const bookmarkId = `${scriptId}_${segmentIndex}`;
    const path = `users/${userId}/bookmarks`;
    if (isBookmarked) {
      await apiClient.remove(path, bookmarkId);
    } else {
      await apiClient.set(
        path,
        {
          scriptId,
          segmentIndex,
          createdAt: serverTimestamp(),
        },
        undefined,
        bookmarkId,
      );
    }
  },

  async getBookmarks(userId: string, scriptId: string): Promise<number[]> {
    const data = await apiClient.getMany<{ segmentIndex: number }>(
      `users/${userId}/bookmarks`,
      where("scriptId", "==", scriptId),
    );
    return data.map((item) => item.segmentIndex);
  },

  async getAllFavorites(userId: string): Promise<string[]> {
    const data = await apiClient.getMany<{ id: string }>(
      `users/${userId}/favorites`,
    );
    return data.map((item) => item.id);
  },

  async deleteUserData(userId: string): Promise<void> {
    // 1. Delete all favorites
    const favorites = await apiClient.getMany<{ id: string }>(
      `users/${userId}/favorites`,
    );
    const favoriteDeletePromises = favorites.map((fav) =>
      apiClient.remove(`users/${userId}/favorites`, fav.id),
    );

    // 2. Delete all bookmarks
    const bookmarks = await apiClient.getMany<{ id: string }>(
      `users/${userId}/bookmarks`,
    );
    const bookmarkDeletePromises = bookmarks.map((bookmark) =>
      apiClient.remove(`users/${userId}/bookmarks`, bookmark.id),
    );

    // Wait for subcollections to be deleted
    await Promise.all([...favoriteDeletePromises, ...bookmarkDeletePromises]);

    // 3. Delete user document
    await apiClient.remove("users", userId);
  },
};
