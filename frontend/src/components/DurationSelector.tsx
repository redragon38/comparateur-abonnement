import { durationOptions, type DurationOption } from "@/data/subscriptions";

interface DurationSelectorProps {
  selected: DurationOption;
  onSelect: (option: DurationOption) => void;
}

const DurationSelector = ({ selected, onSelect }: DurationSelectorProps) => {
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
            {option.label}
          </button>
        );
      })}
    </div>
  );
};

export default DurationSelector;
