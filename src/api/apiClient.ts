import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  deleteDoc,
  query,
  type QueryConstraint,
  type DocumentData,
  type SetOptions,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { mapFirebaseError } from "./errors";

export const apiClient = {
  async getOne<T>(path: string, ...pathSegments: string[]): Promise<T | null> {
    try {
      const docRef = doc(db, path, ...pathSegments);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) return null;
      return { id: docSnap.id, ...docSnap.data() } as T;
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  async getMany<T>(
    path: string,
    ...constraints: QueryConstraint[]
  ): Promise<T[]> {
    try {
      const q = query(collection(db, path), ...constraints);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() }) as T,
      );
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  async set(
    path: string,
    data: DocumentData,
    options?: SetOptions,
    ...pathSegments: string[]
  ): Promise<void> {
    try {
      const docRef = doc(db, path, ...pathSegments);
      if (options) {
        await setDoc(docRef, data, options);
      } else {
        await setDoc(docRef, data);
      }
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },

  async remove(path: string, ...pathSegments: string[]): Promise<void> {
    try {
      const docRef = doc(db, path, ...pathSegments);
      await deleteDoc(docRef);
    } catch (error) {
      throw mapFirebaseError(error);
    }
  },
};
