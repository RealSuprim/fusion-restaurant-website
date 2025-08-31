'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Leaf, Wheat, Filter } from 'lucide-react';
import { MenuItem, MenuCategory } from '@/lib/types';

interface MenuListProps {
  categories: MenuCategory[];
  showFilters?: boolean;
}

interface MenuItemCardProps {
  item: MenuItem;
  showAddToCart?: boolean;
  onAddToCart?: (item: MenuItem) => void;
}

function MenuItemCard({ item, showAddToCart = false, onAddToCart }: MenuItemCardProps) {
  return (
    <Card className="restaurant-card h-full">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{item.name}</CardTitle>
          <Badge variant="secondary" className="text-lg font-semibold">
            £{item.price.toFixed(2)}
          </Badge>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {'spiceLevel' in item && item.spiceLevel && (
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-yellow-500 fill-current" />
              <span className="text-sm capitalize">{item.spiceLevel}</span>
            </div>
          )}
          {item.isVegetarian && (
            <Badge variant="outline" className="text-green-600 border-green-600">
              <Leaf className="h-3 w-3 mr-1" />
              Vegetarian
            </Badge>
          )}
          {item.isVegan && (
            <Badge variant="outline" className="text-green-700 border-green-700">
              <Leaf className="h-3 w-3 mr-1" />
              Vegan
            </Badge>
          )}
          {item.isGlutenFree && (
            <Badge variant="outline" className="text-blue-600 border-blue-600">
              <Wheat className="h-3 w-3 mr-1" />
              Gluten Free
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base mb-4">{item.description}</CardDescription>
        {showAddToCart && (
          <Button 
            onClick={() => onAddToCart?.(item)}
            className="w-full restaurant-primary"
          >
            Add to Cart
          </Button>
        )}
      </CardContent>
    </Card>
  );
}

export default function MenuList({ categories, showFilters = false }: MenuListProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [dietaryFilter, setDietaryFilter] = useState<string>('all');
  const [spiceFilter, setSpiceFilter] = useState<string>('all');

  // Filter items based on selected filters
  const filteredCategories = categories.map(category => ({
    ...category,
    items: category.items.filter(item => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      
      // Dietary filter
      if (dietaryFilter === 'vegetarian' && !item.isVegetarian) {
        return false;
      }
      if (dietaryFilter === 'vegan' && !item.isVegan) {
        return false;
      }
      if (dietaryFilter === 'gluten-free' && !item.isGlutenFree) {
        return false;
      }
      
      // Spice filter
      if (spiceFilter !== 'all' && (!('spiceLevel' in item) || item.spiceLevel !== spiceFilter)) {
        return false;
      }
      
      return true;
    })
  })).filter(category => category.items.length > 0);

  const handleAddToCart = (item: MenuItem) => {
    // This will be implemented when we create the ordering system
    console.log('Adding to cart:', item);
  };

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <div className="mb-8 p-6 bg-card rounded-lg border">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-semibold">Filter Menu</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Dietary Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Dietary</label>
              <select 
                value={dietaryFilter} 
                onChange={(e) => setDietaryFilter(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="all">All Options</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="vegan">Vegan</option>
                <option value="gluten-free">Gluten Free</option>
              </select>
            </div>
            
            {/* Spice Filter */}
            <div>
              <label className="block text-sm font-medium mb-2">Spice Level</label>
              <select 
                value={spiceFilter} 
                onChange={(e) => setSpiceFilter(e.target.value)}
                className="w-full p-2 border rounded-md bg-background"
              >
                <option value="all">All Levels</option>
                <option value="mild">Mild</option>
                <option value="medium">Medium</option>
                <option value="hot">Hot</option>
                <option value="very-hot">Very Hot</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Menu Categories */}
      {filteredCategories.map((category, categoryIndex) => (
        <div key={category.id} className={categoryIndex > 0 ? 'mt-16' : ''}>
          {/* Category Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {category.name}
            </h2>
            {category.description && (
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {category.description}
              </p>
            )}
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {category.items.map((item) => (
              <MenuItemCard 
                key={item.id} 
                item={item} 
                showAddToCart={showFilters}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>
        </div>
      ))}
      
      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No items match your current filters. Try adjusting your selection.
          </p>
        </div>
      )}
    </div>
  );
}