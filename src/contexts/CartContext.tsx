import React, { useState, useMemo } from "react";
import { MenuItem } from "@/types";
import { CartContext, CartContextType } from "@/contexts/cartTypes";

// Extends the base MenuItem with quantity for cart tracking
interface CartItem extends MenuItem {
  quantity: number;
}

// Provider component that wraps parts of the app needing cart access
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);

  // Adds an item to the cart. If it exists, increments quantity; otherwise, adds with quantity 1.
  const addItem = (item: MenuItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((i) => i._id === item._id);
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + 1,
        };
        return updatedItems;
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Removes an item completely from the cart based on its _id.
  const removeItem = (itemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  // Updates the quantity of a specific item. If quantity <= 0, removes the item.
  const updateQuantity = (itemId: string, quantity: number) => {
    setItems((prevItems) => {
      if (quantity <= 0) {
        return prevItems.filter((item) => item._id !== itemId);
      }
      return prevItems.map((item) =>
        item._id === itemId ? { ...item, quantity } : item
      );
    });
  };

  // Empties the entire cart.
  const clearCart = () => {
    setItems([]);
  };

  // Calculates the total price of all items in the cart.
  const getTotal = useMemo(() => {
    return () => items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  // Calculates the total number of individual items in the cart (sum of quantities).
  const getItemCount = useMemo(() => {
    return () => items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  const contextValue: CartContextType = useMemo(() => ({
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  }), [items, getTotal, getItemCount]);

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};
