import { useState, useEffect, useCallback } from 'react';
import { TransactionTable } from '../../components/transaction/TransactionTable';
import { TransactionForm } from '../../components/transaction/TransactionForm';
import { Card } from '../../components/ui/Card';
import { useWallet } from '../../hooks/useWallet';
import { getAllTransactions } from '../../services/transaction/transactionService';
import { getCustomerCount } from '../../services/customer/customerService';
import { ScrollText, RefreshCw, AlertTriangle } from 'lucide-react';

export const TransactionsPage = () => {
  const { contract, account } = useWallet();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const custCount = await getCustomerCount(contract);
      const data = await getAllTransactions(contract, custCount);
      setTransactions(data);
    } catch (err) {
      console.error("Failed to fetch transactions:", err);
    } finally {
      setLoading(false);
    }
  }, [contract]);

  useEffect(() => {
    const loadTransactions = async () => {
      await fetchTransactions();
    };

    loadTransactions();
  }, [fetchTransactions]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="heading-xl flex items-center gap-2">
            <ScrollText size={20} className="text-[var(--gold)]" />
            Transaction Records
          </h2>
          <p className="text-caption mt-1">Riwayat transaksi yang tersimpan di blockchain.</p>
        </div>
        <button
          onClick={fetchTransactions}
          disabled={loading || !contract}
          className="btn btn-secondary btn-sm"
        >
          <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="divider-gold" style={{ margin: '16px 0' }} />

      {!account && (
        <div className="alert-warning">
          <AlertTriangle size={16} />
          <span>Hubungkan MetaMask untuk melihat dan menambah transaksi.</span>
        </div>
      )}

      <Card className="max-w-2xl">
        <h3 className="heading-md mb-4" style={{ color: 'var(--text-primary)' }}>Add New Transaction</h3>
        <TransactionForm onTransactionAdded={fetchTransactions} />
      </Card>

      <Card className="p-0 overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-zinc-500 flex flex-col items-center justify-center gap-2">
            <RefreshCw size={24} className="animate-spin text-[var(--gold)]" />
            <span>Loading transactions from blockchain...</span>
          </div>
        ) : (
          <TransactionTable logs={transactions} />
        )}
      </Card>
    </div>
  );
};