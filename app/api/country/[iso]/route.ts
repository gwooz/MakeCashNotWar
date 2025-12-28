import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

export async function GET(_req: Request, { params }: { params: { iso: string } }) {
  const iso = params.iso.toUpperCase();
  try {
    const redis = getRedis();
    const score = (await redis.get<number>(`score:${iso}`)) ?? 0;
    return NextResponse.json({ iso, score });
  } catch (err: any) {
    return NextResponse.json({ iso, score: 0, error: err.message }, { status: 200 });
  }
}
