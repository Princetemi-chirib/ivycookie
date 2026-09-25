'use client';

import Link from 'next/link';
import { X } from 'lucide-react';

export default function MobileNav({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-black/40 transition-opacity md:hidden ${
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`fixed left-0 top-0 z-50 h-full w-72 max-w-[80%] transform bg-white shadow-xl transition-transform duration-300 md:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-primary-100 px-4 py-4">
          <span className="font-heading text-lg font-semibold text-primary-500">Menu</span>
          <button onClick={onClose} className="rounded-full p-1.5 text-primary-600 hover:bg-primary-50" aria-label="Close menu">
            <X size={22} />
          </button>
        </div>
        <nav className="flex flex-col gap-1 px-4 py-4">
          <Link href="/" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">Home</Link>
          <Link href="/category/all" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">Shop</Link>
          <Link href="/category/new" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">New Arrivals</Link>
          <Link href="/cart" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">Cart</Link>
          <Link href="/contact" onClick={onClose} className="rounded-lg px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-primary-50 hover:text-primary-600">Contact</Link>
        </nav>
      </div>
    </>
  );
}