import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderItem {
  id: string;
  menuItem: {
    id: string;
    name: string;
    price: number;
  };
  quantity: number;
  specialInstructions?: string;
  selectedOption?: string;
}

interface CustomerInfo {
  name: string;
  email: string;
  phone: string;
  address?: string;
}

interface OrderData {
  items: OrderItem[];
  customerInfo: CustomerInfo;
  orderType: 'delivery' | 'pickup';
  totalAmount: number;
}

// Owner contact details
const OWNER_EMAIL = 'Theengmadhav@gmail.com';

// Email configuration (using Gmail SMTP)
const createEmailTransporter = () => {
  const gmailUser = process.env.GMAIL_USER;
  const gmailPassword = process.env.GMAIL_APP_PASSWORD;
  
  if (!gmailUser || !gmailPassword) {
    return null;
  }
  
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: gmailUser,
      pass: gmailPassword,
    },
  });
};

export async function POST(request: NextRequest) {
  try {
    const orderData: OrderData = await request.json();
    const { items, customerInfo, orderType, totalAmount } = orderData;

    // Validate required fields
    if (!items || items.length === 0 || !customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (orderType === 'delivery' && !customerInfo.address) {
      return NextResponse.json(
        { error: 'Delivery address is required' },
        { status: 400 }
      );
    }

    // Send email notification
    try {
      const transporter = createEmailTransporter();
      
      if (transporter) {
        const itemsList = items.map(item => {
          let itemDetails = `- ${item.quantity}x ${item.menuItem.name} (£${item.menuItem.price.toFixed(2)})`;
          
          if (item.selectedOption) {
            itemDetails += `\n  Option: ${item.selectedOption}`;
          }
          
          if (item.specialInstructions) {
            itemDetails += `\n  Note: ${item.specialInstructions}`;
          }
          
          return itemDetails;
        }).join('\n');

        const displayOrderType = orderType === 'pickup' ? 'COLLECTION' : 'DELIVERY';

        const emailContent = `
          New Order Received!
          
          Order Type: ${displayOrderType}
          Payment Method: Pay on Delivery / Collection
          
          Customer Details:
          Name: ${customerInfo.name}
          Email: ${customerInfo.email}
          Phone: ${customerInfo.phone}
          ${orderType === 'delivery' ? `Address: ${customerInfo.address}` : ''}
          
          Order Details:
          ${itemsList}
          
          Total Amount: £${totalAmount.toFixed(2)}
          
          Please prepare the order accordingly.
        `;

        await transporter.sendMail({
          from: process.env.GMAIL_USER,
          to: OWNER_EMAIL,
          subject: `New ${displayOrderType} Order - ${customerInfo.name}`,
          text: emailContent,
        });
        
        console.log('Order email sent successfully');
      } else {
        console.log('Email notification skipped - Gmail credentials not configured');
      }
    } catch (emailError) {
      console.error('Email notification failed:', emailError);
      // We don't return error here to the client, as the order might have been processed otherwise
      // But for a real system we might want to alert the user or retry
    }

    return NextResponse.json({ success: true, message: 'Order received successfully' });

  } catch (error) {
    console.error('Error processing order:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
