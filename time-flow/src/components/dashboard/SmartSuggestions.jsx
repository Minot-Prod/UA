import React from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Clock, Coffee, Dumbbell } from "lucide-react";
import { motion } from "framer-motion";

const suggestionIcons = {
  "Pomodoro Focus": Coffee,
  "Short Break": Clock,
  "Meeting Timer": Clock,
  "Workout Timer": Dumbbell,
  "Cooking Timer": Clock,
  "Wind Down": Clock,
  "Sleep Timer": Clock,
  "Meditation": Clock,
  "Night Light": Clock,
};

export default function SmartSuggestions({ suggestions, mode, onCreateTimer }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-3xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-primary/20 rounded-xl">
          <Lightbulb className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-foreground">Smart Suggestions</h3>
          <p className="text-sm text-secondary-foreground">Perfect for {mode} time</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestionIcons[suggestion] || Clock;
          const durations = {
            "Pomodoro Focus": 25 * 60,
            "Short Break": 5 * 60,
            "Meeting Timer": 30 * 60,
            "Workout Timer": 45 * 60,
            "Cooking Timer": 20 * 60,
            "Wind Down": 15 * 60,
            "Sleep Timer": 60 * 60,
            "Meditation": 10 * 60,
            "Night Light": 8 * 60 * 60,
          };

          return (
            <motion.div
              key={suggestion}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Button
                onClick={() => onCreateTimer({ 
                  name: suggestion, 
                  duration: durations[suggestion] || 25 * 60 
                })}
                className="h-20 w-full bg-white/10 hover:bg-white/20 border border-white/20 text-foreground font-bold text-xs p-2 micro-interaction ripple flex flex-col items-center gap-1"
              >
                <Icon className="w-5 h-5" />
                <span className="text-center leading-tight">{suggestion}</span>
              </Button>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}