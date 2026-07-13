import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, UserPlus, ScrollText, Hexagon } from 'lucide-react';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/customers', label: 'Guest Directories', icon: Users },
    { path: '/customers/add', label: 'Register VIP Patron', icon: UserPlus },
    { path: '/transactions', label: 'Audit Trail Records', icon: ScrollText }
  ];

  return (
    <aside
      className="w-64 flex flex-col justify-between shrink-0"
      style={{
        background: 'var(--bg-sidebar)',
        borderRight: '1px solid var(--border-primary)',
        minHeight: 'calc(100vh - 77px)',
      }}
    >
      <nav className="p-5 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className="w-full text-left flex items-center gap-3 px-4 py-3 rounded-lg text-xs uppercase tracking-[0.12em] font-medium"
              style={{
                transition: 'all var(--transition-base)',
                background: isActive ? 'var(--gold-dim)' : 'transparent',
                color: isActive ? 'var(--gold)' : 'var(--text-muted)',
                borderLeft: isActive ? '3px solid var(--gold)' : '3px solid transparent',
                borderRadius: 'var(--radius-md)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'var(--bg-hover)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }
              }}
            >
              <Icon size={16} style={{ opacity: isActive ? 1 : 0.6, flexShrink: 0 }} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div
        className="p-5"
        style={{ borderTop: '1px solid var(--border-primary)' }}
      >
        <div className="flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
          <Hexagon size={12} style={{ color: 'var(--gold)', opacity: 0.5 }} />
          <span
            className="text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: 'monospace' }}
          >
            Sepolia · v1.0.0
          </span>
        </div>
      </div>
    </aside>
  );
};