import React, { useState, useEffect } from 'react';
import { useProduct } from '../context/ProductContext';

interface ProductFormProps {
  existingProductId?: number;
}

const ProductForm: React.FC<ProductFormProps> = ({ existingProductId }) => {
  const { addProduct, updateProduct, getProduct } = useProduct();
  const [formData, setFormData] = useState({
    name: '',
    price: 0,
    originalPrice: 0,
    image: '',
    category: 'BEST ITEM',
    description: '',
    sizes: '',
    colors: '',
    stock: 0
  });

  const isEditing = !!existingProductId;

  useEffect(() => {
    if (isEditing && existingProductId) {
      const product = getProduct(existingProductId);
      if (product) {
        setFormData({
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice || 0,
          image: product.image,
          category: product.category,
          description: product.description || '',
          sizes: product.sizes?.join(', ') || '',
          colors: product.colors?.join(', ') || '',
          stock: product.stock || 0
        });
      }
    }
  }, [isEditing, existingProductId, getProduct]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'originalPrice' || name === 'stock' 
        ? parseInt(value) || 0 
        : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const productData = {
      name: formData.name,
      price: formData.price,
      originalPrice: formData.originalPrice || undefined,
      image: formData.image,
      category: formData.category,
      description: formData.description || undefined,
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()) : undefined,
      colors: formData.colors ? formData.colors.split(',').map(c => c.trim()) : undefined,
      stock: formData.stock
    };

    if (isEditing && existingProductId) {
      updateProduct(existingProductId, productData);
    } else {
      addProduct(productData);
    }

    window.location.hash = '#/admin';
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        {isEditing ? '상품 수정' : '상품 추가'}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상품명
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              판매가격
            </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              원가 (선택사항)
            </label>
            <input
              type="number"
              name="originalPrice"
              value={formData.originalPrice}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            이미지 URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            카테고리
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          >
            <option value="BEST ITEM">BEST ITEM</option>
            <option value="NEW ARRIVAL">NEW ARRIVAL</option>
            <option value="MD'S PICK">MD'S PICK</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            상품 설명
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              사이즈 (쉼표로 구분)
            </label>
            <input
              type="text"
              name="sizes"
              value={formData.sizes}
              onChange={handleInputChange}
              placeholder="S, M, L, XL"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              색상 (쉼표로 구분)
            </label>
            <input
              type="text"
              name="colors"
              value={formData.colors}
              onChange={handleInputChange}
              placeholder="블랙, 화이트, 네이비"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            재고 수량
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
        </div>

        <div className="flex space-x-4">
          <button
            type="submit"
            className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors"
          >
            {isEditing ? '수정하기' : '추가하기'}
          </button>
          <a
            href="#/admin"
            className="flex-1 border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors text-center"
          >
            취소
          </a>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;