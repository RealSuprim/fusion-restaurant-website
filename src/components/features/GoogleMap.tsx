'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader } from '@googlemaps/js-api-loader';
import { Card } from '@/components/ui/card';
import { MapPin, AlertCircle } from 'lucide-react';

interface GoogleMapProps {
  lat: number;
  lng: number;
  zoom?: number;
  height?: string;
  className?: string;
  showMarker?: boolean;
  markerTitle?: string;
}

export default function GoogleMap({
  lat,
  lng,
  zoom = 15,
  height = '400px',
  className = '',
  showMarker = true,
  markerTitle = 'The Fusion Restaurant'
}: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [, setMap] = useState<google.maps.Map | null>(null);

  useEffect(() => {
    const initMap = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // For demo purposes, we will use a fallback when no API key is available
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
        
        if (!apiKey) {
          // Fallback to static map or show message
          setError('Google Maps API key not configured');
          setIsLoading(false);
          return;
        }

        const loader = new Loader({
          apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        const google = await loader.load();
        
        if (!mapRef.current) return;

        const mapInstance = new google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }]
            }
          ],
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: true,
          zoomControl: true
        });

        if (showMarker) {
          new google.maps.Marker({
            position: { lat, lng },
            map: mapInstance,
            title: markerTitle,
            icon: {
              path: google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: '#0f4c5c',
              fillOpacity: 1,
              strokeColor: '#ffffff',
              strokeWeight: 2
            }
          });
        }

        setMap(mapInstance);
        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load map');
        setIsLoading(false);
      }
    };

    initMap();
  }, [lat, lng, zoom, showMarker, markerTitle]);

  if (error) {
    return (
      <Card className={`restaurant-card ${className}`} style={{ height }}>
        <div className="flex flex-col items-center justify-center h-full p-8 text-center">
          <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Map Unavailable</h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>221 Lee High Rd, Blackheath, London SE13 5PQ</span>
          </div>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${lat},${lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            <MapPin className="h-4 w-4 mr-2" />
            View on Google Maps
          </a>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`restaurant-card overflow-hidden ${className}`}>
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-muted/50 z-10">
            <div className="flex flex-col items-center gap-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              <span className="text-sm text-muted-foreground">Loading map...</span>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
      </div>
    </Card>
  );
}