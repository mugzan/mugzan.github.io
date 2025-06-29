import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ko' | 'vi' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  ko: {
    // Header
    'nav.home': '홈',
    'nav.shop': '쇼핑',
    'nav.about': '브랜드',
    'nav.contact': '문의',
    'nav.login': '로그인',
    'nav.join': '회원가입',
    'nav.logout': '로그아웃',
    'nav.mypage': '마이페이지',
    'nav.admin': '관리자',
    
    // Hero
    'hero.title': 'KLYP',
    'hero.subtitle': '시대를 초월한 스타일, 모던한 편안함',
    'hero.cta': '컬렉션 둘러보기',
    
    // Product Grid
    'products.bestsellers': 'BEST SELLERS',
    'products.newarrivals': 'NEW ARRIVALS',
    'products.editorschoice': "EDITOR'S CHOICE",
    
    // Banner
    'banner.title': '가을 컬렉션',
    'banner.subtitle': '최신 시즌 아이템을 만나보세요',
    'banner.cta': '지금 쇼핑하기',
    
    // Product Detail
    'product.size': '사이즈',
    'product.color': '색상',
    'product.quantity': '수량',
    'product.addtocart': '장바구니에 추가',
    'product.buynow': '바로 구매',
    'product.notfound': '상품을 찾을 수 없습니다',
    'product.returntohome': '홈으로 돌아가기',
    'product.selectsize': '사이즈를 선택해주세요',
    'product.selectcolor': '색상을 선택해주세요',
    'product.addedtocart': '장바구니에 추가되었습니다',
    
    // Footer
    'footer.description': '시대를 초월한 스타일과 모던한 편안함이 만나는 곳. 품질, 장인정신, 지속가능한 패션에 중점을 둔 제품을 만듭니다.',
    'footer.customerservice': '고객 서비스',
    'footer.company': '회사 정보',
    'footer.newsletter': '뉴스레터',
    'footer.subscribe': '구독하기',
    'footer.emailplaceholder': '이메일을 입력하세요',
    'footer.copyright': '© 2024 KLYP. All rights reserved.',
    
    // Language Selector
    'language.korean': '한국어',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
    'language.select': '언어 선택'
  },
  vi: {
    // Header
    'nav.home': 'Trang chủ',
    'nav.shop': 'Cửa hàng',
    'nav.about': 'Thương hiệu',
    'nav.contact': 'Liên hệ',
    'nav.login': 'Đăng nhập',
    'nav.join': 'Đăng ký',
    'nav.logout': 'Đăng xuất',
    'nav.mypage': 'Trang cá nhân',
    'nav.admin': 'Quản trị',
    
    // Hero
    'hero.title': 'KLYP',
    'hero.subtitle': 'Phong cách vượt thời gian, sự thoải mái hiện đại',
    'hero.cta': 'Khám phá bộ sưu tập',
    
    // Product Grid
    'products.bestsellers': 'BÁN CHẠY NHẤT',
    'products.newarrivals': 'HÀNG MỚI VỀ',
    'products.editorschoice': 'LỰA CHỌN BIÊN TẬP',
    
    // Banner
    'banner.title': 'Bộ sưu tập mùa thu',
    'banner.subtitle': 'Khám phá những món đồ mới nhất trong mùa',
    'banner.cta': 'Mua ngay',
    
    // Product Detail
    'product.size': 'Kích thước',
    'product.color': 'Màu sắc',
    'product.quantity': 'Số lượng',
    'product.addtocart': 'Thêm vào giỏ',
    'product.buynow': 'Mua ngay',
    'product.notfound': 'Không tìm thấy sản phẩm',
    'product.returntohome': 'Về trang chủ',
    'product.selectsize': 'Vui lòng chọn kích thước',
    'product.selectcolor': 'Vui lòng chọn màu sắc',
    'product.addedtocart': 'Đã thêm vào giỏ hàng',
    
    // Footer
    'footer.description': 'Nơi phong cách vượt thời gian gặp gỡ sự thoải mái hiện đại. Chúng tôi tạo ra những sản phẩm vượt qua các mùa và xu hướng, tập trung vào chất lượng, tay nghề và thời trang bền vững.',
    'footer.customerservice': 'Dịch vụ khách hàng',
    'footer.company': 'Công ty',
    'footer.newsletter': 'Bản tin',
    'footer.subscribe': 'Đăng ký',
    'footer.emailplaceholder': 'Nhập email của bạn',
    'footer.copyright': '© 2024 KLYP. Tất cả quyền được bảo lưu.',
    
    // Language Selector
    'language.korean': '한국어',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
    'language.select': 'Chọn ngôn ngữ'
  },
  en: {
    // Header
    'nav.home': 'HOME',
    'nav.shop': 'SHOP',
    'nav.about': 'ABOUT',
    'nav.contact': 'CONTACT',
    'nav.login': 'LOGIN',
    'nav.join': 'JOIN',
    'nav.logout': 'LOGOUT',
    'nav.mypage': 'MY PAGE',
    'nav.admin': 'ADMIN',
    
    // Hero
    'hero.title': 'KLYP',
    'hero.subtitle': 'Timeless Style, Modern Comfort',
    'hero.cta': 'EXPLORE COLLECTION',
    
    // Product Grid
    'products.bestsellers': 'BEST SELLERS',
    'products.newarrivals': 'NEW ARRIVALS',
    'products.editorschoice': "EDITOR'S CHOICE",
    
    // Banner
    'banner.title': 'AUTUMN COLLECTION',
    'banner.subtitle': 'Discover our latest seasonal pieces',
    'banner.cta': 'SHOP NOW',
    
    // Product Detail
    'product.size': 'SIZE',
    'product.color': 'COLOR',
    'product.quantity': 'QUANTITY',
    'product.addtocart': 'ADD TO CART',
    'product.buynow': 'BUY NOW',
    'product.notfound': 'Product not found',
    'product.returntohome': 'Return to Home',
    'product.selectsize': 'Please select a size',
    'product.selectcolor': 'Please select a color',
    'product.addedtocart': 'Added to cart',
    
    // Footer
    'footer.description': 'Timeless style meets modern comfort. We create pieces that transcend seasons and trends, focusing on quality, craftsmanship, and sustainable fashion.',
    'footer.customerservice': 'CUSTOMER SERVICE',
    'footer.company': 'COMPANY',
    'footer.newsletter': 'NEWSLETTER',
    'footer.subscribe': 'SUBSCRIBE',
    'footer.emailplaceholder': 'Enter your email',
    'footer.copyright': '© 2024 KLYP. All rights reserved.',
    
    // Language Selector
    'language.korean': '한국어',
    'language.vietnamese': 'Tiếng Việt',
    'language.english': 'English',
    'language.select': 'Select Language'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};