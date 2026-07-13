import React, { useState } from 'react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const [metrics] = useState({
    activeProfiles: "1,240",
    blockConfirmations: "98.2K",
    gasSaved: "0.041 Gwei"
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-light tracking-wide text-zinc-100 uppercase">Executive Dashboard Summary</h2>
        <p className="text-zinc-500 text-xs mt-1">Real-time status monitoring of decentralized guest profile matrices.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Secured VIP Registers", val: metrics.activeProfiles, sub: "Total encrypted identities" },
          { label: "Immutable Audit Logs", val: metrics.blockConfirmations, sub: "Total on-chain operations" },
          { label: "Active Gas Optimization", val: metrics.gasSaved, sub: "EIP-1559 standard telemetry" }
        ].map((m, i) => (
          <Card key={i}>
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 block mb-2">{m.label}</span>
            <span className="text-3xl font-light text-zinc-100 tracking-tight font-mono">{m.val}</span>
            <p className="text-[11px] text-zinc-400 mt-2">{m.sub}</p>
          </Card>
        ))}
      </div>

      <Card className="p-8">
        <h3 className="text-sm uppercase tracking-widest text-zinc-300 font-medium mb-3">Quick Operational Gateways</h3>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/customers/add')}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-amber-400 uppercase tracking-widest transition-all rounded"
          >
            + New Passport
          </button>
          <button
            onClick={() => navigate('/customers')}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs text-zinc-300 uppercase tracking-widest transition-all rounded"
          >
            Review Registers
          </button>
        </div>
      </Card>
    </div>
  );
};