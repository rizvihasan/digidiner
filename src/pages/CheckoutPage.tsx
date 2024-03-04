import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure Link is imported
import { useCart } from '@/hooks/useCart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { formatCurrency } from '@/lib/utils'; // Ensure formatCurrency is imported
import { toast } from 'sonner';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const CheckoutPage: React.FC = () => {
  const { items, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalAmount = getTotal();

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName) {
      toast.error('Please enter your name.');
      return;
    }
    if (!customerPhone || !/^\d{10}$/.test(customerPhone)) {
      toast.error('Please enter a valid 10-digit phone number.');
      return;
    }
    if (items.length === 0) {
      toast.error('Your cart is empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`${API_BASE_URL}/orders`, { // Use API_BASE_URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          items: items.map(item => ({
            _id: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to place order');
      }

      const result = await response.json();

      toast.success('Order placed successfully!');
      clearCart();
      // Store last used email in localStorage
      if (customerEmail) {
        localStorage.setItem('lastOrderEmail', customerEmail);
      }
      // Store order in localStorage for local order history (legacy support)
      const prevOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([
        ...prevOrders,
        {
          id: result.orderId || Date.now().toString(),
          customer: { name: customerName, email: customerEmail },
          date: new Date().toISOString(),
          items: items.map(item => ({
            id: item._id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          total: totalAmount,
        },
      ]));
      // Redirect to an order confirmation page (pass order ID if available)
      navigate(`/confirmation/${result.orderId || 'new'}`);

    } catch (error) {
      console.error("Order submission error:", error);
      toast.error(`Error: ${error instanceof Error ? error.message : 'Could not place order'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Order Summary */}
        <div className="md:col-span-1 order-last md:order-first">
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <ul className="space-y-2">
                  {items.map((item) => (
                    <li key={item._id} className="flex justify-between items-center text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      {/* Ensure formatCurrency is used correctly */}
                      <span>{formatCurrency(item.price * item.quantity)}</span>
                    </li>
                  ))}
                </ul>
              )}
              <hr />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                {/* Ensure formatCurrency is used correctly */}
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div className="text-center mt-2">
                {/* Ensure Link is used correctly */}
                <Link to="/cart" className="inline-flex items-center text-restaurant-primary hover:underline">
                  Edit Cart
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Information Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Your Information</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitOrder} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" value={customerName} onChange={e => setCustomerName(e.target.value)} required />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" value={customerPhone} onChange={e => setCustomerPhone(e.target.value.replace(/[^\d]/g, ''))} maxLength={10} required placeholder="10-digit mobile number" />
                </div>
                <div>
                  <Label htmlFor="email">Email (optional)</Label>
                  <Input id="email" type="email" value={customerEmail} onChange={e => setCustomerEmail(e.target.value)} />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || items.length === 0}
                >
                  {isSubmitting ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
