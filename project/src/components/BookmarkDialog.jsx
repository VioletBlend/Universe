import React, { useState, useRef } from 'react';
import { X, Upload } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

const BUBBLE_COLORS = [
  { name: 'Pink', value: 'bg-[#FF69B4]/20 hover:bg-[#FF69B4]/30' },
  { name: 'Red', value: 'bg-[#FF4444]/20 hover:bg-[#FF4444]/30' },
  { name: 'Orange', value: 'bg-[#FFA500]/20 hover:bg-[#FFA500]/30' },
  { name: 'Yellow', value: 'bg-[#FFD700]/20 hover:bg-[#FFD700]/30' },
  { name: 'Green', value: 'bg-[#32CD32]/20 hover:bg-[#32CD32]/30' },
  { name: 'Blue', value: 'bg-[#1E90FF]/20 hover:bg-[#1E90FF]/30' },
  { name: 'Purple', value: 'bg-[#9370DB]/20 hover:bg-[#9370DB]/30' },
];

export function BookmarkDialog({ isOpen, onClose, onAdd }) {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [iconType, setIconType] = useState('emoji');
  const [emoji, setEmoji] = useState('🌐');
  const [imageUrl, setImageUrl] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedColor, setSelectedColor] = useState(BUBBLE_COLORS[0].value);
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && url) {
      onAdd(title, url, iconType === 'emoji' ? emoji : imageUrl, selectedColor);
      setTitle('');
      setUrl('');
      setEmoji('🌐');
      setImageUrl('');
      setSelectedColor(BUBBLE_COLORS[0].value);
      onClose();
    }
  };

  const onEmojiClick = (emojiData) => {
    setEmoji(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImageUrl(event.target.result);
        setIconType('image');
      };
      reader.readAsDataURL(file);
    }
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
          <div className="flex gap-4">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                iconType === 'emoji' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              onClick={() => setIconType('emoji')}
            >
              Emoji
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                iconType === 'image' 
                  ? 'bg-white/20 text-white' 
                  : 'bg-white/5 text-white/70 hover:bg-white/10'
              }`}
              onClick={() => setIconType('image')}
            >
              Image
            </button>
          </div>

          <div className="relative">
            {iconType === 'emoji' ? (
              <>
                <button
                  type="button"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className={`w-12 h-12 rounded-lg ${selectedColor} text-2xl flex items-center justify-center transition-colors`}
                >
                  {emoji}
                </button>
                {showEmojiPicker && (
                  <div className="absolute left-0 mt-2 z-50">
                    <EmojiPicker
                      onEmojiClick={onEmojiClick}
                      width={320}
                      height={400}
                      searchPlaceholder="Search emojis..."
                      previewConfig={{
                        showPreview: true,
                        defaultCaption: "Pick an emoji for your bookmark!"
                      }}
                      categories={[
                        {
                          name: "Suggested",
                          category: "suggested"
                        },
                        {
                          name: "Smileys & People",
                          category: "smileys_people"
                        },
                        {
                          name: "Animals & Nature",
                          category: "animals_nature"
                        },
                        {
                          name: "Food & Drink",
                          category: "food_drink"
                        },
                        {
                          name: "Travel & Places",
                          category: "travel_places"
                        },
                        {
                          name: "Activities",
                          category: "activities"
                        },
                        {
                          name: "Objects",
                          category: "objects"
                        },
                        {
                          name: "Symbols",
                          category: "symbols"
                        }
                      ]}
                      theme="dark"
                      lazyLoadEmojis={true}
                    />
                  </div>
                )}
              </>
            ) : (
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={`w-full h-24 rounded-lg ${selectedColor} flex flex-col items-center justify-center transition-colors`}
                >
                  {imageUrl ? (
                    <img 
                      src={imageUrl} 
                      alt="Icon" 
                      className="w-16 h-16 rounded-full object-cover"
                    />
                  ) : (
                    <>
                      <Upload className="w-8 h-8 text-white/90 mb-2" />
                      <span className="text-sm text-white/90">Upload Image</span>
                    </>
                  )}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {BUBBLE_COLORS.map((color) => (
              <button
                key={color.value}
                type="button"
                onClick={() => setSelectedColor(color.value)}
                className={`w-8 h-8 rounded-full ${color.value} ${
                  selectedColor === color.value ? 'ring-2 ring-white' : ''
                }`}
                title={color.name}
              />
            ))}
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
}