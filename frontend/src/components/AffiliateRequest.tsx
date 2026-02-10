import { useState } from "react";
import { motion } from "framer-motion";
import { Handshake, Send } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";

const AffiliateRequest = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serviceName: '',
    website: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.serviceName) {
      toast({
        title: "Champs requis",
        description: "Veuillez remplir tous les champs obligatoires",
        variant: "destructive",
        duration: 3000,
      });
      return;
    }

    // Simulate sending request
    console.log('Affiliate request:', formData);
    
    toast({
      title: "Demande envoyée !",
      description: "Nous vous contacterons sous 48h",
      duration: 5000,
    });

    setFormData({
      name: '',
      email: '',
      serviceName: '',
      website: '',
      message: ''
    });
    
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="glass-strong px-4 py-2 rounded-xl text-foreground hover:bg-white/10 transition-all"
        >
          <Handshake className="w-5 h-5 mr-2" />
          <span className="font-medium">Demande d'affiliation</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10 max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Handshake className="w-6 h-6 text-accent" />
            Demande d'affiliation
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm text-foreground/70">
            Vous êtes un service d'abonnement et souhaitez être référencé sur notre plateforme ? Remplissez ce formulaire.
          </p>

          <div className="space-y-2">
            <Label htmlFor="name">Nom complet *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Jean Dupont"
              className="glass border-white/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email professionnel *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="contact@entreprise.com"
              className="glass border-white/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="serviceName">Nom du service *</Label>
            <Input
              id="serviceName"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              placeholder="Mon Service Streaming"
              className="glass border-white/10"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="website">Site web (optionnel)</Label>
            <Input
              id="website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              placeholder="https://monservice.com"
              className="glass border-white/10"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message (optionnel)</Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Décrivez brièvement votre service et pourquoi vous souhaitez être référencé..."
              className="glass border-white/10 min-h-[100px]"
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1 stat-card-shock text-white">
              <Send className="w-4 h-4 mr-2" />
              Envoyer la demande
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsOpen(false)}
              className="glass border-white/10"
            >
              Annuler
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AffiliateRequest;
