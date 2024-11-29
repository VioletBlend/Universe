import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { DndContext, closestCenter, DragOverlay } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { Bubble } from './components/Bubble';
import { BookmarkDialog } from './components/BookmarkDialog';
import { useBookmarks } from './hooks/useBookmarks';
import { Background } from './components/Background';

interface DragEndEvent {
  active: { id: string };
  over?: { id: string } | null;
}

function App() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const { bookmarks, addBookmark, removeBookmark, reorderBookmarks } = useBookmarks();

  const handleDragStart = (event: { active: { id: string } }) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = bookmarks.findIndex((b) => b.id === active.id);
      const newIndex = bookmarks.findIndex((b) => b.id === over.id);
      reorderBookmarks(oldIndex, newIndex);
    }
    
    setActiveId(null);
  };

  const activeBookmark = activeId ? bookmarks.find(b => b.id === activeId) : null;

  return (
    <div className="min-h-screen">
      <Background />
      <div className="relative z-10 container mx-auto p-8">
        <DndContext
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={bookmarks.map(b => b.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
              <Bubble
                Icon={Plus}
                label="Add Bookmark"
                delay={0}
                onClick={() => setIsDialogOpen(true)}
              />
              
              {bookmarks.map((bookmark, index) => (
                <Bubble
                  key={bookmark.id}
                  emoji={bookmark.emoji}
                  label={bookmark.title}
                  delay={0.1 * (index + 1)}
                  url={bookmark.url}
                  onRemove={() => removeBookmark(bookmark.id)}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeId && activeBookmark ? (
              <Bubble
                emoji={activeBookmark.emoji}
                label={activeBookmark.title}
                delay={0}
                url={activeBookmark.url}
              />
            ) : null}
          </DragOverlay>
        </DndContext>

        <BookmarkDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAdd={addBookmark}
        />
      </div>
    </div>
  );
}

export default App;