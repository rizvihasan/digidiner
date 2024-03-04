import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';

export const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();

  if (!orderId) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">Error</h1>
        <p className="text-gray-500 mb-8">No order ID provided.</p>
        <Button asChild>
          <Link to="/">Return to Menu</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
      <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
      <p className="text-gray-600 mb-2">Thank you for your order.</p>
      <p className="text-gray-800 font-semibold mb-8">
        Your Order ID is: <span className="text-restaurant-primary">{orderId}</span>
      </p>
      <p className="text-gray-500 mb-8">You should receive an email confirmation shortly (if email sending were implemented).</p>
      <Button asChild>
        <Link to="/">Return to Menu</Link>
      </Button>
    </div>
  );
};

export default OrderConfirmationPage;
