import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Loader2 } from 'lucide-react';

export default function MessagesPage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[50vh]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!user) {
    navigate('/auth');
    return null;
  }

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <MessageSquare className="h-8 w-8 text-primary" />
          Messages
        </h1>

        <Card>
          <CardHeader>
            <CardTitle>Your Conversations</CardTitle>
            <CardDescription>
              Messages with helpers and seekers will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p className="font-medium">No messages yet</p>
              <p className="text-sm">
                When you respond to help requests or receive responses, your conversations will appear here.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}