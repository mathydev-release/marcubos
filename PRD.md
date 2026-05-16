# Product Requirements Document (PRD)
## Giveaway Platform

**Version:** 1.0  
**Status:** In development  
**Stack:** Next.js 14 · Tailwind · shadcn/ui · Framer Motion · Supabase · Vercel

---

## 1. Product Vision

A premium, trustworthy online giveaway platform where users purchase tickets to enter draws for high-value prizes. The platform is transparent, fast, and mobile-first — with a clean UI that builds confidence in every draw.

**Comparable platforms:** MRBIT, Carpatic

---

## 2. User Roles

| Role | Description |
|---|---|
| **Guest** | Can browse giveaways and view winners. Cannot purchase tickets. |
| **User** | Registered user who can purchase tickets, view their history, and see their wins. |
| **Admin** | Can create/edit giveaways, upload images, manage users, and trigger draws. |

---

## 3. Core Features

### 3.1 Public Homepage
- Grid of active giveaway cards showing: prize image, title, prize value, ticket price, progress bar (tickets sold / max), countdown timer
- Filter by category (electronics, cars, cash, experiences)
- Sort by: ending soonest, most popular, lowest ticket price
- Search by prize name
- "Recent winners" section at the bottom

### 3.2 Giveaway Detail Page
- Image gallery with zoom (2–5 photos)
- Prize title, description, estimated value
- Live countdown timer (days / hours / minutes / seconds)
- Ticket progress bar with live updates
- Ticket number selector (min 1, max configurable per giveaway)
- Total price calculation
- "Enter now" button → Stripe Checkout
- List of recent ticket purchases (username + quantity, anonymised)
- Terms & conditions section

### 3.3 Authentication
- Email + password registration
- Google OAuth (one-click)
- Email verification on signup
- Password reset via email
- Session persists across browser refreshes

### 3.4 User Profile
- View all tickets purchased (grouped by giveaway)
- View wins with prize details
- Account settings: change name, email, password
- Order history with Stripe receipt links

### 3.5 Checkout & Payments
- Stripe Checkout hosted page (handles card details — no PCI scope for us)
- Success page after payment with ticket numbers assigned
- Tickets only created after `checkout.session.completed` webhook fires
- Failed payments do not create any tickets
- Refund policy displayed before purchase

### 3.6 Draw System
- Auto-draw triggers when all tickets are sold
- Admin can manually trigger a draw at any time from the admin panel
- Random selection using `crypto.getRandomValues()` — cryptographically fair
- Draw is logged: timestamp, total tickets, winning ticket number, winner user ID
- Winner is notified by email immediately after draw
- Animated draw sequence shown on the giveaway page (Framer Motion)
- Giveaway status updates to "drawn" and winner is publicly displayed

### 3.7 Admin Panel
- Dashboard: total revenue, active giveaways, tickets sold today
- Create giveaway: title, description, prize value, ticket price, max tickets, end date, images, category
- Edit giveaway: all fields, plus ability to cancel (triggers refund flow)
- View all entries per giveaway
- Trigger manual draw
- User list with search and role management
- Export entries as CSV

### 3.8 Winners Hall of Fame
- Public page listing all past winners
- Shows: prize image, prize name, winner username (partial), draw date
- Social share button per win

---

## 4. Non-Functional Requirements

| Requirement | Target |
|---|---|
| Page load time | < 2 seconds on 4G |
| Mobile responsiveness | 100% — mobile-first design |
| Uptime | 99.9% (Vercel SLA) |
| Payment security | Stripe handles all card data (PCI compliant) |
| Auth security | Supabase Auth with JWT tokens |
| Draw auditability | Every draw logged with seed + timestamp |

---

## 5. Out of Scope (v1.0)

The following features are intentionally excluded from the first version to keep scope manageable:

- Live draw streaming (video)
- Referral / affiliate system
- Instant win games
- Subscription bundles (monthly ticket packs)
- Native mobile app
- Multi-currency support
- Physical prize shipping tracking

These are candidates for v1.1 and beyond.

---

## 6. User Stories

### Guest
- As a guest, I want to browse all active giveaways so I can decide if I want to register.
- As a guest, I want to see past winners so I know the draws are real.

### User
- As a user, I want to register quickly (including via Google) so I can start entering giveaways.
- As a user, I want to select how many tickets I buy so I can control my spend.
- As a user, I want to see my tickets and their numbers so I know I'm entered.
- As a user, I want to be notified by email if I win so I don't miss it.
- As a user, I want to see my full purchase history so I can track my spending.

### Admin
- As an admin, I want to create a giveaway with images and a set number of tickets so I can launch a new draw.
- As an admin, I want to trigger a draw at any time so I have control over the schedule.
- As an admin, I want to see a revenue dashboard so I know how the platform is performing.
- As an admin, I want to export entries as CSV so I can keep records.

---

## 7. Pages Summary

| Page | Route | Access |
|---|---|---|
| Homepage | `/` | Public |
| Giveaway detail | `/giveaway/[id]` | Public |
| Winners | `/winners` | Public |
| Login | `/login` | Guest only |
| Register | `/register` | Guest only |
| User profile | `/profile` | Logged in |
| Admin dashboard | `/admin/dashboard` | Admin only |
| Admin — giveaways | `/admin/giveaways` | Admin only |
| Admin — new giveaway | `/admin/giveaways/new` | Admin only |
| Admin — edit giveaway | `/admin/giveaways/[id]` | Admin only |
| Admin — users | `/admin/users` | Admin only |

---

## 8. Success Metrics (post-launch)

- Conversion rate: visitors who purchase at least one ticket
- Average tickets per order
- Return user rate (users who enter more than one giveaway)
- Revenue per giveaway
- Draw-to-winner email open rate
