import React, { useState, useEffect, useRef } from "react";
import { Globe, MapPin, Expand } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnalogClock from "../components/clock/AnalogClock";
import DigitalClock from "../components/clock/DigitalClock";
import WorldClock from "../components/clock/WorldClock";

export default function Clock() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [viewMode, setViewMode] = useState("analog");
  const isDark = document.documentElement.classList.contains('dark');
  const frameId = useRef();

  useEffect(() => {
    const update = () => {
      setCurrentTime(new Date());
      frameId.current = requestAnimationFrame(update);
    };
    frameId.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frameId.current);
  }, []);

  const toggleFullscreen = () => {
    const clockContainer = document.getElementById('clock-display-container');
    if (!document.fullscreenElement) {
      clockContainer?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="glass-card rounded-2xl p-2">
        <div className="flex gap-2">
          <Button
            onClick={() => setViewMode("analog")}
            className={`flex-1 transition-all duration-300 ${viewMode === 'analog' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-secondary-foreground'}`}
          >
            Analog
          </Button>
          <Button
            onClick={() => setViewMode("digital")}
            className={`flex-1 transition-all duration-300 ${viewMode === 'digital' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-secondary-foreground'}`}
          >
            Digital
          </Button>
          <Button
            onClick={() => setViewMode("world")}
            className={`flex-1 transition-all duration-300 ${viewMode === 'world' ? 'bg-primary text-primary-foreground' : 'bg-transparent text-secondary-foreground'}`}
          >
            <Globe className="w-4 h-4 mr-1" />
            World
          </Button>
        </div>
      </div>

      {/* Clock Display */}
      <div id="clock-display-container" className="glass-card rounded-3xl p-6 relative group fullscreen-target">
        <Button
          onClick={toggleFullscreen}
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity hidden md:inline-flex"
        >
          <Expand className="w-5 h-5" />
        </Button>
        <div className="min-h-[300px] flex items-center justify-center">
          {viewMode === "analog" && <AnalogClock time={currentTime} />}
          {viewMode === "digital" && <DigitalClock time={currentTime} />}
          {viewMode === "world" && <WorldClock />}
        </div>
      </div>

      {/* Current Location */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="w-4 h-4 text-primary" />
          <span className="font-medium text-secondary-foreground">
            Local Time
          </span>
        </div>
        <p className="text-lg font-semibold mt-1 text-foreground">
          {currentTime.toLocaleString()}
        </p>
      </div>
    </div>
  );
}