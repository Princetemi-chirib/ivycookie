// components/home/TrustStrip.tsx
import { PackageCheck, Lock, Truck, RotateCcw } from 'lucide-react';

const trustPoints = [
  {
    icon: PackageCheck,
    title: 'Discreet Packaging',
    description: 'Plain, unmarked boxes — no logos, no surprises.',
  },
  {
    icon: Lock,
    title: 'Secure Checkout',
    description: 'Your payment & personal info stay private, always.',
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'Nationwide shipping, tracked every step of the way.',
  },
  {
    icon: PackageCheck,
    title: 'Quality Guaranteed',
    description: 'Every order is carefully checked before it is shipped.',
  },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-primary-100 bg-primary-50/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 sm:px-6 lg:grid-cols-4 lg:gap-8">
        {trustPoints.map((point) => {
          const Icon = point.icon;
          return (
            <div key={point.title} className="flex flex-col items-center gap-2 text-center lg:flex-row lg:items-start lg:text-left">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <Icon size={20} />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900">{point.title}</h3>
                <p className="mt-0.5 text-xs text-gray-500">{point.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}