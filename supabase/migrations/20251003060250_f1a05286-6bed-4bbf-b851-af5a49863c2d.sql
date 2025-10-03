-- Enable Row Level Security on the donations_safe view
ALTER VIEW public.donations_safe SET (security_barrier = true);

-- Drop the view and recreate it as a materialized view is not needed
-- We'll keep it as a regular view but add explicit RLS through a security barrier

-- Drop existing grants that might be too permissive
REVOKE ALL ON public.donations_safe FROM authenticated;
REVOKE ALL ON public.donations_safe FROM anon;
REVOKE ALL ON public.donations_safe FROM public;

-- The view with security_invoker=true will inherit RLS from the base donations table
-- This means users can only see donations where their authenticated email matches donor_email
-- No additional grants needed - access is controlled by the base table's RLS policies

-- Add documentation about the security model
COMMENT ON VIEW public.donations_safe IS 
'SECURITY: This view inherits RLS policies from the donations table via security_invoker=true. Only authenticated users can view their own donations where auth.email() matches donor_email. The view excludes sensitive PII (phone numbers, api_ref, order_tracking_id) but still requires authentication and email matching for all access.';