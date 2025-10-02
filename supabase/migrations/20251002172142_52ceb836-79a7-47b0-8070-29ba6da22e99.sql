-- Fix: Remove unrestricted INSERT policy on donations table
-- Donations should only be created through validated payment processing edge functions
-- The edge functions use service role key which bypasses RLS, so this won't break functionality

DROP POLICY IF EXISTS "Allow public donations insert" ON public.donations;

-- Add a comment to document why there's no INSERT policy
COMMENT ON TABLE public.donations IS 'Donation records can only be created by backend payment processing functions using service role. Direct client INSERT is not allowed to prevent fraudulent records.';