// types/product.ts
export type ProductVariant = {
    type: string;
    options: string[];
  };
  
  export type ProductVariation = {
    variationId: number;
    attributes: Record<string, string>; // e.g. { Color: 'Purple', Size: '30ml' }
    price: number;
    compareAtPrice?: number;
    image?: string;
  };
  
  export type Product = {
    id: string; // WooCommerce numeric ID, as string
    slug: string;
    name: string;
    price: number;
    compareAtPrice?: number;
    image: string;
    images?: string[];
    category: string;
    badge?: 'Bestseller' | 'New' | 'Sale';
    description?: string;
    variants?: ProductVariant[];
    variations?: ProductVariation[]; // only present for variable products
    inStock: boolean;
  };