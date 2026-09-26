// components/home/FeaturedProducts.tsx
import NavigationLink from '@/components/layout/NavigationLink';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import { getFeaturedProducts } from '@/lib/products';

export default async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
      <div className="flex items-end justify-between">
        <div>
          <span className="font-heading text-sm font-semibold uppercase tracking-widest text-primary-400">
            Loved by you
          </span>
          <h2 className="mt-1 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
            Bestsellers
          </h2>
        </div>
        <NavigationLink href="/category/all" className="hidden items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700 sm:flex">
          View all <ArrowRight size={16} />
        </NavigationLink>
      </div>

      {featuredProducts.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="mt-8 text-center text-sm text-gray-500">
          Products coming soon — check back shortly!
        </p>
      )}

      <div className="mt-8 flex justify-center sm:hidden">
        <NavigationLink href="/category/all" className="flex items-center gap-1 rounded-full border border-primary-200 px-6 py-2.5 text-sm font-semibold text-primary-600">
          View all products <ArrowRight size={16} />
        </NavigationLink>
      </div>
    </section>
  );
}