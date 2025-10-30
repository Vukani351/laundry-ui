export interface User {
  id: string;
  firstName: string;
  email: string;
  address?: string;
  phone: string; // todo: turn this to not be optional
  role_id: Role.OWNER | Role.CLIENT;
}

export interface Laundromat {
  id: string;
  name: string;
  address?: string;
}

export interface LaundryItem {
  id: string;
  owner_id: string;
  adminId: string;
  clientName?: string;
  clientNumber?: string;
  weight: number;
  status: LaundryStatus;
  isPaid: boolean;
  created_at: Date;
  dateCompleted?: Date;
  price: number;
}

export interface laundryStore {
  isLoading: boolean;
  laundries: LaundryItem[];
  laundromat: Laundromat;
  fetchLaundromatDetails: (user_id: number) => Promise<Laundromat | null>
  fetchLaundryOrders: () => Promise<LaundryItem[] | null>
  fetchUserDataByNumber: (phone: string) => Promise<User | null>;
}

export enum LaundryStatus {
  WASHING = 'washing',
  DRYING = 'drying',
  READY = 'ready',
  NOT_STARTED = 'not started'
}

export enum Role {
  OWNER = 0,
  CLIENT = 1
}