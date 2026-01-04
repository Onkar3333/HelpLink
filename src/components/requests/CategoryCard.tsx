import { CategoryInfo } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  category: CategoryInfo;
  onClick?: () => void;
  selected?: boolean;
  compact?: boolean;
}

export function CategoryCard({ category, onClick, selected, compact }: CategoryCardProps) {
  const Icon = category.icon;

  if (compact) {
    return (
      <button
        onClick={onClick}
        className={cn(
          "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
          selected
            ? "border-primary bg-primary/10 text-primary"
            : "border-border bg-card hover:border-primary/50"
        )}
      >
        <Icon className={cn("h-4 w-4", category.color)} />
        <span className="text-sm font-medium">{category.label}</span>
      </button>
    );
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1",
        selected && "ring-2 ring-primary"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6">
        <div className={cn("inline-flex p-3 rounded-xl mb-4", category.bgColor)}>
          <Icon className={cn("h-6 w-6", category.color)} />
        </div>
        <h3 className="font-semibold mb-2">{category.label}</h3>
        <p className="text-sm text-muted-foreground">{category.description}</p>
      </CardContent>
    </Card>
  );
}