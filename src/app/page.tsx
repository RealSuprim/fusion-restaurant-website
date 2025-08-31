import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Star, Utensils, Truck, Calendar } from 'lucide-react';
import { RESTAURANT_INFO, SAMPLE_MENU } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-primary/90 to-primary/70 text-white">
        <div className="absolute inset-0" style={{backgroundImage: 'url(/29e433dc-184c-40b4-9be0-d988de2d828b.jpeg)', backgroundSize: 'cover', backgroundPosition: 'center'}} />
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to {RESTAURANT_INFO.name}
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Experience the authentic flavors of India and Nepal in the heart of Blackheath. 
            Fresh ingredients, traditional recipes, and warm hospitality await you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/menu">View Our Menu</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/reservations">Book a Table</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-muted/50 py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center space-x-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Phone className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">{RESTAURANT_INFO.phone}</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="text-sm font-medium">Open Daily | See Hours</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose The Fusion?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We bring you the best of Indian and Nepalese cuisine with modern convenience
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="restaurant-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Utensils className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Authentic Cuisine</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Traditional recipes passed down through generations, prepared with the finest spices and fresh ingredients.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="restaurant-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Online Ordering</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Order online for delivery or pickup. Enjoy our delicious food from the comfort of your home.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="restaurant-card text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Calendar className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Easy Reservations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Book your table online in just a few clicks. Perfect for special occasions or casual dining.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Dishes</h2>
            <p className="text-lg text-muted-foreground">
              Taste our most popular dishes loved by our customers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SAMPLE_MENU.categories.slice(0, 2).map((category) =>
              category.items.slice(0, 2).map((item) => (
                <Card key={item.id} className="restaurant-card">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{item.name}</CardTitle>
                      <Badge variant="secondary">£{item.price}</Badge>
                    </div>
                    {'spiceLevel' in item && item.spiceLevel && (
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-current" />
                        <span className="text-sm capitalize">{item.spiceLevel} spice</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{item.description}</CardDescription>
                    {item.isVegetarian && (
                      <Badge variant="outline" className="mt-2 text-green-600 border-green-600">
                        Vegetarian
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild>
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 restaurant-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Experience The Fusion?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience or order online for delivery to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
              <Link href="/order">Order Online</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/reservations">Make Reservation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
