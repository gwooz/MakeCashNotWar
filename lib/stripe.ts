import Stripe from "stripe";

const secret = process.env.STRIPE_SECRET_KEY;

export function getStripe() {
  if (!secret) {
    throw new Error("STRIPE_SECRET_KEY not set");
  }
  return new Stripe(secret, { apiVersion: "2023-10-16" });
}
