import React from 'react';

export const CustomerDetail = ({ customer }) => {
  if (!customer) {
    return (
      <div className="h-full flex items-center justify-center text-xs text-zinc-500 tracking-wider italic py-12 border border-dashed border-zinc-900 rounded-lg">
        Select a secure ledger passport line to decrypt fine-dining state metadata.
      </div>
    );
  }

  return (
    <div className="space-y-6 border border-zinc-900 bg-zinc-950 p-6 rounded-lg">
      <div className="border-b border-zinc-900 pb-4">
        <span className="text-[9px] font-mono bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded uppercase tracking-wider">
          {customer.id}
        </span>
        <h3 className="text-xl font-light tracking-wide text-zinc-100 mt-3">{customer.name}</h3>
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-[9px] uppercase text-zinc-500 tracking-widest block mb-1">Anaphylaxis Warnings</span>
          <p className={`text-xs font-medium ${customer.allergies ? 'text-red-400 bg-red-950/20 border border-red-950/50 px-3 py-2 rounded' : 'text-zinc-400'}`}>
            {customer.allergies || "No active threat parameters documented."}
          </p>
        </div>

        <div>
          <span className="text-[9px] uppercase text-zinc-500 tracking-widest block mb-1">Architectural Seat Manifest</span>
          <p className="text-xs text-zinc-200">{customer.seatingPreference}</p>
        </div>

        <div>
          <span className="text-[9px] uppercase text-zinc-500 tracking-widest block mb-1">Cellar Wine Pairing Preference</span>
          <p className="text-xs font-serif italic text-amber-500">{customer.winePreference || "Standard Sommelier Pairing Strategy"}</p>
        </div>
      </div>
    </div>
  );
};