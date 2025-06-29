import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const ShippingInfoPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light text-black tracking-wide mb-12 text-center">배송 정보</h1>
      
      <div className="space-y-12">
        {/* 배송 정책 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">📦 배송 정책</h2>
          <div className="space-y-4 text-gray-700">
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <p className="font-medium">배송비: 무료배송</p>
                <p className="text-sm text-gray-600">전 상품 무료배송으로 제공됩니다.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <p className="font-medium">배송 지역: 전국 배송</p>
                <p className="text-sm text-gray-600">제주도 및 도서산간 지역 포함</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-blue-600 font-bold">•</span>
              <div>
                <p className="font-medium">배송 시간: 1-3일 소요</p>
                <p className="text-sm text-gray-600">입금 확인 후 1-3일 내 배송 시작</p>
              </div>
            </div>
          </div>
        </section>

        {/* 배송 프로세스 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">🚚 배송 프로세스</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">1</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">주문 접수</h3>
              <p className="text-sm text-gray-600">주문 완료 및 입금 확인</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">상품 준비</h3>
              <p className="text-sm text-gray-600">상품 포장 및 배송 준비</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold">3</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">배송 시작</h3>
              <p className="text-sm text-gray-600">택배사 인수 및 배송 시작</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-green-600 font-bold">4</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">배송 완료</h3>
              <p className="text-sm text-gray-600">고객님께 상품 전달</p>
            </div>
          </div>
        </section>

        {/* 배송 시간 안내 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">⏰ 배송 시간 안내</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">지역</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">배송 시간</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">비고</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">서울/경기/인천</td>
                  <td className="py-3 px-4 text-gray-700">1-2일</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">당일 발송 시 익일 도착</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">충청/강원/경상/전라</td>
                  <td className="py-3 px-4 text-gray-700">2-3일</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">지역에 따라 차이 있음</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-700">제주도</td>
                  <td className="py-3 px-4 text-gray-700">3-4일</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">항공편 이용</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 text-gray-700">도서산간</td>
                  <td className="py-3 px-4 text-gray-700">3-5일</td>
                  <td className="py-3 px-4 text-gray-600 text-sm">지역에 따라 추가 소요</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 배송 추적 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">📍 배송 추적</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-2">배송 조회 방법</h3>
              <ol className="text-sm text-blue-800 space-y-1">
                <li>1. 마이페이지 → 주문내역에서 운송장 번호 확인</li>
                <li>2. 택배사 홈페이지 또는 앱에서 운송장 번호 입력</li>
                <li>3. 실시간 배송 현황 확인 가능</li>
              </ol>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">주요 택배사</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• CJ대한통운</li>
                  <li>• 롯데택배</li>
                  <li>• 한진택배</li>
                </ul>
              </div>
              <div className="p-4 border border-gray-200 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">배송 문의</h4>
                <p className="text-sm text-gray-600 mb-2">배송 관련 문의사항이 있으시면</p>
                <button
                  onClick={() => window.open('https://open.kakao.com/o/s83SsoEh', '_blank')}
                  className="text-sm bg-yellow-400 text-yellow-900 px-3 py-1 rounded hover:bg-yellow-500 transition-colors"
                >
                  💬 카카오톡 문의하기
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 주의사항 */}
        <section className="bg-red-50 border border-red-200 p-8 rounded-lg">
          <h2 className="text-xl font-medium text-red-900 mb-6">⚠️ 배송 주의사항</h2>
          <div className="space-y-3 text-red-800">
            <div className="flex items-start space-x-3">
              <span className="text-red-600 font-bold">•</span>
              <p>배송지 주소가 정확하지 않을 경우 배송이 지연될 수 있습니다.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-600 font-bold">•</span>
              <p>수령인 부재 시 택배함 또는 경비실에 보관될 수 있습니다.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-600 font-bold">•</span>
              <p>천재지변, 택배사 사정으로 인한 배송 지연이 발생할 수 있습니다.</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="text-red-600 font-bold">•</span>
              <p>입금 확인 후 배송이 시작되므로, 빠른 입금 확인을 위해 카카오톡으로 입금증명서를 보내주세요.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ShippingInfoPage;