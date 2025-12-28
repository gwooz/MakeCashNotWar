# Make Change, Not War

Next.js (App Router, TS) + MapLibre + Stripe (Checkout) + Upstash Redis + Postgres (Neon) skeleton.

## Quickstart
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill keys.
3. `npm run dev`

## Env
See `.env.example`. MapTiler key must be restricted to your domain. Stripe webhook secret required for `/api/webhook/stripe` (run `stripe listen --forward-to localhost:3000/api/webhook/stripe`).

## Notable Paths
- `app/page.tsx`: Map shell with mock scores.
- `app/api/checkout/route.ts`: Creates Stripe Checkout Session (fixed price id).
- `app/api/webhook/stripe/route.ts`: Verifies signature, increments Redis.
- `lib/mapStyles.ts`: MapLibre style builder (placeholder layer name `country`).

## TODO
- Wire real data to MapLibre (ensure vector layer name matches your tiles).
- Add feature-state for live scores and Drawer actions.
- Replace mock leaderboard with Redis/Postgres data.
- Add rate limiting and badge moderation endpoints.
