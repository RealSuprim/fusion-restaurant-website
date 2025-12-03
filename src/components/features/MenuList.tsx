'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star, Leaf, Wheat, Filter } from 'lucide-react';
import { MenuItem, MenuCategory } from '@/lib/types';
import { cn } from '@/lib/utils';

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
    <div className="group relative p-6 rounded-xl bg-card hover:bg-accent/5 border border-border/40 hover:border-primary/20 transition-all duration-300 hover:shadow-md">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-xl font-serif font-bold text-foreground group-hover:text-primary transition-colors">
          {item.name}
        </h3>
        <span className="text-lg font-bold text-primary ml-4 font-serif">
          £{item.price.toFixed(2)}
        </span>
      </div>
      
      <p className="text-muted-foreground mb-4 leading-relaxed font-light">
        {item.description}
      </p>
      
      <div className="flex flex-wrap gap-2 items-center min-h-[24px]">
        {'spiceLevel' in item && item.spiceLevel && (
          <div className="flex items-center gap-0.5 mr-2" title={`Spice Level: ${item.spiceLevel}`}>
            {Array.from({ length: item.spiceLevel === 'hot' ? 3 : item.spiceLevel === 'medium' ? 2 : 1 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-primary fill-primary" />
            ))}
          </div>
        )}
        
        {item.isVegetarian && (
          <Badge variant="outline" className="border-green-600/30 text-green-700 bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 gap-1">
            <Leaf className="h-3 w-3" />
            Veg
          </Badge>
        )}
        {item.isVegan && (
          <Badge variant="outline" className="border-green-700/30 text-green-800 bg-green-100/50 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 gap-1">
            <Leaf className="h-3 w-3" />
            Vegan
          </Badge>
        )}
        {item.isGlutenFree && (
          <Badge variant="outline" className="border-blue-600/30 text-blue-700 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 gap-1">
            <Wheat className="h-3 w-3" />
            GF
          </Badge>
        )}
      </div>

      {showAddToCart && (
        <Button 
          onClick={() => onAddToCart?.(item)}
          className="mt-4 w-full"
          variant="secondary"
        >
          Add to Order
        </Button>
      )}
    </div>
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
    <div className="space-y-12">
      {/* Filters */}
      {showFilters && (
        <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-sm">
          <div className="flex items-center gap-2 mb-6 text-primary">
            <Filter className="h-5 w-5" />
            <h3 className="text-lg font-serif font-semibold">Refine Your Selection</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Category Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Category</label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Dietary Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Dietary Preferences</label>
              <Select value={dietaryFilter} onValueChange={setDietaryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Options" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Options</SelectItem>
                  <SelectItem value="vegetarian">Vegetarian</SelectItem>
                  <SelectItem value="vegan">Vegan</SelectItem>
                  <SelectItem value="gluten-free">Gluten Free</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Spice Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Spice Level</label>
              <Select value={spiceFilter} onValueChange={setSpiceFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Any Spice Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Spice Level</SelectItem>
                  <SelectItem value="mild">Mild</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hot">Hot</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}

      {/* Menu Items */}
      <div className="space-y-16">
        {filteredCategories.length > 0 ? (
          filteredCategories.map(category => (
            <div key={category.id} id={category.id} className="scroll-mt-24">
              <div className="flex items-center gap-4 mb-8">
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
                  {category.name}
                </h2>
                <div className="h-px bg-border flex-grow opacity-50" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {category.items.map(item => (
                  <MenuItemCard 
                    key={item.id} 
                    item={item} 
                    showAddToCart={false}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20">
            <h3 className="text-2xl font-serif font-medium text-muted-foreground mb-4">
              No items found
            </h3>
            <p className="text-muted-foreground">
              Try adjusting your filters to see more options.
            </p>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedCategory('all');
                setDietaryFilter('all');
                setSpiceFilter('all');
              }}
              className="mt-6"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}