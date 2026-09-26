// components/home/Hero.tsx
import NavigationLink from '@/components/layout/NavigationLink';
import Image from 'next/image';
import { ShoppingBag, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary-200/40 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-primary-300/30 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-primary-100/50 blur-3xl" />

      {/* Sparkle accents */}
      <Sparkles className="pointer-events-none absolute left-[8%] top-16 h-5 w-5 text-primary-300 opacity-70" />
      <Sparkles className="pointer-events-none absolute right-[38%] top-10 h-7 w-7 text-primary-400 opacity-60" />
      <Sparkles className="pointer-events-none absolute bottom-24 left-[15%] h-4 w-4 text-primary-300 opacity-60" />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 md:py-28 lg:py-32">
        {/* Left: copy */}
        <div className="relative z-10 text-center md:text-left">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-primary-600 shadow-sm ring-1 ring-primary-100">
            Discreet delivery, always
          </span>

          <h1 className="mt-6 font-heading text-5xl font-bold leading-[1.05] text-gray-900 sm:text-6xl lg:text-7xl">
            Marinate your{' '}
            <span className="relative inline-block text-primary-500">
              cookie
              <svg
                className="absolute -bottom-2 left-0 w-full text-primary-300"
                viewBox="0 0 200 12"
                fill="none"
                preserveAspectRatio="none"
              >
                <path d="M2 9C40 2 160 2 198 9" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
              </svg>
            </span>
            , your way.
          </h1>

          <p className="mx-auto mt-6 max-w-md text-lg text-gray-600 md:mx-0">
          Welcome to IVYCOOKIECARE.ng Femcare • Intimacy • Education Everything your cookie needs for her clean girl era.

          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row md:justify-start">
            <NavigationLink
              href="/category/all"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary-300/50 transition hover:-translate-y-0.5 hover:bg-primary-700 hover:shadow-xl"
            >
              <ShoppingBag size={16} />
              Shop Now
            </NavigationLink>
            <NavigationLink
              href="/category/intimacy-wellness"
              className="inline-flex items-center justify-center rounded-full border border-primary-200 bg-white px-8 py-3.5 text-sm font-semibold text-primary-600 transition hover:-translate-y-0.5 hover:bg-primary-50"
            >
              Explore Wellness
            </NavigationLink>
          </div>

          {/* Trust badges row */}
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-medium text-gray-500 md:justify-start">
            <span>📦 Discreet packaging</span>
            <span>🔒 Secure checkout</span>
            <span>🚚 Fast delivery nationwide</span>
          </div>
        </div>

        {/* Right: composed bubble cluster */}
        <div className="relative mx-auto hidden h-[420px] w-[420px] sm:block">
          {/* Anchor glow behind cluster */}
          <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-200/40 blur-2xl" />

          <div className="animate-drift-slow absolute right-6 top-0 h-44 w-44 overflow-hidden rounded-full shadow-2xl shadow-primary-300/40 ring-4 ring-white">
            <Image src="/photo_5886385544441302927_x.jpg" alt="" fill className="object-cover" sizes="176px" priority />
          </div>

          <div className="animate-drift-medium absolute left-0 top-32 h-32 w-32 overflow-hidden rounded-full shadow-xl shadow-primary-200/50 ring-4 ring-white">
            <Image src="/photo_5886385544441302928_x.jpg" alt="" fill className="object-cover" sizes="128px" />
          </div>

          <div className="animate-drift-fast absolute bottom-16 right-24 h-28 w-28 overflow-hidden rounded-full shadow-xl shadow-primary-200/50 ring-4 ring-white">
            <Image src="/photo_5886385544441302926_y.jpg" alt="" fill className="object-cover" sizes="112px" />
          </div>

          <div className="animate-drift-medium absolute bottom-2 left-20 h-24 w-24 overflow-hidden rounded-full shadow-lg shadow-primary-200/40 ring-4 ring-white">
            <Image src="/photo_5886385544441302925_x.jpg" alt="" fill className="object-cover" sizes="96px" />
          </div>

          {/* Small accent bubbles filling gaps */}
          <div className="animate-drift-slow absolute bottom-32 right-4 h-10 w-10 rounded-full bg-gradient-to-br from-primary-200 to-primary-400 shadow-md" />
          <div className="animate-drift-fast absolute left-28 top-4 h-6 w-6 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 shadow-sm" />
          <div className="animate-drift-medium absolute right-32 top-40 h-5 w-5 rounded-full bg-white/80 shadow-sm" />
        </div>
      </div>

      {/* Bottom wave transition into next section */}
      <svg
        className="absolute bottom-0 left-0 w-full text-white"
        viewBox="0 0 1440 60"
        fill="currentColor"
        preserveAspectRatio="none"
      >
        <path d="M0,32 C360,64 1080,0 1440,32 L1440,60 L0,60 Z" />
      </svg>
    </section>
  );
}