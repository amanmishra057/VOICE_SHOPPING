'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

interface FilterControlsProps {
  categories: string[];
  currentFilter: string;
  onFilterChange: (value: string) => void;
}

export default function FilterControls({
  categories,
  currentFilter,
  onFilterChange,
}: FilterControlsProps) {
  if (categories.length <= 1) {
    return null;
  }
  return (
    <div className="mb-6 flex items-center gap-2">
        <Filter className="w-5 h-5 text-muted-foreground" />
        <Select value={currentFilter} onValueChange={onFilterChange}>
            <SelectTrigger className="w-[220px]">
                <SelectValue placeholder="Filter by category..." />
            </SelectTrigger>
            <SelectContent>
                {categories.map((category) => (
                <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  );
}
