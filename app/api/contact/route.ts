import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Contact from '@/models/Contact';

export async function GET() {
  try {
    await dbConnect();
    const messages = await Contact.find({}).sort({ createdAt: -1 });
    return NextResponse.json(messages);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, subject, message } = body;
    
    // In a real application, you would also trigger Nodemailer here to send an email!
    
    const contactMessage = await Contact.create({
      name,
      email,
      subject,
      message,
    });
    
    return NextResponse.json({ success: true, data: contactMessage }, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
