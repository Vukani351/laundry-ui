export interface BusinessSettings {
  id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: {
    [key: string]: {
      open: string;
      close: string;
      isOpen: boolean;
    };
  };
  pricing: {
    washingPrice: number;
    dryingPrice: number;
    expressService: number;
  };
  services: string[];
  paymentMethods: string[];
}

export const defaultBusinessSettings: BusinessSettings = {
  id: '1',
  name: 'AquaClean Laundry',
  description: 'Professional laundry services with care and attention to detail.',
  address: '123 Clean Street, Fresh City, FC 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@aquaclean.com',
  operatingHours: {
    monday: { open: '08:00', close: '20:00', isOpen: true },
    tuesday: { open: '08:00', close: '20:00', isOpen: true },
    wednesday: { open: '08:00', close: '20:00', isOpen: true },
    thursday: { open: '08:00', close: '20:00', isOpen: true },
    friday: { open: '08:00', close: '20:00', isOpen: true },
    saturday: { open: '09:00', close: '18:00', isOpen: true },
    sunday: { open: '10:00', close: '16:00', isOpen: false },
  },
  pricing: {
    washingPrice: 3.00,
    dryingPrice: 2.50,
    expressService: 5.00,
  },
  services: [
    'Regular Wash & Dry',
    'Delicate Items',
    'Express Service',
    'Dry Cleaning',
    'Ironing & Folding'
  ],
  paymentMethods: [
    'Cash',
    'Credit Card',
    'Debit Card',
    'Mobile Payment'
  ]
};