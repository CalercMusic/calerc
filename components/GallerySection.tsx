import React, { useState, useEffect, useCallback } from 'react';
import { GALLERY_IMAGES } from '../constants';

const GallerySection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const openModal = (index: number) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    document.body.style.overflow = 'auto';
  }, []);

  const showNextImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % GALLERY_IMAGES.length);
  }, []);

  const showPrevImage = useCallback(() => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isModalOpen) return;
      if (e.key === 'ArrowRight') {
        showNextImage();
      } else if (e.key === 'ArrowLeft') {
        showPrevImage();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, showNextImage, showPrevImage, closeModal]);
  
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    
    if (swipeDistance > 50) { // Swipe right
        showPrevImage();
    } else if (swipeDistance < -50) { // Swipe left
        showNextImage();
    }
    setTouchStartX(null);
  };
  
  return (
    <>
      <section id="galeria" className="py-24 px-5 text-center bg-black">
        <h2 className="mb-12 uppercase text-4xl lg:text-5xl tracking-widest font-orbitron text-glow" style={{ fontFamily: "'Orbitron', sans-serif" }}>
          Galeria
        </h2>
        <div className="flex justify-center gap-5 flex-wrap max-w-6xl mx-auto">
          {GALLERY_IMAGES.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className="w-full max-w-[300px] md:w-[45%] lg:w-auto lg:max-w-[300px] h-auto rounded-lg object-cover transition-all duration-300 shadow-lg shadow-black/50 cursor-pointer hover:scale-105 hover:shadow-2xl hover:shadow-black/70"
              loading="lazy"
              onClick={() => openModal(index)}
              role="button"
              aria-haspopup="dialog"
            />
          ))}
        </div>
      </section>
      
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 animate-fade-in"
          onClick={closeModal}
          aria-modal="true"
          role="dialog"
        >
          <button 
            onClick={(e) => { e.stopPropagation(); closeModal(); }} 
            className="absolute top-4 right-6 text-white text-5xl font-light hover:text-gray-300 transition-colors z-50"
            aria-label="Close"
          >
            &times;
          </button>
          
          <button 
            onClick={(e) => { e.stopPropagation(); showPrevImage(); }} 
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold bg-black/30 p-2 rounded-full hover:bg-black/60 transition-colors z-50 hidden md:block"
            aria-label="Previous image"
          >
            &#8249;
          </button>

          <div 
            className="relative flex items-center justify-center w-full h-full"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <img 
              src={GALLERY_IMAGES[currentImageIndex].src} 
              alt={GALLERY_IMAGES[currentImageIndex].alt}
              className="max-w-[90vw] max-h-[90vh] object-contain block select-none"
              onClick={(e) => e.stopPropagation()} 
            />
          </div>

          <button 
            onClick={(e) => { e.stopPropagation(); showNextImage(); }} 
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-5xl font-bold bg-black/30 p-2 rounded-full hover:bg-black/60 transition-colors z-50 hidden md:block"
            aria-label="Next image"
          >
            &#8250;
          </button>
        </div>
      )}
    </>
  );
};

export default GallerySection;