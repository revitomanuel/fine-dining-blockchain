import React from 'react';

export const TransactionTable = ({ logs }) => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="w-full text-left font-mono text-xs text-zinc-400">
        <thead className="bg-zinc-900/40 text-zinc-500 border-b border-zinc-900 text-[10px] uppercase tracking-widest">
          <tr>
            <th className="p-4 font-normal">Block Number</th>
            <th className="p-4 font-normal">Transaction Hash</th>
            <th className="p-4 font-normal">Guest Pointer</th>
            <th className="p-4 font-normal">Operation Status</th>
            <th className="p-4 font-normal text-right">Timestamp</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-900/40">
          {logs.map((item, index) => (
            <tr key={index} className="hover:bg-zinc-900/20 transition-colors">
              <td className="p-4 text-zinc-500">#{item.block}</td>
              <td className="p-4 text-amber-500/80 hover:underline cursor-pointer">{item.hash}</td>
              <td className="p-4 text-zinc-200 font-sans">{item.customerId}</td>
              <td className="p-4">
                <span className="px-2 py-0.5 rounded text-[9px] uppercase tracking-wider bg-zinc-900 text-amber-400 border border-amber-500/20">
                  {item.action}
                </span>
              </td>
              <td className="p-4 text-right text-zinc-500 font-sans">{item.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};