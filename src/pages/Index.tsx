import { useState } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryGrid from '../components/CategoryGrid';
import ProductGrid from '../components/ProductGrid';
import Cart from '../components/Cart';
import { Product, CartItem } from '../types';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

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
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        cartItemCount={getTotalItems()}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        searchQuery={searchQuery}
      />
      
      <main>
        <Hero />
        
        <CategoryGrid 
          selectedCategory={selectedCategory}
          onCategorySelect={handleCategorySelect}
        />
        
        <ProductGrid
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onAddToCart={addToCart}
        />
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
