'use client';

import type { ShoppingItem } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, List } from 'lucide-react';
import { useMemo } from 'react';

interface ShoppingListProps {
  items: ShoppingItem[];
  onRemoveItem: (id: string) => void;
}

export default function ShoppingList({ items, onRemoveItem }: ShoppingListProps) {
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
                <li key={item.id} className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                  <span className="text-base">{item.name}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.name}`}
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
