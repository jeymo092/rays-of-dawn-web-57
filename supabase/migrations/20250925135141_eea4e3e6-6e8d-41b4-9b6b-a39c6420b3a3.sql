-- Remove the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Allow reading donations" ON public.donations;

-- Create a restrictive policy that only allows authenticated users to view their own donations
-- This prevents public exposure of sensitive donor information
CREATE POLICY "Users can view their own donations"
ON public.donations
FOR SELECT
TO authenticated
USING (auth.uid()::text = donor_email OR auth.email() = donor_email);

-- Alternative: If you need admin access, create an admin-only policy
-- First create this policy for administrators (uncomment if needed)
-- CREATE POLICY "Admins can view all donations"
-- ON public.donations  
-- FOR SELECT
-- TO authenticated
-- USING (auth.jwt() ->> 'role' = 'admin');

-- Note: The above policies require user authentication to be implemented
-- If no authentication system exists, consider creating a more restrictive approach