-- Allow all authenticated users to view open requests (for browse/helper discovery)
-- The public view already hides contact_phone, so this is safe

CREATE POLICY "Anyone can view open requests"
ON public.help_requests
FOR SELECT
USING (status = 'open');