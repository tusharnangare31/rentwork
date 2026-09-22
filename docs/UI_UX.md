# RentWork — UI & UX Design System

## 1. Brand Identity & Design Direction
RentWork's aesthetic is that of a modern, institutional, trustworthy B2B SaaS marketplace. It communicates operational dependability, financial efficiency, and enterprise precision.

### 1.1 Core Principles
* **Executive Clarity**: Clean contrast, structured tabular alignments, and unambiguous financial figures.
* **Anti-Clutter**: No distracting carnival gradients, aggressive dark-mode glows, or consumer e-commerce promotional banners.
* **Predictable Hierarchy**: Strict typographic scaling, mathematical spacing, and cohesive border radius rules.

## 2. Color Palette
* **Primary (Slate / Indigo)**: Deep slate-900 (`#0f172a`) for dominant actions, headings, and high-contrast badges; subtle slate-600 (`#475569`) for body text.
* **Accent (Teal / Cyan)**: Clean corporate teal (`#0d9488` / `#0f766e`) for active highlights and positive status badges.
* **Canvas Neutrals**: Clean slate-50 (`#f8fafc`) page background with crisp white (`#ffffff`) card containers and hairline slate-200 (`#e2e8f0`) structural borders.
* **Feedback States**:
  - Success: Emerald-600 (`#059669`) / Emerald-50 background.
  - Warning: Amber-600 (`#d97706`) / Amber-50 background.
  - Destructive: Rose-600 (`#e11d48`) / Rose-50 background.

## 3. Typography Scale
* **Font Family**: Plus Jakarta Sans for both display and body copy, delivering crisp readability on both desktop monitors and mobile devices.
* **Type Scale**:
  - Display Hero: `text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight`
  - Section Headings: `text-2xl md:text-3xl font-bold tracking-tight text-slate-900`
  - Card Titles: `text-lg font-semibold text-slate-900`
  - Body Text: `text-base text-slate-600 leading-relaxed`
  - Metadata / Micro-labels: `text-xs md:text-sm font-medium text-slate-500 uppercase tracking-wider`

## 4. Reusable Primitives
* **Button**:
  - `default`: High-contrast slate-900 with white text and subtle shadow.
  - `outline`: White background, slate-200 border, slate-700 text.
  - `secondary`: Slate-100 background, slate-800 text.
  - `ghost`: Transparent with hover background.
* **Badge / Status**:
  - Strict mathematical padding, uppercase micro-type, colored background indicator dot.
* **Card**:
  - Crisp white background, 1px solid slate-200/80 border, subtle hover elevation on interactive cards.
* **Feedback States**:
  - Dedicated Loading Spinner & Skeleton states.
  - Form field error messages integrated with Zod validation.
  - Empty State component with icon, explanation, and clear call-to-action button.
