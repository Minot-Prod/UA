import React from "react";
import { TrendingUp, Activity, Clock, Target } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentActivity({ timers, alarms, preferences }) {
  const totalTimers = timers.length;
  const activeAlarms = alarms.filter(a => a.is_active).length;
  const completedTimers = timers.filter(t => t.status === 'completed').length;
  
  const stats = [
    {
      label: "Total Timers",
      value: totalTimers,
      icon: Clock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      label: "Active Alarms", 
      value: activeAlarms,
      icon: Activity,
      color: "from-purple-500 to-pink-500"
    },
    {
      label: "Completed Today",
      value: completedTimers,
      icon: Target,
      color: "from-green-500 to-emerald-500"
    },
    {
      label: "Productivity",
      value: `${Math.min(100, completedTimers * 20)}%`,
      icon: TrendingUp,
      color: "from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="glass-card rounded-3xl p-6">
      <h3 className="text-xl font-bold text-foreground mb-6 flex items-center gap-2">
        <Activity className="w-6 h-6 text-primary" />
        Your Activity
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center space-y-3"
          >
            <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
              <stat.icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold number-display text-foreground">{stat.value}</div>
              <div className="text-sm font-medium text-secondary-foreground">{stat.label}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}