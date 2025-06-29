import React from 'react';
import { Product } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ProductGridProps {
  title: string;
  products: Product[];
  columns?: number;
}

const ProductGrid: React.FC<ProductGridProps> = ({ title, products, columns = 4 }) => {
  const { t } = useLanguage();
  
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
  };

  // 제목 번역
  const getTranslatedTitle = (title: string) => {
    switch (title) {
      case 'BEST SELLERS':
        return t('products.bestsellers');
      case 'NEW ARRIVALS':
        return t('products.newarrivals');
      case "EDITOR'S CHOICE":
        return t('products.editorschoice');
      default:
        return title;
    }
  };

  return (
    <section className="max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-2xl md:text-3xl font-light text-black tracking-wide mb-4">
          {getTranslatedTitle(title)}
        </h2>
        <div className="w-12 h-px bg-black mx-auto"></div>
      </div>
      
      <div className={`grid ${gridCols[columns as keyof typeof gridCols]} gap-8 md:gap-12`}>
        {products.map((product) => (
          <div key={product.id} className="group cursor-pointer">
            <a href={`#/product/${product.id}`}>
              <div className="aspect-[3/4] overflow-hidden bg-gray-50 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-sm font-light text-black tracking-wide">{product.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-sm text-black font-light">
                    ₩{product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-400 line-through font-light">
                      ₩{product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;