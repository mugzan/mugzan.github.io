import React from 'react';

interface BannerProps {
  imageUrl: string;
  title?: string;
  subtitle?: string;
}

const Banner: React.FC<BannerProps> = ({ imageUrl, title, subtitle }) => {
  return (
    <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
      <img
        src={imageUrl}
        alt="Banner"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      {(title || subtitle) && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            {title && <h2 className="text-3xl md:text-4xl font-bold mb-2">{title}</h2>}
            {subtitle && <p className="text-lg md:text-xl">{subtitle}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Banner;