import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      
      addToCart: (product) => {
        set((state) => {
          const existingItem = state.cart.find(item => item.id === product.id);
          
          if (existingItem) {
            return {
              cart: state.cart.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          } else {
            return {
              cart: [...state.cart, { ...product, quantity: 1 }]
            };
          }
        });
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter(item => item.id !== productId)
        }));
      },
      
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
      
      getTotalPrice: () => {
        const { cart } = get();
        return cart.reduce((total, item) => {
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