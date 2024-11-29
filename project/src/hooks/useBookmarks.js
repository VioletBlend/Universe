import { useState, useEffect } from 'react';
import { storage } from '../utils/storage';

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    const loadBookmarks = async () => {
      const stored = await storage.get('bookmarks');
      if (stored) {
        setBookmarks(stored);
      }
    };
    loadBookmarks();
  }, []);

  const addBookmark = async (title, url, emoji, color) => {
    const newBookmark = {
      id: crypto.randomUUID(),
      title,
      url,
      emoji,
      color,
      createdAt: Date.now(),
    };
    
    const updatedBookmarks = [...bookmarks, newBookmark];
    setBookmarks(updatedBookmarks);
    await storage.set('bookmarks', updatedBookmarks);
  };

  const removeBookmark = async (id) => {
    const updatedBookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    setBookmarks(updatedBookmarks);
    await storage.set('bookmarks', updatedBookmarks);
  };

  return { bookmarks, addBookmark, removeBookmark };
}