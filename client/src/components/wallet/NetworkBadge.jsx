import React from 'react';
import { useWallet } from '../../hooks/useWallet';
import { NETWORK_CONFIG } from '../../config/network';

export const NetworkBadge = () => {
  const { isCorrectNetwork, account } = useWallet();

  if (!account) return null;

  return (
    <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-mono tracking-wider transition-all duration-300 ${
      isCorrectNetwork 
        ? 'bg-emerald-950/40 text-emerald-400 border-emerald-900/50' 
        : 'bg-red-950/40 text-red-400 border-red-900/50 animate-pulse'
    }`}>
      <span className={`h-1.5 w-1.5 rounded-full ${isCorrectNetwork ? 'bg-emerald-400' : 'bg-red-400'}`} />
      {isCorrectNetwork ? NETWORK_CONFIG.name : 'Wrong Network'}
    </div>
  );
};