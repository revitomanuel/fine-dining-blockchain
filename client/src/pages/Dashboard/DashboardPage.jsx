import { useState, useEffect } from 'react';
import { Card } from '../../components/ui/Card';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../hooks/useWallet';
import { getCustomerCount } from '../../services/customer/customerService';
import { getTransactionCount } from '../../services/transaction/transactionService';
import { Users, ArrowRightLeft, Globe, UserPlus, ScrollText, AlertTriangle } from 'lucide-react';

export const DashboardPage = () => {
  const navigate = useNavigate();
  const { contract, account } = useWallet();
  const [metrics, setMetrics] = useState({
    customerCount: 0,
    transactionCount: 0,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMetrics = async () => {
      if (!contract) return;
      try {
        setLoading(true);
        const [custCount, txCount] = await Promise.all([
          getCustomerCount(contract),
          getTransactionCount(contract),
        ]);
        setMetrics({
          customerCount: custCount,
          transactionCount: txCount,
        });
      } catch (err) {
        console.error("Failed to fetch dashboard metrics:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, [contract]);

  const statCards = [
    {
      icon: Users,
      label: 'Total Customers',
      value: loading ? '...' : metrics.customerCount.toString(),
      sub: 'Registered on blockchain',
    },
    {
      icon: ArrowRightLeft,
      label: 'Total Transactions',
      value: loading ? '...' : metrics.transactionCount.toString(),
      sub: 'Recorded on-chain',
    },
    {
      icon: Globe,
      label: 'Network',
      value: 'Sepolia',
      sub: 'Ethereum Testnet',
    },
  ];

  const quickActions = [
    {
      icon: UserPlus,
      label: 'Add Customer',
      path: '/customers/add',
      primary: true,
    },
    {
      icon: Users,
      label: 'View Customers',
      path: '/customers',
      primary: false,
    },
    {
      icon: ScrollText,
      label: 'View Transactions',
      path: '/transactions',
      primary: false,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h2 className="heading-xl">Dashboard</h2>
        <p className="text-body mt-1" style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          Ringkasan data dari smart contract CustomerStorage di Sepolia.
        </p>
        <div className="divider-gold" style={{ margin: '16px 0' }} />
      </div>

      {/* Wallet Warning */}
      {!account && (
        <div className="alert-warning">
          <AlertTriangle size={16} />
          Hubungkan MetaMask untuk melihat data real-time dari blockchain.
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children">
        {statCards.map((m, i) => {
          const Icon = m.icon;
          return (
            <Card key={i}>
              <div className="stat-card">
                <div className="flex items-center justify-between">
                  <span className="stat-card-label">{m.label}</span>
                  <div className="stat-card-icon">
                    <Icon size={20} />
                  </div>
                </div>
                <div>
                  <span className="stat-card-value">{m.value}</span>
                  <p className="stat-card-sub">{m.sub}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <h3 className="heading-md mb-5" style={{ color: 'var(--text-secondary)' }}>Quick Actions</h3>
        <div className="flex gap-3 flex-wrap">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <button
                key={action.path}
                onClick={() => navigate(action.path)}
                className={action.primary ? 'btn btn-outline-gold' : 'btn btn-secondary'}
              >
                <Icon size={14} />
                {action.label}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
};