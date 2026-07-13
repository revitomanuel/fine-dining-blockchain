import { Routes, Route } from 'react-router-dom';
import { DashboardPage } from '../pages/Dashboard/DashboardPage';
import { CustomersPage } from '../pages/Customers/CustomersPage';
import { AddCustomerPage } from '../pages/Customers/AddCustomerPage';
import { TransactionsPage } from '../pages/Transactions/TransactionsPage';
import { DashboardLayout } from '../layouts/DashboardLayout';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
      <Route path="/customers" element={<DashboardLayout><CustomersPage /></DashboardLayout>} />
      <Route path="/customers/add" element={<DashboardLayout><AddCustomerPage /></DashboardLayout>} />
      <Route path="/transactions" element={<DashboardLayout><TransactionsPage /></DashboardLayout>} />
      <Route path="*" element={<DashboardLayout><DashboardPage /></DashboardLayout>} />
    </Routes>
  );
};

export default AppRoutes;
