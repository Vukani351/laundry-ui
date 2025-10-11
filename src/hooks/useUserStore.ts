import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/models';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;
interface UserStore {
  // users: User[];
  currentUser: User | null;
  isLoading: boolean;

  // Actions
  // loadUsers: () => Promise<void>;
  RegisterUser: (user: Omit<User, 'id'>) => Promise<User | null>;
  login: (firstname: string, password: string) => Promise<User>;
  logout: () => void;
  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoading: false,

      // loadUsers: async () => {
      //   const { users, isLoading } = get();

      //   if (isLoading || users.length > 0) return;

      //   set({ isLoading: true });
      //   try {
      //     const response = await fetch('/users.json');
      //     const users = await response.json();
      //     set({ users, isLoading: false });
      //   } catch (error) {
      //     console.log('Loading from fallback users');
      //     const defaultUsers = [
      //       {
      //         id: '1',
      //         name: 'Sarah Johnson',
      //         email: 'owner@laundry.com',
      //         phone: 'password',
      //         role: 0
      //       },
      //       {
      //         id: '2',
      //         name: 'John Smith',
      //         email: 'client@laundry.com',
      //         phone: 'password',
      //         role: 0
      //       }
      //     ];
      //     set({ users: defaultUsers, isLoading: false });
      //   }
      // },

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
        // const { users } = get();

        return await axios.post(`${BASE_URL}/login`,
          {
            "firstname": "sfiso",
            "lastname": "mthembu",
            "phone": 1234567
          }
        ).then(response => {
          console.log("response data: ", response);
          const decoded = jwtDecode(response.data.access_token);
          console.log(decoded);
          // set({ currentUser: user });
          return response.data as User;
        }).catch(err => {
          throw new Error(err);
        });
      },

      logout: () => {
        set({ currentUser: null });
      },

      setCurrentUser: (user) => {
        set({ currentUser: user });
      }
    }),
    {
      name: 'user-store',
      partialize: (state) => ({
        // users: state.users,
        currentUser: state.currentUser
      })
    }
  )
);
