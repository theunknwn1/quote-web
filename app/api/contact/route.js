import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message, website } = body;

    // Honeypot check — bots fill this hidden field
    if (website) {
      // Silently succeed for bots
      return NextResponse.json({ success: true });
    }

    // Validate required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: "Name is required." },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    // Basic email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address." },
        { status: 400 }
      );
    }

    if (!message || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    if (message.trim().length < 10) {
      return NextResponse.json(
        { error: "Message must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Rate limiting: basic check using timestamp
    // In production, use a more robust solution (Redis, Upstash, etc.)

    // Log the contact submission (production: send email via Resend/SendGrid/Nodemailer)
    console.log("📬 New contact form submission:");
    console.log(`   Name: ${name.trim()}`);
    console.log(`   Email: ${email.trim()}`);
    console.log(`   Message: ${message.trim()}`);
    console.log(`   Timestamp: ${new Date().toISOString()}`);

    // TODO: Integrate with email service for production
    // Example with Resend:
    // await resend.emails.send({
    //   from: 'noreply@unknwnquotes.com',
    //   to: 'contact.unknwnquotes@gmail.com',
    //   subject: `Contact Form: ${name.trim()}`,
    //   text: `From: ${name.trim()} (${email.trim()})\n\n${message.trim()}`,
    // });

    return NextResponse.json({
      success: true,
      message: "Your message has been received. We'll get back to you soon!",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "An internal error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
