import React, { useState, useEffect } from "react";
import { LogoDesign } from "@/api/entities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Save, FolderOpen, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function SaveLoadPanel({ onSave, onLoad, currentName }) {
  const [savedDesigns, setSavedDesigns] = useState([]);
  const [saveName, setSaveName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadSavedDesigns();
  }, []);

  const loadSavedDesigns = async () => {
    try {
      const designs = await LogoDesign.list('-created_date');
      setSavedDesigns(designs);
    } catch (error) {
      console.error('Error loading designs:', error);
    }
  };

  const handleSave = async () => {
    if (!saveName.trim()) return;
    
    setIsLoading(true);
    try {
      await onSave(saveName.trim());
      setSaveName("");
      await loadSavedDesigns();
    } catch (error) {
      console.error('Error saving design:', error);
    }
    setIsLoading(false);
  };

  const handleLoad = async (design) => {
    try {
      onLoad(design);
    } catch (error) {
      console.error('Error loading design:', error);
    }
  };

  const handleDelete = async (designId) => {
    try {
      await LogoDesign.delete(designId);
      await loadSavedDesigns();
    } catch (error) {
      console.error('Error deleting design:', error);
    }
  };

  return (
    <div className="space-y-4">
      {/* Save Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Save className="w-4 h-4 text-slate-600" />
          <Label className="font-semibold">Save Design</Label>
        </div>
        
        <div className="space-y-2">
          <Input
            placeholder="Enter design name"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSave()}
          />
          <Button
            onClick={handleSave}
            disabled={!saveName.trim() || isLoading}
            className="w-full gap-2"
            size="sm"
          >
            <Save className="w-4 h-4" />
            {isLoading ? 'Saving...' : 'Save Design'}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Load Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="w-4 h-4 text-slate-600" />
          <Label className="font-semibold">Saved Designs</Label>
          <Badge variant="secondary" className="ml-auto text-xs">
            {savedDesigns.length}
          </Badge>
        </div>
        
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {savedDesigns.length === 0 ? (
            <div className="text-center text-sm text-slate-500 py-4">
              No saved designs yet
            </div>
          ) : (
            savedDesigns.map((design) => (
              <Card key={design.id} className="p-3">
                <CardContent className="p-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm truncate">{design.name}</h4>
                      <p className="text-xs text-slate-500">
                        {format(new Date(design.created_date), 'MMM d, yyyy')}
                      </p>
                    </div>
                    {currentName === design.name && (
                      <Badge variant="default" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleLoad(design)}
                      className="flex-1 gap-1 h-7 text-xs"
                    >
                      <Eye className="w-3 h-3" />
                      Load
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDelete(design.id)}
                      className="gap-1 h-7 text-xs text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}