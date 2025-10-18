import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, User } from '@/types/models';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;
interface UserStore {
  currentUser: User | null;
  isLoading: boolean;

  // Actions
  RegisterUser: (user: Omit<User, 'id'>) => Promise<User | null>;
  login: (firstname: string, password: string) => Promise<void>;
  logout: () => void;
  setCurrentUser: (user: User | null) => void;
  getCurrentUser: () => User;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoading: false,

      RegisterUser: async (userData) => {
        return await axios.post(`${BASE_URL}/create`, {
          ...userData,
          role_id: userData.role_id == Role.CLIENT ? 1 : 0
        }).then(response => {
          set({ currentUser: jwtDecode(response.data.access_token) as User });
        }).catch(err => {
          console.error(err);
          return null;
        });
      },

      login: async (firstname: string, phone: string) => {
        return await axios.post(`${BASE_URL}/login`,
          {
            firstname: firstname,
            phone: phone
          }
        ).then(response => {
          set({ currentUser: jwtDecode(response.data.access_token) as User });
        }).catch(err => {
          throw new Error(err);
        });
      },

      logout: () => {
        set({ currentUser: null });
      },

      setCurrentUser: (user) => {
        set({ currentUser: user });
      },

      getCurrentUser: () => {
        return get().currentUser;
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        currentUser: state.currentUser
      })
    }
  )
);
