// app/order-success/page.tsx
'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Clock } from 'lucide-react';
import { formatNaira } from '@/lib/products';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderNumber = searchParams.get('orderNumber');
  const amount = searchParams.get('amount');
  const name = searchParams.get('name');

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <Clock size={56} className="text-primary-500" />
      <h1 className="mt-6 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
        Order Received{name ? `, ${name.split(' ')[0]}` : ''}!
      </h1>
      <p className="mt-3 text-gray-600">
        We've received your order and receipt — we're verifying your payment and will confirm shortly.
      </p>

      <div className="mt-8 w-full rounded-2xl border border-primary-100 bg-primary-50/40 p-6 text-left">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Order Number</span>
          <span className="font-semibold text-gray-800">#{orderNumber || '—'}</span>
        </div>
        {amount && (
          <div className="mt-2 flex justify-between text-sm">
            <span className="text-gray-500">Order Total</span>
            <span className="font-semibold text-primary-600">{formatNaira(Number(amount))}</span>
          </div>
        )}
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold text-amber-600">Pending Verification</span>
        </div>
      </div>

      <p className="mt-6 text-sm text-gray-500">
        You'll get a confirmation email once your payment is verified.
      </p>

      <Link
        href="/category/all"
        className="mt-8 rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white hover:bg-primary-700"
      >
        Continue Shopping
      </Link>
    </section>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={null}>
      <OrderSuccessContent />
    </Suspense>
  );
}