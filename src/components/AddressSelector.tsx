import React, { useState } from 'react';
import { useAddress } from '../context/AddressContext';
import { useUser } from '../context/UserContext';
import { ShippingAddress } from '../types';

interface AddressSelectorProps {
  selectedAddress: any;
  onAddressSelect: (address: any) => void;
  onNewAddress: () => void;
}

const AddressSelector: React.FC<AddressSelectorProps> = ({ 
  selectedAddress, 
  onAddressSelect, 
  onNewAddress 
}) => {
  const { getUserAddresses, setDefaultAddress } = useAddress();
  const { user } = useUser();
  const [showAddresses, setShowAddresses] = useState(false);

  if (!user) return null;

  const userAddresses = getUserAddresses(user.id);

  const handleAddressSelect = (address: ShippingAddress) => {
    onAddressSelect({
      name: address.name,
      phone: address.phone,
      zipCode: address.zipCode,
      address: address.address,
      detailAddress: address.detailAddress
    });
    setShowAddresses(false);
  };

  const handleSetDefault = (addressId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setDefaultAddress(addressId);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">배송 주소</h3>
        <div className="space-x-2">
          {userAddresses.length > 0 && (
            <button
              type="button"
              onClick={() => setShowAddresses(!showAddresses)}
              className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50 transition-colors"
            >
              {showAddresses ? '주소 목록 닫기' : '저장된 주소 선택'}
            </button>
          )}
          <button
            type="button"
            onClick={onNewAddress}
            className="px-3 py-1 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
          >
            새 주소 추가
          </button>
        </div>
      </div>

      {showAddresses && userAddresses.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900 mb-3">저장된 배송 주소</h4>
          <div className="space-y-3">
            {userAddresses.map((address) => (
              <div
                key={address.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  address.isDefault 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
                onClick={() => handleAddressSelect(address)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-medium">{address.name}</span>
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
                  {!address.isDefault && (
                    <button
                      onClick={(e) => handleSetDefault(address.id, e)}
                      className="px-2 py-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      기본 설정
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedAddress && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <h4 className="font-medium text-green-900 mb-2">선택된 배송 주소</h4>
          <div className="text-sm text-green-800">
            <p><span className="font-medium">받는 분:</span> {selectedAddress.name}</p>
            <p><span className="font-medium">연락처:</span> {selectedAddress.phone}</p>
            <p><span className="font-medium">주소:</span> ({selectedAddress.zipCode}) {selectedAddress.address} {selectedAddress.detailAddress}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressSelector;