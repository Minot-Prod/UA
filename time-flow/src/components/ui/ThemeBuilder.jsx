import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Palette, Volume2, User, Sparkles, X } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const soundPacks = [
  { id: "default", name: "Default", description: "Clean digital sounds" },
  { id: "nature", name: "Nature", description: "Birds, rain, ocean waves" },
  { id: "lofi", name: "Lo-Fi", description: "Chill beats and ambient" },
  { id: "retro", name: "Retro", description: "8-bit game sounds" },
  { id: "zen", name: "Zen", description: "Meditation bells and chimes" }
];

const userProfiles = [
  { id: "work", name: "Work Mode", description: "Focus timers and productivity" },
  { id: "study", name: "Study Mode", description: "Pomodoro and break timers" },
  { id: "relax", name: "Relax Mode", description: "Gentle alarms and ambient" },
  { id: "sleep", name: "Sleep Mode", description: "Night mode with sleep sounds" }
];

export default function ThemeBuilder({ open, onOpenChange, preferences, onUpdatePreferences }) {
  const [voiceFeedback, setVoiceFeedback] = useState(preferences?.voice_feedback || false);
  const [soundPack, setSoundPack] = useState(preferences?.sound_pack || "default");
  const [activeProfile, setActiveProfile] = useState("work");

  const handleSave = () => {
    onUpdatePreferences({
      voice_feedback: voiceFeedback,
      sound_pack: soundPack
    });
    onOpenChange(false);
  };

  const handleClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onOpenChange(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose(e);
    }
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={handleOverlayClick}
      style={{ position: 'fixed', zIndex: 9999 }}
    >
      <div 
        className="glass-card rounded-3xl max-w-md w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-6 pb-0">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-primary" />
              Personalize Experience
            </h2>
            <p className="text-secondary-foreground">Customize every aspect of your TimeFlow experience</p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            className="hover:scale-105 transition-all"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-6">
          <Tabs defaultValue="sounds" className="w-full">
            <TabsList className="grid w-full grid-cols-3 glass-card">
              <TabsTrigger value="sounds" className="flex items-center gap-1">
                <Volume2 className="w-4 h-4" />
                Audio
              </TabsTrigger>
              <TabsTrigger value="profiles" className="flex items-center gap-1">
                <User className="w-4 h-4" />
                Profiles
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-1">
                <Sparkles className="w-4 h-4" />
                Smart
              </TabsTrigger>
            </TabsList>

            <TabsContent value="sounds" className="space-y-4 mt-6">
              <div>
                <Label className="text-base font-semibold text-foreground">Sound Pack</Label>
                <div className="grid gap-3 mt-2">
                  {soundPacks.map(pack => (
                    <div
                      key={pack.id}
                      onClick={() => setSoundPack(pack.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        soundPack === pack.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-200 glass-card'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-foreground">{pack.name}</p>
                          <p className="text-sm text-secondary-foreground">{pack.description}</p>
                        </div>
                        {soundPack === pack.id && (
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between p-4 glass-card rounded-xl">
                <div>
                  <Label className="font-semibold text-foreground">Voice Feedback</Label>
                  <p className="text-sm text-secondary-foreground">Spoken confirmations</p>
                </div>
                <Switch
                  checked={voiceFeedback}
                  onCheckedChange={setVoiceFeedback}
                />
              </div>
            </TabsContent>

            <TabsContent value="profiles" className="space-y-4 mt-6">
              <div>
                <Label className="text-base font-semibold text-foreground">Usage Profiles</Label>
                <div className="grid gap-3 mt-2">
                  {userProfiles.map(profile => (
                    <div
                      key={profile.id}
                      onClick={() => setActiveProfile(profile.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                        activeProfile === profile.id 
                          ? 'border-primary bg-primary/10' 
                          : 'border-gray-200 glass-card'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-semibold text-foreground">{profile.name}</p>
                          <p className="text-sm text-secondary-foreground">{profile.description}</p>
                        </div>
                        {activeProfile === profile.id && (
                          <div className="w-4 h-4 bg-primary rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4 mt-6">
              <div className="space-y-4">
                <div className="p-4 glass-card rounded-xl">
                  <h4 className="font-semibold mb-2 text-foreground">Smart Suggestions</h4>
                  <p className="text-sm text-secondary-foreground mb-3">
                    AI-powered timer and alarm recommendations based on your usage patterns
                  </p>
                  <Switch defaultChecked />
                </div>
                
                <div className="p-4 glass-card rounded-xl">
                  <h4 className="font-semibold mb-2 text-foreground">Gesture Controls</h4>
                  <p className="text-sm text-secondary-foreground mb-3">
                    Swipe gestures for quick actions
                  </p>
                  <Switch defaultChecked />
                </div>

                <div className="p-4 glass-card rounded-xl">
                  <h4 className="font-semibold mb-2 text-foreground">Ambient Intelligence</h4>
                  <p className="text-sm text-secondary-foreground mb-3">
                    Auto-adjust interface based on time and activity
                  </p>
                  <Switch defaultChecked />
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-white/10">
            <Button variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSave} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
              Save Preferences
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}