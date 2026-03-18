import { PhoneCall, Copy, ShieldAlert, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { EMERGENCY_HELPLINES, HelplineNumber } from '@/lib/helplines';

interface EmergencyHelplineCardProps {
  title?: string;
  description?: string;
  helplines?: HelplineNumber[];
}

export function EmergencyHelplineCard({
  title = 'Emergency Help',
  description = 'Government helpline numbers you can call or copy instantly.',
  helplines = EMERGENCY_HELPLINES,
}: EmergencyHelplineCardProps) {
  const { toast } = useToast();

  const handleCopy = async (number: string) => {
    try {
      await navigator.clipboard.writeText(number);
      toast({
        title: 'Copied to clipboard',
        description: `${number} is ready to paste`,
      });
    } catch (error) {
      toast({
        title: 'Could not copy',
        description: 'Please copy the number manually.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Card className="bg-background/80 border border-border">
      <CardHeader>
        <div className="flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-destructive" />
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {helplines.map((item) => (
          <div
            key={item.id}
            className="rounded-xl border border-border/50 bg-muted/50 p-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold">{item.label}</span>
                {item.description && (
                  <span className="text-xs text-muted-foreground">{item.description}</span>
                )}
              </div>
              <div className="mt-1 flex items-center gap-2">
                <span className="text-base font-medium">{item.number}</span>
                <span className="text-xs text-muted-foreground">(tap to call or copy)</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                size="sm"
                className="gap-2"
                onClick={() => {
                  window.location.href = `tel:${item.number}`;
                }}
              >
                <PhoneCall className="w-4 h-4" />
                Call
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="gap-2"
                onClick={() => handleCopy(item.number)}
              >
                <Copy className="w-4 h-4" />
                Copy
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-2"
                asChild
              >
                <a href={`https://www.google.com/search?q=${encodeURIComponent(`${item.label} helpline ${item.number}`)}`} target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" />
                  Learn
                </a>
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
