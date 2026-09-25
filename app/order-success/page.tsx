// app/order-success/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Download, Printer } from 'lucide-react';
import OrderReceipt from '@/app/checkout/OrderReceipt';

type OrderData = {
  orderId: number;
  orderNumber: string;
  status: string;
  dateCreated: string;
  total: string;
  billing: { first_name: string; last_name: string; email: string; phone: string; address_1: string; city: string; state: string };
  lineItems: { name: string; quantity: number; total: string }[];
};

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      setError('No order found.');
      setIsLoading(false);
      return;
    }

    fetch(`/api/orders/${orderId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Order not found');
        return res.json();
      })
      .then((data) => setOrder(data))
      .catch(() => setError('Could not load your order details.'))
      .finally(() => setIsLoading(false));
  }, [orderId]);

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="text-gray-500">Loading your receipt...</p>
      </section>
    );
  }

  if (error || !order) {
    return (
      <section className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <p className="text-gray-500">{error || 'Something went wrong.'}</p>
        <Link href="/category/all" className="mt-6 inline-block rounded-full bg-primary-600 px-8 py-3 text-sm font-semibold text-white hover:bg-primary-700">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="flex flex-col items-center text-center print:hidden">
        <CheckCircle2 size={56} className="text-primary-500" />
        <h1 className="mt-6 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
          Thank You for Shopping{order.billing.first_name ? `, ${order.billing.first_name}` : ''}!
        </h1>
        <p className="mt-3 text-gray-600">
          We've received your order and receipt — we're verifying your payment and will confirm shortly.
        </p>
      </div>

      <div className="mt-8">
        <OrderReceipt order={order} />
      </div>

      <div className="mt-8 flex flex-col items-center gap-3 print:hidden sm:flex-row sm:justify-center">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 rounded-full border border-primary-200 px-6 py-2.5 text-sm font-semibold text-primary-600 hover:bg-primary-50"
        >
          <Download size={16} />
          Download / Print Receipt
        </button>
        <Link
          href="/category/all"
          className="rounded-full bg-primary-600 px-8 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Continue Shopping
        </Link>
      </div>
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