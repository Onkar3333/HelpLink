import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { HelpRequest } from '@/hooks/useHelpRequests';
import { getCategoryById, URGENCY_CONFIG, STATUS_CONFIG } from '@/lib/constants';
import { MapPin, Clock, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface RequestCardProps {
  request: HelpRequest;
}

export function RequestCard({ request }: RequestCardProps) {
  const category = getCategoryById(request.category);
  const urgency = URGENCY_CONFIG[request.urgency];
  const status = STATUS_CONFIG[request.status];
  const Icon = category?.icon;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card className={cn(
      "transition-all hover:shadow-lg",
      request.urgency === 'critical' && "border-critical",
      request.urgency === 'urgent' && "border-warning"
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className={cn("p-2 rounded-lg", category?.bgColor)}>
                <Icon className={cn("h-5 w-5", category?.color)} />
              </div>
            )}
            <div>
              <Badge variant="outline" className={cn("mb-1", category?.color)}>
                {category?.label}
              </Badge>
              {request.urgency !== 'normal' && (
                <Badge className={cn("ml-2", urgency.bgColor, urgency.color)} variant="outline">
                  {urgency.label}
                </Badge>
              )}
            </div>
          </div>
          <Badge className={cn(status.bgColor, status.color)} variant="outline">
            {status.label}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        <h3 className="font-semibold text-lg line-clamp-2">{request.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-3">{request.description}</p>
        
        <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
          {request.city && (
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span>{request.city}</span>
            </div>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{formatDistanceToNow(new Date(request.created_at), { addSuffix: true })}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between pt-3 border-t">
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={request.profiles?.avatar_url || ''} />
            <AvatarFallback className="text-xs bg-muted">
              {request.profiles?.full_name ? getInitials(request.profiles.full_name) : 'U'}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {request.profiles?.full_name || 'Anonymous'}
          </span>
        </div>
        
        <Button asChild size="sm" variant="ghost">
          <Link to={`/request/${request.id}`}>
            View Details
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}