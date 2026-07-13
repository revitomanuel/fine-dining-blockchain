import React from 'react';
import { useWallet } from '../../hooks/useWallet';

export const ConnectWallet = () => {
  const { account, connectWallet, loading } = useWallet();

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className={`px-4 py-2 text-xs uppercase tracking-widest font-medium transition-all duration-300 rounded border ${
        account
          ? 'bg-zinc-900 text-amber-400 border-amber-500/20 hover:border-amber-500/40'
          : 'bg-amber-600 hover:bg-amber-500 text-zinc-950 border-transparent font-semibold shadow-[0_0_15px_rgba(217,119,6,0.15)] hover:shadow-[0_0_20px_rgba(217,119,6,0.3)]'
      }`}
    >
      {loading ? (
        <span className="flex items-center gap-2">
          <span className="animate-spin h-3 w-3 border-2 border-zinc-950 border-t-transparent rounded-full" />
          Securing...
        </span>
      ) : account ? (
        `${account.substring(0, 6)}...${account.substring(38)}`
      ) : (
        'Access Console'
      )}
    </button>
  );
};