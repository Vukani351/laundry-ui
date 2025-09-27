import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { LaundryItem, User } from '@/types/laundry';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

interface laundryStore {
  isLoading: boolean;
  laundries: LaundryItem[];
  fetchUserDataByNumber: (phone: string) => Promise<void>;
}

export const useLaundryStore = create<laundryStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      laundries: [],

      fetchUserDataByNumber: async (phone: string) => {
        set({ isLoading: true });
        axios.get(`${BASE_URL}/phone/${phone}`).then(resp => {
          console.log("Data: ", resp);
        }).finally(() => {
          set({ isLoading: false });
        });
      },

    }),
    {
      name: 'laundry-store',
      partialize: (state) => ({
        laundries: state.laundries,
        isLoading: state.isLoading
      })
    })
);