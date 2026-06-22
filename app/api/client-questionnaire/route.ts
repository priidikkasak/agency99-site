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
      projectType,
      goal,
      budget,
      timeline,
    } = body ?? {};

    if (!name || !email || !projectType || !goal) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const safe = {
      name: clean(name, 200),
      email: clean(email, 200),
      company: clean(company, 300),
      projectType: clean(projectType, 100),
      goal: clean(goal, 5000),
      budget: clean(budget, 100),
      timeline: clean(timeline, 100),
    };

    const row = (label: string, value: string) =>
      value
        ? `<tr><td style="padding:6px 12px 6px 0;color:#888;vertical-align:top;">${label}</td><td style="padding:6px 0;">${value}</td></tr>`
        : '';

    await resend.emails.send({
      from: 'AGENCY99 <noreply@mail.agency99.io>',
      to: 'priidik@agency99.io',
      replyTo: safe.email,
      subject: `Client questionnaire – ${safe.name} (${safe.projectType})`,
      html: `
        <div style="font-family: sans-serif; max-width: 640px; color: #111;">
          <h2 style="margin-bottom: 16px;">New client questionnaire</h2>
          <table style="border-collapse: collapse; font-size: 14px; line-height: 1.5;">
            ${row('Name', safe.name)}
            ${row('Email', safe.email)}
            ${row('Company / site', safe.company)}
            ${row('Project type', safe.projectType)}
            ${row('Budget', safe.budget)}
            ${row('Timeline', safe.timeline)}
          </table>
          <hr style="margin: 24px 0; border: none; border-top: 1px solid #eee;" />
          <p style="margin: 0 0 6px; color: #888; font-size: 13px;">Goal</p>
          <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${safe.goal}</p>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }
}
