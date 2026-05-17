import type { User } from '@/entity/user';
import { createContext, use } from 'react';

interface AuthContext {
  value: {
    user: User | null;
    isAuthenticated: boolean;
    isPending: boolean;
  };
  actions: {
    login: () => void;
    register: () => void;
    logout: () => void;
    refetchProfile: () => void;
  };
}

const defaultAuthContext: AuthContext = {
  value: {
    user: null,
    isAuthenticated: false,
    isPending: false,
  },
  actions: {
    login: () => {},
    register: () => {},
    logout: () => {},
    refetchProfile: () => {},
  },
};

export const AuthContext = createContext(defaultAuthContext);

export const useAuth = () => {
  const context = use(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }

  return context;
};
