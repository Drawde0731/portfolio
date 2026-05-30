import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "johnedward1436@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${subject} — from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #050508; color: #F8FAFC; padding: 32px; border-radius: 12px;">
          <h2 style="color: #6366F1; margin-bottom: 24px;">New Portfolio Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #94A3B8; width: 100px;">From:</td><td style="color: #F8FAFC;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #94A3B8;">Email:</td><td><a href="mailto:${email}" style="color: #22D3EE;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #94A3B8;">Subject:</td><td style="color: #F8FAFC;">${subject}</td></tr>
          </table>
          <hr style="border-color: #1A1A2E; margin: 24px 0;" />
          <p style="color: #94A3B8; margin-bottom: 8px;">Message:</p>
          <p style="color: #F8FAFC; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
