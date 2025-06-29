import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  createOrder: (items: CartItem[], shippingAddress: any) => string;
  getOrder: (id: string) => Order | undefined;
  getUserOrders: (userId: number) => Order[];
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderPayment: (orderId: string, paymentStatus: Order['paymentStatus'], paymentMethod: Order['paymentMethod']) => void;
  getOrderStats: () => {
    totalOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
    todayOrders: number;
    popularProducts: Array<{ name: string; quantity: number }>;
  };
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  const createOrder = (items: CartItem[], shippingAddress: any): string => {
    const orderId = `ORDER-${Date.now()}`;
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    
    const newOrder: Order = {
      id: orderId,
      userId: 1, // 현재 로그인된 사용자 ID
      items,
      total,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: undefined,
      createdAt: new Date(),
      shippingAddress
    };

    setOrders(prev => [...prev, newOrder]);
    return orderId;
  };

  const getOrder = (id: string) => {
    return orders.find(order => order.id === id);
  };

  const getUserOrders = (userId: number) => {
    return orders.filter(order => order.userId === userId);
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateOrderPayment = (orderId: string, paymentStatus: Order['paymentStatus'], paymentMethod: Order['paymentMethod']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { 
        ...order, 
        paymentStatus, 
        paymentMethod,
        status: paymentStatus === 'paid' ? 'confirmed' : order.status
      } : order
    ));
  };

  const getOrderStats = () => {
    const totalOrders = orders.length;
    const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, order) => sum + order.total, 0);
    const averageOrderValue = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayOrders = orders.filter(order => {
      const orderDate = new Date(order.createdAt);
      orderDate.setHours(0, 0, 0, 0);
      return orderDate.getTime() === today.getTime();
    }).length;

    // 인기 상품 계산
    const productSales: { [key: string]: { name: string; quantity: number } } = {};
    orders.filter(o => o.paymentStatus === 'paid').forEach(order => {
      order.items.forEach(item => {
        const key = item.product.name;
        if (productSales[key]) {
          productSales[key].quantity += item.quantity;
        } else {
          productSales[key] = {
            name: item.product.name,
            quantity: item.quantity
          };
        }
      });
    });

    const popularProducts = Object.values(productSales)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, 5);

    return {
      totalOrders,
      totalRevenue,
      averageOrderValue,
      todayOrders,
      popularProducts
    };
  };

  return (
    <OrderContext.Provider value={{
      orders,
      createOrder,
      getOrder,
      getUserOrders,
      updateOrderStatus,
      updateOrderPayment,
      getOrderStats
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};