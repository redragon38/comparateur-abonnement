import { Share2, Twitter, Facebook, Linkedin, Link2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { formatPrice, subscriptions } from "@/data/subscriptions";

interface SocialShareProps {
  selectedPlans: Record<string, number>;
  totalMonthly: number;
}

const SocialShare = ({ selectedPlans, totalMonthly }: SocialShareProps) => {
  const { toast } = useToast();

  if (Object.keys(selectedPlans).length === 0) return null;

  const subsCount = Object.keys(selectedPlans).length;
  const subsNames = Object.keys(selectedPlans)
    .slice(0, 3)
    .map(id => subscriptions.find(s => s.id === id)?.name)
    .filter(Boolean)
    .join(', ');

  const shareText = `Je gère ${subsCount} abonnements (${subsNames}${subsCount > 3 ? '...' : ''}) pour ${formatPrice(totalMonthly)}/mois ! 💰`;
  const shareUrl = window.location.href;

  const handleShare = (platform: string) => {
    let url = '';

    switch (platform) {
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        break;
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
        toast({
          title: "Lien copié",
          description: "Le lien a été copié dans votre presse-papier",
          duration: 3000,
        });
        return;
    }

    if (url) {
      window.open(url, '_blank', 'width=600,height=400');
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
          <Share2 className="w-4 h-4 mr-2" />
          Partager
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-accent" />
            Partager ma sélection
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Preview */}
          <div className="glass rounded-xl p-4">
            <p className="text-sm text-foreground/70 mb-2">Aperçu du partage :</p>
            <p className="text-foreground font-medium">{shareText}</p>
          </div>

          {/* Social buttons */}
          <div className="space-y-3">
            <Button
              onClick={() => handleShare('twitter')}
              className="w-full justify-start glass border-white/10 hover:bg-[#1DA1F2]/20"
            >
              <Twitter className="w-5 h-5 mr-3" style={{ color: '#1DA1F2' }} />
              <span>Partager sur Twitter</span>
            </Button>

            <Button
              onClick={() => handleShare('facebook')}
              className="w-full justify-start glass border-white/10 hover:bg-[#1877F2]/20"
            >
              <Facebook className="w-5 h-5 mr-3" style={{ color: '#1877F2' }} />
              <span>Partager sur Facebook</span>
            </Button>

            <Button
              onClick={() => handleShare('linkedin')}
              className="w-full justify-start glass border-white/10 hover:bg-[#0A66C2]/20"
            >
              <Linkedin className="w-5 h-5 mr-3" style={{ color: '#0A66C2' }} />
              <span>Partager sur LinkedIn</span>
            </Button>

            <Button
              onClick={() => handleShare('copy')}
              variant="outline"
              className="w-full justify-start glass border-white/10"
            >
              <Link2 className="w-5 h-5 mr-3" />
              <span>Copier le lien</span>
            </Button>
          </div>

          {/* Stats to share */}
          <div className="glass-strong rounded-xl p-4 space-y-2">
            <p className="text-xs text-foreground/60">Vos statistiques :</p>
            <div className="grid grid-cols-3 gap-3 text-center">
              <div>
                <p className="text-2xl font-bold text-foreground">{subsCount}</p>
                <p className="text-xs text-foreground/60">Services</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{formatPrice(totalMonthly)}</p>
                <p className="text-xs text-foreground/60">Par mois</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{formatPrice(totalMonthly * 12)}</p>
                <p className="text-xs text-foreground/60">Par an</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SocialShare;
