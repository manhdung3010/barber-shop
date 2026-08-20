import { useState, ImgHTMLAttributes } from 'react';

interface EditorialImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  aspectRatio?: '4/5' | '3/4' | '16/9' | '3/2' | '4/3' | '1/1' | 'auto';
  priority?: boolean;
  watermarkLabel?: string;
  className?: string;
  imageClassName?: string;
}

export default function EditorialImage({
  src,
  alt,
  aspectRatio = '4/5',
  priority = false,
  watermarkLabel,
  className = '',
  imageClassName = '',
  ...props
}: EditorialImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const aspectClass = {
    '4/5': 'aspect-[4/5]',
    '3/4': 'aspect-[3/4]',
    '16/9': 'aspect-[16/9]',
    '3/2': 'aspect-[3/2]',
    '4/3': 'aspect-[4/3]',
    '1/1': 'aspect-square',
    'auto': '',
  }[aspectRatio];

  return (
    <div className={`relative overflow-hidden bg-[#141413] ${aspectClass} ${className}`}>
      {/* Dark Shimmer Skeleton */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141413] via-[#1c1c1a] to-[#141413] animate-pulse" />
      )}

      {/* Fallback Display if image fails to load */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#141413] p-4 text-center border border-[rgba(244,240,232,0.08)]">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-1">
            {watermarkLabel || 'STUDIO WORK'}
          </span>
          <span className="text-[11px] text-[#A7A39B] uppercase tracking-wider line-clamp-2 max-w-[200px]">
            {alt}
          </span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } ${imageClassName}`}
          {...props}
        />
      )}
    </div>
  );
}
