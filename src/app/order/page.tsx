import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, Phone, Truck, Utensils, ShoppingBag } from 'lucide-react';
import OrderingSystem from '@/components/features/OrderingSystem';
import { RESTAURANT_INFO } from '@/lib/constants';
import { formatTime } from '@/lib/utils';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Order Online - Fusion Restaurant',
  description: 'Order delicious Indian fusion cuisine for delivery or pickup. Fast, convenient, and fresh food delivered to your door.',
  keywords: ['order online', 'food delivery', 'pickup', 'Indian food', 'fusion cuisine', 'Greenwich'],
  openGraph: {
    title: 'Order Online - Fusion Restaurant',
    description: 'Order delicious Indian fusion cuisine for delivery or pickup.',
    type: 'website',
  },
};

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative container mx-auto px-4 text-center text-white z-10">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-6 animate-fade-in-up">
            Order Online
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Delicious Indian fusion cuisine delivered to your doorstep or ready for pickup.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Badge variant="secondary" className="px-4 py-2 text-base bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
              <Clock className="h-4 w-4 mr-2" />
              30-45 min delivery
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
              <Truck className="h-4 w-4 mr-2" />
              Free delivery over £15
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
              <Utensils className="h-4 w-4 mr-2" />
              Freshly Prepared
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-base bg-white/10 hover:bg-white/20 text-white border-none backdrop-blur-sm">
              <ShoppingBag className="h-4 w-4 mr-2" />
              On collection 10% discount
            </Badge>
          </div>
        </div>
      </section>

      {/* Ordering System */}
      <section className="py-12 md:py-16 -mt-10 relative z-20">
        <div className="container mx-auto px-4">
          <div className="bg-background rounded-xl shadow-xl border border-border/50 overflow-hidden">
            <OrderingSystem />
          </div>
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Delivery & Pickup Information</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                We deliver to Greenwich and surrounding areas. Check our delivery zones and operating hours below.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Delivery Areas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-3 flex items-center text-green-600 dark:text-green-400">
                      <Truck className="h-4 w-4 mr-2" />
                      Free Delivery (£15+ orders)
                    </h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Greenwich (SE10)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Blackheath (SE3)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Lewisham (SE13)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Deptford (SE8)</li>
                    </ul>
                  </div>
                  <div className="p-4 rounded-lg bg-muted/50">
                    <h4 className="font-semibold mb-3 flex items-center text-primary">
                      <Truck className="h-4 w-4 mr-2" />
                      £2.99 Delivery Fee
                    </h4>
                    <ul className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Canary Wharf (E14)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>New Cross (SE14)</li>
                      <li className="flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 mr-2"/>Charlton (SE7)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-2xl">Opening Hours</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Delivery & Pickup Hours</h4>
                    <div className="space-y-3 text-sm">
                      {[
                        { day: 'Monday', time: `${formatTime(RESTAURANT_INFO.openingHours.monday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.monday.close)}` },
                        { day: 'Tuesday', time: `${formatTime(RESTAURANT_INFO.openingHours.tuesday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.tuesday.close)}` },
                        { day: 'Wednesday', time: `${formatTime(RESTAURANT_INFO.openingHours.wednesday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.wednesday.close)}` },
                        { day: 'Thursday', time: `${formatTime(RESTAURANT_INFO.openingHours.thursday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.thursday.close)}` },
                        { day: 'Friday', time: `${formatTime(RESTAURANT_INFO.openingHours.friday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.friday.close)}` },
                        { day: 'Saturday', time: `${formatTime(RESTAURANT_INFO.openingHours.saturday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.saturday.close)}` },
                        { day: 'Sunday', time: `${formatTime(RESTAURANT_INFO.openingHours.sunday.open)} - ${formatTime(RESTAURANT_INFO.openingHours.sunday.close)}` },
                      ].map((item) => (
                        <div key={item.day} className="flex justify-between items-center border-b border-border/50 pb-2 last:border-0 last:pb-0">
                          <span className="font-medium">{item.day}</span>
                          <span className="text-muted-foreground">{item.time}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                    <h4 className="font-semibold mb-2 flex items-center text-primary">
                      <ShoppingBagIcon className="h-4 w-4 mr-2" />
                      Pickup Available
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Order online and collect from our restaurant. 
                      Typically ready in 15-20 minutes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Help with Your Order?</h2>
            <p className="text-lg text-primary-foreground/90 mb-8">
              Our friendly staff are here to help. Call us directly or visit our restaurant if you have any questions or special requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="font-semibold text-primary hover:bg-white/90" asChild>
                <a href={`tel:${RESTAURANT_INFO.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call {RESTAURANT_INFO.phone}
                </a>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/contact">
                  <MapPin className="h-4 w-4 mr-2" />
                  Visit Restaurant
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}