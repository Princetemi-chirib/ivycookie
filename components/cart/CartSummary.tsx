// components/cart/CartSummary.tsx
'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { formatNaira } from '@/lib/products';

export default function CartSummary() {
  const { subtotal, totalCount } = useCart();

  return (
    <div className="rounded-2xl border border-primary-100 bg-primary-50/40 p-6">
      <h3 className="font-heading text-lg font-semibold text-gray-900">Order Summary</h3>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotal ({totalCount} {totalCount === 1 ? 'item' : 'items'})</span>
          <span>{formatNaira(subtotal)}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Delivery</span>
          <span className="text-gray-400">Calculated at checkout</span>
        </div>
      </div>

      <div className="mt-4 flex justify-between border-t border-primary-200 pt-4 text-base font-semibold text-gray-900">
        <span>Total</span>
        <span className="text-primary-600">{formatNaira(subtotal)}</span>
      </div>

      <Link
        href="/checkout"
        className="mt-6 block w-full rounded-full bg-primary-600 py-3.5 text-center text-sm font-semibold text-white shadow-md shadow-primary-200 hover:bg-primary-700"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}