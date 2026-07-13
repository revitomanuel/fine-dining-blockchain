import React, { useState } from 'react';
import { TransactionTable } from '../../components/transaction/TransactionTable';
import { TransactionForm } from '../../components/transaction/TransactionForm';
import { Card } from '../../components/ui/Card';

export const TransactionsPage = () => {
  const [mockLogs] = useState([
    { block: 119402, hash: "0x3f1a...48de", customerId: "VIP-PASS-001", action: "State Mutation", time: "2026-07-14 00:10" },
    { block: 119385, hash: "0x892b...fa21", customerId: "VIP-PASS-002", action: "Contract Setup", time: "2026-07-13 23:45" }
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-light tracking-wide text-zinc-100 uppercase">Audit Trail Records</h2>
        <p className="text-zinc-500 text-xs mt-1">Cryptographically signed logs verifying immutable operations history.</p>
      </div>

      <Card>
        <h3 className="text-xs uppercase tracking-widest text-zinc-400 font-medium mb-4">Append Real-time Operational Event</h3>
        <TransactionForm />
      </Card>

      <Card className="p-0">
        <TransactionTable logs={mockLogs} />
      </Card>
    </div>
  );
};