import { LaundryItem } from '@/types/laundry';

export const mockLaundryItems: LaundryItem[] = [
  {
    id: '1',
    clientId: '2',
    clientName: 'John Smith',
    weight: 5.2,
    status: 'washing',
    isPaid: false,
    dateCreated: new Date('2024-01-15T09:00:00Z'),
    price: 15.60,
    adminId: ''
  },
  {
    id: '2',
    clientId: '3',
    clientName: 'Emily Davis',
    weight: 3.8,
    status: 'drying',
    isPaid: true,
    dateCreated: new Date('2024-01-15T10:30:00Z'),
    price: 11.40,
    adminId: ''
  },
  {
    id: '3',
    clientId: '4',
    clientName: 'Michael Brown',
    weight: 7.1,
    status: 'ready',
    isPaid: false,
    dateCreated: new Date('2024-01-15T08:15:00Z'),
    price: 21.30,
    adminId: ''
  },
  {
    id: '4',
    clientId: '2',
    clientName: 'John Smith',
    weight: 4.5,
    status: 'ready',
    isPaid: true,
    dateCreated: new Date('2024-01-14T15:20:00Z'),
    dateCompleted: new Date('2024-01-15T12:00:00Z'),
    price: 13.50,
    adminId: ''
  },
  {
    id: '5',
    clientId: '5',
    clientName: 'Sarah Wilson',
    weight: 6.3,
    status: 'washing',
    isPaid: false,
    dateCreated: new Date('2024-01-15T11:45:00Z'),
    price: 18.90,
    adminId: ''
  },
  {
    id: '6',
    clientId: '6',
    clientName: 'David Johnson',
    weight: 2.9,
    status: 'drying',
    isPaid: true,
    dateCreated: new Date('2024-01-14T16:00:00Z'),
    price: 8.70,
    adminId: ''
  }
];