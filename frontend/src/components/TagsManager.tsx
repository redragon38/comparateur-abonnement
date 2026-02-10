import { motion } from "framer-motion";
import { Tag as TagIcon, Plus, X, Edit2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { useTags } from "@/hooks/useTags";
import { useState } from "react";

const TAG_COLORS = [
  '#EF4444', // red
  '#F59E0B', // amber
  '#10B981', // emerald
  '#3B82F6', // blue
  '#8B5CF6', // violet
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
];

const TagsManager = () => {
  const { tags, createTag, deleteTag } = useTags();
  const [isOpen, setIsOpen] = useState(false);
  const [newTagName, setNewTagName] = useState('');
  const [selectedColor, setSelectedColor] = useState(TAG_COLORS[0]);

  const handleCreate = () => {
    if (newTagName.trim()) {
      createTag(newTagName, selectedColor);
      setNewTagName('');
      setSelectedColor(TAG_COLORS[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="glass border-white/10 hover:glass-strong">
          <TagIcon className="w-4 h-4 mr-2" />
          Tags ({tags.length})
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-strong border-white/10">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <TagIcon className="w-5 h-5 text-accent" />
            Gérer les tags
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create new tag */}
          <div className="space-y-3">
            <Label>Créer un nouveau tag</Label>
            <div className="flex gap-2">
              <Input
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                placeholder="Nom du tag"
                className="glass border-white/10 flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
              />
              <Button onClick={handleCreate} className="stat-card-shock text-white">
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            {/* Color picker */}
            <div className="flex gap-2 flex-wrap">
              {TAG_COLORS.map(color => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-lg transition-all ${
                    selectedColor === color ? 'ring-2 ring-white scale-110' : ''
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Existing tags */}
          {tags.length > 0 && (
            <div className="space-y-3">
              <Label>Tags existants</Label>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {tags.map((tag, index) => (
                  <motion.div
                    key={tag.id}
                    className="flex items-center justify-between glass rounded-lg p-3"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded"
                        style={{ backgroundColor: tag.color }}
                      />
                      <span className="text-foreground font-medium">{tag.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteTag(tag.id)}
                      className="h-8 w-8 text-foreground/40 hover:text-red-400"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {tags.length === 0 && (
            <div className="text-center py-8 text-foreground/40">
              <TagIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Aucun tag créé pour le moment</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TagsManager;
