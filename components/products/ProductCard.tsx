// components/products/ProductCard.tsx
'use client';

import NavigationLink from '@/components/layout/NavigationLink';
import Image from 'next/image';
import { ShoppingBag } from 'lucide-react';
import { Product } from '@/types/product';
import { formatNaira } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

const badgeStyles: Record<string, string> = {
  Bestseller: 'bg-primary-600 text-white',
  New: 'bg-emerald-500 text-white',
  Sale: 'bg-rose-500 text-white',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // stop the parent <NavigationLink> from navigating
    e.stopPropagation();
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      image: product.image,
      price: product.price,
      quantity: 1,
    });
  };

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border border-primary-100 bg-white transition hover:shadow-lg hover:shadow-primary-100">
      <NavigationLink href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-primary-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
        />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[11px] font-semibold ${badgeStyles[product.badge]}`}>
            {product.badge}
          </span>
        )}
      </NavigationLink>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <NavigationLink href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 text-sm font-medium text-gray-800 group-hover:text-primary-600">
            {product.name}
          </h3>
        </NavigationLink>

        <div className="mt-auto flex items-center justify-between pt-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-primary-600">
              {formatNaira(product.price)}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-gray-400 line-through">
                {formatNaira(product.compareAtPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            aria-label={`Add ${product.name} to cart`}
            className="rounded-full bg-primary-50 p-2 text-primary-600 transition hover:bg-primary-600 hover:text-white"
          >
            <ShoppingBag size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}