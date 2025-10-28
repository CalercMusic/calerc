
import React, { useState, useEffect } from 'react';
import { CAROUSEL_IMAGES } from '../constants';

const ImageCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % CAROUSEL_IMAGES.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full lg:flex-1 lg:max-w-[600px] overflow-hidden rounded-lg shadow-2xl shadow-black/50 aspect-[4/3]">
      {CAROUSEL_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute top-0 left-0 w-full h-full bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
          style={{ backgroundImage: `url(${src})` }}
        ></div>
      ))}
    </div>
  );
};

export default ImageCarousel;
