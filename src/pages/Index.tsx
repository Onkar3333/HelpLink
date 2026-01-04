import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Layout } from '@/components/layout/Layout';
import { CategoryCard } from '@/components/requests/CategoryCard';
import { HELP_CATEGORIES } from '@/lib/constants';
import { useAuth } from '@/hooks/useAuth';
import { useHelpRequests } from '@/hooks/useHelpRequests';
import { RequestCard } from '@/components/requests/RequestCard';
import { 
  HandHeart, 
  Users, 
  Clock, 
  Shield, 
  ArrowRight,
  Sparkles 
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { requests, loading } = useHelpRequests({ status: 'open' });
  
  const urgentRequests = requests.filter(r => r.urgency === 'critical' || r.urgency === 'urgent').slice(0, 3);
  const recentRequests = requests.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Sparkles className="h-4 w-4" />
              Connecting Hearts, Building Hope
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Help Someone Today,
              <br />
              <span className="text-gradient">Change a Life Forever</span>
            </h1>
            
            <p className="mb-10 text-lg text-muted-foreground md:text-xl">
              HELPLINK connects people who need help with people who want to help. 
              From medical emergencies to food support, find or offer help in your community.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" className="gap-2" onClick={() => navigate(user ? '/create' : '/auth?mode=signup')}>
                <HandHeart className="h-5 w-5" />
                Request Help
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={() => navigate('/browse')}>
                <Users className="h-5 w-5" />
                Become a Helper
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 blur-3xl" />
      </section>

      {/* Stats Section */}
      <section className="border-y bg-muted/30">
        <div className="container py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">10+</div>
              <div className="text-sm text-muted-foreground">Help Categories</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary">24/7</div>
              <div className="text-sm text-muted-foreground">Available Support</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-accent">Fast</div>
              <div className="text-sm text-muted-foreground">Response Time</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Free to Use</div>
            </div>
          </div>
        </div>
      </section>

      {/* Urgent Requests Section */}
      {urgentRequests.length > 0 && (
        <section className="container py-16">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">🚨 Urgent Requests</h2>
              <p className="text-muted-foreground">These requests need immediate attention</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse?urgency=critical">View All Urgent</Link>
            </Button>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {urgentRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">How Can We Help You?</h2>
          <p className="text-muted-foreground">
            Choose a category to find or offer help in your community
          </p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {HELP_CATEGORIES.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(`/browse?category=${category.id}`)}
            />
          ))}
        </div>
      </section>

      {/* Recent Requests Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">Recent Requests</h2>
              <p className="text-muted-foreground">People in your community need your help</p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/browse">
                Browse All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-64 animate-pulse rounded-lg bg-muted" />
              ))}
            </div>
          ) : recentRequests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentRequests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border-2 border-dashed p-12 text-center">
              <p className="text-muted-foreground">No help requests yet. Be the first to post or help!</p>
              <Button className="mt-4" onClick={() => navigate(user ? '/create' : '/auth')}>
                Get Started
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="mb-4 text-2xl font-bold md:text-3xl">How HELPLINK Works</h2>
          <p className="text-muted-foreground">Simple steps to give or receive help</p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-3">
          <div className="relative text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              1
            </div>
            <h3 className="mb-2 text-lg font-semibold">Create Account</h3>
            <p className="text-sm text-muted-foreground">
              Sign up for free as a help seeker, helper, or both
            </p>
          </div>
          
          <div className="relative text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-2xl font-bold text-secondary-foreground">
              2
            </div>
            <h3 className="mb-2 text-lg font-semibold">Post or Browse</h3>
            <p className="text-sm text-muted-foreground">
              Post a help request or browse existing requests to help
            </p>
          </div>
          
          <div className="relative text-center">
            <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-full bg-accent text-2xl font-bold text-accent-foreground">
              3
            </div>
            <h3 className="mb-2 text-lg font-semibold">Connect & Help</h3>
            <p className="text-sm text-muted-foreground">
              Connect with helpers or seekers and make a difference
            </p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="border-t bg-muted/30 py-16">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Safe & Secure</h3>
                <p className="text-sm text-muted-foreground">
                  Your data is protected and all connections are verified
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-secondary/10 p-3">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <div>
                <h3 className="font-semibold">Quick Response</h3>
                <p className="text-sm text-muted-foreground">
                  Urgent requests are highlighted for faster help
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="rounded-lg bg-accent/10 p-3">
                <Users className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold">Community Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Built by the community, for the community
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center text-primary-foreground md:p-16">
          <h2 className="mb-4 text-2xl font-bold md:text-4xl">
            Ready to Make a Difference?
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Join HELPLINK today and be part of a community that cares
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="gap-2"
            onClick={() => navigate(user ? '/dashboard' : '/auth?mode=signup')}
          >
            {user ? 'Go to Dashboard' : 'Join Now - It\'s Free'}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;