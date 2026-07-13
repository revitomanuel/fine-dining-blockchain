import { ConnectWallet } from '../wallet/ConnectWallet';
import { NetworkBadge } from '../wallet/NetworkBadge';
import { Gem } from 'lucide-react';

export const Navbar = () => {
  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        borderBottom: '1px solid var(--border-primary)',
        background: 'rgba(10, 10, 10, 0.85)',
      }}
    >
      <div className="flex items-center justify-between px-8 py-4">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center"
            style={{
              width: 36,
              height: 36,
              borderRadius: 'var(--radius-md)',
              background: 'var(--gold-dim)',
              border: '1px solid var(--gold-border)',
            }}
          >
            <Gem size={18} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <h1
              className="text-lg font-light tracking-[0.25em]"
              style={{ color: 'var(--text-primary)', lineHeight: 1.2 }}
            >
              L'ÉTOILE{' '}
              <span
                className="font-semibold text-xs tracking-normal ml-1"
                style={{ color: 'var(--gold)' }}
              >
                CHAIN
              </span>
            </h1>
            <p
              className="text-[9px] tracking-[0.3em] uppercase"
              style={{ color: 'var(--text-muted)' }}
            >
              Blockchain Fine Dining
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <NetworkBadge />
          <ConnectWallet />
        </div>
      </div>

      {/* Gold gradient line */}
      <div
        style={{
          height: 1,
          background: 'linear-gradient(90deg, transparent, var(--gold-border), transparent)',
        }}
      />
    </header>
  );
};