-- Fix security definer views by recreating them with security_invoker = true
-- This ensures RLS policies of the querying user are applied

DROP VIEW IF EXISTS public.admin_requests_view;
CREATE VIEW public.admin_requests_view 
WITH (security_invoker = true)
AS
SELECT 
  hr.id,
  hr.user_id,
  hr.category,
  hr.title,
  hr.description,
  hr.urgency,
  hr.status,
  hr.city,
  hr.location,
  hr.image_url,
  hr.additional_info,
  hr.contact_phone,
  hr.is_verified,
  hr.verified_by,
  hr.verified_at,
  hr.created_at,
  hr.updated_at,
  p.full_name as requester_name,
  p.avatar_url as requester_avatar
FROM public.help_requests hr
LEFT JOIN public.profiles p ON hr.user_id = p.user_id;

DROP VIEW IF EXISTS public.admin_users_view;
CREATE VIEW public.admin_users_view 
WITH (security_invoker = true)
AS
SELECT 
  p.id,
  p.user_id,
  p.full_name,
  p.phone,
  p.avatar_url,
  p.city,
  p.bio,
  p.is_helper,
  p.is_seeker,
  p.created_at,
  p.updated_at,
  (SELECT array_agg(ur.role) FROM public.user_roles ur WHERE ur.user_id = p.user_id) as roles
FROM public.profiles p;