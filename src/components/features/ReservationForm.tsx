'use client';

import { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
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
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      <Card className="border-2 border-green-100 bg-green-50/50 dark:bg-green-900/10 dark:border-green-900 animate-fade-in-up">
        <CardContent className="pt-10 pb-10">
          <div className="text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-green-700 dark:text-green-400 mb-2">Reservation Submitted!</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Thank you for your reservation request. We have received your details and will confirm your booking shortly via email.
              </p>
            </div>
            <Button 
              onClick={() => setSubmitStatus('idle')}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Make Another Reservation
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/50 shadow-xl bg-card/50 backdrop-blur-sm">
      <CardHeader className="border-b border-border/50 pb-6">
        <CardTitle className="flex items-center gap-3 text-2xl">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          Make a Reservation
        </CardTitle>
        <CardDescription className="text-base">
          Fill in the details below to book your table. For groups larger than 10, please contact us directly.
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Booking Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <Clock className="h-4 w-4" />
              Date & Time
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-sm font-medium">Date</Label>
                <Input
                  id="date"
                  type="date"
                  min={getMinDate()}
                  max={getMaxDate()}
                  value={formData.date}
                  onChange={(e) => handleInputChange('date', e.target.value)}
                  className={errors.date ? 'border-destructive focus-visible:ring-destructive' : ''}
                />
                {errors.date && <p className="text-xs text-destructive flex items-center mt-1"><AlertCircle className="h-3 w-3 mr-1"/> {errors.date}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-sm font-medium">Time</Label>
                <Select 
                  value={formData.time} 
                  onValueChange={(value) => handleInputChange('time', value)}
                >
                  <SelectTrigger className={errors.time ? 'border-destructive focus-visible:ring-destructive' : ''}>
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
                {errors.time && <p className="text-xs text-destructive flex items-center mt-1"><AlertCircle className="h-3 w-3 mr-1"/> {errors.time}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="guests" className="text-sm font-medium">Guests</Label>
                <Select 
                  value={formData.guests?.toString()} 
                  onValueChange={(value) => handleInputChange('guests', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="2 Guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? 'Guest' : 'Guests'}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Personal Details Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <User className="h-4 w-4" />
              Contact Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`pl-9 ${errors.name ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.name && <p className="text-xs text-destructive flex items-center mt-1"><AlertCircle className="h-3 w-3 mr-1"/> {errors.name}</p>}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="07123 456789"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`pl-9 ${errors.phone ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.phone && <p className="text-xs text-destructive flex items-center mt-1"><AlertCircle className="h-3 w-3 mr-1"/> {errors.phone}</p>}
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`pl-9 ${errors.email ? 'border-destructive focus-visible:ring-destructive' : ''}`}
                  />
                </div>
                {errors.email && <p className="text-xs text-destructive flex items-center mt-1"><AlertCircle className="h-3 w-3 mr-1"/> {errors.email}</p>}
              </div>
            </div>
          </div>

          <div className="h-px bg-border/50" />

          {/* Special Requests */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center gap-2 text-primary">
              <MessageSquare className="h-4 w-4" />
              Special Requests
            </h3>
            <div className="space-y-2">
              <Label htmlFor="specialRequests" className="text-muted-foreground font-normal">
                Dietary requirements, allergies, or special occasions?
              </Label>
              <Textarea
                id="specialRequests"
                placeholder="e.g. Wheelchair access required, birthday celebration, nut allergy..."
                value={formData.specialRequests}
                onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                className="min-h-[100px] resize-none"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full h-12 text-lg font-semibold" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                Confirming Reservation...
              </span>
            ) : (
              'Confirm Reservation'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}