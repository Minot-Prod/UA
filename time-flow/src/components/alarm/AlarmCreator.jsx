import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Check } from "lucide-react";

const DAYS = [
  { id: 'monday', name: 'Mon' },
  { id: 'tuesday', name: 'Tue' },
  { id: 'wednesday', name: 'Wed' },
  { id: 'thursday', name: 'Thu' },
  { id: 'friday', name: 'Fri' },
  { id: 'saturday', name: 'Sat' },
  { id: 'sunday', name: 'Sun' }
];

const SOUNDS = [
  { id: 'gentle', name: 'Gentle' },
  { id: 'classic', name: 'Classic' },
  { id: 'nature', name: 'Nature' },
  { id: 'chime', name: 'Chime' }
];

export default function AlarmCreator({ onSave, onCancel, isDark }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [sound, setSound] = useState("gentle");
  const [vibrate, setVibrate] = useState(true);

  const toggleDay = (dayId) => {
    setSelectedDays(prev => 
      prev.includes(dayId) 
        ? prev.filter(id => id !== dayId)
        : [...prev, dayId]
    );
  };

  const handleSave = () => {
    if (name.trim() && time) {
      onSave({
        name: name.trim(),
        time,
        days: selectedDays,
        sound,
        vibrate,
        is_active: true
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
              Create Alarm
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Set up your new alarm
            </p>
          </div>
        </div>
      </div>

      {/* Alarm Form */}
      <div className="glass-card rounded-2xl p-6 space-y-6">
        <div>
          <Label htmlFor="name" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Alarm Name
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter alarm name..."
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="time" className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Time
          </Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="mt-1 text-center text-lg"
          />
        </div>

        <div>
          <Label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Repeat Days
          </Label>
          <div className="flex gap-2 mt-2">
            {DAYS.map((day) => (
              <Button
                key={day.id}
                type="button"
                variant={selectedDays.includes(day.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDay(day.id)}
                className={`transition-all duration-300 hover:scale-105 ${
                  selectedDays.includes(day.id) 
                    ? 'bg-purple-500 hover:bg-purple-600' 
                    : ''
                }`}
              >
                {day.name}
              </Button>
            ))}
          </div>
          <p className={`text-xs mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Leave empty for one-time alarm
          </p>
        </div>

        <div>
          <Label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
            Sound
          </Label>
          <Select value={sound} onValueChange={setSound}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {SOUNDS.map((soundOption) => (
                <SelectItem key={soundOption.id} value={soundOption.id}>
                  {soundOption.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <Label className={`text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              Vibrate
            </Label>
            <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              Enable vibration when alarm rings
            </p>
          </div>
          <Switch
            checked={vibrate}
            onCheckedChange={setVibrate}
          />
        </div>

        <Button
          onClick={handleSave}
          disabled={!name.trim() || !time}
          className="w-full bg-green-500 hover:bg-green-600 text-white transition-all duration-300 hover:scale-105"
        >
          <Check className="w-4 h-4 mr-2" />
          Create Alarm
        </Button>
      </div>
    </div>
  );
}