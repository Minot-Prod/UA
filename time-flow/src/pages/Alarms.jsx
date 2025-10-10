import React, { useState, useEffect } from "react";
import { Plus, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alarm } from "@/api/entities";
import AlarmCreator from "../components/alarm/AlarmCreator";
import AlarmItem from "../components/alarm/AlarmItem";

export default function Alarms() {
  const [alarms, setAlarms] = useState([]);
  const [showCreator, setShowCreator] = useState(false);
  const [isDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    loadAlarms();
  }, []);

  const loadAlarms = async () => {
    const data = await Alarm.list();
    setAlarms(data);
  };

  const createAlarm = async (alarmData) => {
    await Alarm.create(alarmData);
    setShowCreator(false);
    loadAlarms();
  };

  const updateAlarm = async (id, updates) => {
    await Alarm.update(id, updates);
    loadAlarms();
  };

  const deleteAlarm = async (id) => {
    await Alarm.delete(id);
    loadAlarms();
  };

  const toggleAlarm = async (alarm) => {
    await updateAlarm(alarm.id, { is_active: !alarm.is_active });
  };

  if (showCreator) {
    return (
      <AlarmCreator 
        onSave={createAlarm}
        onCancel={() => setShowCreator(false)}
        isDark={isDark}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Alarms
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {alarms.filter(a => a.is_active).length} active
            </p>
          </div>
          <Button
            onClick={() => setShowCreator(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Alarm
          </Button>
        </div>
      </div>

      {/* Alarms List */}
      {alarms.length > 0 ? (
        <div className="space-y-3">
          {alarms.map((alarm) => (
            <AlarmItem
              key={alarm.id}
              alarm={alarm}
              onToggle={() => toggleAlarm(alarm)}
              onUpdate={(updates) => updateAlarm(alarm.id, updates)}
              onDelete={() => deleteAlarm(alarm.id)}
              isDark={isDark}
            />
          ))}
        </div>
      ) : (
        <div className="glass-card rounded-2xl p-8 text-center">
          <div className="space-y-4">
            <div className={`text-6xl ${isDark ? 'text-gray-600' : 'text-gray-300'}`}>⏰</div>
            <div>
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                No alarms set
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Create your first alarm to get started
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex justify-center gap-4">
          <Button
            onClick={() => {
              alarms.forEach(alarm => updateAlarm(alarm.id, { is_active: false }));
            }}
            variant="ghost"
            className="flex items-center gap-2"
            disabled={alarms.filter(a => a.is_active).length === 0}
          >
            <BellOff className="w-4 h-4" />
            Disable All
          </Button>
          <Button
            onClick={() => {
              alarms.forEach(alarm => updateAlarm(alarm.id, { is_active: true }));
            }}
            variant="ghost"
            className="flex items-center gap-2"
            disabled={alarms.length === 0}
          >
            <Bell className="w-4 h-4" />
            Enable All
          </Button>
        </div>
      </div>
    </div>
  );
}