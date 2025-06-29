import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string, additionalInfo?: any) => Promise<boolean>;
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

  const register = async (email: string, password: string, name: string, additionalInfo?: any): Promise<boolean> => {
    const existingUser = SAMPLE_USERS.find(u => u.email === email);
    if (existingUser) {
      return false;
    }
    
    const newUser = {
      id: SAMPLE_USERS.length + 1,
      email,
      password,
      name,
      isAdmin: false,
      ...additionalInfo // 추가 정보 (전화번호, 생년월일, 성별 등)
    };
    
    SAMPLE_USERS.push(newUser);
    // 회원가입 후 자동 로그인하지 않음 - 사용자가 직접 로그인하도록 함
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