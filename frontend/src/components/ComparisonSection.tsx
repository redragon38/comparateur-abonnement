import { useState, useCallback, useMemo, useEffect, useRef } from "react";
import { subscriptions, durationOptions, type DurationOption } from "@/data/subscriptions";
import DurationSelector from "./DurationSelector";
import SubscriptionCard from "./SubscriptionCard";
import ShockBanner from "./ShockBanner";
import FilterBar from "./FilterBar";
import ComparisonChart from "./ComparisonChart";
import ShareExport from "./ShareExport";
import SortSelector, { type SortOption } from "./SortSelector";
import RecommendationsModal from "./RecommendationsModal";
import DirectComparison from "./DirectComparison";
import Pagination from "./Pagination";
import FamilyCalculator from "./FamilyCalculator";
import PriceFilter from "./PriceFilter";
import QuickView from "./QuickView";
import DisplayModeToggle from "./DisplayModeToggle";
import TagsManager from "./TagsManager";
import PrintButton from "./PrintButton";
import PromoCodesManager from "./PromoCodesManager";
import ROICalculator from "./ROICalculator";
import SocialShare from "./SocialShare";
import { motion, AnimatePresence } from "framer-motion";
import { LayoutGrid, BarChart3, Heart, Sparkles, Download, GitCompare, X, Keyboard, DollarSign } from "lucide-react";
import { Button } from "./ui/button";
import { useFavorites } from "@/hooks/useFavorites";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import { exportToCSV } from "@/lib/exportUtils";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "./ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";

const ComparisonSection = () => {
  const [duration, setDuration] = useState<DurationOption>(durationOptions[2]); // default 5 ans
  const [selectedPlans, setSelectedPlans] = useLocalStorage<Record<string, number>>('selected-plans', {});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "chart">("grid");
  const [sortOption, setSortOption] = useState<SortOption>('name-asc');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [comparedIds, setComparedIds] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const { language, t } = useLanguage();
  const [showPriceFilter, setShowPriceFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [quickViewId, setQuickViewId] = useState<string | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const ITEMS_PER_PAGE = 12;
  
  const { favorites, toggleFavorite, isFavorite, favoritesCount } = useFavorites();
  const { toast } = useToast();

  // Keyboard shortcuts
  useKeyboardShortcuts([
    {
      key: '/',
      callback: () => {
        searchInputRef.current?.focus();
      },
      description: 'Rechercher'
    },
    {
      key: 'Escape',
      callback: () => {
        setSearchQuery('');
        searchInputRef.current?.blur();
      },
      description: 'Effacer la recherche'
    },
    {
      key: '?',
      shift: true,
      callback: () => {
        setShowShortcuts(true);
      },
      description: 'Afficher les raccourcis'
    },
    {
      key: 'f',
      callback: () => {
        setShowFavoritesOnly(!showFavoritesOnly);
      },
      description: 'Filtrer les favoris'
    },
    {
      key: 'g',
      callback: () => {
        setViewMode(viewMode === 'grid' ? 'chart' : 'grid');
      },
      description: 'Changer de vue'
    }
  ]);

  const handlePlanChange = useCallback((subId: string, planIndex: number) => {
    setSelectedPlans((prev) => ({ ...prev, [subId]: planIndex }));
  }, [setSelectedPlans]);

  const toggleCompare = useCallback((subId: string) => {
    setComparedIds(prev => {
      if (prev.includes(subId)) {
        return prev.filter(id => id !== subId);
      }
      if (prev.length >= 3) {
        toast({
          title: "Limite atteinte",
          description: "Vous ne pouvez comparer que 3 abonnements à la fois",
          variant: "destructive",
          duration: 3000,
        });
        return prev;
      }
      return [...prev, subId];
    });
  }, [toast]);

  // Extraire toutes les catégories uniques
  const categories = useMemo(() => {
    const cats = new Set(subscriptions.map(sub => sub.category));
    return Array.from(cats);
  }, []);

  // Filtrer les abonnements
  const filteredSubscriptions = useMemo(() => {
    let filtered = subscriptions.filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || sub.category === selectedCategory;
      const matchesFavorites = !showFavoritesOnly || isFavorite(sub.id);
      
      // Price filter
      const minPrice = Math.min(...sub.plans.map(p => p.monthlyPrice));
      const matchesPrice = minPrice >= priceRange[0] && (priceRange[1] >= 100 || minPrice <= priceRange[1]);
      
      return matchesSearch && matchesCategory && matchesFavorites && matchesPrice;
    });

    // Trier les résultats
    filtered = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc': {
          const priceA = a.plans[selectedPlans[a.id] ?? 0].monthlyPrice;
          const priceB = b.plans[selectedPlans[b.id] ?? 0].monthlyPrice;
          return priceA - priceB;
        }
        case 'price-desc': {
          const priceA = a.plans[selectedPlans[a.id] ?? 0].monthlyPrice;
          const priceB = b.plans[selectedPlans[b.id] ?? 0].monthlyPrice;
          return priceB - priceA;
        }
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, showFavoritesOnly, isFavorite, sortOption, selectedPlans, priceRange]);

  const isPriceFilterActive = priceRange[0] !== 0 || priceRange[1] !== 100;

  const handleExportCSV = () => {
    if (Object.keys(selectedPlans).length === 0) {
      toast({
        title: "Aucune sélection",
        description: "Sélectionnez d'abord des abonnements à exporter",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }
    
    exportToCSV(selectedPlans, duration);
    toast({
      title: "Export réussi",
      description: "Votre sélection a été exportée en CSV",
      duration: 3000,
    });
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, showFavoritesOnly, sortOption, priceRange]);

  // Pagination
  const paginatedSubscriptions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredSubscriptions.slice(startIndex, endIndex);
  }, [filteredSubscriptions, currentPage]);

  const totalPages = Math.ceil(filteredSubscriptions.length / ITEMS_PER_PAGE);

  return (
    <section id="comparateur" className="py-16 md:py-20" aria-labelledby="comparateur-title">
      <div className="container space-y-10">
        {/* Section header */}
        <motion.header 
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 id="comparateur-title" className="text-3xl md:text-5xl font-bold">
            {language === 'fr' ? (
              <>Compare le <span className="text-gradient-shock">vrai prix</span> de tes abonnements</>
            ) : (
              <>Compare the <span className="text-gradient-shock">real price</span> of your subscriptions</>
            )}
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg">
            {language === 'fr' 
              ? 'Sélectionne une durée pour voir combien Netflix, Spotify, Disney+ te coûtent réellement.'
              : 'Select a duration to see how much Netflix, Spotify, Disney+ really cost you.'}
          </p>
        </motion.header>

        {/* Duration selector */}
        <DurationSelector selected={duration} onSelect={setDuration} />

        {/* Shock banner */}
        <ShockBanner duration={duration} selectedPlans={selectedPlans} />

        {/* Filter bar */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <FilterBar
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            categories={categories}
            ref={searchInputRef}
          />
          
          <div className="flex gap-2 flex-wrap justify-center">
            <SortSelector currentSort={sortOption} onSortChange={setSortOption} />
            
            <Button
              variant="outline"
              className={`glass border-white/10 hover:glass-strong ${showFavoritesOnly ? 'bg-red-400/10 border-red-400/30' : ''}`}
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            >
              <Heart className={`w-4 h-4 mr-2 ${showFavoritesOnly ? 'fill-current text-red-400' : ''}`} />
              {language === 'fr' ? 'Favoris' : 'Favorites'} {favoritesCount > 0 && `(${favoritesCount})`}
            </Button>

            <Button
              variant="outline"
              className={`glass border-white/10 hover:glass-strong ${isPriceFilterActive ? 'bg-accent/10 border-accent/30' : ''}`}
              onClick={() => setShowPriceFilter(!showPriceFilter)}
            >
              <DollarSign className="w-4 h-4 mr-2" />
              Prix
            </Button>

            {Object.keys(selectedPlans).length > 0 && (
              <>
                <Button
                  variant="outline"
                  className="glass border-white/10 hover:glass-strong"
                  onClick={() => setShowRecommendations(true)}
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Économiser
                </Button>

                <FamilyCalculator selectedPlans={selectedPlans} duration={duration} />

                <Button
                  variant="outline"
                  className="glass border-white/10 hover:glass-strong"
                  onClick={handleExportCSV}
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export CSV
                </Button>
              </>
            )}

            <Button
              variant="outline"
              className="glass border-white/10 hover:glass-strong"
              onClick={() => setShowShortcuts(true)}
              title="Raccourcis clavier"
            >
              <Keyboard className="w-4 h-4" />
            </Button>

            <DisplayModeToggle />
            
            <TagsManager />
          </div>
        </div>

        {/* Price filter */}
        <AnimatePresence>
          {showPriceFilter && (
            <PriceFilter
              minPrice={priceRange[0]}
              maxPrice={priceRange[1]}
              onPriceChange={(min, max) => setPriceRange([min, max])}
              isActive={isPriceFilterActive}
              onClear={() => setPriceRange([0, 100])}
            />
          )}
        </AnimatePresence>

        {/* Comparison bar */}
        {comparedIds.length > 0 && (
          <motion.div
            className="stat-card-shock p-4 rounded-xl flex items-center justify-between"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3 flex-wrap">
              <GitCompare className="w-5 h-5 text-white" />
              <span className="text-white font-medium">
                {comparedIds.length} abonnement{comparedIds.length > 1 ? 's' : ''} sélectionné{comparedIds.length > 1 ? 's' : ''}
              </span>
              <div className="flex gap-2">
                {comparedIds.map(id => {
                  const sub = subscriptions.find(s => s.id === id);
                  return (
                    <Badge key={id} variant="secondary" className="bg-white/20 text-white">
                      {sub?.name}
                      <button
                        onClick={() => toggleCompare(id)}
                        className="ml-1 hover:text-red-300"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  );
                })}
              </div>
            </div>
            <div className="flex gap-2">
              {comparedIds.length >= 2 && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="bg-white/20 hover:bg-white/30 text-white"
                  onClick={() => setShowComparison(true)}
                >
                  Comparer
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/10"
                onClick={() => setComparedIds([])}
              >
                Effacer
              </Button>
            </div>
          </motion.div>
        )}

        {/* View mode toggle */}
        <div className="flex justify-center gap-2">
          <motion.button
            onClick={() => setViewMode("grid")}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition-all
              ${viewMode === "grid" 
                ? "stat-card-shock text-white" 
                : "glass text-foreground/50 hover:text-foreground"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <LayoutGrid className="w-4 h-4" />
            Grille
          </motion.button>
          <motion.button
            onClick={() => setViewMode("chart")}
            className={`
              px-4 py-2 rounded-lg flex items-center gap-2 font-medium text-sm transition-all
              ${viewMode === "chart" 
                ? "stat-card-shock text-white" 
                : "glass text-foreground/50 hover:text-foreground"
              }
            `}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BarChart3 className="w-4 h-4" />
            Graphique
          </motion.button>
        </div>

        {/* Data Management */}
        <div className="flex justify-center gap-2 flex-wrap">
          <PromoCodesManager />
          <ROICalculator selectedPlans={selectedPlans} />
          <SocialShare selectedPlans={selectedPlans} totalMonthly={Object.entries(selectedPlans).reduce((sum, [subId, planIndex]) => {
            const sub = subscriptions.find(s => s.id === subId);
            return sum + (sub ? sub.plans[planIndex].monthlyPrice : 0);
          }, 0)} />
          <PrintButton />
        </div>

        {/* Content area */}
        {viewMode === "grid" ? (
          <>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {paginatedSubscriptions.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                >
                  <SubscriptionCard
                    subscription={sub}
                    duration={duration}
                    selectedPlanIndex={selectedPlans[sub.id] ?? 0}
                    onPlanChange={(i) => handlePlanChange(sub.id, i)}
                    isFavorite={isFavorite(sub.id)}
                    onToggleFavorite={toggleFavorite}
                    isCompared={comparedIds.includes(sub.id)}
                    onToggleCompare={toggleCompare}
                    onQuickView={(id) => setQuickViewId(id)}
                  />
                </motion.div>
              ))}
            </motion.div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <ComparisonChart 
            subscriptions={filteredSubscriptions}
            duration={duration}
            selectedPlans={selectedPlans}
          />
        )}

        {/* No results message */}
        {filteredSubscriptions.length === 0 && (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-foreground/50 text-lg">
              Aucun service ne correspond à ta recherche.
            </p>
          </motion.div>
        )}

        {/* Share/Export component */}
        {filteredSubscriptions.length > 0 && (
          <ShareExport 
            subscriptions={filteredSubscriptions}
            selectedPlans={selectedPlans}
            duration={duration}
          />
        )}

        {/* Disclaimer */}
        <p className="text-center text-xs text-foreground/30 max-w-lg mx-auto">
          * Prix indicatifs relevés en juillet 2025 sur les sites officiels des services.
          Les prix peuvent varier selon les promotions et les conditions d'abonnement.
        </p>
      </div>

      {/* Modals */}
      <RecommendationsModal
        isOpen={showRecommendations}
        onClose={() => setShowRecommendations(false)}
        selectedPlans={selectedPlans}
        duration={duration}
      />

      <DirectComparison
        isOpen={showComparison}
        onClose={() => setShowComparison(false)}
        comparedIds={comparedIds}
        duration={duration}
      />

      {/* Quick View */}
      <QuickView
        subscriptionId={quickViewId}
        isOpen={quickViewId !== null}
        onClose={() => setQuickViewId(null)}
        duration={duration}
        selectedPlanIndex={quickViewId ? (selectedPlans[quickViewId] ?? 0) : 0}
        onPlanChange={(index) => {
          if (quickViewId) handlePlanChange(quickViewId, index);
        }}
        isFavorite={quickViewId ? isFavorite(quickViewId) : false}
        onToggleFavorite={() => {
          if (quickViewId) toggleFavorite(quickViewId);
        }}
        isCompared={quickViewId ? comparedIds.includes(quickViewId) : false}
        onToggleCompare={() => {
          if (quickViewId) toggleCompare(quickViewId);
        }}
      />

      {/* Keyboard Shortcuts Dialog */}
      <Dialog open={showShortcuts} onOpenChange={setShowShortcuts}>
        <DialogContent className="glass-strong border-white/10">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Keyboard className="w-5 h-5" />
              Raccourcis clavier
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {[
              { key: '/', desc: 'Rechercher un abonnement' },
              { key: 'Echap', desc: 'Effacer la recherche' },
              { key: 'F', desc: 'Filtrer les favoris' },
              { key: 'G', desc: 'Changer de vue (grille/graphique)' },
              { key: '?', desc: 'Afficher les raccourcis' }
            ].map(shortcut => (
              <div key={shortcut.key} className="flex items-center justify-between glass rounded-lg p-3">
                <span className="text-foreground/80">{shortcut.desc}</span>
                <Badge variant="outline" className="font-mono">
                  {shortcut.key}
                </Badge>
              </div>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ComparisonSection;
