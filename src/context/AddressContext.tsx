import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ShippingAddress } from '../types';

interface AddressContextType {
  addresses: ShippingAddress[];
  addAddress: (address: Omit<ShippingAddress, 'id'>) => void;
  updateAddress: (id: number, address: Partial<ShippingAddress>) => void;
  deleteAddress: (id: number) => void;
  setDefaultAddress: (id: number) => void;
  getDefaultAddress: (userId: number) => ShippingAddress | undefined;
  getUserAddresses: (userId: number) => ShippingAddress[];
}

const AddressContext = createContext<AddressContextType | undefined>(undefined);

export const AddressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);

  const addAddress = (address: Omit<ShippingAddress, 'id'>) => {
    const newAddress: ShippingAddress = {
      ...address,
      id: Date.now()
    };

    // 첫 번째 주소이거나 기본 주소로 설정하는 경우, 다른 주소들의 기본 설정 해제
    if (address.isDefault) {
      setAddresses(prev => [
        ...prev.map(addr => 
          addr.userId === address.userId 
            ? { ...addr, isDefault: false } 
            : addr
        ),
        newAddress
      ]);
    } else {
      setAddresses(prev => [...prev, newAddress]);
    }
  };

  const updateAddress = (id: number, updatedAddress: Partial<ShippingAddress>) => {
    setAddresses(prev => prev.map(addr => {
      if (addr.id === id) {
        const updated = { ...addr, ...updatedAddress };
        
        // 기본 주소로 설정하는 경우, 같은 사용자의 다른 주소들의 기본 설정 해제
        if (updated.isDefault) {
          setAddresses(prevAddresses => 
            prevAddresses.map(a => 
              a.userId === updated.userId && a.id !== id 
                ? { ...a, isDefault: false } 
                : a
            )
          );
        }
        
        return updated;
      }
      return addr;
    }));
  };

  const deleteAddress = (id: number) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
  };

  const setDefaultAddress = (id: number) => {
    const targetAddress = addresses.find(addr => addr.id === id);
    if (!targetAddress) return;

    setAddresses(prev => prev.map(addr => ({
      ...addr,
      isDefault: addr.id === id ? true : 
                 addr.userId === targetAddress.userId ? false : 
                 addr.isDefault
    })));
  };

  const getDefaultAddress = (userId: number) => {
    return addresses.find(addr => addr.userId === userId && addr.isDefault);
  };

  const getUserAddresses = (userId: number) => {
    return addresses.filter(addr => addr.userId === userId);
  };

  return (
    <AddressContext.Provider value={{
      addresses,
      addAddress,
      updateAddress,
      deleteAddress,
      setDefaultAddress,
      getDefaultAddress,
      getUserAddresses
    }}>
      {children}
    </AddressContext.Provider>
  );
};

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error('useAddress must be used within an AddressProvider');
  }
  return context;
};