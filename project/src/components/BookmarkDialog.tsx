import React, { useState } from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';

interface BookmarkDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (title: string, url: string, emoji: string) => void;
}

export const BookmarkDialog: React.FC<BookmarkDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [emoji, setEmoji] = useState('🌐');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && url) {
      onAdd(title, url, emoji);
      setTitle('');
      setUrl('');
      setEmoji('🌐');
      onClose();
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-md m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Add Bookmark</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <button
              type="button"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 text-2xl flex items-center justify-center hover:bg-white/10 transition-colors"
            >
              {emoji}
            </button>
            {showEmojiPicker && (
              <div className="absolute top-full left-0 mt-2 z-50">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
            />
          </div>
          <div>
            <input
              type="url"
              placeholder="URL"
              value={url}
              onChange={e => setUrl(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-white/30"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Add Bookmark
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};