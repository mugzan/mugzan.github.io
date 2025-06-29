import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">장바구니가 비어있습니다</h1>
          <a href="#/" className="text-blue-600 hover:text-blue-800">쇼핑 계속하기</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">장바구니</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-20 h-20 object-cover rounded-md"
              />
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                <div className="text-sm text-gray-500 space-y-1">
                  {item.size && <p>사이즈: {item.size}</p>}
                  {item.color && <p>색상: {item.color}</p>}
                </div>
                <p className="font-medium text-gray-900">
                  {item.product.price.toLocaleString()}원
                </p>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  -
                </button>
                <span className="w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                >
                  +
                </button>
              </div>
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800"
              >
                삭제
              </button>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg h-fit">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주문 요약</h2>
          
          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span>상품 금액</span>
              <span>{getTotalPrice().toLocaleString()}원</span>
            </div>
            <div className="flex justify-between">
              <span>배송비</span>
              <span>무료</span>
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>총 결제 금액</span>
              <span>{getTotalPrice().toLocaleString()}원</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <a
              href="#/checkout"
              className="w-full bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors text-center block"
            >
              주문하기
            </a>
            <button
              onClick={clearCart}
              className="w-full border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
            >
              장바구니 비우기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;