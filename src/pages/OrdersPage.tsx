import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatCurrency } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { SearchIcon, Receipt, ShoppingBag } from 'lucide-react';
import { Order } from '@/types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

export const OrdersPage: React.FC = () => {
  const [searchType, setSearchType] = useState<'phone' | 'email'>('phone');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(false);
    try {
      let url;
      if (searchType === 'phone') {
        if (!/^\d{10}$/.test(phone)) return;
        url = `${API_BASE_URL}/orders/lookup?phone=${phone}`;
      } else {
        if (!email) return;
        url = `${API_BASE_URL}/orders/lookup?email=${encodeURIComponent(email)}`;
      }
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setOrders(Array.isArray(data.orders) ? data.orders : []); // Ensure we always set an array
    } catch (err) {
      console.error('Error fetching orders:', err);
      setOrders([]);
      // Could add toast notification here for error feedback
    } finally {
      setHasSearched(true);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">Order History</h1>
      <div className="mb-12 max-w-md mx-auto">
        <div className="flex mb-4 gap-2 justify-center">
          <Button type="button" variant={searchType === 'phone' ? 'default' : 'outline'} onClick={() => setSearchType('phone')}>Search by Phone</Button>
          <Button type="button" variant={searchType === 'email' ? 'default' : 'outline'} onClick={() => setSearchType('email')}>Search by Email</Button>
        </div>
        <form onSubmit={handleSearch} className="space-y-4">
          {searchType === 'phone' ? (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">
                Phone Number
              </label>
              <div className="flex">
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={e => setPhone(e.target.value.replace(/[^\d]/g, ''))}
                  placeholder="Enter your 10-digit phone number"
                  className="rounded-r-none"
                  maxLength={10}
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-restaurant-primary hover:bg-restaurant-primary/90"
                  disabled={isLoading || phone.length !== 10}
                >
                  {isLoading ? "Searching..." : "Search"}
                  <SearchIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter the phone number you used to place your order. (Phone is required for order placement and lookup.)
              </p>
            </div>
          ) : (
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">
                Email Address
              </label>
              <div className="flex">
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="rounded-r-none"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  className="rounded-l-none bg-restaurant-primary hover:bg-restaurant-primary/90"
                  disabled={isLoading || !email}
                >
                  {isLoading ? "Searching..." : "Search"}
                  <SearchIcon className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Enter the email address you used to place your order. (Email is optional for order placement, but can be used for lookup if provided.)
              </p>
            </div>
          )}
        </form>
      </div>
      {hasSearched && (
        <div>
          {orders.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
              <p className="text-gray-500 mb-6">
                We couldn't find any orders associated with this phone number.
              </p>
              <Button asChild>
                <Link to="/">Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-6">Your Orders</h2>
              {orders.map((order, idx) => (
                <div key={order.order_id || idx} className="mb-8 border rounded-lg p-6 bg-white shadow">
                  <div className="flex items-center mb-2">
                    <Receipt className="h-5 w-5 mr-2 text-restaurant-primary" />
                    <span className="font-semibold">Order #{order.order_id}</span>
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    Placed on: {order.created_at ? new Date(order.created_at).toLocaleString() : 'N/A'}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    Name: {order.customer_name} | Phone: {order.customer_phone}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    Email: {order.customer_email || 'N/A'}
                  </div>
                  <div className="mb-2 text-sm text-gray-600">
                    Status: {order.status}
                  </div>
                  <div className="mb-2">
                    <span className="font-semibold">Items:</span>
                    <ul className="ml-4 list-disc">
                      {order.items && order.items.map((item, i) => (
                        <li key={i}>
                          {item.menu_item_name} x {item.quantity} @ ₹{item.price_at_order}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="font-bold text-lg mt-2">
                    Total: ₹{order.total_amount}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
