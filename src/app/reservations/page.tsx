import { Metadata } from 'next';
import { RESTAURANT_INFO } from '@/lib/constants';
import ReservationForm from '@/components/features/ReservationForm';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, MapPin, Phone, Users } from 'lucide-react';
import { formatTime } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Reservations - ${RESTAURANT_INFO.name}`,
  description: 'Book a table at The Fusion restaurant. Reserve your dining experience with authentic Indian and Nepalese cuisine in Blackheath, London.',
  keywords: ['reservations', 'book table', 'restaurant booking', 'Indian restaurant', 'Nepalese restaurant', 'London', 'Blackheath'],
};

export default function ReservationsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-section relative py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Reserve Your Table
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Experience authentic flavors in a warm, welcoming atmosphere. Book your table today.
            </p>
          </div>
        </div>
      </section>

      {/* Reservation Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Reservation Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold mb-4">Make a Reservation</h2>
                <p className="text-lg text-muted-foreground">
                  Fill out the form below to reserve your table. We&apos;ll confirm your booking within 24 hours.
                </p>
              </div>
              <ReservationForm />
            </div>

            {/* Restaurant Information */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold mb-6">Restaurant Information</h2>
              </div>

              {/* Opening Hours */}
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Opening Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Monday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.monday.open)} - {formatTime(RESTAURANT_INFO.openingHours.monday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tuesday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.tuesday.open)} - {formatTime(RESTAURANT_INFO.openingHours.tuesday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Wednesday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.wednesday.open)} - {formatTime(RESTAURANT_INFO.openingHours.wednesday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Thursday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.thursday.open)} - {formatTime(RESTAURANT_INFO.openingHours.thursday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Friday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.friday.open)} - {formatTime(RESTAURANT_INFO.openingHours.friday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.saturday.open)} - {formatTime(RESTAURANT_INFO.openingHours.saturday.close)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span>{formatTime(RESTAURANT_INFO.openingHours.sunday.open)} - {formatTime(RESTAURANT_INFO.openingHours.sunday.close)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information */}
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    Contact Us
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      <span>{RESTAURANT_INFO.phone}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 mt-1" />
                      <span>{RESTAURANT_INFO.address}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reservation Policy */}
              <Card className="restaurant-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Reservation Policy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <p>
                      • Reservations are recommended, especially for dinner service and weekends
                    </p>
                    <p>
                      • We hold tables for 15 minutes past the reservation time
                    </p>
                    <p>
                      • For parties of 8 or more, please call us directly
                    </p>
                    <p>
                      • Cancellations can be made up to 2 hours before your reservation
                    </p>
                    <p>
                      • We welcome special dietary requirements - please mention them when booking
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 restaurant-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Questions About Your Reservation?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Our friendly staff are here to help. Give us a call or visit us in person.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Call Us Now
            </a>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}