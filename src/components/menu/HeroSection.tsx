import React from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <div className="bg-restaurant-secondary py-12 px-4 sm:px-6 lg:px-8 rounded-xl mb-10">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-restaurant-dark mb-4 sm:text-5xl">
          digidiner
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Delicious food, just a few clicks away
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-restaurant-primary hover:bg-restaurant-primary/90"
            onClick={() => {
              const menuElement = document.getElementById('menu-sections');
              if (menuElement) {
                menuElement.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Browse Menu
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-restaurant-primary text-restaurant-primary hover:bg-restaurant-primary/10"
            asChild
          >
            <a href="/orders">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Track Order
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};
