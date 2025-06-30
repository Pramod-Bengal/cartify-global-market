import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Menu, MapPin, Search, User } from 'lucide-react';
import NavigationMenu from './NavigationMenu';

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

const Header = ({ cartItemCount, onCartClick, onSearch, searchQuery }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location, setLocation] = useState<string | null>(null);

  const handleLocationSelect = () => {
    // In a real app, this would open a location picker
    // For now, just set a dummy location
    setLocation('New York, NY');
  };

  return (
    <>
      <NavigationMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      
      <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16 gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-white"
              onClick={() => setIsMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </Button>

            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold">Cartify</h1>
              <span className="text-xs">Explore Plus</span>
            </div>

            <div className="flex-1 max-w-3xl">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for products, brands and more"
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white text-gray-900"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>
            </div>

            <Button
              variant="ghost"
              className="text-white hidden md:flex items-center gap-2"
              onClick={handleLocationSelect}
            >
              <MapPin className="h-5 w-5" />
              {location ? location : 'Select Location'}
            </Button>

            <Button
              variant="ghost"
              className="text-white hidden md:flex items-center gap-2"
            >
              <User className="h-5 w-5" />
              Login
            </Button>

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
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
