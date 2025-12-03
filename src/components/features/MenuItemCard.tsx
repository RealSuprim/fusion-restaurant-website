'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Minus, ShoppingCart, Leaf, Wheat, Flame } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import Image from 'next/image';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem, quantity: number, specialInstructions?: string, selectedOption?: string) => void;
  showAddToCart?: boolean;
}

export default function MenuItemCard({ item, onAddToCart, showAddToCart = false }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedOption, setSelectedOption] = useState<string | undefined>(undefined);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      if (item.options && !selectedOption) {
        return; // Prevent adding without selection
      }
      onAddToCart(item, quantity, specialInstructions || undefined, selectedOption);
      setQuantity(1);
      setSpecialInstructions('');
      setSelectedOption(undefined);
      setIsDialogOpen(false);
    }
  };

  const getSpiceIcon = (level: string) => {
    const count = {
      'mild': 1,
      'medium': 2,
      'hot': 3,
      'very-hot': 4
    }[level] || 0;

    return (
      <div className="flex items-center gap-1">
        {Array.from({ length: 4 }, (_, i) => (
          <Flame
            key={i}
            className={`h-3 w-3 ${
              i < count ? 'text-red-500 fill-current' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card className="restaurant-card h-full flex flex-col">
      {item.image && (
        <div className="relative h-48 w-full">
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover rounded-t-lg"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-tight">{item.name}</CardTitle>
          <div className="text-lg font-bold text-primary whitespace-nowrap">
            £{item.price.toFixed(2)}
          </div>
        </div>
        
        <CardDescription className="text-sm line-clamp-2">
          {item.description}
        </CardDescription>
        
        <div className="flex flex-wrap gap-2 mt-2">
          {item.isVegetarian && (
            <Badge variant="outline" className="border-green-600/30 text-green-700 bg-green-50/50 dark:bg-green-900/10 hover:bg-green-100 dark:hover:bg-green-900/20 gap-1 text-xs">
              <Leaf className="h-3 w-3" />
              Veg
            </Badge>
          )}
          {item.isVegan && (
            <Badge variant="outline" className="border-green-700/30 text-green-800 bg-green-100/50 dark:bg-green-900/20 hover:bg-green-200 dark:hover:bg-green-900/30 gap-1 text-xs">
              <Leaf className="h-3 w-3" />
              Vegan
            </Badge>
          )}
          {'isGlutenFree' in item && item.isGlutenFree && (
            <Badge variant="outline" className="border-blue-600/30 text-blue-700 bg-blue-50/50 dark:bg-blue-900/10 hover:bg-blue-100 dark:hover:bg-blue-900/20 gap-1 text-xs">
              <Wheat className="h-3 w-3" />
              GF
            </Badge>
          )}
          {'spiceLevel' in item && item.spiceLevel && getSpiceIcon(item.spiceLevel)}
        </div>
      </CardHeader>
      
      {showAddToCart && onAddToCart && (
        <CardContent className="pt-0">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full restaurant-primary">
                <Plus className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogDescription>
                  £{item.price.toFixed(2)} each
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-lg font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {item.options && (
                  <div className="space-y-2">
                    <Label htmlFor="option">Select Option</Label>
                    <Select
                      value={selectedOption}
                      onValueChange={setSelectedOption}
                    >
                      <SelectTrigger id="option">
                        <SelectValue placeholder="Select an option" />
                      </SelectTrigger>
                      <SelectContent>
                        {item.options?.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div className="grid gap-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Input
                    id="instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g., extra spicy, no onions"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t gap-4">
                  <div className="text-lg font-bold whitespace-nowrap">
                    Total: £{(item.price * quantity).toFixed(2)}
                  </div>
                  <Button 
                    onClick={handleAddToCart}
                    disabled={!!item.options && !selectedOption}
                    className="w-auto px-6 restaurant-primary"
                    size="sm"
                  >
                    Add to Order
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardContent>
      )}
    </Card>
  );
}