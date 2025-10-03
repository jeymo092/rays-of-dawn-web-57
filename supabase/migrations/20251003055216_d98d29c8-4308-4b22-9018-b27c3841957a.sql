-- Drop existing policy
DROP POLICY IF EXISTS "Users can view their own donations" ON public.donations;

-- Create improved policy with explicit authentication check
CREATE POLICY "Users can view their own donations" 
ON public.donations 
FOR SELECT 
TO authenticated
USING (
  auth.uid() IS NOT NULL 
  AND auth.email() IS NOT NULL 
  AND donor_email IS NOT NULL 
  AND auth.email() = donor_email
);

-- Add documentation
COMMENT ON POLICY "Users can view their own donations" ON public.donations IS 
'Authenticated users can only view donations where their verified email matches the donor_email. All three values (auth.uid, auth.email, donor_email) must be non-null for maximum security.';

-- Ensure donor_email is always set for new donations
ALTER TABLE public.donations 
ALTER COLUMN donor_email SET NOT NULL;

-- Add column comment about the security model
COMMENT ON COLUMN public.donations.donor_email IS 
'Email address of the donor. Required for all donations to enable secure access via RLS policies.';