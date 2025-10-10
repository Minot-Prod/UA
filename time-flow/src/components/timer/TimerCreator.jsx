import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Check } from "lucide-react";

export default function TimerCreator({ onSave, onCancel, isDark }) {
  const [name, setName] = useState("");
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const handleSave = () => {
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    if (totalSeconds > 0 && name.trim()) {
      onSave({
        name: name.trim(),
        duration: totalSeconds
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onCancel}
            className="hover:scale-105 transition-all duration-300"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Create Timer
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Set up your custom timer
            </p>
          </div>
        </div>
      </div>

      {/* Timer Form */}
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div>
          <Label htmlFor="name" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Timer Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter timer name..."
            className="mt-1"
          />
        </div>

        <div>
          <Label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Duration
          </Label>
          <div className="flex gap-4 mt-2">
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Hours</Label>
              <Input
                type="number"
                min="0"
                max="23"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="text-center"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Minutes</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="text-center"
              />
            </div>
            <div className="flex-1">
              <Label className="text-xs text-gray-500">Seconds</Label>
              <Input
                type="number"
                min="0"
                max="59"
                value={seconds}
                onChange={(e) => setSeconds(Number(e.target.value))}
                className="text-center"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={!name.trim() || (hours + minutes + seconds) === 0}
          className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-105"
        >
          <Check className="w-4 h-4 mr-2" />
          Create Timer
        </Button>
      </div>
    </div>
  );
}