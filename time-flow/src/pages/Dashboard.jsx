
import React, { useState, useEffect } from "react";
import { Timer as TimerEntity, Alarm, LapTime, UserPreferences } from "@/api/entities";
import { Plus, MoreHorizontal, Clock, Zap, Target, Moon, Watch, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import DashboardWidget from "../components/dashboard/DashboardWidget";
import QuickStopwatch from "../components/dashboard/QuickStopwatch";
import QuickTimer from "../components/dashboard/QuickTimer";
import RecentActivity from "../components/dashboard/RecentActivity";
import SmartSuggestions from "../components/dashboard/SmartSuggestions";

export default function Dashboard() {
  const [timers, setTimers] = useState([]);
  const [alarms, setAlarms] = useState([]);
  const [preferences, setPreferences] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    loadData();
    const interval = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const loadData = async () => {
    const [timersData, alarmsData] = await Promise.all([
      TimerEntity.list(),
      Alarm.list()
    ]);
    setTimers(timersData);
    setAlarms(alarmsData);

    try {
      const userPrefs = await UserPreferences.list();
      if (userPrefs.length > 0) {
        setPreferences(userPrefs[0]);
      }
    } catch (error) {
      // Create default preferences
      const defaultPrefs = {
        dashboard_widgets: ["clock", "stopwatch", "timer", "alarms"],
        active_theme: "default",
        sound_pack: "default",
        voice_feedback: false
      };
      const created = await UserPreferences.create(defaultPrefs);
      setPreferences(created);
    }
  };

  const getTimeBasedSuggestions = () => {
    const hour = currentTime.getHours();
    
    if (hour >= 9 && hour <= 17) {
      return {
        mode: "work",
        suggestions: ["Pomodoro Focus", "Short Break", "Meeting Timer"],
        icon: Target,
        color: "from-blue-500 to-purple-600"
      };
    } else if (hour >= 18 && hour <= 22) {
      return {
        mode: "evening",
        suggestions: ["Workout Timer", "Cooking Timer", "Wind Down"],
        icon: Zap,
        color: "from-orange-500 to-pink-600"
      };
    } else {
      return {
        mode: "rest",
        suggestions: ["Sleep Timer", "Meditation", "Night Light"],
        icon: Moon,
        color: "from-indigo-500 to-purple-700"
      };
    }
  };

  const timeContext = getTimeBasedSuggestions();

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-2"
      >
        <h1 className="text-5xl font-bold gradient-text" style={{ fontFamily: 'var(--font-display)' }}>
          {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </h1>
        <p className="text-xl font-medium text-secondary-foreground">
          {currentTime.toLocaleDateString([], { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-semibold bg-gradient-to-r ${timeContext.color}`}>
          <timeContext.icon className="w-4 h-4 text-white" />
          <span className="text-white capitalize">{timeContext.mode} Mode</span>
        </div>
      </motion.div>

      {/* Smart Suggestions */}
      <SmartSuggestions 
        suggestions={timeContext.suggestions}
        mode={timeContext.mode}
        onCreateTimer={(timer) => console.log('Creating timer:', timer)}
      />

      {/* Quick Access Grid */}
      <div className="grid grid-cols-1 md://grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <DashboardWidget title="Quick Stopwatch" icon={Watch}>
            <QuickStopwatch />
          </DashboardWidget>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <DashboardWidget title="Active Timers" icon={Timer}>
            <QuickTimer timers={timers.filter(t => t.status === 'running')} />
          </DashboardWidget>
        </motion.div>
      </div>

      {/* Stats and Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <RecentActivity 
          timers={timers}
          alarms={alarms}
          preferences={preferences}
        />
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card rounded-3xl p-6"
      >
        <h3 className="text-xl font-bold text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Button className="h-16 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold micro-interaction ripple">
            5 Min Break
          </Button>
          <Button className="h-16 bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white font-bold micro-interaction ripple">
            25 Min Focus
          </Button>
          <Button className="h-16 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold micro-interaction ripple">
            Workout Timer
          </Button>
          <Button className="h-16 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold micro-interaction ripple">
            Cooking Timer
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
