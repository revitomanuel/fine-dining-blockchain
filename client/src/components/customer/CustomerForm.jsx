import React, { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';

export const CustomerForm = () => {
  const { customerContract, account } = useWallet();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    allergies: '',
    seatingPreference: 'Chef\'s Table',
    winePreference: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !customerContract) {
      alert("Please authenticate your cryptographic identity wallet via MetaMask.");
      return;
    }

    try {
      setSubmitting(true);
      // Panggilan ethers v6 write operation ke blockchain ledger
      const tx = await customerContract.addCustomer(
        formData.id,
        formData.name,
        formData.allergies,
        formData.seatingPreference,
        formData.winePreference
      );
      await tx.wait();
      alert("Guest preferences successfully signed & written to block ledger.");
      setFormData({ id: '', name: '', allergies: '', seatingPreference: 'Chef\'s Table', winePreference: '' });
    } catch (err) {
      console.error(err);
      alert("Blockchain execution transaction error.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div>
        <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Guest Identifier (Cryptographic Key / ID)</label>
        <input
          type="text"
          required
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/40 rounded p-3 text-xs text-zinc-100 font-mono outline-none transition-all"
          placeholder="e.g., VIP-PASSPORT-009"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Full Name (Legal Profile)</label>
        <input
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/40 rounded p-3 text-xs text-zinc-100 outline-none transition-all"
          placeholder="e.g., Countess Vivienne Beauchamp"
        />
      </div>

      <div>
        <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Critical Medical Allergies</label>
        <input
          type="text"
          value={formData.allergies}
          onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
          className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/40 rounded p-3 text-xs text-zinc-100 outline-none transition-all"
          placeholder="e.g., Organic Truffles, Strict Seafood Anaphylaxis"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Table Layout Architecture</label>
          <select
            value={formData.seatingPreference}
            onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value })}
            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/40 rounded p-3 text-xs text-zinc-100 outline-none transition-all appearance-none"
          >
            <option value="Chef's Table">Chef's Table (Front Row)</option>
            <option value="Private Salon Noir">Private Salon Noir</option>
            <option value="Grand Window View">Grand Window View</option>
          </select>
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-widest text-zinc-400 mb-2 font-medium">Grand Cru Sommelier Allocation</label>
          <input
            type="text"
            value={formData.winePreference}
            onChange={(e) => setFormData({ ...formData, winePreference: e.target.value })}
            className="w-full bg-zinc-900/50 border border-zinc-800 focus:border-amber-500/40 rounded p-3 text-xs text-zinc-100 outline-none transition-all"
            placeholder="e.g., Romanée-Conti 1999"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full py-3.5 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-900 disabled:text-zinc-600 text-zinc-950 text-xs font-semibold uppercase tracking-widest transition-all rounded shadow-md"
      >
        {submitting ? 'Broadcasting Immutable Block...' : 'Commit Dossier to Blockchain'}
      </button>
    </form>
  );
};