import React from 'react';
import { useOrder } from '../context/OrderContext';

interface OrderConfirmationPageProps {
  orderId: string;
}

const OrderConfirmationPage: React.FC<OrderConfirmationPageProps> = ({ orderId }) => {
  const { getOrder } = useOrder();
  const order = getOrder(orderId);

  if (!order) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">주문을 찾을 수 없습니다</h1>
          <a href="#/" className="text-blue-600 hover:text-blue-800">홈으로 돌아가기</a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h1>
        <p className="text-gray-600">주문번호: {order.id}</p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주문 상품</h2>
          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex items-center space-x-4">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{item.product.name}</h3>
                  <div className="text-sm text-gray-500">
                    {item.size && <span>사이즈: {item.size} </span>}
                    {item.color && <span>색상: {item.color}</span>}
                  </div>
                  <p className="text-sm">수량: {item.quantity}</p>
                </div>
                <span className="font-medium">
                  {(item.product.price * item.quantity).toLocaleString()}원
                </span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4 flex justify-between font-bold text-lg">
            <span>총 결제 금액</span>
            <span>{order.total.toLocaleString()}원</span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">배송 정보</h2>
          <div className="space-y-2">
            <p><span className="font-medium">받는 분:</span> {order.shippingAddress.name}</p>
            <p><span className="font-medium">연락처:</span> {order.shippingAddress.phone}</p>
            <p><span className="font-medium">주소:</span> ({order.shippingAddress.zipCode}) {order.shippingAddress.address} {order.shippingAddress.detailAddress}</p>
          </div>
        </div>

        <div className="text-center space-x-4">
          <a
            href="#/"
            className="inline-block bg-gray-900 text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
          >
            쇼핑 계속하기
          </a>
          <a
            href="#/mypage"
            className="inline-block border border-gray-900 text-gray-900 px-6 py-3 rounded-md hover:bg-gray-50 transition-colors"
          >
            주문 내역 보기
          </a>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;