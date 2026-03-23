import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'agency99 <noreply@mail.agency99.io>',
      to: 'priidik@agency99.io',
      replyTo: email,
      subject: `Uus päring – ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px;">
          <h2 style="margin-bottom: 24px;">Uus kontaktipäring</h2>
          <p><strong>Nimi:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p><strong>Sõnum:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
