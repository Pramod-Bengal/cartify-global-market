import { useState, useRef, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, MapPin, Search, User } from 'lucide-react';
import NavigationMenu from './NavigationMenu';
import { Link } from 'react-router-dom';
// import PincodeLocation from "./PincodeLocation";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const PRODUCTS = [
  'iPhone 15',
  'Samsung Galaxy S23',
  'MacBook Pro',
  'Sony Headphones',
  'Nike Shoes',
  'Adidas T-shirt',
  'Apple Watch',
  'Canon Camera',
  'Bluetooth Speaker',
  'Smart TV',
];

const Header = ({ cartItemCount, onCartClick, onSearch, searchQuery }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const accountRef = useRef<HTMLDivElement>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    try {
      const userStr = localStorage.getItem('cartify_user');
      if (userStr) {
        const user = JSON.parse(userStr);
        setUserName(user.name || null);
      } else {
        setUserName(null);
      }
    } catch {
      setUserName(null);
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (accountRef.current && !accountRef.current.contains(event.target as Node)) {
        setAccountOpen(false);
      }
    }
    if (accountOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountOpen]);

  const handleLocationSelect = () => {
    setLocation('New York, NY');
  };

  const handleLogout = () => {
    localStorage.removeItem('cartify_token');
    localStorage.removeItem('cartify_user');
    setAccountOpen(false);
    window.location.href = '/login';
  };

  const suggestions =
    searchQuery.length > 0
      ? PRODUCTS.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : [];

  return (
    <>
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="flex flex-wrap items-center h-auto min-h-[4rem] gap-2 sm:gap-4 py-2 sm:py-0">
            <div className="flex-shrink-0 mb-2 sm:mb-0">
              <h1 className="text-xl sm:text-2xl font-bold">Cartify</h1>
              <span className="text-xs">Explore Plus</span>
            </div>
            <div className="flex-1 max-w-full sm:max-w-3xl w-full order-3 sm:order-none mb-2 sm:mb-0">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => {
                    onSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onFocus={() => setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                  className="w-full pl-10 pr-4 py-2 bg-white text-gray-900 text-sm sm:text-base"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute left-0 right-0 mt-1 bg-white border rounded shadow-lg z-10 text-gray-900 max-h-60 overflow-y-auto text-sm">
                    {suggestions.map((item, idx) => (
                      <div
                        key={idx}
                        className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                        onMouseDown={() => {
                          onSearch(item);
                          setShowSuggestions(false);
                        }}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-white relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
            {/* My Account Dropdown */}
            <div className="relative" ref={accountRef}>
              <Button
                variant="ghost"
                className="text-white flex items-center gap-2"
                onClick={() => setAccountOpen((open) => !open)}
              >
                <User className="h-5 w-5" />
                {userName ? userName : "My Account"}
              </Button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50 text-gray-900">
                  <Link
                    to="/account"
                    className="block px-4 py-2 hover:bg-blue-100 font-semibold"
                    onClick={() => setAccountOpen(false)}
                  >
                    My Account
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setAccountOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 hover:bg-blue-100"
                    onClick={() => setAccountOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <button
                    className="block w-full text-left px-4 py-2 hover:bg-blue-100 text-red-600 font-semibold"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
