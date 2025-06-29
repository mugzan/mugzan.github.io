import React from 'react';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';

interface PaymentPageProps {
  orderId: string;
  shippingInfo: any;
  items?: any[];
  total?: number;
}

const PaymentPage: React.FC<PaymentPageProps> = ({ orderId, shippingInfo, items, total }) => {
  const { items: cartItems, getTotalPrice } = useCart();
  const { updateOrderPayment } = useOrder();
  
  // 바로구매인 경우 props로 받은 items와 total 사용, 아니면 장바구니 사용
  const orderItems = items || cartItems;
  const orderTotal = total || getTotalPrice();
  
  const bankInfo = {
    bank: '토스뱅크',
    account: '100051662322',
    holder: 'TONG THI HOA HONG'
  };

  const kakaoOpenChatUrl = 'https://open.kakao.com/o/s83SsoEh'; // 새로운 오픈채팅 링크

  const handlePayment = () => {
    updateOrderPayment(orderId, 'pending_payment', 'bank');
    window.location.hash = `#/order-confirmation/${orderId}`;
  };

  const openKakaoChat = () => {
    window.open(kakaoOpenChatUrl, '_blank');
  };

  const copyAccountInfo = () => {
    const accountText = `${bankInfo.bank} ${bankInfo.account} ${bankInfo.holder}`;
    navigator.clipboard.writeText(accountText).then(() => {
      alert('계좌정보가 복사되었습니다!');
    });
  };

  const copyOrderInfo = () => {
    const orderText = `주문번호: ${orderId}\n입금액: ${orderTotal.toLocaleString()}원\n입금자명: [입금하신 이름을 적어주세요]`;
    navigator.clipboard.writeText(orderText).then(() => {
      alert('주문정보가 복사되었습니다! 카카오톡에 붙여넣기 해주세요.');
    });
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light text-black tracking-wide mb-12">결제하기</h1>
      
      {/* 진행 단계 표시 */}
      <div className="flex items-center justify-center mb-12">
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-gray-300 text-gray-600 rounded-full text-sm">
            1
          </div>
          <span className="ml-2 text-sm text-gray-500">배송정보</span>
        </div>
        <div className="w-16 h-px bg-gray-300 mx-4"></div>
        <div className="flex items-center">
          <div className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full text-sm">
            2
          </div>
          <span className="ml-2 text-sm font-medium">결제하기</span>
        </div>
      </div>
      
      <div className="space-y-8">
        {/* 주문 요약 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-light text-black mb-4">주문 요약</h2>
          <div className="space-y-2">
            {orderItems.map((item: any) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.product.name} x {item.quantity}</span>
                <span>{(item.product.price * item.quantity).toLocaleString()}원</span>
              </div>
            ))}
            <div className="border-t pt-2 flex justify-between font-medium text-lg">
              <span>총 결제금액</span>
              <span className="text-red-600">{orderTotal.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 결제 방법 - 무통장 입금만 */}
        <div className="bg-white border border-gray-100 p-6 rounded-lg">
          <h2 className="text-lg font-light text-black mb-6">결제 방법</h2>
          
          <div className="p-4 border-2 border-blue-200 bg-blue-50 rounded-lg">
            <div className="flex items-center mb-4">
              <span className="text-3xl mr-4">🏦</span>
              <div>
                <div className="font-medium text-lg">무통장 입금</div>
                <div className="text-sm text-gray-600">입금 확인 후 배송이 시작됩니다</div>
              </div>
            </div>
          </div>
        </div>

        {/* 입금 계좌 정보 */}
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-medium text-blue-900 text-lg">📋 입금 계좌 정보</h3>
            <button
              onClick={copyAccountInfo}
              className="px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
            >
              계좌복사
            </button>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-blue-200">
              <span className="text-blue-700 font-medium">은행명</span>
              <span className="font-bold text-lg">{bankInfo.bank}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-blue-200">
              <span className="text-blue-700 font-medium">계좌번호</span>
              <span className="font-bold text-lg font-mono">{bankInfo.account}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-blue-200">
              <span className="text-blue-700 font-medium">예금주</span>
              <span className="font-bold text-lg">{bankInfo.holder}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-blue-700 font-medium">입금액</span>
              <span className="font-bold text-xl text-red-600">{orderTotal.toLocaleString()}원</span>
            </div>
          </div>
        </div>

        {/* 카카오톡 오픈채팅 안내 */}
        <div className="bg-yellow-50 border border-yellow-300 p-6 rounded-lg">
          <div className="flex items-center mb-4">
            <span className="text-3xl mr-4">💬</span>
            <div>
              <h3 className="font-medium text-yellow-900 text-lg">카카오톡 오픈채팅 KLYP</h3>
              <p className="text-sm text-yellow-700">입금 후 입금증명서를 보내주세요!</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white border border-yellow-200 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-3">📱 입금 확인 방법</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                  <span>위 계좌로 입금하기</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                  <span>입금 완료 후 입금증명서 캡처하기</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                  <span>카카오톡 오픈채팅방에 입금증명서 + 주문정보 보내기</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                  <span>입금 확인 후 1-2일 내 배송 시작</span>
                </li>
              </ol>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={openKakaoChat}
                className="flex-1 bg-yellow-400 text-yellow-900 py-3 px-4 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                카카오톡 오픈채팅 입장
              </button>
              <button
                onClick={copyOrderInfo}
                className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
              >
                주문정보 복사
              </button>
            </div>
          </div>
        </div>

        {/* 입금 시 주의사항 */}
        <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
          <div className="flex items-start">
            <span className="text-red-600 text-xl mr-3">⚠️</span>
            <div className="text-sm text-red-800">
              <p className="font-medium mb-2">입금 시 주의사항:</p>
              <ul className="space-y-1">
                <li>• 정확한 금액을 입금해주세요 (₩{orderTotal.toLocaleString()})</li>
                <li>• 입금 후 반드시 카카오톡 오픈채팅방에 입금증명서를 보내주세요</li>
                <li>• 주문번호를 함께 보내주시면 더 빠른 확인이 가능합니다</li>
                <li>• 주문번호: <span className="font-mono font-bold bg-red-100 px-2 py-1 rounded">{orderId}</span></li>
              </ul>
            </div>
          </div>
        </div>

        {/* 배송 정보 확인 */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium text-gray-900 mb-4">배송 정보</h3>
          <div className="text-sm space-y-1">
            <p><span className="font-medium">받는 분:</span> {shippingInfo.name}</p>
            <p><span className="font-medium">연락처:</span> {shippingInfo.phone}</p>
            <p><span className="font-medium">주소:</span> ({shippingInfo.zipCode}) {shippingInfo.address} {shippingInfo.detailAddress}</p>
          </div>
        </div>

        {/* 주문 완료 버튼 */}
        <button
          onClick={handlePayment}
          className="w-full bg-black text-white py-4 text-lg font-light tracking-wide hover:bg-gray-800 transition-colors rounded-lg"
        >
          주문 완료 (입금 대기)
        </button>

        <div className="text-center text-sm text-gray-500">
          <p>주문 완료 후 위 계좌로 입금하고 카카오톡 오픈채팅방에 입금증명서를 보내주세요.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;