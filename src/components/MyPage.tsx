import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useOrder } from '../context/OrderContext';
import { useAddress } from '../context/AddressContext';
import AddressForm from './AddressForm';

const MyPage: React.FC = () => {
  const { user } = useUser();
  const { getUserOrders } = useOrder();
  const { getUserAddresses, deleteAddress, setDefaultAddress } = useAddress();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses'>('orders');
  const [showAddressForm, setShowAddressForm] = useState(false);

  if (!user) return null;

  const orders = getUserOrders(user.id);
  const addresses = getUserAddresses(user.id);

  const handleDeleteAddress = (addressId: number) => {
    if (confirm('이 주소를 삭제하시겠습니까?')) {
      deleteAddress(addressId);
    }
  };

  const handleSetDefault = (addressId: number) => {
    setDefaultAddress(addressId);
  };

  const handleAddressSave = () => {
    setShowAddressForm(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">마이페이지</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* 사이드바 */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">회원 정보</h2>
            <div className="space-y-2">
              <p><span className="font-medium">이름:</span> {user.name}</p>
              <p><span className="font-medium">이메일:</span> {user.email}</p>
              {user.phone && <p><span className="font-medium">전화번호:</span> {user.phone}</p>}
              {user.isAdmin && (
                <p className="text-blue-600 font-medium">관리자 계정</p>
              )}
            </div>
          </div>

          {/* 탭 메뉴 */}
          <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full px-6 py-4 text-left transition-colors ${
                activeTab === 'orders' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              주문 내역
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full px-6 py-4 text-left transition-colors border-t ${
                activeTab === 'addresses' 
                  ? 'bg-gray-900 text-white' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              배송지 관리
            </button>
          </div>
        </div>
        
        {/* 메인 컨텐츠 */}
        <div className="lg:col-span-3">
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-4">주문 내역</h2>
              {orders.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow-md">
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
                        <div className="text-right">
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
                          <div className="mt-1">
                            <span className={`px-2 py-1 rounded text-xs ${
                              order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                              order.paymentStatus === 'pending_payment' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }`}>
                              {order.paymentStatus === 'paid' ? '결제완료' :
                               order.paymentStatus === 'pending_payment' ? '입금대기' : '결제대기'}
                            </span>
                          </div>
                        </div>
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
          )}

          {activeTab === 'addresses' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-gray-900">배송지 관리</h2>
                <button
                  onClick={() => setShowAddressForm(true)}
                  className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                >
                  새 주소 추가
                </button>
              </div>

              {showAddressForm && (
                <div className="mb-6">
                  <AddressForm
                    onSave={handleAddressSave}
                    onCancel={() => setShowAddressForm(false)}
                  />
                </div>
              )}

              {addresses.length === 0 ? (
                <div className="text-center py-8 bg-white rounded-lg shadow-md">
                  <p className="text-gray-500">저장된 배송지가 없습니다.</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="text-blue-600 hover:text-blue-800 mt-2"
                  >
                    첫 번째 배송지 추가하기
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div
                      key={address.id}
                      className={`p-6 rounded-lg shadow-md ${
                        address.isDefault 
                          ? 'bg-blue-50 border-2 border-blue-200' 
                          : 'bg-white border border-gray-200'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h3 className="font-medium text-gray-900">{address.name}</h3>
                            {address.isDefault && (
                              <span className="px-2 py-1 text-xs bg-blue-600 text-white rounded">
                                기본 주소
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-gray-600">{address.phone}</p>
                          <p className="text-sm text-gray-600">
                            ({address.zipCode}) {address.address} {address.detailAddress}
                          </p>
                        </div>
                        <div className="flex flex-col space-y-2">
                          {!address.isDefault && (
                            <button
                              onClick={() => handleSetDefault(address.id)}
                              className="px-3 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                            >
                              기본 설정
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteAddress(address.id)}
                            className="px-3 py-1 text-xs text-red-600 hover:text-red-800 transition-colors"
                          >
                            삭제
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPage;