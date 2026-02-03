import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { CartItem } from '../types';
import { Minus, Plus, X } from 'lucide-react';
import CheckoutForm from './CheckoutForm';
import LoginModal from './LoginModal';
import { toast } from "@/components/ui/sonner";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  totalAmount: number;
}

const Cart = ({ isOpen, onClose, items, onUpdateQuantity, totalAmount }: CartProps) => {
  const navigate = useNavigate();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBuyNow = () => {
    const isLoggedIn = !!localStorage.getItem('cartify_token');
    toast("Proceeding to checkout...");
    if (isLoggedIn) {
      navigate('/address');
    } else {
      navigate('/login?redirect=/address');
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setIsLoggedIn(true);
    setIsCheckingOut(true);
  };

  const handleCloseCheckout = () => {
    setIsCheckingOut(false);
    onClose();
  };

  return (
    <>
      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg p-2 sm:p-6">
          <SheetHeader>
            <SheetTitle>{isCheckingOut ? 'Checkout' : 'Your Cart'}</SheetTitle>
            <SheetDescription className="hidden">
              Review your cart items and proceed to checkout
            </SheetDescription>
          </SheetHeader>

          {!isCheckingOut ? (
            <>
              <div className="flex-1 overflow-y-auto py-4 sm:py-6">
                {items.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 border-b pb-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 object-cover rounded mb-2 sm:mb-0"
                        />
                        <div className="flex-1 w-full">
                          <h3 className="font-semibold text-base sm:text-lg">{item.name}</h3>
                          <p className="text-sm text-gray-500">${item.price}</p>
                          <div className="flex items-center space-x-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="ml-auto"
                              onClick={() => onUpdateQuantity(item.id, 0)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t pt-4">
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-2 sm:gap-0">
                  <span className="text-lg font-semibold">Total:</span>
                  <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
                </div>
                <Button
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                  onClick={handleBuyNow}
                  disabled={items.length === 0}
                >
                  Buy Now
                </Button>
              </div>
            </>
          ) : (
            <CheckoutForm totalAmount={totalAmount} onClose={handleCloseCheckout} />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Cart;
