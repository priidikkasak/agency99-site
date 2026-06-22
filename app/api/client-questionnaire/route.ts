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

function clean(value: unknown, max = 500): string {
  return escapeHtml(String(value ?? '').slice(0, max));
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      company,
      projectTypes,
      otherDescription,
      goal,
      audience,
      contentReady,
      inspiration,
      timeline,
    } = body ?? {};

    const typesArr: string[] = Array.isArray(projectTypes)
      ? projectTypes.filter((v) => typeof v === 'string').slice(0, 20)
      : [];

    if (!name || !email || !goal || !audience || !contentReady || typesArr.length === 0) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const otherDesc = typesArr.includes('Something else') ? otherDescription : '';

    const safe = {
      name: clean(name, 200),
      email: clean(email, 200),
      company: clean(company, 300),
      projectTypes: typesArr.map((v) => clean(v, 100)).join(', '),
      otherDescription: clean(otherDesc, 500),
      goal: clean(goal, 5000),
      audience: clean(audience, 500),
      contentReady: clean(contentReady, 200),
      inspiration: clean(inspiration, 3000),
      timeline: clean(timeline, 100),
    };

    const row = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;white-space:nowrap;">${label}</td><td style="padding:6px 0;">${value}</td></tr>`
        : '';

    const block = (label: string, value: string) =>
      value
        ? `<p style="margin: 0 0 6px; color:#888; font-size:13px;">${label}</p>
           <p style="white-space:pre-wrap; font-size:14px; line-height:1.6; margin:0 0 18px;">${value}</p>`
        : '';

    await resend.emails.send({
      from: 'AGENCY99 <noreply@mail.agency99.io>',
      to: 'priidik@agency99.io',
      replyTo: safe.email,
      subject: `Client questionnaire – ${safe.name} (${safe.projectTypes})`,
      html: `
        <div style="font-family: sans-serif; max-width: 640px; color: #111;">
          <h2 style="margin-bottom: 16px;">New client questionnaire</h2>
          <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5;">
            ${row('Name', safe.name)}
            ${row('Email', safe.email)}
            ${row('Company / site', safe.company)}
            ${row('Project type(s)', safe.projectTypes)}
            ${row('Something else', safe.otherDescription)}
            ${row('Content', safe.contentReady)}
            ${row('Timeline', safe.timeline)}
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          ${block('Goal', safe.goal)}
          ${block('Audience', safe.audience)}
          ${block('Inspiration', safe.inspiration)}
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
