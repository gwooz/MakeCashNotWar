import { NextResponse } from "next/server";
import { getRedis } from "@/lib/redis";

const sample = [
  { iso: "USA", score: 12 },
  { iso: "DEU", score: 7 },
  { iso: "FRA", score: 5 },
  { iso: "IND", score: 4 }
];

export async function GET() {
  try {
    const redis = getRedis();
    // Placeholder: fetch keys score:* and sort. Mock returned for now.
    await redis.ping();
  } catch (err) {
    // ignore, fallback to mock
  }
  return NextResponse.json({ items: sample });
}
