import React from 'react';

const ReturnsExchangesPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-light text-black tracking-wide mb-12 text-center">교환 및 반품 정책</h1>
      
      <div className="space-y-12">
        {/* 중요 공지 */}
        <section className="bg-red-50 border-2 border-red-200 p-8 rounded-lg">
          <div className="flex items-start space-x-4">
            <div className="text-red-600 text-3xl">⚠️</div>
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-4">중요 공지</h2>
              <div className="space-y-3 text-red-800">
                <p className="text-lg font-medium">
                  ⛔ <strong>한번 구매한 상품은 교환 및 반품이 불가능합니다.</strong>
                </p>
                <p className="text-base">
                  모든 상품은 주문 확정 후 교환, 반품, 환불이 일절 불가하오니 신중하게 구매해주시기 바랍니다.
                </p>
                <p className="text-sm">
                  구매 전 사이즈, 색상, 상품 정보를 꼼꼼히 확인해주세요.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 구매 전 확인사항 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">📋 구매 전 필수 확인사항</h2>
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h3 className="font-medium text-blue-900 mb-3">구매 전 반드시 확인해주세요</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>사이즈 확인:</strong> 사이즈 가이드를 참고하여 정확한 사이즈를 선택해주세요</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>색상 확인:</strong> 모니터 설정에 따라 실제 색상과 차이가 있을 수 있습니다</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>상품 정보:</strong> 소재, 관리방법, 상품 설명을 자세히 읽어보세요</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600 font-bold">✓</span>
                  <span><strong>배송 주소:</strong> 정확한 배송지 주소와 연락처를 입력해주세요</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 사이즈 가이드 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">📏 사이즈 가이드</h2>
          <div className="space-y-6">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">상의 사이즈 (단위: cm)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-medium">사이즈</th>
                      <th className="text-left py-2 px-3 font-medium">가슴둘레</th>
                      <th className="text-left py-2 px-3 font-medium">어깨너비</th>
                      <th className="text-left py-2 px-3 font-medium">총길이</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">S</td>
                      <td className="py-2 px-3">88-92</td>
                      <td className="py-2 px-3">40-42</td>
                      <td className="py-2 px-3">60-62</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">M</td>
                      <td className="py-2 px-3">92-96</td>
                      <td className="py-2 px-3">42-44</td>
                      <td className="py-2 px-3">62-64</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">L</td>
                      <td className="py-2 px-3">96-100</td>
                      <td className="py-2 px-3">44-46</td>
                      <td className="py-2 px-3">64-66</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">XL</td>
                      <td className="py-2 px-3">100-104</td>
                      <td className="py-2 px-3">46-48</td>
                      <td className="py-2 px-3">66-68</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-3">하의 사이즈 (단위: cm)</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-300">
                      <th className="text-left py-2 px-3 font-medium">사이즈</th>
                      <th className="text-left py-2 px-3 font-medium">허리둘레</th>
                      <th className="text-left py-2 px-3 font-medium">엉덩이둘레</th>
                      <th className="text-left py-2 px-3 font-medium">총길이</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">28</td>
                      <td className="py-2 px-3">70-74</td>
                      <td className="py-2 px-3">88-92</td>
                      <td className="py-2 px-3">100-102</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">30</td>
                      <td className="py-2 px-3">74-78</td>
                      <td className="py-2 px-3">92-96</td>
                      <td className="py-2 px-3">102-104</td>
                    </tr>
                    <tr className="border-b border-gray-200">
                      <td className="py-2 px-3">32</td>
                      <td className="py-2 px-3">78-82</td>
                      <td className="py-2 px-3">96-100</td>
                      <td className="py-2 px-3">104-106</td>
                    </tr>
                    <tr>
                      <td className="py-2 px-3">34</td>
                      <td className="py-2 px-3">82-86</td>
                      <td className="py-2 px-3">100-104</td>
                      <td className="py-2 px-3">106-108</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* 상품 관리 방법 */}
        <section className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-medium text-black mb-6">🧺 상품 관리 방법</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">세탁 방법</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>찬물 또는 미지근한 물(30°C 이하)로 세탁</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>중성세제 사용 권장</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>표백제 사용 금지</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>단독 세탁 또는 비슷한 색상끼리 세탁</span>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">보관 방법</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>직사광선을 피해 서늘한 곳에 보관</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>습기가 적은 곳에 보관</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>옷걸이에 걸어서 보관 권장</span>
                </li>
                <li className="flex items-start space-x-3">
                  <span className="text-blue-600">•</span>
                  <span>방충제 사용 시 직접 접촉 피하기</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 구매 문의 */}
        <section className="bg-yellow-50 border border-yellow-300 p-8 rounded-lg">
          <h2 className="text-xl font-medium text-yellow-900 mb-6">💬 구매 전 문의</h2>
          <div className="space-y-4">
            <p className="text-yellow-800">
              구매 전 궁금한 사항이 있으시면 언제든지 문의해주세요!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => window.open('https://open.kakao.com/o/s83SsoEh', '_blank')}
                className="flex-1 bg-yellow-400 text-yellow-900 py-3 px-6 rounded-lg font-medium hover:bg-yellow-500 transition-colors flex items-center justify-center"
              >
                <span className="mr-2">💬</span>
                카카오톡 상담하기
              </button>
              <div className="flex-1 p-3 bg-white border border-yellow-300 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>상담 가능 시간:</strong><br />
                  평일 10:00 - 18:00<br />
                  (주말 및 공휴일 휴무)
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 최종 안내 */}
        <section className="bg-gray-900 text-white p-8 rounded-lg">
          <h2 className="text-xl font-medium mb-6">📢 최종 안내</h2>
          <div className="space-y-4">
            <p className="text-lg font-medium">
              KLYP는 고객님의 만족을 위해 최선을 다하고 있습니다.
            </p>
            <p>
              하지만 <strong className="text-yellow-400">모든 상품은 구매 확정 후 교환 및 반품이 불가능</strong>하오니, 
              구매 전 충분히 검토해주시기 바랍니다.
            </p>
            <p className="text-sm text-gray-300">
              궁금한 사항이 있으시면 구매 전에 반드시 문의해주세요. 
              정확하고 친절한 상담으로 도움드리겠습니다.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReturnsExchangesPage;