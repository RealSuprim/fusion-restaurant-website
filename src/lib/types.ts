// Restaurant data types
export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  isVegetarian?: boolean;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  containsNuts?: boolean;
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  options?: string[];
}

export interface MenuCategory {
  id: string;
  name: string;
  description?: string;
  items: MenuItem[];
}

export interface Reservation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status?: 'pending' | 'confirmed' | 'cancelled';
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
  selectedOption?: string;
}

export interface Order {
  id?: string;
  items: OrderItem[];
  customerInfo: {
    name: string;
    email: string;
    phone: string;
    address?: string; // For delivery
  };
  orderType: 'delivery' | 'pickup';
  totalAmount: number;
  status?: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled';
  estimatedTime?: string;
  specialInstructions?: string;
}

export interface RestaurantInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  openingHours: {
    [key: string]: {
      open: string;
      close: string;
      closed?: boolean;
    };
  };
}