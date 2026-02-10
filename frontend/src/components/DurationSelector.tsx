import { durationOptions, type DurationOption } from "@/data/subscriptions";
import { useLanguage } from "@/contexts/LanguageContext";

interface DurationSelectorProps {
  selected: DurationOption;
  onSelect: (option: DurationOption) => void;
}

const DurationSelector = ({ selected, onSelect }: DurationSelectorProps) => {
  const { language } = useLanguage();

  const getLabel = (option: DurationOption) => {
    if (language === 'en') {
      if (option.months === 12) return '1 year';
      if (option.months === 36) return '3 years';
      if (option.months === 60) return '5 years';
      if (option.months === 120) return '10 years';
    }
    return option.label;
  };

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {durationOptions.map((option) => {
        const isActive = option.value === selected.value;
        return (
          <button
            key={option.value}
            onClick={() => onSelect(option)}
            className={`
              px-7 py-3 rounded-xl font-bold text-sm transition-all duration-300
              ${
                isActive
                  ? "stat-card-shock text-white glow-shock scale-105"
                  : "glass text-foreground/70 hover:text-foreground hover:bg-white/10"
              }
            `}
          >
            {getLabel(option)}
          </button>
        );
      })}
    </div>
  );
};

export default DurationSelector;
