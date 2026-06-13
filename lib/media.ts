/**
 * Media Service with Smart Fallback
 * 
 * Fetches media from Supabase with automatic fallback to local data URLs.
 * Includes caching to minimize DB queries.
 */

import { supabase } from '@/lib/supabase/client';
import { getFallbackMedia, FallbackMedia } from '@/lib/fallback-media';

export interface MediaDisplayOptions {
  type: 'logo' | 'product' | 'division' | 'marketing' | 'hero';
  key: string;
  index?: number;
  useFallback?: boolean;
}

interface MediaCache {
  [key: string]: MediaData;
}

export interface MediaData {
  id: string;
  dataUrl: string;
  mimeType: string;
  altText: string;
  urlFallback?: string;
  source: 'db' | 'fallback';
}

// In-memory cache for media
let mediaCache: MediaCache = {};

/**
 * Convert BYTEA to data URL
 */
function bytestoDataUrl(bytes: Uint8Array, mimeType: string): string {
  const base64 = Buffer.from(bytes).toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

/**
 * Get company logo with fallback
 */
export async function getCompanyLogo(
  logoType: 'primary' | 'secondary' | 'favicon' = 'primary',
  options?: { skipCache?: boolean }
): Promise<MediaData> {
  const cacheKey = `logo-${logoType}`;

  // Check cache
  if (mediaCache[cacheKey] && !options?.skipCache) {
    return mediaCache[cacheKey];
  }

  try {
    // Try to fetch from DB
    const { data, error } = await supabase
      .from('company_logos')
      .select('media:media_id(*)')
      .eq('logo_type', logoType)
      .eq('is_current', true)
      .single();

    if (data?.media && !error) {
      const media = data.media;
      const mediaData: MediaData = {
        id: media.id,
        dataUrl: bytestoDataUrl(new Uint8Array(media.file_data), media.mime_type),
        mimeType: media.mime_type,
        altText: media.alt_text || `Zigma ${logoType} logo`,
        urlFallback: media.url_fallback,
        source: 'db',
      };
      mediaCache[cacheKey] = mediaData;
      return mediaData;
    }
  } catch (error) {
    console.warn(`Failed to fetch logo from DB: ${error}`);
  }

  // Fallback to local data
  const fallback = getFallbackMedia('logo', logoType);
  const fallbackData: MediaData = {
    id: fallback?.id || `logo-${logoType}-fallback`,
    dataUrl: fallback?.dataUrl || '',
    mimeType: fallback?.mimeType || 'image/png',
    altText: fallback?.altText || `Zigma ${logoType} logo`,
    urlFallback: fallback?.urlFallback,
    source: 'fallback',
  };

  mediaCache[cacheKey] = fallbackData;
  return fallbackData;
}

/**
 * Get hero media with fallback
 */
export async function getHeroMedia(
  sectionKey: string,
  options?: { skipCache?: boolean }
): Promise<MediaData> {
  const cacheKey = `hero-${sectionKey}`;

  if (mediaCache[cacheKey] && !options?.skipCache) {
    return mediaCache[cacheKey];
  }

  try {
    const { data, error } = await supabase
      .from('marketing_media')
      .select('media:media_id(*)')
      .eq('section_key', sectionKey)
      .order('display_order')
      .limit(1)
      .single();

    if (data?.media && !error) {
      const media = data.media;
      const mediaData: MediaData = {
        id: media.id,
        dataUrl: bytestoDataUrl(new Uint8Array(media.file_data), media.mime_type),
        mimeType: media.mime_type,
        altText: media.alt_text || sectionKey,
        urlFallback: media.url_fallback,
        source: 'db',
      };
      mediaCache[cacheKey] = mediaData;
      return mediaData;
    }
  } catch (error) {
    console.warn(`Failed to fetch hero media from DB: ${error}`);
  }

  // Fallback
  const fallback = getFallbackMedia('hero', sectionKey);
  const fallbackData: MediaData = {
    id: fallback?.id || `hero-${sectionKey}-fallback`,
    dataUrl: fallback?.dataUrl || '',
    mimeType: fallback?.mimeType || 'image/jpeg',
    altText: fallback?.altText || sectionKey,
    source: 'fallback',
  };

  mediaCache[cacheKey] = fallbackData;
  return fallbackData;
}

/**
 * Get division media with fallback
 */
export async function getDivisionMedia(
  verticalSlug: string,
  position: 'hero' | 'sidebar' | 'card' | 'banner' = 'hero',
  options?: { skipCache?: boolean }
): Promise<MediaData[]> {
  const cacheKey = `division-${verticalSlug}-${position}`;

  if (mediaCache[cacheKey] && !options?.skipCache) {
    return Array.isArray(mediaCache[cacheKey])
      ? (mediaCache[cacheKey] as unknown as MediaData[])
      : [mediaCache[cacheKey] as MediaData];
  }

  try {
    // Get vertical ID
    const { data: vertical } = await supabase
      .from('verticals')
      .select('id')
      .eq('slug', verticalSlug)
      .single();

    if (!vertical) throw new Error('Vertical not found');

    // Get division media
    const { data, error } = await supabase
      .from('division_media')
      .select('media:media_id(*)')
      .eq('vertical_id', vertical.id)
      .eq('media_position', position)
      .order('display_order');

    if (data && !error && data.length > 0) {
      const mediaList = data.map((item: any) => {
        const media = item.media;
        return {
          id: media.id,
          dataUrl: bytestoDataUrl(new Uint8Array(media.file_data), media.mime_type),
          mimeType: media.mime_type,
          altText: media.alt_text || verticalSlug,
          urlFallback: media.url_fallback,
          source: 'db' as const,
        };
      });
      return mediaList;
    }
  } catch (error) {
    console.warn(`Failed to fetch division media from DB: ${error}`);
  }

  // Fallback
  const fallback = getFallbackMedia('division', verticalSlug);
  return fallback
    ? [
        {
          id: fallback.id,
          dataUrl: fallback.dataUrl,
          mimeType: fallback.mimeType,
          altText: fallback.altText,
          source: 'fallback' as const,
        },
      ]
    : [];
}

/**
 * Get product images with fallback
 */
export async function getProductImages(
  productSlug: string,
  options?: { skipCache?: boolean; featured?: boolean }
): Promise<MediaData[]> {
  const cacheKey = `product-${productSlug}-${options?.featured ? 'featured' : 'all'}`;

  if (mediaCache[cacheKey] && !options?.skipCache) {
    return Array.isArray(mediaCache[cacheKey])
      ? (mediaCache[cacheKey] as unknown as MediaData[])
      : [mediaCache[cacheKey] as MediaData];
  }

  try {
    // Get product ID
    const { data: product } = await supabase
      .from('products')
      .select('id')
      .eq('slug', productSlug)
      .single();

    if (!product) throw new Error('Product not found');

    // Build query
    let query = supabase
      .from('product_images')
      .select('media:media_id(*)')
      .eq('product_id', product.id);

    if (options?.featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query.order('display_order');

    if (data && !error && data.length > 0) {
      const mediaList = data.map((item: any) => {
        const media = item.media;
        return {
          id: media.id,
          dataUrl: bytestoDataUrl(new Uint8Array(media.file_data), media.mime_type),
          mimeType: media.mime_type,
          altText: media.alt_text || productSlug,
          urlFallback: media.url_fallback,
          source: 'db' as const,
        };
      });
      return mediaList;
    }
  } catch (error) {
    console.warn(`Failed to fetch product images from DB: ${error}`);
  }

  // Fallback
  const fallback = getFallbackMedia('product', productSlug);
  return fallback
    ? [
        {
          id: fallback.id,
          dataUrl: fallback.dataUrl,
          mimeType: fallback.mimeType,
          altText: fallback.altText,
          source: 'fallback' as const,
        },
      ]
    : [];
}

/**
 * Clear media cache
 */
export function clearMediaCache(): void {
  mediaCache = {};
}

/**
 * Preload media for better performance
 */
export async function preloadMedia(keys: string[]): Promise<void> {
  const promises = keys.map(key => {
    const [type, ...rest] = key.split(':');
    const id = rest.join(':');

    switch (type) {
      case 'logo':
        return getCompanyLogo(id as any);
      case 'hero':
        return getHeroMedia(id);
      case 'division':
        return getDivisionMedia(id);
      case 'product':
        return getProductImages(id);
      default:
        return Promise.resolve(null);
    }
  });

  await Promise.allSettled(promises);
}
