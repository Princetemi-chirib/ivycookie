// lib/woocommerce.ts
const WC_URL = process.env.WOOCOMMERCE_URL;
const CK = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CS = process.env.WOOCOMMERCE_CONSUMER_SECRET;

export async function fetchCategoryBySlug(slug: string): Promise<WCCategory | null> {
    const results = await wcFetch<WCCategory[]>(`products/categories?slug=${encodeURIComponent(slug)}`);
    return results[0] ?? null;
  }
function authQuery() {
  return `consumer_key=${CK}&consumer_secret=${CS}`;
}

export type WCImage = { id: number; src: string };
export type WCCategory = { id: number; name: string; slug: string };
export type WCAttribute = { id: number; name: string; options: string[]; variation: boolean };

export type WCProduct = {
  id: number;
  name: string;
  slug: string;
  type: 'simple' | 'variable';
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: WCImage[];
  categories: WCCategory[];
  attributes: WCAttribute[];
  stock_status: string;
};

export type WCVariation = {
  id: number;
  price: string;
  regular_price: string;
  sale_price: string;
  image: WCImage | null;
  attributes: { id: number; name: string; option: string }[];
  stock_status: string;
};

async function wcFetch<T>(path: string): Promise<T> {
  if (!WC_URL || !CK || !CS) {
    throw new Error('WooCommerce environment variables are not configured.');
  }
  const separator = path.includes('?') ? '&' : '?';
  const res = await fetch(`${WC_URL}/wp-json/wc/v3/${path}${separator}${authQuery()}`, {
    next: { revalidate: 60 }, // cache products for 60s, adjust as needed
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`WooCommerce API error (${res.status}): ${body}`);
  }
  return res.json();
}

export async function fetchProducts(params?: { categoryId?: number; per_page?: number }): Promise<WCProduct[]> {
    const query = new URLSearchParams();
    if (params?.categoryId) query.set('category', String(params.categoryId));
    query.set('per_page', String(params?.per_page ?? 20));
    return wcFetch<WCProduct[]>(`products?${query.toString()}`);
  }

export async function fetchProductBySlug(slug: string): Promise<WCProduct | null> {
  const results = await wcFetch<WCProduct[]>(`products?slug=${encodeURIComponent(slug)}`);
  return results[0] ?? null;
}

export async function fetchProductVariations(productId: number): Promise<WCVariation[]> {
  return wcFetch<WCVariation[]>(`products/${productId}/variations?per_page=100`);
}

export async function fetchCategories(): Promise<WCCategory[]> {
  return wcFetch<WCCategory[]>(`products/categories?per_page=50`);
}