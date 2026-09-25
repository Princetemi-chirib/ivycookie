// types/order.ts
export type CheckoutFormData = {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
  };
  
  export type CheckoutFormErrors = Partial<Record<keyof CheckoutFormData, string>>;