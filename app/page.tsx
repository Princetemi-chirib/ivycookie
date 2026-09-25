// app/page.tsx
import Hero from '@/components/home/Hero';
import CategoryGrid from '@/components/home/CategoryGrid';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import TrustStrip from '@/components/home/TrustStrip';

export default function HomePage() {
  return (
    <>
      <Hero />
      <CategoryGrid />
      <FeaturedProducts />
      <TrustStrip />
    </>
  );
}