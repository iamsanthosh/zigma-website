'use client';

import { useEffect, useState } from 'react';
import { getHeroMedia, getCompanyLogo, MediaData } from '@/lib/media';
import { MediaDisplay, LogoDisplay } from '@/components/MediaDisplay';
import { useLabel } from '@/lib/LabelProvider';
import { ChevronRight } from 'lucide-react';

export function HeroWithMedia() {
  const [heroMedia, setHeroMedia] = useState<MediaData | null>(null);
  const [logoData, setLogoData] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);

  const {
    getLabel,
    labels: { 'home.hero.eyebrow': eyebrow, 'home.hero.title': title, 'home.hero.subtitle': subtitle },
  } = useLabel();

  useEffect(() => {
    async function loadMedia() {
      try {
        // Load hero image
        const hero = await getHeroMedia('home.hero');
        setHeroMedia(hero);

        // Load primary logo
        const logo = await getCompanyLogo('primary');
        setLogoData(logo);
      } catch (error) {
        console.error('Failed to load hero media:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-navy via-steel-blue to-dark-gray overflow-hidden">
      {/* Background media with opacity */}
      {heroMedia && (
        <div className="absolute inset-0 opacity-20">
          <MediaDisplay
            media={heroMedia}
            alt="Hero Background"
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
      )}

      {/* Content overlay */}
      <div className="relative z-10 max-w-6xl mx-auto px-gutter py-20 min-h-screen flex flex-col justify-center">
        {/* Logo */}
        {logoData && (
          <div className="mb-12">
            <LogoDisplay media={logoData} maxWidth={200} maxHeight={70} className="drop-shadow-lg" />
          </div>
        )}

        {/* Hero Text */}
        <div className="mb-12">
          {eyebrow && (
            <p className="text-amber font-semibold tracking-wide uppercase text-sm mb-4">
              {eyebrow}
            </p>
          )}

          {title && (
            <h1 className="text-display-xl font-bold text-white mb-6 leading-tight max-w-3xl">
              {title}
            </h1>
          )}

          {subtitle && (
            <p className="text-xl text-gray-100 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mt-8">
          <button className="flex items-center gap-2 px-8 py-4 bg-amber text-navy font-semibold rounded hover:shadow-lg transition duration-300 transform hover:scale-105">
            {getLabel('home.hero.cta_primary', 'Explore Solutions')}
            <ChevronRight className="w-4 h-4" />
          </button>

          <button className="flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-white text-white font-semibold rounded hover:bg-white hover:text-navy transition duration-300">
            {getLabel('home.hero.cta_secondary', 'Talk to an Expert')}
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
