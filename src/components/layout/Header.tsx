'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from '@/components/ui/navigation-menu';
import { Menu, Phone, MapPin } from 'lucide-react';
import { NAVIGATION_ITEMS, RESTAURANT_INFO } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top bar with contact info */}
      <div className="hidden md:block bg-primary text-primary-foreground py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Phone className="h-4 w-4" />
              <span>{RESTAURANT_INFO.phone}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span>{RESTAURANT_INFO.address}</span>
            </div>
          </div>
          <div className="text-sm">
            Open: Mon-Thu 5PM-11PM | Fri-Sat 12PM-11:30PM | Sun 12PM-10:30PM
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/assets/logo.svg"
              alt={`${RESTAURANT_INFO.name} Logo`}
              width={150}
              height={150}
              className="w-12 h-12"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList className="space-x-2">
              {NAVIGATION_ITEMS.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-accent/50 data-[state=open]:bg-accent/50"
                    >
                      {item.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <ThemeToggle />
            <Button variant="outline" asChild>
              <Link href="/reservations">Book Table</Link>
            </Button>
            <Button className="restaurant-primary" asChild>
              <Link href="/order">Order Now</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center pb-4 border-b">
                  <Image
                    src="/assets/logo.svg"
                    alt={`${RESTAURANT_INFO.name} Logo`}
                    width={60}
                    height={60}
                    className="w-15 h-15"
                  />
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col space-y-2">
                  {NAVIGATION_ITEMS.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-4 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>

                {/* Mobile CTA Buttons */}
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <div className="flex justify-center pb-2">
                    <ThemeToggle />
                  </div>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/reservations" onClick={() => setIsOpen(false)}>
                      Book Table
                    </Link>
                  </Button>
                  <Button className="restaurant-primary w-full" asChild>
                    <Link href="/order" onClick={() => setIsOpen(false)}>
                      Order Now
                    </Link>
                  </Button>
                </div>

                {/* Mobile Contact Info */}
                <div className="pt-4 border-t space-y-2 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>{RESTAURANT_INFO.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-xs">{RESTAURANT_INFO.address}</span>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}