import { ChevronRight, Inbox } from 'lucide-react';

export const CustomerTable = ({ data, onSelectRow }) => {
  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <Inbox size={40} className="empty-state-icon" />
        <p className="empty-state-text">
          Belum ada data customer. Tambahkan customer baru melalui menu Register VIP Patron.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto w-full">
      <table className="table-premium">
        <thead>
          <tr>
            <th>ID</th>
            <th>Full Name</th>
            <th>Phone</th>
            <th>Favorite Menu</th>
            <th className="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((customer) => (
            <tr
              key={customer.customerId}
              onClick={() => onSelectRow(customer)}
              className="cursor-pointer group"
            >
              <td className="font-mono" style={{ color: 'var(--gold)' }}>#{customer.customerId}</td>
              <td className="font-medium" style={{ color: 'var(--text-primary)' }}>{customer.fullName}</td>
              <td className="font-mono">{customer.phoneNumber}</td>
              <td>{customer.favoriteMenu || '—'}</td>
              <td className="text-right">
                <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-semibold group-hover:text-[var(--gold)] transition-colors">
                  View Detail
                  <ChevronRight size={12} className="transform group-hover:translate-x-0.5 transition-transform" />
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};