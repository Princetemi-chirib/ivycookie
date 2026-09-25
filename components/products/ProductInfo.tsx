// components/products/ProductInfo.tsx
'use client';

import { useState, useMemo } from 'react';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import { Product } from '@/types/product';
import { formatNaira } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

export default function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants?.forEach((v) => {
      initial[v.type] = v.options[0];
    });
    return initial;
  });
  const [quantity, setQuantity] = useState(1);

  const matchedVariation = useMemo(() => {
    if (!product.variations) return undefined;
    return product.variations.find((v) =>
      Object.entries(selectedVariants).every(([key, value]) => v.attributes[key] === value)
    );
  }, [product.variations, selectedVariants]);

  const displayPrice = matchedVariation?.price ?? product.price;
  const displayCompareAt = matchedVariation?.compareAtPrice ?? product.compareAtPrice;
  const displayImage = matchedVariation?.image ?? product.image;
  const isOutOfStock = product.variations
    ? !matchedVariation
    : !product.inStock;

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      variationId: matchedVariation?.variationId,
      slug: product.slug,
      name: product.name,
      image: displayImage,
      price: displayPrice,
      quantity,
      variants: Object.keys(selectedVariants).length > 0 ? selectedVariants : undefined,
    });
  };

  return (
    <div>
      {product.badge && (
        <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-xs font-semibold text-primary-600">
          {product.badge}
        </span>
      )}

      <h1 className="mt-3 font-heading text-2xl font-bold text-gray-900 sm:text-3xl">{product.name}</h1>

      <div className="mt-3 flex items-baseline gap-3">
        <span className="text-2xl font-semibold text-primary-600">{formatNaira(displayPrice)}</span>
        {displayCompareAt && (
          <span className="text-base text-gray-400 line-through">{formatNaira(displayCompareAt)}</span>
        )}
      </div>

      {product.description && (
        <p className="mt-4 text-sm leading-relaxed text-gray-600">{product.description}</p>
      )}

      {product.variants?.map((variant) => (
        <div key={variant.type} className="mt-6">
          <h3 className="text-sm font-semibold text-gray-800">{variant.type}</h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selectedVariants[variant.type] === option;
              return (
                <button
                  key={option}
                  onClick={() => setSelectedVariants((prev) => ({ ...prev, [variant.type]: option }))}
                  className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                    isSelected
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-primary-200 bg-white text-gray-700 hover:border-primary-400'
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mt-6">
        <h3 className="text-sm font-semibold text-gray-800">Quantity</h3>
        <div className="mt-2 inline-flex items-center rounded-full border border-primary-200">
          <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="flex h-10 w-10 items-center justify-center rounded-full text-primary-600 hover:bg-primary-50" aria-label="Decrease quantity">
            <Minus size={16} />
          </button>
          <span className="w-10 text-center text-sm font-semibold">{quantity}</span>
          <button onClick={() => setQuantity((q) => q + 1)} className="flex h-10 w-10 items-center justify-center rounded-full text-primary-600 hover:bg-primary-50" aria-label="Increase quantity">
            <Plus size={16} />
          </button>
        </div>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={isOutOfStock}
        className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-200 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ShoppingBag size={18} />
        {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
      </button>

      <p className="mt-4 text-center text-xs text-gray-500">
        📦 Ships in discreet packaging · 🔒 Secure checkout
      </p>
    </div>
  );
}