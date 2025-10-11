import { useState } from 'react';
import { LaundryItem, LaundryStatus } from '@/types/models';
import { LaundryCard } from './LaundryCard';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { mockLaundryItems } from '@/data/mockData';
import { LogOut, TrendingUp, DollarSign, Clock, CheckCircle, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { EditLaundryItemDialog } from './EditLaundryItemDialog';
import { useLaundryStore } from '@/hooks/useLaundryStore';

export const OwnerDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [laundryItems, setLaundryItems] = useState<LaundryItem[]>(mockLaundryItems);
  const {
    laundries,
    isLoading,
    fetchUserDataByNumber
  } = useLaundryStore();

  const handleStatusChange = (itemId: string, status: LaundryStatus) => {
    setLaundryItems(prev => prev.map(item =>
      item.id === itemId ? { ...item, status } : item
    ));
    toast({
      title: "Status Updated",
      description: `Item status changed to ${status}`,
    });
  };

  const handleEdit = (updatedItem: LaundryItem) => {
    setLaundryItems(prev => prev.map(item =>
      item.id === updatedItem.id ? updatedItem : item
    ));
  };

  const activeItems = laundryItems.filter(item => item.status !== 'ready' || !item.isPaid);
  const completedItems = laundryItems.filter(item => item.status === 'ready' && item.isPaid);

  const todayRevenue = laundryItems
    .filter(item => item.isPaid && new Date(item.dateCreated).toDateString() === new Date().toDateString())
    .reduce((sum, item) => sum + item.price, 0);

  const washingCount = laundryItems.filter(item => item.status === 'washing').length;
  const dryingCount = laundryItems.filter(item => item.status === 'drying').length;
  const readyCount = laundryItems.filter(item => item.status === 'ready' && !item.isPaid).length;

  const newLaundryItemDetails: LaundryItem = {
    id: "",
    weight: 0,
    adminId: "",
    clientId: "",
    isPaid: false,
    price: 0,
    clientName: "new user",
    clientNumber: "",
    status: "not started",
    dateCreated: new Date(),
  }

  const newLaundryItem = (
    <Button color="indigo" variant="outline" size='lg' className='max-w-24'>
      New Item
    </Button>)

  function onEdit(updatedItem: LaundryItem): void {
    console.log("open the item...", updatedItem)
  }

  function onNewLaundryItem(updatedItem: LaundryItem): void {
    console.log("adding new item... ", updatedItem)
  }

  async function verifyUserPhone(phoneNumber: string): Promise<string> {
    const userData = await fetchUserDataByNumber(phoneNumber);
    if (!userData) return;
    return userData.name;
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-gradient-primary text-white p-6 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Owner Dashboard</h1>
            <p className="text-white/80 mt-1">Welcome back, {user?.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/settings')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">${todayRevenue.toFixed(2)}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Washing</CardTitle>
              <Clock className="h-4 w-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{washingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Drying</CardTitle>
              <TrendingUp className="h-4 w-4 text-warning" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-warning">{dryingCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Ready</CardTitle>
              <CheckCircle className="h-4 w-4 text-success" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">{readyCount}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="active">
              Active Orders
              <Badge className="ml-2" variant="secondary">{activeItems.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed Orders
              <Badge className="ml-2" variant="secondary">{completedItems.length}</Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className='flex justify-between'>
                  Active Laundry Orders
                  <EditLaundryItemDialog
                    isNew
                    item={newLaundryItemDetails}
                    onSave={onNewLaundryItem}
                    onVerifyPhoneNumber={verifyUserPhone}
                    isLoading={isLoading}
                    trigger={newLaundryItem}
                  />
                </CardTitle>
                <CardDescription>
                  Manage ongoing laundry items and update their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activeItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active orders at the moment
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {activeItems.map((item) => (
                      <LaundryCard
                        key={item.id}
                        item={item}
                        userRole="owner"
                        onStatusChange={handleStatusChange}
                        onEdit={handleEdit}
                      />
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Orders</CardTitle>
                <CardDescription>
                  View completed and paid laundry orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedItems.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed orders yet
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {completedItems.map((item) => (
                      <LaundryCard
                        key={item.id}
                        item={item}
                        userRole="owner"
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