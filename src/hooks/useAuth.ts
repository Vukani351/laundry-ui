import { useEffect } from 'react';
import { User } from '@/types/laundry';
import { useUserStore } from './useUserStore';

export const useAuth = () => {
  const { 
    currentUser: user, 
    isLoading, 
    loadUsers, 
    login: storeLogin, 
    logout: storeLogout, 
    addUser, 
    setCurrentUser,
    users
  } = useUserStore();

  useEffect(() => {
    if (users.length === 0 && !isLoading) {
      loadUsers();
    }
  }, [users.length, isLoading, loadUsers]);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const user = await storeLogin(email, password);
      return user;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, password: string, role: 'owner' | 'client'): Promise<User> => {
    try {
      // Create the user
      const newUser = await addUser({ name, email, password, role });
      
      // Automatically log them in
      setCurrentUser(newUser);
      
      return newUser;
    } catch (error) {
      throw new Error('Registration failed');
    }
  };

  const logout = () => {
    storeLogout();
  };

  return {
    user,
    isLoading,
    login,
    register,
    logout
  };
};