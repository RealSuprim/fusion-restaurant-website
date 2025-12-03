import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';
import { RESTAURANT_INFO, NAVIGATION_ITEMS } from '@/lib/constants';
import { formatTime } from '@/lib/utils';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-background pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Restaurant Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/assets/logo.svg"
                alt={`${RESTAURANT_INFO.name} Logo`}
                width={180}
                height={60}
                className="w-auto h-16 invert dark:invert-0"
                priority
              />
            </Link>
            <p className="text-background/70 leading-relaxed">
              Experience the authentic flavors of India and Nepal in the heart of Blackheath. 
              Fresh ingredients, traditional recipes, and warm hospitality await you.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full border-background/20 bg-background/5 hover:bg-primary hover:border-primary text-background hover:text-background transition-colors" asChild>
                <Link href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-4 w-4" />
                  <span className="sr-only">Facebook</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-background/20 bg-background/5 hover:bg-primary hover:border-primary text-background hover:text-background transition-colors" asChild>
                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-4 w-4" />
                  <span className="sr-only">Instagram</span>
                </Link>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full border-background/20 bg-background/5 hover:bg-primary hover:border-primary text-background hover:text-background transition-colors" asChild>
                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-4 w-4" />
                  <span className="sr-only">Twitter</span>
                </Link>
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-background relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <nav className="flex flex-col space-y-3">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-background/70 hover:text-primary transition-colors flex items-center group"
                >
                  <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                  {item.name}
                </Link>
              ))}
              <Link
                href="/privacy"
                className="text-background/70 hover:text-primary transition-colors flex items-center group"
              >
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-background/70 hover:text-primary transition-colors flex items-center group"
              >
                <span className="w-0 group-hover:w-2 h-0.5 bg-primary mr-0 group-hover:mr-2 transition-all duration-300"></span>
                Terms & Conditions
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-background relative inline-block">
              Contact Us
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-3 group">
                <div className="p-2 bg-background/5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div className="text-background/70 group-hover:text-background transition-colors">
                  <p>{RESTAURANT_INFO.address}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-background/5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <Link 
                  href={`tel:${RESTAURANT_INFO.phone}`}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {RESTAURANT_INFO.phone}
                </Link>
              </div>
              <div className="flex items-center space-x-3 group">
                <div className="p-2 bg-background/5 rounded-full group-hover:bg-primary/20 transition-colors">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <Link 
                  href={`mailto:${RESTAURANT_INFO.email}`}
                  className="text-background/70 hover:text-background transition-colors"
                >
                  {RESTAURANT_INFO.email}
                </Link>
              </div>
            </div>
          </div>
          
          {/* Opening Hours */}
          <div className="space-y-6">
            <h3 className="font-serif font-bold text-xl text-background relative inline-block">
              Opening Hours
              <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
            </h3>
            <div className="space-y-3 text-background/70">
              <div className="flex justify-between items-center border-b border-background/10 pb-2">
                <span>Mon - Fri</span>
                <span className="text-background">{formatTime(RESTAURANT_INFO.openingHours.monday.open)} - {formatTime(RESTAURANT_INFO.openingHours.monday.close)}</span>
              </div>
              <div className="flex justify-between items-center pb-2">
                <span>Sat & Sun</span>
                <span className="text-background">{formatTime(RESTAURANT_INFO.openingHours.saturday.open)} - {formatTime(RESTAURANT_INFO.openingHours.saturday.close)}</span>
              </div>
            </div>
          </div>
        </div>
        
        <Separator className="bg-background/10 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/50">
          <p>&copy; {currentYear} {RESTAURANT_INFO.name}. All rights reserved.</p>
          <div className="flex items-center mt-4 md:mt-0 space-x-6">
            <span>Designed for Excellence</span>
          </div>
        </div>
      </div>
    </footer>
  );
}