import { StyleItem } from '../../../types/index.ts';
import EditorialImage from '../../ui/EditorialImage.tsx';

interface StyleCardProps {
  item: StyleItem;
}

export default function StyleCard({ item }: StyleCardProps) {
  const spanClass = {
    featured: 'col-span-12 md:col-span-7',
    wide: 'col-span-12 md:col-span-8',
    tall: 'col-span-12 md:col-span-5',
    standard: 'col-span-12 md:col-span-5 lg:col-span-4',
  }[item.layoutVariant || 'standard'];

  return (
    <div className={`group relative rounded-[24px] sm:rounded-[32px] overflow-hidden ${spanClass}`}>
      <EditorialImage
        src={item.image}
        alt={item.alt}
        aspectRatio={item.layoutVariant === 'featured' || item.layoutVariant === 'wide' ? '16/9' : '4/5'}
        watermarkLabel={item.category}
        imageClassName="group-hover:scale-104 transition-transform duration-500"
      />

      {/* Dark overlay & editorial hover caption */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-90 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 sm:p-8">
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C7A66A] mb-1">
          {item.category}
        </span>
        <h3 className="text-lg sm:text-xl font-bold uppercase tracking-wider text-[#F4F0E8]">
          {item.title}
        </h3>
        <p className="text-xs text-[#A7A39B] mt-1 line-clamp-2 max-w-md">
          {item.description}
        </p>
      </div>
    </div>
  );
}
