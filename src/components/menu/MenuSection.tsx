import React from 'react';
import { MenuItem } from '@/types'; // Import the standardized type
import { MenuItemCard } from './MenuItemCard';

interface MenuSectionProps {
  title: string;
  items: MenuItem[]; // Use the standardized type
}

export const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => {
  if (items.length === 0) return null;
  
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6 text-restaurant-dark relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-0 right-0 h-1 bg-restaurant-primary rounded-full"></span>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <MenuItemCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};
