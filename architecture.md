# Giveaway Platform — Architecture

## Overview

A premium online giveaway platform (similar to MRBIT / Carpatic) built with Next.js 14, Tailwind CSS, shadcn/ui, Framer Motion, Supabase, and Vercel.

---

## Tech Stack

| Layer | Technology | Role |
|---|---|---|
| Framework | Next.js 14 (App Router) | Pages, routing, server-side logic |
| Styling | Tailwind CSS | Utility-first CSS |
| Components | shadcn/ui | Pre-built accessible UI components |
| Animation | Framer Motion | Page transitions, draw animations, countdown |
| Database | Supabase (PostgreSQL) | Data storage, real-time updates |
| Auth | Supabase Auth | Email/password + Google OAuth |
| File storage | Supabase Storage | Prize images |
| Payments | Stripe | Checkout, webhooks, refunds |
| Email | Resend | Winner notifications, order receipts |
| Forms | react-hook-form + zod | Validation |
| Hosting | Vercel | CI/CD, edge deployment |

---

## Folder Structure

```
giveaway-platform/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (main)/
│   │   ├── layout.tsx              # Navbar + footer wrapper
│   │   ├── page.tsx                # Homepage / giveaway listing
│   │   ├── giveaway/
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Single giveaway detail page
│   │   ├── profile/
│   │   │   └── page.tsx            # My tickets + my wins
│   │   └── winners/
│   │       └── page.tsx            # Hall of fame
│   ├── admin/
│   │   ├── layout.tsx              # Admin-only wrapper (role check)
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── giveaways/
│   │   │   ├── page.tsx            # List all giveaways
│   │   │   ├── new/
│   │   │   │   └── page.tsx        # Create giveaway form
│   │   │   └── [id]/
│   │   │       └── page.tsx        # Edit giveaway
│   │   └── users/
│   │       └── page.tsx
│   └── api/
│       ├── webhooks/
│       │   └── stripe/
│       │       └── route.ts        # Stripe webhook handler
│       └── draw/
│           └── route.ts            # Winner selection endpoint
├── components/
│   ├── ui/                         # shadcn/ui copies (auto-generated)
│   ├── giveaway/
│   │   ├── GiveawayCard.tsx        # Card shown on homepage
│   │   ├── CountdownTimer.tsx      # Live countdown to draw
│   │   ├── EntryForm.tsx           # Ticket quantity + checkout button
│   │   └── TicketGrid.tsx          # Visual ticket number display
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── shared/
│       ├── WinnerBanner.tsx        # Shown after draw
│       └── PrizeImage.tsx          # Image with zoom/gallery
├── lib/
│   ├── supabase.ts                 # Supabase client (browser + server)
│   ├── stripe.ts                   # Stripe client setup
│   ├── draw.ts                     # Random winner selection algorithm
│   ├── email.ts                    # Resend email helpers
│   └── utils.ts                    # Shared utilities
├── hooks/
│   ├── useUser.ts                  # Current auth user
│   └── useGiveaway.ts              # Giveaway data + real-time updates
├── types/
│   └── index.ts                    # TypeScript types for all entities
├── .env.local                      # API keys — NEVER commit this file
├── next.config.ts
├── tailwind.config.ts
└── middleware.ts                   # Route protection (admin, auth)
```

---

## Key Architectural Decisions

### Ticket creation rule
Tickets are **only created after Stripe confirms payment** via the `checkout.session.completed` webhook. Never at the point of clicking "buy." This prevents free tickets from being issued if a payment fails.

### Server vs client components
- **Server components** (default): fetch data from Supabase directly, no loading states needed
- **Client components** (`"use client"`): countdown timer, ticket selector, animations, anything interactive

### Admin protection
`middleware.ts` checks the user's `role` field in Supabase before allowing access to `/admin/*`. Non-admins are redirected to the homepage.

### Draw fairness
The winner selection in `lib/draw.ts` uses a cryptographically seeded random index into the tickets array. The draw is logged with a timestamp and seed so it can be audited.

### Real-time ticket counter
Supabase Realtime subscription on the `tickets` table updates `tickets_sold` live on the giveaway page without requiring a page refresh.

---

## Environment Variables

```
# .env.local
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=        # Server-only, never expose to browser

STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

RESEND_API_KEY=

NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

---

## Data Flow — Ticket Purchase

```
User clicks "Buy tickets"
    ↓
EntryForm.tsx → POST /api/checkout (creates Stripe session)
    ↓
Redirect to Stripe Checkout page
    ↓
User completes payment
    ↓
Stripe sends webhook → POST /api/webhooks/stripe
    ↓
Webhook handler verifies signature
    ↓
Creates order record (status: 'paid')
    ↓
Creates ticket records in DB
    ↓
Updates giveaway tickets_sold count
    ↓
If tickets_sold === max_tickets → auto-trigger draw
    ↓
User receives confirmation email
```

---

## Data Flow — Winner Draw

```
Admin clicks "Draw winner" (or auto-triggered)
    ↓
POST /api/draw { giveawayId }
    ↓
Fetch all ticket IDs for this giveaway
    ↓
Pick random index using crypto.getRandomValues()
    ↓
Mark winning ticket: is_winner = true
    ↓
Update giveaway: winner_id, status = 'drawn'
    ↓
Send winner notification email via Resend
    ↓
Trigger draw animation on frontend (Framer Motion)
```
