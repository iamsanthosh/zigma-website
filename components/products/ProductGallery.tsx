'use client';

import { useEffect, useState } from 'react';
import { getProductImages, MediaData } from '@/lib/media';
import { MediaGallery, MediaDisplay } from '@/components/MediaDisplay';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductGalleryProps {
  productSlug: string;
  productName: string;
}

export function ProductGallery({ productSlug, productName }: ProductGalleryProps) {
  const [images, setImages] = useState<MediaData[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadImages() {
      try {
        const productImages = await getProductImages(productSlug);
        setImages(productImages);
      } catch (error) {
        console.error('Failed to load product images:', error);
      } finally {
        setLoading(false);
      }
    }

    loadImages();
  }, [productSlug]);

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-96 rounded-lg" />;
  }

  if (!images || images.length === 0) {
    return (
      <div className="bg-gray-100 h-96 rounded-lg flex items-center justify-center text-gray-400">
        No product images available
      </div>
    );
  }

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-6">
      {/* Main image carousel */}
      <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
        <MediaDisplay
          media={images[currentIndex]}
          alt={`${productName} - Image ${currentIndex + 1}`}
          className="w-full h-full"
          objectFit="cover"
          priority={currentIndex === 0}
        />

        {images.length > 1 && (
          <>
            {/* Previous button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6 text-navy" />
            </button>

            {/* Next button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 p-2 rounded-full shadow-md transition"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6 text-navy" />
            </button>

            {/* Counter */}
            <div className="absolute bottom-4 right-4 bg-navy bg-opacity-80 text-white px-3 py-1 rounded text-sm font-semibold">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}
      </div>

      {/* Thumbnail gallery */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {images.map((image, idx) => (
            <button
              key={image.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition ${
                idx === currentIndex ? 'ring-2 ring-amber' : 'opacity-60 hover:opacity-100'
              }`}
            >
              <MediaDisplay media={image} alt={`Thumbnail ${idx + 1}`} className="w-full h-full" objectFit="cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
