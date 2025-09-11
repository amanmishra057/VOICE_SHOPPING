'use client';

import type { ShoppingItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, List, Search, ExternalLink, Loader2 } from 'lucide-react';
import { useMemo, useState } from 'react';

interface ShoppingListProps {
  items: ShoppingItem[];
  onRemoveItem: (id: string) => void;
  onFetchPrices: (itemId: string, itemName: string) => Promise<void>;
}

export default function ShoppingList({ items, onRemoveItem, onFetchPrices }: ShoppingListProps) {
  const [fetchingPrices, setFetchingPrices] = useState<string | null>(null);
  
  const handleFetchClick = async (itemId: string, itemName: string) => {
    setFetchingPrices(itemId);
    await onFetchPrices(itemId, itemName);
    setFetchingPrices(null);
  }

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, ShoppingItem[]>>((acc, item) => {
      (acc[item.category] = acc[item.category] || []).push(item);
      return acc;
    }, {});
  }, [items]);

  const sortedCategories = useMemo(() => {
    return Object.keys(groupedItems).sort();
  }, [groupedItems]);

  if (items.length === 0) {
    return (
      <div className="text-center py-16 text-muted-foreground">
        <List className="mx-auto h-12 w-12" />
        <h3 className="mt-4 text-lg font-medium">Your shopping list is empty</h3>
        <p className="mt-1 text-sm">Tap the microphone to add items with your voice.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sortedCategories.map(category => (
        <Card key={category} className="overflow-hidden">
          <CardHeader className="bg-muted/50 p-4">
            <CardTitle className="text-lg">{category}</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ul className="divide-y">
              {groupedItems[category].map((item) => (
                <li key={item.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                        <span className="text-base font-medium">{item.name}</span>
                        <p className="text-sm text-muted-foreground">{item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                       {fetchingPrices !== item.id && (!item.stores || item.stores.length === 0) && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => handleFetchClick(item.id, item.name)}
                          className="text-xs h-8"
                        >
                          <Search className="h-3 w-3 mr-1.5" />
                          Find Prices
                        </Button>
                      )}
                      {fetchingPrices === item.id && (
                        <Button variant="outline" size="sm" disabled className="text-xs h-8">
                          <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                          Searching...
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.name}`}
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  {item.stores && item.stores.length > 0 && (
                    <div className="mt-3 space-y-2 pl-2 border-l-2 ml-2">
                        {item.stores.map((store) => (
                            <a href={store.url} target="_blank" rel="noopener noreferrer" key={store.name} className="flex items-center justify-between text-sm p-2 rounded-md hover:bg-muted/50 transition-colors">
                                <div className='flex items-center'>
                                    <img src={`https://logo.clearbit.com/${store.name.toLowerCase()}.com`} alt={store.name} className="w-5 h-5 mr-3 rounded-full object-contain" />
                                    <span>{store.name}</span>
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="font-semibold text-foreground">{store.price || 'N/A'}</span>
                                    <ExternalLink className="w-4 h-4" />
                                </div>
                            </a>
                        ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
