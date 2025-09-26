export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: 'owner' | 'client';
}

export interface LaundryItem {
  id: string;
  clientId: string;
  adminId: string;
  clientName: string;
  clientNumber?: string;
  weight: number;
  status: 'washing' | 'drying' | 'ready' | 'not started';
  isPaid: boolean;
  dateCreated: Date;
  dateCompleted?: Date;
  totalAmount: number;
}

export type LaundryStatus = 'washing' | 'drying' | 'ready' | 'not started';