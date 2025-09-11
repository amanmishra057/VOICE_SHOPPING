'use client';

import { useState, useCallback, useTransition, useMemo } from 'react';
import { ShoppingItem } from '@/lib/types';
import { getCategory } from '@/lib/categorize';
import { processVoiceCommand } from '@/ai/flows/process-voice-commands';
import { suggestCommonItems } from '@/ai/flows/suggest-common-items';
import { findProductInfo } from '@/ai/flows/find-product-info';
import ShoppingList from './shopping-list';
import VoiceInput from './voice-input';
import SuggestionsSection from './suggestions-section';
import { ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import FilterControls from './filter-controls';

export default function ShoppingAssistant() {
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isFetchingSuggestions, startFetchingSuggestionsTransition] = useTransition();
  const [filter, setFilter] = useState('all');
  const { toast } = useToast();

  const handleVoiceResult = useCallback(async (transcript: string) => {
    if (!transcript) return;
    try {
      const { items } = await processVoiceCommand({ voiceCommand: transcript });
      const newItems: ShoppingItem[] = items
        .map(item => ({
          id: crypto.randomUUID(),
          name: item.name,
          quantity: item.quantity,
          category: getCategory(item.name),
          stores: [],
        }))
        .filter(newItem => !shoppingList.some(existingItem => existingItem.name.toLowerCase() === newItem.name.toLowerCase()));
      
      setShoppingList(prevList => [...prevList, ...newItems]);

      if (newItems.length > 0) {
        toast({
          title: "Items Added",
          description: newItems.map(item => item.name).join(', '),
        });
      } else if (items.length > 0) {
         toast({
          variant: "default",
          title: "Items already on list",
        });
      }

    } catch (error) {
      console.error('Error processing voice command:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not add items. Please try again.",
      });
    }
  }, [shoppingList, toast]);

  const handleRemoveItem = useCallback((id: string) => {
    setShoppingList(prevList => prevList.filter(item => item.id !== id));
  }, []);
  
  const handleAddItem = useCallback((name: string) => {
    const lowerCaseName = name.toLowerCase();
    if (shoppingList.some(item => item.name.toLowerCase() === lowerCaseName)) {
      toast({ title: `"${name}" is already on your list.` });
      return;
    }
    const newItem: ShoppingItem = {
      id: crypto.randomUUID(),
      name,
      quantity: '1 unit',
      category: getCategory(name),
      stores: [],
    };
    setShoppingList(prevList => [...prevList, newItem]);
    toast({ title: "Item Added", description: name });
  }, [shoppingList, toast]);

  const handleFetchSuggestions = useCallback(() => {
    startFetchingSuggestionsTransition(async () => {
      if (shoppingList.length === 0) {
        toast({
            title: "Your list is empty",
            description: "Add some items before getting suggestions.",
        });
        return;
      }
      try {
        const history = shoppingList.map(item => item.name).join(', ');
        const result = await suggestCommonItems({ shoppingHistory: history });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        toast({
            variant: "destructive",
            title: "Suggestion Error",
            description: "Could not fetch suggestions.",
        });
      }
    });
  }, [shoppingList, toast]);

  const handleFetchPrices = useCallback(async (itemId: string, itemName: string) => {
    try {
      const { stores } = await findProductInfo({ itemName });
      setShoppingList(prevList =>
        prevList.map(item =>
          item.id === itemId ? { ...item, stores } : item
        )
      );
    } catch (error) {
      console.error('Error fetching prices:', error);
      toast({
        variant: "destructive",
        title: "Pricing Error",
        description: `Could not fetch prices for ${itemName}.`,
      });
    }
  }, [toast]);


  const categories = useMemo(() => {
    const uniqueCategories = new Set(shoppingList.map(item => item.category));
    return ['all', ...Array.from(uniqueCategories).sort()];
  }, [shoppingList]);

  const filteredItems = useMemo(() => {
    if (filter === 'all') {
      return shoppingList;
    }
    return shoppingList.filter(item => item.category === filter);
  }, [shoppingList, filter]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-card border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">VoiceList Shopper</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6 pb-32">
        <div className="max-w-2xl mx-auto">
          <SuggestionsSection
            suggestions={suggestions}
            onFetchSuggestions={handleFetchSuggestions}
            onAddSuggestion={handleAddItem}
            isLoading={isFetchingSuggestions}
          />
          <FilterControls 
            categories={categories}
            currentFilter={filter}
            onFilterChange={setFilter}
          />
          <ShoppingList items={filteredItems} onRemoveItem={handleRemoveItem} onFetchPrices={handleFetchPrices} />
        </div>
      </main>

      <VoiceInput onResult={handleVoiceResult} />
    </div>
  );
}
