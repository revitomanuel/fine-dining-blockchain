import React, { useState } from 'react';
import { CustomerTable } from '../../components/customer/CustomerTable';
import { CustomerDetail } from '../../components/customer/CustomerDetail';
import { Card } from '../../components/ui/Card';

export const CustomersPage = () => {
  const [selected, setSelected] = useState(null);
  
  // Data mock awal representasi record array hasil iterasi smart contract call
  const [mockDirectory] = useState([
    { id: "VIP-PASS-001", name: "Sir Harrison Ford", allergies: "Gluten sensitivity", seatingPreference: "Chef's Table", winePreference: "Château Margaux 2010" },
    { id: "VIP-PASS-002", name: "Lady Eleanor Vance", allergies: "None", seatingPreference: "Private Salon Noir", winePreference: "Krug Clos d'Ambonnay" }
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-light tracking-wide text-zinc-100 uppercase">Guest Directories</h2>
        <p className="text-zinc-500 text-xs mt-1">Audit active profiles synced across decentralized high-tier nodes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2">
          <Card className="p-0">
            <CustomerTable data={mockDirectory} onSelectRow={setSelected} />
          </Card>
        </div>
        <div className="lg:col-span-1">
          <CustomerDetail customer={selected} />
        </div>
      </div>
    </div>
  );
};