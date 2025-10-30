import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Laundromat, LaundryItem, laundryStore, User } from '@/types/models';
import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const useLaundryStore = create<laundryStore>()(
  persist(
    (set, get) => ({
      isLoading: false,
      laundromat: null,
      laundries: [],

      fetchUserDataByNumber: async (phone: string): Promise<User | null> => {
        set({ isLoading: true });
        try {
          return await axios.get(`${BASE_URL}/users/phone/${phone}`).then(resp => {
            return { ...resp.data, firstName: resp.data.username };
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchLaundryOrders: async (): Promise<LaundryItem[] | null> => {
        set({ isLoading: true });
        try {
          return await axios.get(`${BASE_URL}/laundry/laundromat/${get().laundromat.id}`).then(resp => {
            set({ laundries: resp.data.laundry })
            return { ...resp.data, name: resp.data.username };
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      // todo change the data object and be specific
      createLaundryOrder: async (data: any): Promise<LaundryItem | null> => {
        set({ isLoading: true });
        try {
          return await axios.post(`${BASE_URL}/laundry/new`, { ...data }).then(resp => {
            console.log("data: ", resp)
            return { ...resp.data };
          });
        } catch (error) {
          console.error("Error fetching user data:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      fetchLaundromatDetails: async (user_id): Promise<Laundromat | null> => {
        set({ isLoading: true });
        try {
          // get user data so we have a user id...
          return await axios.get(`${BASE_URL}/laundromat/owner/${user_id}`).then(resp => {
            set({ laundromat: resp.data.laundromat });
            return resp.data.laundromat;
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
        isLoading: state.isLoading,
        laundromat: state.laundromat,
        laundries: state.laundries
      })
    })
);