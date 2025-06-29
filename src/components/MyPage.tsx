import React from 'react';
import { useUser } from '../context/UserContext';
import { useOrder } from '../context/OrderContext';

const MyPage: React.FC = () => {
  const { user } = useUser();
  const { getUserOrders } = useOrder();

  const orders = user ? getUserOrders(user.id) : [];

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold text-gray-900 mb-4">회원 정보</h2>
          <div className="space-y-2">
            <p><span className="font-medium">이름:</span> {user?.name}</p>
            <p><span className="font-medium">이메일:</span> {user?.email}</p>
            {user?.isAdmin && (
              <p className="text-blue-600 font-medium">관리자 계정</p>
            )}
          </div>
        </div>
        
        <div className="lg:col-span-2">
          <h2 className="text-xl font-bold text-gray-900 mb-4">주문 내역</h2>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">주문 내역이 없습니다.</p>
              <a href="#/" className="text-blue-600 hover:text-blue-800 mt-2 inline-block">
                쇼핑하러 가기
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-medium text-gray-900">주문번호: {order.id}</h3>
                      <p className="text-sm text-gray-500">
                        {order.createdAt.toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {order.status === 'pending' ? '주문접수' :
                       order.status === 'confirmed' ? '주문확인' :
                       order.status === 'shipped' ? '배송중' : '배송완료'}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex justify-between">
                        <span>{item.product.name} x {item.quantity}</span>
                        <span>{(item.product.price * item.quantity).toLocaleString()}원</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                    <span>총 결제 금액</span>
                    <span>{order.total.toLocaleString()}원</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;