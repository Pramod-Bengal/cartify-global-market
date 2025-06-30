import { Button } from '@/components/ui/button';

interface CategoryIcon {
  id: string;
  name: string;
  image: string;
}

interface CategoryIconGridProps {
  onCategorySelect: (category: string) => void;
}

const categoryIcons: CategoryIcon[] = [
  {
    id: 'minutes',
    name: 'Cartify Minutes',
    image: 'https://images.unsplash.com/photo-1541560052-5e137f229371?w=150&h=150&fit=crop'
  },
  {
    id: 'electronics',
    name: 'Mobiles',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&h=150&fit=crop'
  },
  {
    id: 'health',
    name: 'Food & Health',
    image: 'https://images.unsplash.com/photo-1494390248081-4e521a5940db?w=150&h=150&fit=crop'
  },
  {
    id: 'home',
    name: 'Home',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=150&h=150&fit=crop'
  },
  {
    id: 'gadgets',
    name: 'Gadgets',
    image: 'https://images.unsplash.com/photo-1519558260268-cde7e03a0152?w=150&h=150&fit=crop'
  },
  {
    id: 'grocery',
    name: 'Grocery',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&h=150&fit=crop'
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&h=150&fit=crop'
  },
  {
    id: 'travel',
    name: 'Travel',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=150&h=150&fit=crop'
  },
  {
    id: 'beauty',
    name: 'Beauty',
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=150&h=150&fit=crop'
  },
  {
    id: 'appliances',
    name: 'Appliances',
    image: 'https://images.unsplash.com/photo-1557985594-29f7a6bf010f?w=150&h=150&fit=crop'
  }
];

const CategoryIconGrid = ({ onCategorySelect }: CategoryIconGridProps) => {
  return (
    <div className="grid grid-cols-5 md:grid-cols-10 gap-4 p-4 bg-white">
      {categoryIcons.map((category) => (
        <Button
          key={category.id}
          variant="ghost"
          className="flex flex-col items-center p-2 hover:bg-gray-50 space-y-2"
          onClick={() => onCategorySelect(category.id)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <span className="text-xs text-center line-clamp-2">{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryIconGrid; 