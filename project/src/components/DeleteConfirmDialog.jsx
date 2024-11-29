import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function DeleteConfirmDialog({ isOpen, onClose, onConfirm, bookmarkTitle }) {
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
        className="bg-white/10 backdrop-blur-md rounded-xl p-6 w-full max-w-sm m-4"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Delete Bookmark</h2>
          <button onClick={onClose} className="text-white/70 hover:text-white">
            <X size={20} />
          </button>
        </div>
        <p className="text-white/90 mb-6">
          Are you sure you want to delete "{bookmarkTitle}"?
        </p>
        <div className="flex space-x-4">
          <button
            onClick={onConfirm}
            className="flex-1 py-2 px-4 bg-red-500/80 hover:bg-red-600/80 text-white rounded-lg transition-colors"
          >
            Delete
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            Cancel
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}