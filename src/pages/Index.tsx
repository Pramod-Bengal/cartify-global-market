import { useState, useRef, useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import { Product, CartItem } from '../types';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartify_cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categoryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cartify_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      setCartItems(prev => prev.filter(item => item.id !== id));
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalAmount = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category === 'all' ? 'all' : category);
    // Use a setTimeout to allow state update and re-render before scrolling
    setTimeout(() => {
      categoryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  };

  const handleShopNow = () => {
    categoryRef.current?.scrollIntoView({ behavior: 'smooth' });
    setSelectedCategory('all');
  };

  return (
    <div className="min-h-screen">
      <Header
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />

      <main>
        {/* Blue/Black Background Section */}
        <div className="bg-gradient-to-b from-slate-950 via-blue-900 to-blue-700 pb-12">
          <Hero onShopNow={handleShopNow} />
          <div ref={categoryRef} className="pt-4">
            <CategoryGrid
              selectedCategory={selectedCategory}
              onCategorySelect={handleCategorySelect}
            />
          </div>
        </div>

        {/* White Background Section for Products */}
        <div className="bg-gray-50 min-h-screen">
          <ProductGrid
            selectedCategory={selectedCategory}
            searchQuery={searchQuery}
            onAddToCart={addToCart}
          />
        </div>
      </main>

      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        totalAmount={getTotalAmount()}
      />
    </div>
  );
};

export default Index;
