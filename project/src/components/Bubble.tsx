import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LucideIcon, X } from 'lucide-react';

interface BubbleProps {
  Icon?: LucideIcon;
  emoji?: string;
  label: string;
  delay: number;
  onClick?: () => void;
  url?: string;
  onRemove?: () => void;
}

export const Bubble: React.FC<BubbleProps> = ({ 
  Icon, 
  emoji,
  label, 
  delay, 
  onClick, 
  url, 
  onRemove 
}) => {
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
          delay: delay 
        }}
        whileHover={{ scale: 1.1 }}
        onClick={handleClick}
        className={`
          relative flex items-center justify-center w-24 h-24 
          bg-white/10 backdrop-blur-md rounded-full cursor-pointer 
          hover:bg-white/20 transition-all duration-300
          ${isGlowing ? 'animate-glow' : ''}
        `}
      >
        {Icon ? (
          <Icon className="w-8 h-8 text-white/90 group-hover:text-white" />
        ) : (
          <span className="text-4xl">{emoji}</span>
        )}
        {onRemove && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
            }}
            className="absolute -top-2 -right-2 w-6 h-6 bg-white/10 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/30"
          >
            <X size={14} className="text-white" />
          </button>
        )}
      </motion.div>
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}