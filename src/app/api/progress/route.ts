import { NextResponse } from "next/server";
import { applyProgress, getProgress, resetProgress } from "@/lib/store";

// Selalu jalan di waktu permintaan — jangan diprerender saat build.
export const dynamic = "force-dynamic";

export async function GET() {
  const done = await getProgress();
  return NextResponse.json({ done });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as
    | { reset?: boolean; ids?: unknown; value?: unknown }
    | null;

  if (!body) {
    return NextResponse.json({ error: "Body JSON tidak valid" }, { status: 400 });
  }

  if (body.reset) {
    const done = await resetProgress();
    return NextResponse.json({ done });
  }

  const ids = Array.isArray(body.ids)
    ? body.ids.filter((x): x is string => typeof x === "string")
    : [];

  if (ids.length === 0) {
    return NextResponse.json({ error: "Field 'ids' wajib diisi" }, { status: 400 });
  }

  const done = await applyProgress(ids, Boolean(body.value));
  return NextResponse.json({ done });
}
