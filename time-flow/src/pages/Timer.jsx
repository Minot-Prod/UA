import React, { useState, useEffect } from "react";
import { Plus, Play, Pause, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Timer as TimerEntity } from "@/api/entities";
import TimerCreator from "../components/timer/TimerCreator";
import ActiveTimer from "../components/timer/ActiveTimer";
import TimerPresets from "../components/timer/TimerPresets";

export default function Timer() {
  const [timers, setTimers] = useState([]);
  const [showCreator, setShowCreator] = useState(false);
  const [isDark] = useState(() => {
    const saved = localStorage.getItem('theme');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    loadTimers();
  }, []);

  const loadTimers = async () => {
    const data = await TimerEntity.list();
    setTimers(data);
  };

  const createTimer = async (timerData) => {
    await TimerEntity.create({
      ...timerData,
      remaining: timerData.duration,
      status: 'stopped'
    });
    setShowCreator(false);
    loadTimers();
  };

  const updateTimer = async (id, updates) => {
    await TimerEntity.update(id, updates);
    loadTimers();
  };

  const deleteTimer = async (id) => {
    await TimerEntity.delete(id);
    loadTimers();
  };

  if (showCreator) {
    return (
      <TimerCreator 
        onSave={createTimer}
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
              Timers
            </h2>
            <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {timers.filter(t => t.status === 'running').length} active
            </p>
          </div>
          <Button
            onClick={() => setShowCreator(true)}
            className="bg-purple-500 hover:bg-purple-600 text-white transition-all duration-300 hover:scale-105"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Timer
          </Button>
        </div>
      </div>

      {/* Presets */}
      <TimerPresets onCreateTimer={createTimer} isDark={isDark} />

      {/* Active Timers */}
      {timers.length > 0 ? (
        <div className="space-y-4">
          {timers.map((timer) => (
            <ActiveTimer
              key={timer.id}
              timer={timer}
              onUpdate={updateTimer}
              onDelete={deleteTimer}
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
                No timers yet
              </h3>
              <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                Create your first timer or choose from presets above
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}