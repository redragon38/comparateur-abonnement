import { motion } from "framer-motion";
import { Share2, Download, Printer } from "lucide-react";
import { useState } from "react";
import { formatPrice, type Subscription, type DurationOption } from "@/data/subscriptions";

interface ShareExportProps {
  subscriptions: Subscription[];
  selectedPlans: Record<string, number>;
  duration: DurationOption;
}

const ShareExport = ({ subscriptions, selectedPlans, duration }: ShareExportProps) => {
  const [showToast, setShowToast] = useState(false);

  const calculateTotal = () => {
    return subscriptions.reduce((total, sub) => {
      const planIndex = selectedPlans[sub.id] ?? 0;
      const plan = sub.plans[planIndex];
      return total + (plan.monthlyPrice * duration.months);
    }, 0);
  };

  const handleShare = async () => {
    const total = calculateTotal();
    const text = `J'ai calculé mes dépenses d'abonnements sur ${duration.label} : ${formatPrice(total)} ! 😱\n\nVérifie les tiennes sur Subscription Saver 👉`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Mes dépenses d\'abonnements',
          text: text,
          url: window.location.href
        });
      } catch (err) {
        copyToClipboard(text);
      }
    } else {
      copyToClipboard(text);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handleDownload = () => {
    const total = calculateTotal();
    let content = `MES ABONNEMENTS - Analyse ${duration.label}\n`;
    content += `${"=".repeat(50)}\n\n`;
    
    subscriptions.forEach(sub => {
      const planIndex = selectedPlans[sub.id] ?? 0;
      const plan = sub.plans[planIndex];
      const cost = plan.monthlyPrice * duration.months;
      content += `${sub.name} (${plan.name})\n`;
      content += `  Mensuel: ${formatPrice(plan.monthlyPrice)}\n`;
      content += `  Total ${duration.label}: ${formatPrice(cost)}\n\n`;
    });
    
    content += `${"=".repeat(50)}\n`;
    content += `TOTAL ${duration.label}: ${formatPrice(total)}\n`;
    content += `Moyenne par mois: ${formatPrice(total / duration.months)}\n`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `mes-abonnements-${duration.label}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePrint = () => {
    window.print();
  };

  if (subscriptions.length === 0) return null;

  return (
    <>
      <motion.div 
        className="glass-strong rounded-2xl p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-lg font-bold text-foreground mb-4">Partager et exporter</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <motion.button
            onClick={handleShare}
            className="glass rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-medium text-foreground/80 hover:glass-strong transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Share2 className="w-4 h-4" />
            Partager
          </motion.button>

          <motion.button
            onClick={handleDownload}
            className="glass rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-medium text-foreground/80 hover:glass-strong transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-4 h-4" />
            Télécharger
          </motion.button>

          <motion.button
            onClick={handlePrint}
            className="glass rounded-xl px-4 py-3 flex items-center justify-center gap-2 font-medium text-foreground/80 hover:glass-strong transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Printer className="w-4 h-4" />
            Imprimer
          </motion.button>
        </div>
      </motion.div>

      {/* Toast notification */}
      {showToast && (
        <motion.div
          className="fixed bottom-8 right-8 stat-card-accent text-white px-6 py-4 rounded-xl shadow-lg z-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
        >
          ✓ Copié dans le presse-papier !
        </motion.div>
      )}
    </>
  );
};

export default ShareExport;
