import { NextRequest, NextResponse } from "next/server";
import { leadFormSchema } from "@/lib/validation/lead";
import { prisma } from "@/lib/db";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();
  const timestamps = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  timestamps.push(now);
  hits.set(ip, timestamps);
  return timestamps.length > RATE_LIMIT_MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  const parsed = leadFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  // Honeypot: bots fill hidden "company" field, silently drop.
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const { company: _company, ...lead } = parsed.data;

  // TODO: trigger notification workflows (email/SMS/WhatsApp) once those integrations exist.
  await prisma.lead.create({
    data: {
      name: lead.name,
      phone: lead.phone,
      email: lead.email || null,
      city: lead.city || null,
      interest: lead.interest,
      message: lead.message || null,
      source: lead.source || null,
      ip,
    },
  });

  return NextResponse.json({ ok: true });
}
