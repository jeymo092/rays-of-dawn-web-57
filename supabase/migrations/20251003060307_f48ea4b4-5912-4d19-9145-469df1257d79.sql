-- Grant SELECT permission only to authenticated users
-- The view will enforce RLS through security_invoker, meaning authenticated users
-- can only see donations where their email matches donor_email
GRANT SELECT ON public.donations_safe TO authenticated;

-- Ensure anon and public roles have no access
REVOKE ALL ON public.donations_safe FROM anon;
REVOKE ALL ON public.donations_safe FROM public;

-- Verify the security model with updated documentation
COMMENT ON VIEW public.donations_safe IS 
'SECURITY MODEL: This view is only accessible to authenticated users. It inherits RLS policies from the donations table via security_invoker=true, meaning users can only view donations where auth.email() matches donor_email. The view excludes sensitive PII (phone numbers, api_ref, order_tracking_id). Anonymous and public access is explicitly denied.';