/**
 * Fallback Media System
 * 
 * This provides complete media fallback when Supabase is unavailable.
 * All media is stored as base64-encoded data URLs for immediate rendering.
 * 
 * When DB is connected, this is overridden by actual blob data from media tables.
 */

export interface FallbackMedia {
  id: string;
  name: string;
  type: 'logo' | 'product' | 'banner' | 'division' | 'marketing' | 'hero';
  mimeType: string;
  dataUrl: string; // Base64 encoded data URL
  altText: string;
  urlFallback?: string;
}

export interface FallbackMediaLibrary {
  logos: Record<string, FallbackMedia>;
  products: Record<string, FallbackMedia[]>;
  divisions: Record<string, FallbackMedia[]>;
  marketing: Record<string, FallbackMedia[]>;
  industries: Record<string, FallbackMedia[]>;
  caseStudies: Record<string, FallbackMedia[]>;
}

/**
 * Company Logo Fallbacks
 * Replace these with actual base64-encoded logos or external URLs
 */
export const FALLBACK_COMPANY_LOGOS: Record<string, FallbackMedia> = {
  primary: {
    id: 'logo-primary-1',
    name: 'zigma-logo-primary',
    type: 'logo',
    mimeType: 'image/png',
    dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 60"%3E%3Crect fill="%23001a4d" width="200" height="60"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="24" font-weight="bold" font-family="Arial"%3EZIGMA%3C/text%3E%3C/svg%3E',
    altText: 'Zigma Technologies Logo',
    urlFallback: 'https://catalog.wlimg.com/1/16017171/other-images/12585-comp-image.png',
  },
  secondary: {
    id: 'logo-secondary-1',
    name: 'zigma-logo-secondary',
    type: 'logo',
    mimeType: 'image/svg+xml',
    dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="50" cy="50" r="45" fill="%23E8A33D" stroke="%23001a4d" stroke-width="2"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23001a4d" font-size="48" font-weight="bold" font-family="Arial"%3EZ%3C/text%3E%3C/svg%3E',
    altText: 'Zigma Technologies Secondary Logo',
  },
  favicon: {
    id: 'logo-favicon-1',
    name: 'zigma-favicon',
    type: 'logo',
    mimeType: 'image/svg+xml',
    dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"%3E%3Crect fill="%23001a4d" width="64" height="64"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23E8A33D" font-size="40" font-weight="bold" font-family="Arial"%3EZ%3C/text%3E%3C/svg%3E',
    altText: 'Zigma Favicon',
  },
};

/**
 * Hero Banner Images
 */
export const FALLBACK_HERO_MEDIA: Record<string, FallbackMedia> = {
  'home.hero': {
    id: 'hero-home-1',
    name: 'hero-home-main',
    type: 'hero',
    mimeType: 'image/jpeg',
    dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 600"%3E%3CdEfs%3E%3ClinearGradient id="grad1" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23001a4d;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%232d5aa3;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad1)" width="1920" height="600"/%3E%3Ctext x="50%25" y="40%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="48" font-weight="bold" font-family="Arial"%3EPowering Industry%3C/text%3E%3Ctext x="50%25" y="60%25" dominant-baseline="middle" text-anchor="middle" fill="%23E8A33D" font-size="32" font-family="Arial"%3ESecuring Infrastructure. Driving the Energy Transition.%3C/text%3E%3C/svg%3E',
    altText: 'Zigma Technologies - Powering Industry',
    urlFallback: 'https://www.zigmatechnologies.in/hero-banner.jpg',
  },
};

/**
 * Division/Vertical Media
 */
export const FALLBACK_DIVISION_MEDIA: Record<string, FallbackMedia[]> = {
  'enterprise-technology': [
    {
      id: 'div-ent-hero-1',
      name: 'enterprise-tech-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%231E5C8C" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3EEnterprise Technology Solutions%3C/text%3E%3Crect x="100" y="200" width="300" height="150" fill="%23E8A33D" opacity="0.3"/%3E%3Crect x="450" y="200" width="300" height="150" fill="%23E8A33D" opacity="0.3"/%3E%3Crect x="800" y="200" width="300" height="150" fill="%23E8A33D" opacity="0.3"/%3E%3C/svg%3E',
      altText: 'Enterprise Technology Solutions Banner',
    },
  ],
  'industrial-automation': [
    {
      id: 'div-auto-hero-1',
      name: 'industrial-automation-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%230A2A4A" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3EIndustrial Automation%3C/text%3E%3Ccircle cx="300" cy="250" r="50" fill="%23E8A33D" opacity="0.3"/%3E%3Ccircle cx="600" cy="250" r="50" fill="%23E8A33D" opacity="0.3"/%3E%3Ccircle cx="900" cy="250" r="50" fill="%23E8A33D" opacity="0.3"/%3E%3C/svg%3E',
      altText: 'Industrial Automation Banner',
    },
  ],
  'ups-solutions': [
    {
      id: 'div-ups-hero-1',
      name: 'ups-solutions-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%233E7CB1" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3EUPS Solutions%3C/text%3E%3Cpath d="M 300 150 Q 600 250 900 150" stroke="%23E8A33D" stroke-width="4" fill="none" opacity="0.6"/%3E%3C/svg%3E',
      altText: 'UPS Solutions Banner',
    },
  ],
  'security-solutions': [
    {
      id: 'div-sec-hero-1',
      name: 'security-solutions-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%2313202E" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3ESecurity Solutions%3C/text%3E%3Crect x="200" y="150" width="800" height="200" fill="none" stroke="%23E8A33D" stroke-width="3" opacity="0.6"/%3E%3C/svg%3E',
      altText: 'Security Solutions Banner',
    },
  ],
  'software-managed-services': [
    {
      id: 'div-soft-hero-1',
      name: 'software-services-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%231E5C8C" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3ESoftware %26 Managed Services%3C/text%3E%3C/svg%3E',
      altText: 'Software & Managed Services Banner',
    },
  ],
  'solar-energy': [
    {
      id: 'div-solar-hero-1',
      name: 'solar-energy-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%23E8A33D" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%23001a4d" font-size="36" font-weight="bold" font-family="Arial"%3ESolar Energy Solutions%3C/text%3E%3Ccircle cx="600" cy="250" r="80" fill="%23FFD700" opacity="0.6"/%3E%3C/svg%3E',
      altText: 'Solar Energy Solutions Banner',
    },
  ],
  'annual-maintenance': [
    {
      id: 'div-amc-hero-1',
      name: 'amc-hero',
      type: 'division',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 400"%3E%3Crect fill="%230A2A4A" width="1200" height="400"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="36" font-weight="bold" font-family="Arial"%3EAnnual Maintenance Services%3C/text%3E%3C/svg%3E',
      altText: 'Annual Maintenance Services Banner',
    },
  ],
};

/**
 * Product Image Placeholders
 */
export const FALLBACK_PRODUCT_MEDIA: Record<string, FallbackMedia[]> = {
  'enterprise-network-infrastructure': [
    {
      id: 'prod-ent-net-1',
      name: 'network-switch',
      type: 'product',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Crect x="80" y="60" width="240" height="180" fill="%23333" stroke="%23666" stroke-width="2"/%3E%3Ccircle cx="120" cy="100" r="8" fill="%2300ff00"/%3E%3Ccircle cx="160" cy="100" r="8" fill="%2300ff00"/%3E%3Ccircle cx="200" cy="100" r="8" fill="%2300ff00"/%3E%3Ccircle cx="240" cy="100" r="8" fill="%2300ff00"/%3E%3Ccircle cx="280" cy="100" r="8" fill="%2300ff00"/%3E%3Ctext x="50%25" y="250" dominant-baseline="middle" text-anchor="middle" fill="%23333" font-size="16" font-family="Arial"%3EEnterprise Network Switch%3C/text%3E%3C/svg%3E',
      altText: 'Enterprise Network Infrastructure',
    },
  ],
  'plc-scada-automation': [
    {
      id: 'prod-plc-1',
      name: 'plc-system',
      type: 'product',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Crect x="100" y="80" width="200" height="140" fill="%23001a4d" stroke="%23333" stroke-width="2"/%3E%3Crect x="110" y="90" width="180" height="80" fill="%23e0e0e0"/%3E%3Ctext x="50%25" y="190" dominant-baseline="middle" text-anchor="middle" fill="%23666" font-size="12" font-family="Arial"%3EPLC Terminal%3C/text%3E%3Ccircle cx="130" cy="230" r="5" fill="%2300ff00"/%3E%3Ccircle cx="170" cy="230" r="5" fill="%23ff0000"/%3E%3Ccircle cx="210" cy="230" r="5" fill="%23ffff00"/%3E%3Ctext x="50%25" y="270" dominant-baseline="middle" text-anchor="middle" fill="%23333" font-size="16" font-family="Arial"%3EPLC %26 SCADA Systems%3C/text%3E%3C/svg%3E',
      altText: 'PLC & SCADA Automation',
    },
  ],
  'online-ups-systems': [
    {
      id: 'prod-ups-1',
      name: 'ups-unit',
      type: 'product',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23f5f5f5" width="400" height="300"/%3E%3Crect x="80" y="60" width="240" height="180" fill="%23444" stroke="%23333" stroke-width="2" rx="10"/%3E%3Crect x="100" y="80" width="160" height="40" fill="%23001a4d"/%3E%3Ctext x="180" y="100" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="20" font-weight="bold" font-family="Arial"%3EUPS%3C/text%3E%3Ccircle cx="130" cy="160" r="8" fill="%2300ff00"/%3E%3Ccircle cx="180" cy="160" r="8" fill="%2300ff00"/%3E%3Ccircle cx="230" cy="160" r="8" fill="%23ffff00"/%3E%3Ctext x="50%25" y="270" dominant-baseline="middle" text-anchor="middle" fill="%23333" font-size="16" font-family="Arial"%3EOnline UPS System%3C/text%3E%3C/svg%3E',
      altText: 'Online UPS System',
    },
  ],
  'rooftop-solar-residential': [
    {
      id: 'prod-solar-res-1',
      name: 'solar-panels',
      type: 'product',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%2387CEEB" width="400" height="200"/%3E%3Cpolygon points="100,150 200,50 300,150" fill="%23DAA520"/%3E%3Crect x="120" y="100" width="50" height="50" fill="%23003d7a" opacity="0.7"/%3E%3Crect x="180" y="100" width="50" height="50" fill="%23003d7a" opacity="0.7"/%3E%3Crect x="240" y="100" width="50" height="50" fill="%23003d7a" opacity="0.7"/%3E%3Crect fill="%23228B22" y="200" width="400" height="100"/%3E%3Ctext x="50%25" y="270" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="16" font-family="Arial"%3EResidential Solar System%3C/text%3E%3C/svg%3E',
      altText: 'Rooftop Solar System - Residential',
    },
  ],
};

/**
 * Marketing/Campaign Media
 */
export const FALLBACK_MARKETING_MEDIA: Record<string, FallbackMedia[]> = {
  'home.banner': [
    {
      id: 'marketing-home-1',
      name: 'home-marketing-banner',
      type: 'marketing',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"%3E%3CdEfs%3E%3ClinearGradient id="grad" x1="0%25" y1="0%25" x2="100%25" y2="100%25"%3E%3Cstop offset="0%25" style="stop-color:%23001a4d;stop-opacity:1" /%3E%3Cstop offset="100%25" style="stop-color:%23E8A33D;stop-opacity:1" /%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill="url(%23grad)" width="1200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="32" font-weight="bold" font-family="Arial"%3E20 Years of Engineering Excellence%3C/text%3E%3Ctext x="50%25" y="150%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="18" font-family="Arial"%3EAcross 7 Business Verticals%3C/text%3E%3C/svg%3E',
      altText: 'Zigma Technologies Marketing Banner',
    },
  ],
  'campaigns.new': [
    {
      id: 'marketing-campaign-1',
      name: 'campaign-banner-new',
      type: 'marketing',
      mimeType: 'image/svg+xml',
      dataUrl: 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 300"%3E%3Crect fill="%232d5aa3" width="1200" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="white" font-size="28" font-weight="bold" font-family="Arial"%3ENew Solutions Coming Soon%3C/text%3E%3Crect x="300" y="120" width="600" height="120" fill="%23E8A33D" opacity="0.2" rx="10"/%3E%3C/svg%3E',
      altText: 'New Campaign Banner',
    },
  ],
};

/**
 * Consolidate all fallback media
 */
export const FALLBACK_MEDIA_LIBRARY: FallbackMediaLibrary = {
  logos: FALLBACK_COMPANY_LOGOS,
  products: FALLBACK_PRODUCT_MEDIA,
  divisions: FALLBACK_DIVISION_MEDIA,
  marketing: FALLBACK_MARKETING_MEDIA,
  industries: {},
  caseStudies: {},
};

/**
 * Helper function to get fallback media by type and name
 */
export function getFallbackMedia(
  type: 'logo' | 'product' | 'division' | 'marketing' | 'hero',
  key: string,
  index: number = 0
): FallbackMedia | null {
  switch (type) {
    case 'logo':
      return FALLBACK_COMPANY_LOGOS[key] || null;
    case 'hero':
      return FALLBACK_HERO_MEDIA[key] || null;
    case 'product':
      const products = FALLBACK_PRODUCT_MEDIA[key];
      return products ? products[index] || products[0] : null;
    case 'division':
      const divisions = FALLBACK_DIVISION_MEDIA[key];
      return divisions ? divisions[index] || divisions[0] : null;
    case 'marketing':
      const marketing = FALLBACK_MARKETING_MEDIA[key];
      return marketing ? marketing[index] || marketing[0] : null;
    default:
      return null;
  }
}
