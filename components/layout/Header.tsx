// components/layout/Header.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import NavigationLink from '@/components/layout/NavigationLink';
import Image from 'next/image';
import { Search, ShoppingBag, Menu } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import CartDropdown from '@/components/cart/CartDropdown';

export default function Header({
  onOpenMobileNav = () => {},
}: {
  onOpenMobileNav?: () => void;
}) {
  const { totalCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
        setIsCartOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-primary-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <button
          onClick={onOpenMobileNav}
          className="rounded-full p-2 text-primary-600 hover:bg-primary-50 md:hidden"
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>

        <NavigationLink href="/" className="flex shrink-0 items-center">
          <Image
            src="/ivylogo.png"
            alt="Ivy Cookiecare"
            width={180}
            height={70}
            priority
            className="h-14 w-auto sm:h-16"
          />
        </NavigationLink>

        <div className="hidden flex-1 justify-center md:flex">
          <div className="relative w-full max-w-md">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary-400"
            />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full border border-primary-200 bg-primary-50/60 py-2.5 pl-11 pr-4 text-sm text-gray-800 placeholder:text-primary-400 transition focus:border-primary-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary-200"
            />
          </div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-gray-700 lg:flex">
          <NavigationLink href="/category/all" className="hover:text-primary-600">Shop</NavigationLink>
          <NavigationLink href="/category/new" className="hover:text-primary-600">New</NavigationLink>
        </nav>

        {/* Cart with dropdown */}
        <div ref={cartRef} className="relative ml-auto shrink-0 md:ml-0">
          <button
            onClick={() => setIsCartOpen((prev) => !prev)}
            className="relative rounded-full p-2 text-primary-600 hover:bg-primary-50"
            aria-label="Cart"
          >
            <ShoppingBag size={22} />
            {totalCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary-600 text-[11px] font-semibold text-white">
                {totalCount}
              </span>
            )}
          </button>

          {isCartOpen && <CartDropdown onClose={() => setIsCartOpen(false)} />}
        </div>
      </div>

      <div className="border-t border-primary-50 px-4 py-2 md:hidden">
        <div className="relative">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-primary-400"
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full rounded-full border border-primary-200 bg-primary-50/60 py-2 pl-9 pr-3 text-sm placeholder:text-primary-400 focus:border-primary-400 focus:outline-none"
          />
        </div>
      </div>
    </header>
  );
}