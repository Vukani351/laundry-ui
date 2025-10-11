import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/models';
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
        // const { users } = get();
        // const newUser = {
        //   ...userData,
        //   id: Date.now().toString()
        // };
        console.log("user Data: ", userData);
        return await axios.post(`${BASE_URL}/create`, { ...userData }).then(response => {
          console.log("response data: ", response);
          return response.data as User;
        }).catch(err => {
          console.error(err);
          return null;
        });

        // const updatedUsers = [...users, newUser];
        // set({ users: updatedUsers });

        // In a real app, you'd save to the JSON file here
        // For now, we'll just persist in localStorage via zustand

        // return newUser;
      },

      login: async (firstname: string, phone: string) => {
        return await axios.post(`${BASE_URL}/login`,
          {
            "firstname": "sfiso",
            "phone": 1234567
          }
        ).then(response => {
          console.log("response data: ", response);
          const decoded = jwtDecode(response.data.access_token);
          set({ currentUser: decoded as User });
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
