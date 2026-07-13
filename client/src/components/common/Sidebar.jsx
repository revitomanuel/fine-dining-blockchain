import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/', label: 'Dashboard' },
    { path: '/customers', label: 'Guest Directories' },
    { path: '/customers/add', label: 'Register VIP Patron' },
    { path: '/transactions', label: 'Audit Trail Records' }
  ];

  return (
    <aside className="w-64 border-r border-zinc-900 p-6 bg-zinc-950 flex flex-col justify-between min-h-[calc(100vh-73px)]">
      <nav className="space-y-1.5">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full text-left px-4 py-3 rounded text-xs uppercase tracking-widest transition-all ${
                isActive
                  ? 'bg-zinc-900 text-amber-400 border-l-2 border-amber-500 font-medium'
                  : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/40'
              }`}
            >
              {item.label}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-zinc-900 pt-4 text-[10px] font-mono text-zinc-600 tracking-wider uppercase">
        Node: Sepolia / v1.0.0
      </div>
    </aside>
  );
};