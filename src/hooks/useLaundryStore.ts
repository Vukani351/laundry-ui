import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { laundryStore, User } from '@/types/models';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

export const useLaundryStore = create<laundryStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      laundries: [],

      fetchUserDataByNumber: async (phone: string): Promise<User | null> => {
        set({ isLoading: true });
        try {
          return await axios.get(`${BASE_URL}/phone/${phone}`).then(resp => {
            return { ...resp.data, name: resp.data.username };
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ isLoading: false });
        }
      },

    }),
    {
      name: 'laundry-store',
      partialize: (state) => ({
        laundries: state.laundries,
        isLoading: state.isLoading,
        // laundryItemOwner: state.laundryItemOwner
      })
    })
);