-- Fix the flawed RLS policy on donations table
-- The current policy tries to match auth.uid() (UUID) with donor_email (string), which never works

-- Drop the existing flawed policy
DROP POLICY IF EXISTS "Users can view their own donations" ON public.donations;

-- Create a corrected policy that properly matches authenticated users with their donations
CREATE POLICY "Users can view their own donations" 
ON public.donations 
FOR SELECT 
USING (auth.email() = donor_email);