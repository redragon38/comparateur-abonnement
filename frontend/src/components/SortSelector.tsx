import { motion } from "framer-motion";
import { ArrowUpDown, TrendingUp, TrendingDown, Type } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'category';

interface SortSelectorProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortSelector = ({ currentSort, onSortChange }: SortSelectorProps) => {
  const { language } = useLanguage();

  const sortOptions = [
    { value: 'name-asc', labelFr: 'Nom (A-Z)', labelEn: 'Name (A-Z)', icon: Type },
    { value: 'name-desc', labelFr: 'Nom (Z-A)', labelEn: 'Name (Z-A)', icon: Type },
    { value: 'price-asc', labelFr: 'Prix croissant', labelEn: 'Price (low to high)', icon: TrendingUp },
    { value: 'price-desc', labelFr: 'Prix décroissant', labelEn: 'Price (high to low)', icon: TrendingDown },
    { value: 'category', labelFr: 'Par catégorie', labelEn: 'By category', icon: ArrowUpDown },
  ] as const;

  const currentOption = sortOptions.find(opt => opt.value === currentSort);
  const Icon = currentOption?.icon || ArrowUpDown;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass border-white/10 hover:glass-strong">
          <Icon className="w-4 h-4 mr-2" />
          {language === 'fr' ? 'Trier' : 'Sort'}
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
              {language === 'fr' ? option.labelFr : option.labelEn}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortSelector;
