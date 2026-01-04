import { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { RequestCard } from '@/components/requests/RequestCard';
import { CategoryCard } from '@/components/requests/CategoryCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useHelpRequests } from '@/hooks/useHelpRequests';
import { HELP_CATEGORIES, HelpCategory } from '@/lib/constants';
import { Search, Filter, X, Loader2 } from 'lucide-react';
import { Database } from '@/integrations/supabase/types';

type UrgencyLevelEnum = Database['public']['Enums']['urgency_level'];

export default function BrowsePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') as HelpCategory | null;
  const urgencyParam = searchParams.get('urgency') as UrgencyLevelEnum | null;
  
  const [searchCity, setSearchCity] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<HelpCategory | undefined>(categoryParam || undefined);
  const [selectedUrgency, setSelectedUrgency] = useState<UrgencyLevelEnum | undefined>(urgencyParam || undefined);
  const [showFilters, setShowFilters] = useState(false);

  const { requests, loading } = useHelpRequests({
    category: selectedCategory,
    urgency: selectedUrgency,
    status: 'open',
  });

  const filteredRequests = useMemo(() => {
    if (!searchCity) return requests;
    return requests.filter(r => 
      r.city?.toLowerCase().includes(searchCity.toLowerCase())
    );
  }, [requests, searchCity]);

  const handleCategorySelect = (categoryId: HelpCategory) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(undefined);
      searchParams.delete('category');
    } else {
      setSelectedCategory(categoryId);
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };

  const handleUrgencyChange = (value: string) => {
    if (value === 'all') {
      setSelectedUrgency(undefined);
      searchParams.delete('urgency');
    } else {
      setSelectedUrgency(value as UrgencyLevelEnum);
      searchParams.set('urgency', value);
    }
    setSearchParams(searchParams);
  };

  const clearFilters = () => {
    setSelectedCategory(undefined);
    setSelectedUrgency(undefined);
    setSearchCity('');
    setSearchParams({});
  };

  const hasActiveFilters = selectedCategory || selectedUrgency || searchCity;

  return (
    <Layout>
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Browse Help Requests</h1>
          <p className="text-muted-foreground">
            Find requests in your community and offer your help
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by city..."
              value={searchCity}
              onChange={(e) => setSearchCity(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={selectedUrgency || 'all'} onValueChange={handleUrgencyChange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Urgency" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Urgency</SelectItem>
                <SelectItem value="critical">Critical</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
              </SelectContent>
            </Select>
            
            <Button
              variant={showFilters ? 'default' : 'outline'}
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Categories
            </Button>
            
            {hasActiveFilters && (
              <Button variant="ghost" onClick={clearFilters} className="gap-2">
                <X className="h-4 w-4" />
                Clear
              </Button>
            )}
          </div>
        </div>

        {/* Category Filter */}
        {showFilters && (
          <div className="mb-8 p-4 border rounded-lg bg-muted/30">
            <div className="flex flex-wrap gap-2">
              {HELP_CATEGORIES.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  compact
                  selected={selectedCategory === category.id}
                  onClick={() => handleCategorySelect(category.id)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="mb-6 text-sm text-muted-foreground">
          {loading ? (
            'Loading...'
          ) : (
            `Showing ${filteredRequests.length} help request${filteredRequests.length !== 1 ? 's' : ''}`
          )}
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : filteredRequests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredRequests.map((request) => (
              <RequestCard key={request.id} request={request} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed p-12 text-center">
            <p className="text-lg font-medium mb-2">No requests found</p>
            <p className="text-muted-foreground mb-4">
              {hasActiveFilters 
                ? 'Try adjusting your filters or search criteria'
                : 'Be the first to post a help request!'}
            </p>
            {hasActiveFilters && (
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}