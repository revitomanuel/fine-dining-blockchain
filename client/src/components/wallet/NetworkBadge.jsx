import { useWallet } from '../../hooks/useWallet';
import { NETWORK } from '../../config/network';
import { Wifi, WifiOff } from 'lucide-react';

export const NetworkBadge = () => {
  const { isCorrectNetwork, account } = useWallet();

  if (!account) return null;

  return (
    <div
      className="badge"
      style={{
        background: isCorrectNetwork ? 'var(--success-dim)' : 'var(--danger-dim)',
        color: isCorrectNetwork ? 'var(--success)' : 'var(--danger)',
        borderColor: isCorrectNetwork ? 'var(--success-border)' : 'var(--danger-border)',
        fontFamily: 'monospace',
        fontSize: '0.6875rem',
        letterSpacing: '0.05em',
      }}
    >
      {isCorrectNetwork ? <Wifi size={12} /> : <WifiOff size={12} />}
      <span
        style={{
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: isCorrectNetwork ? 'var(--success)' : 'var(--danger)',
          animation: isCorrectNetwork ? 'none' : 'pulse-dot 1.5s ease-in-out infinite',
        }}
      />
      {isCorrectNetwork ? NETWORK.name : 'Wrong Network'}
    </div>
  );
};