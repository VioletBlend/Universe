import { useState, useEffect } from 'react';
import { Bookmark } from '../types/bookmark';
import { storage } from '../utils/storage';

export const useBookmarks = () => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  useEffect(() => {
    // Load bookmarks from storage on mount
    const loadBookmarks = async () => {
      const stored = await storage.get('bookmarks');
      if (stored) {
        setBookmarks(stored);
      }
    };
    loadBookmarks();
  }, []);

  const addBookmark = async (title: string, url: string, emoji: string) => {
    const newBookmark: Bookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      emoji,
      createdAt: Date.now(),
    };
    
    const updatedBookmarks = [newBookmark, ...bookmarks];
    setBookmarks(updatedBookmarks);
    
    // Save to storage
    await storage.set('bookmarks', updatedBookmarks);
  };

  const removeBookmark = async (id: string) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    
    // Save to storage
    await storage.set('bookmarks', updatedBookmarks);
  };

  return { bookmarks, addBookmark, removeBookmark };
};