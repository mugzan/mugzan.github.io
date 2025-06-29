import React, { useState, useEffect } from 'react';
import { useOrder } from '../context/OrderContext';
import { useAddress } from '../context/AddressContext';
import { useUser } from '../context/UserContext';
import AddressSelector from './AddressSelector';
import AddressForm from './AddressForm';
import PaymentPage from './PaymentPage';

const BuyNowCheckoutPage: React.FC = () => {
  const { createOrder } = useOrder();
  const { getDefaultAddress } = useAddress();
  const { user } = useUser();
  const [step, setStep] = useState<'shipping' | 'payment'>('shipping');
  const [orderId, setOrderId] = useState<string>('');
  const [orderData, setOrderData] = useState<any>(null);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [shippingInfo, setShippingInfo] = useState({
    name: '',
    phone: '',
    zipCode: '',
    address: '',
    detailAddress: ''
  });

  useEffect(() => {
    // localStorage에서 임시 주문 데이터 가져오기
    const tempOrder = localStorage.getItem('tempBuyNowOrder');
    if (tempOrder) {
      setOrderData(JSON.parse(tempOrder));
    } else {
      // 임시 주문 데이터가 없으면 홈으로 리다이렉트
      window.location.hash = '#/';
    }

    // 기본 배송지 로드
    if (user) {
      const defaultAddress = getDefaultAddress(user.id);
      if (defaultAddress) {
        setShippingInfo({
          name: defaultAddress.name,
          phone: defaultAddress.phone,
          zipCode: defaultAddress.zipCode,
          address: defaultAddress.address,
          detailAddress: defaultAddress.detailAddress
        });
      }
    }
  }, [user, getDefaultAddress]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressSelect = (address: any) => {
    setShippingInfo(address);
    setShowAddressForm(false);
  };

  const handleNewAddress = () => {
    setShowAddressForm(true);
  };

  const handleAddressSave = (address: any) => {
    setShippingInfo(address);
    setShowAddressForm(false);
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!orderData) {
      alert('주문 정보가 없습니다.');
      return;
    }

    // 주문 생성 (결제 대기 상태)
    const newOrderId = createOrder(orderData.items, shippingInfo);
    setOrderId(newOrderId);
    setStep('payment');
    
    // 임시 주문 데이터 삭제
    localStorage.removeItem('tempBuyNowOrder');
  };

  if (!orderData) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">주문 정보를 찾을 수 없습니다</h1>
          <a href="#/" className="text-blue-600 hover:text-blue-800">홈으로 돌아가기</a>
        </div>
      </div>
    );
  }

  if (step === 'payment') {
    return <PaymentPage orderId={orderId} shippingInfo={shippingInfo} items={orderData.items} total={orderData.total} />;
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">바로 주문하기</h1>
      
      {/* 진행 단계 표시 */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm">
            1
          </div>
          <span className="ml-2 text-sm font-medium">배송정보</span>
        </div>
        <div className="w-16 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm">
            2
          </div>
          <span className="ml-2 text-sm text-gray-500">결제하기</span>
        </div>
      </div>
      
      <form onSubmit={handleShippingSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            {/* 주소 선택기 */}
            {!showAddressForm && (
              <AddressSelector
                selectedAddress={shippingInfo.name ? shippingInfo : null}
                onAddressSelect={handleAddressSelect}
                onNewAddress={handleNewAddress}
              />
            )}

            {/* 새 주소 추가 폼 */}
            {showAddressForm && (
              <AddressForm
                onSave={handleAddressSave}
                onCancel={() => setShowAddressForm(false)}
                initialData={shippingInfo}
              />
            )}

            {/* 직접 입력 폼 */}
            {!showAddressForm && (
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">배송 정보 {shippingInfo.name && '(수정)'}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      받는 분 이름 *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={shippingInfo.name}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      연락처 *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={shippingInfo.phone}
                      onChange={handleInputChange}
                      placeholder="010-1234-5678"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      우편번호 *
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                        required
                      />
                      <button
                        type="button"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                        onClick={() => alert('우편번호 검색 기능은 실제 서비스에서 구현됩니다.')}
                      >
                        검색
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      주소 *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={shippingInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      상세주소
                    </label>
                    <input
                      type="text"
                      name="detailAddress"
                      value={shippingInfo.detailAddress}
                      onChange={handleInputChange}
                      placeholder="동/호수, 건물명 등"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-900 mb-4">주문 상품</h2>
            <div className="space-y-4">
              {orderData.items.map((item: any) => (
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
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-gray-900 mb-4">결제 정보</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>상품 금액</span>
                <span>{orderData.total.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between">
                <span>배송비</span>
                <span>무료</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-bold text-lg">
                <span>총 결제 금액</span>
                <span>{orderData.total.toLocaleString()}원</span>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full mt-6 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
              disabled={showAddressForm}
            >
              결제하기
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BuyNowCheckoutPage;