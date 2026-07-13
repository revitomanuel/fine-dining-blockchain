import { Inbox } from 'lucide-react';

export const TransactionTable = ({ logs }) => {
  const formatDate = (timestamp) => {
    if (!timestamp) return '—';
    return new Date(timestamp * 1000).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short'
    });
  };

  if (!logs || logs.length === 0) {
    return (
      <div className="empty-state">
        <Inbox size={40} className="empty-state-icon" />
        <p className="empty-state-text">
          Belum ada data transaksi tercatat pada blockchain.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-premium">
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Customer ID</th>
            <th>Menu Items</th>
            <th>Total Price</th>
            <th>Special Request</th>
            <th className="text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((item, index) => (
            <tr key={index}>
              <td className="font-mono text-[var(--gold)]">#{item.transactionId}</td>
              <td className="font-mono text-zinc-200">#{item.customerId}</td>
              <td style={{ color: 'var(--text-primary)' }}>{item.menuItems}</td>
              <td className="font-mono">{item.totalPrice.toLocaleString()} Wei</td>
              <td className="italic">{item.specialRequest || '—'}</td>
              <td className="text-right font-mono text-caption">{formatDate(item.transactionDate)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};