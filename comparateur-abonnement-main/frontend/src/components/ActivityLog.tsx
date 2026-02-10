import { motion } from "framer-motion";
import { Activity, TrendingUp, TrendingDown, Clock, AlertTriangle } from "lucide-react";
import { useActivityLog } from "@/hooks/useActivityLog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";

const ActivityLog = () => {
  const { activityLog, getRecentActivity, clearActivityLog } = useActivityLog();
  const recentActivity = getRecentActivity(7);

  if (recentActivity.length === 0) return null;

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'add': return <TrendingUp className="w-4 h-4 text-green-400" />;
      case 'remove': return <TrendingDown className="w-4 h-4 text-red-400" />;
      case 'modify': return <Activity className="w-4 h-4 text-blue-400" />;
      case 'favorite': return <span className="text-red-400">❤️</span>;
      default: return <Activity className="w-4 h-4 text-foreground/40" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'add': return 'bg-green-400/10 text-green-400 border-green-400/30';
      case 'remove': return 'bg-red-400/10 text-red-400 border-red-400/30';
      case 'modify': return 'bg-blue-400/10 text-blue-400 border-blue-400/30';
      case 'favorite': return 'bg-pink-400/10 text-pink-400 border-pink-400/30';
      default: return 'bg-foreground/10 text-foreground border-foreground/30';
    }
  };

  const getTimeAgo = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'À l\'instant';
    if (seconds < 3600) return `Il y a ${Math.floor(seconds / 60)}m`;
    if (seconds < 86400) return `Il y a ${Math.floor(seconds / 3600)}h`;
    const days = Math.floor(seconds / 86400);
    return `Il y a ${days}j`;
  };

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Activité récente</h3>
          <Badge variant="outline">{recentActivity.length}</Badge>
        </div>
      </div>

      <ScrollArea className="h-[300px] pr-4">
        <div className="space-y-2">
          {recentActivity.reverse().map((entry, index) => (
            <motion.div
              key={entry.id}
              className="glass rounded-lg p-3 flex items-start gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.03 }}
            >
              <div className="mt-1">{getActionIcon(entry.action)}</div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{entry.details}</p>
                {entry.subscriptionName && (
                  <p className="text-xs text-foreground/60 mt-1">
                    {entry.subscriptionName}
                  </p>
                )}
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant="outline" className={`text-xs ${getActionColor(entry.action)}`}>
                    {entry.action}
                  </Badge>
                  <span className="text-xs text-foreground/40">
                    {getTimeAgo(entry.timestamp)}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </motion.div>
  );
};

export default ActivityLog;
