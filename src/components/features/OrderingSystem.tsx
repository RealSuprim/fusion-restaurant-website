'use client';

import { useState, useMemo } from 'react';
import { MenuItem, OrderItem, Order } from '@/lib/types';
import { SAMPLE_MENU } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react';
import MenuItemCard from '@/components/features/MenuItemCard';

interface CartItem extends OrderItem {
  id: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

export default function OrderingSystem() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'delivery' | 'pickup'>('delivery');
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Flatten menu items from all categories
  const allMenuItems = useMemo(() => {
    const items: MenuItem[] = [];
    SAMPLE_MENU.categories.forEach(category => {
      category.items.forEach(item => {
        items.push(item);
      });
    });
    return items;
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const cats = SAMPLE_MENU.categories.map(category => category.id);
    return ['all', ...cats];
  }, []);

  // Filter menu items by category
  const filteredMenu = useMemo(() => {
    if (selectedCategory === 'all') return allMenuItems;
    return allMenuItems.filter(item => item.category === selectedCategory);
  }, [selectedCategory, allMenuItems]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const deliveryFee = orderType === 'delivery' ? 2.99 : 0;
  const total = subtotal + deliveryFee;

  const addToCart = (item: MenuItem, quantity: number = 1, specialInstructions?: string) => {
    const existingItemIndex = cart.findIndex(
      cartItem => cartItem.menuItem.id === item.id && cartItem.specialInstructions === specialInstructions
    );

    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += quantity;
      setCart(updatedCart);
    } else {
      const newItem: CartItem = {
        id: `${item.id}-${Date.now()}`,
        menuItem: item,
        quantity,
        specialInstructions
      };
      setCart([...cart, newItem]);
    }
  };

  const updateCartItemQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCart(cart.filter(item => item.id !== itemId));
    } else {
      setCart(cart.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeFromCart = (itemId: string) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  const validateOrder = (): boolean => {
    if (cart.length === 0) return false;
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) return false;
    if (orderType === 'delivery' && !customerInfo.address) return false;
    return true;
  };

  const submitOrder = async () => {
    if (!validateOrder()) return;

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const order: Order = {
      id: `order-${Date.now()}`,
      items: cart,
      customerInfo,
      orderType,
      totalAmount: total,
      status: 'pending',
      estimatedTime: orderType === 'delivery' ? '45-60 minutes' : '20-30 minutes'
    };

    console.log('Order submitted:', order);
    setOrderSubmitted(true);
    setIsSubmitting(false);
    setCart([]);
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-green-600">Order Confirmed!</CardTitle>
            <CardDescription>
              Thank you for your order. You will receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4">
              Estimated {orderType === 'delivery' ? 'delivery' : 'pickup'} time: 
              <strong> {orderType === 'delivery' ? '45-60 minutes' : '20-30 minutes'}</strong>
            </p>
            <Button onClick={() => setOrderSubmitted(false)}>
              Place Another Order
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Our Menu</h2>
            
            {/* Category Filter */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full max-w-xs">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category: string) => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredMenu.map((item: MenuItem) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onAddToCart={addToCart}
                showAddToCart={true}
              />
            ))}
          </div>
        </div>

        {/* Cart and Checkout Section */}
        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                Your Order ({cart.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {cart.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  Your cart is empty
                </p>
              ) : (
                <>
                  {/* Order Type Selection */}
                  <Tabs value={orderType} onValueChange={(value: string) => setOrderType(value as 'delivery' | 'pickup')} className="mb-4">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="delivery">Delivery</TabsTrigger>
                      <TabsTrigger value="pickup">Pickup</TabsTrigger>
                    </TabsList>
                  </Tabs>

                  {/* Cart Items */}
                  <div className="space-y-4 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-start p-3 border rounded-lg">
                        <div className="flex-1">
                          <h4 className="font-medium">{item.menuItem.name}</h4>
                          <p className="text-sm text-muted-foreground">£{item.menuItem.price.toFixed(2)} each</p>
                          {item.specialInstructions && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Note: {item.specialInstructions}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Order Summary */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>£{subtotal.toFixed(2)}</span>
                    </div>
                    {orderType === 'delivery' && (
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>£{deliveryFee.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total:</span>
                      <span>£{total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  {/* Customer Information */}
                  <div className="space-y-4">
                    <h3 className="font-medium">Customer Information</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        placeholder="Your full name"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        placeholder="your@email.com"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        placeholder="Your phone number"
                      />
                    </div>

                    {orderType === 'delivery' && (
                      <div className="space-y-2">
                        <Label htmlFor="address">Delivery Address *</Label>
                        <Textarea
                          id="address"
                          value={customerInfo.address}
                          onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                          placeholder="Your full delivery address"
                          rows={3}
                        />
                      </div>
                    )}
                  </div>

                  <Button 
                    className="w-full mt-6" 
                    onClick={submitOrder}
                    disabled={!validateOrder() || isSubmitting}
                  >
                    {isSubmitting ? 'Processing...' : `Place Order - £${total.toFixed(2)}`}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}