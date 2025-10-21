import { useAuth } from '@/hooks/useAuth';
import { AuthForm } from '@/components/AuthForm';
import { OwnerDashboard } from '@/components/OwnerDashboard';
import { ClientDashboard } from '@/components/ClientDashboard';
import { Loader2, Droplets } from 'lucide-react';
import { Role } from '@/types/models';
import { useLaundryStore } from '@/hooks/useLaundryStore';
import { useEffect } from 'react';

const Index = () => {
  const { user, isLoading } = useAuth();
  const { fetchLaundromatDetails } = useLaundryStore();


  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
            <Droplets className="w-8 h-8 text-white" />
          </div>
          <div className="flex items-center gap-2 text-white">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Loading AquaClean Laundry...</span>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthForm />;
  }

  useEffect(() => {
    (async () => {
      await fetchLaundromatDetails(+user.id)
    })();
  }, []);

  return user.role_id === Role.OWNER ? <OwnerDashboard /> : <ClientDashboard />;
};

export default Index;
