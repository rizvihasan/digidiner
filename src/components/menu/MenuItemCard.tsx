import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, PlusCircle } from 'lucide-react';
import { MenuItem } from '@/types';
import { useCart } from '@/hooks/useCart';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

interface MenuItemCardProps {
  item: MenuItem;
}

export const MenuItemCard: React.FC<MenuItemCardProps> = ({ item }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    addItem(item);
    toast.success(`${item.name} added to cart!`);
  };

  return (
    <Card className="overflow-hidden menu-card-animate transition-shadow duration-300 hover:shadow-xl">
      <CardHeader className="p-0">
        <img 
          src={item.imageUrl || '/placeholder.svg'}
          alt={item.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
          onError={e => {
            const target = e.target as HTMLImageElement;
            if (target.src !== window.location.origin + '/placeholder.svg') {
              target.src = '/placeholder.svg';
            }
          }}
        />
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-semibold mb-2">{item.name}</CardTitle>
        <p className="text-sm text-muted-foreground mb-3 h-10 overflow-hidden">
          {item.description}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-bold text-restaurant-primary">{formatCurrency(item.price)}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button onClick={handleAddToCart} className="w-full animated-btn">
          <PlusCircle className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};
