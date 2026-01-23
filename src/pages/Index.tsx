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
  Sparkles,
  Heart,
  Zap,
  Globe,
  Star,
  Rocket,
  Target,
  MessageCircle
} from 'lucide-react';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { requests, loading } = useHelpRequests({ status: 'open' });
  
  const urgentRequests = requests.filter(r => r.urgency === 'critical' || r.urgency === 'urgent').slice(0, 3);
  const recentRequests = requests.slice(0, 6);

  return (
    <Layout>
      {/* Hero Section - Modern AI Style */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-background" />
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 pattern-grid" />
        <div className="absolute inset-0 noise" />
        
        {/* Animated gradient orbs */}
        <div className="gradient-orb gradient-orb-primary w-[800px] h-[800px] -top-40 -right-40" />
        <div className="gradient-orb gradient-orb-secondary w-[600px] h-[600px] -bottom-40 -left-40" style={{ animationDelay: '5s' }} />
        <div className="gradient-orb gradient-orb-accent w-[500px] h-[500px] top-1/2 left-1/3" style={{ animationDelay: '10s' }} />
        
        {/* Floating elements */}
        <div className="absolute top-32 left-[8%] w-24 h-24 rounded-3xl glass border border-primary/20 float rotate-12 hidden lg:flex items-center justify-center">
          <Heart className="w-10 h-10 text-primary" />
        </div>
        <div className="absolute bottom-40 right-[12%] w-20 h-20 rounded-2xl glass border border-secondary/20 float-delayed hidden lg:flex items-center justify-center">
          <Zap className="w-8 h-8 text-secondary" />
        </div>
        <div className="absolute top-1/2 right-[8%] w-16 h-16 rounded-xl glass border border-accent/20 float hidden lg:flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <Star className="w-6 h-6 text-accent" />
        </div>
        <div className="absolute top-[20%] left-[20%] w-14 h-14 rounded-full glass border border-primary/20 float-slow hidden lg:flex items-center justify-center">
          <Globe className="w-5 h-5 text-primary" />
        </div>
        
        <div className="container py-20 md:py-32 relative z-10">
          <div className="mx-auto max-w-5xl text-center">
            {/* Badge */}
            <div className="mb-8 inline-flex items-center gap-3 badge-glow animate-fade-in">
              <div className="relative">
                <Sparkles className="h-4 w-4 text-primary" />
                <div className="absolute inset-0 animate-ping">
                  <Sparkles className="h-4 w-4 text-primary opacity-50" />
                </div>
              </div>
              <span className="text-primary font-semibold">AI-Powered Community Help Platform</span>
              <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            </div>
            
            {/* Main heading */}
            <h1 className="mb-8 text-5xl font-black tracking-tight md:text-7xl lg:text-8xl hero-text animate-fade-in" style={{ animationDelay: '0.1s' }}>
              Help Someone Today,
              <br />
              <span className="text-gradient">Change a Life Forever</span>
            </h1>
            
            {/* Subheading */}
            <p className="mb-12 text-xl text-muted-foreground md:text-2xl max-w-3xl mx-auto animate-fade-in leading-relaxed" style={{ animationDelay: '0.2s' }}>
              HELPLINK connects people who need help with people who want to help. 
              <span className="text-foreground font-medium"> From medical emergencies to food support</span>, 
              find or offer help in your community.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <Button 
                size="lg" 
                className="btn-ai gap-3 h-16 px-10 text-lg rounded-2xl" 
                onClick={() => navigate(user ? '/create' : '/auth?mode=signup')}
              >
                <HandHeart className="h-6 w-6" />
                Request Help
                <ArrowRight className="h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-glass gap-3 h-16 px-10 text-lg rounded-2xl" 
                onClick={() => navigate('/browse')}
              >
                <Users className="h-6 w-6" />
                Become a Helper
              </Button>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 flex flex-wrap items-center justify-center gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              {[
                { icon: Shield, text: 'Verified & Secure' },
                { icon: Zap, text: 'Instant Connect' },
                { icon: Globe, text: '24/7 Available' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-muted-foreground">
                  <item.icon className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom gradient fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="relative -mt-20 z-20 pb-20">
        <div className="container">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '10+', label: 'Help Categories', icon: Heart, delay: 0 },
              { value: '24/7', label: 'Available Support', icon: Clock, delay: 0.1 },
              { value: 'Fast', label: 'Response Time', icon: Zap, delay: 0.2 },
              { value: '100%', label: 'Free to Use', icon: Globe, delay: 0.3 },
            ].map((stat, i) => (
              <div 
                key={i} 
                className="glass-card text-center card-hover animate-fade-in" 
                style={{ animationDelay: `${stat.delay}s` }}
              >
                <div className="icon-glow inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-5">
                  <stat.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="stat-number mb-2">{stat.value}</div>
                <div className="text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Urgent Requests Section */}
      {urgentRequests.length > 0 && (
        <section className="py-24 relative">
          <div className="absolute inset-0 mesh-gradient opacity-50" />
          
          <div className="container relative z-10">
            <div className="mb-12 flex items-center justify-between">
              <div>
                <div className="flex items-center gap-4 mb-3">
                  <div className="relative flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-critical opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-critical"></span>
                  </div>
                  <h2 className="text-3xl font-bold md:text-4xl hero-text">Urgent Requests</h2>
                </div>
                <p className="text-lg text-muted-foreground">These requests need immediate attention</p>
              </div>
              <Button variant="outline" asChild className="hidden sm:flex btn-glass gap-2">
                <Link to="/browse?urgency=critical">
                  View All
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {urgentRequests.map((request, i) => (
                <div key={request.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <RequestCard request={request} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Categories Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 aurora" />
        <div className="absolute inset-0 pattern-dots" />
        
        {/* Decorative orbs */}
        <div className="gradient-orb gradient-orb-secondary w-[400px] h-[400px] -top-40 -right-40 opacity-30" />
        <div className="gradient-orb gradient-orb-primary w-[300px] h-[300px] -bottom-20 -left-20 opacity-30" />
        
        <div className="container relative z-10">
          <div className="mb-16 text-center">
            <div className="inline-flex items-center gap-2 badge-glow mb-6">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Categories</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl hero-text">How Can We Help You?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose a category to find or offer help in your community
            </p>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {HELP_CATEGORIES.map((category, i) => (
              <div key={category.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <CategoryCard
                  category={category}
                  onClick={() => navigate(`/browse?category=${category.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Requests Section */}
      <section className="py-24 relative">
        <div className="container relative z-10">
          <div className="mb-12 flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-2 badge-glow mb-4">
                <MessageCircle className="h-4 w-4 text-primary" />
                <span className="text-primary font-medium">Latest</span>
              </div>
              <h2 className="text-3xl font-bold md:text-4xl hero-text mb-2">Recent Requests</h2>
              <p className="text-lg text-muted-foreground">People in your community need your help</p>
            </div>
            <Button variant="outline" asChild className="btn-glass gap-2">
              <Link to="/browse">
                Browse All
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          
          {loading ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-72 rounded-2xl shimmer" />
              ))}
            </div>
          ) : recentRequests.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentRequests.map((request, i) => (
                <div key={request.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.1}s` }}>
                  <RequestCard request={request} />
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card text-center py-20 border-dashed border-2">
              <div className="icon-glow inline-flex items-center justify-center w-24 h-24 rounded-full mb-8">
                <HandHeart className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No help requests yet</h3>
              <p className="text-muted-foreground text-lg mb-8">Be the first to post or help someone!</p>
              <Button onClick={() => navigate(user ? '/create' : '/auth')} className="btn-ai gap-2 h-14 px-8 rounded-xl">
                <Rocket className="h-5 w-5" />
                Get Started
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 pattern-grid" />
        
        <div className="container relative z-10">
          <div className="mb-20 text-center">
            <div className="inline-flex items-center gap-2 badge-glow mb-6">
              <Rocket className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">How It Works</span>
            </div>
            <h2 className="mb-4 text-4xl font-bold md:text-5xl hero-text">Simple Steps to Give or Receive Help</h2>
            <p className="text-xl text-muted-foreground">Get started in minutes</p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3 max-w-5xl mx-auto">
            {[
              { 
                step: 1, 
                title: 'Create Account', 
                desc: 'Sign up for free as a help seeker, helper, or both',
                icon: Users,
                gradient: 'from-primary to-primary/60'
              },
              { 
                step: 2, 
                title: 'Post or Browse', 
                desc: 'Post a help request or browse existing requests to help',
                icon: Target,
                gradient: 'from-secondary to-secondary/60'
              },
              { 
                step: 3, 
                title: 'Connect & Help', 
                desc: 'Connect with helpers or seekers and make a difference',
                icon: Heart,
                gradient: 'from-accent to-accent/60'
              },
            ].map((item, i) => (
              <div key={i} className="relative text-center animate-fade-in" style={{ animationDelay: `${i * 0.15}s` }}>
                {i < 2 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-px bg-gradient-to-r from-primary/40 to-transparent" />
                )}
                <div className="glass-card card-hover h-full">
                  <div className={`mb-8 inline-flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-br ${item.gradient} shadow-2xl glow-primary`}>
                    <item.icon className="h-12 w-12 text-white" />
                  </div>
                  <div className="text-6xl font-black text-muted-foreground/20 absolute top-4 right-6">
                    {item.step}
                  </div>
                  <h3 className="mb-4 text-2xl font-bold">{item.title}</h3>
                  <p className="text-muted-foreground text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { 
                icon: Shield, 
                title: 'Safe & Secure', 
                desc: 'Your data is protected and all connections are verified',
                gradient: 'from-primary/20 to-primary/5'
              },
              { 
                icon: Clock, 
                title: 'Quick Response', 
                desc: 'Urgent requests are highlighted for faster help',
                gradient: 'from-secondary/20 to-secondary/5'
              },
              { 
                icon: Users, 
                title: 'Community Driven', 
                desc: 'Built by the community, for the community',
                gradient: 'from-accent/20 to-accent/5'
              },
            ].map((item, i) => (
              <div 
                key={i} 
                className="glass-card card-hover flex items-start gap-5 animate-fade-in" 
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className={`icon-glow rounded-2xl bg-gradient-to-br ${item.gradient} shrink-0`}>
                  <item.icon className="h-7 w-7 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container">
          <div className="relative rounded-[2.5rem] overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-accent" />
            
            {/* Decorative elements */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white rounded-full blur-[100px] translate-x-1/2 translate-y-1/2" />
            </div>
            <div className="absolute inset-0 pattern-dots opacity-20" />
            
            {/* Content */}
            <div className="relative z-10 p-12 md:p-24 text-center text-primary-foreground">
              <div className="inline-flex items-center gap-3 rounded-full bg-white/20 backdrop-blur-sm px-6 py-3 text-sm font-semibold mb-10">
                <Heart className="h-5 w-5" />
                Join thousands making a difference
                <Sparkles className="h-4 w-4" />
              </div>
              
              <h2 className="mb-8 text-4xl font-black md:text-6xl lg:text-7xl">
                Ready to Make a Difference?
              </h2>
              <p className="mb-12 text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
                Join HELPLINK today and be part of a community that cares
              </p>
              <Button 
                size="lg" 
                variant="secondary" 
                className="gap-3 h-16 px-12 text-lg font-bold shadow-2xl rounded-2xl hover:scale-105 transition-all duration-300"
                onClick={() => navigate(user ? '/dashboard' : '/auth?mode=signup')}
              >
                {user ? 'Go to Dashboard' : 'Join Now - It\'s Free'}
                <ArrowRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;