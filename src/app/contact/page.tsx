import { Metadata } from 'next';
import { MapPin, Phone, Mail, Clock, Navigation, Car, Train } from 'lucide-react';
import { RESTAURANT_INFO } from '@/lib/constants';
import { formatTime } from '@/lib/utils';

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
        hours: `${formatTime(hours.open)} - ${formatTime(hours.close)}`
      };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-4 animate-fade-in-up">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16">
            {/* Contact Details */}
            <div className="space-y-8">
              <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">Get in Touch</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium mb-1">Phone</p>
                      <a 
                        href={`tel:${RESTAURANT_INFO.phone}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {RESTAURANT_INFO.phone}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium mb-1">Email</p>
                      <a 
                        href={`mailto:${RESTAURANT_INFO.email}`}
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {RESTAURANT_INFO.email}
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">Address</p>
                      <p className="text-muted-foreground">{RESTAURANT_INFO.address}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border rounded-xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Navigation className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold">How to Find Us</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Train className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">By Train</p>
                      <p className="text-muted-foreground">
                        We are a 10-minute walk from Blackheath Station and Lewisham Station.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Car className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <p className="font-medium mb-1">By Car</p>
                      <p className="text-muted-foreground">
                        Street parking is available on Lee High Road and surrounding streets. 
                        Please check local parking restrictions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="bg-card/50 backdrop-blur-sm border rounded-2xl p-6 md:p-8 shadow-lg h-fit">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-primary/10 rounded-full text-primary">
                  <Clock className="h-6 w-6" />
                </div>
                <h2 className="text-2xl font-serif font-bold">Opening Hours</h2>
              </div>

              <div className="space-y-4">
                {formatOpeningHours().map((item) => (
                  <div 
                    key={item.day}
                    className="flex justify-between items-center py-3 border-b border-border/50 last:border-0"
                  >
                    <span className="font-medium">{item.day}</span>
                    <span className="text-muted-foreground font-light">{item.hours}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-lg border border-primary/10">
                <p className="text-center text-sm text-muted-foreground">
                  Kitchen closes 30 minutes before restaurant closing time.
                </p>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="rounded-2xl overflow-hidden shadow-lg border h-[400px] md:h-[500px] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2486.054980282954!2d0.003339176913645646!3d51.45708097180169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a85793946c6f%3A0x31240b63889191!2s221%20Lee%20High%20Rd%2C%20London%20SE13%205PQ!5e0!3m2!1sen!2suk!4v1709684123456!5m2!1sen!2suk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}