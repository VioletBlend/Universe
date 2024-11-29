import React from 'react';

export function Background() {
  return (
    <div className="fixed inset-0 -z-10">
      <div className="absolute inset-0 bg-[#000B1E]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(76,0,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(0,255,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(255,0,255,0.15),transparent_60%)]" />
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1539721972319-f0e80a00d424?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 backdrop-blur-[1px]" />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#000B1E] via-transparent to-transparent opacity-50" />
    </div>
  );
}