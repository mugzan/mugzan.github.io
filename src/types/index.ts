export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  description?: string;
  sizes?: string[];
  colors?: string[];
  stock?: number;
}

export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  size?: string;
  color?: string;
}

export interface ShippingAddress {
  id: number;
  name: string;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string;
  isDefault: boolean;
  userId: number;
}

export interface User {
  id: number;
  email: string;
  name: string;
  isAdmin?: boolean;
  phone?: string;
  birthDate?: string;
  gender?: string;
  agreeMarketing?: boolean;
}

export interface Order {
  id: string;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'pending_payment' | 'paid' | 'failed';
  paymentMethod?: 'card' | 'bank' | 'kakao' | 'naver';
  createdAt: Date;
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    detailAddress: string;
    zipCode: string;
  };
}