// components/home/CategoryGrid.tsx
import CategoryBubble from './CategoryBubble';

const categories = [
  { name: 'Feminine Hygiene', slug: 'feminine-hygiene', image: '"C:\Users\adeni\Downloads\ivycookie\ivycookie\public\fh.jpg"' },
  { name: 'Probiotics & Supplements', slug: 'probiotics-supplements', image: '/categories/probiotics-supplements.jpg' },
  { name: 'Intimacy / Sexual Wellness', slug: 'intimacy-sexual-wellness', image: '/categories/intimacy-sexual-wellness.jpg' },
  { name: 'Sex Toys', slug: 'sex-toys', image: '/categories/sex-toys.jpg' },
  { name: 'Kits & Bundles', slug: 'kits-bundles', image: '/categories/kits-bundles.jpg' },
  { name: 'card games', slug: 'card-games', image: '/categories/kits-bundles.jpg' },
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <div className="text-center">
        <span className="inline-block font-heading text-sm font-semibold uppercase tracking-widest text-primary-400">
          Explore
        </span>
        <h2 className="mt-1 font-heading text-3xl font-bold text-primary-600 sm:text-4xl">
          Shop by <span className="text-primary-500 underline decoration-primary-200 decoration-wavy underline-offset-8">Category</span>
        </h2>
        <p className="mt-3 text-sm font-medium text-primary-400">
          🫧 Tap a bubble to explore
        </p>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-x-6 gap-y-8 sm:gap-x-10">
        {categories.map((cat, i) => (
          <CategoryBubble
            key={cat.slug}
            name={cat.name}
            slug={cat.slug}
            image={cat.image}
            delay={i * 60}
          />
        ))}
      </div>
    </section>
  );
}