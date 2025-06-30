
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Product } from '../types';

interface ProductGridProps {
  selectedCategory: string;
  searchQuery: string;
  onAddToCart: (product: Product) => void;
}

const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 2456,
    description: 'Latest iPhone with advanced camera system',
    features: ['128GB Storage', 'A17 Pro Chip', 'Pro Camera System'],
    inStock: true,
    discount: 7
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24 Ultra',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
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
    name: 'Nike Air Max 270',
    price: 150,
    originalPrice: 180,
    image: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.6,
    reviews: 987,
    description: 'Comfortable running shoes with air cushioning',
    features: ['Air Max Technology', 'Breathable Mesh', 'Durable Sole'],
    inStock: true,
    discount: 17
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5 Headphones',
    price: 399,
    originalPrice: 450,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.9,
    reviews: 3241,
    description: 'Industry-leading noise canceling headphones',
    features: ['30hr Battery', 'Noise Canceling', 'Touch Controls'],
    inStock: true,
    discount: 11
  },
  {
    id: '5',
    name: 'MacBook Air M3',
    price: 1299,
    originalPrice: 1399,
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400&h=300&fit=crop',
    category: 'electronics',
    rating: 4.8,
    reviews: 1654,
    description: 'Thin, light laptop with M3 chip',
    features: ['M3 Chip', '13.6" Display', '18hr Battery'],
    inStock: true,
    discount: 7
  },
  {
    id: '6',
    name: 'Adidas Ultraboost 22',
    price: 190,
    originalPrice: 220,
    image: 'https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=400&h=300&fit=crop',
    category: 'fashion',
    rating: 4.5,
    reviews: 756,
    description: 'Premium running shoes with boost technology',
    features: ['Boost Midsole', 'Primeknit Upper', 'Continental Rubber'],
    inStock: true,
    discount: 14
  },
  {
    id: '7',
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
    id: '8',
    name: 'Gaming Chair Pro',
    price: 249,
    originalPrice: 329,
    image: 'https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop',
    category: 'home',
    rating: 4.3,
    reviews: 891,
    description: 'Ergonomic gaming chair with lumbar support',
    features: ['Lumbar Support', 'Adjustable Height', 'PU Leather'],
    inStock: true,
    discount: 24
  }
];

const ProductGrid = ({ selectedCategory, searchQuery, onAddToCart }: ProductGridProps) => {
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

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">
            {selectedCategory === 'all' ? 'All Products' : `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products`}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-0">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {product.discount && (
                    <div className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 rounded text-sm font-semibold">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center mb-2">
                    <div className="flex">{renderStars(product.rating)}</div>
                    <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  <div className="flex items-center mb-3">
                    <span className="text-2xl font-bold text-gray-800">${product.price}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>

                  <Button
                    onClick={() => onAddToCart(product)}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    disabled={!product.inStock}
                  >
                    <ShoppingCart size={16} className="mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
