import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';
import type { Database } from '@/integrations/supabase/types';

type HelpCategory = Database['public']['Enums']['help_category'];
type RequestStatus = Database['public']['Enums']['request_status'];
type UrgencyLevel = Database['public']['Enums']['urgency_level'];
type AppRole = Database['public']['Enums']['app_role'];

export interface AdminRequest {
  id: string;
  user_id: string;
  category: HelpCategory;
  title: string;
  description: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  city: string | null;
  location: string | null;
  image_url: string | null;
  is_verified: boolean;
  verified_by: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
  requester_name: string | null;
  requester_avatar: string | null;
}

export interface AdminUser {
  id: string;
  user_id: string;
  full_name: string;
  phone: string | null;
  avatar_url: string | null;
  city: string | null;
  bio: string | null;
  is_helper: boolean | null;
  is_seeker: boolean | null;
  created_at: string;
  updated_at: string;
  roles: AppRole[] | null;
}

export function useIsAdmin() {
  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin'
      });

      if (!error) {
        setIsAdmin(data === true);
      }
      setLoading(false);
    };

    checkAdmin();
  }, [user]);

  return { isAdmin, loading };
}

export function useAdminRequests() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [requests, setRequests] = useState<AdminRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchRequests = useCallback(async () => {
    if (!user || !isAdmin) {
      setRequests([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('admin_requests_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin requests:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch requests',
        variant: 'destructive',
      });
    } else {
      setRequests((data as AdminRequest[]) || []);
    }
    setLoading(false);
  }, [user, isAdmin, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchRequests();
    }
  }, [isAdmin, fetchRequests]);

  const verifyRequest = async (requestId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('help_requests')
      .update({
        is_verified: true,
        verified_by: user.id,
        verified_at: new Date().toISOString(),
      })
      .eq('id', requestId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to verify request',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Request verified successfully',
      });
      fetchRequests();
    }
  };

  const unverifyRequest = async (requestId: string) => {
    const { error } = await supabase
      .from('help_requests')
      .update({
        is_verified: false,
        verified_by: null,
        verified_at: null,
      })
      .eq('id', requestId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to unverify request',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Request unverified',
      });
      fetchRequests();
    }
  };

  const deleteRequest = async (requestId: string) => {
    const { error } = await supabase
      .from('help_requests')
      .delete()
      .eq('id', requestId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete request',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Request deleted successfully',
      });
      fetchRequests();
    }
  };

  const updateRequestStatus = async (requestId: string, status: RequestStatus) => {
    const { error } = await supabase
      .from('help_requests')
      .update({ status })
      .eq('id', requestId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update request status',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Request status updated',
      });
      fetchRequests();
    }
  };

  return {
    requests,
    loading,
    refetch: fetchRequests,
    verifyRequest,
    unverifyRequest,
    deleteRequest,
    updateRequestStatus,
  };
}

export function useAdminUsers() {
  const { user } = useAuth();
  const { isAdmin } = useIsAdmin();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchUsers = useCallback(async () => {
    if (!user || !isAdmin) {
      setUsers([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    const { data, error } = await supabase
      .from('admin_users_view')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching admin users:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch users',
        variant: 'destructive',
      });
    } else {
      setUsers((data as AdminUser[]) || []);
    }
    setLoading(false);
  }, [user, isAdmin, toast]);

  useEffect(() => {
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin, fetchUsers]);

  const addRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role });

    if (error) {
      toast({
        title: 'Error',
        description: error.message.includes('duplicate') 
          ? 'User already has this role' 
          : 'Failed to add role',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Role added successfully',
      });
      fetchUsers();
    }
  };

  const removeRole = async (userId: string, role: AppRole) => {
    const { error } = await supabase
      .from('user_roles')
      .delete()
      .eq('user_id', userId)
      .eq('role', role);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove role',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Role removed successfully',
      });
      fetchUsers();
    }
  };

  return {
    users,
    loading,
    refetch: fetchUsers,
    addRole,
    removeRole,
  };
}
