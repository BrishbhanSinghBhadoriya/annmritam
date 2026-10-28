export type ProductCategory = 
  | 'all'
  | 'makhana'
  | 'roasted-makhana'
  | 'flax-seeds'
  | 'pumpkin-seeds'
  | 'chia-seeds'
  | 'oats'
  | 'mixed-seeds'
  | 'dry-fruits'
  | 'combos';

export interface PackSize {
  label: string; // e.g. "100g", "250g", "500g", "1kg"
  grams: number;
  price: number;
  originalPrice: number;
  inStock: boolean;
}

export interface NutritionInfo {
  calories: string;
  protein: string;
  carbs: string;
  dietaryFiber: string;
  fats: string;
  calcium: string;
  iron: string;
  magnesium: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  brand: 'Annmritam';
  company: 'Original & Earthly';
  category: ProductCategory;
  categoryLabel: string;
  rating: number;
  reviewCount: number;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  description: string;
  fullDescription: string;
  origin: string;
  dietaryBadges: string[];
  packSizes: PackSize[];
  defaultPackIndex: number;
  image: string;
  additionalImages?: string[];
  ingredients: string;
  shelfLife: string;
  storageInstructions: string;
  nutritionPer100g: NutritionInfo;
  ayurvedicBenefits: string[];
}

export interface CartItem {
  productId: string;
  product: Product;
  selectedPackIndex: number;
  packSize: PackSize;
  quantity: number;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  flatDiscount?: number;
  minOrderValue: number;
  description: string;
}

export interface OrderCustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  deliveryMethod: 'standard' | 'express';
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  notes?: string;
}

export interface PlacedOrder {
  orderId: string;
  orderDate: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  appliedCoupon?: string;
  customer: OrderCustomerDetails;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  estimatedDelivery: string;
}

