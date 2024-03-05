import { createContext } from 'react';
import { MenuItem, CartItem } from '@/types'; // Adjust path as needed

// Defines the shape of the Cart context
export interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem) => void;
  removeItem: (itemId: string) => void; // Use MongoDB _id (string)
  updateQuantity: (itemId: string, quantity: number) => void; // Use MongoDB _id (string)
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Create the context with an initial undefined value
export const CartContext = createContext<CartContextType | undefined>(undefined);
