import { useEffect } from 'react';
import { Role, User } from '@/types/models';
import { useUserStore } from './useUserStore';

export const useAuth = () => {
  const {
    currentUser: user,
    isLoading,
    // loadUsers,
    login: storeLogin,
    logout: storeLogout,
    RegisterUser,
    setCurrentUser,
    // users
  } = useUserStore();

  // useEffect(() => {
  //   if (users.length === 0 && !isLoading) {
  //     // loadUsers();
  //   }
  // }, [users.length, isLoading]);

  const login = async (firstname: string, phone: string): Promise<User> => {
    try {
      console.log("login data: ", { firstname, phone, lastname: "" })
      const user = await storeLogin(firstname, phone);
      return user;
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (name: string, email: string, phone: string, role: Role): Promise<User> => {
    try {
      const newUser = await RegisterUser({ name, email, phone, role });

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