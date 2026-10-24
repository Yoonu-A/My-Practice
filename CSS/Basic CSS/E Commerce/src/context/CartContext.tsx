'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product } from '@/lib/types';
import { useToast } from './ToastContext';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'nexora_cart_items_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { showToast } = useToast();

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      if (saved) {
        setCart(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load cart from storage', e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      } catch (e) {
        console.error('Failed to save cart to storage', e);
      }
    }
  }, [cart, isLoaded]);

  const addToCart = (
    product: Product,
    quantity = 1,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (product.stock <= 0) {
      showToast('This item is currently out of stock', 'error');
      return;
    }

    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const currentQty = prev[existingIndex].quantity;
        const newQty = currentQty + quantity;

        if (newQty > product.stock) {
          showToast(`Cannot add more. Only ${product.stock} units available in stock.`, 'error');
          return prev;
        }

        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: newQty,
        };
        showToast(`Updated quantity for "${product.name}"`, 'success');
        return updated;
      } else {
        if (quantity > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'error');
          return prev;
        }
        showToast(`Added "${product.name}" to cart`, 'success');
        return [...prev, { product, quantity, selectedColor, selectedSize }];
      }
    });

    setIsCartOpen(true);
  };

  const removeFromCart = (productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedColor === selectedColor &&
            item.selectedSize === selectedSize
          )
      )
    );
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string,
    selectedSize?: string
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (
          item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
        ) {
          if (quantity > item.product.stock) {
            showToast(`Max ${item.product.stock} units available in stock`, 'error');
            return item;
          }
          return { ...item, quantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
