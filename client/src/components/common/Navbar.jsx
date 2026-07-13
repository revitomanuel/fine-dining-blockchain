import React from 'react';
import { ConnectWallet } from '../wallet/ConnectWallet';
import { NetworkBadge } from '../wallet/NetworkBadge';

export const Navbar = () => {
  return (
    <header className="border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
        <h1 className="text-lg font-light tracking-[0.25em] text-zinc-100">
          L'ÉTOILE <span className="text-amber-500 font-normal text-xs tracking-normal ml-0.5">CHAIN</span>
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <NetworkBadge />
        <ConnectWallet />
      </div>
    </header>
  );
};