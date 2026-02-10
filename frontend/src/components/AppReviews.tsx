import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, MessageSquare, ThumbsUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getReviews, createReview, incrementHelpful, type Review } from "@/lib/reviewsDb";

interface AppReviewsProps {
  appId: string;
  appName: string;
}

const AppReviews = ({ appId, appName }: AppReviewsProps) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [hoveredStar, setHoveredStar] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Charger les avis
  useEffect(() => {
    loadReviews();
  }, [appId]);

  const loadReviews = async () => {
    setIsLoading(true);
    try {
      const data = await getReviews(appId);
      setReviews(data);
    } catch (error) {
      console.error("Erreur:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Calculer la moyenne des notes
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
      : 0;

  // Soumettre un nouvel avis
  const handleSubmitReview = async () => {
    if (!userName.trim() || !comment.trim() || rating === 0) {
      alert("Veuillez remplir tous les champs et donner une note");
      return;
    }

    setIsSaving(true);

    try {
      const newReview = await createReview(appId, userName.trim(), rating, comment.trim());
      
      // Ajouter le nouvel avis à la liste
      setReviews([newReview, ...reviews]);

      // Réinitialiser le formulaire
      setUserName("");
      setRating(0);
      setComment("");
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de la création de l'avis");
    } finally {
      setIsSaving(false);
    }
  };

  // Marquer un avis comme utile
  const handleHelpful = async (reviewId: string) => {
    try {
      await incrementHelpful(appId, reviewId);
      
      // Mettre à jour localement
      setReviews(reviews.map(review =>
        review.id === reviewId
          ? { ...review, helpful: review.helpful + 1 }
          : review
      ));
    } catch (error) {
      console.error("Erreur:", error);
    }
  };

  // Rendu des étoiles pour la notation
  const renderStars = (
    currentRating: number,
    isInteractive = false,
    size: "sm" | "md" | "lg" = "md"
  ) => {
    const sizeClasses = {
      sm: "w-4 h-4",
      md: "w-5 h-5",
      lg: "w-6 h-6",
    };

    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${
              isInteractive ? "cursor-pointer" : ""
            } transition-all`}
            fill={
              star <= (isInteractive ? hoveredStar || currentRating : currentRating)
                ? "#FFD700"
                : "none"
            }
            stroke={
              star <= (isInteractive ? hoveredStar || currentRating : currentRating)
                ? "#FFD700"
                : "#888"
            }
            onMouseEnter={
              isInteractive ? () => setHoveredStar(star) : undefined
            }
            onMouseLeave={isInteractive ? () => setHoveredStar(0) : undefined}
            onClick={isInteractive ? () => setRating(star) : undefined}
          />
        ))}
      </div>
    );
  };

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6 md:p-8 space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* En-tête avec moyenne et bouton d'ajout */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-6 h-6" />
            Avis sur {appName}
          </h2>
          {isLoading ? (
            <div className="flex items-center gap-2 text-foreground/60">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Chargement des avis...</span>
            </div>
          ) : reviews.length > 0 ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {renderStars(Math.round(averageRating), false, "lg")}
              </div>
              <div className="text-foreground/60">
                <span className="text-2xl font-bold text-foreground">
                  {averageRating.toFixed(1)}
                </span>
                <span className="text-sm ml-2">
                  ({reviews.length} avis)
                </span>
              </div>
            </div>
          ) : (
            <p className="text-foreground/60">Aucun avis pour le moment</p>
          )}
        </div>

        {/* Bouton pour ajouter un avis */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="stat-card-shock text-white hover:opacity-90">
              <Star className="w-4 h-4 mr-2" />
              Laisser un avis
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/10">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-foreground">
                Donnez votre avis
              </DialogTitle>
              <DialogDescription className="text-foreground/60">
                Partagez votre expérience avec {appName}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              {/* Nom */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Votre nom
                </label>
                <Input
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Ex: Jean Dupont"
                  className="glass border-white/10"
                />
              </div>

              {/* Note */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Votre note
                </label>
                <div className="flex items-center gap-2">
                  {renderStars(rating, true, "lg")}
                  {rating > 0 && (
                    <span className="text-foreground/60 text-sm ml-2">
                      {rating}/5
                    </span>
                  )}
                </div>
              </div>

              {/* Commentaire */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Votre commentaire
                </label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience..."
                  rows={4}
                  className="glass border-white/10 resize-none"
                />
              </div>

              {/* Bouton de soumission */}
              <Button
                onClick={handleSubmitReview}
                disabled={isSaving}
                className="w-full stat-card-shock text-white hover:opacity-90 disabled:opacity-50"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Publication en cours...
                  </>
                ) : (
                  "Publier mon avis"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Liste des avis */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 glass rounded-xl">
            <Loader2 className="w-16 h-16 mx-auto mb-4 text-foreground/20 animate-spin" />
            <p className="text-foreground/60">
              Chargement des avis...
            </p>
          </div>
        ) : (
          <>
            <AnimatePresence>
              {reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  className="glass rounded-xl p-5 space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Header de l'avis */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-10 h-10 glass">
                        <AvatarFallback className="text-foreground font-semibold bg-gradient-to-br from-accent/20 to-shock/20">
                          {review.userInitials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-foreground">
                            {review.userName}
                          </span>
                          <span className="text-xs text-foreground/40">•</span>
                          <span className="text-xs text-foreground/60">
                            {review.date}
                          </span>
                        </div>
                        {renderStars(review.rating, false, "sm")}
                      </div>
                    </div>
                  </div>

                  {/* Commentaire */}
                  <p className="text-foreground/80 leading-relaxed pl-[52px]">
                    {review.comment}
                  </p>

                  {/* Utile */}
                  <div className="flex items-center gap-2 pl-[52px]">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-1.5 text-sm text-foreground/60 hover:text-accent transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      <span>Utile ({review.helpful})</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {reviews.length === 0 && (
              <div className="text-center py-12 glass rounded-xl">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-foreground/20" />
                <p className="text-foreground/60">
                  Soyez le premier à laisser un avis !
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default AppReviews;
