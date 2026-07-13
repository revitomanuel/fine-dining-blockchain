import { User, Phone, Utensils, ShieldAlert, StickyNote, Calendar, MousePointerClick, Hash } from 'lucide-react';

export const CustomerDetail = ({ customer }) => {
  if (!customer) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center p-8 border border-dashed border-zinc-800 rounded-xl bg-zinc-950/40 min-h-[300px]">
        <MousePointerClick size={32} className="text-zinc-600 mb-3 animate-pulse" />
        <p className="text-caption max-w-[200px]">
          Pilih customer dari tabel untuk melihat detail profil patra.
        </p>
      </div>
    );
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '-';
    return new Date(timestamp * 1000).toLocaleString('id-ID', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  return (
    <div className="space-y-6 border border-zinc-900 bg-zinc-950 p-6 rounded-xl relative overflow-hidden">
      {/* Top golden accent bar */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[var(--gold)] to-transparent" />

      <div className="border-b border-zinc-900 pb-4">
        <span className="badge badge-gold font-mono flex items-center w-fit gap-1 text-[9px]">
          <Hash size={10} />
          VIP Patron #{customer.customerId}
        </span>
        <h3 className="heading-lg mt-3 flex items-center gap-2">
          <User size={18} className="text-[var(--gold)]" />
          {customer.fullName}
        </h3>
      </div>

      <div className="space-y-5">
        <div className="flex items-start gap-3">
          <Phone className="text-zinc-500 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="input-label mb-1" style={{ margin: 0 }}>Phone Number</span>
            <p className="text-body font-mono text-zinc-200">{customer.phoneNumber}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Utensils className="text-zinc-500 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="input-label mb-1" style={{ margin: 0 }}>Favorite Menu</span>
            <p className="text-body text-zinc-200">{customer.favoriteMenu || '—'}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <ShieldAlert className="text-zinc-500 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="input-label mb-1" style={{ margin: 0 }}>Food Allergies</span>
            {customer.foodAllergies ? (
              <p className="text-xs font-semibold px-3 py-2 rounded-lg bg-red-950/20 border border-red-900/30 text-red-400 mt-1">
                {customer.foodAllergies}
              </p>
            ) : (
              <p className="text-body text-zinc-500">Tidak ada alergi yang tercatat.</p>
            )}
          </div>
        </div>

        <div className="flex items-start gap-3">
          <StickyNote className="text-zinc-500 shrink-0 mt-0.5" size={14} />
          <div>
            <span className="input-label mb-1" style={{ margin: 0 }}>Special Notes</span>
            <p className="text-body italic text-[var(--gold)] font-medium">
              {customer.specialNotes || '—'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-900">
          <div className="flex items-start gap-2">
            <Calendar className="text-zinc-600 mt-0.5" size={12} />
            <div>
              <span className="input-label text-[8px] mb-0.5" style={{ margin: 0 }}>Created At</span>
              <p className="text-[10px] font-mono text-zinc-400">{formatDate(customer.createdAt)}</p>
            </div>
          </div>
          <div className="flex items-start gap-2">
            <Calendar className="text-zinc-600 mt-0.5" size={12} />
            <div>
              <span className="input-label text-[8px] mb-0.5" style={{ margin: 0 }}>Updated At</span>
              <p className="text-[10px] font-mono text-zinc-400">{formatDate(customer.updatedAt)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};