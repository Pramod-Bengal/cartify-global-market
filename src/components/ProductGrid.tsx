import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '../types';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/components/ui/sonner";

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const sampleProducts: Product[] = [
  // Electronics
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.7,
    reviews: 1832,
    description: 'Premium Android smartphone with S Pen',
    features: ['256GB Storage', 'S Pen Included', 'AI Camera'],
    inStock: true,
    discount: 8
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.9,
    reviews: 3241,
    description: 'Industry-leading noise canceling headphones',
    features: ['30hr Battery', 'Noise Canceling', 'Touch Controls'],
    inStock: true,
    discount: 11
  },
  {
    id: '4',
    name: 'MacBook Air M3',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 1654,
    description: 'Thin, light laptop with M3 chip',
    features: ['M3 Chip', '13.6" Display', '18hr Battery'],
    inStock: true,
    discount: 7
  },
  {
    id: '5',
    name: 'iPad Pro 12.9"',
    price: 1099,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.6,
    reviews: 987,
    description: 'Professional tablet with M2 chip',
    features: ['M2 Chip', '12.9" Display', 'Apple Pencil Support'],
    inStock: true,
    discount: 8
  },
  {
    id: '6',
    name: 'Dell XPS 13',
    price: 1199,
    originalPrice: 1349,
    image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.5,
    reviews: 743,
    description: 'Ultra-portable Windows laptop',
    features: ['Intel i7', '16GB RAM', '512GB SSD'],
    inStock: true,
    discount: 11
  },
  {
    id: '7',
    name: 'AirPods Pro 2',
    price: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.7,
    reviews: 2156,
    description: 'Wireless earbuds with ANC',
    features: ['Active Noise Canceling', 'Spatial Audio', '6hr Battery'],
    inStock: true,
    discount: 11
  },
  {
    id: '8',
    name: 'Nintendo Switch OLED',
    price: 349,
    originalPrice: 379,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 1543,
    description: 'Portable gaming console',
    features: ['OLED Screen', 'Portable & Docked', '64GB Storage'],
    inStock: true,
    discount: 8
  },
  // Fashion
  {
    id: '10',
    name: 'Adidas Ultraboost 22',
    price: 190,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviews: 756,
    description: 'Premium running shoes with boost technology',
    features: ['Boost Midsole', 'Primeknit Upper', 'Continental Rubber'],
    inStock: true,
    discount: 14
  },
  {
    id: '11',
    name: "Levi's 501 Jeans",
    price: 89,
    originalPrice: 109,
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.4,
    reviews: 1234,
    description: 'Classic straight fit denim jeans',
    features: ['100% Cotton', 'Classic Fit', 'Button Fly'],
    inStock: true,
    discount: 18
  },
  {
    id: '12',
    name: 'Ray-Ban Aviator Sunglasses',
    price: 154,
    originalPrice: 189,
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.7,
    reviews: 892,
    description: 'Classic aviator sunglasses',
    features: ['UV Protection', 'Metal Frame', 'G-15 Lenses'],
    inStock: true,
    discount: 19
  },
  {
    id: '13',
    name: 'North Face Jacket',
    price: 199,
    originalPrice: 249,
    image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviews: 654,
    description: 'Waterproof outdoor jacket',
    features: ['Waterproof', 'Breathable', 'Multiple Pockets'],
    inStock: true,
    discount: 20
  },
  {
    id: '14',
    name: 'Champion Hoodie',
    price: 59,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.3,
    reviews: 567,
    description: 'Comfortable cotton hoodie',
    features: ['100% Cotton', 'Kangaroo Pocket', 'Embroidered Logo'],
    inStock: true,
    discount: 25
  },
  // Home & Living
  {
    id: '16',
    name: 'Modern Coffee Table',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.4,
    reviews: 423,
    description: 'Sleek wooden coffee table for modern homes',
    features: ['Solid Wood', 'Modern Design', 'Easy Assembly'],
    inStock: true,
    discount: 25
  },
  {
    id: '17',
    name: 'Gaming Chair Pro',
    price: 249,
    originalPrice: 329,
    image: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.3,
    reviews: 891,
    description: 'Ergonomic gaming chair with lumbar support',
    features: ['Lumbar Support', 'Adjustable Height', 'PU Leather'],
    inStock: true,
    discount: 24
  },
  {
    id: '18',
    name: 'Floor Lamp Modern',
    price: 129,
    originalPrice: 159,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.2,
    reviews: 234,
    description: 'Contemporary floor lamp with LED',
    features: ['LED Bulb', 'Touch Control', 'Adjustable Brightness'],
    inStock: true,
    discount: 19
  },
  {
    id: '19',
    name: 'Throw Pillow Set',
    price: 39,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.1,
    reviews: 156,
    description: 'Decorative throw pillows set of 4',
    features: ['Set of 4', 'Machine Washable', 'Multiple Colors'],
    inStock: true,
    discount: 34
  },
  {
    id: '20',
    name: 'Kitchen Knife Set',
    price: 89,
    originalPrice: 119,
    image: 'https://images.unsplash.com/photo-1593618998160-e34014e67546?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.6,
    reviews: 345,
    description: 'Professional kitchen knife set',
    features: ['High Carbon Steel', 'Ergonomic Handle', 'Knife Block'],
    inStock: true,
    discount: 25
  },
  // Sports & Fitness
  {
    id: '22',
    name: 'Yoga Mat Premium',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.0,
    reviews: 567,
    description: 'Non-slip yoga mat for all exercises',
    features: ['Non-Slip', 'Eco-Friendly', '6mm Thick'],
    inStock: true,
    discount: 29
  },
  {
    id: '23',
    name: 'Dumbbell Set Adjustable',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.2,
    reviews: 423,
    description: 'Adjustable dumbbell set 5-50lbs',
    features: ['Adjustable', 'Rubber Grip', 'Steel Plates'],
    inStock: true,
    discount: 25
  },
  {
    id: '24',
    name: 'Treadmill Folding',
    price: 799,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1595078475328-1ab05d0a6a0e?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.0,
    reviews: 234,
    description: 'Compact folding treadmill',
    features: ['Foldable', 'LCD Display', '12 Programs'],
    inStock: true,
    discount: 20
  },
  {
    id: '25',
    name: 'Resistance Bands Set',
    price: 29,
    originalPrice: 39,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.0,
    reviews: 789,
    description: 'Complete resistance bands workout set',
    features: ['5 Bands', 'Handles', 'Door Anchor'],
    inStock: true,
    discount: 26
  },
  {
    id: '26',
    name: 'Exercise Ball',
    price: 25,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1593164842264-854604db2260?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.0,
    reviews: 345,
    description: 'Anti-burst exercise stability ball',
    features: ['Anti-Burst', 'Pump Included', '65cm Diameter'],
    inStock: true,
    discount: 29
  },
  {
    id: '27',
    name: 'Protein Shaker Bottle',
    price: 15,
    originalPrice: 25,
    image: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.1,
    reviews: 456,
    description: 'Leak-proof protein shaker bottle',
    features: ['Leak-Proof', 'BPA-Free', '600ml'],
    inStock: true,
    discount: 40
  },
  {
    id: '28',
    name: 'Basketball Official Size',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&h=300&fit=crop',
    category: 'sports',
    rating: 4.0,
    reviews: 234,
    description: 'Official size and weight basketball',
    features: ['Official Size', 'Indoor/Outdoor', 'Composite Leather'],
    inStock: true,
    discount: 22
  },
  // Books
  {
    id: '29',
    name: 'The Great Gatsby',
    price: 12,
    originalPrice: 16,
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.2,
    reviews: 2345,
    description: 'Classic American literature novel',
    features: ['Paperback', 'F. Scott Fitzgerald', '1925'],
    inStock: true,
    discount: 25
  },
  {
    id: '30',
    name: 'Atomic Habits',
    price: 14,
    originalPrice: 18,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.5,
    reviews: 3456,
    description: 'Self-improvement and habit formation',
    features: ['Paperback', 'James Clear', '2018'],
    inStock: true,
    discount: 22
  },
  {
    id: '31',
    name: 'Dune',
    price: 16,
    originalPrice: 20,
    image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.0,
    reviews: 1987,
    description: 'Epic science fiction novel',
    features: ['Paperback', 'Frank Herbert', '1965'],
    inStock: true,
    discount: 20
  },
  {
    id: '32',
    name: 'Cookbook Mediterranean',
    price: 22,
    originalPrice: 30,
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.1,
    reviews: 567,
    description: 'Mediterranean cuisine recipes',
    features: ['Paperback', 'Various Authors', '2020'],
    inStock: true,
    discount: 27
  },
  {
    id: '33',
    name: 'Python Programming',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.6,
    reviews: 789,
    description: 'Learn Python programming from scratch',
    features: ['Programming', '500 Pages', 'Beginner Friendly'],
    inStock: true,
    discount: 22
  },
  {
    id: '34',
    name: 'Art of War',
    price: 10,
    originalPrice: 15,
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.4,
    reviews: 1234,
    description: 'Ancient Chinese military treatise',
    features: ['Philosophy', '128 Pages', 'Classical Text'],
    inStock: true,
    discount: 33
  },
  {
    id: '35',
    name: 'Photography Basics',
    price: 28,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.3,
    reviews: 456,
    description: 'Digital photography guide for beginners',
    features: ['Photography', '300 Pages', 'Visual Guide'],
    inStock: true,
    discount: 20
  },
  // Beauty & Health
  {
    id: '36',
    name: 'Skincare Set Complete',
    price: 89,
    originalPrice: 120,
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.5,
    reviews: 876,
    description: 'Complete skincare set for all skin types',
    features: ['Cleanser', 'Toner', 'Moisturizer'],
    inStock: true,
    discount: 26
  },
  {
    id: '37',
    name: 'Hair Dryer Professional',
    price: 159,
    originalPrice: 199,
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.4,
    reviews: 543,
    description: 'Professional hair dryer with ionic technology',
    features: ['Ionic', 'Multiple Heat Settings', 'Cool Shot'],
    inStock: true,
    discount: 20
  },
  {
    id: '38',
    name: 'Perfume Eau de Parfum',
    price: 65,
    originalPrice: 90,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.2,
    reviews: 321,
    description: 'Long-lasting fragrance',
    features: ['Eau de Parfum', '50ml', 'Unisex'],
    inStock: true,
    discount: 28
  },
  {
    id: '40',
    name: 'Makeup Brush Set',
    price: 45,
    originalPrice: 60,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.3,
    reviews: 432,
    description: 'Professional makeup brush set',
    features: ['10 Brushes', 'Synthetic Bristles', 'Travel Case'],
    inStock: true,
    discount: 25
  },
  {
    id: '41',
    name: 'Face Mask Set',
    price: 25,
    originalPrice: 35,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.1,
    reviews: 234,
    description: 'Assorted face masks for skincare',
    features: ['5 Masks', 'Hydrating', 'Brightening'],
    inStock: true,
    discount: 29
  },
  {
    id: '42',
    name: 'Vitamin C Serum',
    price: 35,
    originalPrice: 50,
    image: 'https://images.unsplash.com/photo-1517263904808-5dc0d6a3c5d8?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.2,
    reviews: 321,
    description: 'Brightening vitamin C serum',
    features: ['Vitamin C', '30ml', 'Brightening'],
    inStock: true,
    discount: 30
  },
  // Additional Electronics
  {
    id: '43',
    name: 'Smart Watch Series 9',
    price: 399,
    originalPrice: 449,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.0,
    reviews: 1234,
    description: 'Advanced fitness and health tracking',
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant'],
    inStock: true,
    discount: 11
  },
  {
    id: '44',
    name: 'Wireless Charger',
    price: 39,
    originalPrice: 59,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.0,
    reviews: 567,
    description: 'Fast wireless charging pad',
    features: ['Qi Certified', 'Fast Charging', 'LED Indicator'],
    inStock: true,
    discount: 34
  },
  // Additional Fashion
  {
    id: '45',
    name: 'Leather Wallet',
    price: 59,
    originalPrice: 79,
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.0,
    reviews: 345,
    description: 'Genuine leather bifold wallet',
    features: ['Genuine Leather', 'Bifold', 'Multiple Card Slots'],
    inStock: true,
    discount: 25
  },
  {
    id: '46',
    name: 'Designer Handbag',
    price: 199,
    originalPrice: 259,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviews: 234,
    description: 'Elegant leather handbag',
    features: ['Genuine Leather', 'Gold Hardware', 'Multiple Compartments'],
    inStock: true,
    discount: 23
  },
  // Additional Home
  {
    id: '47',
    name: 'Bed Sheet Set',
    price: 49,
    originalPrice: 69,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.2,
    reviews: 456,
    description: 'Luxury cotton bed sheet set',
    features: ['100% Cotton', 'Deep Pockets', 'Wrinkle Resistant'],
    inStock: true,
    discount: 29
  },
  {
    id: '48',
    name: 'Vacuum Cleaner Robot',
    price: 299,
    originalPrice: 399,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.4,
    reviews: 678,
    description: 'Smart robot vacuum with app control',
    features: ['App Control', 'Auto Return', 'HEPA Filter'],
    inStock: true,
    discount: 25
  },
  // Additional Books
  {
    id: '49',
    name: 'Business Strategy',
    price: 32,
    originalPrice: 40,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'books',
    rating: 4.5,
    reviews: 345,
    description: 'Modern business strategy guide',
    features: ['Business', '400 Pages', 'Case Studies'],
    inStock: true,
    discount: 20
  },
  // Additional Beauty
  {
    id: '50',
    name: 'Nail Polish Set',
    price: 29,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'beauty',
    rating: 4.1,
    reviews: 123,
    description: 'Trendy nail polish collection',
    features: ['12 Colors', 'Quick Dry', 'Long Lasting'],
    inStock: true,
    discount: 36
  }
];

const ProductGrid = ({ selectedCategory, searchQuery, onAddToCart }: ProductGridProps) => {
  const navigate = useNavigate();
  const filteredProducts = sampleProducts.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
      />
    ));
  };

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast("Added to cart!");
  };

  const handleBuyNow = () => {
    const isLoggedIn = !!localStorage.getItem('cartify_token');
    toast("Proceeding to checkout...");
    if (isLoggedIn) {
      navigate('/address');
    } else {
      navigate('/login?redirect=/address');
    }
  };

  return (
    <section className="py-6 sm:py-12 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-8 gap-2 sm:gap-0">
          <h2 className="text-xl sm:text-3xl font-bold">
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
          </h2>
          <p className="text-gray-600 text-sm sm:text-base">{filteredProducts.length} products found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={e => (e.currentTarget.src = '/placeholder.svg')}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-semibold">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-3 sm:p-4">
                  <h3 className="font-semibold text-base sm:text-lg mb-1 sm:mb-2 line-clamp-2">{product.name}</h3>
                  <div className="flex items-center mb-1 sm:mb-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="ml-2 text-xs sm:text-sm text-gray-600">({product.reviews})</span>
                  </div>
                  <div className="flex items-center mb-2 sm:mb-3">
                    <span className="text-lg sm:text-2xl font-bold text-gray-800">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-base sm:text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2">{product.description}</p>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }} className="flex-col sm:flex-row">
                    <button
                      style={{
                        background: '#ffa500',
                        color: '#fff',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px 0',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px',
                        cursor: product.inStock ? 'pointer' : 'not-allowed',
                        flex: 1,
                        justifyContent: 'center',
                        opacity: product.inStock ? 1 : 0.6
                      }}
                      disabled={!product.inStock}
                    onClick={() => handleAddToCart(product)}
                    >
                      <span style={{ marginRight: 8 }}>🛒</span> ADD TO CART
                    </button>
                    <button
                      style={{
                        background: '#ff6600',
                        color: '#fff',
                        fontWeight: 'bold',
                        border: 'none',
                        borderRadius: '4px',
                        padding: '12px 0',
                        display: 'flex',
                        alignItems: 'center',
                        fontSize: '16px',
                        cursor: product.inStock ? 'pointer' : 'not-allowed',
                        flex: 1,
                        justifyContent: 'center',
                        opacity: product.inStock ? 1 : 0.6
                      }}
                    disabled={!product.inStock}
                      onClick={handleBuyNow}
                  >
                      <span style={{ marginRight: 8 }}>⚡</span> BUY NOW
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-8 sm:py-12">
            <p className="text-base sm:text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
