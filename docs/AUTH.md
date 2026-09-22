# RentWork — Authentication & Authorization

## 1. Core Principles: Identity vs. Authorization
* **Authentication (Identity)**: Answers "Who are you?". Handled via Supabase Auth supporting:
  - Google OAuth
  - Microsoft OAuth
  - Email & Password
* **Authorization (Permissions)**: Answers "What are you permitted to do?". Handled exclusively by PostgreSQL role records in `public.profiles` and database Row Level Security (RLS) policies.
* **Strict Invariant**: Client-side tokens or frontend user metadata are NEVER trusted for authorization. All authorization derives from the server session and database queries.

## 2. User Roles Hierarchy
| Role | Scope | Permitted Actions |
| :--- | :--- | :--- |
| `CUSTOMER` | Client Business | Browse catalog, create rental requests, checkout, view own orders, manage invoices. |
| `COMPANY_STAFF` | Specific Vendor Company | View assigned company's orders, inspect returns, view products. |
| `COMPANY_ADMIN` | Specific Vendor Company | Full company management: inventory CRUD, pricing, request approval/rejection, team members. |
| `PLATFORM_ADMIN` | Entire Platform | Vendor approval, global taxonomy curation, dispute resolution, platform analytics. |

## 3. Session Handling & Middleware Flow
1. **Next.js Middleware (`lib/supabase/middleware.ts`)**:
   - Refreshes auth tokens on incoming requests.
   - Redirects unauthenticated users attempting to access `/dashboard/*`, `/company/*`, or `/admin/*`.
2. **Server-side Profile Verification**:
   - Protected routes query `profiles` using the authenticated `user.id`.
   - Any mismatch between route requirement and user role redirects to an unauthorized notice.

## 4. Auto-Provisioning Profile Trigger
When a user signs up through Supabase Auth (OAuth or email), a database trigger automatically executes:
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, avatar_url, role)
  VALUES (
    new.id,
    new.email,
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url',
    'CUSTOMER'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

## 5. OAuth Provider Configuration
* Google Cloud Console OAuth 2.0 Client configured with Authorized Redirect URI:
  `https://<project-ref>.supabase.co/auth/v1/callback`
* Azure AD / Microsoft Entra ID configured with matching redirect endpoint.
