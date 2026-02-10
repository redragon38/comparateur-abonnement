import { motion } from "framer-motion";
import { ArrowUpDown, TrendingUp, TrendingDown, Type } from "lucide-react"; // Remplacé AlphabeticalIcon par Type
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'category';

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortSelector = ({ currentSort, onSortChange }: SortSelectorProps) => {
  const sortOptions = [
    { value: 'name-asc', label: 'Nom (A-Z)', icon: Type },
    { value: 'name-desc', label: 'Nom (Z-A)', icon: Type },
    { value: 'price-asc', label: 'Prix croissant', icon: TrendingUp },
    { value: 'price-desc', label: 'Prix décroissant', icon: TrendingDown },
    { value: 'category', label: 'Par catégorie', icon: ArrowUpDown },
  ] as const;

  const currentOption = sortOptions.find(opt => opt.value === currentSort);
  const Icon = currentOption?.icon || ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass border-white/10 hover:glass-strong">
          <Icon className="w-4 h-4 mr-2" />
          Trier
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-strong border-white/10">
        {sortOptions.map((option) => {
          const OptionIcon = option.icon;
          return (
            <DropdownMenuItem
              key={option.value}
              onClick={() => onSortChange(option.value as SortOption)}
              className={`cursor-pointer ${
                currentSort === option.value ? 'bg-white/10' : ''
              }`}
            >
              <OptionIcon className="w-4 h-4 mr-2" />
              {option.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortSelector;
