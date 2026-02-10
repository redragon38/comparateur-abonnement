import { motion } from "framer-motion";
import { useState } from "react";
import { Calculator, Plus, Trash2 } from "lucide-react";
import { formatPrice } from "@/data/subscriptions";

interface CustomSubscription {
  id: string;
  name: string;
  monthlyPrice: number;
}

const CustomCalculator = () => {
  const [customSubs, setCustomSubs] = useState<CustomSubscription[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [years, setYears] = useState(5);

  const addCustomSub = () => {
    if (name && price && parseFloat(price) > 0) {
      setCustomSubs([...customSubs, {
        id: Date.now().toString(),
        name,
        monthlyPrice: parseFloat(price)
      }]);
      setName("");
      setPrice("");
    }
  };

  const removeSub = (id: string) => {
    setCustomSubs(customSubs.filter(sub => sub.id !== id));
  };

  const totalMonthly = customSubs.reduce((sum, sub) => sum + sub.monthlyPrice, 0);
  const totalOverYears = totalMonthly * years * 12;

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <motion.div 
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            <span className="text-gradient-purple">Calcule</span> tes dépenses
          </h2>
          <p className="text-foreground/50 max-w-xl mx-auto text-lg">
            Ajoute tes propres abonnements pour calculer ton total réel.
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto glass-strong rounded-2xl p-8 space-y-8"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Add form */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl stat-card-purple flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Ajouter un abonnement</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <input
                type="text"
                placeholder="Nom de l'abonnement"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:col-span-2 px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                onKeyPress={(e) => e.key === 'Enter' && addCustomSub()}
              />
              <div className="relative">
                <input
                  type="number"
                  placeholder="Prix/mois"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50"
                  step="0.01"
                  min="0"
                  onKeyPress={(e) => e.key === 'Enter' && addCustomSub()}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 text-sm">€</span>
              </div>
            </div>

            <motion.button
              onClick={addCustomSub}
              className="w-full stat-card-accent text-white px-6 py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus className="w-5 h-5" />
              Ajouter
            </motion.button>
          </div>

          {/* List of custom subscriptions */}
          {customSubs.length > 0 && (
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Mes abonnements ({customSubs.length})</h4>
              {customSubs.map((sub, index) => (
                <motion.div
                  key={sub.id}
                  className="glass rounded-xl p-4 flex items-center justify-between"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div>
                    <p className="font-medium text-foreground">{sub.name}</p>
                    <p className="text-sm text-foreground/60">{formatPrice(sub.monthlyPrice)}/mois</p>
                  </div>
                  <button
                    onClick={() => removeSub(sub.id)}
                    className="glass hover:bg-red-500/20 p-2 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-red-400" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}

          {/* Years selector */}
          {customSubs.length > 0 && (
            <div className="space-y-3">
              <label className="font-semibold text-foreground">Projection sur combien d'années ?</label>
              <div className="flex gap-2">
                {[1, 3, 5, 10].map((year) => (
                  <button
                    key={year}
                    onClick={() => setYears(year)}
                    className={`
                      flex-1 px-4 py-3 rounded-xl font-medium transition-all
                      ${years === year 
                        ? "stat-card-shock text-white" 
                        : "glass text-foreground/70 hover:glass-strong"
                      }
                    `}
                  >
                    {year} an{year > 1 ? 's' : ''}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results */}
          {customSubs.length > 0 && (
            <motion.div 
              className="space-y-4 pt-6 border-t border-white/10"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-sm text-foreground/60 mb-1">Total mensuel</p>
                  <p className="text-2xl font-bold text-gradient-accent">{formatPrice(totalMonthly)}</p>
                </div>
                <div className="glass rounded-xl p-4 text-center">
                  <p className="text-sm text-foreground/60 mb-1">Total annuel</p>
                  <p className="text-2xl font-bold text-foreground">{formatPrice(totalMonthly * 12)}</p>
                </div>
              </div>

              <div className="stat-card-shock rounded-xl p-6 text-center text-white">
                <p className="text-sm opacity-90 mb-2">Coût total sur {years} an{years > 1 ? 's' : ''}</p>
                <p className="text-4xl md:text-5xl font-bold mb-2">{formatPrice(totalOverYears)}</p>
                <p className="text-sm opacity-75">
                  soit {formatPrice(totalOverYears / (years * 12))}/mois pendant {years * 12} mois
                </p>
              </div>

              {/* Fun facts */}
              <div className="glass rounded-xl p-4 space-y-2">
                <p className="text-sm font-semibold text-foreground mb-2">💡 Le savais-tu ?</p>
                <p className="text-xs text-foreground/60">
                  Avec {formatPrice(totalOverYears)}, tu pourrais :
                </p>
                <ul className="text-xs text-foreground/70 space-y-1 ml-4">
                  <li>• {Math.floor(totalOverYears / 1000)} voyages à {formatPrice(1000)}</li>
                  <li>• {Math.floor(totalOverYears / 50)} restaurants à {formatPrice(50)}</li>
                  <li>• {Math.floor(totalOverYears / 15)} livres à {formatPrice(15)}</li>
                </ul>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CustomCalculator;
