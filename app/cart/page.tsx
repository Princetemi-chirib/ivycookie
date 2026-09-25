// app/cart/page.tsx
'use client';

import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import CartItem from '@/components/cart/CartItem';
import CartSummary from '@/components/cart/CartSummary';
import { useCart } from '@/lib/cart-context';

export default function CartPage() {
  const { items } = useCart();

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
        Your Cart
      </h1>

      {items.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <ShoppingBag size={40} className="text-primary-200" />
          <p className="text-gray-500">Your cart is empty.</p>
          <Link
            href="/category/all"
            className="rounded-full bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {items.map((item) => (
              <CartItem key={item.cartItemId} item={item} />
            ))}
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </section>
  );
}