'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Search, ExternalLink, Plus } from 'lucide-react';
import { findProductInfo, FindProductInfoOutput } from '@/ai/flows/find-product-info';
import { useToast } from '@/hooks/use-toast';

interface ItemSearchProps {
  onAddItem: (name: string) => void;
}

export default function ItemSearch({ onAddItem }: ItemSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<FindProductInfoOutput | null>(null);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchTerm.trim()) return;
    setIsSearching(true);
    setSearchResults(null);
    try {
      const results = await findProductInfo({ itemName: searchTerm });
      setSearchResults(results);
    } catch (error) {
      console.error('Error searching for item:', error);
      toast({
        variant: 'destructive',
        title: 'Search Error',
        description: 'Could not fetch search results. Please try again.',
      });
    } finally {
      setIsSearching(false);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Search />
            Find Item Prices
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <Input
            type="text"
            placeholder="E.g., 'Organic Almond Milk'"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isSearching}
          />
          <Button onClick={handleSearch} disabled={isSearching}>
            {isSearching ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              'Search'
            )}
          </Button>
        </div>

        {searchResults && (
          <div className="mt-6">
            {searchResults.stores.length > 0 ? (
                <>
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">Search Results for "{searchTerm}"</h3>
                        <Button variant="outline" size="sm" onClick={() => onAddItem(searchTerm)}>
                            <Plus className="mr-2 h-4 w-4" /> Add to List
                        </Button>
                    </div>
                    <div className="space-y-2">
                        {searchResults.stores.map((store) => (
                            <a href={store.url} target="_blank" rel="noopener noreferrer" key={store.name} className="flex items-center justify-between text-sm p-3 rounded-md border hover:bg-muted/50 transition-colors">
                                <div className='flex items-center'>
                                    <img src={`https://logo.clearbit.com/${store.name.toLowerCase()}.com`} alt={store.name} className="w-6 h-6 mr-3 rounded-full object-contain" />
                                    <span className="font-medium">{store.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="font-semibold text-lg text-foreground">{store.price || 'N/A'}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                </>
            ) : (
              <p className="mt-4 text-center text-muted-foreground">
                No results found for "{searchTerm}".
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
