/**
 * ============================================================================
 * IMAGE GALLERY COMPONENT (components/product/ImageGallery.jsx)
 * ============================================================================
 * Purpose:
 *   Displays product photography with an interactive thumbnail switcher.
 *   Shows Cloudinary CDN optimized images with high-resolution viewing.
 * ============================================================================
 */

import React from 'react';

export const ImageGallery = ({ images = [], activeIndex = 0, onSelectIndex, title = 'Product' }) => {
  // Ensure we have at least one fallback image if images array is empty
  const displayImages =
    images.length > 0
      ? images
      : [
          {
            url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800',
            alt: title,
          },
        ];

  const currentImage = displayImages[activeIndex] || displayImages[0];

  return (
    <div className="flex flex-col gap-4">
      {/* Main High-Resolution Photo Display */}
      <div className="w-full h-80 sm:h-96 md:h-[420px] rounded-3xl bg-white border border-slate-200/90 shadow-sm p-6 flex items-center justify-center overflow-hidden">
        <img
          src={currentImage.url}
          alt={currentImage.alt || title}
          className="max-h-full max-w-full object-contain transition-all duration-300 hover:scale-105"
        />
      </div>

      {/* Thumbnail Strip (if multiple images exist) */}
      {displayImages.length > 1 && (
        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
          {displayImages.map((img, idx) => {
            const isSelected = activeIndex === idx;

            return (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectIndex(idx)}
                aria-label={`View photo ${idx + 1}`}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white p-2 border transition-all flex-shrink-0 flex items-center justify-center overflow-hidden ${
                  isSelected
                    ? 'border-brand-600 ring-2 ring-brand-500/30 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 opacity-70 hover:opacity-100'
                }`}
              >
                <img
                  src={img.url}
                  alt={img.alt || `Thumbnail ${idx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
