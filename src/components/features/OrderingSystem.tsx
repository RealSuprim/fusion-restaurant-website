'use client';

import { useState, useMemo } from 'react';
import { MenuItem, OrderItem, Order } from '@/lib/types';
import { SAMPLE_MENU } from '@/lib/constants';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ShoppingCart, Plus, Minus, Trash2, Utensils, Search, ArrowRight, CheckCircle } from 'lucide-react';
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
  const [searchQuery, setSearchQuery] = useState('');

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

  // Filter menu items by category and search query
  const filteredMenu = useMemo(() => {
    let items = allMenuItems;
    
    if (selectedCategory !== 'all') {
      items = items.filter(item => item.category === selectedCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      items = items.filter(item => 
        item.name.toLowerCase().includes(query) || 
        item.description.toLowerCase().includes(query)
      );
    }

    return items;
  }, [selectedCategory, searchQuery, allMenuItems]);

  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const isCollection = orderType === 'pickup';
  const deliveryFee = (!isCollection && subtotal < 15) ? 2.99 : 0;
  const collectionDiscount = isCollection ? subtotal * 0.10 : 0;
  const total = subtotal + deliveryFee - collectionDiscount;

  const addToCart = (item: MenuItem, quantity: number = 1, specialInstructions?: string, selectedOption?: string) => {
    const existingItemIndex = cart.findIndex(
      cartItem => 
        cartItem.menuItem.id === item.id && 
        cartItem.specialInstructions === specialInstructions &&
        cartItem.selectedOption === selectedOption
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
        specialInstructions,
        selectedOption
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
    
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: cart,
          customerInfo,
          orderType,
          totalAmount: total,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit order');
      }

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
      setCart([]);
    } catch (error) {
      console.error('Error submitting order:', error);
      // Ideally show an error message to the user
      alert('Failed to submit order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (orderSubmitted) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center animate-fade-in-up">
        <Card className="border-2 border-green-100 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-16 h-16 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="text-2xl font-serif font-bold text-green-700 dark:text-green-400">Order Confirmed!</CardTitle>
            <CardDescription className="text-lg">
              Thank you for your order. You will receive a confirmation email shortly.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-6 pt-4">
            <div className="bg-background p-6 rounded-lg border shadow-sm inline-block min-w-[300px]">
              <p className="text-sm text-muted-foreground uppercase tracking-wide mb-1">Estimated Time</p>
              <p className="text-3xl font-bold text-primary">
                {orderType === 'delivery' ? '45-60' : '20-30'} <span className="text-base font-normal text-muted-foreground">min</span>
              </p>
            </div>
            
            <div>
              <Button onClick={() => setOrderSubmitted(false)} size="lg" className="mt-4">
                Place Another Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-6 lg:p-8">
      {/* Menu Section */}
      <div className="lg:col-span-2 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-muted/30 p-4 rounded-lg border">
          <div>
            <h2 className="text-2xl font-serif font-bold">Our Menu</h2>
            <p className="text-muted-foreground">Select items to add to your order</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
             <div className="relative w-full md:w-[200px]">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 bg-background"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-background">
                <SelectValue placeholder="Category" />
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
        </div>

        {filteredMenu.length === 0 ? (
          <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
            <Utensils className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
            <h3 className="text-lg font-medium">No items found</h3>
            <p className="text-muted-foreground">Try adjusting your search or category filter</p>
            <Button 
              variant="link" 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="mt-2"
            >
              Clear all filters
            </Button>
          </div>
        ) : (
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
        )}
      </div>

      {/* Cart and Checkout Section */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <Card className="border-border/50 shadow-lg overflow-hidden flex flex-col h-[calc(100vh-8rem)] lg:h-auto lg:max-h-[calc(100vh-8rem)]">
            <CardHeader className="bg-muted/40 pb-4">
              <CardTitle className="flex items-center justify-between font-serif">
                <span className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Your Order
                </span>
                <Badge variant="secondary" className="ml-auto">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items
                </Badge>
              </CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto p-0">
              {cart.length === 0 ? (
                <div className="text-center py-12 px-6">
                  <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                  <p className="text-lg font-medium text-muted-foreground mb-2">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground">Add delicious items from the menu to get started!</p>
                </div>
              ) : (
                <div className="divide-y divide-border/50">
                  {cart.map((item) => (
                    <div key={item.id} className="mb-4 last:mb-0 border-b pb-4 last:border-0 last:pb-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="font-medium text-sm">
                          {item.menuItem.name}
                          {item.selectedOption && (
                            <span className="text-muted-foreground"> - {item.selectedOption}</span>
                          )}
                        </span>
                        <span className="font-semibold text-sm">
                          £{(item.menuItem.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                      {item.specialInstructions && (
                        <p className="text-xs text-muted-foreground mb-2 italic bg-muted/30 p-1.5 rounded">
                          "{item.specialInstructions}"
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-2">
                        <div className="flex items-center gap-2 bg-muted/30 rounded-md p-0.5 border">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-sm hover:bg-background hover:shadow-sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="text-xs font-medium w-4 text-center">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 rounded-sm hover:bg-background hover:shadow-sm"
                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>

            {cart.length > 0 && (
              <div className="border-t bg-muted/10 p-4 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>£{subtotal.toFixed(2)}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Order Type</span>
                    <Tabs 
                      defaultValue="delivery" 
                      value={orderType} 
                      onValueChange={(v) => setOrderType(v as 'delivery' | 'pickup')}
                      className="w-[140px]"
                    >
                      <TabsList className="grid w-full grid-cols-2 h-7">
                        <TabsTrigger value="delivery" className="text-xs h-5">Delivery</TabsTrigger>
                        <TabsTrigger value="pickup" className="text-xs h-5">Pickup</TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {orderType === 'delivery' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          `£${deliveryFee.toFixed(2)}`
                        )}
                      </span>
                    </div>
                  )}

                  {orderType === 'pickup' && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Collection Discount (10%)</span>
                      <span className="text-green-600">-£{collectionDiscount.toFixed(2)}</span>
                    </div>
                  )}
                  
                  <Separator className="my-2" />
                  
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span className="text-primary">£{total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-2">
                  <h4 className="font-semibold text-sm">Customer Details</h4>
                  <Input
                    placeholder="Full Name"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    className="h-9 text-sm"
                  />
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      placeholder="Email"
                      type="email"
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                      className="h-9 text-sm"
                    />
                    <Input
                      placeholder="Mobile Number"
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                      className="h-9 text-sm"
                    />
                  </div>
                  
                  {orderType === 'delivery' && (
                    <Textarea
                      placeholder="Delivery Address"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      className="min-h-[60px] text-sm resize-none"
                    />
                  )}
                  
                  <Button 
                    className="w-full mt-2" 
                    size="lg" 
                    onClick={submitOrder}
                    disabled={isSubmitting || !validateOrder()}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                        Processing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Place Order <ArrowRight className="h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}