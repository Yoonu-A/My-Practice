export type ProductCategory = 
  | 'electronics'
  | 'smartphones'
  | 'fashion'
  | 'shoes'
  | 'watches'
  | 'accessories';

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number; // in LKR
  originalPrice?: number; // for discount display
  categoryId: ProductCategory;
  categoryName: string;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNewArrival?: boolean;
  specs: Record<string, string>;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface SriLankanAddress {
  fullName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  district: string;
  province: string;
  postalCode?: string;
  deliveryNotes?: string;
}

export type PaymentMethod = 'cod' | 'payhere_card';
export type PaymentStatus = 'pending' | 'paid' | 'pending_verification' | 'failed';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  total: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  deliveryAddress: string;
  deliveryCity: string;
  deliveryDistrict: string;
  deliveryProvince: string;
  postalCode?: string;
  deliveryNotes?: string;
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  phone?: string;
  address?: string;
  city?: string;
  district?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  name: string;
  slug: string;
  image: string;
  itemCount: number;
  description: string;
}
