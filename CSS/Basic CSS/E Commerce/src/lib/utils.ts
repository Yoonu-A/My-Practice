import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format a number into Sri Lankan Rupees (LKR)
 * Example: 125000 -> "Rs. 125,000"
 */
export function formatLKR(amount: number, showDecimals = false): string {
  if (isNaN(amount)) return 'Rs. 0';
  
  const formatted = new Intl.NumberFormat('en-LK', {
    style: 'currency',
    currency: 'LKR',
    currencyDisplay: 'narrowSymbol',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(amount);

  // Return standard Sri Lankan convention "Rs. 125,000"
  return formatted.replace('LKR', 'Rs.').trim();
}

/**
 * Calculate percentage discount
 */
export function calculateDiscount(price: number, originalPrice?: number): number {
  if (!originalPrice || originalPrice <= price) return 0;
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}

/**
 * Validate promo discount code
 */
export function validatePromoCode(code: string, subtotal: number): { valid: boolean; discount: number; message: string } {
  const clean = code.trim().toUpperCase();
  if (clean === 'NEXORA10') {
    const discount = Math.round(subtotal * 0.10);
    return { valid: true, discount, message: '10% discount applied!' };
  }
  if (clean === 'COLOMBO5') {
    const discount = Math.round(subtotal * 0.05);
    return { valid: true, discount, message: '5% discount applied!' };
  }
  if (clean === 'FREESHIP') {
    return { valid: true, discount: 550, message: 'Free shipping voucher applied!' };
  }
  return { valid: false, discount: 0, message: 'Invalid or expired coupon code' };
}
