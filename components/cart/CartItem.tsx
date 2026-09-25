// components/cart/CartItem.tsx
'use client';

import Image from 'next/image';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '@/types/cart';
import { formatNaira } from '@/lib/products';
import { useCart } from '@/lib/cart-context';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 border-b border-primary-100 py-5 last:border-0">
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-primary-50">
        <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-medium text-gray-800 sm:text-base">{item.name}</h3>
            <button
              onClick={() => removeItem(item.cartItemId)}
              className="shrink-0 rounded-full p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"
              aria-label={`Remove ${item.name}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
          {item.variants && (
            <p className="mt-0.5 text-xs text-gray-400">
              {Object.entries(item.variants).map(([k, v]) => `${k}: ${v}`).join(' · ')}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="inline-flex items-center rounded-full border border-primary-200">
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-600 hover:bg-primary-50"
              aria-label="Decrease quantity"
            >
              <Minus size={14} />
            </button>
            <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-full text-primary-600 hover:bg-primary-50"
              aria-label="Increase quantity"
            >
              <Plus size={14} />
            </button>
          </div>

          <span className="text-sm font-semibold text-primary-600">
            {formatNaira(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}