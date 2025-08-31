'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Minus, ShoppingCart, Leaf, Wheat, Flame } from 'lucide-react';
import { MenuItem } from '@/lib/types';
import Image from 'next/image';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart?: (item: MenuItem, quantity: number, specialInstructions?: string) => void;
  showAddToCart?: boolean;
}

export default function MenuItemCard({ item, onAddToCart, showAddToCart = false }: MenuItemCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(item, quantity, specialInstructions || undefined);
      setQuantity(1);
      setSpecialInstructions('');
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
            <Badge variant="secondary" className="text-xs">
              <Leaf className="h-3 w-3 mr-1" />
              Vegetarian
            </Badge>
          )}
          {item.isVegan && (
            <Badge variant="secondary" className="text-xs">
              <Leaf className="h-3 w-3 mr-1" />
              Vegan
            </Badge>
          )}
          {item.isGlutenFree && (
            <Badge variant="secondary" className="text-xs">
              <Wheat className="h-3 w-3 mr-1" />
              Gluten Free
            </Badge>
          )}
          {'spiceLevel' in item && item.spiceLevel && (
            <Badge variant="outline" className="text-xs">
              {getSpiceIcon(item.spiceLevel)}
              <span className="ml-1 capitalize">{item.spiceLevel}</span>
            </Badge>
          )}
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
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>{item.name}</DialogTitle>
                <DialogDescription>
                  £{item.price.toFixed(2)} each
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Quantity</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-medium">{quantity}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions (Optional)</Label>
                  <Input
                    id="instructions"
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="e.g., extra spicy, no onions"
                  />
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="text-lg font-bold">
                    Total: £{(item.price * quantity).toFixed(2)}
                  </div>
                  <Button onClick={handleAddToCart} className="restaurant-primary">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
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