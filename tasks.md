# Tasks — Giveaway Platform
## Development Checklist

Track your progress here. Check off each task as you complete it.

---

## Phase 1 — Foundation (Weeks 1–2)

### Project setup
- [ ] Run `npx create-next-app@latest giveaway-platform --typescript --tailwind --app`
- [ ] Install shadcn/ui: `npx shadcn@latest init`
- [ ] Add commonly used shadcn components: Button, Card, Input, Dialog, Badge, Skeleton
- [ ] Install additional packages: `npm install framer-motion react-hook-form zod @hookform/resolvers`
- [ ] Create GitHub repository and push initial code
- [ ] Connect GitHub repo to Vercel (auto-deploy on every push)
- [ ] Confirm blank app is live at your Vercel URL

### Supabase setup
- [ ] Create a new project at supabase.com
- [ ] Copy Supabase URL and anon key into `.env.local`
- [ ] Install Supabase client: `npm install @supabase/supabase-js @supabase/ssr`
- [ ] Create `lib/supabase.ts` with browser and server clients
- [ ] Create `middleware.ts` for route protection

### Database tables (run in Supabase SQL editor)
- [ ] Create `profiles` table (extends Supabase auth.users)
- [ ] Create `giveaways` table (see architecture.md for all columns)
- [ ] Create `orders` table
- [ ] Create `tickets` table
- [ ] Set up Row Level Security (RLS) policies:
  - [ ] Users can only read their own orders and tickets
  - [ ] Anyone can read active giveaways
  - [ ] Only admins can insert/update giveaways
- [ ] Create a trigger: auto-create a profile row when a new user registers

### Authentication pages
- [ ] Build `/login` page with email + password form
- [ ] Build `/register` page with email + password + name fields
- [ ] Add Google OAuth button (configure in Supabase dashboard first)
- [ ] Add "Forgot password" link and reset flow
- [ ] Test: register → confirm email → login → redirect to homepage
- [ ] Add auth state to a `useUser` hook

---

## Phase 2 — Core Giveaway Pages (Weeks 3–4)

### Layout & navigation
- [ ] Build `Navbar.tsx` with logo, nav links, login/profile button
- [ ] Build `Footer.tsx` with links and copyright
- [ ] Create `(main)/layout.tsx` wrapping all public pages
- [ ] Make navbar mobile-responsive (hamburger menu)

### Homepage
- [ ] Fetch active giveaways from Supabase (server component)
- [ ] Build `GiveawayCard.tsx` component showing: image, title, prize value, ticket price, progress bar, countdown
- [ ] Display giveaway cards in a responsive grid
- [ ] Add filter buttons (by category)
- [ ] Add sort dropdown (ending soonest / most popular)
- [ ] Add skeleton loading states

### Giveaway detail page (`/giveaway/[id]`)
- [ ] Fetch single giveaway data (server component)
- [ ] Build image gallery with multiple photos
- [ ] Build `CountdownTimer.tsx` (client component, updates every second)
- [ ] Build ticket progress bar (tickets sold / max tickets)
- [ ] Build `EntryForm.tsx` with quantity selector and price calculation
- [ ] Add real-time subscription: update ticket count live via Supabase Realtime
- [ ] Show recent purchases list (username anonymised + quantity)
- [ ] Handle "sold out" and "draw complete" states

### Winners page (`/winners`)
- [ ] Fetch all giveaways with status = 'drawn' from Supabase
- [ ] Build winners grid with prize image, prize name, partial winner name, date
- [ ] Add social share button

### Admin: giveaway management
- [ ] Create `/admin/layout.tsx` — redirect non-admins away
- [ ] Build `/admin/giveaways/new` form: title, description, ticket price, max tickets, end date, prize value, category
- [ ] Add image upload to Supabase Storage (multiple images)
- [ ] Build `/admin/giveaways` list page showing all giveaways with status
- [ ] Build `/admin/giveaways/[id]` edit page
- [ ] Add "Set as active" / "Cancel" status controls

---

## Phase 3 — Payments & Ticket System (Weeks 5–6)

### Stripe setup
- [ ] Create Stripe account and get API keys
- [ ] Install Stripe: `npm install stripe @stripe/stripe-js`
- [ ] Add Stripe keys to `.env.local`
- [ ] Create `lib/stripe.ts`

### Checkout flow
- [ ] Create `app/api/checkout/route.ts` — creates a Stripe Checkout session
- [ ] Pass giveaway ID, quantity, user ID in session metadata
- [ ] Connect "Enter now" button in `EntryForm.tsx` to this endpoint
- [ ] Create `/success` page shown after Stripe redirects back
- [ ] Create `/cancelled` page if user abandons checkout

### Stripe webhook
- [ ] Create `app/api/webhooks/stripe/route.ts`
- [ ] Verify Stripe signature on every incoming request
- [ ] On `checkout.session.completed`:
  - [ ] Create order record (status: 'paid')
  - [ ] Assign sequential ticket numbers and create ticket rows
  - [ ] Update `giveaway.tickets_sold` count
  - [ ] If `tickets_sold === max_tickets`, trigger auto-draw
- [ ] Test webhook locally with Stripe CLI: `stripe listen --forward-to localhost:3000/api/webhooks/stripe`

### Email notifications
- [ ] Create Resend account and get API key
- [ ] Install Resend: `npm install resend`
- [ ] Create `lib/email.ts` with helper functions
- [ ] Send order confirmation email after ticket purchase
- [ ] Test email delivery

### User profile
- [ ] Build `/profile` page showing user info
- [ ] Show all tickets grouped by giveaway
- [ ] Show all wins
- [ ] Add order history with Stripe receipt links
- [ ] Add "change name / email" settings form

---

## Phase 4 — Draw System & Winners (Weeks 7–8)

### Winner selection
- [ ] Create `lib/draw.ts` with random selection using `crypto.getRandomValues()`
- [ ] Create `app/api/draw/route.ts` — admin-only endpoint
- [ ] Fetch all ticket IDs for the given giveaway
- [ ] Pick a random index and mark that ticket as `is_winner = true`
- [ ] Update giveaway: set `winner_id` and `status = 'drawn'`
- [ ] Log draw details (timestamp, seed, winning ticket number) to a `draw_logs` table

### Winner notifications
- [ ] Send winner email via Resend including: prize name, prize value, claim instructions
- [ ] Update winners page to immediately show new winner

### Draw animation
- [ ] Build draw animation component using Framer Motion
- [ ] Show ticket numbers cycling rapidly before landing on winner
- [ ] Trigger animation when admin clicks "Draw winner"
- [ ] Add confetti effect on winner reveal

### Admin draw controls
- [ ] Add "Draw winner" button to `/admin/giveaways/[id]`
- [ ] Show confirmation dialog before triggering draw
- [ ] Show draw result inline after completion
- [ ] Build `/admin/dashboard` with: total revenue, active giveaways count, tickets sold today, recent orders

---

## Phase 5 — Polish & Launch (Weeks 9–10)

### Error handling & loading states
- [ ] Add `error.tsx` pages for each route group
- [ ] Add `not-found.tsx` for unknown routes
- [ ] Add skeleton components for all data-fetching pages
- [ ] Handle Stripe webhook failures gracefully (retry logic)
- [ ] Show friendly error messages on form failures

### Mobile & accessibility
- [ ] Test every page on mobile (iPhone, Android)
- [ ] Test with keyboard navigation
- [ ] Add `alt` text to all images
- [ ] Confirm colour contrast meets WCAG AA
- [ ] Test countdown timer and real-time updates on mobile

### SEO
- [ ] Add `metadata` export to every `page.tsx`
- [ ] Add dynamic OG image for each giveaway (Next.js `opengraph-image.tsx`)
- [ ] Add `sitemap.ts` and `robots.ts`
- [ ] Add structured data (JSON-LD) for giveaway pages

### Analytics
- [ ] Enable Vercel Analytics (free, zero config)
- [ ] Add Vercel Speed Insights

### Pre-launch checklist
- [ ] Run a full end-to-end test: register → buy ticket → trigger draw → check winner email
- [ ] Test with a real (small amount) Stripe payment, not just test mode
- [ ] Set all Stripe keys to production (live) mode
- [ ] Set `NEXT_PUBLIC_SITE_URL` to your real domain
- [ ] Add custom domain in Vercel settings
- [ ] Review all RLS policies in Supabase one more time
- [ ] Remove all `console.log` debug statements
- [ ] Soft launch: run a test giveaway with friends or family before public announcement

---

## Phase 6 — Post-Launch (Backlog)

These are future features — do not start until the platform is live and stable.

- [ ] Referral system: users get bonus tickets for referring friends
- [ ] Instant win games (scratch cards)
- [ ] Subscription bundles: monthly ticket packs at a discount
- [ ] Live draw streaming (video integration)
- [ ] Social share cards auto-generated for each giveaway
- [ ] Push notifications for low-ticket giveaways
- [ ] Multi-currency support
- [ ] Admin: export entries as CSV
- [ ] Admin: refund flow for cancelled giveaways

---

## Notes

- Always work in a feature branch and test before merging to `main`
- `main` branch = live production — treat it carefully
- When in doubt, build the simplest version first, then improve it
- Use Supabase's built-in dashboard to inspect your database during development
- Stripe test mode cards: `4242 4242 4242 4242` (any future date, any CVC)
