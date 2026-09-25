// components/products/RelatedProducts.tsx
import ProductCard from './ProductCard';
import { Product } from '@/types/product';

export default function RelatedProducts({ products }: { products: Product[] }) {
  if (products.length === 0) return null;

  return (
    <section className="mt-16 border-t border-primary-100 pt-10">
      <h2 className="font-heading text-xl font-bold text-primary-600 sm:text-2xl">
        You might also like
      </h2>
      <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}