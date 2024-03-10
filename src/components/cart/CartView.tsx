import React from 'react';
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Trash2, Plus, Minus } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';

export const CartView: React.FC<{ onNavigate?: () => void }> = ({ onNavigate }) => {
  const { items, removeItem, updateQuantity, getTotal, clearCart } = useCart();

  return (
    <>
      <SheetHeader>
        <SheetTitle>Shopping Cart</SheetTitle>
      </SheetHeader>
      <ScrollArea className="h-[calc(100vh-200px)] pr-4">
        {items.length === 0 ? (
          <p className="text-center py-4">Your cart is empty.</p>
        ) : (
          <ul className="divide-y divide-border">
            {items.map((item) => (
              <li key={item._id} className="flex items-center justify-between py-4">
                <div className="flex items-center space-x-3">
                  <img 
                    src={item.imageUrl || '/placeholder.svg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={e => {
                      const target = e.target as HTMLImageElement;
                      if (target.src !== window.location.origin + '/placeholder.svg') {
                        target.src = '/placeholder.svg';
                      }
                    }}
                  />
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-2">{item.quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-7 w-7" 
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-7 w-7 text-red-500" 
                    onClick={() => removeItem(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </ScrollArea>
      <SheetFooter>
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-between font-semibold text-lg">
            <span>Total:</span>
            <span>{formatCurrency(getTotal())}</span>
          </div>
          <Link to="/checkout" onClick={onNavigate}>
            <Button className="w-full bg-restaurant-primary hover:bg-restaurant-primary/90">
              Proceed to Checkout
            </Button>
          </Link>
          <Button variant="outline" className="w-full" onClick={clearCart}>
            Clear Cart
          </Button>
        </div>
      </SheetFooter>
    </>
  );
};
