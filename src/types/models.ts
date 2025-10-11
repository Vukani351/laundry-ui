export interface User {
  id: string;
  username: string;
  email: string;
  address?: string;
  phone: string; // todo: turn this to not be optional
  role: 'owner' | 'client';
}

export enum Role {
  OWNER = 'owner',
  CLIENT = 'client'
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
  price: number;
}

export interface laundryStore {
  isLoading: boolean;
  laundries: LaundryItem[];
  fetchUserDataByNumber: (phone: string) => Promise<User | null>;
}

export type LaundryStatus = 'washing' | 'drying' | 'ready' | 'not started';