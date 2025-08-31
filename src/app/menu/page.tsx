import { Metadata } from 'next';
import { SAMPLE_MENU, RESTAURANT_INFO } from '@/lib/constants';
import MenuList from '@/components/features/MenuList';

export const metadata: Metadata = {
  title: `Menu - ${RESTAURANT_INFO.name}`,
  description: 'Explore our authentic Indian and Nepalese cuisine menu featuring traditional dishes, vegetarian options, and signature specialties.',
  keywords: ['menu', 'Indian food', 'Nepalese cuisine', 'restaurant', 'London', 'Blackheath'],
};



export default function MenuPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero-section relative py-20">
        <div className="absolute inset-0 bg-black/50" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our Menu
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto">
              Discover authentic flavors from India and Nepal, crafted with traditional recipes and fresh ingredients
            </p>
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <MenuList categories={SAMPLE_MENU.categories} showFilters={true} />
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 restaurant-gradient">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Ready to Order?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Experience these authentic flavors at our restaurant or order online for delivery and pickup
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/reservations"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-primary font-semibold rounded-lg hover:bg-gray-100 transition-colors"
            >
              Make a Reservation
            </a>
            <a
              href="/order"
              className="inline-flex items-center justify-center px-8 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              Order Online
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}