import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate
    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields required" }, { status: 400 });
    }

    const resolvedSubject = subject || "Project Inquiry";

    await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: "johnedward1436@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${resolvedSubject} — from ${name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto; background: #111111; color: #F5F5F3; padding: 32px; border-radius: 8px;">
          <h2 style="color: #F5F5F3; margin-bottom: 24px; font-size: 18px; font-weight: 600;">New Portfolio Inquiry</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #777777; width: 100px;">From:</td><td style="color: #F5F5F3;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #777777;">Email:</td><td><a href="mailto:${email}" style="color: #F5F5F3;">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #777777;">Subject:</td><td style="color: #F5F5F3;">${resolvedSubject}</td></tr>
          </table>
          <hr style="border-color: rgba(255,255,255,0.08); margin: 24px 0;" />
          <p style="color: #777777; margin-bottom: 8px;">Message:</p>
          <p style="color: #F5F5F3; line-height: 1.6; white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Failed to send message" }, { status: 500 });
  }
}
