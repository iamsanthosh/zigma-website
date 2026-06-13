'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { MediaData } from '@/lib/media';

interface MediaDisplayProps {
  media: MediaData | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  objectFit?: 'cover' | 'contain' | 'fill' | 'scale-down';
  priority?: boolean;
  fallbackBg?: string;
}

/**
 * Smart media display component that renders blob data from DB or fallback
 */
export function MediaDisplay({
  media,
  alt,
  className = '',
  width,
  height,
  objectFit = 'cover',
  priority = false,
  fallbackBg = 'bg-gray-200',
}: MediaDisplayProps) {
  const [imageError, setImageError] = useState(false);

  if (!media) {
    return (
      <div
        className={`flex items-center justify-center ${fallbackBg} ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">No image available</span>
      </div>
    );
  }

  // Try data URL first, then fallback URL
  const src = media.dataUrl || media.urlFallback;

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center ${fallbackBg} ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400">Image not available</span>
      </div>
    );
  }

  const isDataUrl = src.startsWith('data:');

  return (
    <div className={className} style={{ width, height, position: 'relative' }}>
      {isDataUrl ? (
        // For data URLs, use standard img tag
        <img
          src={src}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit,
          }}
          onError={() => setImageError(true)}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        // For external URLs, use Next.js Image
        <Image
          src={src}
          alt={alt}
          fill
          style={{
            objectFit,
          }}
          priority={priority}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      )}

      {imageError && (
        <div
          className={`absolute inset-0 flex items-center justify-center ${fallbackBg}`}
        >
          <span className="text-gray-400">Failed to load image</span>
        </div>
      )}
    </div>
  );
}

/**
 * Gallery component for multiple media items
 */
interface MediaGalleryProps {
  media: MediaData[] | null;
  alt?: string;
  columns?: number;
  className?: string;
  itemClassName?: string;
}

export function MediaGallery({
  media,
  alt = 'Gallery item',
  columns = 3,
  className = '',
  itemClassName = '',
}: MediaGalleryProps) {
  if (!media || media.length === 0) {
    return (
      <div className={`text-center text-gray-400 py-8 ${className}`}>
        No images available
      </div>
    );
  }

  return (
    <div
      className={`grid gap-4 ${className}`}
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${100 / columns}%, 1fr))`,
      }}
    >
      {media.map((item, idx) => (
        <div key={item.id} className={`aspect-square overflow-hidden rounded-lg ${itemClassName}`}>
          <MediaDisplay
            media={item}
            alt={`${alt} ${idx + 1}`}
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
      ))}
    </div>
  );
}

/**
 * Inline logo component (for headers, footers)
 */
interface LogoDisplayProps {
  media: MediaData | null;
  className?: string;
  maxWidth?: number;
  maxHeight?: number;
}

export function LogoDisplay({ media, className = '', maxWidth = 200, maxHeight = 60 }: LogoDisplayProps) {
  return (
    <div className={`inline-block ${className}`}>
      <img
        src={media?.dataUrl || media?.urlFallback || ''}
        alt={media?.altText || 'Logo'}
        style={{
          maxWidth: `${maxWidth}px`,
          maxHeight: `${maxHeight}px`,
          height: 'auto',
          width: 'auto',
        }}
      />
    </div>
  );
}
