import { useState } from 'react';
import { LaundryItem } from '@/types/models';
import { LaundryCard } from './LaundryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { mockLaundryItems } from '@/data/mockData';
import { LogOut, Clock, CheckCircle, CreditCard, History, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const ClientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [laundryItems, setLaundryItems] = useState<LaundryItem[]>(
    mockLaundryItems.filter(item => item.clientId === user?.id || item.clientName === user?.username)
  );

  const handlePayment = (itemId: string) => {
    setLaundryItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, isPaid: true } : item
    ));
    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed successfully.",
    });
  };

  const handleEdit = (updatedItem: LaundryItem) => {
    setLaundryItems(prev => prev.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const activeItems = laundryItems.filter(item => item.status !== 'ready' || !item.isPaid);
  const completedItems = laundryItems.filter(item => item.status === 'ready' && item.isPaid);
  const unpaidItems = laundryItems.filter(item => item.status === 'ready' && !item.isPaid);

  const totalSpent = laundryItems
    .filter(item => item.isPaid)
    .reduce((sum, item) => sum + item.price, 0);

  const pendingAmount = unpaidItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-white p-6 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">My Laundry</h1>
            <p className="text-white/80 mt-1">Welcome back, {user?.username}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/profile')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Button>
            <Button
              variant="outline"
              onClick={logout}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Orders</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{activeItems.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payment</CardTitle>
              <CreditCard className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">${pendingAmount.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${totalSpent.toFixed(2)}</div>
            </CardContent>
          </Card>
        </div>

        {unpaidItems.length > 0 && (
          <Card className="border-warning bg-warning/5">
            <CardHeader>
              <CardTitle className="text-warning flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Required
              </CardTitle>
              <CardDescription>
                You have {unpaidItems.length} completed order(s) awaiting payment totaling ${pendingAmount.toFixed(2)}
              </CardDescription>
            </CardHeader>
          </Card>
        )}

        <Tabs defaultValue="current" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="current">
              Current Orders
              <Badge className="ml-2" variant="secondary">{activeItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="history">
              Order History
              <Badge className="ml-2" variant="secondary">{completedItems.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="current" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Current Laundry Status
                </CardTitle>
                <CardDescription>
                  Track your laundry progress and make payments when ready
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active orders. Visit our store to drop off your laundry!
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeItems.map((item) => (
                      <LaundryCard
                        key={item.id}
                        item={item}
                        userRole="client"
                        onPayment={handlePayment}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Order History
                </CardTitle>
                <CardDescription>
                  View your completed laundry orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed orders yet
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {completedItems.map((item) => (
                      <LaundryCard
                        key={item.id}
                        item={item}
                        userRole="client"
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};