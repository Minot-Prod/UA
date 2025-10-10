
import React from "react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Trash2, Bell } from "lucide-react";

const DAYS_SHORT = {
  monday: 'M',
  tuesday: 'T', 
  wednesday: 'W',
  thursday: 'T',
  friday: 'F',
  saturday: 'S',
  sunday: 'S'
};

export default function AlarmItem({ alarm, onToggle, onUpdate, onDelete, isDark }) {
  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour12 = parseInt(hours) % 12 || 12;
    const ampm = parseInt(hours) >= 12 ? 'PM' : 'AM';
    return `${hour12}:${minutes} ${ampm}`;
  };

  const getNextAlarmTime = () => {
    if (alarm.days && alarm.days.length > 0) {
      const dayNames = alarm.days.map(day => DAYS_SHORT[day]).join('');
      return `Repeats ${dayNames}`;
    }
    return 'One time';
  };

  return (
    <div className={`glass-card rounded-2xl p-4 transition-all duration-300 hover:scale-105 ${
      !alarm.is_active ? 'opacity-60' : ''
    }`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <div>
              <h3 className={`font-bold text-xl ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {formatTime(alarm.time)}
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {alarm.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 mt-2">
            <Badge variant="outline" className={`text-xs ${
              isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300'
            }`}>
              {getNextAlarmTime()}
            </Badge>
            {alarm.sound && (
              <Badge variant="outline" className={`text-xs ${
                isDark ? 'border-gray-600 text-gray-300' : 'border-gray-300'
              }`}>
                {alarm.sound}
              </Badge>
            )}
            {alarm.vibrate && (
              <Badge variant="outline" className="text-xs">
                📳
              </Badge>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Switch
            checked={alarm.is_active}
            onCheckedChange={onToggle}
            className="data-[state=checked]:bg-purple-500"
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(alarm.id)}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
