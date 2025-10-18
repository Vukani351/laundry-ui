export interface User {
  id: string;
  firstName: string;
  email: string;
  address?: string;
  phone: string; // todo: turn this to not be optional
  role_id: Role.OWNER | Role.CLIENT;
}

export enum Role {
  OWNER = 0,
  CLIENT = 1
}

export interface Laundromat {
  id: string;
  name: string;
  address?: string;
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
  laundromat: Laundromat;
  currentLaundry: LaundryItem[];
  fetchLaundromatDetails: (user_id: number) => Promise<Laundromat | null>
  fetchLaundryOrders: () => Promise<LaundryItem[] | null>
  fetchUserDataByNumber: (phone: string) => Promise<User | null>;
}

export type LaundryStatus = 'washing' | 'drying' | 'ready' | 'not started';