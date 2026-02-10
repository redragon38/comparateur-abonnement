import { motion } from "framer-motion";
import { Clock, X } from "lucide-react";
import { Button } from "./ui/button";
import { useHistory } from "@/hooks/useHistory";
import { useNavigate } from "react-router-dom";
import { ScrollArea } from "./ui/scroll-area";

const RecentHistory = () => {
  const { history, clearHistory, removeFromHistory } = useHistory();
  const navigate = useNavigate();

  if (history.length === 0) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-foreground/60" />
          <h3 className="text-lg font-bold text-foreground">Consultés récemment</h3>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearHistory}
          className="text-foreground/60 hover:text-foreground"
        >
          Effacer
        </Button>
      </div>

      <ScrollArea className="w-full">
        <div className="flex gap-3 pb-2">
          {history.map((item, index) => (
            <motion.div
              key={item.id}
              className="glass rounded-xl p-4 min-w-[140px] cursor-pointer hover:glass-strong transition-all relative group"
              onClick={() => navigate(`/subscription/${item.id}`)}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFromHistory(item.id);
                }}
                className="absolute top-2 right-2 p-1 rounded-lg glass-strong opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              >
                <X className="w-3 h-3 text-foreground/60 hover:text-red-400" />
              </button>
              
              <div className="text-3xl mb-2 text-center">{item.logo}</div>
              <p className="text-sm font-medium text-foreground text-center truncate">
                {item.name}
              </p>
              <p className="text-xs text-foreground/40 text-center mt-1">
                {getTimeAgo(item.timestamp)}
              </p>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

const getTimeAgo = (timestamp: number): string => {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  
  if (seconds < 60) return 'À l\'instant';
  if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)}m`;
  if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
  return `Il y a ${Math.floor(seconds / 86400)}j`;
};

export default RecentHistory;
