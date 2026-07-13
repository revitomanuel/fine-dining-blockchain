import { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { addCustomer } from '../../services/customer/customerService';
import { User, Phone, Utensils, ShieldAlert, StickyNote, Loader2 } from 'lucide-react';

export const CustomerForm = () => {
  const { contract, account } = useWallet();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    favoriteMenu: '',
    foodAllergies: '',
    specialNotes: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !contract) {
      alert("Silakan hubungkan MetaMask terlebih dahulu.");
      return;
    }

    try {
      setSubmitting(true);
      await addCustomer(contract, formData);
      alert("Customer berhasil ditambahkan ke blockchain!");
      setFormData({ fullName: '', phoneNumber: '', favoriteMenu: '', foodAllergies: '', specialNotes: '' });
    } catch (err) {
      console.error(err);
      if (err.reason) {
        alert(`Error: ${err.reason}`);
      } else {
        alert("Gagal menambahkan customer. Cek console untuk detail.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      <div className="input-group">
        <label className="input-label">Full Name</label>
        <div className="relative">
          <User className="input-icon" size={16} />
          <input
            type="text"
            required
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="input-premium input-with-icon"
            placeholder="e.g., Lord Johnathan Doe"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Phone Number</label>
        <div className="relative">
          <Phone className="input-icon" size={16} />
          <input
            type="text"
            required
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="input-premium input-with-icon input-mono"
            placeholder="e.g., +62812345678"
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Favorite Menu</label>
        <div className="relative">
          <Utensils className="input-icon" size={16} />
          <input
            type="text"
            value={formData.favoriteMenu}
            onChange={(e) => setFormData({ ...formData, favoriteMenu: e.target.value })}
            className="input-premium input-with-icon"
            placeholder="e.g., Caviar Ossetra, Wagyu A5 Ribeye"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="input-group">
          <label className="input-label">Food Allergies</label>
          <div className="relative">
            <ShieldAlert className="input-icon" size={16} />
            <input
              type="text"
              value={formData.foodAllergies}
              onChange={(e) => setFormData({ ...formData, foodAllergies: e.target.value })}
              className="input-premium input-with-icon"
              placeholder="e.g., Gluten, Peanuts"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Special Notes</label>
          <div className="relative">
            <StickyNote className="input-icon" size={16} />
            <input
              type="text"
              value={formData.specialNotes}
              onChange={(e) => setFormData({ ...formData, specialNotes: e.target.value })}
              className="input-premium input-with-icon"
              placeholder="e.g., Table 4 facing pool, VIP guest"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || !account}
        className="w-full btn btn-primary py-4 text-xs tracking-[0.2em]"
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin mr-2" size={16} />
            Broadcasting to Blockchain...
          </>
        ) : !account ? (
          'Connect Wallet First'
        ) : (
          'Add Customer to Blockchain'
        )}
      </button>
    </form>
  );
};