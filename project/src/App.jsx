import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Bubble } from './components/Bubble';
import { BookmarkDialog } from './components/BookmarkDialog';
import { DeleteConfirmDialog } from './components/DeleteConfirmDialog';
import { Background } from './components/Background';
import { ClockWeather } from './components/ClockWeather';
import { useBookmarks } from './hooks/useBookmarks';

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState({ isOpen: false, bookmark: null });
  const { bookmarks, addBookmark, removeBookmark } = useBookmarks();

  const handleDeleteClick = (bookmark) => {
    setDeleteDialog({ isOpen: true, bookmark });
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.bookmark) {
      removeBookmark(deleteDialog.bookmark.id);
      setDeleteDialog({ isOpen: false, bookmark: null });
    }
  };

  const calculatePosition = (index, total) => {
    if (total === 0) return { left: '50%', top: '50%' };
    
    const radius = Math.min(window.innerWidth, window.innerHeight) * 0.25;
    const angleOffset = -Math.PI / 2;
    const angle = angleOffset + (index * (2 * Math.PI)) / Math.max(1, total);
    
    return {
      left: `calc(50% + ${radius * Math.cos(angle)}px)`,
      top: `calc(50% + ${radius * Math.sin(angle)}px)`,
      transform: 'translate(-50%, -50%)'
    };
  };

  return (
    <div className="w-full h-screen relative overflow-hidden">
      <Background />
      <ClockWeather />
      
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          {/* Center Add Button */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
            <Bubble
              Icon={Plus}
              label="Add Bookmark"
              delay={0}
              onClick={() => setIsDialogOpen(true)}
              color="bg-[#98FFB3]/20 hover:bg-[#98FFB3]/30"
            />
          </div>
          
          {/* Bookmarks in circle */}
          {bookmarks.map((bookmark, index) => (
            <div
              key={bookmark.id}
              className="absolute z-10"
              style={calculatePosition(index, bookmarks.length)}
            >
              <Bubble
                emoji={bookmark.emoji}
                label={bookmark.title}
                delay={0.1 * (index + 1)}
                url={bookmark.url}
                onRemove={() => handleDeleteClick(bookmark)}
                color={bookmark.color}
              />
            </div>
          ))}
        </div>

        <BookmarkDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={addBookmark}
        />

        <DeleteConfirmDialog
          isOpen={deleteDialog.isOpen}
          onClose={() => setDeleteDialog({ isOpen: false, bookmark: null })}
          onConfirm={handleConfirmDelete}
          bookmarkTitle={deleteDialog.bookmark?.title}
        />
      </div>
    </div>
  );
}

export default App;