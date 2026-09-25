// lib/validate-checkout.ts
import { CheckoutFormData, CheckoutFormErrors } from '../types/orders';

export function validateCheckoutForm(data: CheckoutFormData): CheckoutFormErrors {
  const errors: CheckoutFormErrors = {};

  if (!data.fullName.trim()) errors.fullName = 'Full name is required';

  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^(\+?234|0)[789][01]\d{8}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Enter a valid Nigerian phone number';
  }

  if (!data.address.trim()) errors.address = 'Delivery address is required';
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.state.trim()) errors.state = 'State is required';

  return errors;
}