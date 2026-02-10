import { motion } from "framer-motion";
import { Ticket, Plus, Trash2, Copy, Check } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { usePromoCodes } from "@/hooks/usePromoCodes";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const PromoCodesManager = () => {
  const { promoCodes, addPromoCode, deletePromoCode, getActivePromoCodes } = usePromoCodes();
  const [isOpen, setIsOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    code: ''
  });

  const handleSubmit = () => {
    if (!formData.code) return;

    addPromoCode(
      `promo-${Date.now()}`,
      '',
      formData.code,
      '',
      '',
      undefined
    );

    setFormData({ code: '' });

    toast({
      title: "Code promo ajouté",
      description: `Code ${formData.code} enregistré avec succès`,
      duration: 3000,
    });
  };

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    
    toast({
      title: "Code copié",
      description: `${code} copié dans le presse-papier`,
      duration: 2000,
    });
  };

  const activeCodes = getActivePromoCodes();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
          <Ticket className="w-4 h-4 mr-2" />
          Codes Promo {activeCodes.length > 0 && `(${activeCodes.length})`}
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-5 h-5 text-accent" />
            Mes codes promo
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Add new promo code */}
          <div className="glass-strong rounded-xl p-4 space-y-4">
            <h4 className="font-bold text-foreground">Ajouter un code</h4>
            
            <div className="flex gap-2">
              <Input
                value={formData.code}
                onChange={(e) => setFormData({ code: e.target.value.toUpperCase() })}
                placeholder="PROMO2025"
                className="glass border-white/10 flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
              />
              <Button onClick={handleSubmit} className="stat-card-shock text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Existing codes */}
          {promoCodes.length > 0 ? (
            <div className="space-y-3">
              <h4 className="font-bold text-foreground">Codes enregistrés ({promoCodes.length})</h4>
              <div className="space-y-2">
                {promoCodes.map((promo, index) => {
                  const isCopied = copiedId === promo.id;

                  return (
                    <motion.div
                      key={promo.id}
                      className="glass rounded-xl p-3 flex items-center justify-between"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleCopy(promo.code, promo.id)}
                        className="glass border-white/10 flex-1 justify-start"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-4 h-4 mr-2 text-green-400" />
                            Copié !
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4 mr-2" />
                            {promo.code}
                          </>
                        )}
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deletePromoCode(promo.id)}
                        className="text-foreground/40 hover:text-red-400 ml-2"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="text-center py-8 text-foreground/40">
              <Ticket className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucun code promo enregistré</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PromoCodesManager;
