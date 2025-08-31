import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Clock, MapPin, Phone } from 'lucide-react';
import OrderingSystem from '@/components/features/OrderingSystem';
import { RESTAURANT_INFO } from '@/lib/constants';

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
      <section className="bg-gradient-to-r from-primary/10 to-primary/5 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Order Online
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Enjoy our delicious Indian fusion cuisine from the comfort of your home.
              Choose delivery or pickup for the freshest experience.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Clock className="h-4 w-4 mr-2" />
                30-45 min delivery
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <MapPin className="h-4 w-4 mr-2" />
                Free delivery over £25
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-sm">
                <Phone className="h-4 w-4 mr-2" />
                Order by phone: {RESTAURANT_INFO.phone}
              </Badge>
            </div>
          </div>
        </div>
      </section>

      {/* Ordering System */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <OrderingSystem />
        </div>
      </section>

      {/* Delivery Information */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Delivery & Pickup Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Areas
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Free Delivery (£25+ orders)</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Greenwich (SE10)</li>
                      <li>• Blackheath (SE3)</li>
                      <li>• Lewisham (SE13)</li>
                      <li>• Deptford (SE8)</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">£2.50 Delivery Fee</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Canary Wharf (E14)</li>
                      <li>• New Cross (SE14)</li>
                      <li>• Charlton (SE7)</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Delivery Hours</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div className="flex justify-between">
                        <span>Monday - Thursday:</span>
                        <span>5:00 PM - 10:30 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Friday - Saturday:</span>
                        <span>5:00 PM - 11:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday:</span>
                        <span>5:00 PM - 10:00 PM</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Pickup Available</h4>
                    <p className="text-sm text-muted-foreground">
                      Order online and collect from our restaurant. 
                      Ready in 15-20 minutes.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Help with Your Order?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our friendly staff are here to help. Call us directly or visit our restaurant.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="restaurant-primary">
                <Phone className="h-4 w-4 mr-2" />
                Call {RESTAURANT_INFO.phone}
              </Button>
              <Button size="lg" variant="outline">
                <MapPin className="h-4 w-4 mr-2" />
                Visit Restaurant
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}