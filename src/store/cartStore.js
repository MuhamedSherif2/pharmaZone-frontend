// src/store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      // إضافة منتج للسلة
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.id === product.id);
          
          if (existingItem) {
            // إذا المنتج موجود، نزيد الكمية
            return {
              cart: state.cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            // إذا المنتج غير موجود، نضيفه جديد
            return {
              cart: [...state.cart, { ...product, quantity: 1 }]
            };
          }
        });
      },
      
      // إزالة منتج من السلة
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },
      
      // زيادة كمية منتج
      increaseQuantity: (productId) => {
        set((state) => ({
          cart: state.cart.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }));
      },
      
      decreaseQuantity: (productId) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.id === productId);
          
          if (existingItem && existingItem.quantity > 1) {
            return {
              cart: state.cart.map(item =>
                item.id === productId
                  ? { ...item, quantity: item.quantity - 1 }
                  : item
              )
            };
          } else {
            return {
              cart: state.cart.filter(item => item.id !== productId)
            };
          }
        });
      },
      
      // حساب الإجمالي
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
          // استخراج السعر من النص (مثال: "100 ج.م" أو "100")
          const priceStr = item.price.toString();
          const price = parseFloat(priceStr.replace(/[^\d.]/g, '')) || 0;
          return total + (price * item.quantity);
        }, 0);
      },
      
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },
      
      clearCart: () => {
        set({ cart: [] });
      }
    }),
    {
      name: 'cart-storage',
    }
  )
);