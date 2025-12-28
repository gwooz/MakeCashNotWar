import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  try {
    const stripe = getStripe();
    const { iso = "" } = await request.json().catch(() => ({}));
    const priceId = process.env.STRIPE_PRICE_ID;

    if (!priceId) {
      return NextResponse.json({ error: "STRIPE_PRICE_ID missing" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/`,
      metadata: { iso: iso.toString().toUpperCase() }
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "checkout failed" }, { status: 500 });
  }
}
