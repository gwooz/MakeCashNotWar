# Project ToDo & Implementation Plan

## ToDo Checklist
- [x] Define minimal MVP scope (map + payments)
- [x] Choose stack and services (map, tiles, payments)
- [x] Draft architecture (frontend/backend/data)
- [x] Plan payment flow and anti-abuse
- [x] Plan map styling modes (palette/flag/heatmap)
- [ ] Outline implementation steps and code structure

## Implementation Steps (MVP)
1) Bootstrap
   - Init Next.js (App Router, TS) on Vercel; add Tailwind or CSS variables; install MapLibre GL, Stripe SDK, Upstash Redis client, Postgres client (Neon), Framer Motion.
   - Set env vars: MAPTILER_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_ID or AMOUNT, REDIS_URL/TOKEN, DATABASE_URL, PUSHER/ABLY_KEYS (if used).
2) Map Shell
   - Add Map component (client) rendering MapLibre GL with vector tiles from MapTiler; ensure ISO-A3 property available. 
   - Implement hover tooltip + click drawer wiring; debounce pointer moves.
3) Styling Modes
   - Palette mode: categorical color scale bound to ISO.
   - Flag mode: load SVG per ISO from /public/flags/{iso}.svg; set fill-pattern with per-feature image load fallback.
   - Heatmap mode: score-based sequential scale; allow per-capita toggle later.
   - Add outline styling, hover/active halo, theme-aware colors.
4) Data Layer
   - Redis: `score:{iso}` hot counters; `tx:{stripe_id}` idempotency keys.
   - Postgres tables: countries, scores, donations, badges (pending moderation).
   - API routes: `/api/country/[iso]`, `/api/leaderboard`, `/api/checkout`, `/api/webhook/stripe` (non-Edge), optional `/api/badge`.
5) Payments (Stripe-only MVP)
   - `POST /api/checkout` creates Checkout Session with fixed amount; returns redirect URL.
   - Webhook verifies signature; on `checkout.session.completed`: idempotent guard, increment Redis, insert donation row, emit realtime event.
6) Realtime
   - Use Pusher/Ably/Supabase Realtime; channels `country:{iso}` and `leaderboard` for score updates; UI subscribes and patches state.
   - Fallback polling every few seconds if realtime unavailable.
7) UI/Pages
   - Map page with mode toggle + leader board sidebar; hover tooltip and click drawer showing score, recent donations (limited), CTA to support.
   - Leaderboard page (Top N) and optional Head-to-Head compare view.
   - Success page after checkout to show score delta and share CTA.
8) Anti-Abuse
   - Upstash rate limit on `/api/checkout` per IP/anon_id (cookie); Stripe Radar on.
   - Sanitize badge submissions; store pending; no PII stored.
9) Ops
   - Monitoring/logging: use Vercel logs; add minimal health check endpoint; nightly reconcile Redis→Postgres if needed.

## Suggested File/Folder Skeleton
- app/
  - layout.tsx, page.tsx (map)
  - leaderboard/page.tsx
  - compare/page.tsx (optional head-to-head)
  - success/page.tsx
  - api/
    - checkout/route.ts
    - webhook/stripe/route.ts
    - country/[iso]/route.ts
    - leaderboard/route.ts
    - badge/route.ts (optional)
- components/
  - map/MapView.tsx (client)
  - map/LayerControls.tsx
  - map/Tooltip.tsx
  - map/CountryDrawer.tsx
  - ui/Button.tsx, Card.tsx, Switch.tsx, etc.
- lib/
  - mapStyles.ts (expressions for palette/flag/heatmap)
  - colors.ts (palettes)
  - stripe.ts (server helper)
  - redis.ts
  - db.ts (Postgres client)
  - realtime.ts (Pusher/Ably client)
  - rateLimit.ts
- public/
  - flags/{iso}.svg
- prisma/ or migrations/ (if using Prisma or SQL migrations)

## Data Model (DDL sketch)
- countries(id serial, iso_a3 text unique, name text, region text, meta jsonb)
- scores(country_id fk, total int, updated_at timestamptz)
- donations(id serial, country_id fk, amount_minor int, currency text, tx_id text unique, anon_id text, message text, created_at timestamptz)
- badges(id serial, donation_id fk, image_url text, link_url text, status text)

## Notes
- Stripe webhook must be Serverless (not Edge) for signature verification.
- Restrict MapTiler key by domain; avoid exposing unrestricted keys.
- Keep comments terse and meaningful; avoid noise.
