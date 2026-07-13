import React from 'react';

export const CustomerTable = ({ data, onSelectRow }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left text-xs text-zinc-400">
        <thead className="text-[10px] uppercase bg-zinc-900/60 text-zinc-500 tracking-widest border-b border-zinc-900">
          <tr>
            <th className="p-4 font-normal">Vault ID</th>
            <th className="p-4 font-normal">Patron Name</th>
            <th className="p-4 font-normal">Ambiance</th>
            <th className="p-4 font-normal text-right">Archival File</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900/50">
          {data.map((customer) => (
            <tr
              key={customer.id}
              onClick={() => onSelectRow(customer)}
              className="hover:bg-zinc-900/30 cursor-pointer transition-colors group"
            >
              <td className="p-4 font-mono text-amber-500/80">{customer.id}</td>
              <td className="p-4 font-medium text-zinc-200">{customer.name}</td>
              <td className="p-4 text-zinc-400">{customer.seatingPreference}</td>
              <td className="p-4 text-right text-zinc-500 group-hover:text-amber-400 transition-colors">
                Decrypt Dossier →
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};