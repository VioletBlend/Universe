import { Bookmark } from '../types/bookmark';

class StorageAdapter {
  private isExtension: boolean;

  constructor() {
    this.isExtension = typeof chrome !== 'undefined' && chrome.storage !== undefined;
  }

  async get(key: string): Promise<any> {
    if (this.isExtension) {
      return new Promise((resolve) => {
        chrome.storage.local.get([key], (result) => {
          resolve(result[key]);
        });
      });
    } else {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    }
  }

  async set(key: string, value: any): Promise<void> {
    if (this.isExtension) {
      await chrome.storage.local.set({ [key]: value });
    } else {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
}

export const storage = new StorageAdapter();