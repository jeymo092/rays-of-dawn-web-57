-- Fix search_path for log_sensitive_data_access function
CREATE OR REPLACE FUNCTION public.log_sensitive_data_access(
  accessed_table text,
  operation text,
  user_email text DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- This function serves as documentation and can be extended for audit logging
  -- Backend services accessing sensitive donation data should call this function
  RAISE LOG 'SECURITY_AUDIT: Service role accessed % for % by %', 
    accessed_table, operation, COALESCE(user_email, 'system');
END;
$$;