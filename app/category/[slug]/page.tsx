// app/category/[slug]/page.tsx
import ProductCard from '@/components/products/ProductCard';
import { getProductsByCategory } from '@/lib/products';
import { notFound } from 'next/navigation';

const categoryLabels: Record<string, string> = {
  all: 'All Products',
  'feminine-hygiene': 'Feminine Hygiene',
  'probiotics-supplements': 'Probiotics & Supplements',
  'intimacy-sexual-wellness': 'Intimacy & Sexual Wellness',
  'sex-toys': 'Sex Toys',
  'kits-bundles': 'Kits & Bundles',
  'card-games': 'card games',
};

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const label = categoryLabels[slug];
  if (!label) notFound();

  const products = await getProductsByCategory(slug);

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="font-heading text-sm font-semibold uppercase tracking-widest text-primary-400">Category</span>
        <h1 className="mt-1 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">{label}</h1>
        <p className="mt-2 text-sm text-gray-500">
          {products.length} {products.length === 1 ? 'product' : 'products'}
        </p>
      </div>

      {products.length > 0 ? (
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="mt-16 flex flex-col items-center gap-3 text-center">
          <span className="text-4xl">🧴</span>
          <p className="text-gray-500">No products in this category yet check back soon!</p>
        </div>
      )}
    </section>
  );
}