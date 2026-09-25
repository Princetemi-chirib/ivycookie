// app/product/[slug]/page.tsx
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/products/ProductGallery';
import ProductInfo from '@/components/products/ProductInfo';
import RelatedProducts from '@/components/products/RelatedProducts';
import { getProductBySlug, getRelatedProducts } from '@/lib/products';

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const images = product.images && product.images.length > 0 ? product.images : [product.image];

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={images} name={product.name} />
        <ProductInfo product={product} />
      </div>
      <RelatedProducts products={related} />
    </section>
  );
}