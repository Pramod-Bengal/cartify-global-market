import { Category } from '../types';

interface CategoryGridProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories: Category[] = [
  {
    id: 'electronics',
    name: 'Electronics',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=300&h=200&fit=crop',
    productCount: 2500
  },
  {
    id: 'fashion',
    name: 'Fashion',
    image: 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=300&h=200&fit=crop',
    productCount: 1800
  },
  {
    id: 'home',
    name: 'Home & Living',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&h=200&fit=crop',
    productCount: 1200
  },
  {
    id: 'sports',
    name: 'Sports & Fitness',
    image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=300&h=200&fit=crop',
    productCount: 950
  },
  {
    id: 'books',
    name: 'Books',
    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=200&fit=crop',
    productCount: 3200
  },
  {
    id: 'beauty',
    name: 'Beauty & Health',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=300&h=200&fit=crop',
    productCount: 1500
  }
];

const CategoryGrid = ({ selectedCategory, onCategorySelect }: CategoryGridProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-white">Shop by Category</h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button
            onClick={() => onCategorySelect('all')}
            className={`px-6 py-2 rounded-full transition-all ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-200'
            }`}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`px-6 py-2 rounded-full transition-all ${
                selectedCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="group cursor-pointer"
              onClick={() => onCategorySelect(category.id)}
            >
              <div className="bg-white border border-gray-200 rounded-lg p-6 text-center transition-all group-hover:shadow-lg group-hover:scale-105">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-16 h-16 mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                <p className="text-sm text-gray-600">{category.productCount}+ items</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
