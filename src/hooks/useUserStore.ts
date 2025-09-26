import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/laundry';

interface UserStore {
  users: User[];
  currentUser: User | null;
  isLoading: boolean;
  
  // Actions
  loadUsers: () => Promise<void>;
  addUser: (user: Omit<User, 'id'>) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => void;
  setCurrentUser: (user: User | null) => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set, get) => ({
      users: [],
      currentUser: null,
      isLoading: false,

      loadUsers: async () => {
        const { users, isLoading } = get();
        
        // Prevent multiple simultaneous loads
        if (isLoading || users.length > 0) return;
        
        set({ isLoading: true });
        try {
          // Load from JSON file
          const response = await fetch('/users.json');
          const users = await response.json();
          set({ users, isLoading: false });
        } catch (error) {
          console.log('Loading from fallback users');
          // Fallback to default users if file doesn't exist
          const defaultUsers = [
            {
              id: '1',
              name: 'Sarah Johnson',
              email: 'owner@laundry.com',
              password: 'password',
              role: 'owner' as const
            },
            {
              id: '2',
              name: 'John Smith', 
              email: 'client@laundry.com',
              password: 'password',
              role: 'client' as const
            }
          ];
          set({ users: defaultUsers, isLoading: false });
        }
      },

      addUser: async (userData) => {
        const { users } = get();
        const newUser = {
          ...userData,
          id: Date.now().toString()
        };
        
        const updatedUsers = [...users, newUser];
        set({ users: updatedUsers });
        
        // In a real app, you'd save to the JSON file here
        // For now, we'll just persist in localStorage via zustand
        
        return newUser;
      },

      login: async (email: string, password: string) => {
        const { users } = get();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (!user) {
          throw new Error('Invalid credentials');
        }
        
        set({ currentUser: user });
        return user;
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
        users: state.users,
        currentUser: state.currentUser 
      })
    }
  )
);