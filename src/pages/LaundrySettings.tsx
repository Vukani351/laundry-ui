import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { BusinessSettings, defaultBusinessSettings } from '@/types/business';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save, Settings, Clock, DollarSign, List } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const LaundrySettings = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [settings, setSettings] = useState<BusinessSettings>(defaultBusinessSettings);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));

    toast({
      title: "Settings Saved",
      description: "Your business settings have been updated successfully.",
    });

    setIsLoading(false);
  };

  const updateBasicInfo = (field: keyof BusinessSettings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const updateOperatingHours = (day: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const updatePricing = (field: keyof BusinessSettings['pricing'], value: number) => {
    setSettings(prev => ({
      ...prev,
      pricing: {
        ...prev.pricing,
        [field]: value
      }
    }));
  };

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  if (user?.role !== 'owner') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">Access denied. Owner privileges required.</p>
            <Button onClick={() => navigate('/')} className="w-full mt-4">
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-primary text-white p-6 shadow-soft">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigate('/')}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-3">
                <Settings className="w-8 h-8" />
                Laundry Settings
              </h1>
              <p className="text-white/80 mt-1">Manage your business configuration</p>
            </div>
          </div>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-white text-primary hover:bg-white/90"
          >
            <Save className="w-4 h-4 mr-2" />
            {isLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="basic" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Basic Info
            </TabsTrigger>
            <TabsTrigger value="hours" className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Hours
            </TabsTrigger>
            <TabsTrigger value="pricing" className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Pricing
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center gap-2">
              <List className="w-4 h-4" />
              Services
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Business Information</CardTitle>
                <CardDescription>Update your laundry business details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Business Name</Label>
                    <Input
                      id="name"
                      value={settings.name}
                      onChange={(e) => updateBasicInfo('name', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Business Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={settings.email}
                      onChange={(e) => updateBasicInfo('email', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={settings.description}
                    onChange={(e) => updateBasicInfo('description', e.target.value)}
                    rows={3}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={settings.phone}
                      onChange={(e) => updateBasicInfo('phone', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={settings.address}
                      onChange={(e) => updateBasicInfo('address', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hours" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Operating Hours</CardTitle>
                <CardDescription>Set your business operating hours for each day</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {daysOfWeek.map((day) => (
                  <div key={day.key} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className="w-20 font-medium">{day.label}</div>
                    <Switch
                      checked={settings.operatingHours[day.key].isOpen}
                      onCheckedChange={(checked) => updateOperatingHours(day.key, 'isOpen', checked)}
                    />
                    {settings.operatingHours[day.key].isOpen ? (
                      <>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`${day.key}-open`} className="text-sm">Open:</Label>
                          <Input
                            id={`${day.key}-open`}
                            type="time"
                            value={settings.operatingHours[day.key].open}
                            onChange={(e) => updateOperatingHours(day.key, 'open', e.target.value)}
                            className="w-32"
                          />
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor={`${day.key}-close`} className="text-sm">Close:</Label>
                          <Input
                            id={`${day.key}-close`}
                            type="time"
                            value={settings.operatingHours[day.key].close}
                            onChange={(e) => updateOperatingHours(day.key, 'close', e.target.value)}
                            className="w-32"
                          />
                        </div>
                      </>
                    ) : (
                      <span className="text-muted-foreground">Closed</span>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Service Pricing</CardTitle>
                <CardDescription>Set prices for your laundry services</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="washing-price">Washing (per lb)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="washing-price"
                        type="number"
                        step="0.01"
                        value={settings.pricing.washingPrice}
                        onChange={(e) => updatePricing('washingPrice', parseFloat(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="drying-price">Drying (per lb)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="drying-price"
                        type="number"
                        step="0.01"
                        value={settings.pricing.dryingPrice}
                        onChange={(e) => updatePricing('dryingPrice', parseFloat(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="express-price">Express Service (per lb)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="express-price"
                        type="number"
                        step="0.01"
                        value={settings.pricing.expressService}
                        onChange={(e) => updatePricing('expressService', parseFloat(e.target.value))}
                        className="pl-8"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Available Services</CardTitle>
                  <CardDescription>Services offered by your laundry</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {settings.services.map((service, index) => (
                      <div key={index} className="p-2 bg-muted rounded text-sm">
                        {service}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Accepted payment methods</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {settings.paymentMethods.map((method, index) => (
                      <div key={index} className="p-2 bg-muted rounded text-sm">
                        {method}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LaundrySettings;