import React, { useState, useEffect } from 'react';
import { MenuSection } from '@/components/menu/MenuSection';
import { HeroSection } from '@/components/menu/HeroSection';
import { Skeleton } from '@/components/ui/skeleton';
import { MenuItem } from '@/types'; // Import the standardized type

// Use environment variable for the API base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001/api'; 

export const MenuPage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); 
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Use the API_BASE_URL variable
        const response = await fetch(`${API_BASE_URL}/menu`); 
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: MenuItem[] = await response.json(); 
        setMenuItems(data);
      } catch (err) {
        console.error("Failed to fetch menu items:", err);
        setError(err instanceof Error ? err.message : 'Failed to load menu. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  // Group menu items by category (using the state variable)
  const categories = [...new Set(menuItems.map(item => item.category))];
  const itemsByCategory = categories.map(category => ({
    category,
    items: menuItems.filter(item => item.category === category)
  }));

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <HeroSection />
        
        <section id="menu-sections" className="mb-8 text-center pt-4">
          <h1 className="text-4xl font-bold text-restaurant-dark mb-4">Our Menu</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore our delicious offerings, made with fresh ingredients and crafted with care.
          </p>
        </section>

        {error && (
          <div className="text-center py-6" data-testid="menu-error">
            <p className="text-red-600 font-semibold">{error}</p>
          </div>
        )}
        {isLoading && (
          <div className="text-center py-10" data-testid="menu-loading">
            <p>Loading menu...</p>
            <div className="space-y-4 mt-4">
              <Skeleton className="h-8 w-1/4 mx-auto" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
              </div>
            </div>
          </div>
        )}
        {!isLoading && !error && itemsByCategory.map(({ category, items }) => (
          <MenuSection key={category} title={category} items={items} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
