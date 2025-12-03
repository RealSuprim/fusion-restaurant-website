import { Metadata } from 'next';
import Link from 'next/link';
import { SAMPLE_MENU, RESTAURANT_INFO } from '@/lib/constants';
import MenuList from '@/components/features/MenuList';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: `Menu - ${RESTAURANT_INFO.name}`,
  description: 'Explore our authentic Indian and Nepalese cuisine menu featuring traditional dishes, vegetarian options, and signature specialties.',
  keywords: ['menu', 'Indian food', 'Nepalese cuisine', 'restaurant', 'London', 'Blackheath'],
};

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url("/assets/menu-hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in-up">
            Our Menu
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            A culinary journey through the Himalayas and the streets of India
          </p>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <MenuList categories={SAMPLE_MENU.categories} showFilters={true} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-grid-lg" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl font-bold mb-6">
            Ready to Experience the Taste?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-10 max-w-2xl mx-auto">
            Join us for an unforgettable dining experience or enjoy our food from the comfort of your home.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="font-serif text-lg px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/reservations">
                Make a Reservation
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-serif text-lg px-8 shadow-lg hover:shadow-xl transition-all"
            >
              <Link href="/order">
                Order Online
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}