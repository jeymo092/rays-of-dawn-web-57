-- Fix: Remove publicly readable view exposing donor PII
-- Rationale: The donations_safe view is not used by the app and created a potential data exposure.
-- We drop it to eliminate the attack surface. The main donations table remains protected by RLS.

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_views
    WHERE schemaname = 'public' AND viewname = 'donations_safe'
  ) THEN
    EXECUTE 'DROP VIEW public.donations_safe';
  END IF;
END $$;

-- Safety: ensure no leftover grants exist (noop if view is dropped)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_class c
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public' AND c.relname = 'donations_safe'
  ) THEN
    EXECUTE 'REVOKE ALL ON public.donations_safe FROM PUBLIC, anon, authenticated';
  END IF;
END $$;

-- Documentation for auditors
COMMENT ON SCHEMA public IS 'donations_safe view removed to prevent public exposure of donor PII; use donations table with RLS for any access';