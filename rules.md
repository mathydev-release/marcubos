# PROJECT RULES

You are building a premium online giveaway platform similar to MRBIT and Carpatic.

The platform allows users to buy tickets for giveaways containing:
- Cars
- Cash prizes
- Phones

The platform design must feel:
- Premium
- Modern
- Dark luxury
- Highly animated
- Casino-inspired
- Mobile-first
- Conversion optimized

==================================================
TECH STACK
==================================================

Frontend:
- Next.js latest App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Framer Motion

Backend:
- Supabase
- PostgreSQL

Hosting:
- Vercel

Payments:
- Stripe
- Netopia

==================================================
UI RULES
==================================================

- Use reusable components
- Use responsive design
- Mobile-first approach
- Smooth animations only
- Avoid excessive motion
- Use dark theme
- Use glassmorphism
- Use gradients carefully
- Keep typography clean and premium

==================================================
CODE RULES
==================================================

- NEVER rewrite entire files unnecessarily
- NEVER break existing functionality
- ALWAYS explain what changed
- ALWAYS keep components modular
- ALWAYS use TypeScript strict typing
- ALWAYS use async/await
- NEVER use any
- NEVER add unused dependencies
- NEVER duplicate code
- ALWAYS optimize for performance

==================================================
FOLDER STRUCTURE
==================================================

Use scalable folder structure:
- app/
- components/
- features/
- lib/
- hooks/
- services/
- types/

==================================================
AUTH
==================================================

Use Supabase Auth.

Support:
- email/password
- Google login

==================================================
FEATURES
==================================================

Required features:
- User accounts
- Ticket purchasing
- Giveaway pages
- Countdown timers
- Winner selection
- Referral system
- User dashboard
- Admin dashboard
- Payment integration
- Notifications

==================================================
ADMIN PANEL
==================================================

Admin can:
- Create giveaways
- Upload images
- Manage users
- Select winners
- Manage payments
- View analytics

==================================================
DESIGN REFERENCES
==================================================

References:
- MRBIT
- Carpatic

The design quality should be modern SaaS + premium casino UI.

==================================================
PERFORMANCE
==================================================

- Optimize all images
- Lazy load where possible
- Keep Lighthouse score high
- Prioritize fast loading

==================================================
SECURITY
==================================================

- Validate all inputs
- Protect API routes
- Prevent fraud
- Prevent spam
- Protect authentication routes

==================================================
DEVELOPMENT RULES
==================================================

Before making changes:
1. Analyze existing code
2. Explain plan
3. Make minimal safe changes
4. Verify no existing features break

Always act like a senior software architect.