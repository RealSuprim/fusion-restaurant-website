import { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Navigation, Car, Train } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';
import GoogleMap from '@/components/features/GoogleMap';

export const metadata: Metadata = {
  title: `Contact Us - ${RESTAURANT_INFO.name}`,
  description: 'Get in touch with The Fusion restaurant. Find our location, opening hours, and contact information for reservations and inquiries.',
  keywords: ['contact', 'location', 'address', 'phone', 'opening hours', 'Indian restaurant', 'Nepalese restaurant', 'Blackheath', 'London'],
  openGraph: {
    title: `Contact Us - ${RESTAURANT_INFO.name}`,
    description: 'Find our location and contact information for The Fusion restaurant in Blackheath, London.',
    type: 'website',
  },
};

export default function ContactPage() {
  const formatOpeningHours = () => {
    const days = [
      { key: 'monday', name: 'Monday' },
      { key: 'tuesday', name: 'Tuesday' },
      { key: 'wednesday', name: 'Wednesday' },
      { key: 'thursday', name: 'Thursday' },
      { key: 'friday', name: 'Friday' },
      { key: 'saturday', name: 'Saturday' },
      { key: 'sunday', name: 'Sunday' }
    ];

    return days.map(day => {
      const hours = RESTAURANT_INFO.openingHours[day.key as keyof typeof RESTAURANT_INFO.openingHours];
      return {
        day: day.name,
        hours: `${hours.open} - ${hours.close}`
      };
    });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="restaurant-gradient text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Visit us in the heart of Blackheath or get in touch for reservations and inquiries
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Contact Details */}
            <div className="space-y-6">
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Get in Touch
                  </CardTitle>
                  <CardDescription>
                    Contact us for reservations, inquiries, or special requests
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a 
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="text-primary hover:underline"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a 
                        href={`mailto:${RESTAURANT_INFO.email}`}
                        className="text-primary hover:underline"
                      >
                        {RESTAURANT_INFO.email}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">{RESTAURANT_INFO.address}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Opening Hours
                  </CardTitle>
                  <CardDescription>
                    We&apos;re open 7 days a week to serve you
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {formatOpeningHours().map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-1">
                        <span className="font-medium">{item.day}</span>
                        <span className="text-muted-foreground">{item.hours}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Map */}
            <div className="space-y-6">
              <GoogleMap
                lat={RESTAURANT_INFO.coordinates.lat}
                lng={RESTAURANT_INFO.coordinates.lng}
                zoom={16}
                height="400px"
                markerTitle={RESTAURANT_INFO.name}
              />
              
              <div className="flex gap-4">
                <Button asChild className="flex-1">
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Navigation className="h-4 w-4 mr-2" />
                    Get Directions
                  </a>
                </Button>
                <Button variant="outline" asChild className="flex-1">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${RESTAURANT_INFO.coordinates.lat},${RESTAURANT_INFO.coordinates.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    View on Maps
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Here Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Getting Here</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We&apos;re conveniently located in Blackheath with excellent transport links
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Car className="h-5 w-5" />
                  By Car
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  We&apos;re located on Lee High Road (A205) in Blackheath, with easy access from:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• A2 via Blackheath Village</li>
                  <li>• A20 via Lewisham</li>
                  <li>• South Circular (A205)</li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  <strong>Parking:</strong> Street parking available on Lee High Road and surrounding streets.
                </p>
              </CardContent>
            </Card>

            <Card className="restaurant-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Train className="h-5 w-5" />
                  By Public Transport
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-muted-foreground">
                  Excellent transport connections:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• <strong>Blackheath Station:</strong> 5-minute walk (National Rail)</li>
                  <li>• <strong>Lee Station:</strong> 3-minute walk (National Rail)</li>
                  <li>• <strong>Bus routes:</strong> 54, 89, 108, 202, 261, 273</li>
                  <li>• <strong>DLR:</strong> Lewisham (10 minutes by bus)</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Ready to Visit?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Book a table or place an order for collection. We look forward to serving you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="restaurant-primary bg-primary text-primary-foreground hover:bg-primary/90" asChild>
                <a href="/reservations">
                  Book a Table
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <a href="/order">
                  Order Online
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white" asChild>
                <a href={`tel:${RESTAURANT_INFO.phone}`}>
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}