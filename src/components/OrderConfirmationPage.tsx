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

  const bankInfo = {
    bank: '토스뱅크',
    account: '100051662322',
    holder: 'TONG THI HOA HONG'
  };

  const kakaoOpenChatUrl = 'https://open.kakao.com/o/s83SsoEh'; // 새로운 오픈채팅 링크

  const getPaymentStatusText = (status: string) => {
    switch (status) {
      case 'pending': return '결제 대기';
      case 'pending_payment': return '입금 대기';
      case 'paid': return '결제 완료';
      case 'failed': return '결제 실패';
      default: return status;
    }
  };

  const openKakaoChat = () => {
    window.open(kakaoOpenChatUrl, '_blank');
  };

  const copyOrderInfo = () => {
    const orderText = `주문번호: ${order.id}\n입금액: ${order.total.toLocaleString()}원\n입금자명: [입금하신 이름을 적어주세요]`;
    navigator.clipboard.writeText(orderText).then(() => {
      alert('주문정보가 복사되었습니다! 카카오톡에 붙여넣기 해주세요.');
    });
  };

  const copyAccountInfo = () => {
    const accountText = `${bankInfo.bank} ${bankInfo.account} ${bankInfo.holder}`;
    navigator.clipboard.writeText(accountText).then(() => {
      alert('계좌정보가 복사되었습니다!');
    });
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-16">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">주문이 완료되었습니다!</h1>
        <p className="text-gray-600">주문번호: <span className="font-mono font-bold">{order.id}</span></p>
      </div>

      {/* 입금 안내 */}
      <div className="max-w-2xl mx-auto mb-8">
        <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-blue-900 flex items-center">
              <span className="text-2xl mr-3">💳</span>
              입금 안내
            </h2>
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
              <span className="font-bold text-xl text-red-600">{order.total.toLocaleString()}원</span>
            </div>
          </div>
        </div>
      </div>

      {/* 카카오톡 오픈채팅 안내 */}
      <div className="max-w-2xl mx-auto mb-8">
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
              <h4 className="font-medium text-gray-900 mb-3">📱 빠른 입금 확인 방법</h4>
              <ol className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                  <span>위 계좌로 <strong>{order.total.toLocaleString()}원</strong> 입금</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                  <span>입금 완료 후 입금증명서(계좌이체 완료 화면) 캡처</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                  <span>카카오톡 오픈채팅방에 입금증명서 + 주문번호 전송</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-yellow-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                  <span>입금 확인 후 1-2일 내 배송 시작 📦</span>
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

            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <span className="font-medium">💡 TIP:</span> 카카오톡에서 입금증명서를 보내시면 더 빠른 확인이 가능합니다!
              </p>
            </div>
          </div>
        </div>
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
          
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span>결제 상태:</span>
              <span className="font-medium text-yellow-600">
                {getPaymentStatusText(order.paymentStatus)}
              </span>
            </div>
            <div className="flex justify-between mb-2">
              <span>결제 방법:</span>
              <span>무통장입금</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>총 결제 금액</span>
              <span>{order.total.toLocaleString()}원</span>
            </div>
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