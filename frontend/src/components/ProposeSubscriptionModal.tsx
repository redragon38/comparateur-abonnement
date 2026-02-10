import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Plus } from "lucide-react";
import { useState } from "react";

interface ProposeSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProposeSubscriptionModal = ({ isOpen, onClose }: ProposeSubscriptionModalProps) => {
  const [formData, setFormData] = useState({
    serviceName: "",
    category: "",
    monthlyPrice: "",
    planName: "",
    email: "",
    message: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer le corps de l'email
    const subject = encodeURIComponent(`Proposition d'abonnement : ${formData.serviceName}`);
    const body = encodeURIComponent(
      `Service proposé : ${formData.serviceName}\n` +
      `Catégorie : ${formData.category}\n` +
      `Prix mensuel : ${formData.monthlyPrice}€\n` +
      `Nom du plan : ${formData.planName}\n` +
      `Email de contact : ${formData.email}\n\n` +
      `Message :\n${formData.message}`
    );
    
    // Ouvre le client email par défaut
    window.location.href = `mailto:l.bonin2011@gmail.com?subject=${subject}&body=${body}`;
    
    setIsSubmitted(true);
    setTimeout(() => {
      onClose();
      setIsSubmitted(false);
      setFormData({
        serviceName: "",
        category: "",
        monthlyPrice: "",
        planName: "",
        email: "",
        message: ""
      });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-strong rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto relative"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-foreground/70" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header */}
                  <div className="mb-6">
                    <div className="w-12 h-12 rounded-xl stat-card-shock flex items-center justify-center mb-4">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground mb-2">
                      Propose un abonnement
                    </h2>
                    <p className="text-foreground/60 text-sm">
                      Tu veux qu'on ajoute un service ? Remplis ce formulaire et on l'ajoutera rapidement !
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Nom du service *
                      </label>
                      <input
                        type="text"
                        name="serviceName"
                        value={formData.serviceName}
                        onChange={handleChange}
                        placeholder="Ex: YouTube Premium"
                        required
                        className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Catégorie *
                      </label>
                      <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl glass text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      >
                        <option value="">Sélectionne une catégorie</option>
                        <option value="Streaming vidéo">Streaming vidéo</option>
                        <option value="Streaming audio">Streaming audio</option>
                        <option value="Gaming">Gaming</option>
                        <option value="Cloud">Cloud</option>
                        <option value="Productivité">Productivité</option>
                        <option value="Sport">Sport</option>
                        <option value="Éducation">Éducation</option>
                        <option value="Autre">Autre</option>
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Prix/mois (€) *
                        </label>
                        <input
                          type="number"
                          name="monthlyPrice"
                          value={formData.monthlyPrice}
                          onChange={handleChange}
                          placeholder="9.99"
                          step="0.01"
                          min="0"
                          required
                          className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground/80 mb-2">
                          Nom du plan
                        </label>
                        <input
                          type="text"
                          name="planName"
                          value={formData.planName}
                          onChange={handleChange}
                          placeholder="Premium"
                          className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Ton email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ton@email.com"
                        required
                        className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-2">
                        Message (optionnel)
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Des informations supplémentaires ?"
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl glass text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full px-6 py-3 rounded-xl stat-card-shock text-white font-bold flex items-center justify-center gap-2 glow-shock"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Send className="w-5 h-5" />
                      Envoyer la proposition
                    </motion.button>
                  </form>
                </>
              ) : (
                <motion.div
                  className="py-12 text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <div className="w-16 h-16 rounded-full stat-card-accent mx-auto mb-4 flex items-center justify-center">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    Merci !
                  </h3>
                  <p className="text-foreground/60">
                    Ta proposition a été envoyée. On l'examine rapidement !
                  </p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ProposeSubscriptionModal;
