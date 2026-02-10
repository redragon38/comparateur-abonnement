import { motion } from "framer-motion";
import { DollarSign, X } from "lucide-react";
import { Button } from "./ui/button";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";

interface PriceFilterProps {
  minPrice: number;
  maxPrice: number;
  onPriceChange: (min: number, max: number) => void;
  isActive: boolean;
  onClear: () => void;
}

const PriceFilter = ({ minPrice, maxPrice, onPriceChange, isActive, onClear }: PriceFilterProps) => {
  const ABSOLUTE_MAX = 100;

  return (
    <motion.div
      className="glass-strong rounded-xl p-5 space-y-4"
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <DollarSign className="w-5 h-5 text-foreground/60" />
          <h4 className="font-bold text-foreground">Filtre par prix mensuel</h4>
        </div>
        {isActive && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            className="text-foreground/60 hover:text-foreground"
          >
            <X className="w-4 h-4 mr-1" />
            Réinitialiser
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <Slider
          value={[minPrice, maxPrice]}
          onValueChange={(values) => onPriceChange(values[0], values[1])}
          min={0}
          max={ABSOLUTE_MAX}
          step={1}
          className="w-full"
        />

        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-foreground">
            Min: {minPrice.toFixed(0)}€
          </Badge>
          <Badge variant="outline" className="text-foreground">
            Max: {maxPrice >= ABSOLUTE_MAX ? `${ABSOLUTE_MAX}+€` : `${maxPrice.toFixed(0)}€`}
          </Badge>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            className="glass border-white/10 hover:glass-strong text-xs"
            onClick={() => onPriceChange(0, 10)}
          >
            0-10€
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="glass border-white/10 hover:glass-strong text-xs"
            onClick={() => onPriceChange(10, 20)}
          >
            10-20€
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="glass border-white/10 hover:glass-strong text-xs"
            onClick={() => onPriceChange(20, 50)}
          >
            20-50€
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="glass border-white/10 hover:glass-strong text-xs"
            onClick={() => onPriceChange(50, ABSOLUTE_MAX)}
          >
            50€+
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default PriceFilter;
