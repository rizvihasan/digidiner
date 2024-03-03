import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, User } from 'lucide-react'; // Added User import
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { CartView } from '@/components/cart/CartView';
import { useCart } from '@/hooks/useCart';
import { useIsMobile } from '@/hooks/use-mobile'; // Corrected hook name

export const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const isMobile = useIsMobile();
  const cartItemCount = getItemCount();

  // Control open state for mobile nav and cart sheet
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Helper to close nav on link click
  const handleNavLinkClick = () => setMobileNavOpen(false);
  // Helper to close cart on nav
  const handleCartNav = () => setCartOpen(false);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 
        ${scrolled ? 'shadow-xl bg-white/80 backdrop-blur-md' : 'bg-background/80 backdrop-blur'}
        supports-[backdrop-filter]:bg-background/60 animate-fade-in`}
      style={{
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link to="/" className="mr-6 flex items-center space-x-2">
            {/* <Pizza className="h-6 w-6" /> Replace with your logo/icon */}
            <span className="font-bold">digidiner</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link to="/menu" className="transition-colors hover:text-foreground/80 text-foreground/60">
              Menu
            </Link>
            <Link to="/orders" className="transition-colors hover:text-foreground/80 text-foreground/60">
              My Orders
            </Link>
            {/* Add other nav links here */}
          </nav>
        </div>

        {/* Mobile Menu & Logo */}
        <div className="flex items-center justify-start md:hidden">
          <Sheet open={mobileNavOpen} onOpenChange={setMobileNavOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden mr-2">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4 mt-6">
                <Link to="/" className="font-bold" onClick={handleNavLinkClick}>digidiner</Link>
                <Link to="/menu" onClick={handleNavLinkClick}>Menu</Link>
                <Link to="/orders" onClick={handleNavLinkClick}>My Orders</Link>
                {/* Add other mobile nav links */}
              </nav>
            </SheetContent>
          </Sheet>
          <Link to="/" className="font-bold md:hidden">digidiner</Link> 
        </div>

        {/* Right side icons */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Cart Icon/Sheet Trigger */}
          <Sheet open={cartOpen} onOpenChange={setCartOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-restaurant-primary text-white rounded-full text-xs px-1.5 py-0.5">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[400px]">
              <CartView onNavigate={handleCartNav} />
            </SheetContent>
          </Sheet>

          {/* User Icon (Placeholder) */}
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">User Account</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

// Add fade-in animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
.animate-fade-in { animation: fade-in 0.7s cubic-bezier(0.22,1,0.36,1); }
`;
document.head.appendChild(style);
