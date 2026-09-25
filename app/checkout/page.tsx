// app/checkout/page.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Lock } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { CheckoutFormData, CheckoutFormErrors } from '../../types/orders';
import { validateCheckoutForm } from '../../lib/validate-checkout';
import BankTransferDetails from '@/components/checkout/BankTransferDetails';
import ReceiptUpload from '@/components/checkout/ReceiptUpload';
import CheckoutSummary from '@/components/checkout/CheckoutSummary';

const NIGERIAN_STATES = [
  'Abia', 'Adamawa', 'Akwa Ibom', 'Anambra', 'Bauchi', 'Bayelsa', 'Benue',
  'Borno', 'Cross River', 'Delta', 'Ebonyi', 'Edo', 'Ekiti', 'Enugu', 'FCT',
  'Gombe', 'Imo', 'Jigawa', 'Kaduna', 'Kano', 'Katsina', 'Kebbi', 'Kogi',
  'Kwara', 'Lagos', 'Nasarawa', 'Niger', 'Ogun', 'Ondo', 'Osun', 'Oyo',
  'Plateau', 'Rivers', 'Sokoto', 'Taraba', 'Yobe', 'Zamfara',
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const orderPlacedRef = useRef(false);

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
  });
  const [errors, setErrors] = useState<CheckoutFormErrors>({});
  const [receipt, setReceipt] = useState<File | null>(null);
  const [receiptError, setReceiptError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0 && !orderPlacedRef.current) {
      router.replace('/cart');
    }
  }, [items.length, router]);

  const handleChange = (field: keyof CheckoutFormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    setReceiptError(undefined);

    const validationErrors = validateCheckoutForm(formData);
    let hasError = Object.keys(validationErrors).length > 0;

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    }

    if (!receipt) {
      setReceiptError('Please upload your payment receipt.');
      hasError = true;
    } else if (receipt.size > 5 * 1024 * 1024) {
      setReceiptError('File is too large — max 5MB.');
      hasError = true;
    }

    if (hasError) return;

    setIsSubmitting(true);

    try {
      const orderData = {
        ...formData,
        items: items.map((i) => ({ productId: i.productId, variationId: i.variationId, quantity: i.quantity })),
      };

      const body = new FormData();
      body.append('receipt', receipt as File);
      body.append('orderData', JSON.stringify(orderData));

      const res = await fetch('/api/orders', {
        method: 'POST',
        body,
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Something went wrong. Please try again.');
      }

      orderPlacedRef.current = true;
      clearCart();
      router.push(`/order-success?orderId=${result.orderId}`);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  if (items.length === 0 && !orderPlacedRef.current) return null;

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <h1 className="font-heading text-3xl font-bold text-primary-600 sm:text-4xl">Checkout</h1>

      <form onSubmit={handleSubmit} className="mt-8 grid gap-8 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-primary-100 p-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900">Contact Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange('fullName')}
                  className="mt-1 w-full rounded-xl border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                {errors.fullName && <p className="mt-1 text-xs text-red-500">{errors.fullName}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={handleChange('email')}
                  className="mt-1 w-full rounded-xl border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  placeholder="080XXXXXXXX"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  className="mt-1 w-full rounded-xl border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-primary-100 p-6">
            <h2 className="font-heading text-lg font-semibold text-gray-900">Delivery Address</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="text-sm font-medium text-gray-700">Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={handleChange('address')}
                  className="mt-1 w-full rounded-xl border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">City</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={handleChange('city')}
                  className="mt-1 w-full rounded-xl border border-primary-200 px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                />
                {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">State</label>
                <select
                  value={formData.state}
                  onChange={handleChange('state')}
                  className="mt-1 w-full rounded-xl border border-primary-200 bg-white px-4 py-2.5 text-sm focus:border-primary-400 focus:outline-none focus:ring-2 focus:ring-primary-200"
                >
                  <option value="">Select state</option>
                  {NIGERIAN_STATES.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
                {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state}</p>}
              </div>
            </div>
          </div>

          <BankTransferDetails />
          <ReceiptUpload file={receipt} onChange={setReceipt} error={receiptError} />

          {submitError && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{submitError}</p>
          )}
        </div>

        <div className="space-y-4">
          <CheckoutSummary />
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-600 py-3.5 text-sm font-semibold text-white shadow-md shadow-primary-200 transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Lock size={16} />
            {isSubmitting ? 'Submitting Order...' : 'Submit Order'}
          </button>
          <p className="text-center text-xs text-gray-500">
            📦 Ships in discreet packaging · We'll confirm your payment shortly
          </p>
        </div>
      </form>
    </section>
  );
}