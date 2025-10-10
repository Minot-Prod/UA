

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Clock, Watch, Timer, AlarmClock, Moon, Sun, Palette, Home, Settings, Minimize2, Music2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import LiveBackground from "../components/ui/LiveBackground";
import ColorPaletteSwitcher from "../components/ui/ColorPaletteSwitcher";
import ThemeBuilder from "../components/ui/ThemeBuilder";
import { UserPreferences } from "@/api/entities";
import TimeBuddy from "../components/ai/TimeBuddy";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('theme_mode');
    return saved ? saved === 'dark' : false; // Default to light mode if nothing saved
  });
  const [showPalette, setShowPalette] = useState(false);
  const [showThemeBuilder, setShowThemeBuilder] = useState(false);
  const [isAmbientMode, setIsAmbientMode] = useState(false);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    loadPreferences();
    // Load fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme_mode', isDark ? 'dark' : 'light');
  }, [isDark]);

  const loadPreferences = async () => {
    try {
      const userPrefs = await UserPreferences.list();
      if (userPrefs.length > 0) {
        setPreferences(userPrefs[0]);
        setIsAmbientMode(userPrefs[0].ambient_mode);
      }
    } catch (error) {
      // User preferences don't exist yet, or other error
      console.error("Error loading preferences:", error);
    }
  };

  const updatePreferences = async (updates) => {
    try {
      if (preferences && preferences.id) {
        await UserPreferences.update(preferences.id, updates);
      } else {
        await UserPreferences.create(updates);
      }
      loadPreferences(); // Reload to get updated preferences
    } catch (error) {
      console.error('Error updating preferences:', error);
    }
  };

  const toggleAmbientMode = () => {
    const newMode = !isAmbientMode;
    setIsAmbientMode(newMode);
    updatePreferences({ ambient_mode: newMode });
    document.body.classList.toggle('ambient-mode', newMode);
  };

  const navigationItems = [
    { name: "Dashboard", url: createPageUrl("Dashboard"), icon: Home },
    { name: "Clock", url: createPageUrl("Clock"), icon: Clock },
    { name: "Stopwatch", url: createPageUrl("Stopwatch"), icon: Watch },
    { name: "Timer", url: createPageUrl("Timer"), icon: Timer },
    { name: "Alarms", url: createPageUrl("Alarms"), icon: AlarmClock },
    { name: "Music", url: createPageUrl("Music"), icon: Music2 }
  ];

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Playfair+Display:wght@400;700&family=JetBrains+Mono:wght@400;600;700&display=swap');
        
        :root {
          --font-primary: 'Inter', system-ui, -apple-system, sans-serif;
          --font-display: 'Playfair Display', serif;
          --font-mono: 'JetBrains Mono', monospace;
          
          /* Theme colors */
          --primary: #8b5cf6;
          --secondary: #3b82f6;
          --accent: #10b981;
          --aurora-1: rgba(139, 92, 246, 0.4);
          --aurora-2: rgba(59, 130, 246, 0.4);
          --aurora-3: rgba(16, 185, 129, 0.4);
          --background-dark: #0a0b14;
          --background-light: #f8fafc;
          --foreground: ${isDark ? '#ffffff' : '#1a202c'};
          --secondary-foreground: ${isDark ? '#a0aec0' : '#4a5568'};
          --primary-foreground: #ffffff;
          --secondary-foreground: #ffffff;
          --accent-foreground: #ffffff;
        }

        * {
          font-family: var(--font-primary);
        }

        .gradient-text {
          font-family: var(--font-display);
          background: linear-gradient(135deg, var(--primary), var(--secondary), var(--accent));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .glass-card {
          background: rgba(255, 255, 255, ${isDark ? '0.05' : '0.15'});
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, ${isDark ? '0.1' : '0.2'});
          box-shadow: 0 8px 32px rgba(0, 0, 0, ${isDark ? '0.3' : '0.1'});
        }

        .ambient-mode .ui-element {
          opacity: 0;
          pointer-events: none;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .ambient-mode .ui-element:hover {
          opacity: 0.3;
          pointer-events: auto;
          transform: translateY(0);
        }

        .micro-interaction {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .micro-interaction:active {
          transform: scale(0.95);
        }

        .ripple {
          position: relative;
          overflow: hidden;
        }

        .ripple::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .ripple:active::before {
          width: 300px;
          height: 300px;
        }

        /* Smooth number transitions */
        .number-display {
          font-variant-numeric: tabular-nums;
          transition: all 0.3s ease;
          font-family: var(--font-mono);
        }

        /* Navigation persistence fix */
        .navigation-persistent {
          position: fixed !important;
          z-index: 9999 !important;
          bottom: 0;
          left: 0;
          right: 0;
          background: rgba(255, 255, 255, ${isDark ? '0.05' : '0.15'});
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, ${isDark ? '0.1' : '0.2'});
        }

        /* Mobile responsive fixes */
        @media (max-width: 768px) {
          .ui-element {
            opacity: 1 !important;
            pointer-events: auto !important;
            transform: none !important;
          }
        }

        /* Dialog overlay fix */
        .dialog-overlay {
          position: fixed !important;
          inset: 0 !important;
          z-index: 50 !important;
          background-color: rgba(0, 0, 0, 0.8) !important;
          backdrop-filter: blur(10px) !important;
        }

        .dialog-content {
          position: fixed !important;
          z-index: 50 !important;
        }
      `}</style>

      <div className={`min-h-screen transition-all duration-500 relative overflow-hidden ${isDark ? 'dark' : ''} ${isAmbientMode ? 'ambient-mode' : ''}`}>
        <LiveBackground isDark={isDark} />
        
        <div className="relative z-10 pb-20 md:pb-24">
          {/* Header - Always visible and persistent */}
          <header className="p-4 pb-0 ui-element sticky top-0 z-40 bg-opacity-80 backdrop-blur-md">
            <div className="flex justify-between items-center max-w-6xl mx-auto">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold gradient-text">TimeFlow</h1>
                <p className="text-xs md:text-sm text-secondary-foreground font-medium">Master your rhythm</p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleAmbientMode}
                  className="glass-card hover:scale-105 transition-all duration-300 micro-interaction ripple"
                >
                  <Minimize2 className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowThemeBuilder(true)}
                  className="glass-card hover:scale-105 transition-all duration-300 micro-interaction ripple"
                >
                  <Settings className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPalette(true)}
                  className="glass-card hover:scale-105 transition-all duration-300 micro-interaction ripple"
                >
                  <Palette className="w-4 h-4 md:w-5 md:h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsDark(!isDark)}
                  className="glass-card hover:scale-105 transition-all duration-300 micro-interaction ripple"
                >
                  {isDark ? <Sun className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" /> : <Moon className="w-4 h-4 md:w-5 md:h-5" />}
                </Button>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-4">
            <div className="max-w-6xl mx-auto">
              {children}
            </div>
          </main>

          {/* Bottom Navigation - Always persistent */}
          <nav className="navigation-persistent ui-element p-4">
            <div className="glass-card rounded-2xl md:rounded-3xl max-w-md mx-auto">
              <div className="flex justify-around items-center p-2">
                {navigationItems.map((item) => {
                  const isActive = location.pathname === item.url;
                  return (
                    <Link
                      key={item.name}
                      to={item.url}
                      className={`flex flex-col items-center gap-1 p-2 md:p-3 rounded-xl md:rounded-2xl transition-all duration-300 micro-interaction ${
                        isActive
                          ? 'bg-primary/20 text-primary scale-105 md:scale-110 shadow-lg'
                          : 'text-secondary-foreground/60 hover:text-primary hover:scale-105'
                      }`}
                    >
                      <item.icon className="w-5 h-5 md:w-6 md:h-6" />
                      <span className="text-xs font-bold">{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Add TimeBuddy component */}
      <TimeBuddy />

      {showPalette && (
        <ColorPaletteSwitcher 
          open={showPalette} 
          onOpenChange={setShowPalette} 
        />
      )}
      
      {showThemeBuilder && (
        <ThemeBuilder 
          open={showThemeBuilder} 
          onOpenChange={setShowThemeBuilder}
          preferences={preferences}
          onUpdatePreferences={updatePreferences}
        />
      )}
    </>
  );
}

