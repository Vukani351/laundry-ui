import { Role, User } from '@/types/models';
import { useUserStore } from './useUserStore';

export const useAuth = () => {
  const {
    currentUser: user,
    isLoading,
    login: storeLogin,
    logout: storeLogout,
    RegisterUser,
    setCurrentUser,
    getCurrentUser,
  } = useUserStore();

  const login = async (firstname: string, phone: string): Promise<User> => {
    try {
      await storeLogin(firstname, phone);
      return getCurrentUser();
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (firstName: string, email: string, phone: string, role: Role): Promise<User> => {
    try {
      const newUser = await RegisterUser({ firstName, email, phone, role });

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