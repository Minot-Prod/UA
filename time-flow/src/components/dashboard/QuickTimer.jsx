import React from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function QuickTimer({ timers }) {
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (timers.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-6xl mb-4">⏰</div>
        <p className="text-secondary-foreground font-medium">No active timers</p>
        <p className="text-sm text-secondary-foreground/60">Start a timer to see it here</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {timers.slice(0, 2).map((timer) => {
        const progress = ((timer.duration - timer.remaining) / timer.duration) * 100;
        
        return (
          <motion.div
            key={timer.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white/5 rounded-2xl border border-white/10"
          >
            <div className="flex justify-between items-center mb-2">
              <h4 className="font-bold text-foreground">{timer.name}</h4>
              <span className="text-sm text-secondary-foreground">
                {formatTime(timer.remaining)}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </motion.div>
        );
      })}
    </div>
  );
}