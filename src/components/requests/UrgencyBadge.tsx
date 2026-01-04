import { Badge } from '@/components/ui/badge';
import { UrgencyLevel, URGENCY_CONFIG } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface UrgencyBadgeProps {
  urgency: UrgencyLevel;
  showIcon?: boolean;
  size?: 'sm' | 'default' | 'lg';
}

export function UrgencyBadge({ urgency, showIcon = true, size = 'default' }: UrgencyBadgeProps) {
  const config = URGENCY_CONFIG[urgency];
  
  const Icon = urgency === 'critical' 
    ? AlertTriangle 
    : urgency === 'urgent' 
    ? AlertCircle 
    : Info;

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    default: 'text-sm px-2.5 py-0.5',
    lg: 'text-base px-3 py-1',
  };

  return (
    <Badge 
      variant="outline" 
      className={cn(
        config.bgColor, 
        config.color, 
        config.borderColor,
        sizeClasses[size],
        urgency === 'critical' && 'animate-pulse-soft'
      )}
    >
      {showIcon && <Icon className={cn("mr-1", size === 'sm' ? 'h-3 w-3' : 'h-4 w-4')} />}
      {config.label}
    </Badge>
  );
}