import React from 'react';
import { useUser } from '../context/UserContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, adminOnly = false }) => {
  const { isLoggedIn, isAdmin } = useUser();

  if (!isLoggedIn) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">로그인이 필요합니다</h1>
          <a href="#/login" className="text-blue-600 hover:text-blue-800">로그인하기</a>
        </div>
      </div>
    );
  }

  if (adminOnly && !isAdmin) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">관리자 권한이 필요합니다</h1>
          <a href="#/" className="text-blue-600 hover:text-blue-800">홈으로 돌아가기</a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;