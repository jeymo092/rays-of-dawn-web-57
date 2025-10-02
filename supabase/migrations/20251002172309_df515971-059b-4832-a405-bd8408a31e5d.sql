-- Add explicit restrictive policies for UPDATE and DELETE operations on donations table
-- Financial records should not be modified or deleted by users to maintain data integrity and audit trail
-- Only backend systems using service role can modify records (bypasses RLS)

-- Prevent all users from updating donation records
-- Backend edge functions use service role which bypasses this policy
CREATE POLICY "Prevent user updates to donation records"
ON public.donations
FOR UPDATE
TO authenticated
USING (false);

-- Prevent all users from deleting donation records  
-- Donations are permanent financial records and should not be deleted
CREATE POLICY "Prevent deletion of donation records"
ON public.donations
FOR DELETE
TO authenticated
USING (false);

-- Also prevent anonymous users from any modifications
CREATE POLICY "Prevent anonymous updates to donation records"
ON public.donations
FOR UPDATE
TO anon
USING (false);

CREATE POLICY "Prevent anonymous deletion of donation records"
ON public.donations
FOR DELETE
TO anon
USING (false);

-- Update table comment to document the security model
COMMENT ON TABLE public.donations IS 'Donation records are immutable financial records. INSERT only via backend payment processing (service role). SELECT restricted to donors. UPDATE/DELETE blocked for all users to maintain audit trail. Backend systems can modify via service role which bypasses RLS.';