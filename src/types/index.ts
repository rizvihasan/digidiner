// src/types/index.ts

/**
 * Represents a menu item, mirroring the structure defined in the backend MongoDB schema.
 */
export interface MenuItem {
  _id: string; // Unique identifier from MongoDB
  name: string;
  description?: string; // Optional description
  price: number;
  imageUrl?: string; // Optional image URL
  category: string;
  isVegetarian?: boolean;
  spiceLevel?: 'Mild' | 'Medium' | 'Spicy' | null; // Constrain possible values
}

/**
 * Represents an item within the shopping cart, extending MenuItem with quantity.
 */
export interface CartItem extends MenuItem {
  quantity: number;
}

/**
 * Represents an item within an order.
 */
export interface OrderItem {
  menu_item_id: string;
  menu_item_name: string;
  quantity: number;
  price_at_order: number;
}

/**
 * Represents an order as returned from the backend.
 */
export interface Order {
  order_id: number;
  customer_name: string;
  customer_email: string | null;
  customer_phone: string;
  total_amount: number;
  status: string;
  created_at: string;
  items: OrderItem[];
}

// Future types (e.g., User) can be added here as the application grows.
