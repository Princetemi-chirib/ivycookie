// components/checkout/OrderReceipt.tsx
'use client';

import Image from 'next/image';
import { formatNaira } from '@/lib/products';

type OrderLineItem = { name: string; quantity: number; total: string };
type OrderBilling = { first_name: string; last_name: string; email: string; phone: string; address_1: string; city: string; state: string };

type OrderData = {
  orderId: number;
  orderNumber: string;
  status: string;
  dateCreated: string;
  total: string;
  billing: OrderBilling;
  lineItems: OrderLineItem[];
};

export default function OrderReceipt({ order }: { order: OrderData }) {
  const formattedDate = new Date(order.dateCreated).toLocaleDateString('en-NG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div id="receipt" className="mx-auto max-w-lg rounded-2xl border border-primary-100 bg-white p-8 print:border-0 print:shadow-none">
      {/* Logo */}
      <div className="flex justify-center">
        <Image src="/ivylogo.png" alt="Ivy Cookiecare" width={140} height={56} className="h-12 w-auto" />
      </div>

      <div className="mt-6 text-center">
        <h2 className="font-heading text-xl font-bold text-primary-600">Order Receipt</h2>
        <p className="mt-1 text-sm text-gray-500">Thank you for shopping with us!</p>
      </div>

      <div className="mt-6 space-y-1.5 border-y border-dashed border-primary-200 py-4 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-500">Order Number</span>
          <span className="font-semibold text-gray-800">#{order.orderNumber}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Date</span>
          <span className="font-semibold text-gray-800">{formattedDate}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Status</span>
          <span className="font-semibold capitalize text-amber-600">{order.status.replace('-', ' ')}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Customer</span>
          <span className="font-semibold text-gray-800">
            {order.billing.first_name} {order.billing.last_name}
          </span>
        </div>
      </div>

      {/* Items */}
      <div className="mt-4 space-y-3">
        {order.lineItems.map((item, i) => (
          <div key={i} className="flex justify-between text-sm">
            <span className="text-gray-700">
              {item.name} <span className="text-gray-400">× {item.quantity}</span>
            </span>
            <span className="font-medium text-gray-800">{formatNaira(Number(item.total))}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex justify-between border-t border-primary-200 pt-4 text-base font-bold">
        <span className="text-gray-900">Total</span>
        <span className="text-primary-600">{formatNaira(Number(order.total))}</span>
      </div>

      <div className="mt-6 space-y-1 border-t border-dashed border-primary-200 pt-4 text-xs text-gray-500">
        <p>Delivery Address:</p>
        <p className="text-gray-700">
          {order.billing.address_1}, {order.billing.city}, {order.billing.state}
        </p>
      </div>

      <p className="mt-6 text-center text-xs text-gray-400">
        📦 Ships in discreet packaging · ivycookiecare.ng
      </p>
    </div>
  );
}