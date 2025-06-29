import React from 'react';
import { useCart } from '../context/CartContext';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSelector from './LanguageSelector';

const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { user, logout, isLoggedIn, isAdmin } = useUser();
  const { t } = useLanguage();

  const handleLogout = () => {
    logout();
    window.location.hash = '#/';
  };

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center">
            <a href="#/" className="text-2xl font-light text-black tracking-wide">
              KLYP
            </a>
          </div>

          {/* 네비게이션 */}
          <nav className="hidden md:flex items-center space-x-12">
            <a href="#/" className="text-sm text-gray-700 hover:text-black transition-colors font-light">
              {t('nav.home')}
            </a>
            <a href="#/products" className="text-sm text-gray-700 hover:text-black transition-colors font-light">
              {t('nav.shop')}
            </a>
            <a href="#/about" className="text-sm text-gray-700 hover:text-black transition-colors font-light">
              {t('nav.about')}
            </a>
            <a href="#/contact" className="text-sm text-gray-700 hover:text-black transition-colors font-light">
              {t('nav.contact')}
            </a>
          </nav>

          {/* 우측 메뉴 */}
          <div className="flex items-center space-x-6">
            {/* 언어 선택 */}
            <LanguageSelector />
            
            {isLoggedIn ? (
              <>
                <div className="hidden md:flex items-center space-x-4">
                  <span className="text-xs text-gray-500 font-light">
                    {user?.name}
                  </span>
                  <a href="#/mypage" className="text-xs text-gray-700 hover:text-black transition-colors font-light">
                    {t('nav.mypage')}
                  </a>
                  {isAdmin && (
                    <a href="#/admin" className="text-xs text-blue-600 hover:text-blue-800 transition-colors font-light">
                      {t('nav.admin')}
                    </a>
                  )}
                  <button
                    onClick={handleLogout}
                    className="text-xs text-gray-700 hover:text-black transition-colors font-light"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center space-x-4">
                <a href="#/login" className="text-xs text-gray-700 hover:text-black transition-colors font-light">
                  {t('nav.login')}
                </a>
                <a href="#/register" className="text-xs text-gray-700 hover:text-black transition-colors font-light">
                  {t('nav.join')}
                </a>
              </div>
            )}
            
            {/* 장바구니 */}
            <a href="#/cart" className="relative">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg className="w-5 h-5 text-gray-700 hover:text-black transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
                </svg>
              </div>
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-light">
                  {getTotalItems()}
                </span>
              )}
            </a>

            {/* 모바일 메뉴 버튼 */}
            <button className="md:hidden">
              <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;