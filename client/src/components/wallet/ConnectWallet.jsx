import { useWallet } from '../../hooks/useWallet';
import { Wallet, Loader2 } from 'lucide-react';

export const ConnectWallet = () => {
  const { account, connectWallet, loading } = useWallet();

  return (
    <button
      onClick={connectWallet}
      disabled={loading}
      className="flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-[0.12em] font-semibold rounded-lg"
      style={{
        transition: 'all var(--transition-base)',
        background: account
          ? 'var(--bg-elevated)'
          : 'linear-gradient(135deg, var(--gold), #C4A030)',
        color: account ? 'var(--gold)' : '#0A0A0A',
        border: account
          ? '1px solid var(--gold-border)'
          : '1px solid transparent',
        boxShadow: account
          ? 'none'
          : '0 2px 15px rgba(212,175,55,0.2)',
      }}
      onMouseEnter={(e) => {
        if (account) {
          e.currentTarget.style.borderColor = 'var(--gold)';
          e.currentTarget.style.boxShadow = '0 0 15px var(--gold-glow)';
        } else {
          e.currentTarget.style.boxShadow = '0 4px 25px rgba(212,175,55,0.3)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (account) {
          e.currentTarget.style.borderColor = 'var(--gold-border)';
          e.currentTarget.style.boxShadow = 'none';
        } else {
          e.currentTarget.style.boxShadow = '0 2px 15px rgba(212,175,55,0.2)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {loading ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          <span>Securing...</span>
        </>
      ) : account ? (
        <>
          <Wallet size={14} />
          <span style={{ fontFamily: 'monospace' }}>
            {account.substring(0, 6)}...{account.substring(38)}
          </span>
        </>
      ) : (
        <>
          <Wallet size={14} />
          <span>Connect Wallet</span>
        </>
      )}
    </button>
  );
};