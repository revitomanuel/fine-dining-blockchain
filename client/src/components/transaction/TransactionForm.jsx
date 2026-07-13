import React, { useState } from 'react';

export const TransactionForm = () => {
  const [submitting, setSubmitting] = useState(false);
  const [log, setLog] = useState({ customerId: '', details: '' });

  const handlePostLog = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      // Integrasi pengiriman transaksi state pembaruan ke ethereum
      alert(`Cryptographic signature request emitted for Guest ID: ${log.customerId}`);
      setLog({ customerId: '', details: '' });
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handlePostLog} className="space-y-4 max-w-xl">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div className="md:col-span-1">
          <label className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-2 font-mono">Guest Account ID</label>
          <input
            type="text"
            required
            value={log.customerId}
            onChange={(e) => setLog({ ...log, customerId: e.target.value })}
            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500/40 rounded p-2.5 text-xs text-zinc-100 font-mono outline-none"
            placeholder="VIP-001"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-[10px] uppercase text-zinc-500 tracking-widest mb-2 font-mono">Service Revision / Order Notes</label>
          <input
            type="text"
            required
            value={log.details}
            onChange={(e) => setLog({ ...log, details: e.target.value })}
            className="w-full bg-zinc-900/60 border border-zinc-800 focus:border-amber-500/40 rounded p-2.5 text-xs text-zinc-100 outline-none"
            placeholder="e.g., Requested rare doneness for Wagyu A5"
          />
        </div>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="px-5 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-amber-500/20 text-amber-400 text-[10px] uppercase tracking-widest font-semibold rounded transition-all"
      >
        {submitting ? 'Mining...' : 'Authorize Audit Log Entry'}
      </button>
    </form>
  );
};