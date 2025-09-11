'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sparkles, Plus, Loader2 } from 'lucide-react';
import { Badge } from './ui/badge';

interface SuggestionsSectionProps {
  suggestions: string[];
  onFetchSuggestions: () => void;
  onAddSuggestion: (name: string) => void;
  isLoading: boolean;
}

export default function SuggestionsSection({
  suggestions,
  onFetchSuggestions,
  onAddSuggestion,
  isLoading,
}: SuggestionsSectionProps) {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                <CardTitle className="flex items-center gap-2">
                <Sparkles className="text-primary" />
                Smart Suggestions
                </CardTitle>
                <CardDescription className="mt-1">
                    Get AI-powered ideas based on your list.
                </CardDescription>
            </div>
            <Button onClick={onFetchSuggestions} disabled={isLoading}>
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Getting ideas...
                    </>
                ) : (
                    "Suggest Items"
                )}
            </Button>
        </div>
      </CardHeader>
      {suggestions.length > 0 && (
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {suggestions.map((suggestion, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-base py-1 px-3 cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => onAddSuggestion(suggestion)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && onAddSuggestion(suggestion)}
              >
                <Plus className="w-4 h-4 mr-1" />
                {suggestion}
              </Badge>
            ))}
          </div>
        </CardContent>
      )}
    </Card>
  );
}
