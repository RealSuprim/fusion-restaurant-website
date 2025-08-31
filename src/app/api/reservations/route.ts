import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import twilio from 'twilio';

interface ReservationData {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
}

// Owner contact details
const OWNER_EMAIL = 'Theengmadhav@gmail.com';
const OWNER_PHONE = '+442045684224';

// Email configuration (using Gmail SMTP)
const createEmailTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
};

// Twilio configuration
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

export async function POST(request: NextRequest) {
  try {
    const reservationData: ReservationData = await request.json();

    // Validate required fields
    if (!reservationData.name || !reservationData.email || !reservationData.phone || 
        !reservationData.date || !reservationData.time || !reservationData.guests) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Send email notification
    try {
      const transporter = createEmailTransporter();
      
      const emailContent = `
        New Table Reservation Request
        
        Customer Details:
        Name: ${reservationData.name}
        Email: ${reservationData.email}
        Phone: ${reservationData.phone}
        
        Reservation Details:
        Date: ${reservationData.date}
        Time: ${reservationData.time}
        Number of Guests: ${reservationData.guests}
        ${reservationData.specialRequests ? `Special Requests: ${reservationData.specialRequests}` : ''}
        
        Please contact the customer to confirm the reservation.
      `;

      await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: OWNER_EMAIL,
        subject: `New Reservation Request - ${reservationData.name}`,
        text: emailContent,
      });
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
    }

    // Send SMS notification
    try {
      const smsContent = `New reservation: ${reservationData.name} for ${reservationData.guests} guests on ${reservationData.date} at ${reservationData.time}. Contact: ${reservationData.phone}`;
      
      await twilioClient.messages.create({
        body: smsContent,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: OWNER_PHONE,
      });
    } catch (smsError) {
      console.error('SMS notification failed:', smsError);
    }

    return NextResponse.json(
      { message: 'Reservation request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Reservation API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}