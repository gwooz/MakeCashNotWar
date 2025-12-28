import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getRedis } from "@/lib/redis";

export const dynamic = "force-dynamic"; // ensure not cached

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !secret) {
    return NextResponse.json({ error: "missing webhook secret/signature" }, { status: 400 });
  }

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    const stripe = getStripe();
    event = stripe.webhooks.constructEvent(rawBody, sig, secret);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const iso = (session.metadata?.iso || "").toUpperCase();
    const txId = session.id;

    if (iso) {
      try {
        const redis = getRedis();
        await redis.incr(`score:${iso}`);
        await redis.set(`tx:${txId}`, 1, { nx: true, ex: 60 * 60 });
      } catch (err: any) {
        console.error("redis error", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
