import { CustomerForm } from '../../components/customer/CustomerForm';
import { Card } from '../../components/ui/Card';
import { UserPlus } from 'lucide-react';

export const AddCustomerPage = () => {
  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h2 className="heading-xl flex items-center gap-2">
          <UserPlus size={20} className="text-[var(--gold)]" />
          Register Premium Guest
        </h2>
        <p className="text-caption mt-1">Populate cryptographic profile layers for instant fine-dining personalization.</p>
        <div className="divider-gold" style={{ margin: '16px 0' }} />
      </div>
      <Card className="max-w-2xl">
        <CustomerForm />
      </Card>
    </div>
  );
};