import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const safeName = escapeHtml(String(name).slice(0, 200));
    const safeEmail = escapeHtml(String(email).slice(0, 200));
    const safeMessage = escapeHtml(String(message).slice(0, 5000));

    await resend.emails.send({
      from: 'AGENCY99 <noreply@mail.agency99.io>',
      to: 'priidik@agency99.io',
      replyTo: email,
      subject: `Uus päring – ${safeName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="margin-bottom: 24px;">Uus kontaktipäring</h2>
          <p><strong>Nimi:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p><strong>Sõnum:</strong></p>
          <p style="white-space: pre-wrap;">${safeMessage}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
