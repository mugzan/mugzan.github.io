import React, { useState } from 'react';
import { useProduct } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useOrder } from '../context/OrderContext';
import { useLanguage } from '../context/LanguageContext';

interface ProductDetailProps {
  productId: number;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ productId }) => {
  const { getProduct } = useProduct();
  const { addToCart } = useCart();
  const { createOrder } = useOrder();
  const { t } = useLanguage();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  const product = getProduct(productId);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-2xl font-light text-black mb-4">{t('product.notfound')}</h1>
          <a href="#/" className="text-sm text-gray-600 hover:text-black transition-colors">
            {t('product.returntohome')}
          </a>
        </div>
      </div>
    );
  }

  const validateSelection = () => {
    if (product.sizes && product.sizes.length > 0 && !selectedSize) {
      alert(t('product.selectsize'));
      return false;
    }
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      alert(t('product.selectcolor'));
      return false;
    }
    return true;
  };

  const handleAddToCart = () => {
    if (!validateSelection()) return;

    addToCart(product, quantity, selectedSize, selectedColor);
    alert(t('product.addedtocart'));
  };

  const handleBuyNow = () => {
    if (!validateSelection()) return;

    // 임시 장바구니 아이템 생성
    const tempCartItem = {
      id: Date.now(),
      product,
      quantity,
      size: selectedSize,
      color: selectedColor
    };

    // 임시 배송 정보로 바로 결제 페이지로 이동
    // localStorage에 임시 주문 정보 저장
    const tempOrderData = {
      items: [tempCartItem],
      total: product.price * quantity,
      isBuyNow: true
    };
    
    localStorage.setItem('tempBuyNowOrder', JSON.stringify(tempOrderData));
    window.location.hash = '#/buy-now-checkout';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* 상품 이미지 */}
        <div className="aspect-[3/4] overflow-hidden bg-gray-50">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* 상품 정보 */}
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-light text-black tracking-wide mb-4">
              {product.name}
            </h1>
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-xl font-light text-black">
                ₩{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through font-light">
                  ₩{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            <div className="w-12 h-px bg-gray-300 mb-6"></div>
          </div>

          {product.description && (
            <div>
              <p className="text-sm text-gray-600 font-light leading-relaxed">
                {product.description}
              </p>
            </div>
          )}

          {/* 사이즈 선택 */}
          {product.sizes && product.sizes.length > 0 && (
            <div>
              <h3 className="text-sm font-light text-black mb-4 tracking-wide">{t('product.size')}</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 text-xs font-light tracking-wide transition-colors ${
                      selectedSize === size
                        ? 'bg-black text-white'
                        : 'border border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 색상 선택 */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="text-sm font-light text-black mb-4 tracking-wide">{t('product.color')}</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 text-xs font-light tracking-wide transition-colors ${
                      selectedColor === color
                        ? 'bg-black text-white'
                        : 'border border-gray-300 text-gray-700 hover:border-black'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 수량 선택 */}
          <div>
            <h3 className="text-sm font-light text-black mb-4 tracking-wide">{t('product.quantity')}</h3>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              >
                <span className="text-xs">-</span>
              </button>
              <span className="text-sm font-light w-8 text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 border border-gray-300 flex items-center justify-center hover:border-black transition-colors"
              >
                <span className="text-xs">+</span>
              </button>
            </div>
          </div>

          {/* 구매 버튼 */}
          <div className="space-y-4 pt-8">
            <button
              onClick={handleBuyNow}
              className="w-full bg-black text-white py-4 text-sm font-light tracking-wide hover:bg-gray-800 transition-colors"
            >
              {t('product.buynow')}
            </button>
            <button
              onClick={handleAddToCart}
              className="w-full border border-black text-black py-4 text-sm font-light tracking-wide hover:bg-black hover:text-white transition-colors"
            >
              {t('product.addtocart')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;