import React, { useState } from 'react';
import { Search } from 'lucide-react';

export const SearchBar: React.FC = () => {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative w-full max-w-2xl transition-all duration-300 ${focused ? 'scale-105' : ''}`}>
      <div className="absolute inset-0 bg-white/10 backdrop-blur-md rounded-full" />
      <div className="relative flex items-center">
        <Search className="absolute left-6 w-5 h-5 text-white/70" />
        <input
          type="text"
          placeholder="Search or enter address"
          className="w-full py-4 px-16 bg-transparent text-white placeholder-white/50 focus:outline-none"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      </div>
    </div>
  );
}