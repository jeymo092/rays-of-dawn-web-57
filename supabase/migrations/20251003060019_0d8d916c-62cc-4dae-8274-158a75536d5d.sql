-- Create a safe view for donations that excludes sensitive PII (phone numbers)
-- This view provides user access to donation data without exposing phone numbers
CREATE OR REPLACE VIEW public.donations_safe AS
SELECT
  id,
  amount,
  net_amount,
  created_at,
  updated_at,
  payment_method,
  donation_type,
  status,
  currency,
  donor_email,
  invoice_id
  -- Explicitly excludes: donor_phone, api_ref, order_tracking_id
FROM public.donations;

-- Enable RLS on the view (inherits from base table)
ALTER VIEW public.donations_safe SET (security_invoker = true);

-- Grant access to authenticated users
GRANT SELECT ON public.donations_safe TO authenticated;

-- Add documentation
COMMENT ON VIEW public.donations_safe IS 
'Safe view of donations table that excludes sensitive PII (phone numbers) and internal tracking IDs. Use this view for user-facing queries instead of accessing the donations table directly.';

-- Add additional column documentation for sensitive fields
COMMENT ON COLUMN public.donations.donor_phone IS 
'SENSITIVE PII: Phone number of donor. Should only be accessed by backend services for legitimate business purposes (receipts, support). Never expose directly to frontend.';

COMMENT ON COLUMN public.donations.api_ref IS 
'INTERNAL: Payment gateway API reference. For backend reconciliation only.';

COMMENT ON COLUMN public.donations.order_tracking_id IS 
'INTERNAL: Order tracking identifier. For backend reconciliation only.';

-- Create a security reminder function that edge functions should call
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access(
  accessed_table text,
  operation text,
  user_email text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- This function serves as documentation and can be extended for audit logging
  -- Backend services accessing sensitive donation data should call this function
  RAISE LOG 'SECURITY_AUDIT: Service role accessed % for % by %', 
    accessed_table, operation, COALESCE(user_email, 'system');
END;
$$;

COMMENT ON FUNCTION public.log_sensitive_data_access IS 
'Security audit function. Backend services should call this when accessing sensitive donation data via service role to maintain audit trail.';