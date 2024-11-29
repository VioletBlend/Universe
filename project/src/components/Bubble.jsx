import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export function Bubble({ Icon, emoji, image, label, delay, onClick, url, onRemove, color = 'bg-white/10 hover:bg-white/20' }) {
  const [isGlowing, setIsGlowing] = useState(false);

  const handleClick = () => {
    if (url) {
      setIsGlowing(true);
      setTimeout(() => {
        window.open(url, '_blank');
        setIsGlowing(false);
      }, 300);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div className="relative group">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ 
          type: "spring",
          stiffness: 260,
          damping: 20,
          delay 
        }}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
        className={`
          relative flex items-center justify-center w-24 h-24 
          ${color} backdrop-blur-md rounded-full cursor-pointer 
          transition-all duration-300
          ${isGlowing ? 'animate-glow ring-2 ring-cyan-500 ring-opacity-50' : ''}
        `}
      >
        {Icon ? (
          <Icon className="w-8 h-8 text-white/90 group-hover:text-white" />
        ) : image ? (
          <img 
            src={image} 
            alt={label}
            className="w-16 h-16 rounded-full object-cover"
          />
        ) : (
          <span className="text-4xl select-none">{emoji}</span>
        )}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
          >
            <X size={14} className="text-white" />
          </button>
        )}
      </motion.div>
    </div>
  );
}