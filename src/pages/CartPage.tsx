import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '@/hooks/useCart'; // Updated import path
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, IndianRupee } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

export const CartPage: React.FC = () => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const total = getTotal();
  
  // Fallback image URL if the original fails to load
  const fallbackImage = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=400&h=300&fit=crop";

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex flex-col items-center justify-center py-16">
          <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
          <p className="text-lg text-gray-500 mb-8">Your cart is empty</p>
          <Link to="/">
            <Button className="bg-restaurant-primary hover:bg-restaurant-primary/90">
              Browse Menu
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Cart</h1>
      
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="mb-6">
          <ul className="divide-y">
            {items.map((item) => (
              <li key={item._id} className="py-6 flex sm:items-center flex-col sm:flex-row">
                <div className="flex-shrink-0 mr-6 mb-4 sm:mb-0">
                  <img 
                    src={item.imageUrl || fallbackImage} 
                    alt={item.name} 
                    className="w-24 h-24 object-cover rounded-md bg-gray-100"
                    onError={(e) => {
                      e.currentTarget.src = fallbackImage;
                    }}
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {formatCurrency(item.price)}
                  </p>
                  <div className="flex items-center mt-2">
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full" 
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    >
                      <Minus size={14} />
                    </Button>
                    <span className="mx-3 w-8 text-center">{item.quantity}</span>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="h-8 w-8 rounded-full" 
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    >
                      <Plus size={14} />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-end mt-4 sm:mt-0">
                  <p className="font-medium text-lg mb-2 flex items-center">
                    <IndianRupee className="h-4 w-4 mr-1" />
                    {formatCurrency(item.price * item.quantity)}
                  </p>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-red-500 hover:text-red-700"
                    onClick={() => removeItem(item._id)}
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="flex justify-between items-center py-2">
            <span className="text-lg">Subtotal</span>
            <span className="font-medium flex items-center">
              <IndianRupee className="h-4 w-4 mr-1" />
              {formatCurrency(total)}
            </span>
          </div>
          <div className="flex justify-between items-center py-2 border-t border-dashed">
            <span className="text-xl font-bold">Total</span>
            <span className="text-xl font-bold text-restaurant-primary flex items-center">
              <IndianRupee className="h-5 w-5 mr-1" />
              {formatCurrency(total)}
            </span>
          </div>
          
          <div className="mt-8 space-y-4">
            <Link to="/checkout" className="w-full">
              <Button className="w-full py-6 text-lg bg-restaurant-primary hover:bg-restaurant-primary/90">
                Proceed to Checkout
              </Button>
            </Link>
            <div className="flex justify-between">
              <Link to="/">
                <Button variant="outline">Continue Shopping</Button>
              </Link>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-200 hover:bg-red-50" 
                onClick={clearCart}
              >
                Clear Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
