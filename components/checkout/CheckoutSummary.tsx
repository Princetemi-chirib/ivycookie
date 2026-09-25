// components/checkout/CheckoutSummary.tsx
'use client';

import Image from 'next/image';
import { useCart } from '@/lib/cart-context';
import { formatNaira } from '@/lib/products';

export default function CheckoutSummary() {
  const { items, subtotal } = useCart();

  return (
    <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6">
      <h3 className="font-heading text-lg font-semibold text-gray-900">Order Summary</h3>

      <div className="mt-4 max-h-64 space-y-3 overflow-y-auto pr-1">
        {items.map((item) => (
          <div key={item.cartItemId} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white">
              <Image src={item.image} alt={item.name} fill className="object-cover" sizes="48px" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-gray-800">{item.name}</p>
              <p className="text-xs text-gray-500">Qty {item.quantity}</p>
            </div>
            <span className="shrink-0 text-sm font-semibold text-primary-600">
              {formatNaira(item.price * item.quantity)}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-2 border-t border-primary-200 pt-4 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal</span>
          <span>{formatNaira(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-gray-400">Calculated after order</span>
        </div>
      </div>

      <div className="mt-3 flex justify-between border-t border-primary-200 pt-3 text-base font-semibold text-gray-900">
        <span>Total</span>
        <span className="text-primary-600">{formatNaira(subtotal)}</span>
      </div>
    </div>
  );
}