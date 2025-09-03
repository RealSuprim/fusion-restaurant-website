import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from 'lucide-react';
import { RESTAURANT_INFO, NAVIGATION_ITEMS } from '@/lib/constants';
import { formatTime } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Restaurant Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="restaurant-gradient rounded-lg p-2">
                <span className="text-white font-bold text-xl">TF</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl text-primary">{RESTAURANT_INFO.name}</span>
                <span className="text-sm text-muted-foreground">Indian & Nepalese Cuisine</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Experience the authentic flavors of India and Nepal in the heart of Blackheath. 
              Fresh ingredients, traditional recipes, and warm hospitality await you.
            </p>
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="/privacy"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <div className="text-sm text-muted-foreground">
                  <p>{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                <Link 
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                <Link 
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </Link>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span>Opening Hours</span>
            </h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Monday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.monday.open)} - {formatTime(RESTAURANT_INFO.openingHours.monday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tuesday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.tuesday.open)} - {formatTime(RESTAURANT_INFO.openingHours.tuesday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wednesday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.wednesday.open)} - {formatTime(RESTAURANT_INFO.openingHours.wednesday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Thursday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.thursday.open)} - {formatTime(RESTAURANT_INFO.openingHours.thursday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Friday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.friday.open)} - {formatTime(RESTAURANT_INFO.openingHours.friday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Saturday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.saturday.open)} - {formatTime(RESTAURANT_INFO.openingHours.saturday.close)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sunday</span>
                  <span className="font-medium">{formatTime(RESTAURANT_INFO.openingHours.sunday.open)} - {formatTime(RESTAURANT_INFO.openingHours.sunday.close)}</span>
                </div>
            </div>
            <div className="pt-2">
              <Button className="restaurant-primary w-full" asChild>
                <Link href="/reservations">Book a Table</Link>
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} {RESTAURANT_INFO.name}. All rights reserved.
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <span>Designed with ❤️ by <a href="https://suprim.me/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Suprim</a></span>
          </div>
        </div>
      </div>
    </footer>
  );
}