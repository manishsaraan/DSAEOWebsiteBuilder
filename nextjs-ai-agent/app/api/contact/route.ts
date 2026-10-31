import { NextResponse } from "next/server";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  let body: Record<string, string>;
  try {
    body = (await req.json()) as Record<string, string>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }
  if (body._gotcha) return NextResponse.json({ ok: true });

  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const message = (body.message ?? "").trim();
  const project = (body.project ?? "").trim();
  const link = (body.link ?? "").trim();

  if (name.length < 2 || !EMAIL.test(email) || message.length < 20) {
    return NextResponse.json({ error: "Please check your name, email and message." }, { status: 400 });
  }
  if (message.length > 5000 || name.length > 200) {
    return NextResponse.json({ error: "Message is too long." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json(
      { error: "This form is not connected yet. Please use another contact method on this page." },
      { status: 503 },
    );
  }
  const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

  const text = [
    `Name: ${name}`,
    `Email: ${email}`,
    project ? `Project: ${project}` : "",
    link ? `Link: ${link}` : "",
    "",
    message,
  ]
    .filter((l) => l !== "")
    .join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to: [to], reply_to: email, subject: `New enquiry from ${name}`, text }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "Could not send right now. Please try again shortly." }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
