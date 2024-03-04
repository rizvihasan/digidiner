
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <h1 className="text-6xl font-bold mb-4 text-restaurant-primary">404</h1>
      <h2 className="text-3xl font-bold mb-6">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
      </p>
      <Button asChild size="lg">
        <Link to="/">Back to Menu</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
