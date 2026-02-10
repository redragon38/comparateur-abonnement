import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Search } from "lucide-react";
import SEO from "@/components/SEO";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col">
      <SEO 
        title="Page non trouvée - Erreur 404"
        description="La page que vous recherchez n'existe pas. Retournez à l'accueil pour découvrir le vrai prix de vos abonnements."
        noindex={true}
      />
      
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-20" role="main">
        <div className="container">
          <motion.div 
            className="text-center max-w-md mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-8xl mb-6" aria-hidden="true">🔍</div>
            
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Page non trouvée
            </h1>
            
            <p className="text-foreground/60 mb-8">
              Oups ! La page que vous recherchez n'existe pas ou a été déplacée.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate("/")}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl stat-card-shock text-white font-semibold"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Home className="w-5 h-5" aria-hidden="true" />
                Retour à l'accueil
              </motion.button>
              
              <motion.a
                href="/#comparateur"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl glass hover:glass-strong font-semibold text-foreground/80 transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Search className="w-5 h-5" aria-hidden="true" />
                Voir le comparateur
              </motion.a>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
