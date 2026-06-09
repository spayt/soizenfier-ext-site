import { NextResponse } from "next/server";

const TO_EMAIL   = "admin@soizenfier.com";
const FROM_EMAIL = process.env.SENDGRID_FROM_EMAIL ?? "noreply@soizenfier.com";
const COMPANY    = "SoiZenFier Technologies Inc.";

export async function POST(request: Request) {
  const apiKey = process.env.SENDGRID_API_KEY;
  if (!apiKey) {
    console.error("SENDGRID_API_KEY is not configured.");
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 },
    );
  }

  let body: { name?: string; email?: string; subject?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, subject, message } = body;
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }

  try {
    const sgRes = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL, name: COMPANY }] }],
        from: { email: FROM_EMAIL, name: COMPANY },
        reply_to: { email: email.trim(), name: name.trim() },
        subject: `[Contact] ${subject.trim()}`,
        content: [
          {
            type: "text/html",
            value: buildHtml({ name: name.trim(), email: email.trim(), subject: subject.trim(), message: message.trim() }),
          },
        ],
      }),
    });

    if (!sgRes.ok) {
      const detail = await sgRes.text();
      console.error("SendGrid error:", detail);
      return NextResponse.json(
        { error: "Failed to send message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Contact form error:", err);
    return NextResponse.json(
      { error: "Unable to process the request." },
      { status: 500 },
    );
  }
}

function buildHtml(p: { name: string; email: string; subject: string; message: string }) {
  const lines = p.message.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:48px 20px;">
    <tr><td align="center">
      <table width="520" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(15,23,42,0.08);">
        <tr>
          <td style="background:#0f172a;padding:24px 36px;">
            <p style="margin:0;font-size:16px;font-weight:800;color:#ffffff;">SoiZenFier Technologies</p>
            <p style="margin:4px 0 0;font-size:12px;color:#94a3b8;">New contact form submission</p>
          </td>
        </tr>
        <tr>
          <td style="padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="padding-bottom:16px;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 2px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">From</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;">${p.name}</p>
                  <a href="mailto:${p.email}" style="font-size:13px;color:#facc15;text-decoration:none;">${p.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:16px 0;border-bottom:1px solid #f1f5f9;">
                  <p style="margin:0 0 2px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Subject</p>
                  <p style="margin:0;font-size:15px;font-weight:700;color:#0f172a;">${p.subject}</p>
                </td>
              </tr>
              <tr>
                <td style="padding-top:16px;">
                  <p style="margin:0 0 10px;font-size:11px;font-weight:600;color:#94a3b8;text-transform:uppercase;letter-spacing:0.08em;">Message</p>
                  <p style="margin:0;font-size:14px;color:#334155;line-height:1.7;">${lines}</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <tr>
          <td style="background:#f8fafc;padding:16px 36px;border-top:1px solid #e2e8f0;">
            <p style="margin:0;font-size:12px;color:#94a3b8;">Reply directly to this email to respond to ${p.name}.</p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
