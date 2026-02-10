import { Printer } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

const PrintButton = () => {
  const { toast } = useToast();

  const handlePrint = () => {
    // Add print class to body for targeting
    document.body.classList.add('printing');
    
    toast({
      title: "Impression",
      description: "Ouverture de la fenêtre d'impression...",
      duration: 2000,
    });

    // Small delay to let toast show
    setTimeout(() => {
      window.print();
      document.body.classList.remove('printing');
    }, 500);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handlePrint}
      className="glass border-white/10 hover:glass-strong no-print"
    >
      <Printer className="w-4 h-4 mr-2" />
      Imprimer
    </Button>
  );
};

export default PrintButton;
