import { Metadata } from 'next';
import { RESTAURANT_INFO } from '@/lib/constants';
import ReservationForm from '@/components/features/ReservationForm';
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
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
            Reserve Your Table
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Experience authentic flavors in a warm, welcoming atmosphere.
          </p>
        </div>
      </section>

      {/* Reservation Content */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Reservation Form */}
            <div className="order-2 lg:order-1">
              <div className="mb-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4 text-foreground">Make a Reservation</h2>
                <p className="text-lg text-muted-foreground font-light">
                  Fill out the form below to reserve your table. We&apos;ll confirm your booking within 24 hours.
                </p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-lg">
                <ReservationForm />
              </div>
            </div>

            {/* Restaurant Information */}
            <div className="space-y-8 order-1 lg:order-2">
              <div>
                <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-foreground">Restaurant Information</h2>
                <p className="text-muted-foreground mb-8 font-light">
                  We look forward to welcoming you. For large groups or special events, please contact us directly.
                </p>
              </div>

              {/* Opening Hours */}
              <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Clock className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Opening Hours</h3>
                </div>
                
                <div className="space-y-3 text-sm md:text-base">
                  {Object.entries(RESTAURANT_INFO.openingHours).map(([day, hours]) => (
                    <div key={day} className="flex justify-between items-center py-2 border-b border-border/50 last:border-0">
                      <span className="capitalize font-medium text-muted-foreground">{day}</span>
                      <span className="font-semibold">
                        {formatTime(hours.open)} - {formatTime(hours.close)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Contact Information */}
              <div className="bg-card border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-serif font-bold">Contact Us</h3>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <div>
                      <p className="font-medium">Address</p>
                      <p className="text-muted-foreground">{RESTAURANT_INFO.address}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href={`tel:${RESTAURANT_INFO.phone}`} className="text-muted-foreground hover:text-primary transition-colors">
                        {RESTAURANT_INFO.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Users className="h-5 w-5 text-primary shrink-0" />
                    <div>
                      <p className="font-medium">Group Bookings</p>
                      <p className="text-muted-foreground">For groups larger than 8, please call us.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}