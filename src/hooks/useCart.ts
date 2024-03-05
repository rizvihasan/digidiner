import { useContext } from 'react';
import { CartContext, CartContextType } from '@/contexts/cartTypes'; // Updated path

/**
 * Custom hook for easy access to the Cart context.
 * Provides cart state and actions (items, addItem, removeItem, etc.).
 * 
 * @throws {Error} If used outside of a CartProvider.
 * @returns {CartContextType} The cart context value.
 */
export const useCart = (): CartContextType => {
  // We need to cast the context type here because the initial value is undefined
  const context = useContext(CartContext as React.Context<CartContextType | undefined>);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
