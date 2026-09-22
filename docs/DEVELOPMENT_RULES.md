# RentWork — Development Rules

## 1. General Engineering Standards
* **Strict TypeScript**: Never use `any`. Write explicit interfaces and types for all props, database entities, and API payloads.
* **Production Quality**: No mock or placeholder logic where real functionality is expected. If a phase specifies foundation only, implement cleanly structured foundations without faking business outcomes.
* **Component Modularity**: Check for existing components in `components/ui/` and `components/layout/` before creating new ones. Keep components focused, small, and reusable.

## 2. Server vs. Client Rules
* **Default to Server Components**: In Next.js App Router, all components are Server Components by default. Add `'use client'` strictly when using React hooks (`useState`, `useEffect`, `useForm`) or attaching DOM event handlers (`onClick`, `onChange`).
* **Server Actions for Mutations**: Execute database writes via typed Server Actions in `actions/`. Validate all inputs with Zod schemas from `lib/validations/`.

## 3. Database & Supabase Conventions
* Always query via typed clients generated from the schema.
* Respect database RLS; never disable RLS in migrations or production scripts.
* Handle database errors gracefully, returning user-friendly messages rather than exposing raw database exceptions.

## 4. Quality Assurance Checklist Before Turn Completion
1. Run `npm run lint` or `npx tsc --noEmit` to guarantee 0 TypeScript errors.
2. Verify production build passes cleanly (`npm run build`).
3. Update `docs/ROADMAP.md` and `docs/CHANGELOG.md` with every verified milestone.
