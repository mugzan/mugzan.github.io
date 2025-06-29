// Final check to ensure all components are loaded correctly.
import React, { useState, useEffect } from 'react';
import Header from './components/Header.tsx';
import Hero from './components/Hero.tsx';
import ProductGrid from './components/ProductGrid.tsx';
import Banner from './components/Banner.tsx';
import Footer from './components/Footer.tsx';
import ProductDetail from './components/ProductDetail.tsx';
import CartPage from './components/CartPage.tsx';
import LoginPage from './components/LoginPage.tsx';
import RegistrationPage from './components/RegistrationPage.tsx';
import MyPage from './components/MyPage.tsx';
import CheckoutPage from './components/CheckoutPage.tsx';
import OrderConfirmationPage from './components/OrderConfirmationPage.tsx';
import AdminPage from './components/AdminPage.tsx';
import ProductForm from './components/ProductForm.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';

import { HERO_IMAGES } from './constants.ts';
import { ProductProvider, useProduct } from './context/ProductContext.tsx';
import { CartProvider } from './context/CartContext.tsx';
import { UserProvider } from './context/UserContext.tsx';
import { OrderProvider } from './context/OrderContext.tsx';
import { LanguageProvider, useLanguage } from './context/LanguageContext.tsx';

const HomePage = () => {
  const { products } = useProduct();
  const { t } = useLanguage();
  
  const bestItems = products.filter(p => p.category === 'BEST ITEM');
  const newArrivals = products.filter(p => p.category === 'NEW ARRIVAL');
  const mdsPick = products.filter(p => p.category === "MD'S PICK");

  return (
    <>
      <Hero images={HERO_IMAGES} />
      
      {/* Best Items */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <ProductGrid title="BEST SELLERS" products={bestItems} columns={4} />
      </div>
      
      {/* New Arrivals */}
      <div className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <ProductGrid title="NEW ARRIVALS" products={newArrivals} columns={4} />
      </div>
      
      {/* Banner */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative h-96 overflow-hidden bg-gray-100">
            <img
              src="https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=1920&h=600&fit=crop"
              alt="Collection Banner"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-3xl md:text-4xl font-light mb-4 tracking-wide">
                  {t('banner.title')}
                </h2>
                <p className="text-lg font-light mb-6 opacity-90">
                  {t('banner.subtitle')}
                </p>
                <a
                  href="#/products"
                  className="inline-block bg-white text-black px-8 py-3 text-sm font-light tracking-wide hover:bg-gray-100 transition-colors"
                >
                  {t('banner.cta')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* MD's Pick */}
      <div className="py-24 px-4 sm:px-6 lg:px-8">
        <ProductGrid title="EDITOR'S CHOICE" products={mdsPick} columns={4} />
      </div>
    </>
  );
};

const AppContent: React.FC = () => {
  const [route, setRoute] = useState(window.location.hash);

  useEffect(() => {
    const handleHashChange = () => {
      setRoute(window.location.hash);
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    if (!window.location.hash) {
      window.location.hash = '#/';
    }
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const renderContent = () => {
    if (route.startsWith('#/product/')) {
      const productId = parseInt(route.replace('#/product/', ''), 10);
      return <ProductDetail productId={productId} />;
    }
    if (route.startsWith('#/admin/edit/')) {
        const productId = parseInt(route.replace('#/admin/edit/', ''), 10);
        return <ProtectedRoute adminOnly={true}><ProductForm existingProductId={productId} /></ProtectedRoute>;
    }
    if(route.startsWith('#/order-confirmation/')) {
        const orderId = route.replace('#/order-confirmation/', '');
        return <ProtectedRoute><OrderConfirmationPage orderId={orderId} /></ProtectedRoute>;
    }

    switch (route) {
      case '#/cart':
        return <CartPage />;
      case '#/login':
        return <LoginPage />;
      case '#/register':
        return <RegistrationPage />;
      case '#/mypage':
        return <ProtectedRoute><MyPage /></ProtectedRoute>;
      case '#/checkout':
        return <ProtectedRoute><CheckoutPage /></ProtectedRoute>;
      case '#/admin':
        return <ProtectedRoute adminOnly={true}><AdminPage /></ProtectedRoute>;
      case '#/admin/add':
        return <ProtectedRoute adminOnly={true}><ProductForm /></ProtectedRoute>;
      case '#/':
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="bg-white text-gray-800 font-light">
      <Header />
      <main>
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <ProductProvider>
        <UserProvider>
          <OrderProvider>
            <CartProvider>
              <AppContent />
            </CartProvider>
          </OrderProvider>
        </UserProvider>
      </ProductProvider>
    </LanguageProvider>
  );
};

export default App;