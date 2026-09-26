// components/cart/CartDropdown.tsx
'use client';

import NavigationLink from '@/components/layout/NavigationLink';
import Image from 'next/image';
import { X, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { formatNaira } from '@/lib/products';

export default function CartDropdown({ onClose }: { onClose: () => void }) {
  const { items, removeItem, subtotal } = useCart();

  return (
    <div className="absolute right-0 top-full z-50 mt-2 w-[90vw] max-w-sm rounded-2xl border border-primary-100 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-primary-100 px-4 py-3">
        <h3 className="font-heading text-sm font-semibold text-gray-900">
          Your Cart {items.length > 0 && `(${items.length})`}
        </h3>
        <button onClick={onClose} className="rounded-full p-1 text-gray-400 hover:bg-primary-50 hover:text-primary-600">
          <X size={18} />
        </button>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center gap-2 px-4 py-10 text-center">
          <ShoppingBag size={28} className="text-primary-200" />
          <p className="text-sm text-gray-500">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="max-h-80 overflow-y-auto px-4 py-2">
            {items.map((item) => (
              <div key={item.cartItemId} className="flex items-center gap-3 border-b border-primary-50 py-3 last:border-0">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-primary-50">
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
                  {item.variants && (
                    <p className="text-xs text-gray-400">
                      {Object.values(item.variants).join(' · ')}
                    </p>
                  )}
                  <p className="mt-0.5 text-xs text-gray-500">
                    Qty {item.quantity} × {formatNaira(item.price)}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.cartItemId)}
                  className="shrink-0 rounded-full p-1.5 text-gray-300 hover:bg-red-50 hover:text-red-500"
                  aria-label={`Remove ${item.name}`}
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div className="border-t border-primary-100 px-4 py-4">
            <div className="flex items-center justify-between text-sm font-semibold text-gray-800">
              <span>Subtotal</span>
              <span className="text-primary-600">{formatNaira(subtotal)}</span>
            </div>
            <NavigationLink
              href="/cart"
              onClick={onClose}
              className="mt-3 block w-full rounded-full border border-primary-200 py-2.5 text-center text-sm font-semibold text-primary-600 hover:bg-primary-50"
            >
              View Cart
            </NavigationLink>
            <NavigationLink
              href="/checkout"
              onClick={onClose}
              className="mt-2 block w-full rounded-full bg-primary-600 py-2.5 text-center text-sm font-semibold text-white hover:bg-primary-700"
            >
              Checkout
            </NavigationLink>
          </div>
        </>
      )}
    </div>
  );
}