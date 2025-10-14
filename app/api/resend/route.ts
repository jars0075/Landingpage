import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const resend = new Resend(process.env.RESEND_API_KEY);

const voucherSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  painArea: z.string().min(1, 'Please tell us about your pain area'),
  preferredContact: z.enum(['email', 'phone', 'text'])
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validationResult = voucherSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid form data',
          error: validationResult.error.issues[0].message
        },
        { status: 400 }
      );
    }
    
    const { firstName, lastName, email, phone, painArea, preferredContact } = validationResult.data;
    const name = `${firstName} ${lastName}`;

    await resend.emails.send({
      from: 'Website Contact <info@preferredtherapyservice.com>', 
      to: 'info@preferredtherapyservice.com',
      subject: `New Voucher Request from ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Pain Area:</strong> ${painArea}</p>
        <p><strong>Preferred Contact Method:</strong> ${preferredContact}</p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Voucher request submitted successfully!' }, { status: 200 });
  } catch (error) {
    console.error('Email failed:', error);
    return NextResponse.json({ error: 'Email failed to send' }, { status: 500 });
  }
}
