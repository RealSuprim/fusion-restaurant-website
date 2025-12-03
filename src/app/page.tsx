import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Star, Utensils, Truck, Calendar, ArrowRight } from 'lucide-react';
import { RESTAURANT_INFO, SAMPLE_MENU } from '@/lib/constants';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 z-10" />
          <div 
            className="w-full h-full bg-cover bg-center transform scale-105 animate-slow-zoom"
            style={{backgroundImage: 'url(https://i.postimg.cc/V6V0NFKm/PHOTO-2025-08-29-12-20-20.jpg)'}} 
          />
        </div>
        
        <div className="relative z-20 container mx-auto px-4 text-center text-white">
          <div className="animate-fade-in-up space-y-6">
            <span className="uppercase tracking-[0.2em] text-secondary text-sm md:text-base font-medium mb-4 block">
              Authentic Nepalese & Indian Cuisine
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-lg">
              Welcome to <br />
              <span className="text-primary-foreground">{RESTAURANT_INFO.name}</span>
            </h1>
            <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto font-light text-gray-100 leading-relaxed">
              Experience the authentic flavors of the Himalayas in the heart of Blackheath. 
              Where tradition meets modern culinary art.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                <Link href="/menu">View Our Menu</Link>
              </Button>
              <Button size="lg" className="bg-white/10 backdrop-blur-sm border-2 border-white/50 hover:bg-white hover:text-primary text-white px-8 py-6 text-lg rounded-full shadow-xl hover:shadow-2xl transition-all duration-300" asChild>
                <Link href="/reservations">Book a Table</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Bar */}
      <section className="bg-primary text-primary-foreground py-8 relative z-30 -mt-10 mx-4 rounded-xl shadow-2xl max-w-6xl lg:mx-auto hidden md:block">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-x divide-primary-foreground/20">
            <div className="flex flex-col items-center justify-center space-y-2 text-center px-4">
              <MapPin className="h-6 w-6 text-secondary mb-1" />
              <span className="text-lg font-serif font-medium">Find Us</span>
              <span className="text-sm opacity-90">{RESTAURANT_INFO.address}</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center px-4">
              <Phone className="h-6 w-6 text-secondary mb-1" />
              <span className="text-lg font-serif font-medium">Contact Us</span>
              <span className="text-sm opacity-90">{RESTAURANT_INFO.phone}</span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2 text-center px-4">
              <Clock className="h-6 w-6 text-secondary mb-1" />
              <span className="text-lg font-serif font-medium">Opening Hours</span>
              <div className="flex flex-col text-sm opacity-90">
                <span>Mon-Fri: 17:00 - 23:00</span>
                <span>Sat-Sun: 12:00 - 23:00</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-secondary font-medium tracking-wider uppercase text-sm">Our Promise</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 mb-6 text-foreground">Why Choose The Fusion?</h2>
            <div className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We bring you the best of Indian and Nepalese cuisine with modern convenience, 
              blending traditional spices with contemporary presentation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: Utensils,
                title: "Authentic Cuisine",
                description: "Traditional recipes passed down through generations, prepared with the finest spices and fresh ingredients."
              },
              {
                icon: Truck,
                title: "Online Ordering",
                description: "Order online for delivery or pickup. Enjoy our delicious food from the comfort of your home."
              },
              {
                icon: Calendar,
                title: "Easy Reservations",
                description: "Book your table online in just a few clicks. Perfect for special occasions or casual dining."
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur-sm group">
                  <CardHeader className="text-center pt-10">
                    <div className="mx-auto mb-6 p-4 bg-primary/5 rounded-full w-fit group-hover:bg-primary/10 transition-colors">
                      <Icon className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="text-2xl font-serif group-hover:text-primary transition-colors">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center pb-10 px-8">
                    <CardDescription className="text-base leading-relaxed">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <span className="text-secondary font-medium tracking-wider uppercase text-sm">Taste the Difference</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mt-2 text-foreground">Featured Dishes</h2>
            </div>
            <Button variant="outline" className="hidden md:flex gap-2 border-primary/20 hover:border-primary hover:bg-primary/5 hover:text-primary" asChild>
              <Link href="/menu">View Full Menu <ArrowRight className="w-4 h-4" /></Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SAMPLE_MENU.categories.slice(0, 2).map((category) =>
              category.items.slice(0, 2).map((item) => (
                <Card key={item.id} className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
                  <CardHeader className="p-6 pb-2">
                    <div className="flex justify-between items-start gap-4">
                      <CardTitle className="text-xl font-serif font-bold group-hover:text-primary transition-colors">{item.name}</CardTitle>
                      <span className="text-lg font-bold text-primary whitespace-nowrap">£{item.price}</span>
                    </div>
                    {'spiceLevel' in item && item.spiceLevel && (
                      <div className="flex items-center space-x-1 text-amber-500 mt-1">
                        <Star className="h-3.5 w-3.5 fill-current" />
                        <span className="text-xs font-medium uppercase tracking-wide opacity-90">{item.spiceLevel} spice</span>
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="p-6 pt-2 flex-grow">
                    <CardDescription className="text-base line-clamp-3 leading-relaxed">
                      {item.description}
                    </CardDescription>
                    <div className="flex gap-2 mt-4 flex-wrap">
                      {item.isVegetarian && (
                        <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 border-transparent">
                          Vegetarian
                        </Badge>
                      )}
                      {item.isVegan && (
                        <Badge variant="secondary" className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400 hover:bg-emerald-200 border-transparent">
                          Vegan
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          <div className="text-center mt-12 md:hidden">
            <Button size="lg" className="w-full sm:w-auto bg-primary text-primary-foreground" asChild>
              <Link href="/menu">View Full Menu</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 relative overflow-hidden bg-foreground text-background">
        <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url(/pattern-bg.png)'}}></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6 text-background">
            Ready to Experience The Fusion?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-background/80 font-light">
            Join us for an unforgettable dining experience or order online for delivery to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-xl transition-transform hover:scale-105" asChild>
              <Link href="/order">Order Online</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-background/30 text-background hover:bg-background hover:text-foreground px-8 py-6 text-lg rounded-full bg-transparent transition-transform hover:scale-105" asChild>
              <Link href="/reservations">Make Reservation</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
