import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  isAdmin: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 샘플 사용자 데이터
const SAMPLE_USERS = [
  { id: 1, email: 'admin@klyp.com', password: 'admin123', name: '관리자', isAdmin: true },
  { id: 2, email: 'user@klyp.com', password: 'user123', name: '일반사용자', isAdmin: false }
];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string): Promise<boolean> => {
    const foundUser = SAMPLE_USERS.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser({ id: foundUser.id, email: foundUser.email, name: foundUser.name, isAdmin: foundUser.isAdmin });
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    const existingUser = SAMPLE_USERS.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      id: SAMPLE_USERS.length + 1,
      email,
      password,
      name,
      isAdmin: false
    };
    
    SAMPLE_USERS.push(newUser);
    setUser({ id: newUser.id, email: newUser.email, name: newUser.name, isAdmin: newUser.isAdmin });
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{
      user,
      login,
      register,
      logout,
      isLoggedIn: !!user,
      isAdmin: !!user?.isAdmin
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};