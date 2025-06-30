import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { 
  User, Package, Gift, Languages, Tag, ShoppingBag, 
  Heart, Bell, HelpCircle, Scale, Coins, Crown,
  Grid, MoreHorizontal, ShoppingCart
} from 'lucide-react';

interface NavigationMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationMenu = ({ isOpen, onClose }: NavigationMenuProps) => {
  const menuItems = [
    { icon: <User size={20} />, label: 'Login & Signup', divider: false },
    { icon: <Coins size={20} />, label: 'SuperCoin Zone', divider: false },
    { icon: <Crown size={20} />, label: 'Cartify Plus Zone', divider: false },
    { icon: <Grid size={20} />, label: 'All Categories', divider: false },
    { icon: <MoreHorizontal size={20} />, label: 'More on Cartify', divider: false },
    { icon: <Languages size={20} />, label: 'Choose Language', divider: false },
    { icon: <Gift size={20} />, label: 'Offer Zone', divider: true },
    { icon: <Package size={20} />, label: 'Sell on Cartify', divider: true },
    { icon: <ShoppingBag size={20} />, label: 'My Orders', divider: false },
    { icon: <Tag size={20} />, label: 'Coupons', divider: false },
    { icon: <ShoppingCart size={20} />, label: 'My Cart', divider: false },
    { icon: <Heart size={20} />, label: 'My Wishlist', divider: false },
    { icon: <User size={20} />, label: 'My Account', divider: false },
    { icon: <Bell size={20} />, label: 'My Notifications', divider: true },
    { icon: <Bell size={20} />, label: 'Notification Preferences', divider: false },
    { icon: <HelpCircle size={20} />, label: 'Help Centre', divider: false },
    { icon: <Scale size={20} />, label: 'Legal', divider: false },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="p-4 bg-blue-600">
          <SheetTitle className="text-white">Menu</SheetTitle>
        </SheetHeader>
        <div className="overflow-y-auto">
          {menuItems.map((item, index) => (
            <div key={index}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-none h-12"
              >
                {item.icon}
                <span>{item.label}</span>
              </Button>
              {item.divider && <div className="h-px bg-gray-200" />}
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavigationMenu; 