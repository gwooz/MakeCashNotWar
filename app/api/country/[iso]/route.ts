import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(_req: Request, context: { params: Promise<{ iso: string }> }) {
  const { iso } = await context.params;
  const upper = iso.toUpperCase();
  try {
    const redis = getRedis();
    const score = (await redis.get<number>(`score:${upper}`)) ?? 0;
    return NextResponse.json({ iso: upper, score });
  } catch (err: any) {
    return NextResponse.json({ iso: upper, score: 0, error: err.message }, { status: 200 });
  }
}
