import { motion } from "framer-motion";
import { Calendar, Bell, Plus, Trash2, Edit2, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Switch } from "./ui/switch";
import { useRenewals } from "@/hooks/useRenewals";
import { useState } from "react";
import { formatPrice } from "@/data/subscriptions";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";

const RenewalCalendar = () => {
  const { renewals, addRenewal, updateRenewal, deleteRenewal, getUpcomingRenewals, getAlertsNeeded } = useRenewals();
  const [isOpen, setIsOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    subscriptionName: '',
    nextRenewalDate: '',
    billingCycle: 'monthly' as const,
    price: '',
    alertDaysBefore: '7',
    autoRenew: true
  });

  const upcomingRenewals = getUpcomingRenewals(30);
  const alerts = getAlertsNeeded();

  const handleSubmit = () => {
    if (!formData.subscriptionName || !formData.nextRenewalDate || !formData.price) return;

    const renewal = {
      subscriptionId: editingId || `renewal-${Date.now()}`,
      subscriptionName: formData.subscriptionName,
      nextRenewalDate: formData.nextRenewalDate,
      billingCycle: formData.billingCycle,
      price: parseFloat(formData.price),
      alertDaysBefore: parseInt(formData.alertDaysBefore),
      autoRenew: formData.autoRenew
    };

    if (editingId) {
      updateRenewal(editingId, renewal);
    } else {
      addRenewal(renewal);
    }

    // Reset form
    setFormData({
      subscriptionName: '',
      nextRenewalDate: '',
      billingCycle: 'monthly',
      price: '',
      alertDaysBefore: '7',
      autoRenew: true
    });
    setEditingId(null);
    setIsOpen(false);
  };

  const handleEdit = (renewal: any) => {
    setFormData({
      subscriptionName: renewal.subscriptionName,
      nextRenewalDate: renewal.nextRenewalDate,
      billingCycle: renewal.billingCycle,
      price: renewal.price.toString(),
      alertDaysBefore: renewal.alertDaysBefore.toString(),
      autoRenew: renewal.autoRenew
    });
    setEditingId(renewal.subscriptionId);
    setIsOpen(true);
  };

  const getDaysUntil = (dateString: string) => {
    const days = Math.ceil((new Date(dateString).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
    return days;
  };

  if (Object.keys(renewals).length === 0 && alerts.length === 0) return null;

  return (
    <motion.div
      className="glass-strong rounded-2xl p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-accent" />
          <h3 className="text-lg font-bold text-foreground">Calendrier de renouvellement</h3>
          {alerts.length > 0 && (
            <Badge variant="destructive" className="bg-red-400/20 text-red-400 border-red-400/30">
              {alerts.length} alerte{alerts.length > 1 ? 's' : ''}
            </Badge>
          )}
        </div>

        <Dialog open={isOpen} onOpenChange={(open) => {
          setIsOpen(open);
          if (!open) {
            setEditingId(null);
            setFormData({
              subscriptionName: '',
              nextRenewalDate: '',
              billingCycle: 'monthly',
              price: '',
              alertDaysBefore: '7',
              autoRenew: true
            });
          }
        }}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
              <Plus className="w-4 h-4 mr-2" />
              Ajouter
            </Button>
          </DialogTrigger>
          <DialogContent className="glass-strong border-white/10">
            <DialogHeader>
              <DialogTitle>{editingId ? 'Modifier' : 'Ajouter'} un renouvellement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Nom du service</Label>
                <Input
                  value={formData.subscriptionName}
                  onChange={(e) => setFormData({ ...formData, subscriptionName: e.target.value })}
                  placeholder="Netflix"
                  className="glass border-white/10 mt-1"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Date de renouvellement</Label>
                  <Input
                    type="date"
                    value={formData.nextRenewalDate}
                    onChange={(e) => setFormData({ ...formData, nextRenewalDate: e.target.value })}
                    className="glass border-white/10 mt-1"
                  />
                </div>
                <div>
                  <Label>Prix (€)</Label>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="12.99"
                    className="glass border-white/10 mt-1"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Cycle de facturation</Label>
                  <Select value={formData.billingCycle} onValueChange={(value: any) => setFormData({ ...formData, billingCycle: value })}>
                    <SelectTrigger className="glass border-white/10 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="glass-strong border-white/10">
                      <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      <SelectItem value="monthly">Mensuel</SelectItem>
                      <SelectItem value="yearly">Annuel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Alerte (jours avant)</Label>
                  <Input
                    type="number"
                    value={formData.alertDaysBefore}
                    onChange={(e) => setFormData({ ...formData, alertDaysBefore: e.target.value })}
                    className="glass border-white/10 mt-1"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between glass rounded-lg p-3">
                <Label>Renouvellement automatique</Label>
                <Switch
                  checked={formData.autoRenew}
                  onCheckedChange={(checked) => setFormData({ ...formData, autoRenew: checked })}
                />
              </div>

              <Button onClick={handleSubmit} className="w-full stat-card-shock text-white">
                {editingId ? 'Modifier' : 'Ajouter'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Alerts */}
      {alerts.map((alert, index) => {
        const daysUntil = getDaysUntil(alert.nextRenewalDate);
        return (
          <Alert key={alert.subscriptionId} className="mb-4 border-orange-400/30 bg-orange-400/10">
            <Bell className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-orange-400">
              <strong>{alert.subscriptionName}</strong> se renouvelle dans {daysUntil} jour{daysUntil > 1 ? 's' : ''} ({formatPrice(alert.price)})
            </AlertDescription>
          </Alert>
        );
      })}

      {/* Upcoming renewals */}
      <div className="space-y-3">
        {upcomingRenewals.map((renewal, index) => {
          const daysUntil = getDaysUntil(renewal.nextRenewalDate);
          const isUrgent = daysUntil <= 7;

          return (
            <motion.div
              key={renewal.subscriptionId}
              className={`glass rounded-xl p-4 ${isUrgent ? 'border-2 border-orange-400/30' : ''}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h4 className="font-bold text-foreground flex items-center gap-2">
                    {renewal.subscriptionName}
                    {isUrgent && <AlertCircle className="w-4 h-4 text-orange-400" />}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {new Date(renewal.nextRenewalDate).toLocaleDateString('fr-FR')}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {renewal.billingCycle === 'monthly' ? 'Mensuel' : 
                       renewal.billingCycle === 'yearly' ? 'Annuel' : 'Hebdo'}
                    </Badge>
                    {renewal.autoRenew && (
                      <Badge variant="outline" className="text-xs bg-green-400/10 text-green-400 border-green-400/30">
                        Auto
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(renewal)}
                    className="text-foreground/40 hover:text-foreground h-8 w-8"
                  >
                    <Edit2 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteRenewal(renewal.subscriptionId)}
                    className="text-foreground/40 hover:text-red-400 h-8 w-8"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{formatPrice(renewal.price)}</p>
                <p className={`text-sm ${isUrgent ? 'text-orange-400 font-medium' : 'text-foreground/60'}`}>
                  Dans {daysUntil} jour{daysUntil > 1 ? 's' : ''}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default RenewalCalendar;
