// components/products/ProductGallery.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-primary-50">
        <Image
          src={images[activeIndex]}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 50vw, 100vw"
          priority
        />
      </div>

      {images.length > 1 && (
        <div className="mt-4 flex gap-3">
          {images.map((img, i) => (
            <button
              key={img + i}
              onClick={() => setActiveIndex(i)}
              className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                activeIndex === i ? 'ring-primary-500' : 'ring-transparent hover:ring-primary-200'
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="64px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}