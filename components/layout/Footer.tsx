// components/layout/Footer.tsx
import Link from 'next/link';
import { Mail, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-primary-100 bg-primary-50/40">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:px-6 md:grid-cols-4">
        <div className="col-span-2 md:col-span-1">
          <span className="font-heading text-xl font-semibold text-primary-500">
            Ivy<span className="text-primary-600">Cookiecare</span>
          </span>
          <p className="mt-2 text-sm text-gray-500">...helping you marinate your cookie</p>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-gray-800">Shop</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/category/all" className="hover:text-primary-600">All Products</Link></li>
            <li><Link href="/category/new" className="hover:text-primary-600">New Arrivals</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-gray-800">Support</h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-600">
            <li><Link href="/faq" className="hover:text-primary-600">FAQs</Link></li>
            <li><Link href="/contact" className="hover:text-primary-600">Contact Us</Link></li>
            <li><Link href="/shipping" className="hover:text-primary-600">Shipping & Returns</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-heading text-sm font-semibold text-gray-800">Follow Us</h4>
          <div className="mt-3 flex gap-3">
            <a href="#" aria-label="Instagram" className="rounded-full bg-primary-100 p-2 text-primary-600 hover:bg-primary-200">
              <Globe size={18} />
            </a>
            <a href="#" aria-label="WhatsApp" className="rounded-full bg-primary-100 p-2 text-primary-600 hover:bg-primary-200">
              <MessageCircle size={18} />
            </a>
            <a href="mailto:hello@ivycookiecare.ng" aria-label="Email" className="rounded-full bg-primary-100 p-2 text-primary-600 hover:bg-primary-200">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-100 px-4 py-4 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} Ivy Cookiecare.ng — All rights reserved.
      </div>
    </footer>
  );
}