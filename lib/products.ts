// lib/products.ts
import {
    fetchProducts,
    fetchProductBySlug,
    fetchProductVariations,
    WCProduct,
    WCVariation,
  } from './woocommerce';
  import { Product, ProductVariant, ProductVariation } from '@/types/product';
  
  function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, '').trim();
  }
  
  function mapAttributesToVariants(attributes: WCProduct['attributes']): ProductVariant[] {
    return attributes
      .filter((attr) => attr.variation)
      .map((attr) => ({ type: attr.name, options: attr.options }));
  }
  
  function mapVariation(v: WCVariation): ProductVariation {
    const attributes: Record<string, string> = {};
    v.attributes.forEach((a) => {
      attributes[a.name] = a.option;
    });
    return {
      variationId: v.id,
      attributes,
      price: Math.round(parseFloat(v.price)),
      compareAtPrice:
        v.regular_price && v.sale_price && v.regular_price !== v.sale_price
          ? Math.round(parseFloat(v.regular_price))
          : undefined,
      image: v.image?.src,
    };
  }
  
  async function mapProduct(wc: WCProduct): Promise<Product> {
    const price = Math.round(parseFloat(wc.price || wc.regular_price || '0'));
    const compareAtPrice =
      wc.regular_price && wc.sale_price && wc.regular_price !== wc.sale_price
        ? Math.round(parseFloat(wc.regular_price))
        : undefined;
  
    let variants: ProductVariant[] | undefined;
    let variations: ProductVariation[] | undefined;
  
    if (wc.type === 'variable') {
      variants = mapAttributesToVariants(wc.attributes);
      const wcVariations = await fetchProductVariations(wc.id);
      variations = wcVariations.map(mapVariation);
    }
  
    return {
      id: String(wc.id),
      slug: wc.slug,
      name: wc.name,
      price,
      compareAtPrice,
      image: wc.images[0]?.src ?? '/products/placeholder.jpg',
      images: wc.images.map((img) => img.src),
      category: wc.categories[0]?.slug ?? '',
      description: stripHtml(wc.short_description || wc.description),
      variants,
      variations,
      inStock: wc.stock_status === 'instock',
    };
  }
  
  export async function getFeaturedProducts(limit = 6): Promise<Product[]> {
    const wcProducts = await fetchProducts({ per_page: limit });
    return Promise.all(wcProducts.map(mapProduct));
  }
  
  export async function getProductsByCategory(categorySlug: string): Promise<Product[]> {
    if (categorySlug === 'all') {
      const wcProducts = await fetchProducts({ per_page: 100 });
      return Promise.all(wcProducts.map(mapProduct));
    }
    const wcProducts = await fetchProducts({ category: categorySlug, per_page: 100 });
    return Promise.all(wcProducts.map(mapProduct));
  }
  
  export async function getProductBySlug(slug: string): Promise<Product | null> {
    const wcProduct = await fetchProductBySlug(slug);
    if (!wcProduct) return null;
    return mapProduct(wcProduct);
  }
  
  export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
    const wcProducts = await fetchProducts({ category: product.category, per_page: limit + 1 });
    const mapped = await Promise.all(wcProducts.map(mapProduct));
    return mapped.filter((p) => p.id !== product.id).slice(0, limit);
  }
  
  export function formatNaira(amount: number): string {
    return `₦${amount.toLocaleString('en-NG')}`;
  }