'use client';

import { useEffect, useState } from 'react';
import { getDivisionMedia, MediaData } from '@/lib/media';
import { MediaDisplay } from '@/components/MediaDisplay';

interface VerticalHeroProps {
  verticalSlug: string;
  title: string;
  subtitle?: string;
  description?: string;
  actionButton?: {
    label: string;
    onClick?: () => void;
  };
}

export function VerticalHero({
  verticalSlug,
  title,
  subtitle,
  description,
  actionButton,
}: VerticalHeroProps) {
  const [heroMedia, setHeroMedia] = useState<MediaData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      try {
        const media = await getDivisionMedia(verticalSlug, 'hero');
        if (media.length > 0) {
          setHeroMedia(media[0]);
        }
      } catch (error) {
        console.error('Failed to load vertical media:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [verticalSlug]);

  return (
    <section className="relative min-h-96 bg-gradient-to-br from-navy to-steel-blue overflow-hidden">
      {/* Background media */}
      {heroMedia && (
        <div className="absolute inset-0 opacity-30">
          <MediaDisplay
            media={heroMedia}
            alt={`${title} Background`}
            className="w-full h-full"
            objectFit="cover"
          />
        </div>
      )}

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy via-transparent to-transparent opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-gutter py-16 md:py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 max-w-2xl leading-tight">
          {title}
        </h1>

        {subtitle && (
          <p className="text-xl text-amber font-semibold mb-6 tracking-wide">
            {subtitle}
          </p>
        )}

        {description && (
          <p className="text-lg text-gray-100 max-w-2xl mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {actionButton && (
          <button
            onClick={actionButton.onClick}
            className="px-8 py-3 bg-amber text-navy font-semibold rounded hover:shadow-lg transition duration-300 transform hover:scale-105"
          >
            {actionButton.label}
          </button>
        )}
      </div>
    </section>
  );
}

/**
 * Vertical with side media
 */
interface VerticalWithMediaProps {
  verticalSlug: string;
  title: string;
  content: React.ReactNode;
  position?: 'left' | 'right';
}

export function VerticalWithMedia({
  verticalSlug,
  title,
  content,
  position = 'right',
}: VerticalWithMediaProps) {
  const [media, setMedia] = useState<MediaData[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMedia() {
      try {
        const divisionMedia = await getDivisionMedia(verticalSlug, 'sidebar');
        setMedia(divisionMedia.length > 0 ? divisionMedia : null);
      } catch (error) {
        console.error('Failed to load sidebar media:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMedia();
  }, [verticalSlug]);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-gutter">
        <div
          className={`grid md:grid-cols-2 gap-12 items-center ${
            position === 'left' ? 'md:grid-flow-dense' : ''
          }`}
        >
          {/* Text content */}
          <div className={position === 'left' ? 'md:col-start-2' : ''}>
            <h2 className="text-3xl md:text-4xl font-bold text-navy mb-6">{title}</h2>
            {content}
          </div>

          {/* Media */}
          {!loading && media && media.length > 0 && (
            <div className={`rounded-lg overflow-hidden shadow-lg ${position === 'left' ? 'md:col-start-1 md:row-start-1' : ''}`}>
              <MediaDisplay
                media={media[0]}
                alt={title}
                className="w-full aspect-square"
                objectFit="cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
