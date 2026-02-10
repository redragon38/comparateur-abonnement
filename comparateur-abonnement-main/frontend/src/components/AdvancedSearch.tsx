import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Slider } from './ui/slider';
import { motion, AnimatePresence } from 'framer-motion';

export interface AdvancedSearchFilters {
  searchTerm: string;
  category: string;
  minPrice: number;
  maxPrice: number;
  hasFreeplan: boolean;
}

interface AdvancedSearchProps {
  onSearch: (filters: AdvancedSearchFilters) => void;
  categories: string[];
}

const AdvancedSearch = ({ onSearch, categories }: AdvancedSearchProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<AdvancedSearchFilters>({
    searchTerm: '',
    category: 'all',
    minPrice: 0,
    maxPrice: 100,
    hasFreeplan: false
  });

  const handleSearch = () => {
    onSearch(filters);
  };

  const handleReset = () => {
    const resetFilters: AdvancedSearchFilters = {
      searchTerm: '',
      category: 'all',
      minPrice: 0,
      maxPrice: 100,
      hasFreeplan: false
    };
    setFilters(resetFilters);
    onSearch(resetFilters);
  };

  const activeFiltersCount = 
    (filters.searchTerm ? 1 : 0) +
    (filters.category !== 'all' ? 1 : 0) +
    (filters.minPrice > 0 || filters.maxPrice < 100 ? 1 : 0) +
    (filters.hasFreeplan ? 1 : 0);

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
          <Input
            placeholder="Recherche avancée..."
            value={filters.searchTerm}
            onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
            className="glass border-white/10 pl-10"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className={`glass border-white/10 hover:glass-strong ${isOpen ? 'bg-accent/10' : ''}`}
        >
          Filtres avancés
          {activeFiltersCount > 0 && (
            <Badge variant="secondary" className="ml-2 bg-accent text-white">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-strong rounded-xl p-6 space-y-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {/* Category filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Catégorie</label>
              <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                <SelectTrigger className="glass border-white/10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="glass-strong border-white/10">
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Price range */}
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Prix mensuel</label>
              <div className="flex items-center gap-4">
                <span className="text-sm text-foreground/60">{filters.minPrice}€</span>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
                  min={0}
                  max={100}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-foreground/60">{filters.maxPrice >= 100 ? '100+' : filters.maxPrice}€</span>
              </div>
            </div>

            {/* Free plan filter */}
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.hasFreeplan}
                onChange={(e) => setFilters({ ...filters, hasFreeplan: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-sm text-foreground">Uniquement les services avec plan gratuit</span>
            </label>

            {/* Actions */}
            <div className="flex gap-2 pt-4 border-t border-white/10">
              <Button onClick={handleSearch} className="flex-1 stat-card-shock text-white">
                Rechercher
              </Button>
              <Button variant="outline" onClick={handleReset} className="glass border-white/10">
                <X className="w-4 h-4 mr-2" />
                Réinitialiser
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
