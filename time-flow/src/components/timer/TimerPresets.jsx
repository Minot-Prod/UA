import React from "react";
import { Button } from "@/components/ui/button";
import { Coffee, Dumbbell, ChefHat, GraduationCap, Users } from "lucide-react";

const presets = [
  { name: "Pomodoro", duration: 25 * 60, icon: Coffee, color: "bg-red-500", type: "pomodoro" },
  { name: "Workout", duration: 45 * 60, icon: Dumbbell, color: "bg-orange-500", type: "workout" },
  { name: "Cooking", duration: 20 * 60, icon: ChefHat, color: "bg-yellow-500", type: "cooking" },
  { name: "Study", duration: 50 * 60, icon: GraduationCap, color: "bg-blue-500", type: "custom" },
  { name: "Meeting", duration: 30 * 60, icon: Users, color: "bg-purple-500", type: "custom" },
];

export default function TimerPresets({ onCreateTimer, isDark }) {
  const handlePresetClick = (preset) => {
    onCreateTimer({
      name: preset.name,
      duration: preset.duration,
      preset_type: preset.type
    });
  };

  return (
    <div className="glass-card rounded-2xl p-4">
      <h3 className={`font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Quick Start Presets
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {presets.map((preset) => (
          <Button
            key={preset.name}
            onClick={() => handlePresetClick(preset)}
            className={`${preset.color} hover:opacity-90 text-white p-4 h-auto flex flex-col items-center gap-2 transition-all duration-300 hover:scale-105`}
          >
            <preset.icon className="w-6 h-6" />
            <div className="text-center">
              <p className="font-semibold">{preset.name}</p>
              <p className="text-xs opacity-90">{Math.floor(preset.duration / 60)}min</p>
            </div>
          </Button>
        ))}
      </div>
    </div>
  );
}