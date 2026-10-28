import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, PackSize, CartItem, Coupon, PlacedOrder } from '../types';
import { AVAILABLE_COUPONS } from '../data/products';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, packIndex?: number, qty?: number) => void;
  updateQuantity: (productId: string, packIndex: number, delta: number) => void;
  removeFromCart: (productId: string, packIndex: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  orders: PlacedOrder[];
  placeOrder: (order: PlacedOrder) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING_FEE = 60;

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('annmritam_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('annmritam_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState<PlacedOrder[]>(() => {
    try {
      const saved = localStorage.getItem('annmritam_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('annmritam_cart', JSON.stringify(cart));
    } catch {
      // localStorage error fallback
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('annmritam_wishlist', JSON.stringify(wishlist));
    } catch {
      // fallback
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('annmritam_orders', JSON.stringify(orders));
    } catch {
      // fallback
    }
  }, [orders]);

  const addToCart = (product: Product, packIndex: number = product.defaultPackIndex, qty: number = 1) => {
    const pack = product.packSizes[packIndex] || product.packSizes[0];
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.productId === product.id && item.selectedPackIndex === packIndex
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + qty,
        };
        return next;
      } else {
        return [
          ...prev,
          {
            productId: product.id,
            product,
            selectedPackIndex: packIndex,
            packSize: pack,
            quantity: qty,
          },
        ];
      }
    });
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (productId: string, packIndex: number, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.productId === productId && item.selectedPackIndex === packIndex) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null);
    });
  };

  const removeFromCart = (productId: string, packIndex: number) => {
    setCart((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.selectedPackIndex === packIndex)
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce(
    (total, item) => total + item.packSize.price * item.quantity,
    0
  );

  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : STANDARD_SHIPPING_FEE;

  let discountAmount = 0;
  if (appliedCoupon) {
    if (subtotal >= appliedCoupon.minOrderValue) {
      if (appliedCoupon.discountPercent) {
        discountAmount = Math.round((subtotal * appliedCoupon.discountPercent) / 100);
      } else if (appliedCoupon.flatDiscount) {
        discountAmount = Math.min(appliedCoupon.flatDiscount, subtotal);
      }
    }
  }

  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const applyCoupon = (code: string) => {
    const clean = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code.toUpperCase() === clean);
    if (!found) {
      return { success: false, message: `Coupon code "${clean}" is invalid or expired.` };
    }
    if (subtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon "${clean}" requires a minimum order of ₹${found.minOrderValue}. Add items worth ₹${found.minOrderValue - subtotal} more.`,
      };
    }
    setAppliedCoupon(found);
    return {
      success: true,
      message: `Coupon ${found.code} applied successfully! You saved ₹${found.discountPercent ? Math.round((subtotal * found.discountPercent) / 100) : found.flatDiscount}.`,
    };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
  };

  const placeOrder = (order: PlacedOrder) => {
    setOrders((prev) => [order, ...prev]);
    clearCart();
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        subtotal,
        shippingFee,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        wishlist,
        toggleWishlist,
        isInWishlist,
        orders,
        placeOrder,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

