import { motion } from "framer-motion";
import { Search, Filter } from "lucide-react";
import { useState, forwardRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

interface FilterBarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categories: string[];
}

const categoryTranslations: Record<string, { fr: string; en: string }> = {
  'Streaming vidéo': { fr: 'Streaming vidéo', en: 'Video streaming' },
  'Musique': { fr: 'Musique', en: 'Music' },
  'Multi-services': { fr: 'Multi-services', en: 'Multi-services' },
  'Jeux vidéo': { fr: 'Jeux vidéo', en: 'Video games' },
  'Productivité': { fr: 'Productivité', en: 'Productivity' },
  'Stockage': { fr: 'Stockage', en: 'Storage' },
  'Communication': { fr: 'Communication', en: 'Communication' },
  'Éducation': { fr: 'Éducation', en: 'Education' },
  'Livres audio': { fr: 'Livres audio', en: 'Audiobooks' },
  'Livres': { fr: 'Livres', en: 'Books' },
  'Bien-être': { fr: 'Bien-être', en: 'Wellness' },
  'Sport': { fr: 'Sport', en: 'Sport' },
  'Actualités': { fr: 'Actualités', en: 'News' },
  'Marketing': { fr: 'Marketing', en: 'Marketing' },
  'Presse': { fr: 'Presse', en: 'Press' },
  'Fitness': { fr: 'Fitness', en: 'Fitness' },
  'Méditation': { fr: 'Méditation', en: 'Meditation' },
};

const FilterBar = forwardRef<HTMLInputElement, FilterBarProps>(({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  categories 
}, ref) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { t, language } = useLanguage();

  const translateCategory = (cat: string) => {
    const trans = categoryTranslations[cat];
    return trans ? trans[language] : cat;
  };

  return (
    <motion.div 
      className="space-y-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Search bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40" />
        <input
          ref={ref}
          type="text"
          placeholder={t('filter.search')}
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl glass-strong text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="glass-strong rounded-lg px-4 py-2 flex items-center gap-2 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
        >
          <Filter className="w-4 h-4" />
          {t('filter.categories')}
        </button>

        <div className="flex flex-wrap gap-2">
          <motion.button
            onClick={() => onCategoryChange("all")}
            className={`
              text-xs px-4 py-2 rounded-lg transition-all font-medium
              ${selectedCategory === "all" 
                ? "stat-card-shock text-white" 
                : "glass text-foreground/50 hover:text-foreground"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t('filter.all')}
          </motion.button>

          {categories.map((category) => (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`
                text-xs px-4 py-2 rounded-lg transition-all font-medium
                ${selectedCategory === category 
                  ? "stat-card-accent text-white" 
                  : "glass text-foreground/50 hover:text-foreground"
                }
              `}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {translateCategory(category)}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
});

FilterBar.displayName = 'FilterBar';

export default FilterBar;
