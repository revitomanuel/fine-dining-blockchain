import { useState, useEffect, useCallback } from 'react';
import { CustomerTable } from '../../components/customer/CustomerTable';
import { CustomerDetail } from '../../components/customer/CustomerDetail';
import { Card } from '../../components/ui/Card';
import { useWallet } from '../../hooks/useWallet';
import { getAllCustomers, getCustomer, searchCustomerByPhone } from '../../services/customer/customerService';
import { RefreshCw, RotateCcw, Search, Users, AlertTriangle } from 'lucide-react';

export const CustomersPage = () => {
  const { contract, account } = useWallet();
  const [selected, setSelected] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchPhone, setSearchPhone] = useState('');
  const [searchError, setSearchError] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);

  const fetchCustomers = useCallback(async () => {
    if (!contract) return;
    try {
      setLoading(true);
      const data = await getAllCustomers(contract);
      setCustomers(data);
      setSelected(null);
      setSearchError('');
    } catch (err) {
      console.error('Failed to fetch customers:', err);
      setSearchError('Gagal memuat daftar customer. Cek console.');
    } finally {
      setLoading(false);
    }
  }, [contract]);

  const handleSelectRow = async (customer) => {
    if (!contract) return;
    try {
      const detail = await getCustomer(contract, customer.customerId);
      setSelected(detail);
    } catch (err) {
      console.error('Failed to load customer details:', err);
      setSelected(customer);
    }
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    if (!contract || !searchPhone.trim()) return;

    try {
      setSearchLoading(true);
      setSearchError('');
      const result = await searchCustomerByPhone(contract, searchPhone.trim());

      if (!result || !result.exists) {
        setCustomers([]);
        setSelected(null);
        setSearchError('Customer tidak ditemukan.');
        return;
      }

      setCustomers([result]);
      setSelected(result);
    } catch (err) {
      console.error('Search failed:', err);
      setCustomers([]);
      setSelected(null);
      setSearchError('Customer tidak ditemukan.');
    } finally {
      setSearchLoading(false);
    }
  };

  useEffect(() => {
    const loadCustomers = async () => {
      await fetchCustomers();
    };

    loadCustomers();
  }, [fetchCustomers]);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="heading-xl flex items-center gap-2">
            <Users size={20} className="text-[var(--gold)]" />
            Guest Directories
          </h2>
          <p className="text-caption mt-1">Data customer yang tersimpan di blockchain Ethereum Sepolia.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchCustomers}
            disabled={loading || !contract}
            className="btn btn-secondary btn-sm"
          >
            <RefreshCw size={12} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>
          <button
            onClick={() => {
              setSearchPhone('');
              setSearchError('');
              fetchCustomers();
            }}
            disabled={loading || !contract}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={12} />
            <span>Reset</span>
          </button>
        </div>
      </div>

      <div className="divider-gold" style={{ margin: '16px 0' }} />

      {!account && (
        <div className="alert-warning">
          <AlertTriangle size={16} />
          <span>Hubungkan MetaMask untuk melihat data customer dari blockchain.</span>
        </div>
      )}

      <form onSubmit={handleSearch} className="grid gap-4 md:grid-cols-[1fr_auto] items-end bg-zinc-950 p-4 rounded-xl border border-zinc-900">
        <div className="input-group">
          <label className="input-label">Search Customer by Phone</label>
          <div className="relative">
            <Search className="input-icon" size={16} />
            <input
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
              placeholder="Masukkan nomor telepon..."
              className="input-premium input-with-icon font-mono"
            />
          </div>
        </div>
        <button
          type="submit"
          disabled={!contract || searchLoading || !searchPhone.trim()}
          className="btn btn-primary"
          style={{ height: '42px' }}
        >
          {searchLoading ? 'Searching...' : 'Search'}
        </button>
      </form>

      {searchError && (
        <div className="alert-error">
          <AlertTriangle size={16} />
          <span>{searchError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <Card className="p-0 overflow-hidden">
            <CustomerTable data={customers} onSelectRow={handleSelectRow} />
          </Card>
        </div>
        <div className="lg:col-span-1">
          <CustomerDetail customer={selected} />
        </div>
      </div>
    </div>
  );
};