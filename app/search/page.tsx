// app/search/page.tsx
import { Suspense } from 'react';
import ProductCard from '@/components/products/ProductCard';
import { searchProducts } from '@/lib/products';

async function SearchResults({ query }: { query: string }) {
  const products = await searchProducts(query);

  return (
    <>
      <div className="text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-widest text-primary-400">
          Search Results
        </span>
        <h1 className="mt-1 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
          {query ? `"${query}"` : 'Search'}
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          {products.length} {products.length === 1 ? 'result' : 'results'}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-gray-500">No products found for "{query}". Try a different search.</p>
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🔍</span>
          <p className="text-gray-500">Start typing to search our products.</p>
        </div>
      )}
    </>
  );
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <Suspense fallback={<p className="text-center text-gray-500">Searching...</p>}>
        <SearchResults query={query} />
      </Suspense>
    </section>
  );
}