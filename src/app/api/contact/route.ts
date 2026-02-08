import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

// Simple in-memory rate limiting (for production, use Redis or Vercel KV)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_REQUESTS = 3; // Max 3 requests
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // Per hour (1 hour in ms)

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (record.count >= RATE_LIMIT_REQUESTS) {
    return false;
  }

  record.count++;
  return true;
}

function sanitizeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for') || 
               request.headers.get('x-real-ip') || 
               'unknown';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      );
    }

    // Parse body with size limit check
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 10000) {
      return NextResponse.json(
        { error: 'Request payload too large' },
        { status: 413 }
      );
    }

    const body = await request.json();
    const { name, email, message } = body;

    // Required fields validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Length validation
    if (name.length > 100 || email.length > 255 || message.length > 5000) {
      return NextResponse.json(
        { error: 'Field length exceeds maximum allowed' },
        { status: 400 }
      );
    }

    // Email validation (strict)
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Sanitize inputs to prevent XSS
    const sanitizedName = sanitizeHtml(name.trim());
    const sanitizedEmail = sanitizeHtml(email.trim());
    const sanitizedMessage = sanitizeHtml(message.trim());

    // Parse recipients (supports comma-separated emails)
    const recipients = (process.env.CONTACT_EMAIL_TO || 'f.mesan@uniandes.edu.co')
      .split(',')
      .map(email => email.trim())
      .filter(email => email.length > 0);

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_EMAIL_FROM || 'onboarding@resend.dev',
      to: recipients,
      replyTo: email, // Keep original email for reply functionality
      subject: `Portfolio Contact: Message from ${sanitizedName}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
                color: white;
                padding: 30px;
                border-radius: 10px 10px 0 0;
                text-align: center;
              }
              .content {
                background: #f9fafb;
                padding: 30px;
                border-radius: 0 0 10px 10px;
              }
              .field {
                margin-bottom: 20px;
              }
              .field-label {
                font-weight: 600;
                color: #06b6d4;
                margin-bottom: 5px;
              }
              .field-value {
                background: white;
                padding: 15px;
                border-radius: 8px;
                border-left: 4px solid #06b6d4;
              }
              .message-box {
                background: white;
                padding: 20px;
                border-radius: 8px;
                border-left: 4px solid #06b6d4;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 1px solid #e5e7eb;
                color: #6b7280;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1 style="margin: 0; font-size: 24px;">New Contact Form Submission</h1>
            </div>
            <div class="content">
              <div class="field">
                <div class="field-label">From:</div>
                <div class="field-value">
                  <strong>${sanitizedName}</strong><br>
                  <a href="mailto:${sanitizedEmail}" style="color: #06b6d4;">${sanitizedEmail}</a>
                </div>
              </div>
              
              <div class="field">
                <div class="field-label">Message:</div>
                <div class="message-box">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
              </div>
              
              <div class="footer">
                Sent from your portfolio contact form<br>
                Reply directly to this email to respond to ${sanitizedName}
              </div>
            </div>
          </body>
        </html>
      `,
    });

    if (error) {
      // Log error securely (don't expose details to client)
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend API Error:', error);
      }
      return NextResponse.json(
        { error: 'Failed to send email. Please try again later.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Email sent successfully', id: data?.id },
      { status: 200 }
    );

  } catch (error) {
    // Log error securely (don't expose details to client)
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error);
    }
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}

