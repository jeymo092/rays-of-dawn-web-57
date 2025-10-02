-- Add explicit restrictive INSERT policy for donations table
-- Donations can ONLY be created by backend payment processing edge functions
-- which use service role key and bypass RLS
-- This policy explicitly blocks all user-initiated INSERTs for security auditing

-- Block authenticated users from inserting donation records
CREATE POLICY "Prevent user inserts to donation records"
ON public.donations
FOR INSERT
TO authenticated
WITH CHECK (false);

-- Block anonymous users from inserting donation records
CREATE POLICY "Prevent anonymous inserts to donation records"
ON public.donations
FOR INSERT
TO anon
WITH CHECK (false);

-- Add additional context to table comment
COMMENT ON TABLE public.donations IS 'Donation records are immutable financial records managed exclusively by backend systems. All operations (INSERT/UPDATE/DELETE) are blocked for regular users. Backend payment processing edge functions use service role which bypasses RLS to create and manage records. This ensures data integrity and prevents fraudulent donation records.';