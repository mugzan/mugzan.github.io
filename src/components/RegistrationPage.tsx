import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useAddress } from '../context/AddressContext';

const RegistrationPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  
  // 주소 정보
  const [zipCode, setZipCode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  
  const [error, setError] = useState('');
  const { register } = useUser();
  const { addAddress } = useAddress();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // 필수 약관 동의 확인
    if (!agreeTerms || !agreePrivacy) {
      setError('필수 약관에 동의해주세요.');
      return;
    }

    // 비밀번호 확인
    if (password !== confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 비밀번호 강도 확인
    if (password.length < 6) {
      setError('비밀번호는 6자 이상이어야 합니다.');
      return;
    }

    // 이메일 형식 확인
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('올바른 이메일 형식을 입력해주세요.');
      return;
    }

    // 전화번호 형식 확인 (선택사항이지만 입력했다면 검증)
    if (phone && !/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(phone.replace(/-/g, ''))) {
      setError('올바른 전화번호 형식을 입력해주세요. (예: 010-1234-5678)');
      return;
    }

    const success = await register(email, password, name, {
      phone,
      birthDate,
      gender,
      agreeMarketing
    });
    
    if (success) {
      // 회원가입 성공 시 주소가 입력되어 있으면 기본 배송지로 저장
      if (zipCode && address) {
        // 임시로 사용자 ID를 생성 (실제로는 회원가입 후 반환된 사용자 정보를 사용해야 함)
        const tempUserId = Date.now(); // 실제 구현에서는 register 함수에서 사용자 ID를 반환받아야 함
        
        addAddress({
          name,
          phone: phone || '',
          zipCode,
          address,
          detailAddress,
          isDefault: true,
          userId: tempUserId
        });
      }
      
      alert('회원가입이 완료되었습니다! 로그인해주세요.');
      window.location.hash = '#/login';
    } else {
      setError('이미 존재하는 이메일입니다.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-medium text-black tracking-wide mb-6">KLYP</h1>
          <h2 className="text-xl font-light text-gray-900">회원가입</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 필수 정보 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">필수 정보</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  이름 *
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일 *
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 * (6자 이상)
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호 확인 *
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                  required
                />
              </div>
            </div>
          </div>

          {/* 선택 정보 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">선택 정보</h3>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  전화번호
                </label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="010-1234-5678"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-2">
                  생년월일
                </label>
                <input
                  type="date"
                  id="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  성별
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={gender === 'male'}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    남성
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={gender === 'female'}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    여성
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value="other"
                      checked={gender === 'other'}
                      onChange={(e) => setGender(e.target.value)}
                      className="mr-2"
                    />
                    기타
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 기본 배송지 정보 */}
          <div className="border-b border-gray-200 pb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">기본 배송지 (선택)</h3>
            <p className="text-sm text-gray-600 mb-4">입력하시면 기본 배송지로 저장됩니다.</p>
            
            <div className="space-y-4">
              <div>
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-2">
                  우편번호
                </label>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    id="zipCode"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
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
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                  주소
                </label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              
              <div>
                <label htmlFor="detailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                  상세주소
                </label>
                <input
                  type="text"
                  id="detailAddress"
                  value={detailAddress}
                  onChange={(e) => setDetailAddress(e.target.value)}
                  placeholder="동/호수, 건물명 등"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="space-y-3">
            <h3 className="text-lg font-medium text-gray-900">약관 동의</h3>
            
            <div className="space-y-2">
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-1 mr-3"
                  required
                />
                <span className="text-sm">
                  <span className="text-red-500">*</span> 이용약관에 동의합니다
                  <a href="#" className="text-blue-600 hover:underline ml-2">[보기]</a>
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreePrivacy}
                  onChange={(e) => setAgreePrivacy(e.target.checked)}
                  className="mt-1 mr-3"
                  required
                />
                <span className="text-sm">
                  <span className="text-red-500">*</span> 개인정보 수집 및 이용에 동의합니다
                  <a href="#" className="text-blue-600 hover:underline ml-2">[보기]</a>
                </span>
              </label>
              
              <label className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeMarketing}
                  onChange={(e) => setAgreeMarketing(e.target.checked)}
                  className="mt-1 mr-3"
                />
                <span className="text-sm">
                  마케팅 정보 수신에 동의합니다 (선택)
                  <a href="#" className="text-blue-600 hover:underline ml-2">[보기]</a>
                </span>
              </label>
            </div>
          </div>
          
          {error && (
            <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md">{error}</div>
          )}
          
          <button
            type="submit"
            className="w-full bg-gray-900 text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
          >
            회원가입
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            이미 계정이 있으신가요?{' '}
            <a href="#/login" className="text-blue-600 hover:text-blue-800 font-medium">
              로그인
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;