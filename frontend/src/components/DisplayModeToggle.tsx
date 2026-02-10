import { motion } from "framer-motion";
import { Maximize2, Minimize2, Square } from "lucide-react";
import { Button } from "./ui/button";
import { useDisplayMode, type DisplayMode } from "@/hooks/useDisplayMode";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const DisplayModeToggle = () => {
  const { displayMode, changeDisplayMode } = useDisplayMode();

  const modes: { value: DisplayMode; label: string; icon: any }[] = [
    { value: 'compact', label: 'Compact', icon: Minimize2 },
    { value: 'normal', label: 'Normal', icon: Square },
    { value: 'comfortable', label: 'Confortable', icon: Maximize2 },
  ];

  const currentMode = modes.find(m => m.value === displayMode);
  const CurrentIcon = currentMode?.icon || Square;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="glass border-white/10 hover:glass-strong">
          <CurrentIcon className="w-4 h-4 mr-2" />
          Affichage
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="glass-strong border-white/10">
        {modes.map((mode) => {
          const Icon = mode.icon;
          return (
            <DropdownMenuItem
              key={mode.value}
              onClick={() => changeDisplayMode(mode.value)}
              className={`cursor-pointer ${
                displayMode === mode.value ? 'bg-white/10' : ''
              }`}
            >
              <Icon className="w-4 h-4 mr-2" />
              {mode.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DisplayModeToggle;
