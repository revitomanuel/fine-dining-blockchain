import React from 'react';

export const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-zinc-950 border border-zinc-900 rounded-lg p-6 shadow-xl relative overflow-hidden group ${className}`}>
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-amber-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      {children}
    </div>
  );
};