// components/home/CategoryBubble.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

type CategoryBubbleProps = {
  name: string;
  slug: string;
  image?: string;
  delay?: number;
};

const POP_DURATION = 480;

export default function CategoryBubble({ name, slug, image, delay = 0 }: CategoryBubbleProps) {
  const router = useRouter();
  const [isPopping, setIsPopping] = useState(false);

  const fragments = Array.from({ length: 10 }, (_, i) => {
    const angle = (i / 10) * Math.PI * 2;
    const distance = 60 + Math.random() * 40;
    return {
      tx: `${Math.cos(angle) * distance}px`,
      ty: `${Math.sin(angle) * distance}px`,
      size: 6 + Math.random() * 8,
    };
  });

  const handleClick = () => {
    if (isPopping) return;
    setIsPopping(true);
    setTimeout(() => {
      router.push(`/category/${slug}`);
    }, POP_DURATION - 80);
  };

  return (
    <button
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-3 focus:outline-none"
      aria-label={`Shop ${name}`}
    >
      <div
        className={`relative h-28 w-28 sm:h-32 sm:w-32 ${!isPopping ? 'animate-bubble-float' : ''}`}
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Bubble */}
        <div
          className={`relative h-full w-full overflow-hidden rounded-full shadow-lg shadow-primary-200/60 ring-1 ring-white/60 transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${
            isPopping ? 'animate-bubble-pop' : ''
          }`}
          style={{
            backgroundImage: image
              ? `url(${image})`
              : 'radial-gradient(circle at 32% 28%, #fbcfe8, #f472b6 55%, #db2777 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Glossy sheen */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-white/50 via-white/10 to-transparent" />
          {/* Highlight spot */}
          <div className="pointer-events-none absolute left-4 top-4 h-7 w-7 rounded-full bg-white/70 blur-[6px]" />
          {/* Rim shading */}
          <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_-6px_12px_rgba(0,0,0,0.12)]" />
        </div>

        {/* Fragments */}
        {isPopping &&
          fragments.map((f, i) => (
            <span
              key={i}
              className="animate-fragment absolute left-1/2 top-1/2 rounded-full bg-primary-300"
              style={{
                width: f.size,
                height: f.size,
                // @ts-expect-error custom CSS vars
                '--tx': f.tx,
                '--ty': f.ty,
              }}
            />
          ))}
      </div>

      <span className="text-center text-sm font-medium text-gray-700 group-hover:text-primary-600">
        {name}
      </span>
    </button>
  );
}