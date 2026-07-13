import { useState } from 'react';
import { useWallet } from '../../hooks/useWallet';
import { addTransaction } from '../../services/transaction/transactionService';
import { Hash, Utensils, Coins, MessageSquare, Send, Loader2 } from 'lucide-react';

export const TransactionForm = ({ onTransactionAdded }) => {
  const { contract, account } = useWallet();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    customerId: '',
    menuItems: '',
    totalPrice: '',
    specialRequest: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!account || !contract) {
      alert("Silakan hubungkan MetaMask terlebih dahulu.");
      return;
    }

    try {
      setSubmitting(true);
      await addTransaction(contract, {
        customerId: parseInt(formData.customerId),
        menuItems: formData.menuItems,
        totalPrice: parseInt(formData.totalPrice),
        specialRequest: formData.specialRequest
      });
      alert("Transaksi berhasil ditambahkan ke blockchain!");
      setFormData({ customerId: '', menuItems: '', totalPrice: '', specialRequest: '' });
      if (onTransactionAdded) onTransactionAdded();
    } catch (err) {
      console.error(err);
      if (err.reason) {
        alert(`Error: ${err.reason}`);
      } else {
        alert("Gagal menambahkan transaksi. Cek console untuk detail.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div className="input-group">
          <label className="input-label">Customer ID</label>
          <div className="relative">
            <Hash className="input-icon" size={14} />
            <input
              type="number"
              required
              min="1"
              value={formData.customerId}
              onChange={(e) => setFormData({ ...formData, customerId: e.target.value })}
              className="input-premium input-with-icon input-mono"
              placeholder="1"
            />
          </div>
        </div>

        <div className="input-group md:col-span-2">
          <label className="input-label">Menu Items</label>
          <div className="relative">
            <Utensils className="input-icon" size={14} />
            <input
              type="text"
              required
              value={formData.menuItems}
              onChange={(e) => setFormData({ ...formData, menuItems: e.target.value })}
              className="input-premium input-with-icon"
              placeholder="e.g., Beluga Caviar, Champagne"
            />
          </div>
        </div>

        <div className="input-group">
          <label className="input-label">Price (Wei)</label>
          <div className="relative">
            <Coins className="input-icon" size={14} />
            <input
              type="number"
              required
              min="0"
              value={formData.totalPrice}
              onChange={(e) => setFormData({ ...formData, totalPrice: e.target.value })}
              className="input-premium input-with-icon input-mono"
              placeholder="500000"
            />
          </div>
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Special Request</label>
        <div className="relative">
          <MessageSquare className="input-icon" size={14} />
          <input
            type="text"
            value={formData.specialRequest}
            onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
            className="input-premium input-with-icon"
            placeholder="e.g., Rare, gluten-free option"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={submitting || !account}
        className="btn btn-primary"
      >
        {submitting ? (
          <>
            <Loader2 className="animate-spin" size={12} />
            <span>Broadcasting...</span>
          </>
        ) : !account ? (
          'Connect Wallet First'
        ) : (
          <>
            <Send size={12} />
            <span>Add Transaction</span>
          </>
        )}
      </button>
    </form>
  );
};