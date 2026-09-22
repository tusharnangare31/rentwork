# RentWork — Changelog

All notable changes to the RentWork architecture and codebase will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [Phase 1 - Project Foundation] - 2026-09-20

### Added
- Created complete architectural documentation suite in `/docs`:
  - `docs/PRD.md` (Product Requirements Document)
  - `docs/ARCHITECTURE.md` (System Architecture & Component Boundaries)
  - `docs/DATABASE.md` (PostgreSQL Schema & ERD)
  - `docs/AUTH.md` (Supabase Auth, Identity vs. Authorization)
  - `docs/RENTAL_ENGINE.md` (Availability overlap algorithms & tiered pricing)
  - `docs/API.md` (Server Actions & Webhook route specifications)
  - `docs/UI_UX.md` (B2B design system, colors, typography, components)
  - `docs/EMAIL.md` (Resend transactional notification matrix)
  - `docs/PAYMENTS.md` (Razorpay payment flow & HMAC signature verification)
  - `docs/SECURITY.md` (Row Level Security & secret key isolation guidelines)
  - `docs/DEVELOPMENT_RULES.md` (Engineering rules, TypeScript standards)
  - `docs/ROADMAP.md` (Multi-phase delivery roadmap)
- Created `AI_MASTER_PROMPT.md` for consistent agent orchestration across development phases.
- Initialized complete folder hierarchy:
  - `types/` (TypeScript domain definitions for Auth, Database, Products, Rentals)
  - `lib/supabase/` (Browser, Server, and Middleware client foundations)
  - `lib/validations/` (Zod schemas for Auth, Products, and Rentals)
  - `lib/pricing/` (Rental pricing formulas & temporal overlap calculation engine)
  - `actions/` (Server Actions contracts for Auth, Products, Rentals, Companies, Payments)
  - `components/ui/` (Shadcn-compatible Button, Badge, Card, Input, Label, Loading, Error, Empty State)
  - `components/layout/` (B2B Navbar with mobile drawer, Footer)
  - `components/marketing/` (Hero with search bar, Categories preview, 4-step How It Works, Business Benefits, CTA)
  - `supabase/migrations/` (`20260920000001_initial_schema.sql` covering all 12 core tables and RLS)
  - `supabase/seed.sql` (Reference categories and setup data)
- Updated `.env.example` with Supabase, Resend, and Razorpay configuration templates.
- Established clean B2B SaaS visual identity with Plus Jakarta Sans typography and Slate/Teal color palette.
