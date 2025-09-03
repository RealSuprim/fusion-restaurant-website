'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { Reservation } from '@/lib/types';

interface ReservationFormProps {
  onSubmit?: (reservation: Reservation) => void;
}

export default function ReservationForm({ onSubmit }: ReservationFormProps) {
  const [formData, setFormData] = useState<Partial<Reservation>>({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: 2,
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errors, setErrors] = useState<Partial<Record<keyof Reservation, string>>>({});

  // Generate time slots
  const generateTimeSlots = () => {
    const slots = [];
    const startHour = 17; // 5 PM
    const endHour = 22; // 10 PM
    
    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const displayTime = new Date(`2000-01-01T${time}`).toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
        slots.push({ value: time, label: displayTime });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Get minimum date (today)
  const getMinDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Get maximum date (3 months from now)
  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate.setMonth(maxDate.getMonth() + 3);
    return maxDate.toISOString().split('T')[0];
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof Reservation, string>> = {};

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    } else {
      const cleanPhone = formData.phone.replace(/\s/g, '');
      // Accept UK mobile numbers (07xxxxxxxxx) or international format (+44xxxxxxxxx)
      if (!/^(07\d{9}|\+44\d{10,11}|[\+]?[1-9][\d]{0,15})$/.test(cleanPhone)) {
        newErrors.phone = 'Please enter a valid UK phone number (e.g., 07512473844)';
      }
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    if (!formData.guests || formData.guests < 1) {
      newErrors.guests = 'Number of guests is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Submit reservation to API
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit reservation');
      }
      
      const reservation: Reservation = {
        ...formData as Reservation,
        status: 'pending'
      };

      onSubmit?.(reservation);
      setSubmitStatus('success');
      
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        guests: 2,
        specialRequests: ''
      });
    } catch (error) {
      console.error('Reservation submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof Reservation, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitStatus === 'success') {
    return (
      <Card className="restaurant-card">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h3 className="text-2xl font-bold text-green-700">Reservation Submitted!</h3>
            <p className="text-muted-foreground">
              Thank you for your reservation request. We&apos;ll confirm your booking within 24 hours via email or phone.
            </p>
            <Button 
              onClick={() => setSubmitStatus('idle')}
              className="restaurant-primary"
            >
              Make Another Reservation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="restaurant-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Reservation Details
        </CardTitle>
        <CardDescription>
          Please fill in all required fields to make your reservation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className={errors.name ? 'border-red-500' : ''}
                placeholder="Enter your full name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.name}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className={errors.email ? 'border-red-500' : ''}
                placeholder="Enter your email"
              />
              {errors.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className={errors.phone ? 'border-red-500' : ''}
              placeholder="07512473844 (UK mobile number)"
            />
            {errors.phone && (
              <p className="text-sm text-red-500 flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.phone}
              </p>
            )}
          </div>

          {/* Reservation Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date || ''}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className={errors.date ? 'border-red-500' : ''}
                min={getMinDate()}
                max={getMaxDate()}
              />
              {errors.date && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.date}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="time">Time *</Label>
              <Select value={formData.time || ''} onValueChange={(value) => handleInputChange('time', value)}>
                <SelectTrigger className={errors.time ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((slot) => (
                    <SelectItem key={slot.value} value={slot.value}>
                      {slot.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.time && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.time}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="guests">Guests *</Label>
              <Select 
                value={formData.guests?.toString() || '2'} 
                onValueChange={(value) => handleInputChange('guests', parseInt(value))}
              >
                <SelectTrigger className={errors.guests ? 'border-red-500' : ''}>
                  <SelectValue placeholder="Number of guests" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((num) => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'Guest' : 'Guests'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.guests && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.guests}
                </p>
              )}
            </div>
          </div>

          {/* Special Requests */}
          <div className="space-y-2">
            <Label htmlFor="specialRequests">Special Requests (Optional)</Label>
            <Textarea
              id="specialRequests"
              value={formData.specialRequests || ''}
              onChange={(e) => handleInputChange('specialRequests', e.target.value)}
              placeholder="Any dietary requirements, allergies, or special occasions?"
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full restaurant-primary" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Clock className="h-4 w-4 mr-2 animate-spin" />
                Submitting Reservation...
              </>
            ) : (
              <>
                <Users className="h-4 w-4 mr-2" />
                Submit Reservation
              </>
            )}
          </Button>

          {submitStatus === 'error' && (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 flex items-center justify-center gap-2">
                <AlertCircle className="h-4 w-4" />
                There was an error submitting your reservation. Please try again.
              </p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}