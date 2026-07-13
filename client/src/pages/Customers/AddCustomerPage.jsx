import React from 'react';
import { CustomerForm } from '../../components/customer/CustomerForm';
import { Card } from '../../components/ui/Card';

export const AddCustomerPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-wide text-zinc-100 uppercase">Register Premium Guest</h2>
        <p className="text-zinc-500 text-xs mt-1">Populate cryptographic profile layers for instant fine-dining personalization.</p>
      </div>
      <Card>
        <CustomerForm />
      </Card>
    </div>
  );
};