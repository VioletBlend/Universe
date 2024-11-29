import React from 'react';
import { motion } from 'framer-motion';
import { Bookmark } from '../types/bookmark';
import { X, ExternalLink } from 'lucide-react';

interface BookmarkListProps {
  bookmarks: Bookmark[];
  onRemove: (id: string) => void;
}

export const BookmarkList: React.FC<BookmarkListProps> = ({ bookmarks, onRemove }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-4xl">
      {bookmarks.map((bookmark, index) => (
        <motion.div
          key={bookmark.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="group relative bg-white/10 backdrop-blur-md rounded-xl p-4 hover:bg-white/15 transition-colors"
        >
          <div className="flex justify-between items-start">
            <a
              href={bookmark.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-white/80 flex-1 truncate pr-8"
            >
              <h3 className="font-medium mb-1">{bookmark.title}</h3>
              <p className="text-sm text-white/60 truncate">{bookmark.url}</p>
            </a>
            <button
              onClick={() => onRemove(bookmark.id)}
              className="text-white/40 hover:text-white/90 transition-colors absolute top-4 right-4"
            >
              <X size={16} />
            </button>
          </div>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-4 right-4 text-white/40 hover:text-white/90 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </motion.div>
      ))}
    </div>
  );
};