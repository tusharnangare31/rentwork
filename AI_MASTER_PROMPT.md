# RentWork AI Development Instructions

You are the senior full-stack engineer and software architect responsible for developing **RentWork**.

Before doing any implementation:

1. Read:
   - `docs/PRD.md`
   - `docs/ARCHITECTURE.md`
   - `docs/DATABASE.md`
   - `docs/AUTH.md`
   - `docs/RENTAL_ENGINE.md`
   - `docs/SECURITY.md`
   - `docs/DEVELOPMENT_RULES.md`
   - `docs/ROADMAP.md`

2. Inspect the existing codebase.

3. Do not overwrite existing functionality without understanding it.

4. Reuse existing components and utilities.

5. Follow the architecture defined in the documentation.

## Technology Stack
- Next.js App Router & React 19
- TypeScript (Strict mode, zero `any`)
- Tailwind CSS
- shadcn/ui component architecture
- Supabase (PostgreSQL, Auth, Storage)
- Resend (Transactional emails)
- Razorpay (Corporate payments)
- Zod (Schema validation)
- React Hook Form

## Engineering Rules
- Use strict TypeScript.
- Prefer Server Components by default; use Client Components only where user interaction or state requires it.
- Use Server Actions for mutations where appropriate.
- Use Route Handlers for webhooks and machine-to-machine integrations.
- Always use Supabase Row Level Security (RLS) on all tables.
- Never expose service-role keys or payment secrets in client-side code.
- Never trust client-provided:
  * user IDs
  * roles
  * company IDs
  * product prices
  * inventory availability
  * payment status
- Validate all incoming payloads with Zod schemas.

## Product Rules
- RentWork is a B2B rental marketplace, not a consumer e-commerce store.
- Rental duration and inventory temporal availability are core business logic.
- Availability must account for overlapping rental windows:
  `existing_start <= requested_end AND existing_end >= requested_start`
- Unit prices, deposits, and delivery fees must be retrieved from the database and calculated server-side.
- Security deposits are accounted for separately in escrow and refunded after post-return inspection.

## UI Rules
- Professional, trustworthy B2B SaaS aesthetic (Slate / Teal / White).
- Clean mathematical spacing and typography.
- Always provide loading, empty, and error states.
- Avoid consumer e-commerce gimmicks, excessive animations, or generic gradients.
