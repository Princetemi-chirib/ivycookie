// types/cart.ts
export type CartItem = {
    cartItemId: string;
    productId: string; // WooCommerce product ID
    variationId?: number; // WooCommerce variation ID, if applicable
    slug: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    variants?: Record<string, string>;
  };