import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Palette, X } from "lucide-react";

const themes = [
  {
    name: "Cosmic Purple",
    id: "default",
    preview: "linear-gradient(135deg, #8b5cf6, #3b82f6, #10b981)",
    colors: {
      '--primary': '#8b5cf6',
      '--secondary': '#3b82f6', 
      '--accent': '#10b981',
      '--aurora-1': 'rgba(139, 92, 246, 0.4)',
      '--aurora-2': 'rgba(59, 130, 246, 0.4)',
      '--aurora-3': 'rgba(16, 185, 129, 0.4)',
    }
  },
  {
    name: "Sunset Vibes",
    id: "sunset",
    preview: "linear-gradient(135deg, #f97316, #ef4444, #d946ef)",
    colors: {
      '--primary': '#f97316',
      '--secondary': '#ef4444',
      '--accent': '#d946ef',
      '--aurora-1': 'rgba(249, 115, 22, 0.4)',
      '--aurora-2': 'rgba(239, 68, 68, 0.4)',
      '--aurora-3': 'rgba(217, 70, 239, 0.4)',
    }
  },
  {
    name: "Ocean Depths",
    id: "ocean",
    preview: "linear-gradient(135deg, #0ea5e9, #14b8a6, #6366f1)",
    colors: {
      '--primary': '#0ea5e9',
      '--secondary': '#14b8a6',
      '--accent': '#6366f1',
      '--aurora-1': 'rgba(14, 165, 233, 0.4)',
      '--aurora-2': 'rgba(20, 184, 166, 0.4)',
      '--aurora-3': 'rgba(99, 102, 241, 0.4)',
    }
  },
  {
    name: "Forest Dream",
    id: "forest",
    preview: "linear-gradient(135deg, #22c55e, #84cc16, #eab308)",
    colors: {
      '--primary': '#22c55e',
      '--secondary': '#84cc16',
      '--accent': '#eab308',
      '--aurora-1': 'rgba(34, 197, 94, 0.4)',
      '--aurora-2': 'rgba(132, 204, 22, 0.4)',
      '--aurora-3': 'rgba(234, 179, 8, 0.4)',
    }
  },
  {
    name: "Cherry Blossom",
    id: "cherry",
    preview: "linear-gradient(135deg, #ec4899, #f43f5e, #a855f7)",
    colors: {
      '--primary': '#ec4899',
      '--secondary': '#f43f5e',
      '--accent': '#a855f7',
      '--aurora-1': 'rgba(236, 72, 153, 0.4)',
      '--aurora-2': 'rgba(244, 63, 94, 0.4)',
      '--aurora-3': 'rgba(168, 85, 247, 0.4)',
    }
  },
  {
    name: "Cyber Neon",
    id: "cyber",
    preview: "linear-gradient(135deg, #06b6d4, #8b5cf6, #f59e0b)",
    colors: {
      '--primary': '#06b6d4',
      '--secondary': '#8b5cf6',
      '--accent': '#f59e0b',
      '--aurora-1': 'rgba(6, 182, 212, 0.4)',
      '--aurora-2': 'rgba(139, 92, 246, 0.4)',
      '--aurora-3': 'rgba(245, 158, 11, 0.4)',
    }
  }
];

export default function ColorPaletteSwitcher({ open, onOpenChange }) {
  const [activeTheme, setActiveTheme] = useState('default');

  const applyTheme = (themeId) => {
    const theme = themes.find(t => t.id === themeId);
    if (!theme) return;

    const root = document.documentElement;
    Object.entries(theme.colors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    localStorage.setItem('theme_palette', themeId);
    setActiveTheme(themeId);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme_palette') || 'default';
    applyTheme(savedTheme);
    setActiveTheme(savedTheme);
  }, []);

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
        className="glass-card rounded-3xl p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Palette className="w-6 h-6 text-primary" />
              Color Themes
            </h2>
            <p className="text-secondary-foreground">Choose a vibe that matches your aesthetic</p>
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
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          {themes.map(theme => (
            <div key={theme.id} className="text-center space-y-3">
              <Button
                onClick={() => applyTheme(theme.id)}
                variant="outline"
                className="w-full h-24 border-2 relative overflow-hidden group hover:scale-105 transition-all duration-300"
                style={{ background: theme.preview }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
                {activeTheme === theme.id && (
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Check className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                )}
                <div className="absolute bottom-2 left-2 right-2">
                  <div className="w-full h-1 bg-white/30 rounded-full overflow-hidden">
                    <div className="h-full bg-white/60 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </Button>
              <div>
                <p className="font-bold text-sm text-foreground">{theme.name}</p>
                <div className="flex justify-center gap-1 mt-1">
                  {Object.values(theme.colors).slice(0, 3).map((color, i) => (
                    <div 
                      key={i}
                      className="w-3 h-3 rounded-full border border-white/20"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <Button 
          onClick={handleClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg h-12"
        >
          Perfect! 🎨
        </Button>
      </div>
    </div>
  );
}